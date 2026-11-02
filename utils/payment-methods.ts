// Payment methods offered at checkout and on the product page's "buy now" form.
// Shared by the pages and the server route that records manual payments.

// Paid on Slick-Pay's page (CIB / Edahabia cards), confirmed automatically
export const ONLINE_METHOD_ID = 'online'

// Foreign currencies some manual methods are paid in (converted from the DZD total)
export const FOREIGN_CURRENCIES = ['EUR', 'USD'] as const
export type ForeignCurrency = typeof FOREIGN_CURRENCIES[number]

// Added to the parallel USD rate for Binance (USDT) and RedotPay, in DA per dollar
export const USD_RATE_MARKUP = 10

// DA per unit, used when the rates API is unreachable (USD markup already included)
export const FALLBACK_RATES = { EUR: 280, USD: 255 }

// "\u0024" is "$": a literal one breaks Nuxt's auto-import scan of this file
export const CURRENCY_SYMBOLS = { EUR: '€', USD: '\u0024' } as const

// DZD total -> amount to send, rounded up to the cent so the shop never receives less
export const toForeignAmount = (totalDzd: number, rate: number) => Math.ceil((totalDzd / rate) * 100) / 100

export type ManualMethod = {
    id: string
    title: string
    icon: string
    // brand logo under public/, shown wherever the accepted methods are listed
    logo?: string
    // paid in this currency instead of DZD (amount converted at the parallel rate)
    currency?: ForeignCurrency
    // account details shown to the customer; `label` is an i18n key
    fields: { label: string, value: string, copy?: boolean }[]
}

// Transfers the customer makes themselves, then proves with a receipt (image/PDF).
// The order waits "on hold" until the shop checks the receipt.
export const MANUAL_METHODS: ManualMethod[] = [
    {
        id: 'baridimob',
        title: 'BaridiMob',
        icon: 'fa-solid fa-mobile-screen-button',
        logo: '/images/payments/algerie-poste.svg',
        fields: [
            { label: 'payment.fieldRip', value: '00799999004110763497', copy: true },
        ],
    },
    {
        id: 'ccp',
        title: 'CCP',
        icon: 'fa-solid fa-building-columns',
        logo: '/images/payments/algerie-poste.svg',
        fields: [
            { label: 'payment.fieldAccount', value: '41107634', copy: true },
            { label: 'payment.fieldKey', value: '79', copy: true },
            { label: 'payment.fieldHolder', value: 'AHMANE MOHAMED' },
            { label: 'payment.fieldAddress', value: 'Alger Centre' },
        ],
    },
    {
        id: 'binance',
        title: 'Binance Pay',
        icon: 'fa-brands fa-bitcoin',
        logo: '/images/payments/binance.svg',
        currency: 'USD',
        fields: [
            { label: 'payment.fieldBinanceId', value: '140131310', copy: true },
        ],
    },
    {
        id: 'redotpay',
        title: 'RedotPay',
        icon: 'fa-solid fa-wallet',
        logo: '/images/payments/redotpay.png',
        currency: 'USD',
        fields: [
            { label: 'payment.fieldRedotpayId', value: '1618386065', copy: true },
        ],
    },
    {
        id: 'iban',
        title: 'IBAN (EUR)',
        icon: 'fa-solid fa-euro-sign',
        currency: 'EUR',
        fields: [
            { label: 'payment.fieldHolder', value: 'AYMEN AMARI' },
            { label: 'payment.fieldIban', value: 'BE54 9672 9434 0297', copy: true },
        ],
    },
]

// Every accepted method, for the "how you can pay" lists (home, cart, cart drawer)
export type PayMethod = { title: string, icon: string, logo?: string, instant?: boolean }

export const PAY_METHODS: PayMethod[] = [
    { title: 'CIB / Edahabia', icon: 'fa-regular fa-credit-card', instant: true },
    ...MANUAL_METHODS.map(m => ({ title: m.title, icon: m.icon, logo: m.logo })),
]

export const findManualMethod = (id: string) => MANUAL_METHODS.find(m => m.id === id)

// Receipt upload limits (checked again on the server)
export const PROOF_MAX_BYTES = 5 * 1024 * 1024
export const PROOF_ACCEPT = 'image/jpeg,image/png,image/webp,application/pdf'
