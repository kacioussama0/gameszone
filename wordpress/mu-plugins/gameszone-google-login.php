<?php
/**
 * Plugin Name: Gameszone – Google login
 * Description: Lets the Nuxt storefront sign customers in with Google while WordPress stays the
 *              account backend: Nuxt sends the Google ID token, WordPress verifies it and returns
 *              (or creates) the matching user.
 *
 * Install: copy this file to wp-content/mu-plugins/ and add to wp-config.php
 *   define( 'GAMESZONE_GOOGLE_CLIENT_ID', 'xxxx.apps.googleusercontent.com' );
 * (the same OAuth client ID as GOOGLE_CLIENT_ID on the Nuxt server).
 *
 * Endpoint: POST /wp-json/gameszone/v1/google-login  { "credential": "<Google ID token>" }
 */

defined( 'ABSPATH' ) || exit;

add_action( 'rest_api_init', function () {
	register_rest_route( 'gameszone/v1', '/google-login', [
		'methods'             => 'POST',
		// The Google ID token is the credential: it's checked in the callback
		'permission_callback' => '__return_true',
		'args'                => [
			'credential' => [ 'type' => 'string', 'required' => true ],
		],
		'callback'            => 'gameszone_google_login',
	] );
} );

/**
 * Verifies the ID token with Google (signature, expiry) and checks it was issued
 * for our client and for a verified address. Returns its claims or a WP_Error.
 */
function gameszone_google_verify( string $credential ) {
	if ( ! defined( 'GAMESZONE_GOOGLE_CLIENT_ID' ) || ! GAMESZONE_GOOGLE_CLIENT_ID ) {
		return new WP_Error( 'gz_google_not_configured', 'GAMESZONE_GOOGLE_CLIENT_ID is not set', [ 'status' => 503 ] );
	}

	$response = wp_remote_get(
		add_query_arg( 'id_token', rawurlencode( $credential ), 'https://oauth2.googleapis.com/tokeninfo' ),
		[ 'timeout' => 15 ]
	);
	if ( is_wp_error( $response ) ) {
		return new WP_Error( 'gz_google_unreachable', 'Could not reach Google', [ 'status' => 502 ] );
	}

	$claims = json_decode( wp_remote_retrieve_body( $response ), true );
	$valid  = wp_remote_retrieve_response_code( $response ) === 200
		&& is_array( $claims )
		&& hash_equals( GAMESZONE_GOOGLE_CLIENT_ID, (string) ( $claims['aud'] ?? '' ) )
		&& in_array( $claims['iss'] ?? '', [ 'accounts.google.com', 'https://accounts.google.com' ], true )
		&& (int) ( $claims['exp'] ?? 0 ) > time()
		&& in_array( $claims['email_verified'] ?? '', [ true, 'true' ], true )
		&& is_email( $claims['email'] ?? '' );

	return $valid ? $claims : new WP_Error( 'gz_google_invalid', 'Invalid Google sign-in', [ 'status' => 401 ] );
}

function gameszone_google_login( WP_REST_Request $request ) {
	$claims = gameszone_google_verify( (string) $request->get_param( 'credential' ) );
	if ( is_wp_error( $claims ) ) {
		return $claims;
	}

	$email = strtolower( $claims['email'] );
	$user  = get_user_by( 'email', $email );

	// First visit: a WooCommerce customer (random password; "forgot password" sets a real one)
	if ( ! $user ) {
		$first = sanitize_text_field( $claims['given_name'] ?? '' );
		$last  = sanitize_text_field( $claims['family_name'] ?? '' );
		$data  = [ 'first_name' => $first, 'last_name' => $last ];

		$user_id = function_exists( 'wc_create_new_customer' )
			? wc_create_new_customer( $email, $email, wp_generate_password( 32 ), $data )
			: wp_insert_user( $data + [
				'user_login' => $email,
				'user_email' => $email,
				'user_pass'  => wp_generate_password( 32 ),
				'role'       => 'customer',
			] );
		if ( is_wp_error( $user_id ) ) {
			return new WP_Error( 'gz_google_create_failed', $user_id->get_error_message(), [ 'status' => 500 ] );
		}

		update_user_meta( $user_id, 'billing_first_name', $first );
		update_user_meta( $user_id, 'billing_last_name', $last );
		update_user_meta( $user_id, 'billing_email', $email );
		update_user_meta( $user_id, 'billing_country', 'DZ' );
		$user = get_user_by( 'id', $user_id );
	}

	// Remember the Google account linked to this user
	if ( ! empty( $claims['sub'] ) ) {
		update_user_meta( $user->ID, 'gameszone_google_sub', sanitize_text_field( $claims['sub'] ) );
	}

	// Same shape as a WooCommerce /customers entry (what the Nuxt session reads)
	return rest_ensure_response( [
		'id'         => $user->ID,
		'email'      => $user->user_email,
		'first_name' => $user->first_name,
		'last_name'  => $user->last_name,
		'billing'    => [
			'first_name' => get_user_meta( $user->ID, 'billing_first_name', true ),
			'last_name'  => get_user_meta( $user->ID, 'billing_last_name', true ),
			'phone'      => get_user_meta( $user->ID, 'billing_phone', true ),
		],
	] );
}
