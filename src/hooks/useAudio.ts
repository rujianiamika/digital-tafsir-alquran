
import { useState, useRef, useEffect } from "react";

interface UseAudioProps {
  audioSources: Record<string, string>;
  autoPlay?: boolean;
}

export const useAudio = ({ audioSources, autoPlay = false }: UseAudioProps) => {
  const [selectedQori, setSelectedQori] = useState<string>("01");
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio();
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
      setLoading(false);
      if (autoPlay) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    });

    audio.addEventListener("timeupdate", () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    audio.addEventListener("play", () => {
      setIsPlaying(true);
    });

    audio.addEventListener("pause", () => {
      setIsPlaying(false);
    });

    // Load initial audio
    audio.src = audioSources[selectedQori];
    audio.load();

    return () => {
      // Clean up
      audio.pause();
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("timeupdate", () => {});
      audio.removeEventListener("ended", () => {});
      audio.removeEventListener("play", () => {});
      audio.removeEventListener("pause", () => {});
    };
  }, [audioSources, selectedQori, autoPlay]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  };

  const changeQori = (qoriId: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = isPlaying;
    const currentProgress = audio.currentTime / audio.duration;

    // Pause current audio
    audio.pause();
    setSelectedQori(qoriId);
    setLoading(true);

    // Change source
    audio.src = audioSources[qoriId];
    audio.load();

    // Set up event for when new audio is loaded
    const handleLoaded = () => {
      if (wasPlaying) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      // Try to maintain the same position in the new audio
      audio.currentTime = currentProgress * audio.duration;
      audio.removeEventListener("loadedmetadata", handleLoaded);
    };

    audio.addEventListener("loadedmetadata", handleLoaded);
  };

  const seekTo = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setCurrentTime(time);
  };

  const seekByPercentage = (percentage: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (percentage / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return {
    isPlaying,
    duration,
    currentTime,
    loading,
    selectedQori,
    togglePlay,
    changeQori,
    seekTo,
    seekByPercentage,
  };
};
