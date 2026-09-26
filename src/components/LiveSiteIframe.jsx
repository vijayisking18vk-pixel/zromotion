import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Lock, RotateCw, MousePointer, ShieldCheck } from 'lucide-react';

export default function LiveSiteIframe({
  url,
  title,
  domain,
  initialInteractive = false,
  desktopWidth = 1200,
  minHeight = 440,
  imageFallback,
}) {
  const isInstagram = url?.includes('instagram.com');
  const instagramHandle = isInstagram ? url.split('instagram.com/')[1]?.replace(/\/$/, '') : '';
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [isInteractive, setIsInteractive] = useState(initialInteractive);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Dynamically calculate scale based on container width so the full desktop homepage renders crisply
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          // Calculate scale to fit desktopWidth (e.g. 1200px)
          const newScale = width / desktopWidth;
          setScale(newScale);
        }
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [desktopWidth]);

  const handleRefresh = (e) => {
    e.stopPropagation();
    setIsLoading(true);
    setRefreshKey((prev) => prev + 1);
  };

  const toggleInteractive = (e) => {
    e.stopPropagation();
    setIsInteractive((prev) => !prev);
  };

  useEffect(() => {
    if (isInstagram) {
      setIsLoading(false);
    }
  }, [isInstagram]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: `${minHeight}px`,
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        border: '1px solid var(--surface-border)',
        boxShadow: '0 20px 45px rgba(20, 16, 24, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Browser Chrome Header */}
      <div
        style={{
          height: '44px',
          backgroundColor: 'var(--surface)',
          borderBottom: '1px solid var(--surface-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingInline: '1rem',
          gap: '0.75rem',
          userSelect: 'none',
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        {/* Window Traffic Lights */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F56', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FFBD2E', display: 'inline-block' }} />
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#27C93F', display: 'inline-block' }} />
        </div>

        {/* Live URL Pill */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit ${domain} directly`}
          style={{
            flex: 1,
            maxWidth: '380px',
            height: '28px',
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--surface-border)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingInline: '0.6rem',
            gap: '0.4rem',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--ink)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            transition: 'border-color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary-deep)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--surface-border)')}
        >
          <Lock size={11} color={isInstagram ? '#E1306C' : 'var(--primary-deep)'} />
          <span style={{ opacity: 0.5 }}>https://</span>
          <span style={{ fontWeight: 600 }}>{domain.replace('https://', '').replace('http://', '')}</span>
          <span
            style={{
              marginLeft: 'auto',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              boxShadow: '0 0 6px #10B981',
            }}
          />
        </a>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {!isInstagram && (
            <button
              onClick={toggleInteractive}
              title={isInteractive ? 'Disable direct interaction to allow smooth scrolling' : 'Enable direct interaction within live site'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                borderRadius: '6px',
                fontSize: '0.7rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                backgroundColor: isInteractive ? 'var(--primary-deep)' : '#FFFFFF',
                color: isInteractive ? '#FFFFFF' : 'var(--ink)',
                border: isInteractive ? '1px solid var(--primary-deep)' : '1px solid var(--surface-border)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <MousePointer size={11} />
              <span>{isInteractive ? 'Interactive' : 'Click to Browse'}</span>
            </button>
          )}

          {!isInstagram && (
            <button
              onClick={handleRefresh}
              title="Reload homepage"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '26px',
                height: '26px',
                borderRadius: '6px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--surface-border)',
                color: 'var(--ink-secondary)',
                cursor: 'pointer',
              }}
            >
              <RotateCw size={11} />
            </button>
          )}

          {/* External Link Out */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open in new tab"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '26px',
              height: '26px',
              borderRadius: '6px',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--surface-border)',
              color: 'var(--ink)',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Frame Viewport */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
        }}
      >
        {isInstagram ? (
          /* Specialized Social Channel Showcase Viewport */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              backgroundColor: '#FAF5FF',
              overflow: 'hidden',
            }}
          >
            {/* Instagram Profile Header */}
            <div
              style={{
                padding: '0.85rem 1.25rem',
                backgroundColor: '#FFFFFF',
                borderBottom: '1px solid var(--surface-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                zIndex: 3,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      backgroundColor: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      color: '#dc2743',
                    }}
                  >
                    {title.charAt(0)}
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', color: 'var(--ink)' }}>
                      @{instagramHandle || title.toLowerCase()}
                    </span>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '15px',
                        height: '15px',
                        borderRadius: '50%',
                        backgroundColor: '#3897f0',
                        color: '#FFFFFF',
                        fontSize: '9px',
                        fontWeight: 900,
                      }}
                    >
                      ✓
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--ink-secondary)' }}>
                    Official Channel • Verified Creative Campaign
                  </span>
                </div>
              </div>

              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  backgroundColor: '#0095F6',
                  color: '#FFFFFF',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-display)',
                  padding: '0.4rem 0.9rem',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(0, 149, 246, 0.3)',
                }}
              >
                <span>View on Instagram</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Campaign Media Showcase */}
            <div
              style={{
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#141018',
              }}
            >
              <img
                src={imageFallback || `/assets/images/${instagramHandle.toLowerCase().includes('poorvika') ? 'poorvika' : 'vooki'}.jpg`}
                alt={title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20, 16, 24, 0.8) 0%, rgba(20, 16, 24, 0.1) 50%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 'clamp(1rem, 2.5vw, 1.75rem)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <div style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', marginBottom: '0.2rem' }}>
                      {title} &bull; Creative Campaign
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.8rem' }}>
                      ✦ High-Engagement Content &bull; Viral Reels &bull; Omnichannel Strategy
                    </div>
                  </div>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(8px)',
                      color: '#141018',
                      padding: '0.5rem 1.1rem',
                      borderRadius: '100px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      textDecoration: 'none',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
                    }}
                  >
                    <span>Open Live Channel</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Loading Spinner / Skeleton */}
            {isLoading && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  zIndex: 5,
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '3px solid var(--surface)',
                    borderTopColor: 'var(--primary-deep)',
                    animation: 'spinLoader 0.9s linear infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--ink-muted)',
                    letterSpacing: '0.05em',
                  }}
                >
                  CONNECTING TO {domain.toUpperCase()}...
                </span>
              </div>
            )}

            {/* Scaled Live Iframe */}
            <div
              style={{
                width: `${desktopWidth}px`,
                height: `${Math.round(100 / scale)}%`,
                minHeight: '850px',
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                position: 'absolute',
                top: 0,
                left: 0,
                pointerEvents: isInteractive ? 'auto' : 'none',
              }}
            >
              <iframe
                key={refreshKey}
                src={url}
                title={title}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  backgroundColor: '#FFFFFF',
                }}
              />
            </div>

            {/* Overlay when NOT interactive: click anywhere to toggle interactive browsing */}
            {!isInteractive && (
              <div
                onClick={toggleInteractive}
                style={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 4,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  paddingBottom: '1.25rem',
                  background: 'linear-gradient(to top, rgba(20, 16, 24, 0.15) 0%, transparent 40%)',
                }}
              >
                <div
                  style={{
                    background: 'rgba(20, 16, 24, 0.85)',
                    backdropFilter: 'blur(10px)',
                    color: '#FFFFFF',
                    padding: '0.45rem 1rem',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
                    transition: 'transform 0.2s ease',
                  }}
                >
                  <MousePointer size={13} color="var(--primary)" />
                  <span>Click to interact with live homepage</span>
                  <ExternalLink size={12} style={{ opacity: 0.7 }} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes spinLoader {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
