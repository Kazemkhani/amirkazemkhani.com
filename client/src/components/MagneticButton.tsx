import { useRef, useState } from 'react';

/**
 * Wraps any element to give it a magnetic hover effect.
 * The element subtly follows the cursor within its bounds.
 * Uses transform (compositor thread) — no layout thrash.
 */
const MagneticButton = ({
  children,
  strength = 0.3,
  className = '',
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate(0px, 0px)');

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform(`translate(${x}px, ${y}px)`);
  };

  const onLeave = () => {
    setTransform('translate(0px, 0px)');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{
        transform,
        transition: 'transform 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      {children}
    </div>
  );
};

export default MagneticButton;
