import express from "express";
import { Express, Request, Response } from "express";
import cors from "cors";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

const app: Express = express();
app.use(express.json());

app.use(cors());

// Définir le schéma de validation avec Joi
const emailRequestSchema = Joi.object({
  selectedIncidentType: Joi.string().required(),
  name: Joi.string().required(),
  firstname: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  postcode: Joi.string().required(),
  city: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  date: Joi.string().required(),
  time: Joi.string().required(),
});

app.post("/send-email", (req: Request, res: Response) => {
  // Valider le corps de la requête
  const { error } = emailRequestSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const {
    selectedIncidentType,
    name,
    firstname,
    description,
    address,
    postcode,
    city,
    email,
    phoneNumber,
    date,
    time,
  } = req.body;

  const msg = {
    to: "DESTINATAIRE_EMAIL@example.com",
    from: "VOTRE_EMAIL@example.com",
    subject: "Nouveau signalement d'incident",
    text: `Type d'incident: ${selectedIncidentType}\nNom: ${name}\nPrénom: ${firstname}\nDescription: ${description}\nAdresse: ${address}\nCode Postal: ${postcode}\nVille: ${city}\nEmail: ${email}\nNuméro de téléphone: ${phoneNumber}\nDate: ${date}\nHeure: ${time}`,
  };

  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({ message: "E-mail envoyé avec succès" });
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi de l'e-mail", error);
      res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`)
);
