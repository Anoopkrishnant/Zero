'use client';
import Image from 'next/image';

export default function FirstXp() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/bg-2.png"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{ opacity: 0.85 }}
      >
        <source src="/bg-v.mp4" type="video/mp4" />
      </video>

      <div
        className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
        style={{
          WebkitMaskImage: 'radial-gradient(240px 240px at 50% 50%, transparent 97%, #000 100%)',
          maskImage: 'radial-gradient(240px 240px at 50% 50%, transparent 97%, #000 100%)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
        }}
      >
        <Image
          src="/mask-2.jpg"
          alt="overlay"
          fill
          priority
          className="object-cover"
          style={{ mixBlendMode: 'overlay', opacity: 0.9 }}
        />
      </div>

      {/* BG Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: '#d9d9d95e',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      />

      {/* Text Above */}
      <div className="absolute z-40 mb-10 top-30">
  <div
    className="uppercase tracking-[0.1em] font-semibold text-center block"
    style={{
      fontSize: 15,
      fontFamily: 'Fustat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
      letterSpacing: '0px',
      wordSpacing: '8px', 
      fontWeight: 600,
      background: `
        linear-gradient(270deg, #DBDEDD 16.13%, #6EFFB2 25.98%, #5FBFCC 33.9%, #364D55 44.46%)`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      
    }}
  >
    YOU’VE JUST EARNED YOUR FIRST XP
  </div>
</div>


      {/* Main ontainer */}
      <div className="relative z-30 flex flex-col items-center justify-center w-full h-full" >
      <div className="relative mb-28 ">

        <div
          className="absolute left-1/2 top-1/2 z-20 pointer-events-none"
          style={{
            width: 520,
            height: 520,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse 60% 60% at 50% 50%,rgba(96,198,255,.17) 25%, rgba(96,198,255,0) 70%)',
            filter: 'blur(6px)',
            opacity: 0.94,
            
          }}
        />

        <div
          className="flex items-center justify-center select-none z-30"
          style={{
            width: 860,
            height: 423,
            borderRadius: 239.65,
            background:
            'linear-gradient(180deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.35) 100%), radial-gradient(180% 120% at 50% 0%,rgba(64, 34, 199, 1) 0%, #7F58FF 45%,rgb(247, 250, 250) 85%)',
          boxShadow: `
            0 0 80px 40px rgba(255,255,255,0.80),         
            0 0 40px 10px rgba(255,255,255,0.68),        
            0 10px 22px rgba(255,255,255,0.9) inset,     
            0 0 0 1px rgba(255,255,255,0.2) inset,       
            0 140px 220px rgba(64,34,199,0.28) inset,
            0 60px 120px rgba(49,15,240,0.25) inset,
            0 24px 80px rgba(150,240,174,0.28) inset,
            0 42px 120px rgba(66,153,225,0.20),
            0 0 160px rgba(56,178,172,0.15)
          `,
          backdropFilter: 'blur(80px)',
          WebkitBackdropFilter: 'blur(80px)',
            opacity: 1,
          }}
        >
          <span 
            style={{
              marginRight: 24,
              fontFamily: 'Fustat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
              fontWeight: 600,
              fontSize: 221.48,
              letterSpacing: '-0.03em',
              lineHeight: '100%',
              color: '#fff',
              textShadow: '0 3px 14px rgba(233, 233, 233, 0.97)',

            }}
          >
            +500
         
          <span
            style={{
              fontFamily: 'Fustat, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
              fontSize: 50,
              fontWeight: 400,
              opacity: 0.95,
              alignSelf: 'flex-end',
              marginBottom: 26,
              letterSpacing: '-0.03em',
              color: '#fff',
              paddingLeft:'10px',
              
            }}
          >
            XP
          </span>
          </span>
        </div> 
      </div>
      </div>
    </div>
  );
}
