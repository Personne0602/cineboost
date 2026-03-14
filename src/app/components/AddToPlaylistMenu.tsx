import { Plus, Check } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import type { Playlist } from "./PlaylistManager";

interface AddToPlaylistMenuProps {
  playlists: Playlist[];
  movieId: string;
  onAddToPlaylist: (playlistId: string, movieId: string) => void;
  onRemoveFromPlaylist: (playlistId: string, movieId: string) => void;
}

export function AddToPlaylistMenu({
  playlists,
  movieId,
  onAddToPlaylist,
  onRemoveFromPlaylist,
}: AddToPlaylistMenuProps) {
  const isInPlaylist = (playlistId: string) => {
    const playlist = playlists.find((p) => p.id === playlistId);
    return playlist?.movieIds.includes(movieId) || false;
  };

  const handleToggle = (playlistId: string) => {
    if (isInPlaylist(playlistId)) {
      onRemoveFromPlaylist(playlistId, movieId);
    } else {
      onAddToPlaylist(playlistId, movieId);
    }
  };

  if (playlists.length === 0) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-black/50 border-white/20 text-white hover:bg-black/70"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter à une liste
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
        {playlists.map((playlist) => (
          <DropdownMenuItem
            key={playlist.id}
            onClick={() => handleToggle(playlist.id)}
            className="text-white hover:bg-zinc-800 cursor-pointer"
          >
            <div className="flex items-center justify-between w-full">
              <span>{playlist.name}</span>
              {isInPlaylist(playlist.id) && (
                <Check className="h-4 w-4 text-yellow-500" />
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
