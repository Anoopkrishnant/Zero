'use client';
import Image from "next/image";
import React from "react";

export default function XpFiveHundred() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-br from-[#f7fafd] to-[#e6ecf0]">

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
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "#d9d9d95e",
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
      />

      {/* Mask overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
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
          style={{ mixBlendMode: 'overlay', opacity: 0.2 }}
        />
      </div>


      <div
        className="absolute pointer-events-none z-40"
        style={{
          width: 971.2,
          height: 970.91,
          top: 54,
          opacity: 0.15,
          mixBlendMode: "plus-lighter",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1020 1020"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter:
              "drop-shadow(0px 0px 10px #fff) drop-shadow(0px 0px 18px rgba(198, 225, 255, 0.05))",
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="paint0_linear"
              x1="0"
              y1="0"
              x2="1020"
              y2="1020"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" stopOpacity="0.98" />
              <stop offset="0.4" stopColor="#E6F8FF" stopOpacity="0.78" />
              <stop offset="1" stopColor="#85d7ff" stopOpacity="0.69" />
            </linearGradient>
          </defs>
          <path
            d="M636.154 127.833C706.451 102.266 803.254 65.5173 872.313 111.528C965.274 173.375 909.873 329.036 870.947 409.577C938.982 330.828 1008.72 315.463 993.487 448.929C987.469 501.684 956.823 566.604 931.385 613.042C924.172 626.188 905.008 649.236 900.825 659.351C900.014 661.315 899.715 666.351 902.873 665.668C949.397 639.974 941.543 688.973 931.854 720.259C908.934 794.098 813.583 889.023 743.755 920.565C727.323 927.992 670.299 953.003 662.531 927.309L659.672 900.505C614.258 931.748 557.704 964.442 504.736 980.363C470.676 990.606 365.806 1013.57 352.063 969.009C338.319 924.449 388.342 902.553 409.897 870.67C332.856 902.127 228.754 948.522 148.171 904.005C59.3497 854.963 97.8915 711.253 128.153 635.876C100.538 669.937 34.8076 694.393 26.1431 633.358C16.0702 562.335 51.4109 476.673 84.7882 415.339C94.0928 398.223 118.379 369.669 123.885 356.224C124.696 354.261 124.995 349.224 121.836 349.907C74.7579 408.808 24.2224 413.503 55.5937 322.079C88.9283 224.977 219.322 92.9618 314.929 56.3407C410.537 19.7195 416.683 66.0295 350.227 121.516C349.544 124.674 354.581 124.376 356.544 123.565C372.593 116.949 406.568 89.4192 426.927 78.706C483.779 48.7433 560.351 18.8232 625.398 25.4816C694.287 32.5668 674.397 94.1569 636.154 127.833Z"
            fill="url(#paint0_linear)"
            style={{ mixBlendMode: "plus-lighter" }}
          />
        </svg>
      </div>


      <div
        className="pointer-events-none absolute z-50 top-[73.53px] right-12 w-[150px] h-[72px]"
      >
                  
        <div
          className="absolute inset-0 rounded-[36px] opacity-90 bg-gradient-to-r from-[#817BFF] to-[#B5A5FF] filter blur-[16px] saturate-[130%] drop-shadow-[0_0_55px_rgba(181,165,255,0.27)] drop-shadow-[0_9px_34px_rgba(144,131,254,0.27)]"
          style={{ transform: 'rotate(-20.53deg) translate(-26px, 14px)' }}
        />

        <div
          className="absolute inset-0 flex items-center justify-center select-none rounded-[36px] bg-gradient-to-b from-[rgba(255,255,255,0.75)] to-[rgba(255,255,255,0.35)]"
          style={{
            backgroundImage:
              `radial-gradient(180% 120% at 50% 0%, rgba(64, 34, 199, 1) 0%, #7F58FF 45%, rgb(247, 250, 250) 85%)`,
            boxShadow: `0 0 80px 40px rgba(255,255,255,0.80), 
                        0 0 40px 10px rgba(255,255,255,0.68),
                        0 10px 22px rgba(255,255,255,0.9) inset, 
                        0 0 0 1px rgba(255,255,255,0.2) inset, 
                        0 140px 220px rgba(64,34,199,0.28) inset,
                        0 60px 120px rgba(49,15,240,0.25) inset,
                        0 24px 80px rgba(150,240,174,0.28) inset,
                        0 42px 120px rgba(66,153,225,0.20),
                        0 0 160px rgba(56,178,172,0.15)`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            opacity: 1,
            transform: 'rotate(-20.53deg)',
          }}
        >
          <span
            className="relative font-fustat font-semibold text-[38px] leading-[1.09] tracking-[--0.015em] text-white select-none"
            style={{
              letterSpacing: '-0.015em',
              textShadow:
                '0 2px 8px #b5a5ff, 0 6px 14px #fff, 0 1px 6px #847cfd77, 0 0 1px #fff',
            }}
          >
            +500
            <span
              className="ml-2 font-monda font-normal text-[8.37px] leading-[8.37px] tracking-[0] uppercase select-none"
              style={{ opacity: 0.95 }}
            >
              XP
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
