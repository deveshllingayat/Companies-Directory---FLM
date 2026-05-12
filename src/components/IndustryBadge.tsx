const MAP: Record<string, string> = {
  Technology: '#eff6ff|#1d4ed8', Finance: '#f0fdf4|#15803d',
  Healthcare: '#fdf4ff|#7e22ce', Retail: '#fff7ed|#c2410c',
  Energy: '#fefce8|#a16207', Automotive: '#f0f9ff|#0369a1',
  Media: '#fdf2f8|#be185d', 'Food & Beverage': '#f0fdf4|#166534',
  Pharmaceuticals: '#f5f3ff|#5b21b6', Manufacturing: '#f8fafc|#334155',
};

export default function IndustryBadge({ industry }: { industry: string }) {
  const [bg, color] = (MAP[industry] || '#f8fafc|#334155').split('|');
  return (
    <span style={{
      background: bg, color, padding: '3px 9px',
      borderRadius: 20, fontSize: 11.5, fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      {industry}
    </span>
  );
}