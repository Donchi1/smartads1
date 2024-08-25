const FORMTER = new Intl.NumberFormat(undefined, {
  currency: 'EUR',
  style: 'currency',
})

export default function formatCurrency(currency:number) {
  return FORMTER.format(currency)
}


