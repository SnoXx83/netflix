# netflix

Nestflux - Netflix Clone (Static Version)
Bienvenue sur Nestflux, une version statique simplifiée de Netflix développée en JavaScript. Ce projet inclut une gestion d'authentification sécurisée (hachage des mots de passe) et un déploiement automatisé via GitHub Actions.

🚀 Fonctionnalités
Page d'accueil : Interface immersive inspirée de Netflix.

Inscription (Sign-Up) : Création de compte avec hachage du mot de passe via bcryptjs.

Connexion (Sign-In) : Authentification sécurisée en comparant les empreintes (hashs) stockées.

Gestion du Profil : Espace utilisateur et configuration stockés dans le localStorage.

Multi-pages : Navigation fluide entre l'authentification et l'application.

🛠️ Installation & Développement Local
Pour faire tourner ce projet sur ton ordinateur (notamment sous WSL/Linux) :

Cloner le dépôt :

Bash

git clone https://github.com/SnoXx83/nestflux.git
cd nestflux
Installer les dépendances :

Bash

npm install
Lancer le serveur de développement (Vite) :

Bash

npx vite
Accède ensuite à http://localhost:5173.


📦 Dépendances du projet
Voici les outils nécessaires installés via npm :

Production :

bcryptjs : Pour sécuriser les mots de passe avant le stockage dans le navigateur.

Développement :

vite : Serveur de développement ultra-rapide et outil de build.

path : Pour la gestion des chemins dans la configuration.


🏗️ Structure du Projet
Plaintext

nestflux/
├── .github/workflows/   # Automatisation du déploiement
├── src/
│   ├── Auth/            # SignupPage.html, SigninPage.html
│   └── user/            # Profil.html, Config.html
├── index.html           # Page d'entrée principale
├── vite.config.js       # Configuration multi-pages de Vite
└── package.json         # Dépendances et scripts


🌐 Déploiement
Ce projet est déployé automatiquement sur GitHub Pages. À chaque git push sur la branche main, une GitHub Action :

Installe les dépendances Node.js.

Compile le projet (npm run build).

Publie le dossier /dist final.
