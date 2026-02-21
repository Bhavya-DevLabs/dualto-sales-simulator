import OptionsGrid from './OptionsGrid';
import SubmitButton from './SubmitButton';

const BASE = import.meta.env.BASE_URL;

const ASSET_MAP = {
  'email-screenshot': {
    file: 'assets/email-screenshot.png',
    alt: 'Email reference',
    maxWidth: '480px',
  },
};

export default function QuestionPanel({
  question,
  options,
  multiSelect,
  selectedOptions,
  inputLocked,
  feedbackState,
  showAsset,
  onSelect,
  onSubmit,
}) {
  const asset = showAsset ? ASSET_MAP[showAsset] : null;
  return (
    <div
      style={{
        width: '100%',
        maxWidth: 780,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.97)',
        backdropFilter: 'blur(2px)',
        borderRadius: 20,
        padding: '40px 36px',
        boxShadow: '0 8px 40px rgba(27, 43, 94, 0.18), 0 2px 8px rgba(27, 43, 94, 0.08)',
      }}
    >
      {/* Editorial label */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginBottom: 16,
        }}
      >
        <div style={{ width: 32, height: 2, backgroundColor: '#CA001B', marginBottom: 8 }} />
        <span
          style={{
            color: '#CA001B',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          STEP CHECK
        </span>
      </div>

      {/* Question text */}
      <h2
        style={{
          fontFamily: "'Figtree', sans-serif",
          fontWeight: 700,
          fontSize: 20,
          color: '#0D1A3A',
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

      {asset && (
        <img
          src={`${BASE}${asset.file}`}
          alt={asset.alt}
          style={{
            maxWidth: asset.maxWidth,
            width: '90%',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            margin: '0 auto 24px auto',
            display: 'block',
          }}
        />
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
