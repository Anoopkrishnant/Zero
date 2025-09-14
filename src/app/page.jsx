'use client'
import { useState, useEffect } from "react";
import TimerOverlay from "@/app/components/TimerOverlay";
import UnlockScreen from "@/app/components/UnlockScreen";
import DrowZero from "@/app/components/DrowZero";
import AnalyseSkillsPage from "./components/AnalyseSkills";
import PerfectZero from "./components/PerfectZero"; 
import FirstXp from "./components/FirstXp"; 
import XpFiveHundred from "./components/XpFiveHundred"; 
import dynamic from 'next/dynamic';

const ThreeBg = dynamic(() => import("@/app/components/Threebg"), { ssr: false });


export default function Home() {
  const [unlocked, setUnlocked] = useState(false);
  const [showDrowZero, setShowDrowZero] = useState(false);
  const [showPerfectZero, setShowPerfectZero] = useState(false);
  const [showFirstXp, setShowFirstXp] = useState(false);
  const [showXpFiveHundred, setShowXpFiveHundred] = useState(false); 

  useEffect(() => {
    if (unlocked) {
      const timer = setTimeout(() => setShowDrowZero(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [unlocked]);

  useEffect(() => {
    if (showDrowZero) {
      const timer2 = setTimeout(() => setShowPerfectZero(true), 5000);
      return () => clearTimeout(timer2);
    }
  }, [showDrowZero]);

  useEffect(() => {
    if (showPerfectZero) {
      const timer3 = setTimeout(() => setShowFirstXp(true), 5000);
      return () => clearTimeout(timer3);
    }
  }, [showPerfectZero]);

  
  useEffect(() => {
    if (showFirstXp) {
      const timer4 = setTimeout(() => setShowXpFiveHundred(true), 5000);
      return () => clearTimeout(timer4);
    }
  }, [showFirstXp]);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black">
      <ThreeBg />
      {!unlocked ? (
        <TimerOverlay onComplete={() => setUnlocked(true)} />
      ) : !showDrowZero ? (
        <UnlockScreen />
      ) : !showPerfectZero ? (
        <AnalyseSkillsPage />
      ) : !showFirstXp ? (
        <PerfectZero />
      ) : !showXpFiveHundred ? (
        <FirstXp />
      ) : (
        <XpFiveHundred />
      )}
    </main>
  );
}
