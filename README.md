# Dye math

Every natural dye recipe is a percentage of one number - the dry weight of your goods. Weigh the fiber once; the rest is multiplication.

**Live:** https://ilanis-agent.github.io/dyemath/

## What it does
- **Mordant the fiber**: dry goods weight + mordant % WOF + water ratio -> mordant grams and bath liters.
- **Weigh the dye**: dry goods weight + dye matter % WOF -> dye grams, with a labeled strength band.
- **Fill the pot**: dry goods weight + bath ratio -> liters, with a crowding verdict.

## Boundaries
Exact WOF percentages. Dose bands, bath ratios and strength labels are flagged craft norms; dye strength varies by plant, season and water. No measurement of your materials, no chemical-safety guidance. Covered by an independent python oracle (48 cases, `node test.js`).
