// Shop contact details and social accounts: the one place to change them.
// Used by the header, footer, bottom nav, home page, order and payment pages.
export const CONTACT = {
    phone: '0562 77 47 67',      // as displayed
    tel: '+213562774767',        // for tel: links
    whatsapp: '213562774767',    // for wa.me links
    email: 'gzonedz@gmail.com',
}

export const SOCIALS = [
    { name: 'Instagram', handle: '@gameszoone', url: 'https://www.instagram.com/gameszoone', icon: 'fa-instagram' },
    { name: 'Facebook', handle: 'GamesZone', url: 'https://www.facebook.com/profile.php?id=61556425287532', icon: 'fa-facebook-f' },
    { name: 'TikTok', handle: '@gmaszoone', url: 'https://www.tiktok.com/@gmaszoone', icon: 'fa-tiktok' },
]

// WhatsApp chat link, optionally with a prefilled message
export const whatsappLink = (message?: string) =>
    `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`
