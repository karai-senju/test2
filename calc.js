// Recursive-descent parser: no eval(), so typed input can never run code.
function evaluate(src) {
  const s = src.replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
  const tokens = s.match(/\d+\.?\d*|\.\d+|[-+*/^()]/g) || [];
  if (!tokens.length || tokens.join('') !== s) throw new Error('Invalid input');
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];

  function expr() {
    let v = term();
    while (peek() === '+' || peek() === '-') v = next() === '+' ? v + term() : v - term();
    return v;
  }
  function term() {
    let v = unary();
    while (peek() === '*' || peek() === '/') {
      const op = next(), r = unary();
      if (op === '/' && r === 0) throw new Error('Cannot divide by zero');
      v = op === '*' ? v * r : v / r;
    }
    return v;
  }
  function unary() {
    if (peek() === '-') { next(); return -unary(); }
    if (peek() === '+') { next(); return unary(); }
    return power();
  }
  function power() {
    const base = primary();
    return peek() === '^' ? (next(), base ** unary()) : base; // right-associative, -2^2 = -4
  }
  function primary() {
    const t = next();
    if (t === '(') {
      const v = expr();
      if (next() !== ')') throw new Error('Missing )');
      return v;
    }
    if (t !== undefined && /[\d.]/.test(t[0])) return parseFloat(t);
    throw new Error('Invalid input');
  }

  const v = expr();
  if (i < tokens.length) throw new Error('Invalid input');
  if (!Number.isFinite(v)) throw new Error('Result out of range');
  return v;
}

// 12 significant digits hides float noise: 0.1 + 0.2 shows 0.3.
function format(n) {
  return String(parseFloat(n.toPrecision(12)));
}

if (typeof module !== 'undefined') module.exports = { evaluate, format };
