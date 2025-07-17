/**
 * Teksto transformavimas
 * @param {string} text Bet koks tekstas
 */
export function capitalize(text) {
  return text
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}
