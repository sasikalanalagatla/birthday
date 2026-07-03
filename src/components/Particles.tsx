const particles = Array.from({ length: 58 }, (_, index) => ({
  id: index,
  left: `${(index * 47) % 100}%`,
  top: `${(index * 31) % 100}%`,
  delay: `${(index % 11) * 0.38}s`,
  size: `${2 + (index % 4)}px`,
}));

export function Particles() {
  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          style={{
            "--delay": particle.delay,
            "--left": particle.left,
            "--size": particle.size,
            "--top": particle.top,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
