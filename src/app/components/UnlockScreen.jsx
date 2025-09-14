'use client';
import Image from "next/image";

export default function UnlockScreen() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#D2D2D2]">

      <video
        className="
          absolute inset-0 w-full h-full 
          object-cover object-center z-0 select-none
        "
        autoPlay
        loop
        muted
        playsInline
        poster="/bg-2.png" 
        style={{
          opacity: 0.60
        }}
      >
        <source src="/bg-v.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: '#d9d9d95e',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      />

      {/* Mask overlay */}
      <div className="absolute inset-0 z-15 select-none">
        <Image
          src="/mask-2.jpg"
          alt="Mask overlay"
          fill
          priority
          className="object-cover object-center select-none"
          draggable={false}
          unselectable="on"
          style={{
            mixBlendMode: "overlay",
            opacity: 0.2
          }}
        />
      </div>

 
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <span
          className="
            font-fustat font-semibold uppercase
            text-[20px] text-center select-none relative
            px-4 text-[#8198A1]
          "
          style={{
            fontStyle : 'bold',
            lineHeight: '100%',
            letterSpacing: '5px',
            fontVariantNumeric: 'lining-nums tabular-nums',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          DRAW A ZERO TO UNLOCK THE TRUTH.
        </span>
      </div>
    </div>
  );
}
