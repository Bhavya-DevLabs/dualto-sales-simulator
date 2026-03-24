import OptionsGrid from './OptionsGrid';
import SubmitButton from './SubmitButton';

const BASE = import.meta.env.BASE_URL;

const ASSET_MAP = {
  'email-screenshot': {
    file: 'assets/email-screenshot.png',
    alt: 'Email reference',
    maxWidth: '480px',
  },
  'discussion-resources': {
    file: 'assets/discussion-using-resources.png',
    alt: 'Discussion using resources',
    maxWidth: '600px',
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
  cardLayout,
  gridLayout,
  panelCharacters,
}) {
  const asset = showAsset ? ASSET_MAP[showAsset] : null;

  // Wider container for vertical-large (PIC 02/06) and four-column (PIC 03) layouts
  const isFourColumn = gridLayout === 'four-column';
  const isVerticalLarge = cardLayout === 'vertical-large';
  const isWide = isVerticalLarge || isFourColumn;
  // Container must be wider than grid maxWidth to allow padding: 1200 > 1140, 960 > 900
  const containerMaxWidth = isFourColumn ? 1200 : isVerticalLarge ? 960 : 780;
  const questionMaxWidth = isWide ? '100%' : 680;

  return (
    <div
      style={{
        width: '100%',
        maxWidth: containerMaxWidth,
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
          maxWidth: questionMaxWidth,
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
        gridLayout={gridLayout}
        cardLayout={cardLayout}
      />

      {/* Panel characters — observer row below options (PIC 03) */}
      {panelCharacters && panelCharacters.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            marginTop: 28,
            paddingTop: 20,
            borderTop: '1px solid #CCFBF1',
            width: '100%',
          }}
        >
          {panelCharacters.map((char) => (
            <div
              key={char.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {/* TODO (PIC 03): Confirm specific character image files with user */}
              <img
                src={`${BASE}${char.image}`}
                alt={char.label}
                style={{
                  height: 72,
                  width: 72,
                  objectFit: 'contain',
                  borderRadius: '50%',
                  backgroundColor: '#F0FDFA',
                  padding: 4,
                  border: '2px solid #CCFBF1',
                }}
                draggable={false}
              />
              <span
                style={{
                  fontFamily: "'Noto Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: 11,
                  color: '#134E4A',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                {char.label}
              </span>
            </div>
          ))}
        </div>
      )}

      <SubmitButton
        disabled={inputLocked || selectedOptions.length === 0}
        onClick={onSubmit}
      />
    </div>
  );
}
