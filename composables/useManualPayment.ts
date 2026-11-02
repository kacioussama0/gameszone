// Sends a manual-payment order (BaridiMob, CCP, Binance, RedotPay, IBAN) with its receipt.
// Used by the checkout and the product page; the server creates the order "on hold".
type ManualOrderInput = {
    method: string
    proof: File
    billing: { first_name: string, last_name: string, phone: string, email: string }
    items: { product_id: number, quantity: number, variation_id?: number | null, meta?: { key: string, value: string }[] }[]
    note?: string
}

export const submitManualPayment = async (input: ManualOrderInput) => {
    const body = new FormData()
    body.append('payload', JSON.stringify({
        method: input.method,
        billing: input.billing,
        items: input.items,
        note: input.note || '',
    }))
    body.append('proof', input.proof, input.proof.name)

    return $fetch<{ orderId: number, number: string, total: number, method: string }>('/api/payments/manual', {
        method: 'POST',
        body,
    })
}

// i18n key for a failed manual order, from the server's status code
export const manualPaymentError = (error: any) => {
    const status = error?.response?.status
    if (status === 413) return 'payment.proofSize'
    if (status === 415) return 'payment.proofType'
    if (status === 429) return 'account.errors.tooMany'
    return 'payment.manualFailed'
}

// EUR / USD methods (IBAN, Binance, RedotPay): the DZD total converted at today's
// parallel rate. Shared fetch key, so the picker and the checkout button make one request.
export const useForeignAmount = (method: MaybeRefOrGetter<string>, total: MaybeRefOrGetter<number>) => {
    const { data: rates, pending } = useLazyFetch('/api/payments/rates', { key: 'dzd-rates', server: false })

    const currency = computed(() => findManualMethod(toValue(method))?.currency)
    const rate = computed(() => currency.value ? rates.value?.[currency.value] : undefined)

    // "17,86 $", or '' for DZD methods and while the rate is loading
    const label = computed(() => {
        if (!currency.value || !rate.value) return ''
        const amount = toForeignAmount(toValue(total), rate.value)
        return `${amount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${CURRENCY_SYMBOLS[currency.value]}`
    })

    return { currency, rate, label, pending }
}
