
import React, { useState } from "react";
import { useAudio } from "../hooks/useAudio";
import { Play, Pause, Volume2, ListMusic } from "lucide-react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Slider } from "./ui/slider";

interface AudioPlayerProps {
  audioSources: Record<string, string>;
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const qoriNames: Record<string, string> = {
  "01": "Abdullah Al-Juhany",
  "02": "Abdul Muhsin Al-Qasim",
  "03": "Abdurrahman As-Sudais",
  "04": "Ibrahim Al-Dossari",
  "05": "Misyari Rasyid Al-Afasi",
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSources }) => {
  const {
    isPlaying,
    duration,
    currentTime,
    loading,
    selectedQori,
    togglePlay,
    changeQori,
    seekByPercentage,
  } = useAudio({ audioSources });

  const [volume, setVolume] = useState(100);

  const handleSeek = (value: number[]) => {
    seekByPercentage(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
    const audio = document.querySelector("audio");
    if (audio) {
      audio.volume = value[0] / 100;
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="glass-card bg-islamic-primary/90 text-white p-4 rounded-xl">
      <div className="flex items-center space-x-3 mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
          onClick={togglePlay}
          disabled={loading}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>

        <div className="flex-1 space-y-2">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="h-2"
          />
          <div className="flex justify-between text-xs text-white/70">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-40" align="end">
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={handleVolumeChange}
                className="my-4"
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full bg-white/20 text-white hover:bg-white/30 hover:text-white flex items-center justify-center"
              >
                <ListMusic className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="space-y-1">
                <h4 className="font-medium mb-2">Pilih Qori</h4>
                {Object.entries(qoriNames).map(([id, name]) => (
                  <button
                    key={id}
                    className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                      selectedQori === id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-secondary"
                    }`}
                    onClick={() => changeQori(id)}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
