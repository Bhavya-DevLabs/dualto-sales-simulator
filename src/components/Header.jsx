import { useState } from 'react';
import { User, MapPin, LogOut } from 'lucide-react';

export default function Header({ currentScreenIndex, totalScreens, stageNumber, stageName, user, onSignOut }) {
  const progress = totalScreens > 1 ? (currentScreenIndex / (totalScreens - 1)) * 100 : 0;
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSignOutClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    onSignOut();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50 }}>
        {/* Header bar */}
        <header
          style={{
            height: 72,
            backgroundColor: '#CA001B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 32,
            paddingRight: 32,
            position: 'relative',
          }}
        >
          {/* Left: brand */}
          <div style={{ zIndex: 2 }}>
            <div
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800,
                fontSize: 20,
                color: '#FFFFFF',
                lineHeight: 1.2,
                letterSpacing: '0.04em',
              }}
            >
              DUALTO
            </div>
          </div>

          {/* Center: stage name (absolute centered) */}
          {stageName && (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                color: '#FFFFFF',
                letterSpacing: '0.01em',
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                zIndex: 1,
              }}
            >
              Stage {stageNumber} &middot; {stageName}
            </div>
          )}

          {/* Right: user pills + sign out */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 2 }}>
              {/* Region pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: '#FFFFFF',
                  color: '#CA001B',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '6px 16px',
                  borderRadius: 9999,
                }}
              >
                <MapPin size={14} strokeWidth={2.5} />
                {user.region}
              </div>

              {/* Name pill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: '#FFFFFF',
                  color: '#CA001B',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  padding: '6px 16px',
                  borderRadius: 9999,
                }}
              >
                <User size={14} strokeWidth={2.5} />
                {user.name}
              </div>

              {/* Sign Out icon button */}
              <button
                onClick={handleSignOutClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.4)',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  outline: 'none',
                  transition: 'background-color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
                }}
                aria-label="Sign Out"
                title="Sign Out"
              >
                <LogOut size={16} strokeWidth={2} />
              </button>
            </div>
          )}
        </header>

        {/* Progress bar */}
        <div style={{ height: 4, backgroundColor: '#CCFBF1', width: '100%' }}>
          <div
            style={{
              height: '100%',
              backgroundColor: '#0891B2',
              width: `${progress}%`,
              transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* Sign Out Confirmation Dialog */}
      {showConfirm && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(19, 78, 74, 0.75)',
            }}
            onClick={handleCancel}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              backgroundColor: '#FFFFFF',
              borderRadius: 24,
              padding: '40px 48px',
              maxWidth: 400,
              width: '90%',
              textAlign: 'center',
              boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: '#134E4A',
                marginBottom: 12,
              }}
            >
              Sign Out?
            </p>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 400,
                fontSize: 15,
                color: '#4A5568',
                lineHeight: 1.6,
                marginBottom: 28,
              }}
            >
              Are you sure? This will reset your progress.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={handleCancel}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '12px 32px',
                  borderRadius: 9999,
                  border: '2px solid #E0E0E0',
                  backgroundColor: '#FFFFFF',
                  color: '#134E4A',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '12px 32px',
                  borderRadius: 9999,
                  border: 'none',
                  backgroundColor: '#CA001B',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
