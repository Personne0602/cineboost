import { useState } from "react";
import { Plus, X, Folder, Trash2, Edit2, Check } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import type { Movie } from "./MovieCard";

export interface Playlist {
  id: string;
  name: string;
  movieIds: string[];
}

interface PlaylistManagerProps {
  playlists: Playlist[];
  movies: Movie[];
  onCreatePlaylist: (name: string) => void;
  onDeletePlaylist: (id: string) => void;
  onRenamePlaylist: (id: string, name: string) => void;
  onAddToPlaylist: (playlistId: string, movieId: string) => void;
  onRemoveFromPlaylist: (playlistId: string, movieId: string) => void;
  selectedPlaylistId: string | null;
  onSelectPlaylist: (id: string | null) => void;
}

export function PlaylistManager({
  playlists,
  movies,
  onCreatePlaylist,
  onDeletePlaylist,
  onRenamePlaylist,
  onAddToPlaylist,
  onRemoveFromPlaylist,
  selectedPlaylistId,
  onSelectPlaylist,
}: PlaylistManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const handleCreate = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setIsCreating(false);
    }
  };

  const handleRename = (id: string) => {
    if (editName.trim()) {
      onRenamePlaylist(id, editName.trim());
      setEditingId(null);
      setEditName("");
    }
  };

  const startEdit = (playlist: Playlist) => {
    setEditingId(playlist.id);
    setEditName(playlist.name);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <Folder className="h-5 w-5" />
          Listes de lecture
        </h3>
        <Button
          onClick={() => setIsCreating(true)}
          size="sm"
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          <Plus className="h-4 w-4 mr-1" />
          Nouvelle
        </Button>
      </div>

      <div className="space-y-2">
        {/* Bouton "Tous les films" */}
        <button
          onClick={() => onSelectPlaylist(null)}
          className={`w-full text-left px-3 py-2 rounded transition-colors ${
            selectedPlaylistId === null
              ? "bg-yellow-500 text-black"
              : "text-white hover:bg-zinc-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-medium">Tous les films</span>
            <Badge variant="secondary" className="bg-zinc-700 text-white">
              {movies.length}
            </Badge>
          </div>
        </button>

        {/* Formulaire de création */}
        {isCreating && (
          <div className="flex gap-2 p-2 bg-zinc-800 rounded">
            <Input
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Nom de la liste..."
              className="bg-zinc-900 border-zinc-700 text-white text-sm"
              autoFocus
            />
            <Button
              onClick={handleCreate}
              size="icon"
              className="bg-yellow-500 hover:bg-yellow-600 text-black h-8 w-8"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              onClick={() => {
                setIsCreating(false);
                setNewPlaylistName("");
              }}
              size="icon"
              variant="ghost"
              className="text-white h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Liste des playlists */}
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={`rounded transition-colors ${
              selectedPlaylistId === playlist.id
                ? "bg-yellow-500 text-black"
                : "text-white hover:bg-zinc-800"
            }`}
          >
            {editingId === playlist.id ? (
              <div className="flex gap-2 p-2">
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRename(playlist.id)}
                  className="bg-zinc-900 border-zinc-700 text-white text-sm"
                  autoFocus
                />
                <Button
                  onClick={() => handleRename(playlist.id)}
                  size="icon"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black h-8 w-8"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setEditingId(null)}
                  size="icon"
                  variant="ghost"
                  className="text-white h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <button
                onClick={() => onSelectPlaylist(playlist.id)}
                className="w-full text-left px-3 py-2 group"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium truncate flex-1">{playlist.name}</span>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="secondary"
                      className={
                        selectedPlaylistId === playlist.id
                          ? "bg-black/20 text-black"
                          : "bg-zinc-700 text-white"
                      }
                    >
                      {playlist.movieIds.length}
                    </Badge>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(playlist);
                        }}
                        className="hover:scale-110 transition-all p-1"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Supprimer la liste "${playlist.name}" ?`)) {
                            onDeletePlaylist(playlist.id);
                          }
                        }}
                        className="hover:scale-110 transition-all p-1"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </button>
            )}
          </div>
        ))}

        {playlists.length === 0 && !isCreating && (
          <p className="text-zinc-500 text-sm text-center py-4">
            Aucune liste de lecture
          </p>
        )}
      </div>
    </div>
  );
}