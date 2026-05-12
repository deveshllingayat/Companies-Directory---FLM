const MAP = {
  Public:   { bg: '#f0fdf4', color: '#15803d', dot: '#22c55e' },
  Private:  { bg: '#fef3c7', color: '#92400e', dot: '#f59e0b' },
  Acquired: { bg: '#ede9fe', color: '#5b21b6', dot: '#8b5cf6' },
};

export default function StatusBadge({ status }: { status: string }) {
  const s = MAP[status as keyof typeof MAP] || MAP.Private;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.color,
      padding: '3px 9px', borderRadius: 20, fontSize: 11.5, fontWeight: 500,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
}