import { motion } from 'framer-motion';
import OptionCard from './OptionCard';

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
  const cols = isFourColumn ? 4 : 3;
  const maxWidth = isFourColumn ? 1140 : isVerticalLarge ? 900 : 780;

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
