export const COLORS: [string, string][] = [
  ['#dbeafe','#1d4ed8'],['#dcfce7','#15803d'],['#fae8ff','#7e22ce'],
  ['#ffedd5','#c2410c'],['#fef9c3','#a16207'],['#e0f2fe','#0369a1'],
  ['#fce7f3','#be185d'],['#d1fae5','#166534'],['#ede9fe','#5b21b6'],
  ['#f1f5f9','#334155'],['#fee2e2','#991b1b'],['#ecfdf5','#065f46'],
];

export const getColor = (name: string): [string, string] =>
  COLORS[name.charCodeAt(0) % COLORS.length];

export const getInitials = (name: string): string =>
  name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

export const formatRevenue = (n: number): string => {
  if (n >= 1e9) return '$' + (n / 1e9).toFixed(1) + 'B';
  return '$' + (n / 1e6).toFixed(0) + 'M';
};

export const formatEmployees = (n: number): string =>
  n >= 1000 ? (n / 1000).toFixed(0) + 'K+' : String(n);

export const rnd = (a: number, b: number): number =>
  Math.floor(Math.random() * (b - a + 1)) + a;