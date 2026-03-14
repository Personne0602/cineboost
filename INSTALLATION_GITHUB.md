# 🎬 Installation CinéBoost avec GitHub - Guide Complet

## 🎯 Ce que vous allez faire

GitHub va **compiler automatiquement** votre application dans le cloud. Vous n'avez qu'à uploader les fichiers et télécharger le résultat final !

---

## 📋 Étape 1 : Créer un compte GitHub (si vous n'en avez pas)

1. Allez sur **https://github.com/signup**
2. Créez un compte gratuit
3. Vérifiez votre email

✅ **C'est gratuit et illimité !**

---

## 📁 Étape 2 : Télécharger votre projet CinéBoost

1. Dans Figma Make, cliquez sur **"Export"** ou téléchargez le projet
2. Décompressez le fichier ZIP sur votre ordinateur
3. Gardez cette fenêtre ouverte

---

## ➕ Étape 3 : Créer un nouveau repository GitHub

1. Sur GitHub, cliquez sur le bouton vert **"New"** (ou **"+"** en haut à droite → "New repository")

2. Remplissez les informations :
   - **Repository name** : `cineboost`
   - **Description** : `Ma bibliothèque vidéo personnelle`
   - **Public** ✅ (obligatoire pour les builds gratuits)
   - ❌ Ne cochez PAS "Add a README file"

3. Cliquez sur **"Create repository"**

---

## 📤 Étape 4 : Uploader vos fichiers

### Méthode A : Via l'interface web (SIMPLE)

1. Sur la page de votre nouveau repository, vous verrez **"uploading an existing file"** → Cliquez dessus

2. **Glissez-déposez TOUS les fichiers** de votre projet CinéBoost
   
   ⚠️ **Important** : Uploadez TOUS les fichiers, y compris :
   - Le dossier `.github/` (avec workflows/)
   - `package.json`
   - `electron.cjs`
   - Tous les dossiers `src/`, `public/`, etc.

3. Attendez que tous les fichiers soient uploadés

4. En bas de la page, écrivez dans "Commit changes" :
   ```
   Initial commit - CinéBoost
   ```

5. Cliquez sur **"Commit changes"**

### Méthode B : Via GitHub Desktop (RECOMMANDÉ)

1. Téléchargez **GitHub Desktop** : https://desktop.github.com/

2. Installez et connectez-vous avec votre compte GitHub

3. Cliquez sur **"Add" → "Add existing repository"**

4. Sélectionnez le dossier de votre projet CinéBoost

5. Cliquez sur **"Publish repository"**

6. ✅ Tous vos fichiers sont uploadés automatiquement !

---

## 🤖 Étape 5 : Activer GitHub Actions

1. Dans votre repository, cliquez sur l'onglet **"Actions"** (en haut)

2. GitHub détecte automatiquement le workflow `build.yml`

3. Cliquez sur **"I understand my workflows, go ahead and enable them"**

---

## 🚀 Étape 6 : Lancer le build

1. Toujours dans l'onglet **"Actions"**

2. À gauche, cliquez sur **"Build CinéBoost Desktop App"**

3. À droite, cliquez sur le bouton **"Run workflow"**

4. Sélectionnez **"Branch: main"** (ou "master")

5. Cliquez sur le bouton vert **"Run workflow"**

---

## ⏳ Étape 7 : Attendre la compilation (5-10 minutes)

Vous verrez 3 builds en cours :
- 🪟 **Windows** (build)
- 🍎 **macOS** (build)
- 🐧 **Linux** (build)

**Statut** :
- 🟡 Jaune = En cours
- 🟢 Vert = Terminé ✅
- 🔴 Rouge = Erreur (voir Étape 9)

☕ **Prenez un café, ça prend environ 7-10 minutes**

---

## 📥 Étape 8 : Télécharger votre application

Une fois que tout est ✅ vert :

1. Cliquez sur un des builds terminés (ex: "Build for windows-latest")

2. Descendez tout en bas de la page

3. Vous verrez **"Artifacts"** avec 3 fichiers :
   - **cineboost-win** 🪟 (pour Windows)
   - **cineboost-mac** 🍎 (pour macOS)
   - **cineboost-linux** 🐧 (pour Linux)

4. **Téléchargez celui de votre système**

5. Décompressez le fichier ZIP

6. **Double-cliquez** pour installer !

---

## 🎉 Installation finale

### Sur Windows :
- Ouvrez `CinéBoost-Setup-1.0.0.exe`
- Suivez l'assistant d'installation
- L'app apparaît dans le menu Démarrer

### Sur macOS :
- Ouvrez `CinéBoost-1.0.0.dmg`
- Glissez CinéBoost dans Applications
- Lancez depuis Launchpad

### Sur Linux :
- Rendez exécutable : `chmod +x CinéBoost-1.0.0.AppImage`
- Double-cliquez ou lancez : `./CinéBoost-1.0.0.AppImage`

---

## 🔄 Mettre à jour l'application

Si vous modifiez votre code :

1. Uploadez les nouveaux fichiers sur GitHub
2. Allez dans **Actions** → **Run workflow**
3. Téléchargez la nouvelle version !

**OU** si vous utilisez GitHub Desktop :
1. Modifiez vos fichiers localement
2. Dans GitHub Desktop, écrivez un message de commit
3. Cliquez **"Commit to main"**
4. Cliquez **"Push origin"**
5. Le build se lance automatiquement !

---

## 🆘 Étape 9 : En cas d'erreur

### Le build est rouge 🔴

1. Cliquez sur le build en erreur
2. Regardez les logs pour voir où ça bloque
3. Problèmes courants :

**"npm install failed"**
→ Le fichier `package.json` est manquant ou corrompu
→ Vérifiez que vous avez bien uploadé TOUS les fichiers

**"electron-builder failed"**
→ Le dossier `dist/` n'a pas été créé
→ Vérifiez que `vite build` fonctionne

**"workflow not found"**
→ Le dossier `.github/workflows/build.yml` est manquant
→ Assurez-vous d'uploader le dossier `.github/`

### Les artifacts n'apparaissent pas

→ Le build doit être complètement vert ✅
→ Attendez que les 3 builds (Windows, Mac, Linux) soient terminés

---

## 💡 Astuces

### Créer une release officielle

1. Dans votre repository, allez dans **"Releases"** (à droite)
2. Cliquez **"Create a new release"**
3. Tag : `v1.0.0`
4. Title : `CinéBoost v1.0.0`
5. Description : Décrivez les fonctionnalités
6. Cliquez **"Publish release"**

→ Les fichiers `.exe`, `.dmg` et `.AppImage` seront automatiquement attachés ! 🎉

### Builds automatiques à chaque modification

Le workflow est configuré pour builder automatiquement quand vous :
- Faites un commit sur `main` ou `master`
- Créez une release
- Cliquez manuellement sur "Run workflow"

---

## 📊 Récapitulatif

| Étape | Temps | Difficulté |
|-------|-------|------------|
| Créer compte GitHub | 2 min | ⭐ Facile |
| Créer repository | 1 min | ⭐ Facile |
| Uploader fichiers | 5 min | ⭐⭐ Moyen |
| Activer Actions | 30 sec | ⭐ Facile |
| Lancer le build | 30 sec | ⭐ Facile |
| **Attendre** | **7-10 min** | ☕ Café |
| Télécharger | 2 min | ⭐ Facile |
| **TOTAL** | **~15-20 min** | ⭐⭐ Moyen |

---

## 🎬 C'est parti !

Vous êtes maintenant prêt à compiler CinéBoost automatiquement sans jamais toucher à Node.js ! 🚀

**Besoin d'aide ?** Créez une "Issue" sur votre repository GitHub et décrivez votre problème.

**Bon build !** 🎉
