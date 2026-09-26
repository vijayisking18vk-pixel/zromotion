import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "../../lib/utils";
import { Calendar } from "lucide-react";

export const ScrollTimeline = ({
  events = [],
  title = "Timeline",
  subtitle = "Scroll to explore the journey",
  animationOrder = "sequential",
  cardAlignment = "alternating",
  lineColor = "bg-primary/30",
  activeColor = "bg-primary",
  progressIndicator = true,
  cardVariant = "default",
  cardEffect = "none",
  parallaxIntensity = 0.15,
  progressLineWidth = 2,
  progressLineCap = "round",
  dateFormat = "badge",
  revealAnimation = "fade",
  className = "",
  connectorStyle = "line",
  perspective = false,
  darkMode = false,
  smoothScroll = true,
}) => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const timelineRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 30%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const newIndex = Math.floor(v * events.length);
      if (
        newIndex !== activeIndex &&
        newIndex >= 0 &&
        newIndex < events.length
      ) {
        setActiveIndex(newIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, events.length, activeIndex]);

  const getCardVariants = (index) => {
    const baseDelay =
      animationOrder === "simultaneous"
        ? 0
        : animationOrder === "staggered"
        ? index * 0.15
        : index * 0.2;

    const initialStates = {
      fade: { opacity: 0, y: 30 },
      slide: {
        x:
          cardAlignment === "left"
            ? -60
            : cardAlignment === "right"
            ? 60
            : index % 2 === 0
            ? -60
            : 60,
        opacity: 0,
      },
      scale: { scale: 0.9, opacity: 0 },
      flip: { rotateY: 90, opacity: 0 },
      none: { opacity: 1 },
    };

    return {
      initial: initialStates[revealAnimation] || initialStates.fade,
      whileInView: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          delay: baseDelay,
          ease: [0.25, 0.1, 0.25, 1.0],
        },
      },
      viewport: { once: true, margin: "-80px" },
    };
  };

  return (
    <div
      ref={scrollRef}
      className={cn(
        "relative w-full overflow-hidden",
        className
      )}
    >
      <div className="relative max-w-6xl mx-auto px-4 pb-24">
        <div className="relative mx-auto">
          {/* Base Background Track Line */}
          <div
            className="h-full absolute top-0 z-10 w-[2px] bg-[rgba(185,166,242,0.35)] left-6 md:left-1/2 -translate-x-1/2"
          />

          {/* Enhanced Progress Indicator with Traveling Glow Comet */}
          {progressIndicator && (
            <>
              {/* The main filled progress line */}
              <motion.div
                className="absolute top-0 z-10 w-[2px] left-6 md:left-1/2 -translate-x-1/2"
                style={{
                  height: progressHeight,
                  borderRadius: progressLineCap === "round" ? "9999px" : "0px",
                  background: `linear-gradient(to bottom, #8C7AE6, #B9A6F2)`,
                  boxShadow: `
                    0 0 14px rgba(140, 122, 230, 0.6),
                    0 0 24px rgba(185, 166, 242, 0.4)
                  `,
                }}
              />

              {/* The traveling glow "comet" at the head of the line */}
              <motion.div
                className="absolute z-20 left-6 md:left-1/2 pointer-events-none"
                style={{
                  top: progressHeight,
                  translateX: "-50%",
                  translateY: "-50%",
                }}
              >
                <motion.div
                  className="w-5 h-5 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(140,122,230,0.95) 0%, rgba(185,166,242,0.6) 45%, rgba(185,166,242,0) 70%)",
                    boxShadow: `
                      0 0 16px 4px rgba(140, 122, 230, 0.7),
                      0 0 28px 8px rgba(185, 166, 242, 0.5),
                      0 0 42px 14px rgba(185, 166, 242, 0.3)
                    `,
                  }}
                  animate={{
                    scale: [1, 1.35, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </>
          )}

          {/* Events Container */}
          <div className="relative z-20">
            {events.map((event, index) => {
              const yOffset = useTransform(
                smoothProgress,
                [0, 1],
                [parallaxIntensity * 60, -parallaxIntensity * 60]
              );

              const isEven = index % 2 === 0;

              return (
                <div
                  key={event.id || index}
                  ref={(el) => {
                    timelineRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex items-center mb-16 py-2",
                    "flex-col md:flex-row",
                    cardAlignment === "alternating"
                      ? isEven
                        ? "md:justify-start"
                        : "md:flex-row-reverse md:justify-start"
                      : "md:justify-start"
                  )}
                >
                  {/* Central Timeline Node */}
                  <div
                    className="absolute top-8 md:top-1/2 transform -translate-y-1/2 z-30 left-6 md:left-1/2 -translate-x-1/2"
                  >
                    <motion.div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-colors duration-300",
                        index <= activeIndex
                          ? "border-[#8C7AE6] bg-[#FFFFFF] text-[#8C7AE6]"
                          : "border-[rgba(185,166,242,0.4)] bg-[#FFFFFF] text-[#8C879B]"
                      )}
                      animate={
                        index <= activeIndex
                          ? {
                              scale: [1, 1.25, 1],
                              boxShadow: [
                                "0 0 0px rgba(140,122,230,0)",
                                "0 0 16px rgba(140,122,230,0.6)",
                                "0 0 0px rgba(140,122,230,0)",
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        repeatDelay: 3,
                        ease: "easeInOut",
                      }}
                    >
                      {event.phase || `0${index + 1}`}
                    </motion.div>
                  </div>

                  {/* Event Content Card */}
                  <motion.div
                    className={cn(
                      "relative z-30 transition-all duration-300 w-full pl-16 md:pl-0",
                      cardAlignment === "alternating"
                        ? isEven
                          ? "md:mr-[calc(50%+32px)] md:w-[calc(50%-32px)]"
                          : "md:ml-[calc(50%+32px)] md:w-[calc(50%-32px)]"
                        : "md:w-[calc(50%-32px)]"
                    )}
                    variants={getCardVariants(index)}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true, margin: "-60px" }}
                    style={parallaxIntensity > 0 ? { y: yOffset } : undefined}
                  >
                    {event.customRender ? (
                      event.customRender(event, index, index <= activeIndex)
                    ) : (
                      <div
                        style={{
                          backgroundColor: "var(--surface)",
                          border: "1px solid var(--surface-border)",
                          borderRadius: "24px",
                          padding: "clamp(1.5rem, 3vw, 2.2rem)",
                          boxShadow: "0 10px 30px rgba(185, 166, 242, 0.08)",
                          transition: "transform 0.3s ease, border-color 0.3s ease",
                        }}
                        className="clickable"
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginBottom: "0.8rem",
                          }}
                        >
                          <h3
                            style={{
                              fontFamily: "var(--font-display)",
                              fontSize: "clamp(1.2rem, 1.8vw, 1.45rem)",
                              fontWeight: 700,
                              color: "var(--ink)",
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {event.title}
                          </h3>

                          {event.timeframe && (
                            <span
                              style={{
                                fontFamily: "var(--font-display)",
                                fontSize: "0.75rem",
                                fontWeight: 600,
                                color: "var(--primary-deep)",
                                backgroundColor: "#FFFFFF",
                                border: "1px solid var(--surface-border)",
                                padding: "0.25rem 0.75rem",
                                borderRadius: "100px",
                              }}
                            >
                              {event.timeframe}
                            </span>
                          )}
                        </div>

                        <p
                          style={{
                            fontSize: "0.94rem",
                            color: "var(--ink-secondary)",
                            lineHeight: 1.65,
                            marginBottom: event.signals ? "1.25rem" : 0,
                          }}
                        >
                          {event.description}
                        </p>

                        {event.signals && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "0.5rem",
                            }}
                          >
                            {event.signals.map((signal, sIdx) => (
                              <span
                                key={sIdx}
                                style={{
                                  fontSize: "0.75rem",
                                  fontFamily: "var(--font-display)",
                                  color: "var(--ink)",
                                  backgroundColor: "#FFFFFF",
                                  border: "1px solid var(--surface-border)",
                                  padding: "0.25rem 0.65rem",
                                  borderRadius: "6px",
                                }}
                              >
                                ✦ {signal}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
