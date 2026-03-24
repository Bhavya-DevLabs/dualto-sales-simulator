import { motion } from 'framer-motion';
import OptionCard from './OptionCard';

/**
 * Dynamic column count based on option count:
 * - Even counts: split evenly (2→2, 4→2, 6→3, 8→4)
 * - Odd counts: use 3 per row, last row centers automatically
 */
function getColumns(count) {
  if (count <= 2) return 2;
  if (count === 3) return 3;
  if (count === 4) return 2;
  if (count <= 6) return 3;
  return 4;
}

export default function OptionsGrid({
  options,
  selectedOptions,
  inputLocked,
  feedbackState,
  onSelect,
  gridLayout,
  cardLayout,
}) {
  const isFourColumn = gridLayout === 'four-column';
  const isVerticalLarge = cardLayout === 'vertical-large';

  // CSS class for responsive overrides
  const gridClass = isFourColumn
    ? 'options-grid-four-column'
    : isVerticalLarge
      ? 'options-grid-vertical-large'
      : 'options-grid-responsive';

  // Effective cardLayout passed to each card
  const effectiveCardLayout = isFourColumn ? 'four-column' : cardLayout;

  const gap = isVerticalLarge ? 16 : 12;

  // four-column layout is explicit; otherwise compute dynamically
  const cols = isFourColumn ? 4 : getColumns(options.length);

  // Scale maxWidth to column count
  const maxWidth = isFourColumn
    ? 1140
    : cols === 4
      ? 1040
      : cols === 3
        ? (isVerticalLarge ? 900 : 780)
        : (isVerticalLarge ? 640 : 540);

  // Fixed card width: fills exactly `cols` per row accounting for gaps
  const cardBasis = `calc((100% - ${gap * (cols - 1)}px) / ${cols})`;

  return (
    <div
      className={gridClass}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap,
        width: '100%',
        maxWidth,
        margin: '0 auto',
      }}
    >
      {options.map((option, index) => (
        <motion.div
          key={option.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.38,
            delay: index * 0.06,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            flexBasis: cardBasis,
            maxWidth: cardBasis,
            minWidth: 0,
          }}
        >
          <OptionCard
            option={option}
            isSelected={selectedOptions.includes(option.id)}
            isDisabled={inputLocked}
            shouldShake={
              feedbackState === 'wrong' && selectedOptions.includes(option.id)
            }
            onSelect={onSelect}
            cardLayout={effectiveCardLayout}
          />
        </motion.div>
      ))}
    </div>
  );
}
