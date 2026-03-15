import { useState, useEffect, useCallback } from "react";

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

const sans = `'Montserrat', system-ui, sans-serif`;
const T = {
  bg: "#ffffff", surface: "#ffffff", surfaceLight: "#f5f7fa", accent: "#059669",
  accentSoft: "rgba(5,150,105,0.07)", accentBorder: "rgba(5,150,105,0.18)",
  text: "#1e293b", textMuted: "#64748b", textDim: "#94a3b8", border: "rgba(0,0,0,0.06)",
  borderLight: "rgba(0,0,0,0.08)",
  green: "#059669", greenSoft: "rgba(5,150,105,0.07)",
  blue: "#2563eb", blueSoft: "rgba(37,99,235,0.06)", blueBorder: "rgba(37,99,235,0.12)",
  emerald: "#10b981", emeraldDark: "#047857",
  red: "#dc2626",
};
const globalCSS = `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}::selection{background:rgba(5,150,105,.15);color:#1e293b}*{box-sizing:border-box}`;
const ctn = { maxWidth: 720, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 };

const Anim = ({ children, delay = 0, y = 24 }) => {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <div style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)`, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Field = ({ label: l, ph, val, set, area, req }) => (
  <div style={{ marginBottom: 18 }}>
    <label style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, marginBottom: 7, display: "block", letterSpacing: 1, textTransform: "uppercase", fontFamily: sans }}>{l}{req && <span style={{ color: T.accent }}> *</span>}</label>
    {area
      ? <textarea placeholder={ph} value={val} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "13px 16px", fontSize: 14, fontFamily: sans, border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface, color: T.text, outline: "none", resize: "vertical", minHeight: 80, transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
      : <input placeholder={ph} value={val} onChange={e => set(e.target.value)} style={{ width: "100%", padding: "13px 16px", fontSize: 14, fontFamily: sans, border: `1px solid ${T.border}`, borderRadius: 10, background: T.surface, color: T.text, outline: "none", transition: "border-color 0.2s" }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} />
    }
  </div>
);

const Footer = () => (
  <div style={{ padding: "20px 24px", textAlign: "center", borderTop: `1px solid ${T.border}` }}>
    <p style={{ fontSize: 12, color: T.textMuted, marginBottom: 8, fontFamily: sans, fontWeight: 500 }}>
      Postulez sur : <a href="https://www.indeed.fr" target="_blank" rel="noopener noreferrer" style={{ color: T.blue, textDecoration: "none", fontWeight: 600 }}>Indeed</a> · <a href="https://www.hellowork.com" target="_blank" rel="noopener noreferrer" style={{ color: T.blue, textDecoration: "none", fontWeight: 600 }}>HelloWork</a> · <a href="https://www.linkedin.com/jobs" target="_blank" rel="noopener noreferrer" style={{ color: T.blue, textDecoration: "none", fontWeight: 600 }}>LinkedIn</a> · <a href="https://www.francetravail.fr" target="_blank" rel="noopener noreferrer" style={{ color: T.blue, textDecoration: "none", fontWeight: 600 }}>Pôle Emploi</a>
    </p>
    <p style={{ fontSize: 11, color: T.textDim, fontFamily: sans, fontWeight: 500 }}>
      <a href="#" style={{ color: T.textDim, textDecoration: "none" }}>Mentions légales</a> · <a href="#" style={{ color: T.textDim, textDecoration: "none" }}>CGV</a> · <a href="#" style={{ color: T.textDim, textDecoration: "none" }}>Contact</a>
    </p>
  </div>
);

const AdSpace = () => (
  <div style={{ padding: "16px 24px", textAlign: "center" }}>
    <div style={{ border: `1.5px dashed ${T.textDim}`, borderRadius: 8, padding: 14, color: T.textDim, fontSize: 11, fontFamily: sans, fontWeight: 500, opacity: 0.5 }}>Espace publicitaire</div>
  </div>
);

export default function LettreIA() {
  const [page, setPage] = useState("accueil");
  const [credits, setCredits] = useState(0);
  const [freeUsed, setFreeUsed] = useState(0);
  const [freeTotal] = useState(2);
  const [isPaid, setIsPaid] = useState(false);
  const [form, setForm] = useState({ poste: "", entreprise: "", experience: "", competences: "", formation: "", tone: "professionnel", size: "courte" });
  const [lettre, setLettre] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [showPricing, setShowPricing] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCollected, setEmailCollected] = useState(false);

  useEffect(() => { const params = new URLSearchParams(window.location.search); if (params.get("success") === "true") { const c = parseInt(params.get("credits") || "0"); if (c > 0) { setCredits(prev => prev + c); setIsPaid(true); } window.history.replaceState({}, "", "/"); } }, []);
  useEffect(() => { if (!loading) return; const i = setInterval(() => setProgress(p => Math.min(p + Math.random() * 11, 93)), 500); return () => clearInterval(i); }, [loading]);
  useEffect(() => { const saved = localStorage.getItem("emailCollected"); if (saved === "true") setEmailCollected(true); const savedFree = localStorage.getItem("freeUsed"); if (savedFree) setFreeUsed(parseInt(savedFree)); const savedCredits = localStorage.getItem("credits"); if (savedCredits) { setCredits(parseInt(savedCredits)); setIsPaid(parseInt(savedCredits) > 0); } }, []);
  useEffect(() => { localStorage.setItem("freeUsed", freeUsed.toString()); }, [freeUsed]);
  useEffect(() => { localStorage.setItem("credits", credits.toString()); }, [credits]);

  const canGen = useCallback(() => {
    if (!form.poste.trim()) return false;
    if (isPaid && credits > 0) return true;
    if (!isPaid && freeUsed < freeTotal) return form.size === "courte";
    return false;
  }, [form.poste, form.size, isPaid, credits, freeUsed, freeTotal]);

  const needsUp = useCallback(() => {
    if (isPaid && credits > 0) return false;
    if (!isPaid && freeUsed >= freeTotal) return true;
    if (!isPaid && form.size !== "courte") return true;
    return false;
  }, [isPaid, credits, freeUsed, freeTotal, form.size]);

  const generate = async () => {
    if (!canGen()) return;
    if (!emailCollected && !isPaid) { setPage("email"); return; }
    startGeneration();
  };

  const startGeneration = async () => {
    setPage("loading"); setLoading(true); setProgress(0); setError("");
    const sz = SIZES.find(s => s.id === form.size);
    const prompt = `Tu es un expert en lettres de motivation en français. Normes françaises strictes.\n\nGénère une lettre de motivation avec :\n- Poste : ${form.poste}\n- Entreprise : ${form.entreprise || "non précisée"}\n- Expérience : ${form.experience || "Pas d'expérience spécifique"}\n- Compétences : ${form.competences || "Non précisées"}\n- Formation : ${form.formation || "Non précisée"}\n- Tonalité : ${form.tone}\n- Longueur : ${sz.words}\n\nRègles : structure française (coordonnées fictives, objet, MOI-VOUS-NOUS, politesse formelle), ${sz.words} MAX, personnalisé, verbes d'action, pas de crochets. Écris UNIQUEMENT la lettre.`;
    try {
      const res = await fetch("/api/generate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prompt, maxTokens: sz.maxTokens }) });
      const data = await res.json();
      if (data.text) {
        setLettre(data.text); setProgress(100);
        if (isPaid) setCredits(c => c - 1); else setFreeUsed(n => n + 1);
        setTimeout(() => { setPage("resultat"); setLoading(false); }, 500);
      } else { setError("Erreur. Réessayez."); setPage("formulaire"); setLoading(false); }
    } catch { setError("Erreur de connexion."); setPage("formulaire"); setLoading(false); }
  };

  const submitEmail = () => {
    if (!email.includes("@")) return;
    setEmailCollected(true);
    localStorage.setItem("emailCollected", "true");
    startGeneration();
  };

  const buyPack = async (p) => { try { const res = await fetch("/api/create-checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ packId: p.id, credits: p.credits, price: p.price }) }); const data = await res.json(); if (data.url) window.location.href = data.url; } catch { alert("Erreur de paiement, réessayez."); } };
  const copy = () => { navigator.clipboard.writeText(lettre); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const resetAll = () => { setForm({ poste: "", entreprise: "", experience: "", competences: "", formation: "", tone: "professionnel", size: "courte" }); setLettre(""); setPage("accueil"); };

  const SiteName = () => (
    <div onClick={resetAll} style={{ cursor: "pointer", transition: "all 0.3s" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.querySelector(".sn").style.background = "linear-gradient(135deg, #059669, #2563eb)"; e.currentTarget.querySelector(".sn").style.WebkitBackgroundClip = "text"; e.currentTarget.querySelector(".sn").style.WebkitTextFillColor = "transparent"; e.currentTarget.querySelector(".ul").style.width = "100%"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.querySelector(".sn").style.background = "none"; e.currentTarget.querySelector(".sn").style.WebkitTextFillColor = "initial"; e.currentTarget.querySelector(".sn").style.color = T.text; e.currentTarget.querySelector(".ul").style.width = "0%"; }}>
      <span className="sn" style={{ fontSize: 15, fontWeight: 700, fontFamily: sans, color: T.text, transition: "all 0.3s" }}>
        lettredemotivation-<span style={{ background: "linear-gradient(135deg, #059669, #2563eb)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ia.fr</span>
      </span>
      <div className="ul" style={{ height: 2, background: "linear-gradient(135deg, #059669, #2563eb)", borderRadius: 1, width: "0%", transition: "width 0.3s", marginTop: 2 }} />
    </div>
  );

  const Badge = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, background: T.blueSoft, border: `1px solid ${T.blueBorder}`, padding: "5px 10px", borderRadius: 12, fontFamily: sans }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: T.blue }}>{credits} crédit{credits !== 1 ? "s" : ""}</span>
        <div onClick={() => setShowPricing(true)} style={{ width: 18, height: 18, borderRadius: "50%", background: T.blue, color: "#fff", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={e => e.target.style.transform = "scale(1.15)"} onMouseLeave={e => e.target.style.transform = "scale(1)"}>+</div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: T.accent, background: T.accentSoft, border: `1px solid ${T.accentBorder}`, padding: "5px 10px", borderRadius: 12, fontFamily: sans }}>{freeTotal - freeUsed} essai{freeTotal - freeUsed !== 1 ? "s" : ""} gratuit{freeTotal - freeUsed !== 1 ? "s" : ""}</div>
    </div>
  );

  const Nav = () => <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0" }}><SiteName /><Badge /></div>;

  const Btn = ({ children, onClick, disabled, variant = "primary", full, style: s }) => {
    const base = { fontFamily: sans, fontSize: 13, fontWeight: 600, borderRadius: 10, cursor: disabled ? "not-allowed" : "pointer", transition: "all 0.2s", border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center", width: full ? "100%" : "auto" };
    const v = {
      primary: { ...base, background: `linear-gradient(135deg, ${T.accent}, ${T.blue})`, color: "#fff", padding: "14px 28px", boxShadow: "0 8px 32px rgba(5,150,105,0.2)", opacity: disabled ? 0.4 : 1 },
      secondary: { ...base, background: T.surfaceLight, color: T.text, padding: "14px 28px", border: `1px solid ${T.borderLight}` },
      ghost: { ...base, background: "transparent", color: T.textMuted, padding: "12px 24px" },
    };
    return <button onClick={onClick} disabled={disabled} style={{ ...v[variant], ...s }}
      onMouseEnter={e => { if (!disabled) e.target.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.target.style.transform = "none"; }}>{children}</button>;
  };

  const IconCard = ({ icon, label, labelColor, desc, bg, border }) => (
    <div style={{ flex: 1, textAlign: "center", padding: "16px 10px", borderRadius: 12, background: bg, border: `0.5px solid ${border}`, transition: "all 0.3s", cursor: "default" }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, border: `0.5px solid ${border}`, margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
      <p style={{ fontSize: 12, fontWeight: 700, color: labelColor, margin: "0 0 4px", fontFamily: sans }}>{label}</p>
      <p style={{ fontSize: 10, color: T.textMuted, margin: 0, lineHeight: 1.6, fontFamily: sans, fontWeight: 500 }}>{desc}</p>
    </div>
  );

  const Pricing = () => (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }} onClick={() => setShowPricing(false)}>
      <div style={{ background: T.surface, borderRadius: 16, padding: "28px 24px", maxWidth: 380, width: "100%", border: `0.5px solid ${T.borderLight}`, boxShadow: "0 24px 80px rgba(0,0,0,0.15)", fontFamily: sans }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: T.text }}>Rechargez vos crédits</span>
          <div onClick={() => setShowPricing(false)} style={{ width: 28, height: 28, borderRadius: 8, background: T.surfaceLight, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: T.textMuted, fontSize: 14, fontWeight: 500 }}>✕</div>
        </div>
        <p style={{ fontSize: 11, color: T.textMuted, marginBottom: 20, fontWeight: 500 }}>1 crédit = 1 lettre de motivation générée par l'IA</p>
        {PACKS.map(p => (
          <div key={p.id} onClick={() => buyPack(p)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderRadius: 10, marginBottom: 10, background: p.best ? "rgba(5,150,105,0.03)" : T.surfaceLight, border: p.best ? `2px solid ${T.accent}` : `0.5px solid ${T.border}`, cursor: "pointer", transition: "all 0.2s", position: "relative" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = "rgba(5,150,105,0.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; if (!p.best) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.surfaceLight; } }}>
            {p.best && <div style={{ position: "absolute", top: -8, right: 12, background: `linear-gradient(135deg, ${T.accent}, ${T.blue})`, color: "#fff", fontSize: 8, fontWeight: 700, padding: "2px 8px", borderRadius: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Populaire</div>}
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{p.credits} crédit{p.credits > 1 ? "s" : ""}</div>
              <div style={{ fontSize: 9, color: T.textMuted, marginTop: 2, fontWeight: 500 }}>{p.sub}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 800, color: T.accent }}>{p.price}€</div>
              <div style={{ fontSize: 9, color: T.textDim, fontWeight: 500 }}>{p.unit}€ / lettre</div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 16, paddingTop: 14, borderTop: `0.5px solid ${T.border}` }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="3" y="6" width="8" height="6" rx="1.5" stroke={T.green} strokeWidth="1.1"/><path d="M5 6V4.5a2 2 0 014 0V6" stroke={T.green} strokeWidth="1.1" strokeLinecap="round"/><circle cx="7" cy="9.5" r="0.8" fill={T.green}/></svg>
          <span style={{ fontSize: 10, fontWeight: 600, color: T.green }}>Paiement sécurisé par Stripe</span>
        </div>
      </div>
    </div>
  );

  // ═══════ COLLECTE EMAIL ═══════
  if (page === "email") return (
    <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
      <style>{globalCSS}</style>
      <div style={ctn}><Nav /></div>
      <div style={{ padding: "48px 24px", textAlign: "center", background: "rgba(5,150,105,0.02)" }}>
        <Anim>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 6 }}>Entrez votre email pour recevoir votre lettre de motivation gratuite</h2>
          <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 20, fontWeight: 500 }}>Nous vous enverrons aussi des conseils pour décrocher plus d'entretiens.</p>
          <div style={{ display: "flex", gap: 8, maxWidth: 380, margin: "0 auto" }}>
            <input type="email" placeholder="votre@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex: 1, padding: "12px 16px", borderRadius: 8, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: sans, outline: "none", color: T.text }} onFocus={e => e.target.style.borderColor = T.accent} onBlur={e => e.target.style.borderColor = T.border} onKeyDown={e => e.key === "Enter" && submitEmail()} />
            <Btn onClick={submitEmail}>Continuer</Btn>
          </div>
        </Anim>
      </div>
      <AdSpace />
      <Footer />
    </div>
  );

  // ═══════ ACCUEIL ═══════
  if (page === "accueil") return (
    <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
      <style>{globalCSS}</style>
      {showPricing && <Pricing />}
      <div style={ctn}><Anim><Nav /></Anim></div>

      {/* HERO */}
      <div style={{ background: "linear-gradient(135deg, rgba(5,150,105,0.05), rgba(37,99,235,0.05))" }}>
        <div style={{ ...ctn, padding: "36px 24px", display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap" }}>
          <Anim delay={100}>
            <div style={{ flex: "1 1 340px" }}>
              <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.15, color: T.text, marginBottom: 16 }}>
                Une lettre de motivation qui <span style={{ color: T.accent }}>triple vos chances</span> d'entretien.
              </h1>
              <p style={{ fontSize: 15, fontWeight: 600, color: T.text, marginBottom: 10 }}>Vous postulez, mais personne ne vous rappelle ?</p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: T.textMuted, fontWeight: 500, marginBottom: 8 }}>
                Ce n'est pas votre faute. Les filtres ATS des recruteurs <span style={{ color: T.red, fontWeight: 700 }}>éliminent 75% des candidatures</span> avant qu'un humain ne les voie. Votre lettre de motivation n'arrive jamais sur le bureau du recruteur.
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.9, color: T.textMuted, fontWeight: 500, marginBottom: 16 }}>
                Notre IA crée une lettre de motivation <span style={{ color: T.accent, fontWeight: 700 }}>personnalisée à votre profil</span> et <span style={{ color: T.blue, fontWeight: 700 }}>optimisée pour franchir les filtres ATS</span>. En 30 secondes, votre candidature passe enfin entre les mailles du filet.
              </p>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 16px", background: "rgba(255,255,255,0.6)", borderRadius: 8, border: "0.5px solid rgba(5,150,105,0.15)" }}>
                <span style={{ color: T.accent, fontSize: 16 }}>★</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.accent }}>2 essais gratuits, aucune carte bancaire requise.</span>
              </div>
            </div>
          </Anim>
          <Anim delay={300}>
            <div style={{ flex: "0 1 260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ background: T.bg, borderRadius: 10, padding: "20px 18px", border: `0.5px solid ${T.border}`, width: "100%", transform: "rotate(-1.5deg)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.accent }} />
                  <span style={{ fontSize: 9, fontWeight: 700, color: T.accent, textTransform: "uppercase", letterSpacing: 1 }}>Lettre de motivation IA</span>
                </div>
                <p style={{ fontSize: 11, fontWeight: 500, color: T.textMuted, marginBottom: 8 }}>Madame, Monsieur,</p>
                {[95, 88, 92, 78, 85, 70, 82, 90, 68].map((w, i) => (
                  <div key={i} style={{ height: 3, background: i === 2 ? "rgba(5,150,105,0.3)" : i === 5 ? "rgba(37,99,235,0.3)" : T.border, borderRadius: 2, margin: "5px 0", width: `${w}%` }} />
                ))}
                <p style={{ fontSize: 9, color: T.textDim, marginTop: 10 }}>Cordialement,</p>
                <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
                  <svg width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="none" stroke={T.accent} strokeWidth="1"/><path d="M4 6l1.5 1.5L8 5" stroke={T.accent} strokeWidth="1" fill="none" strokeLinecap="round"/></svg>
                  <span style={{ fontSize: 8, color: T.accent, fontWeight: 700 }}>Optimisée ATS</span>
                </div>
              </div>
            </div>
          </Anim>
        </div>
      </div>

      {/* 3 ICÔNES */}
      <div style={{ ...ctn, padding: "28px 24px" }}>
        <Anim delay={400}>
          <div style={{ display: "flex", gap: 12 }}>
            <IconCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7.5" r="3.5" stroke={T.accent} strokeWidth="1.4"/><path d="M4 16.5c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={T.accent} strokeWidth="1.4" strokeLinecap="round"/></svg>}
              label="Personnalisée" labelColor={T.accent}
              desc="L'IA s'adapte à votre parcours, vos compétences et le poste visé pour rédiger une lettre de motivation unique."
              bg="rgba(5,150,105,0.03)" border="rgba(5,150,105,0.1)"
            />
            <IconCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="3" stroke={T.blue} strokeWidth="1.4"/><path d="M7 10.5l2 2L13 8" stroke={T.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              label="Optimisée ATS" labelColor={T.blue}
              desc="Conçue pour passer les filtres des recruteurs qui bloquent la plupart des CV."
              bg="rgba(37,99,235,0.03)" border="rgba(37,99,235,0.08)"
            />
            <IconCard
              icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke={T.accent} strokeWidth="1.4"/><path d="M10 6v5l3 2" stroke={T.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              label="30 secondes" labelColor={T.accent}
              desc="Votre lettre de motivation est prête, il ne reste plus qu'à l'envoyer."
              bg="rgba(5,150,105,0.03)" border="rgba(5,150,105,0.1)"
            />
          </div>
        </Anim>
      </div>

      {/* CTA VERT */}
      <Anim delay={500}>
        <div style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.emeraldDark}, #0f766e)`, padding: "36px 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 1, marginBottom: 8 }}>Prêt à décrocher votre entretien ?</h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 16, fontWeight: 500 }}>Votre prochaine lettre de motivation pourrait être la bonne. Rejoignez les candidats qui utilisent l'IA.</p>
          <button onClick={() => setPage("formulaire")} style={{ display: "inline-block", padding: "12px 28px", borderRadius: 10, background: "#fff", color: T.accent, fontSize: 14, fontWeight: 700, border: "none", cursor: "pointer", fontFamily: sans, transition: "all 0.2s" }}
            onMouseEnter={e => e.target.style.transform = "translateY(-2px)"} onMouseLeave={e => e.target.style.transform = "none"}>
            Créer ma lettre de motivation maintenant
          </button>
        </div>
      </Anim>

      <AdSpace />
      <Footer />
    </div>
  );

  // ═══════ FORMULAIRE ═══════
  if (page === "formulaire") return (
    <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
      <style>{globalCSS}</style>
      {showPricing && <Pricing />}
      <div style={ctn}>
        <Nav />
        {error && <Anim><div style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)", borderRadius: 10, padding: "12px 16px", marginBottom: 16, fontSize: 13, color: T.red, fontWeight: 500 }}>{error}</div></Anim>}
        <Anim>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: T.text, marginBottom: 4 }}>Créez votre lettre de motivation</h2>
          <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 24, fontWeight: 500 }}>Remplissez les champs ci-dessous. Seul le poste est obligatoire.</p>
        </Anim>

        <Anim delay={100}>
          <Field label="Poste visé" req ph="Ex : Développeur web, Vendeuse, Infirmier..." val={form.poste} set={v => setForm({ ...form, poste: v })} />
        </Anim>
        <Anim delay={150}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <Field label="Entreprise" ph="Ex : Carrefour, BNP Paribas..." val={form.entreprise} set={v => setForm({ ...form, entreprise: v })} />
            <Field label="Formation" ph="Ex : BTS Commerce, Licence info..." val={form.formation} set={v => setForm({ ...form, formation: v })} />
          </div>
        </Anim>
        <Anim delay={200}>
          <Field label="Expérience" area ph="Ex : 2 ans serveur, stage marketing, aucune..." val={form.experience} set={v => setForm({ ...form, experience: v })} />
          <Field label="Compétences" ph="Ex : organisation, anglais, Excel..." val={form.competences} set={v => setForm({ ...form, competences: v })} />
        </Anim>

        {/* TONALITÉ */}
        <Anim delay={250}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, marginBottom: 8, display: "block", letterSpacing: 1, textTransform: "uppercase" }}>Tonalité</label>
            <div style={{ display: "flex", gap: 8 }}>
              {TONES.map(t => (
                <div key={t.id} onClick={() => setForm({ ...form, tone: t.id })} style={{ flex: 1, textAlign: "center", padding: "10px 8px", borderRadius: 10, border: form.tone === t.id ? `1.5px solid ${T.accent}` : `1px solid ${T.border}`, background: form.tone === t.id ? T.accentSoft : T.surface, cursor: "pointer", fontSize: 12, fontWeight: 600, color: form.tone === t.id ? T.accent : T.textMuted, transition: "all 0.2s" }}>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </Anim>

        {/* FORMAT */}
        <Anim delay={300}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: T.textMuted, marginBottom: 8, display: "block", letterSpacing: 1, textTransform: "uppercase" }}>Format</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {SIZES.map(s => {
                const sel = form.size === s.id;
                const locked = !s.free && !isPaid;
                return (
                  <div key={s.id} onClick={() => locked ? setShowPricing(true) : setForm({ ...form, size: s.id })} style={{ padding: "16px 18px", borderRadius: 12, border: sel ? `1.5px solid ${T.accent}` : s.recommended && !locked ? `1px solid ${T.blueBorder}` : `1px solid ${T.border}`, background: sel ? T.accentSoft : locked ? "rgba(255,255,255,0.01)" : T.surface, cursor: "pointer", opacity: locked ? 0.45 : 1, transition: "all 0.2s", position: "relative" }}>
                    {s.recommended && <div style={{ position: "absolute", top: -8, right: 16, fontSize: 9, fontWeight: 700, background: T.blue, color: "#fff", padding: "2px 10px", borderRadius: 10 }}>recommandé</div>}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: sel ? T.accentSoft : T.surfaceLight, border: sel ? `1px solid ${T.accentBorder}` : `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: sel ? T.accent : T.textMuted, flexShrink: 0 }}>{s.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                          <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{s.label}</span>
                          <span style={{ fontSize: 11, color: T.textDim, fontWeight: 500 }}>{s.words}</span>
                          {locked && <span style={{ fontSize: 9, background: T.accent, color: "#fff", padding: "1px 7px", borderRadius: 8, fontWeight: 600 }}>payant</span>}
                        </div>
                        <div style={{ fontSize: 12, color: s.recommended ? T.blue : T.textMuted, fontWeight: 500 }}>{s.desc}</div>
                        {s.examples && <div style={{ fontSize: 11, color: T.textDim, lineHeight: 1.5, fontWeight: 500, marginTop: 2 }}>Idéal : {s.examples}</div>}
                        {s.free && <div style={{ fontSize: 11, color: T.textDim, fontStyle: "italic", fontWeight: 500 }}>Essai gratuit</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Anim>

        {needsUp() && <Anim delay={350}><div style={{ background: T.accentSoft, border: `1px solid ${T.accentBorder}`, borderRadius: 14, padding: "18px 20px", marginBottom: 20 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>{freeUsed >= freeTotal && !isPaid ? "Vous avez testé, vous avez vu la qualité" : "Envie d'une lettre de motivation plus complète ?"}</div>
          <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>{freeUsed >= freeTotal && !isPaid ? "Pour seulement 1€ par lettre de motivation, accédez aux formats Standard et Détaillée." : "Les formats Standard et Détaillée sont 2 à 3x plus longs, avec des arguments développés. Dès 1€."}</div>
          <Btn onClick={() => setShowPricing(true)} style={{ padding: "10px 24px", fontSize: 13 }}>Voir les packs dès 1,99€</Btn>
        </div></Anim>}

        <Anim delay={400}><Btn onClick={generate} disabled={!canGen()} full style={{ padding: "16px 0", fontSize: 15 }}>{isPaid ? "Générer ma lettre de motivation (1 crédit)" : `Générer ma lettre de motivation gratuite (${freeTotal - freeUsed}/${freeTotal})`}</Btn></Anim>
        <div style={{ height: 48 }} />
      </div>
    </div>
  );

  // ═══════ LOADING ═══════
  if (page === "loading") return (
    <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
      <style>{globalCSS}</style>
      <div style={{ ...ctn, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "85vh", textAlign: "center" }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", border: `2px solid ${T.border}`, borderTopColor: T.accent, animation: "spin 0.8s linear infinite", marginBottom: 24 }} />
        <h2 style={{ fontSize: 22, fontWeight: 700, color: T.text, marginBottom: 8 }}>L'IA rédige votre lettre de motivation...</h2>
        <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 28, fontWeight: 500 }}>{progress < 30 ? "Analyse du poste..." : progress < 60 ? "Rédaction personnalisée..." : progress < 90 ? "Structure MOI-VOUS-NOUS..." : "Finalisation..."}</p>
        <div style={{ width: 240, height: 3, background: T.surfaceLight, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ width: `${progress}%`, height: "100%", background: `linear-gradient(90deg, ${T.accent}, ${T.blue})`, borderRadius: 2, transition: "width 0.3s" }} />
        </div>
        <span style={{ fontSize: 11, color: T.textDim, marginTop: 8, fontWeight: 500 }}>{Math.round(progress)}%</span>
      </div>
    </div>
  );

  // ═══════ RÉSULTAT ═══════
  if (page === "resultat") {
    const sz = SIZES.find(s => s.id === form.size);
    const wc = lettre.split(/\s+/).length;
    const shareText = encodeURIComponent("Je viens de générer ma lettre de motivation avec l'IA en 30 secondes ! Essayez : lettredemotivation-ia.fr");
    return (
      <div style={{ fontFamily: sans, color: T.text, minHeight: "100vh", background: T.bg }}>
        <style>{globalCSS}</style>
        {showPricing && <Pricing />}
        <div style={ctn}>
          <Nav />
          <Anim delay={50}>
            <p style={{ fontSize: 16, fontWeight: 700, color: T.accent, marginBottom: 4 }}>Votre lettre de motivation est prête !</p>
            <p style={{ fontSize: 12, color: T.textDim, fontWeight: 500 }}><strong style={{ color: T.text }}>{form.poste}</strong>{form.entreprise && <> chez <strong style={{ color: T.text }}>{form.entreprise}</strong></>} · {sz?.label} · {wc} mots</p>
          </Anim>
          <Anim delay={150}>
            <div style={{ background: T.surfaceLight, border: `1px solid ${T.border}`, borderRadius: 12, padding: "28px 24px", whiteSpace: "pre-wrap", lineHeight: 1.85, fontSize: 14, color: T.text, marginTop: 16, marginBottom: 16 }}>{lettre}</div>
          </Anim>
          <Anim delay={250}>
            <div style={{ display: "flex", gap: 8 }}>
              <Btn onClick={copy} full>{copied ? "Copié !" : "Copier la lettre de motivation"}</Btn>
              <Btn variant="secondary" onClick={() => { setForm({ ...form, poste: "", entreprise: "" }); setLettre(""); setPage("formulaire"); }} full>Nouvelle lettre de motivation</Btn>
            </div>
          </Anim>

          {/* PARTAGE */}
          <Anim delay={350}>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${T.border}` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, marginBottom: 10 }}>Partagez avec vos contacts</p>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=https://lettredemotivation-ia.fr`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `0.5px solid ${T.border}`, background: T.bg, color: T.textMuted, fontSize: 12, fontWeight: 500, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#0A66C2"} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                  <svg width="14" height="14" viewBox="0 0 14 14"><rect x="1" y="1" width="12" height="12" rx="2.5" stroke="#0A66C2" strokeWidth="1" fill="none"/><path d="M5 6v3.5M5 4.2v.01M7 9.5V7.2c0-1 .8-1.8 1.8-1.8s1.7.8 1.7 1.8V9.5" stroke="#0A66C2" strokeWidth="1" strokeLinecap="round"/></svg>
                  LinkedIn
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: `0.5px solid ${T.border}`, background: T.bg, color: T.textMuted, fontSize: 12, fontWeight: 500, textDecoration: "none", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = T.text} onMouseLeave={e => e.currentTarget.style.borderColor = T.border}>
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 2l4.5 5L2 12.5h1l3.8-4.2L10 12.5h3L8.3 7l4.5-5h-1L7.8 6.3 5 2H2z" fill={T.text}/></svg>
                  Twitter/X
                </a>
              </div>
            </div>
          </Anim>

          {/* AFFILIATION */}
          <Anim delay={400}>
            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${T.border}` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: T.textMuted, marginBottom: 10 }}>Votre lettre de motivation est prête, maintenant postulez !</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[{ name: "Indeed", url: "https://www.indeed.fr" }, { name: "HelloWork", url: "https://www.hellowork.com" }, { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs" }, { name: "Pôle Emploi", url: "https://www.francetravail.fr" }].map(s => (
                  <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: T.blueSoft, border: `0.5px solid ${T.blueBorder}`, color: T.blue, textDecoration: "none", transition: "all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </Anim>

          {/* UPSELL */}
          {((!isPaid && freeUsed >= freeTotal) || (isPaid && credits === 0)) && <Anim delay={450}><div style={{ background: T.accentSoft, border: `1px solid ${T.accentBorder}`, borderRadius: 14, padding: "18px 20px", marginTop: 24 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.text, marginBottom: 4 }}>Plus de crédits</div>
            <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.6, marginBottom: 12, fontWeight: 500 }}>Des lettres de motivation Standard et Détaillée dès 1€ par lettre.</div>
            <Btn onClick={() => setShowPricing(true)} style={{ padding: "10px 24px", fontSize: 13 }}>Voir les packs</Btn>
          </div></Anim>}

          <div style={{ height: 20 }} />
        </div>
        <AdSpace />
        <Footer />
      </div>
    );
  }
  return null;
}
