// utils/currencyUtils.ts

/**
 * Formata um número para o padrão monetário brasileiro.
 * Exemplo: 190 → "R$ 190,00"
 */
export function formatCurrencyBRL(value: number | string): string {
  const numeric = typeof value === "string"
    ? parseFloat(value.replace(/\./g, "").replace(",", "."))
    : value;

  if (isNaN(numeric)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numeric);
}