# 🎬 CinéBoost - Bibliothèque Vidéo Personnelle

Application de bureau moderne pour gérer votre collection de films .mkv avec une interface inspirée d'IMDB.

![CinéBoost](https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Fonctionnalités

🎥 **Gestion de bibliothèque vidéo** - Importez et organisez vos fichiers .mkv  
🎨 **Interface moderne** - Thème sombre avec accents violet/rose  
🔍 **Recherche intelligente** - Par titre, année, genre  
📊 **Métadonnées automatiques** - Intégration avec l'API TMDB  
🎬 **Lecteur vidéo** - Visionnage intégré (démo)  
💾 **Sauvegarde locale** - Toutes vos données restent sur votre machine  

---

## 🚀 Installation RAPIDE (Sans Node.js)

### Option 1 : Télécharger l'application compilée

👉 **Allez dans l'onglet "Actions" de ce repository**

1. Cliquez sur le dernier build réussi (avec ✅)
2. Descendez jusqu'à "Artifacts"
3. Téléchargez selon votre système :
   - 🪟 **Windows** : `cineboost-win.zip`
   - 🍎 **macOS** : `cineboost-mac.zip`
   - 🐧 **Linux** : `cineboost-linux.zip`
4. Décompressez et installez !

### Option 2 : Compiler automatiquement

1. Forkez ce repository
2. Allez dans **Actions** → **Build CinéBoost Desktop App**
3. Cliquez sur **"Run workflow"**
4. Attendez 10 minutes ☕
5. Téléchargez vos fichiers compilés !

📖 **Guide détaillé** : Consultez `INSTALLATION_GITHUB.md`

---

## 💻 Installation pour développeurs

Si vous avez Node.js installé :

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run electron:dev

# Compiler l'application
npm run electron:build          # Votre OS actuel
npm run electron:build:win      # Windows
npm run electron:build:mac      # macOS
npm run electron:build:linux    # Linux
```

---

## 📁 Structure du projet

```
cineboost/
├── .github/workflows/       # Configuration GitHub Actions
│   └── build.yml           # Build automatique
├── src/
│   ├── app/
│   │   ├── components/     # Composants React
│   │   │   ├── AddMovieDialog.tsx
│   │   │   ├── MovieCard.tsx
│   │   │   ├── MovieDetails.tsx
│   │   │   └── VideoPlayer.tsx
│   │   └── App.tsx         # Composant principal
│   └── styles/             # Styles CSS
├── public/                 # Assets statiques
├── electron.cjs            # Configuration Electron
├── package.json            # Dépendances
└── README.md               # Ce fichier
```

---

## 🎮 Utilisation

1. **Lancer l'application**
2. Cliquez sur **"Ajouter un film"**
3. Entrez le titre du film → Recherche automatique TMDB
4. Sélectionnez votre film → Métadonnées importées !
5. Cliquez sur une affiche pour voir les détails
6. Profitez de votre collection ! 🎉

---

## 🔧 Configuration API TMDB

Pour utiliser la recherche automatique de métadonnées :

1. Créez un compte sur [themoviedb.org](https://www.themoviedb.org/)
2. Obtenez une clé API gratuite
3. Modifiez `src/app/components/AddMovieDialog.tsx` ligne 60 :
   ```typescript
   const API_KEY = 'VOTRE_CLE_API_ICI';
   ```

---

## 🎨 Technologies utilisées

- ⚛️ **React 18** - Framework UI
- ⚡ **Vite** - Build tool ultra-rapide
- 🖥️ **Electron** - Application de bureau
- 🎨 **Tailwind CSS** - Styling moderne
- 📦 **Material-UI** - Composants UI
- 🎬 **TMDB API** - Métadonnées de films

---

## 📸 Captures d'écran

### Interface principale
Interface avec grille de films, recherche et filtres

### Détails du film
Affichage complet avec synopsis, genres, notes

### Lecteur vidéo
Lecteur intégré avec contrôles

---

## 🐛 Problèmes connus

- La lecture vidéo est actuellement une démo (pas de lecture réelle de .mkv)
- Les fichiers sont sauvegardés en localStorage (limitée en taille)
- La recherche TMDB nécessite une clé API

---

## 🚧 Roadmap

- [ ] Lecture vidéo réelle de fichiers .mkv
- [ ] Support de sous-titres
- [ ] Base de données locale (SQLite)
- [ ] Import par dossier
- [ ] Synchronisation cloud
- [ ] Recommandations personnalisées

---

## 📄 Guides disponibles

- 📘 `INSTALLATION_GITHUB.md` - Guide complet GitHub Actions
- 📗 `GUIDE_INSTALLATION.md` - Installation avec Node.js
- 📙 `GUIDE_INSTALLATION_SIMPLE.md` - Toutes les options sans Node.js

---

## 🤝 Contribution

Les contributions sont les bienvenues !

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Pushez (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

---

## 👨‍💻 Auteur

Créé avec ❤️ pour gérer vos collections de films

---

## 🙏 Remerciements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - API de métadonnées
- [Electron](https://www.electronjs.org/) - Framework d'application de bureau
- [React](https://react.dev/) - Bibliothèque UI
- [Vite](https://vitejs.dev/) - Build tool

---

## ⭐ Support

Si ce projet vous plaît, mettez une ⭐ sur GitHub !

Pour toute question : créez une **Issue** sur ce repository.

---

**Profitez de CinéBoost ! 🎬🚀**
