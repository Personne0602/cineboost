import { X, Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useState, useRef, useEffect } from "react";
import type { Movie } from "./MovieCard";

interface VideoPlayerProps {
  movie: Movie;
  onClose: () => void;
}

export function VideoPlayer({ movie, onClose }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([0]);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [duration, setDuration] = useState("0:00");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simuler la progression de la vidéo
    if (isPlaying) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev[0] + 0.5;
          return newProgress >= 100 ? [0] : [newProgress];
        });
        
        // Mettre à jour le temps
        const totalSeconds = Math.floor((progress[0] / 100) * 7200); // Supposons 2h max
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        setCurrentTime(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isPlaying, progress]);

  useEffect(() => {
    // Définir la durée basée sur movie.duration
    setDuration(movie.duration);
  }, [movie.duration]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    if (value[0] === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value);
  };

  const skipForward = () => {
    setProgress((prev) => {
      const newProgress = Math.min(prev[0] + 5, 100);
      return [newProgress];
    });
  };

  const skipBackward = () => {
    setProgress((prev) => {
      const newProgress = Math.max(prev[0] - 5, 0);
      return [newProgress];
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-b from-black/80 to-transparent absolute top-0 left-0 right-0 z-10">
        <div>
          <h2 className="text-white text-xl font-semibold">{movie.title}</h2>
          <p className="text-zinc-400 text-sm">{movie.year} • {movie.genre.join(", ")}</p>
        </div>
        <Button
          onClick={onClose}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex items-center justify-center bg-black">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Placeholder pour la vidéo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="mb-4 text-zinc-600">
                <Play className="h-32 w-32 mx-auto opacity-20" />
              </div>
              <p className="text-zinc-500 text-lg">Lecteur vidéo pour: {movie.filePath}</p>
              <p className="text-zinc-600 text-sm mt-2">
                (Dans une vraie application, le fichier .mkv serait lu ici)
              </p>
            </div>
          </div>
          
          {/* Indicateur de lecture au centre */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              <div className="bg-black/50 rounded-full p-6 group-hover:bg-black/70 transition-colors">
                <Play className="h-16 w-16 text-white fill-white" />
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 bg-gradient-to-t from-black/90 to-transparent absolute bottom-0 left-0 right-0">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            max={100}
            step={0.1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-zinc-400 mt-1">
            <span>{currentTime}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              onClick={togglePlay}
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 fill-current" />
              )}
            </Button>
            <Button
              onClick={skipBackward}
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button
              onClick={skipForward}
              size="icon"
              variant="ghost"
              className="text-white hover:bg-white/10"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2 ml-2">
              <Button
                onClick={toggleMute}
                size="icon"
                variant="ghost"
                className="text-white hover:bg-white/10"
              >
                {isMuted || volume[0] === 0 ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>
              <div className="w-24">
                <Slider
                  value={volume}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                />
              </div>
            </div>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="text-white hover:bg-white/10"
          >
            <Maximize className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
