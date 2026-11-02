export default defineEventHandler(async (event) => {
    const order = await getOwnOrder(event)

    // Notes the shop marked "to customer" (e.g. activation instructions)
    let notes: any[] = []
    try {
        notes = await wooFetch(`/orders/${order.id}/notes`, { query: { type: 'customer' } })
    } catch {}

    // Product pages are addressed by slug, which order lines don't carry
    const slugs = new Map<number, string>()
    const productIds = [...new Set((order.line_items || []).map((i: any) => Number(i.product_id)).filter(Boolean))]
    if (productIds.length) {
        try {
            const products = await wooFetch<any[]>('/products', {
                query: { include: productIds.join(','), per_page: productIds.length, _fields: 'id,slug' },
            })
            products.forEach((p: any) => slugs.set(Number(p.id), p.slug))
        } catch {}
    }

    return {
        id: order.id,
        number: order.number,
        status: order.status,
        date: order.date_created,
        datePaid: order.date_paid,
        paymentMethod: order.payment_method_title,
        total: Number(order.total),
        subtotal: (order.line_items || []).reduce((sum: number, i: any) => sum + Number(i.subtotal), 0),
        discount: Number(order.discount_total) || 0,
        customerNote: order.customer_note || '',
        email: order.billing?.email || '',
        phone: order.billing?.phone || '',
        payable: PAYABLE_STATUSES.includes(order.status),
        items: (order.line_items || []).map((i: any) => ({
            id: i.id,
            slug: slugs.get(Number(i.product_id)) || '',
            name: i.name,
            quantity: Number(i.quantity),
            total: Number(i.total),
            image: i.image?.src || '',
            // visible options such as "Region: France"; WooCommerce hides internal keys with "_"
            options: (i.meta_data || [])
                .filter((m: any) => !String(m.key).startsWith('_') && typeof (m.display_value ?? m.value) !== 'object')
                .map((m: any) => ({ label: String(m.display_key || m.key), value: String(m.display_value ?? m.value) })),
        })),
        notes: notes.map((n: any) => ({ date: n.date_created, text: n.note })),
    }
})
