import OptionsGrid from './OptionsGrid';
import SubmitButton from './SubmitButton';

export default function QuestionPanel({
  preText,
  question,
  options,
  multiSelect,
  selectedOptions,
  inputLocked,
  feedbackState,
  onSelect,
  onSubmit,
}) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 780,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Micro-label pill */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: 16,
        }}
      >
        <div
          style={{
            backgroundColor: '#1B2B5E',
            color: '#FFFFFF',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '6px 18px',
            borderRadius: 9999,
          }}
        >
          STEP CHECK
        </div>
      </div>

      {/* Pre-text narrative (italic, muted, above the question) */}
      {preText && (
        <div
          style={{
            maxWidth: 680,
            width: '100%',
            marginBottom: 24,
            paddingBottom: 20,
            borderBottom: '1px solid #CBD5E1',
          }}
        >
          <p
            style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 400,
              fontSize: 15,
              fontStyle: 'italic',
              color: '#64748B',
              textAlign: 'center',
              lineHeight: 1.7,
              whiteSpace: 'pre-line',
              margin: 0,
            }}
          >
            {preText}
          </p>
        </div>
      )}

      {/* Question text */}
      <h2
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: 24,
          color: '#134E4A',
          textAlign: 'center',
          lineHeight: 1.5,
          marginBottom: multiSelect ? 8 : 32,
          maxWidth: 680,
          whiteSpace: 'pre-line',
        }}
      >
        {question}
      </h2>

      {/* Multi-select hint */}
      {multiSelect && (
        <p
          style={{
            fontFamily: "'Noto Sans', sans-serif",
            fontWeight: 500,
            fontSize: 13,
            color: '#0891B2',
            fontStyle: 'italic',
            textAlign: 'center',
            marginBottom: 32,
          }}
        >
          Select all that apply
        </p>
      )}

      <OptionsGrid
        options={options}
        selectedOptions={selectedOptions}
        inputLocked={inputLocked}
        feedbackState={feedbackState}
        onSelect={onSelect}
      />

      <SubmitButton
        disabled={inputLocked || selectedOptions.length === 0}
        onClick={onSubmit}
      />
    </div>
  );
}
