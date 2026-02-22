import { useEffect, useRef, useCallback, useState } from "react";

type AudioZone = {
  sectionIds: string[];
  videoId: string;
};

const AUDIO_ZONES: AudioZone[] = [
  { sectionIds: ["hero", "video-section"], videoId: "TKx3pnznKyw" },
  { sectionIds: ["memory-section", "balloon-section"], videoId: "s7gef3SXSbY" },
  { sectionIds: ["dream-section"], videoId: "XSzMpmmmf9o" },
  { sectionIds: ["love-section", "surprise-section", "final-section"], videoId: "fkZ_itFoeuY" },
];

const isPlayerReady = (player: any): boolean => {
  try {
    return player && typeof player.getPlayerState === "function" && player.getIframe?.() !== null;
  } catch {
    return false;
  }
};

const safeCall = (player: any, method: string) => {
  try {
    if (isPlayerReady(player) && typeof player[method] === "function") {
      player[method]();
    }
  } catch {
    // Player not ready yet, ignore
  }
};

const BackgroundAudio = () => {
  const playersRef = useRef<Record<number, any>>({});
  const readyRef = useRef<Record<number, boolean>>({});
  const activeZoneRef = useRef<number>(-1);
  const userInteractedRef = useRef(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const switchAudio = useCallback((zoneIndex: number) => {
    activeZoneRef.current = zoneIndex;

    AUDIO_ZONES.forEach((_, i) => {
      const player = playersRef.current[i];
      if (!readyRef.current[i]) return;

      if (i === zoneIndex && userInteractedRef.current) {
        safeCall(player, "playVideo");
      } else {
        safeCall(player, "pauseVideo");
      }
    });
  }, []);

  const initPlayers = useCallback(() => {
    AUDIO_ZONES.forEach((zone, i) => {
      const containerId = `yt-player-${i}`;
      if (playersRef.current[i]) return;

      playersRef.current[i] = new (window as any).YT.Player(containerId, {
        videoId: zone.videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: zone.videoId,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          fs: 0,
          disablekb: 1,
        },
        events: {
          onReady: (event: any) => {
            readyRef.current[i] = true;
            try {
              event.target.setVolume(60);
            } catch {}
          },
        },
      });
    });
  }, []);

  // Load YouTube IFrame API
  useEffect(() => {
    if ((window as any).YT?.Player) {
      initPlayers();
      return;
    }

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    (window as any).onYouTubeIframeAPIReady = () => {
      initPlayers();
    };

    return () => {
      Object.entries(playersRef.current).forEach(([, p]) => {
        try { p.destroy(); } catch {}
      });
    };
  }, [initPlayers]);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          const zoneIndex = AUDIO_ZONES.findIndex((z) =>
            z.sectionIds.includes(id)
          );
          if (zoneIndex !== -1 && zoneIndex !== activeZoneRef.current) {
            switchAudio(zoneIndex);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timer = setTimeout(() => {
      AUDIO_ZONES.forEach((zone) => {
        zone.sectionIds.forEach((sectionId) => {
          const el = document.getElementById(sectionId);
          if (el) observer.observe(el);
        });
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [switchAudio]);

  const handleStart = () => {
    userInteractedRef.current = true;
    setUserInteracted(true);
    setIsPlaying(true);
    const active = activeZoneRef.current >= 0 ? activeZoneRef.current : 0;
    activeZoneRef.current = active;
    safeCall(playersRef.current[active], "playVideo");
  };

  const handleToggle = () => {
    if (isPlaying) {
      Object.entries(playersRef.current).forEach(([i, p]) => {
        if (readyRef.current[Number(i)]) safeCall(p, "pauseVideo");
      });
      setIsPlaying(false);
    } else {
      const active = activeZoneRef.current >= 0 ? activeZoneRef.current : 0;
      safeCall(playersRef.current[active], "playVideo");
      setIsPlaying(true);
    }
  };

  // When userInteracted changes, play active zone
  useEffect(() => {
    if (userInteracted && activeZoneRef.current >= 0) {
      switchAudio(activeZoneRef.current);
    }
  }, [userInteracted, switchAudio]);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: -9999,
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0,
        }}
      >
        {AUDIO_ZONES.map((_, i) => (
          <div key={i} id={`yt-player-${i}`} />
        ))}
      </div>

      {!userInteracted ? (
        <button
          onClick={handleStart}
          className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          style={{
            boxShadow: "0 0 20px hsl(330 100% 56% / 0.4)",
          }}
          aria-label="Play music"
        >
          <span className="text-2xl">🎵</span>
        </button>
      ) : (
        <button
          onClick={handleToggle}
          className="fixed bottom-6 right-6 z-50 bg-primary/80 text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform backdrop-blur-sm"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          <span className="text-xl">{isPlaying ? "⏸️" : "▶️"}</span>
        </button>
      )}
    </>
  );
};

export default BackgroundAudio;
