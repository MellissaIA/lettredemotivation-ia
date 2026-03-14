import { useState, useEffect, useCallback, useRef } from "react";

const PACKS = [
  { id: "pack1", credits: 1, price: "1,99", unit: "1,99", sub: "Tester une candidature importante" },
  { id: "pack5", credits: 5, price: "4,99", unit: "1,00", best: true, sub: "Recherche d'emploi active" },
  { id: "pack15", credits: 15, price: "9,99", unit: "0,67", sub: "Postuler partout en même temps" },
  { id: "pack50", credits: 50, price: "19,99", unit: "0,40", sub: "Coachs emploi, agences, associations" },
];

const SIZES = [
  { id: "courte", label: "Courte", words: "150-200 mots", desc: "Aperçu rapide de l'outil", maxTokens: 400, free: true, icon: "S" },
  { id: "standard", label: "Standard", words: "250-350 mots", desc: "Le choix préféré des recruteurs", maxTokens: 700, free: false, icon: "M", examples: "CDI, CDD, alternance, intérim, emploi saisonnier, reconversion", recommended: true },
  { id: "detaillee", label: "Détaillée", words: "350-450 mots", desc: "Maximum d'impact pour décrocher l'entretien", maxTokens: 900, free: false, icon: "L", examples: "Manager, cadre, chef de projet, directeur, ingénieur, consultant, médecin, avocat, grande entreprise" },
];

const TONES = [
  { id: "professionnel", label: "Professionnel" },
  { id: "dynamique", label: "Dynamique" },
  { id: "creatif", label: "Créatif" },
];

const JOBS = ["Vendeur/se", "Serveur/se", "Développeur", "Infirmier/ère", "Commercial(e)", "Assistant(e)"];

const Anim = ({ children, delay = 0, y = 24 }) => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

export default function LettreIA() {
  const [page, setPage] = useState("accueil");
  const [credits, setCredits] = useState(2);
  const [freeUsed, setFreeUsed] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [form, setForm] = useState({ poste: "", entreprise: "", experience: "", competences: "", formation: "", tone: "professionnel", size: "courte" });
  const [lettre, setLettre] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showPricing, setShowPricing] = useState(false);

  useEffect(() => { if (!loading) return; const i = setInterval(() => setProgress(p => Math.min(p + Math.random() * 11, 93)), 500); return () => clearInterval(i); }, [loading]);

  const canGen = useCallback(() => {
    if (!form.poste.trim()) return false;
    if (isPaid && credits > 0) return true;
    if (!isPaid && freeUsed < 2) return form.size === "courte";
    return false;
  }, [form.poste, form.size, isPaid, credits, freeUsed]);

  const needsUp = useCallback(() => {
    if (isPaid && credits > 0) return false;
    if (!isPaid && freeUsed >= 2) return true;
    if (!isPaid && form.size !== "courte") return true;
    return false;
  }, [isPaid, credits, freeUsed, form.size]);

  const generate = async () => {
    if (!canGen()) return;
    setPage("loading"); setLoading(true); setProgress(0); setError("");
    const sz = SIZES.find(s => s.id === form.size);
    const prompt = `Tu es un expert en lettres de motivation en français. Normes françaises strictes.

Génère une lettre de motivation avec :
- Poste : ${form.poste}
- Entreprise : ${form.entreprise || "non précisée"}
- Expérience : ${form.experience || "Pas d'expérience spécifique"}
- Compétences : ${form.competences || "Non précisées"}
- Formation : ${form.formation || "Non précisée"}
- Tonalité : ${form.tone}
- Longueur : ${sz.words}

Règles : structure française (coordonnées fictives, objet, MOI-VOUS-NOUS, politesse formelle), ${sz.words} MAX, personnalisé, verbes d'action, pas de crochets. Écris UNIQUEMENT la lettre.`;

    try {
      const res = await fetch("/api/generate", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, maxTokens: sz.maxTokens }),
      });
      const data = await res.json();
      if (data.text) {
        setLettre(data.text); setProgress(100);
        if (isPaid) setCredits(c => c - 1); else setFreeUsed(n => n + 1);
        setTimeout(() => { setPage("resultat"); setLoading(false); }, 500);
      } else { setError("Erreur. Réessaie."); setPage("formulaire"); setLoading(false); }
    } catch { setError("Erreur de connexion."); setPage("formulaire"); setLoading(false); }
  };

  const buyPack = (p) => { setCredits(c => c + p.credits); setIsPaid(true); setShowPricing(false); if (page === "accueil") setPage("formulaire"); };
  const copy = () => { navigator.clipboard.writeText(lettre); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const resetAll = () => { setForm({ poste: "", entreprise: "", experience: "", competences: "", formation: "", tone: "professionnel", size: "courte" }); setLettre(""); setPage("accueil"); };

  const font = `'Instrument Serif', Georgia, serif`;
  const sans = `'DM Sans', system-ui, sans-serif`;
  const T = {
    bg: "#ffffff", surface: "#ffffff", surfaceLight: "#f5f7fa", accent: "#059669",
    accentSoft: "rgba(5,150,105,0.07)", accentBorder: "rgba(5,150,105,0.18)",
    text: "#1e293b", textMuted: "#64748b", textDim: "#94a3b8", border: "rgba(0,0,0,0.06)",
    borderLight: "rgba(0,0,0,0.08)",
    green: "#059669", greenSoft: "rgba(5,150,105,0.07)",
    blue: "#2563eb", blueSoft: "rgba(37,99,235,0.06)", blueBorder: "rgba(37,99,235,0.12)",
    emerald: "#10b981", emeraldDark: "#047857",
  };

  const globalCSS = `@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}::selection{background:rgba(5,150,105,.15);color:#1e293b}*{box-sizing:border-box}`;

  const wrap = { fontFamily: sans, background: T.bg, minHeight: "100vh", color: T.text, position: "relative", overflow: "hidden" };
  const ctn = { maxWidth: 620, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 };

  const Orb = ({ top, left, color, size = 400 }) => <div style={{ position: "fixed", top, left, width: size, height: size, borderRadius: "50%", background: color, filter: "blur(140px)", opacity: 0.12, pointerEvents: "none", zIndex: 0 }} />;

  const Logo = () => (
    <div onClick={resetAll} style={{ display: "inline-flex", alignItems: "center", cursor: "pointer", border: `1.5px solid ${T.text}`, borderRadius: 8, padding: "8px 16px", gap: 8, transition: "all 0.2s" }}>
      <span style={{ fontSize: 14, fontWeight: 600, fontFamily: sans, color: T.text, textTransform: "uppercase", letterSpacing: 2 }}>Lettre de motivation</span>
      <span style={{ width: 1.5, height: 18, background: T.textDim, opacity: 0.3 }} />
      <span style={{ fontSize: 16, fontWeight: 700, fontFamily: sans, letterSpacing: 3, background: `linear-gradient(135deg, ${T.accent}, ${T.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IA</span>
    </div>
  );

  const Badge = () => (
    <div onClick={() => setShowPricing(true)} style={{ display: "flex", alignItems: "center", gap: 6, background: isPaid ? T.blueSoft : T.accentSoft, border: `1px solid ${isPaid ? T.blueBorder : T.accentBorder}`, padding: "6px 14px", borderRadius: 20, cursor: "pointer", backdropFilter: "blur(10px)" }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: credits > 0 ? T.green : T.accent }} />
      <span style={{ fontSize: 12, fontWeight: 500, color: isPaid ? T.blue : T.accent }}>{isPaid ? `${credits} crédit${credits !== 1 ? "s" : ""}` : `${2 - freeUsed}/2 gratuits`}</span>
    </div>
  );

  const Nav = () => <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 28, marginBottom: 40 }}><Logo /><Badge /></div>;

  const Btn = ({ children, onClick, disabled, variant = "primary", full, style: s }) => {
    const base = { fontFamily: sans, fontSize: 14, fontWeight: 500, borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: full ? "100%" : "auto" };
    const v = {
      primary: { ...base, background: `linear-gradient(135deg, ${T.accent}, ${T.blue})`, color: "#fff", padding: "14px 32px", boxShadow: "0 8px 32px rgba(5,150,105,0.2)", opacity: disabled ? 0.4 : 1 },
      secondary: { ...base, background: T.surfaceLight, color: T.text, padding: "14px 32px", border: `1px solid ${T.borderLight}` },
      ghost: { ...base, background: "transparent", color: T.textMuted, padding: "12px 24px" },
    };
    return <button onClick={onClick} disabled={disabled} style={{ ...v[variant], ...s }}
      onMouseEnter={e => { if (!disabled) e.target.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.target.style.transform = "none"; }}>{children}</button>;
  };

  const Field = ({ label: l, ph, val, set, area, req }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: T.textMuted, marginBottom: 7, display: "block", letterSpacing: 1, textTransform: "uppercase" }}>{l}{req && <span style={{ color: T.accent }}> *</span>}</label>
      {area
        ? <textarea placeholder={ph} value={val} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "13px 16px", fontSize: 14, fontFamily: sans, border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface, color: T.text, outline: "none", resize: "vertical", minHeight: 80, transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
        : <input placeholder={ph} value={val} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "13px 16px", fontSize: 14, fontFamily: sans, border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface, color: T.text, outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
      }
    </div>
  );

  const Pricing = () => (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={() => setShowPricing(false)}>
      <div style={{ background: T.surface, borderRadius: 20, padding: "32px 28px", maxWidth: 400, width: "100%", border: `1px solid ${T.borderLight}`, boxShadow: "0 24px 80px rgba(0,0,0,0.15)" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 20, fontFamily: font, color: T.text }}>Acheter des crédits</span>
          <div onClick={() => setShowPricing(false)} style={{ width: 30, height: 30, borderRadius: 8, background: T.surfaceLight, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.textMuted, fontSize: 14 }}>✕</div>
        </div>
        <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20, lineHeight: 1.5 }}>1 crédit = 1 lettre, toutes longueurs. Moins cher qu'un café.</p>
        {PACKS.map(p => (
          <div key={p.id} onClick={() => buyPack(p)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderRadius: 12, marginBottom: 8, background: p.best ? T.blueSoft : T.surfaceLight, border: p.best ? `1px solid ${T.blueBorder}` : `1px solid ${T.border}`, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.02)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 500, color: p.best ? T.blue : T.text }}>{p.credits} lettre{p.credits > 1 ? "s" : ""}{p.best && <span style={{ fontSize: 10, background: T.blue, color: "#fff", padding: "2px 8px", borderRadius: 8, marginLeft: 8 }}>populaire</span>}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{p.sub}</div>
              <div style={{ fontSize: 11, color: T.green, fontWeight: 500, marginTop: 1 }}>{p.unit}€ / lettre</div>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: T.text }}>{p.price}€</div>
          </div>
        ))}
        <p style={{ fontSize: 11, color: T.textDim, textAlign: "center", marginTop: 14 }}>Paiement sécurisé Stripe. Crédits sans expiration.</p>

        {/* Payment icons + security */}
        <div style={{ marginTop: 16, padding: "16px 0 4px", borderTop: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 12 }}>
            {/* Visa */}
            <svg width="38" height="24" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#1a1f71"/><path d="M15.2 16.5l2.1-10h2.6l-2.1 10h-2.6zm10.8-10l-2.5 6.9-.3-1.4-1-4.8s-.1-.7-.9-.7h-3.7l-.1.3s1 .2 2.1.9l2.5 9.8h2.7l4.1-10h-2.9zm-17.4 0l-2.6 10h-2.5l-1.5-8c-.1-.4-.3-.5-.6-.7C1 7.5.3 7.3.3 7.3v-.3h4.2c.5 0 1 .4 1.1 1l1 5.5 2.5-6.5h2.5zm21.5 0h2l2 10h-2.4l-.3-1.5h-3.2l-.5 1.5h-2.6l3.6-9.2c.2-.5.6-.8 1.1-.8h.3zm-1.3 6.5h2.1l-1.2-5.7-1 5.7z" fill="white"/></svg>
            {/* Mastercard */}
            <svg width="38" height="24" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 010 10.4 7 7 0 000-10.4z" fill="#FF5F00"/></svg>
            {/* Apple Pay */}
            <div style={{ background: "#000", borderRadius: 4, padding: "3px 8px", display: "flex", alignItems: "center", gap: 3 }}>
              <svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M10.1 4.7c-.1.1-1.7 1-1.7 3 0 2.3 2 3.1 2 3.1s-1.1 3.1-2.6 3.1c-.7 0-1.3-.5-2-.5-.8 0-1.5.5-2.1.5C2.3 14 0 10.8 0 8c0-2.8 1.7-4.2 3.3-4.2.8 0 1.4.5 1.9.5.5 0 1.2-.6 2.1-.6.6 0 2 .2 2.8 1zM7.6 2.3C8 1.8 8.3 1 8.3 0c0 0-1 0-2.1 1-.8.8-1.4 1.7-1.4 2.6 0 .1 1.2.1 2.1-.5.3-.3.5-.6.7-.8z"/></svg>
              <span style={{ color: "#fff", fontSize: 10, fontWeight: 500 }}>Pay</span>
            </div>
            {/* Google Pay */}
            <div style={{ background: "#fff", borderRadius: 4, padding: "3px 8px", display: "flex", alignItems: "center", gap: 2 }}>
              <svg width="12" height="12" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <span style={{ color: "#333", fontSize: 10, fontWeight: 600 }}>Pay</span>
            </div>
          </div>
          {/* Security badge */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="3" y="6" width="8" height="6" rx="1.5" stroke={T.green} strokeWidth="1.2"/>
              <path d="M5 6V4.5a2 2 0 014 0V6" stroke={T.green} strokeWidth="1.2" strokeLinecap="round"/>
              <circle cx="7" cy="9.5" r="0.8" fill={T.green}/>
            </svg>
            <span style={{ fontSize: 11, color: T.green, fontWeight: 500 }}>Paiement 100% sécurisé par Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );

  // ═══════ ACCUEIL ═══════
  if (page === "accueil") return (
    <div style={{ fontFamily: sans, color: T.text, position: "relative", overflow: "hidden" }}>
      <style>{globalCSS}</style>
      {showPricing && <Pricing />}

      {/* ── HERO — fond pastel ── */}
      <div style={{ background: T.bg, position: "relative", overflow: "hidden" }}>
        <Orb top="-200px" left="-100px" color="#10b981" size={600} />
        <Orb top="30%" left="80%" color="#2563eb" size={500} />
        <div style={{ ...ctn, paddingTop: 0 }}>
          <Anim><Nav /></Anim>
          <div style={{ paddingTop: 32, paddingBottom: 72 }}>
            <Anim delay={100}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: T.accentSoft, border: `1px solid ${T.accentBorder}`, padding: "6px 16px", borderRadius: 20, marginBottom: 28 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent, animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: T.accent }}>Propulsé par l'IA Claude</span>
              </div>
            </Anim>
            <Anim delay={200}>
              <h1 style={{ fontFamily: font, fontSize: 52, lineHeight: 1.08, fontWeight: 400, color: T.text, marginBottom: 20, letterSpacing: -1.5 }}>
                Votre lettre de<br />motivation,{" "}
                <span style={{ fontStyle: "italic", background: `linear-gradient(135deg, ${T.accent}, ${T.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>parfaite</span>
                <br />en 30 secondes.
              </h1>
            </Anim>
            <Anim delay={350}>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: T.textMuted, marginBottom: 40, maxWidth: 440 }}>L'intelligence artificielle rédige une lettre personnalisée, aux normes françaises, prête à envoyer. Deux essais gratuits, sans carte bancaire.</p>
            </Anim>
            <Anim delay={450}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Btn onClick={() => setPage("formulaire")}>Créer ma lettre gratuitement</Btn>
                <Btn variant="secondary" onClick={() => setShowPricing(true)}>Voir les prix</Btn>
              </div>
            </Anim>
            <Anim delay={550}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 48 }}>
                {[{ n: "30s", l: "de génération" }, { n: "3 formats", l: "courte, standard, détaillée" }, { n: "0€", l: "2 lettres pour tester" }].map((f, i) => (
                  <div key={i} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 14, padding: "20px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 24, fontWeight: 600, color: T.text }}>{f.n}</div>
                    <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>{f.l}</div>
                  </div>
                ))}
              </div>
            </Anim>
          </div>
        </div>
      </div>

      {/* ── COMMENT ÇA MARCHE — fond blanc ── */}
      <div style={{ background: "#ffffff", padding: "64px 0" }}>
        <div style={ctn}>
          <Anim delay={600}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 24, fontFamily: sans, fontWeight: 700, color: T.text, textTransform: "uppercase", letterSpacing: 3 }}>Comment ça marche</div>
              <div style={{ fontSize: 32, fontWeight: 700, fontFamily: sans, display: "inline", background: "linear-gradient(135deg, #059669, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}> ?</div>
            </div>
          
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0, position: "relative", marginBottom: 16 }}>
              {[
                { icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="4" y="6" width="20" height="16" rx="2" stroke="#059669" strokeWidth="1.5"/>
                    <line x1="4" y1="10" x2="24" y2="10" stroke="#059669" strokeWidth="1.5"/>
                    <line x1="8" y1="14" x2="20" y2="14" stroke="#059669" strokeWidth="1" opacity="0.5"/>
                    <line x1="8" y1="17" x2="16" y2="17" stroke="#059669" strokeWidth="1" opacity="0.5"/>
                  </svg>
                ), t: "Décrivez", d: "Poste visé, entreprise, votre profil", color: T.accent, bg: T.accentSoft, border: T.accentBorder },
                { icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <rect x="3" y="8" width="8" height="14" rx="1.5" stroke="#2563eb" strokeWidth="1.5"/>
                    <rect x="13" y="5" width="8" height="17" rx="1.5" stroke="#2563eb" strokeWidth="1.5"/>
                    <rect x="23" y="2" width="2" height="20" rx="1" fill="#2563eb" opacity="0.3"/>
                    <line x1="5" y1="12" x2="9" y2="12" stroke="#2563eb" strokeWidth="1" opacity="0.5"/>
                    <line x1="15" y1="9" x2="19" y2="9" stroke="#2563eb" strokeWidth="1" opacity="0.5"/>
                  </svg>
                ), t: "Choisissez", d: "Courte, Standard ou Détaillée", color: T.blue, bg: T.blueSoft, border: T.blueBorder },
                { icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M14 4L17.5 11H24L18.5 15.5L20.5 23L14 18.5L7.5 23L9.5 15.5L4 11H10.5L14 4Z" stroke="#059669" strokeWidth="1.5" strokeLinejoin="round"/>
                  </svg>
                ), t: "Recevez", d: "Lettre pro prête en 30 secondes", color: T.green, bg: T.greenSoft, border: "rgba(5,150,105,0.15)" },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "24px 12px", position: "relative" }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: step.bg, border: `1px solid ${step.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, position: "relative" }}>
                    {step.icon}
                    <div style={{ position: "absolute", top: -6, right: -6, width: 20, height: 20, borderRadius: "50%", background: "#fff", border: `1.5px solid ${step.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 600, color: step.color }}>{i + 1}</div>
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 4 }}>{step.t}</div>
                  <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.5, maxWidth: 150 }}>{step.d}</div>
                  {i < 2 && (
                    <svg width="24" height="12" viewBox="0 0 24 12" style={{ position: "absolute", right: -12, top: 40, zIndex: 3 }}>
                      <path d="M2 6H18M18 6L14 2M18 6L14 10" stroke={T.textDim} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: 12 }}>
              <Btn onClick={() => setPage("formulaire")}>Essayer maintenant</Btn>
            </div>
          </Anim>
        </div>
      </div>

      {/* ── CTA + CONFIANCE — fond dégradé émeraude/bleu avec texte blanc ── */}
      <div style={{ background: "linear-gradient(135deg, #059669, #047857, #0f766e)", padding: "56px 0" }}>
        <div style={ctn}>
          <Anim delay={700}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontFamily: sans, fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>Prêt à décrocher votre entretien ?</div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: 420, margin: "0 auto 32px" }}>Rejoignez les candidats qui utilisent l'IA pour se démarquer. Deux lettres gratuites, aucune carte bancaire requise.</p>
              <Btn onClick={() => setPage("formulaire")} style={{ background: "#fff", color: "#059669", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>Créer ma lettre gratuitement</Btn>
            </div>
          </Anim>
        </div>
      </div>

      {/* ── PAIEMENT & CONFIANCE — fond pastel ── */}
      <div style={{ background: T.bg, padding: "40px 0 48px" }}>
        <div style={ctn}>
          <Anim delay={750}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#1a1f71"/><path d="M15.2 16.5l2.1-10h2.6l-2.1 10h-2.6zm10.8-10l-2.5 6.9-.3-1.4-1-4.8s-.1-.7-.9-.7h-3.7l-.1.3s1 .2 2.1.9l2.5 9.8h2.7l4.1-10h-2.9zm-17.4 0l-2.6 10h-2.5l-1.5-8c-.1-.4-.3-.5-.6-.7C1 7.5.3 7.3.3 7.3v-.3h4.2c.5 0 1 .4 1.1 1l1 5.5 2.5-6.5h2.5zm21.5 0h2l2 10h-2.4l-.3-1.5h-3.2l-.5 1.5h-2.6l3.6-9.2c.2-.5.6-.8 1.1-.8h.3zm-1.3 6.5h2.1l-1.2-5.7-1 5.7z" fill="white"/></svg>
              <svg width="38" height="24" viewBox="0 0 38 24" fill="none"><rect width="38" height="24" rx="4" fill="#252525"/><circle cx="15" cy="12" r="7" fill="#EB001B"/><circle cx="23" cy="12" r="7" fill="#F79E1B"/><path d="M19 6.8a7 7 0 010 10.4 7 7 0 000-10.4z" fill="#FF5F00"/></svg>
              <div style={{ background: "#000", borderRadius: 4, padding: "3px 8px", display: "flex", alignItems: "center", gap: 3 }}><svg width="12" height="14" viewBox="0 0 12 14" fill="white"><path d="M10.1 4.7c-.1.1-1.7 1-1.7 3 0 2.3 2 3.1 2 3.1s-1.1 3.1-2.6 3.1c-.7 0-1.3-.5-2-.5-.8 0-1.5.5-2.1.5C2.3 14 0 10.8 0 8c0-2.8 1.7-4.2 3.3-4.2.8 0 1.4.5 1.9.5.5 0 1.2-.6 2.1-.6.6 0 2 .2 2.8 1zM7.6 2.3C8 1.8 8.3 1 8.3 0c0 0-1 0-2.1 1-.8.8-1.4 1.7-1.4 2.6 0 .1 1.2.1 2.1-.5.3-.3.5-.6.7-.8z"/></svg><span style={{ color: "#fff", fontSize: 10, fontWeight: 500 }}>Pay</span></div>
              <div style={{ background: "#fff", borderRadius: 4, padding: "3px 8px", display: "flex", alignItems: "center", gap: 2 }}><svg width="12" height="12" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 001 12c0 1.78.43 3.46 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.99 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg><span style={{ color: "#333", fontSize: 10, fontWeight: 600 }}>Pay</span></div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 20 }}>
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <rect x="3" y="6" width="8" height="6" rx="1.5" stroke={T.green} strokeWidth="1.2"/>
                <path d="M5 6V4.5a2 2 0 014 0V6" stroke={T.green} strokeWidth="1.2" strokeLinecap="round"/>
                <circle cx="7" cy="9.5" r="0.8" fill={T.green}/>
              </svg>
              <span style={{ fontSize: 12, color: T.green, fontWeight: 500 }}>Paiement 100% sécurisé par Stripe</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: 0.5 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1l2.5 5h5.5l-4.2 3.5 1.5 5.5L9 12l-5.3 3 1.5-5.5L1 6h5.5L9 1z" fill="#00B67A"/>
              </svg>
              <span style={{ fontSize: 11, color: T.textDim }}>Avis Trustpilot bientôt disponibles</span>
            </div>
          </Anim>
        </div>
      </div>
    </div>
  );

  // ═══════ FORMULAIRE ═══════
  if (page === "formulaire") return (
    <div style={wrap}><style>{globalCSS}</style>
      <Orb top="20%" left="-10%" color="#10b981" size={400} />
      {showPricing && <Pricing />}
      <div style={ctn}>
        <Nav />
        <Anim delay={50}>
          <h2 style={{ fontFamily: font, fontSize: 30, fontWeight: 400, color: T.text, marginBottom: 6 }}>Décrivez votre candidature</h2>
          <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 28 }}>Plus vous donnez de détails, plus la lettre sera précise.</p>
        </Anim>
        {error && <div style={{ background: T.accentSoft, border: `1px solid ${T.accentBorder}`, borderRadius: 10, padding: "12px 16px", marginBottom: 18, fontSize: 13, color: T.accent }}>{error}</div>}
        <Anim delay={100}>
          <Field label="Poste visé" req ph="Ex : Développeur web, Vendeuse, Infirmier..." val={form.poste} set={v => setForm({ ...form, poste: v })} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: -12, marginBottom: 18 }}>
            {JOBS.map((j, i) => <span key={i} onClick={() => setForm({ ...form, poste: j })} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 16, border: `1px solid ${T.border}`, color: T.textMuted, cursor: "pointer", transition: "all 0.15s" }} onMouseEnter={e => { e.target.style.borderColor = T.accent; e.target.style.color = T.accent; }} onMouseLeave={e => { e.target.style.borderColor = T.border; e.target.style.color = T.textMuted; }}>{j}</span>)}
          </div>
          <Field label="Entreprise" ph="Ex : Carrefour, BNP Paribas..." val={form.entreprise} set={v => setForm({ ...form, entreprise: v })} />
          <Field label="Expérience" area ph="Ex : 2 ans serveur, stage marketing, aucune..." val={form.experience} set={v => setForm({ ...form, experience: v })} />
          <Field label="Compétences" ph="Ex : organisation, anglais, Excel..." val={form.competences} set={v => setForm({ ...form, competences: v })} />
          <Field label="Formation" ph="Ex : BTS Commerce, Licence info, Bac pro..." val={form.formation} set={v => setForm({ ...form, formation: v })} />
        </Anim>

        <Anim delay={150}>
          <label style={{ fontSize: 11, fontWeight: 500, color: T.textMuted, marginBottom: 7, display: "block", letterSpacing: 1, textTransform: "uppercase" }}>Tonalité</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>
            {TONES.map(t => <div key={t.id} onClick={() => setForm({ ...form, tone: t.id })} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: form.tone === t.id ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`, background: form.tone === t.id ? T.accentSoft : "transparent", textAlign: "center", cursor: "pointer", transition: "all 0.15s" }}><span style={{ fontSize: 13, fontWeight: 500, color: form.tone === t.id ? T.accent : T.textMuted }}>{t.label}</span></div>)}
          </div>
        </Anim>

        <Anim delay={200}>
          <label style={{ fontSize: 11, fontWeight: 500, color: T.textMuted, marginBottom: 7, display: "block", letterSpacing: 1, textTransform: "uppercase" }}>Longueur de la lettre</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 22 }}>
            {SIZES.map(s => {
              const locked = !isPaid && !s.free;
              const sel = form.size === s.id;
              return (
                <div key={s.id} onClick={() => locked ? setShowPricing(true) : setForm({ ...form, size: s.id })} style={{ padding: "16px 18px", borderRadius: 12, border: sel ? `1.5px solid ${T.accent}` : s.recommended && !locked ? `1px solid ${T.blueBorder}` : `1px solid ${T.border}`, background: sel ? T.accentSoft : locked ? "rgba(255,255,255,0.01)" : T.surface, cursor: "pointer", opacity: locked ? 0.45 : 1, transition: "all 0.2s", position: "relative" }}>
                  {s.recommended && <div style={{ position: "absolute", top: -8, right: 16, fontSize: 10, fontWeight: 600, background: T.blue, color: "#fff", padding: "2px 10px", borderRadius: 10 }}>recommandé</div>}
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: sel ? T.accentSoft : T.surfaceLight, border: sel ? `1px solid ${T.accentBorder}` : `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, color: sel ? T.accent : T.textMuted, flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 14, fontWeight: 500, color: T.text }}>{s.label}</span>
                        <span style={{ fontSize: 11, color: T.textDim }}>{s.words}</span>
                        {locked && <span style={{ fontSize: 10, background: T.accent, color: "#fff", padding: "1px 7px", borderRadius: 8 }}>payant</span>}
                      </div>
                      <div style={{ fontSize: 12, color: s.recommended ? T.blue : T.textMuted, fontWeight: 500, marginBottom: s.examples ? 3 : 0 }}>{s.desc}</div>
                      {s.examples && <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.5 }}>Idéal : {s.examples}</div>}
                      {s.free && <div style={{ fontSize: 11, color: T.textDim, fontStyle: "italic" }}>Essai gratuit</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Anim>

        {needsUp() && <Anim delay={250}><div style={{ background: T.accentSoft, border: `1px solid ${T.accentBorder}`, borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 500, color: T.text, fontFamily: font, marginBottom: 4 }}>{freeUsed >= 2 && !isPaid ? "Tu as testé, tu as vu la qualité" : "Envie d'une lettre plus complète ?"}</div>
          <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6, marginBottom: 12 }}>{freeUsed >= 2 && !isPaid ? "Pour seulement 1€ par lettre, accède aux formats Standard et Détaillée." : "Les formats Standard et Détaillée sont 2 à 3x plus longs, avec des arguments développés. Dès 1€."}</div>
          <Btn onClick={() => setShowPricing(true)} style={{ padding: "10px 24px", fontSize: 13 }}>Voir les packs dès 1,99€</Btn>
        </div></Anim>}

        <Anim delay={300}><Btn onClick={generate} disabled={!canGen()} full style={{ padding: "16px 0", fontSize: 15 }}>{isPaid ? "Générer ma lettre (1 crédit)" : `Générer ma lettre gratuite (${2 - freeUsed}/2)`}</Btn></Anim>
        <div style={{ height: 48 }} />
      </div>
    </div>
  );

  // ═══════ LOADING ═══════
  if (page === "loading") return (
    <div style={wrap}><style>{globalCSS}</style>
      <Orb top="30%" left="40%" color="#10b981" size={500} />
      <div style={{ ...ctn, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "85vh", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${T.border}`, borderTopColor: T.accent, animation: "spin 0.8s linear infinite", marginBottom: 24 }} />
        <h2 style={{ fontFamily: font, fontSize: 24, fontWeight: 400, color: T.text, marginBottom: 8 }}>L'IA rédige votre lettre...</h2>
        <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 28 }}>{progress < 30 ? "Analyse du poste..." : progress < 60 ? "Rédaction personnalisée..." : progress < 90 ? "Structure MOI-VOUS-NOUS..." : "Finalisation..."}</p>
        <div style={{ width: 240, height: 3, background: T.surfaceLight, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${T.accent}, ${T.blue})`, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 11, color: T.textDim, marginTop: 8 }}>{Math.round(progress)}%</span>
      </div>
    </div>
  );

  // ═══════ RÉSULTAT ═══════
  if (page === "resultat") {
    const sz = SIZES.find(s => s.id === form.size);
    const wc = lettre.split(/\s+/).length;
    return (
      <div style={wrap}><style>{globalCSS}</style>
        <Orb top="-10%" left="70%" color="#2563eb" size={400} />
        {showPricing && <Pricing />}
        <div style={ctn}>
          <Nav />
          <Anim delay={50}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.greenSoft, border: "1px solid rgba(5,150,105,0.15)", padding: "6px 14px", borderRadius: 16, marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.green }} />
              <span style={{ fontSize: 12, fontWeight: 500, color: T.green }}>Lettre générée</span>
            </div>
          </Anim>
          <Anim delay={100}>
            <h2 style={{ fontFamily: font, fontSize: 26, fontWeight: 400, color: T.text, marginBottom: 4 }}>Votre lettre de motivation</h2>
            <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 8 }}><strong style={{ color: T.text }}>{form.poste}</strong>{form.entreprise && <> chez <strong style={{ color: T.text }}>{form.entreprise}</strong></>}</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: T.surfaceLight, border: `1px solid ${T.border}`, color: T.textMuted }}>{sz?.label}</span>
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: T.surfaceLight, border: `1px solid ${T.border}`, color: T.textMuted }}>{wc} mots</span>
            </div>
          </Anim>
          <Anim delay={200}>
            <div style={{ background: T.surface, border: `1px solid ${T.borderLight}`, borderRadius: 16, padding: "32px 28px", whiteSpace: "pre-wrap", lineHeight: 1.85, fontSize: 14, fontFamily: font, color: T.text, marginBottom: 18, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>{lettre}</div>
          </Anim>
          <Anim delay={300}>
            <div style={{ display: "flex", gap: 10 }}>
              <Btn onClick={copy} full style={{ background: copied ? T.green : undefined, boxShadow: copied ? "0 8px 32px rgba(5,150,105,0.25)" : undefined }}>{copied ? "Copié !" : "Copier la lettre"}</Btn>
              <Btn variant="secondary" onClick={() => { setPage("formulaire"); setLettre(""); }} full>Modifier</Btn>
            </div>
            <Btn variant="ghost" onClick={() => { setForm({ ...form, poste: "", entreprise: "" }); setLettre(""); setPage("formulaire"); }} full style={{ marginTop: 6 }}>Nouvelle lettre</Btn>
          </Anim>
          {((!isPaid && freeUsed >= 2) || (isPaid && credits === 0)) && <Anim delay={400}><div style={{ background: T.accentSoft, border: `1px solid ${T.accentBorder}`, borderRadius: 14, padding: "18px 20px", marginTop: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 500, color: T.text, fontFamily: font, marginBottom: 4 }}>Plus de crédits</div>
            <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6, marginBottom: 12 }}>Des lettres Standard et Détaillée dès 1€ par lettre.</div>
            <Btn onClick={() => setShowPricing(true)} style={{ padding: "10px 24px", fontSize: 13 }}>Voir les packs</Btn>
          </div></Anim>}
          {isPaid && credits > 0 && <Anim delay={400}><div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 18px", marginTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: T.textMuted }}>Crédits restants</span>
            <span style={{ fontSize: 16, fontWeight: 600, color: T.blue }}>{credits}</span>
          </div></Anim>}
          <div style={{ height: 48 }} />
        </div>
      </div>
    );
  }
  return null;
}
