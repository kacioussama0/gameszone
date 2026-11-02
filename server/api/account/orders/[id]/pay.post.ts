// New payment link for an unpaid order of the signed-in customer
export default defineEventHandler(async (event) => {
    const order = await getOwnOrder(event)

    if (!PAYABLE_STATUSES.includes(order.status)) {
        throw createError({ statusCode: 409, statusMessage: 'Order is not awaiting payment' })
    }

    // A failed attempt goes back to "pending" while the customer retries
    if (order.status === 'failed') {
        await wooFetch(`/orders/${order.id}`, { method: 'PUT', body: { status: 'pending' } })
    }

    try {
        const invoice = await createInvoice({
            orderId: order.id,
            amount: Number(order.total),
            billing: order.billing,
            items: order.line_items.map((i: any) => ({
                name: i.name,
                quantity: Number(i.quantity),
                price: Number(i.price),
            })),
        })
        if (!invoice?.url) throw new Error('No payment link')
        return { orderId: order.id, url: invoice.url }
    } catch (e: any) {
        throw createError({ statusCode: 502, statusMessage: e?.data?.message || 'Payment link failed' })
    }
})
