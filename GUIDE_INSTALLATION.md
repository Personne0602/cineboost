# 🎬 Guide d'installation CinéBoost - Application de Bureau

CinéBoost est maintenant configuré comme une application de bureau complète ! Voici comment l'installer sur votre ordinateur.

---

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- **Node.js** (version 18 ou supérieure) : [Télécharger ici](https://nodejs.org/)
- **npm** ou **pnpm** (installé avec Node.js)

---

## 🚀 Installation rapide

### 1️⃣ **Télécharger le projet**
Exportez le projet depuis Figma Make et décompressez-le sur votre ordinateur.

### 2️⃣ **Ouvrir le terminal**
- **Windows** : Clic droit dans le dossier → "Ouvrir dans le terminal"
- **Mac** : Applications → Terminal, puis `cd` vers le dossier
- **Linux** : Terminal, puis `cd` vers le dossier

### 3️⃣ **Installer les dépendances**
```bash
npm install
```
ou si vous utilisez pnpm :
```bash
pnpm install
```

---

## 🎮 Utilisation en mode développement

Pour tester l'application avant de la builder :

```bash
npm run electron:dev
```

Cela va :
- Démarrer le serveur de développement
- Ouvrir automatiquement l'application dans une fenêtre Electron
- Recharger automatiquement quand vous modifiez le code

---

## 📦 Créer l'application installable

### Pour **Windows** (.exe)
```bash
npm run electron:build:win
```
**Résultat** : Un fichier `.exe` dans le dossier `release/`

### Pour **macOS** (.dmg)
```bash
npm run electron:build:mac
```
**Résultat** : Un fichier `.dmg` dans le dossier `release/`

### Pour **Linux** (.AppImage)
```bash
npm run electron:build:linux
```
**Résultat** : Un fichier `.AppImage` dans le dossier `release/`

---

## 💿 Installer l'application

Une fois le build terminé :

### Windows
1. Allez dans le dossier `release/`
2. Double-cliquez sur `CinéBoost Setup X.X.X.exe`
3. Suivez l'assistant d'installation
4. L'application sera disponible dans le menu Démarrer

### macOS
1. Allez dans le dossier `release/`
2. Double-cliquez sur `CinéBoost-X.X.X.dmg`
3. Glissez CinéBoost dans le dossier Applications
4. Lancez depuis Launchpad ou Applications

### Linux
1. Allez dans le dossier `release/`
2. Rendez le fichier exécutable : `chmod +x CinéBoost-X.X.X.AppImage`
3. Double-cliquez ou lancez : `./CinéBoost-X.X.X.AppImage`

---

## ⚙️ Configuration de l'icône (optionnel)

Pour personnaliser l'icône de l'application :

1. Créez un dossier `public/` à la racine du projet (s'il n'existe pas)
2. Ajoutez votre icône nommée `icon.png` (512x512px minimum)
3. Rebuild l'application

---

## 🎯 Fonctionnalités de l'application

✅ **Interface sombre moderne** avec accents violet/rose  
✅ **Gestion de bibliothèque vidéo** (.mkv)  
✅ **Intégration TMDB** pour récupérer les métadonnées  
✅ **Sauvegarde automatique** des données (localStorage)  
✅ **Recherche** par titre et genre  
✅ **Modes d'affichage** grille et liste  
✅ **Lecteur vidéo intégré** (démo)  

---

## 📝 Notes importantes

⚠️ **Lecture vidéo** : L'application affiche actuellement une démo du lecteur. Pour lire de vrais fichiers .mkv, il faudrait :
- Implémenter un lecteur HTML5 avec support .mkv
- Ou intégrer un lecteur natif (VLC, MPV) via Electron

⚠️ **API TMDB** : Pour utiliser la recherche TMDB, vous devez :
1. Créer un compte sur [themoviedb.org](https://www.themoviedb.org/)
2. Obtenir une clé API gratuite
3. Modifier `src/app/components/AddMovieDialog.tsx` ligne 60 avec votre clé

---

## 🔧 Commandes disponibles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Démarre le serveur web (navigateur) |
| `npm run electron:dev` | Lance l'app Electron en développement |
| `npm run electron:build` | Build pour votre OS actuel |
| `npm run electron:build:win` | Build pour Windows |
| `npm run electron:build:mac` | Build pour macOS |
| `npm run electron:build:linux` | Build pour Linux |

---

## 🆘 Problèmes courants

### L'application ne démarre pas
- Vérifiez que Node.js est bien installé : `node --version`
- Supprimez `node_modules/` et refaites `npm install`

### Le build échoue
- Assurez-vous d'avoir suffisamment d'espace disque
- Sur macOS, vous aurez besoin des outils de développement Xcode

### L'icône ne s'affiche pas
- L'icône doit être au format PNG, 512x512px minimum
- Placez-la dans `public/icon.png`

---

## 📧 Support

Pour toute question ou problème, consultez :
- [Documentation Electron](https://www.electronjs.org/docs)
- [Documentation Electron Builder](https://www.electron.build/)

---

**Profitez de votre bibliothèque vidéo CinéBoost ! 🎬🚀**
