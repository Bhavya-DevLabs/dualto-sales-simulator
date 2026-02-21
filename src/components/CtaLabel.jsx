/**
 * Renders a CTA button label with proper arrow alignment.
 * If the label contains "→", splits it into text + arrow span
 * with flex alignment so the arrow is perfectly vertically centered.
 */
export default function CtaLabel({ children }) {
  if (typeof children !== 'string' || !children.includes('→')) {
    return children;
  }

  const parts = children.split('→');
  return (
    <>
      {parts[0]}
      <span style={{ lineHeight: 1, display: 'inline-flex', alignItems: 'center' }}>→</span>
      {parts[1] || ''}
    </>
  );
}
