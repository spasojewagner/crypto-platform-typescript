export const customChartTooltip = (price: number, fixed: number) => {
  return `<div class="bg-indigo-800 text-white p-2">$${Math.fround(
    price,
  ).toFixed(fixed)}</div>`
}
