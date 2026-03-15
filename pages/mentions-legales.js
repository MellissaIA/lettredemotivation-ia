import { useState } from "react";

const sans = `'Montserrat', system-ui, sans-serif`;
const T = { bg: "#ffffff", text: "#1e293b", textMuted: "#64748b", textDim: "#94a3b8", accent: "#059669", blue: "#2563eb", border: "rgba(0,0,0,0.06)" };

export default function MentionsLegales() {
  return (
    <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>

        <a href="/" style={{ fontSize: 15, fontWeight: 700, color: T.text, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          lettredemotivation-<span style={{ background: "linear-gradient(135deg, #059669, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ia.fr</span>
        </a>

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, color: T.text }}>Mentions légales</h1>

        <div style={{ fontSize: 14, lineHeight: 1.9, color: T.textMuted, fontWeight: 500 }}>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>1. Éditeur du site</h2>
          <p>Le site <strong style={{ color: T.text }}>lettredemotivation-ia.fr</strong> est édité par :</p>
          <p style={{ marginTop: 8 }}>
            Raison sociale : <strong style={{ color: T.text }}>[NOM DE VOTRE LLC]</strong><br/>
            Forme juridique : Limited Liability Company (LLC) — Single Member<br/>
            Siège social : <strong style={{ color: T.text }}>[ADRESSE DE VOTRE LLC, Nouveau-Mexique, USA]</strong><br/>
            Email de contact : <strong style={{ color: T.text }}>[VOTRE EMAIL]</strong><br/>
            Responsable de la publication : <strong style={{ color: T.text }}>[VOTRE PRÉNOM NOM]</strong>
          </p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>2. Hébergement</h2>
          <p>
            Le site est hébergé par :<br/>
            <strong style={{ color: T.text }}>Vercel Inc.</strong><br/>
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br/>
            Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: T.blue }}>vercel.com</a>
          </p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>3. Propriété intellectuelle</h2>
          <p>L'ensemble du contenu du site (textes, design, logos, code source) est protégé par le droit d'auteur. Toute reproduction, même partielle, est interdite sans autorisation préalable de l'éditeur.</p>
          <p style={{ marginTop: 8 }}>Les lettres de motivation générées par l'intelligence artificielle appartiennent à l'utilisateur qui les a créées.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>4. Protection des données personnelles (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, nous nous engageons à protéger vos données personnelles.</p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginTop: 20, marginBottom: 8 }}>Données collectées</h3>
          <p>Nous collectons uniquement :</p>
          <p style={{ marginTop: 4 }}>
            — Votre adresse email (si vous utilisez un essai gratuit)<br/>
            — Les informations que vous saisissez dans le formulaire (poste, entreprise, compétences) pour générer votre lettre de motivation<br/>
            — Les données de paiement sont traitées directement par Stripe et ne transitent jamais par nos serveurs
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginTop: 20, marginBottom: 8 }}>Finalité du traitement</h3>
          <p>
            — Génération de votre lettre de motivation personnalisée<br/>
            — Envoi d'emails de conseils et d'offres commerciales (si vous avez donné votre email)<br/>
            — Amélioration du service
          </p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginTop: 20, marginBottom: 8 }}>Durée de conservation</h3>
          <p>Les données du formulaire ne sont pas stockées après la génération de votre lettre de motivation. Votre adresse email est conservée jusqu'à votre désinscription.</p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, marginTop: 20, marginBottom: 8 }}>Vos droits</h3>
          <p>Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données. Pour exercer ces droits, contactez-nous à : <strong style={{ color: T.text }}>[VOTRE EMAIL]</strong></p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>5. Cookies</h2>
          <p>Le site utilise des cookies techniques nécessaires au bon fonctionnement du service (sauvegarde des crédits et préférences). Des cookies publicitaires peuvent être utilisés par Google AdSense pour afficher des annonces pertinentes.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>6. Limitation de responsabilité</h2>
          <p>Les lettres de motivation générées par l'intelligence artificielle sont des suggestions. L'éditeur ne garantit pas l'obtention d'un entretien ou d'un emploi. L'utilisateur reste seul responsable de l'utilisation qu'il fait des contenus générés.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>7. Droit applicable</h2>
          <p>Les présentes mentions légales sont soumises au droit français en ce qui concerne les utilisateurs résidant en France et dans l'Union européenne.</p>

          <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
            <p style={{ fontSize: 12 }}>Dernière mise à jour : mars 2026</p>
            <a href="/" style={{ color: T.accent, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>← Retour à l'accueil</a>
          </div>
        </div>
      </div>
    </div>
  );
}
