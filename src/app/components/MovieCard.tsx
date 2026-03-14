import { Star, Play, Info } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export interface Movie {
  id: string;
  title: string;
  year: number;
  rating: number;
  duration: string;
  genre: string[];
  description: string;
  poster: string;
  filePath: string;
}

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onDetails: (movie: Movie) => void;
}

export function MovieCard({ movie, onPlay, onDetails }: MovieCardProps) {
  return (
    <Card className="group overflow-hidden bg-gray-900 border-gray-800 hover:border-purple-600 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 relative">
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
          <Button
            onClick={() => onPlay(movie)}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg"
          >
            <Play className="mr-2 h-5 w-5 fill-current" />
            Lire
          </Button>
          <Button
            onClick={() => onDetails(movie)}
            variant="outline"
            size="sm"
            className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
          >
            <Info className="mr-2 h-4 w-4" />
            Détails
          </Button>
        </div>
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-lg">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white font-semibold text-sm">{movie.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-1 truncate">{movie.title}</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.duration}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {movie.genre.slice(0, 2).map((g) => (
            <Badge key={g} variant="secondary" className="bg-gray-800 text-purple-400 text-xs">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}