# 🎬 Guide d'installation CinéBoost - SANS Node.js

Vous voulez juste une application à double-cliquer sans installer Node.js ? Voici les solutions !

---

## 🌟 Option 1 : Utiliser GitHub Actions (RECOMMANDÉ)

Cette méthode compile automatiquement l'application pour vous dans le cloud.

### Étapes :

1. **Créer un compte GitHub** (gratuit) : https://github.com/signup

2. **Créer un nouveau repository** :
   - Cliquez sur "New repository"
   - Nommez-le "cineboost"
   - Mettez-le en Public
   - Cliquez "Create repository"

3. **Uploader votre projet** :
   - Téléchargez GitHub Desktop : https://desktop.github.com/
   - Ou uploadez directement via le site (glisser-déposer les fichiers)

4. **Créer le fichier de build automatique** :
   - Dans votre repository, créez un dossier `.github/workflows/`
   - Créez un fichier `build.yml` (voir ci-dessous)

5. **Lancer le build** :
   - Allez dans l'onglet "Actions"
   - Cliquez sur "Run workflow"
   - Attendez 5-10 minutes

6. **Télécharger votre application** :
   - Une fois terminé, allez dans "Releases"
   - Téléchargez le fichier pour votre système (Windows/Mac/Linux)
   - Double-cliquez pour installer !

---

## 📄 Fichier `.github/workflows/build.yml`

Créez ce fichier dans `.github/workflows/build.yml` :

```yaml
name: Build CinéBoost

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [windows-latest, macos-latest, ubuntu-latest]

    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build application
        run: npm run electron:build
        
      - name: Upload artifacts
        uses: actions/upload-artifact@v3
        with:
          name: cineboost-${{ matrix.os }}
          path: release/*
```

---

## 🚀 Option 2 : Service de build en ligne

Utilisez un service qui compile pour vous :

### **AppVeyor** (gratuit pour projets publics)
1. Allez sur https://www.appveyor.com/
2. Connectez votre compte GitHub
3. Sélectionnez votre repository
4. Le build se lance automatiquement

### **CircleCI** (gratuit)
1. Allez sur https://circleci.com/
2. Connectez GitHub
3. Configurez votre projet
4. Téléchargez les artifacts

---

## 💻 Option 3 : Demander à quelqu'un de compiler

Si vous avez un ami/collègue avec Node.js installé :

1. Donnez-lui le projet
2. Il exécute :
   ```bash
   npm install
   npm run electron:build:win   # Pour Windows
   npm run electron:build:mac   # Pour Mac
   npm run electron:build:linux # Pour Linux
   ```
3. Il vous donne le fichier dans `release/`
4. Vous double-cliquez pour installer !

---

## 📦 Option 4 : Version portable (sans installation)

Si vous voulez une version qui fonctionne sans installation :

### Pour Windows - Créer un .exe portable :

Modifiez `package.json`, section `"build"` → `"win"` :

```json
"win": {
  "target": ["portable"],
  "icon": "public/icon.png"
}
```

Cela créera un fichier `CinéBoost.exe` que vous pouvez mettre sur une clé USB !

---

## 🎁 Option 5 : Utiliser une version web

Au lieu d'une app de bureau, hébergez l'application en ligne :

### **Netlify** (100% gratuit, aucune installation) :

1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez TOUT votre dossier de projet
3. Netlify vous donne un lien (ex: `cineboost.netlify.app`)
4. Accédez à l'application depuis n'importe quel navigateur !

### **Vercel** (gratuit) :

```bash
# Juste une fois, installez Vercel CLI
npx vercel login
npx vercel --prod
```

Ou via l'interface web : https://vercel.com/

---

## ⚡ Résumé rapide

| Méthode | Avantages | Inconvénients |
|---------|-----------|---------------|
| **GitHub Actions** | ✅ Automatique, gratuit, multi-plateformes | ⏱️ 10 min de build |
| **AppVeyor/CircleCI** | ✅ Professionnel, facile | 📝 Configuration nécessaire |
| **Ami avec Node** | ✅ Ultra simple | 👥 Besoin de quelqu'un |
| **Version portable** | ✅ Sans installation | 💻 Besoin de compiler une fois |
| **Netlify/Vercel** | ✅ Instantané, aucune installation | 🌐 Besoin d'internet |

---

## 🆘 Ma recommandation

Pour vous, je recommande **Netlify Drop** :

1. Téléchargez votre projet depuis Figma Make
2. Allez sur https://app.netlify.com/drop
3. Glissez-déposez tout le dossier
4. Boom ! Votre application est en ligne 🎉

**Pas besoin de Node.js, pas de terminal, pas de commandes !**

---

## 📱 Bonus : Créer une PWA (Progressive Web App)

Votre application peut aussi s'installer comme une app native depuis le navigateur :

1. Hébergez sur Netlify/Vercel
2. Ouvrez le lien dans Chrome/Edge
3. Cliquez sur l'icône "Installer" dans la barre d'adresse
4. L'application s'ajoute à votre bureau/menu !

✨ **Aucune compilation nécessaire, fonctionne partout !**

---

**Quelle option préférez-vous que je configure pour vous ?** 🚀
