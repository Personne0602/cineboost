import { useState, useEffect } from "react";
import { Search, Film, Grid, List, Plus, Play } from "lucide-react";
import { MovieCard, type Movie } from "./components/MovieCard";
import { VideoPlayer } from "./components/VideoPlayer";
import { MovieDetails } from "./components/MovieDetails";
import { AddMovieDialog } from "./components/AddMovieDialog";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import logo from "figma:asset/25ecab07181457a9616e396a1e79f4dabf93e219.png";

const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "L'Évasion Quantique",
    year: 2024,
    rating: 8.5,
    duration: "2h 28min",
    genre: ["Action", "Science-Fiction", "Thriller"],
    description: "Dans un futur proche où la technologie quantique permet de manipuler le temps, un ancien agent secret doit infiltrer une organisation criminelle qui menace l'équilibre temporel de l'humanité. Une course contre la montre s'engage pour sauver le monde.",
    poster: "https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzMzMjA2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    filePath: "/videos/evasion_quantique_2024.mkv",
  },
  {
    id: "2",
    title: "Horizon Stellaire",
    year: 2023,
    rating: 9.1,
    duration: "2h 45min",
    genre: ["Science-Fiction", "Aventure", "Drame"],
    description: "Une équipe d'explorateurs embarque pour un voyage interstellaire vers une planète lointaine qui pourrait sauver l'humanité. Confrontés aux mystères de l'espace et à leurs propres démons, ils découvrent que leur mission cache un secret bien plus grand.",
    poster: "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzMyNzM0NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    filePath: "/videos/horizon_stellaire_2023.mkv",
  },
  {
    id: "3",
    title: "Les Ombres du Passé",
    year: 2025,
    rating: 7.8,
    duration: "2h 15min",
    genre: ["Thriller", "Mystère", "Drame"],
    description: "Un détective hanté par une affaire non résolue se retrouve plongé dans une nouvelle enquête qui semble étrangement liée à son passé. Entre mensonges et révélations, il devra affronter ses démons pour découvrir la vérité.",
    poster: "https://images.unsplash.com/photo-1706460400799-bd339797d306?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaW5lbWElMjBmaWxtJTIwbm9pcnxlbnwxfHx8fDE3NzMzMzc1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    filePath: "/videos/ombres_passe_2025.mkv",
  },
  {
    id: "4",
    title: "Expédition Périlleuse",
    year: 2024,
    rating: 8.2,
    duration: "2h 10min",
    genre: ["Aventure", "Action", "Historique"],
    description: "Au début du 20ème siècle, un groupe d'explorateurs intrépides part à la recherche d'une cité perdue dans la jungle amazonienne. Face aux dangers de la nature et aux trahisons, leur quête devient une lutte pour la survie.",
    poster: "https://images.unsplash.com/photo-1761948245185-fc300ad20316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBmaWxtJTIwcG9zdGVyfGVufDF8fHx8MTc3MzI5MjYwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    filePath: "/videos/expedition_perilleuse_2024.mkv",
  },
];

export default function App() {
  // Charger les données depuis localStorage
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem("cineboost-movies");
    return saved ? JSON.parse(saved) : MOCK_MOVIES;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [showAddMovieDialog, setShowAddMovieDialog] = useState(false);

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem("cineboost-movies", JSON.stringify(movies));
  }, [movies]);

  // Filtrer par recherche
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    movie.genre.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handlePlay = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowPlayer(true);
    setShowDetails(false);
  };

  const handleDetails = (movie: Movie) => {
    setSelectedMovie(movie);
    setShowDetails(true);
  };

  const handleClosePlayer = () => {
    setShowPlayer(false);
    setSelectedMovie(null);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedMovie(null);
  };

  const handleAddMovie = (newMovie: Omit<Movie, "id">) => {
    const movie: Movie = {
      ...newMovie,
      id: Date.now().toString(),
    };
    setMovies([...movies, movie]);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="bg-gray-900/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="CinéBoost Logo" 
                className="h-12 w-12 rounded-full shadow-lg"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CinéBoost
                </h1>
                <p className="text-gray-400 text-sm">Collection CinéBoost Officielle</p>
              </div>
            </div>
            <Button
              onClick={() => setShowAddMovieDialog(true)}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30"
            >
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un film
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher par titre ou genre..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-purple-500"
              />
            </div>
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
              <TabsList className="bg-gray-800 border-gray-700">
                <TabsTrigger value="grid" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-white text-xl font-semibold mb-2">
            {filteredMovies.length} film{filteredMovies.length > 1 ? "s" : ""}
          </h2>
          <p className="text-gray-400">
            {searchQuery
              ? `Résultats pour "${searchQuery}"`
              : "Tous vos films"}
          </p>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <Film className="h-16 w-16 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Aucun film trouvé</p>
            {searchQuery && (
              <p className="text-gray-500 text-sm mt-2">
                Essayez une autre recherche
              </p>
            )}
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onPlay={handlePlay}
                onDetails={handleDetails}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex gap-4 hover:border-purple-600 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-32 h-48 object-cover rounded-lg flex-shrink-0 shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white text-xl font-semibold mb-2 truncate">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-3 text-gray-400 text-sm mb-2">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.duration}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span>{movie.rating}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {movie.genre.map((g) => (
                      <span key={g} className="px-2 py-1 bg-gray-800 text-purple-400 text-xs rounded-full">
                        {g}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handlePlay(movie)}
                      className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg shadow-purple-500/30"
                    >
                      <Play className="mr-2 h-4 w-4 fill-current" />
                      Lire
                    </Button>
                    <Button
                      onClick={() => handleDetails(movie)}
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800"
                    >
                      Détails
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      {showPlayer && selectedMovie && (
        <VideoPlayer movie={selectedMovie} onClose={handleClosePlayer} />
      )}

      {/* Movie Details Modal */}
      {showDetails && selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={handleCloseDetails}
          onPlay={handlePlay}
        />
      )}

      {/* Add Movie Dialog */}
      {showAddMovieDialog && (
        <AddMovieDialog
          onClose={() => setShowAddMovieDialog(false)}
          onAdd={handleAddMovie}
        />
      )}
    </div>
  );
}