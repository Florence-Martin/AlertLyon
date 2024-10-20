### 🚧

**Alert Lyon** est une application faite pour alerter la ville de Lyon sur les problèmes pouvant affecter la sécurité des lyonnais (accident, travaux...)

---

### Configurer avec Emailjs, mais...Emailjs ne fonctionne pas avec React Native !!

**EmailJS** ne prend pas en charge les appels API depuis des applications mobiles comme **React Native**, ce qui entraîne l'erreur : **"API calls are disabled for non-browser applications"**. Voici deux alternatives pour contourner ce problème :

### Alternative 1 : Serveur intermédiaire avec Node.js

Créez un **serveur Node.js** qui interagit avec EmailJS. L'application React Native envoie une requête HTTP à ce serveur, qui gère l'envoi de l'e-mail via EmailJS.

- **Avantages** : Contrôle total, permet de garder EmailJS.
- **Inconvénients** : Nécessite un serveur et un déploiement (ex : Heroku, Vercel, ou Railway).

### Alternative 2 : Utiliser SendGrid

Utilisez **SendGrid** (ou Mailgun, ou AWS SES) pour envoyer des e-mails directement depuis React Native avec leur API, sans serveur intermédiaire.

- **Avantages** : Facile à configurer, pas de serveur nécessaire.
- **Inconvénients** : Nécessite un compte SendGrid.
