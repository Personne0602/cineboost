import { useState } from "react";
import { X, Upload, Search as SearchIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import type { Movie } from "./MovieCard";

interface AddMovieDialogProps {
  onClose: () => void;
  onAdd: (movie: Omit<Movie, "id">) => void;
}

interface TMDBMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
  overview: string;
  poster_path: string | null;
}

export function AddMovieDialog({ onClose, onAdd }: AddMovieDialogProps) {
  const [step, setStep] = useState<"upload" | "search" | "manual">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  
  // Formulaire manuel
  const [manualData, setManualData] = useState({
    title: "",
    year: new Date().getFullYear(),
    rating: 7.0,
    duration: "",
    genre: "",
    description: "",
    poster: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith(".mkv")) {
      setSelectedFile(file);
      // Extraire le titre du nom de fichier
      const fileName = file.name.replace(".mkv", "");
      setSearchQuery(fileName);
    }
  };

  const searchTMDB = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      // Note: Dans une vraie application, la clé API devrait être stockée côté serveur
      const API_KEY = "YOUR_TMDB_API_KEY_HERE";
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&language=fr-FR`
      );
      
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      
      const data = await response.json();
      
      // Récupérer les détails complets pour chaque film
      const detailedResults = await Promise.all(
        data.results.slice(0, 5).map(async (movie: { id: number }) => {
          const detailResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=fr-FR`
          );
          return detailResponse.json();
        })
      );
      
      setSearchResults(detailedResults);
    } catch (error) {
      console.error("Erreur TMDB:", error);
      // En cas d'erreur (clé API invalide), utiliser des données mockées
      setSearchResults([
        {
          id: 1,
          title: searchQuery,
          release_date: "2024-01-01",
          vote_average: 7.5,
          runtime: 120,
          genres: [{ id: 1, name: "Action" }],
          overview: "Film trouvé localement. Configurez votre clé API TMDB pour obtenir les vraies métadonnées.",
          poster_path: null,
        },
      ]);
    } finally {
      setIsSearching(false);
    }
  };

  const selectTMDBMovie = (movie: TMDBMovie) => {
    setSelectedMovie(movie);
  };

  const handleSubmit = () => {
    if (selectedMovie && selectedFile) {
      const newMovie: Omit<Movie, "id"> = {
        title: selectedMovie.title,
        year: new Date(selectedMovie.release_date).getFullYear(),
        rating: Number((selectedMovie.vote_average / 10 * 10).toFixed(1)),
        duration: `${Math.floor(selectedMovie.runtime / 60)}h ${selectedMovie.runtime % 60}min`,
        genre: selectedMovie.genres.map((g) => g.name),
        description: selectedMovie.overview,
        poster: selectedMovie.poster_path
          ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
          : "https://via.placeholder.com/300x450?text=No+Poster",
        filePath: selectedFile.name,
      };
      onAdd(newMovie);
      onClose();
    } else if (step === "manual") {
      const newMovie: Omit<Movie, "id"> = {
        title: manualData.title,
        year: manualData.year,
        rating: manualData.rating,
        duration: manualData.duration,
        genre: manualData.genre.split(",").map((g) => g.trim()).filter(Boolean),
        description: manualData.description,
        poster: manualData.poster || "https://via.placeholder.com/300x450?text=No+Poster",
        filePath: selectedFile?.name || `${manualData.title}.mkv`,
      };
      onAdd(newMovie);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800 sticky top-0 bg-gray-900 z-10 rounded-t-xl">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Ajouter un film</h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-800 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {/* Étape 1: Upload du fichier */}
          <div className="mb-6">
            <Label className="text-white text-lg mb-3 block">1. Sélectionner le fichier .mkv</Label>
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-purple-600 hover:bg-gray-800/50 transition-colors">
              <input
                type="file"
                accept=".mkv"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                {selectedFile ? (
                  <div>
                    <p className="text-white font-semibold">{selectedFile.name}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-white mb-1">Cliquez pour sélectionner un fichier .mkv</p>
                    <p className="text-gray-400 text-sm">ou glissez-déposez ici</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {selectedFile && (
            <>
              {/* Tabs pour choisir la méthode */}
              <div className="flex gap-2 mb-6">
                <Button
                  onClick={() => setStep("search")}
                  variant={step === "search" ? "default" : "outline"}
                  className={step === "search" ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
                >
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Rechercher sur TMDB
                </Button>
                <Button
                  onClick={() => setStep("manual")}
                  variant={step === "manual" ? "default" : "outline"}
                  className={step === "manual" ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white" : "border-gray-700 text-gray-300 hover:bg-gray-800"}
                >
                  Saisie manuelle
                </Button>
              </div>

              {/* Étape 2: Recherche TMDB */}
              {step === "search" && (
                <div>
                  <Label className="text-white text-lg mb-3 block">2. Rechercher les métadonnées</Label>
                  <div className="flex gap-2 mb-4">
                    <Input
                      placeholder="Titre du film..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && searchTMDB()}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                    <Button
                      onClick={searchTMDB}
                      disabled={isSearching}
                      className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
                    >
                      {isSearching ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <SearchIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {searchResults.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {searchResults.map((movie) => (
                        <div
                          key={movie.id}
                          onClick={() => selectTMDBMovie(movie)}
                          className={`flex gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                            selectedMovie?.id === movie.id
                              ? "bg-purple-900/50 border-2 border-purple-500"
                              : "bg-gray-800 border-2 border-transparent hover:border-purple-600"
                          }`}
                        >
                          {movie.poster_path ? (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                              alt={movie.title}
                              className="w-16 h-24 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-24 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">
                              No Image
                            </div>
                          )}
                          <div className="flex-1">
                            <h3 className="text-white font-semibold">{movie.title}</h3>
                            <p className="text-gray-400 text-sm">
                              {new Date(movie.release_date).getFullYear()} • ⭐ {(movie.vote_average / 10 * 10).toFixed(1)}
                            </p>
                            <p className="text-gray-300 text-sm line-clamp-2 mt-1">
                              {movie.overview}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Étape 2: Saisie manuelle */}
              {step === "manual" && (
                <div className="space-y-4">
                  <Label className="text-white text-lg mb-3 block">2. Informations du film</Label>
                  
                  <div>
                    <Label className="text-white">Titre</Label>
                    <Input
                      value={manualData.title}
                      onChange={(e) => setManualData({ ...manualData, title: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Année</Label>
                      <Input
                        type="number"
                        value={manualData.year}
                        onChange={(e) => setManualData({ ...manualData, year: Number(e.target.value) })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Note (/10)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        min="0"
                        max="10"
                        value={manualData.rating}
                        onChange={(e) => setManualData({ ...manualData, rating: Number(e.target.value) })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">Durée (ex: 2h 15min)</Label>
                      <Input
                        value={manualData.duration}
                        onChange={(e) => setManualData({ ...manualData, duration: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="2h 15min"
                      />
                    </div>
                    <div>
                      <Label className="text-white">Genres (séparés par virgule)</Label>
                      <Input
                        value={manualData.genre}
                        onChange={(e) => setManualData({ ...manualData, genre: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Action, Science-Fiction"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white">URL de l'affiche</Label>
                    <Input
                      value={manualData.poster}
                      onChange={(e) => setManualData({ ...manualData, poster: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div>
                    <Label className="text-white">Description</Label>
                    <Textarea
                      value={manualData.description}
                      onChange={(e) => setManualData({ ...manualData, description: e.target.value })}
                      className="bg-gray-800 border-gray-700 text-white min-h-24"
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-800 bg-gray-900 sticky bottom-0 rounded-b-xl">
          <Button onClick={onClose} variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || (step === "search" && !selectedMovie) || (step === "manual" && !manualData.title)}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg"
          >
            Ajouter le film
          </Button>
        </div>
      </div>
    </div>
  );
}