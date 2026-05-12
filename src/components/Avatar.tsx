import { getColor, getInitials } from '../utils/helpers';

interface Props { name: string; size?: number; radius?: number; }

export default function Avatar({ name, size = 36, radius = 9 }: Props) {
  const [bg, fg] = getColor(name);
  return (
    <div style={{
      width: size, height: size, borderRadius: radius,
      background: bg, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
      fontFamily: "'DM Mono', monospace",
    }}>
      {getInitials(name)}
    </div>
  );
}