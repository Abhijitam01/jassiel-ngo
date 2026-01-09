"use client";

import NormalLandingPage from "@/components/home/NormalLandingPage";
import BlindnessAwarenessIntro from "@/components/shared/BlindnessAwarenessIntro";
import BrailleOverlay from "@/components/shared/BrailleOverlay";
import BrailleTooltip from "@/components/shared/BrailleTooltip";
import { SmoothCursor } from "@/components/shared/SmoothCursor";
import { useBrailleMode } from "@/components/shared/BrailleModeProvider";
import LoadingScreen from "@/components/shared/LoadingScreen";

export default function HomePage() {
  const { isBrailleMode } = useBrailleMode();

  return (
    <>
      <LoadingScreen />
      <BlindnessAwarenessIntro />
      
      <BrailleOverlay>
        {!isBrailleMode && <BrailleTooltip />}
        {!isBrailleMode && <SmoothCursor />}
        <NormalLandingPage />
      </BrailleOverlay>
    </>
  );
}

