import { motion } from 'framer-motion';
import OptionCard from './OptionCard';

export default function OptionsGrid({
  options,
  selectedOptions,
  inputLocked,
  feedbackState,
  onSelect,
}) {
  const isOdd = options.length % 2 !== 0;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        width: '100%',
        maxWidth: 780,
      }}
    >
      {options.map((option, index) => {
        const isLastAndOdd = isOdd && index === options.length - 1;

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
            />
          </motion.div>
        );
      })}
    </div>
  );
}
