"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function TimerOverlay({ onComplete }) {
  const [init, setInit] = useState(true);
  const [timer, setTimer] = useState(100);
  const [showTimerMask, setShowTimerMask] = useState(false);
  const [showScreenMask, setShowScreenMask] = useState(false);
  const [hideZero, setHideZero] = useState(false);
  const [showLuminosityMasks, setShowLuminosityMasks] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setInit(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!init && timer > 0) {
      const i = setInterval(() => setTimer((t) => t - 1), 80);
      return () => clearInterval(i);
    }
  }, [init, timer]);

  useEffect(() => {
    if (timer === 0) {
      setShowTimerMask(true);
      
      const screenMaskTimeout = setTimeout(() => setShowScreenMask(true), 1000);
      

      const luminosityTimeout = setTimeout(() => {
        setShowLuminosityMasks(true);
      }, 1500);
      
      const hideTimeout = setTimeout(() => {
        setHideZero(true);
        setShowTimerMask(false);
        setShowScreenMask(false);
        if (onComplete) onComplete();
      }, 2200);

      return () => {
        clearTimeout(screenMaskTimeout);
        clearTimeout(luminosityTimeout);
        clearTimeout(hideTimeout);
      };
    }
  }, [timer, onComplete]);

  return (
    <>
      {/* Background  */}
      <div className="absolute inset-0 w-full h-full z-0 select-none">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          className="object-cover"
          draggable={false}
          unselectable="on"
          style={{ filter: "brightness(1.07)" }}
        />
      </div>

      <div
        className="absolute top-0 left-0 w-full z-10 pointer-events-none"
        style={{
          height: "100%",
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)",
          backdropFilter: "blur(60px)",
          WebkitBackdropFilter:  "blur(60px)",
        }}
      />


      {!init && (
        <div className="absolute bottom-[2vw] right-[5vw] z-20">
          <span
            className="
              font-fustat font-bold
              text-white
              text-[467.32px]
              leading-[0.8]
              tracking-tightcustom
              select-none
              transition-all
              duration-200
              text-right
              pointer-events-none"
            style={{
              lineHeight: "80%",
              letterSpacing: "-3%",
            }}
          >
            {timer === 0 ? "zero" : timer}
          </span>
        </div>
      )}

      {showLuminosityMasks && (
        <>
          {/* First Mask */}
          <div className="absolute inset-0 z-30 select-none">
            <Image
              src="/mask-1.jpg" 
              alt="Luminosity mask 1"
              fill
              priority
              className="object-cover"
              draggable={false}
              unselectable="on"
              style={{
                mixBlendMode: "luminosity",
                opacity: 0.5
              }}
            />
          </div>

      
        </>
      )}

      {init && (
        <span
          className="
            absolute left-30 bottom-10
            font-fustat font-normal
            text-[24px]
            leading-[1]
            text-gray-600
            z-20
            select-none
            pointer-events-none
            transform -translate-x-1/2
            text-center
          "
          style={{
            letterSpacing: "-3%",
            lineHeight: "100%",
          }}
        >
          Initializing Reality
        </span>
      )}
    </>
  );
}