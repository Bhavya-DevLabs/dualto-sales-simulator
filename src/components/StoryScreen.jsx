import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';
import CtaLabel from './CtaLabel';

const BASE = import.meta.env.BASE_URL;

const ASSET_MAP = {
  'hospital-federation': {
    file: 'assets/hospital-federation.png',
    alt: 'Hospital Federation Form',
    maxWidth: '560px',
  },
  'mac-address': {
    file: 'assets/mac-address.jpeg',
    alt: 'MAC Address explanation',
    maxWidth: '560px',
  },
  'url-list': {
    file: 'assets/url-list.png',
    alt: 'Required URLs for whitelisting',
    maxWidth: '560px',
  },
  'polyphonic-setup': {
    file: 'assets/polyphonic-setup.png',
    alt: 'Polyphonic Fleet setup screen',
    maxWidth: '560px',
  },
  'encryption-scene': {
    file: 'characters/encryption-scene.png',
    alt: 'IT Lead asks about encryption mechanism',
    maxWidth: '480px',
  },
  'encryption-it-guy': {
    file: 'assets/encryption-mechanism-it-guy.png',
    alt: 'IT Lead asking about encryption mechanism',
    maxWidth: '520px',
  },
  'dualto-spec-confused': {
    file: 'assets/dualto-spec-confused.png',
    alt: 'Confused about the answer',
    maxWidth: '520px',
  },
  'hcp-group': {
    file: 'characters/hcp-group.png',
    alt: 'Sales rep discussing with HCPs',
    maxWidth: '480px',
  },
};

/* ─── Text content block (shared between default and split layouts) ─── */
function TextContent({ lines, linesAfter, asset, externalLink, ctaLabel, onComplete }) {
  return (
    <>
      {/* Editorial label */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 24,
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
          MISSION BRIEF
        </span>
      </div>

      {/* All lines shown immediately */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginBottom: 40,
        }}
      >
        {lines.map((line, i) => (
          <p
            key={`before-${i}`}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 500,
              fontSize: 20,
              color: '#FFFFFF',
              lineHeight: 1.8,
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto',
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Asset image */}
      {asset && (
        <div style={{ marginBottom: 20 }}>
          <img
            src={`${BASE}${asset.file}`}
            alt={asset.alt}
            style={{
              maxWidth: asset.maxWidth,
              width: '90%',
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              margin: '0 auto 24px auto',
              display: 'block',
            }}
          />
        </div>
      )}

      {/* Lines after asset */}
      {linesAfter && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            marginBottom: 40,
          }}
        >
          {linesAfter.map((line, i) => (
            <p
              key={`after-${i}`}
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: 20,
                color: '#FFFFFF',
                lineHeight: 1.8,
                textAlign: 'center',
                maxWidth: 640,
                margin: '0 auto',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {/* External link button */}
      {externalLink && (
        <div style={{ marginBottom: 20 }}>
          <a
            href={externalLink.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '12px 36px',
              borderRadius: 10,
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: 15,
              color: '#FFFFFF',
              border: '2px solid rgba(255,255,255,0.4)',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
          >
            <CtaLabel>{externalLink.label}</CtaLabel>
            <ExternalLinkIcon size={15} strokeWidth={2} />
          </a>
        </div>
      )}

      {/* CTA button */}
      <motion.button
        onClick={onComplete}
        style={{
          backgroundColor: '#CA001B',
          color: '#FFFFFF',
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          padding: '12px 40px',
          borderRadius: 10,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(202, 0, 27, 0.3)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
        }}
        whileHover={{ scale: 1.02, backgroundColor: '#A8001A' }}
        whileTap={{ scale: 0.97 }}
      >
        <CtaLabel>{ctaLabel}</CtaLabel>
      </motion.button>
    </>
  );
}

export default function StoryScreen({
  lines,
  onComplete,
  ctaLabel = 'Continue →',
  externalLink,
  showAsset,
  linesAfter,
  splitCharacters,
}) {
  const asset = showAsset ? ASSET_MAP[showAsset] : null;

  // Enter key: advance to next screen
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        onComplete();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onComplete]);

  /* ─── Split character layout: [LEFT CHAR] | [TEXT] | [RIGHT CHAR] ─── */
  if (splitCharacters) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'stretch',
          minHeight: 'calc(100vh - 76px)',
          backgroundColor: '#1B2B5E',
          marginLeft: -40,
          marginRight: -40,
        }}
      >
        {/* Left character — desktop only, right-aligned to sit flush against text */}
        <div
          className="hidden lg:flex"
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <img
            src={`${BASE}${splitCharacters.left}`}
            alt=""
            style={{
              height: 'calc(100vh - 76px)',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom right',
              display: 'block',
            }}
            draggable={false}
          />
        </div>

        {/* Center text container */}
        <div
          style={{
            width: 560,
            maxWidth: '100%',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px 24px',
          }}
        >
          <TextContent
            lines={lines}
            linesAfter={linesAfter}
            asset={asset}
            externalLink={externalLink}
            ctaLabel={ctaLabel}
            onComplete={onComplete}
          />
        </div>

        {/* Right character — desktop only, left-aligned to sit flush against text */}
        <div
          className="hidden lg:flex"
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          <img
            src={`${BASE}${splitCharacters.right}`}
            alt=""
            style={{
              height: 'calc(100vh - 76px)',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              objectPosition: 'bottom left',
              display: 'block',
            }}
            draggable={false}
          />
        </div>
      </div>
    );
  }

  /* ─── Default centered layout ─── */
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 76px)',
        backgroundColor: '#1B2B5E',
        marginLeft: -40,
        marginRight: -40,
        padding: '60px 24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 680, width: '100%' }}>
        <TextContent
          lines={lines}
          linesAfter={linesAfter}
          asset={asset}
          externalLink={externalLink}
          ctaLabel={ctaLabel}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}
