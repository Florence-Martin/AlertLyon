# 🚧 Alert Lyon

**Alert Lyon** est une application conçue pour signaler à la ville de Lyon les problèmes susceptibles d'affecter la sécurité des habitants (accidents, travaux, voirie, etc.).

---

## Intégration de SendGrid avec un Backend

Pour gérer l'envoi des e-mails de manière sécurisée, nous avons mis en place un **backend utilisant Node.js et TypeScript** dans le dossier `sendgrid-backend`. Cela permet de protéger les informations sensibles, comme la clé API de SendGrid, en évitant de les exposer dans le code client de l'application.

---

### Structure du Projet

- Le backend est situé dans le dossier `sendgrid-backend` et comprend :
  - **src/server.ts** : Le fichier principal du serveur, où la logique d'envoi d'e-mails est implémentée.
  - **tsconfig.json** : Fichier de configuration TypeScript.
  - **dist/** : Dossier de sortie pour les fichiers compilés TypeScript.
  - **.env** : Fichier pour les variables d'environnement, qui devrait inclure la clé API de SendGrid (actuellement vide pour cet exercice).

---

## Sécurité de la clé API

Pour cette application d'entraînement, **la clé API de SendGrid n'est pas incluse** dans le projet. En situation de production, il est essentiel d'utiliser un fichier `.env` ou un gestionnaire de variables d'environnement pour sécuriser les informations sensibles.

### Exemple d'utilisation de `.env`

```env
SENDGRID_API_KEY=VotreCléAPIici
```
