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
  const isOdd = options.length % 2 !== 0;

  // CSS class for responsive overrides
  const gridClass = isFourColumn
    ? 'options-grid-four-column'
    : isVerticalLarge
      ? 'options-grid-vertical-large'
      : 'options-grid-responsive';

  // Effective cardLayout passed to each card
  const effectiveCardLayout = isFourColumn ? 'four-column' : cardLayout;

  // Grid columns: 4 for four-column, 3 for vertical-large (portrait cards), 2 default
  const columns = isFourColumn
    ? 'repeat(4, 1fr)'
    : isVerticalLarge
      ? 'repeat(3, 1fr)'
      : '1fr 1fr';

  const maxWidth = isFourColumn ? 1140 : isVerticalLarge ? 900 : 780;

  return (
    <div
      className={gridClass}
      style={{
        display: 'grid',
        gridTemplateColumns: columns,
        gap: isVerticalLarge ? 16 : 12,
        width: '100%',
        maxWidth,
        alignItems: 'stretch',
      }}
    >
      {options.map((option, index) => {
        // For default 2-column: last odd item spans 2 cols. Others: no spanning.
        const isLastAndOdd = !isFourColumn && !isVerticalLarge && isOdd && index === options.length - 1;

        return (
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
              gridColumn: isLastAndOdd ? 'span 2' : 'auto',
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
        );
      })}
    </div>
  );
}
