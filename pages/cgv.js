import { useState } from "react";

const sans = `'Montserrat', system-ui, sans-serif`;
const T = { bg: "#ffffff", text: "#1e293b", textMuted: "#64748b", textDim: "#94a3b8", accent: "#059669", blue: "#2563eb", border: "rgba(0,0,0,0.06)" };

export default function CGV() {
  return (
    <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>

        <a href="/" style={{ fontSize: 15, fontWeight: 700, color: T.text, textDecoration: "none", display: "inline-block", marginBottom: 32 }}>
          lettredemotivation-<span style={{ background: "linear-gradient(135deg, #059669, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ia.fr</span>
        </a>

        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 32, color: T.text }}>Conditions Générales de Vente</h1>

        <div style={{ fontSize: 14, lineHeight: 1.9, color: T.textMuted, fontWeight: 500 }}>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>1. Objet</h2>
          <p>Les présentes Conditions Générales de Vente (CGV) régissent l'utilisation du service de génération de lettres de motivation par intelligence artificielle proposé sur le site <strong style={{ color: T.text }}>lettredemotivation-ia.fr</strong> (ci-après « le Service »).</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>2. Description du service</h2>
          <p>Le Service permet aux utilisateurs de générer des lettres de motivation personnalisées grâce à l'intelligence artificielle. L'utilisateur renseigne des informations (poste visé, expérience, compétences) et reçoit une lettre de motivation rédigée automatiquement.</p>
          <p style={{ marginTop: 8 }}>Le Service est proposé sous forme de crédits :</p>
          <p style={{ marginTop: 4 }}>
            — <strong style={{ color: T.text }}>Essai gratuit</strong> : 2 lettres de motivation au format Courte, sans engagement ni carte bancaire<br/>
            — <strong style={{ color: T.text }}>Packs payants</strong> : de 1 à 50 crédits permettant d'accéder à tous les formats (Courte, Standard, Détaillée)
          </p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>3. Tarifs</h2>
          <p>Les tarifs en vigueur sont les suivants :</p>
          <p style={{ marginTop: 4 }}>
            — 1 crédit : <strong style={{ color: T.text }}>1,99€</strong><br/>
            — 5 crédits : <strong style={{ color: T.text }}>4,99€</strong> (soit 1,00€/lettre de motivation)<br/>
            — 15 crédits : <strong style={{ color: T.text }}>9,99€</strong> (soit 0,67€/lettre de motivation)<br/>
            — 50 crédits : <strong style={{ color: T.text }}>19,99€</strong> (soit 0,40€/lettre de motivation)
          </p>
          <p style={{ marginTop: 8 }}>Les prix sont indiqués en euros (€), toutes taxes comprises. L'éditeur se réserve le droit de modifier les tarifs à tout moment. Les tarifs applicables sont ceux en vigueur au moment de l'achat.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>4. Paiement</h2>
          <p>Le paiement est effectué en ligne par carte bancaire via la plateforme sécurisée <strong style={{ color: T.text }}>Stripe</strong>. Les données de paiement sont traitées directement par Stripe et ne sont jamais stockées sur nos serveurs.</p>
          <p style={{ marginTop: 8 }}>Le paiement est exigible immédiatement à la commande. Les crédits sont attribués dès la confirmation du paiement.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>5. Droit de rétractation</h2>
          <p>Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux contenus numériques fournis immédiatement après l'achat. En achetant des crédits, l'utilisateur accepte que le service soit exécuté immédiatement et renonce à son droit de rétractation.</p>
          <p style={{ marginTop: 8 }}>Toutefois, si un problème technique empêche la génération d'une lettre de motivation après débit d'un crédit, celui-ci sera automatiquement recrédité.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>6. Durée de validité des crédits</h2>
          <p>Les crédits achetés n'ont <strong style={{ color: T.text }}>pas de date d'expiration</strong> et restent valables tant que le service est en activité.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>7. Propriété des contenus générés</h2>
          <p>Les lettres de motivation générées par le Service appartiennent entièrement à l'utilisateur. L'éditeur ne conserve pas les lettres générées et ne les réutilise en aucun cas.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>8. Limitation de responsabilité</h2>
          <p>Le Service fournit des lettres de motivation générées par intelligence artificielle à titre de suggestion. L'éditeur ne garantit en aucun cas :</p>
          <p style={{ marginTop: 4 }}>
            — L'obtention d'un entretien ou d'un emploi<br/>
            — L'exactitude de toutes les informations générées<br/>
            — La disponibilité ininterrompue du service
          </p>
          <p style={{ marginTop: 8 }}>L'utilisateur est seul responsable de la relecture, de la vérification et de l'utilisation des contenus générés.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>9. Service client</h2>
          <p>Pour toute question ou réclamation, contactez-nous par email à : <strong style={{ color: T.text }}>[VOTRE EMAIL]</strong></p>
          <p style={{ marginTop: 8 }}>Nous nous engageons à répondre dans un délai de 48 heures ouvrées.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>10. Médiation</h2>
          <p>En cas de litige non résolu, le consommateur peut recourir gratuitement au service de médiation. Conformément aux articles L611-1 et R612-1 du Code de la consommation, le consommateur peut saisir le médiateur compétent dont les coordonnées seront communiquées sur simple demande.</p>

          <h2 style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 32, marginBottom: 12 }}>11. Droit applicable</h2>
          <p>Les présentes CGV sont soumises au droit français pour les utilisateurs résidant en France et dans l'Union européenne. Tout litige sera soumis aux tribunaux compétents.</p>

          <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${T.border}`, textAlign: "center" }}>
            <p style={{ fontSize: 12 }}>Dernière mise à jour : mars 2026</p>
            <a href="/" style={{ color: T.accent, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>← Retour à l'accueil</a>
          </div>
        </div>
      </div>
    </div>
  );
}
