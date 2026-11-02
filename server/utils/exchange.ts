import { FALLBACK_RATES, USD_RATE_MARKUP, type ForeignCurrency } from '../../utils/payment-methods'

// Parallel-market DZD rates (EasyAlgerie, free, no key), used to tell customers
// paying by IBAN (EUR) or Binance / RedotPay (USD) how much to send.

export type DzdRates = Record<ForeignCurrency, number> & { updatedAt: string, fallback?: boolean }

const TTL = 10 * 60 * 1000
let cached: { rates: DzdRates, at: number } | null = null

// "parallel_buy" = what the market pays the shop for the currency it receives
const fetchRate = async (code: ForeignCurrency) => {
    const res = await $fetch<{ dzdPerUnit: number, provenance?: { kind?: string } }>('https://easyalgerie.com/api/v1/dinar/convert', {
        query: { amount: 1, from: code, to: 'DZD', market: 'parallel_buy' },
        timeout: 10000,
    })
    const value = Number(res?.dzdPerUnit)
    // Their static backup value isn't a current rate: use ours instead
    if (!(value > 0) || res?.provenance?.kind === 'fallback') throw new Error(`No ${code} rate`)
    return value
}

const fetchRates = async (): Promise<DzdRates> => {
    const [eur, usd] = await Promise.all([fetchRate('EUR'), fetchRate('USD')])
    return { EUR: eur, USD: usd + USD_RATE_MARKUP, updatedAt: new Date().toISOString() }
}

// Cached for a few minutes. If the API is down: the last known rates, else fixed defaults
export const getDzdRates = async (): Promise<DzdRates> => {
    if (cached && Date.now() - cached.at < TTL) return cached.rates
    try {
        cached = { rates: await fetchRates(), at: Date.now() }
    } catch (e: any) {
        console.error('[exchange] rates unavailable:', e?.status, e?.message)
        // Retried after a minute rather than on every request
        if (!cached) {
            const rates = { ...FALLBACK_RATES, updatedAt: new Date().toISOString(), fallback: true }
            cached = { rates, at: Date.now() - TTL + 60 * 1000 }
        }
    }
    return cached.rates
}
