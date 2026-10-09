const M = require('./engine.js');
const E = require('./expected.json');
let n = 0, fail = 0;
const eq = (a, b, tag) => {
  n++;
  if (JSON.stringify(a) !== JSON.stringify(b)) { fail++; console.error('FAIL', tag, JSON.stringify(a), '!=', JSON.stringify(b)); }
};
for (const c of E.mordant) { let r; try { r = M.mordant(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'mordant ' + c.in); }
for (const c of E.dyematter) { let r; try { r = M.dyematter(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'dyematter ' + c.in); }
for (const c of E.bath) { let r; try { r = M.bath(...c.in); } catch (e) { r = { error: e.message }; } eq(r, c.out, 'bath ' + c.in); }
// anchors
const mo = M.mordant(500, 15, 20);
eq(mo.mordantG, 75, 'anchor mordant g'); eq(mo.waterL, 10, 'anchor mordant water');
eq(M.dyematter(500, 20).dyeG, 100, 'anchor dye g');
eq(M.bath(500, 20).waterL, 10, 'anchor bath l');
// invariants
n++;
{
  const q = M.mordant(640, 12.5, 18);
  if (Math.abs(q.mordantG - 80) > 0.01) { fail++; console.error('FAIL mordant invariant'); }
}
n++;
{
  const q = M.dyematter(333, 33);
  if (Math.abs(q.dyeG - 109.89) > 0.01) { fail++; console.error('FAIL dye invariant'); }
}
// errors
const errs = [
  () => M.mordant(0, 15, 20), () => M.mordant(500, 0, 20), () => M.mordant(500, 15, 0), () => M.mordant(500, 55, 20),
  () => M.dyematter(0, 20), () => M.dyematter(500, 0), () => M.dyematter(500, 250),
  () => M.bath(0, 20), () => M.bath(500, 0), () => M.bath(-5, 20),
];
const msgs = ['goods weight must be positive','mordant percent must be positive','water ratio must be positive','over 50% WOF is not a mordant dose (labeled)',
  'goods weight must be positive','dye percent must be positive','over 200% WOF means more garden than pot (labeled)',
  'goods weight must be positive','bath ratio must be positive','goods weight must be positive'];
errs.forEach((f, i) => {
  n++;
  try { f(); fail++; console.error('FAIL no-throw', i); }
  catch (e) { if (e.message !== msgs[i]) { fail++; console.error('FAIL msg', i, e.message, 'want', msgs[i]); } }
});
console.log(fail ? fail + ' FAILURES / ' + n : n + '/' + n + ' checks pass');
process.exit(fail ? 1 : 0);
