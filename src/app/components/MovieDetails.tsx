import { X, Play, Star, Calendar, Clock, Film } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import type { Movie } from "./MovieCard";

interface MovieDetailsProps {
  movie: Movie;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

export function MovieDetails({ movie, onClose, onPlay }: MovieDetailsProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen">
        {/* Header avec poster en fond */}
        <div className="relative h-[500px]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${movie.poster})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/95 to-gray-900/80" />
          </div>
          
          <div className="relative z-10 h-full">
            <div className="flex justify-end p-4">
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl font-bold text-white mb-4">{movie.title}</h1>
                <div className="flex items-center gap-4 text-white mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-semibold">{movie.rating}</span>
                    <span className="text-gray-300">/10</span>
                  </div>
                  <Separator orientation="vertical" className="h-6 bg-gray-600" />
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{movie.year}</span>
                  </div>
                  <Separator orientation="vertical" className="h-6 bg-gray-600" />
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{movie.duration}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {movie.genre.map((g) => (
                    <Badge key={g} variant="secondary" className="bg-purple-600/40 text-white border-purple-500/50">
                      {g}
                    </Badge>
                  ))}
                </div>
                <Button
                  onClick={() => onPlay(movie)}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/50"
                >
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  Lire maintenant
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="max-w-6xl mx-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold text-white mb-4">Synopsis</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {movie.description}
              </p>
            </div>
            
            <div>
              <div className="bg-gray-900 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Film className="h-5 w-5" />
                  Informations
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-500 text-sm">Fichier</p>
                    <p className="text-white font-mono text-sm break-all">{movie.filePath}</p>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div>
                    <p className="text-gray-500 text-sm">Format</p>
                    <p className="text-white">.mkv</p>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div>
                    <p className="text-gray-500 text-sm">Note</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">{movie.rating}/10</span>
                    </div>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div>
                    <p className="text-gray-500 text-sm">Année de sortie</p>
                    <p className="text-white">{movie.year}</p>
                  </div>
                  <Separator className="bg-gray-800" />
                  <div>
                    <p className="text-gray-500 text-sm">Durée</p>
                    <p className="text-white">{movie.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}