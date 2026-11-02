export default defineEventHandler(async (event) => {
    const account = await requireAccount(event)
    const page = Math.max(1, Math.min(100, Number(getQuery(event).page) || 1))

    const res = await wooFetchRaw<any[]>('/orders', {
        query: { customer: account.id, per_page: 10, page, orderby: 'date', order: 'desc' },
    })

    return {
        page,
        totalPages: Number(res.headers.get('x-wp-totalpages')) || 1,
        total: Number(res.headers.get('x-wp-total')) || 0,
        orders: (res._data || []).map((order: any) => ({
            id: order.id,
            number: order.number,
            status: order.status,
            date: order.date_created,
            total: Number(order.total),
            itemsCount: (order.line_items || []).reduce((sum: number, i: any) => sum + Number(i.quantity), 0),
            items: (order.line_items || []).slice(0, 4).map((i: any) => ({
                name: i.name,
                image: i.image?.src || '',
            })),
            payable: PAYABLE_STATUSES.includes(order.status),
        })),
    }
})
