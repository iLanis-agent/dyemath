/* Dye math - exact weight-of-goods percentages on labeled natural-dye norms. No chemical-safety guidance. */
const r2 = x => Math.round(x * 100) / 100;
const bad = m => { throw new Error(m); };
const pos = (v, m) => { if (!Number.isFinite(v) || v <= 0) bad(m); };

function mordant(goodsG, pct, waterRatio) {
  pos(goodsG, 'goods weight must be positive'); pos(pct, 'mordant percent must be positive'); pos(waterRatio, 'water ratio must be positive');
  if (pct > 50) bad('over 50% WOF is not a mordant dose (labeled)');
  const mordantG = goodsG * pct / 100;
  const waterL = goodsG * waterRatio / 1000;
  const verdict = pct < 8 ? 'a light mordant - pale-fast shades (labeled)' :
    pct <= 20 ? 'the standard alum band (labeled)' : 'a heavy mordant - watch the hand of the fiber (labeled)';
  return { mordantG: r2(mordantG), waterL: r2(waterL), verdict };
}

function dyematter(goodsG, pct) {
  pos(goodsG, 'goods weight must be positive'); pos(pct, 'dye percent must be positive');
  if (pct > 200) bad('over 200% WOF means more garden than pot (labeled)');
  const dyeG = goodsG * pct / 100;
  const verdict = pct < 10 ? 'a strong dyestuff - go gentle (labeled)' :
    pct <= 35 ? 'the middle band - most plant dyes (labeled)' :
    pct <= 100 ? 'a weak dyestuff - bulk needed (labeled)' : 'an extraction marathon (labeled)';
  return { dyeG: r2(dyeG), verdict };
}

function bath(goodsG, ratio) {
  pos(goodsG, 'goods weight must be positive'); pos(ratio, 'bath ratio must be positive');
  const waterL = goodsG * ratio / 1000;
  const verdict = ratio < 15 ? 'a crowded pot - stir often for even color (labeled)' :
    ratio <= 25 ? 'the standard bath (labeled)' : 'a roomy bath - the fiber swims (labeled)';
  return { waterL: r2(waterL), verdict };
}

const api = { mordant, dyematter, bath };
if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.Dyemath = api;
