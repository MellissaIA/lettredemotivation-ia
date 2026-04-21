import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Générez votre lettre de motivation personnalisée en 30 secondes grâce à l'intelligence artificielle. Optimisée pour les filtres ATS des recruteurs. 2 essais gratuits." />
        <meta name="keywords" content="lettre de motivation, générateur, IA, intelligence artificielle, candidature, emploi, CV, ATS, filtres recruteurs" />
        <meta property="og:title" content="Lettre de Motivation IA | Générateur optimisé ATS" />
        <meta property="og:description" content="Une lettre de motivation qui triple vos chances d'entretien. Optimisée pour franchir les filtres ATS." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lettredemotivation-ia.fr" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6350956271405403" crossOrigin="anonymous"></script>
        
        {/* Google Tag Manager */}
        <script>
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WQRFG7BD');
          `}
        </script>
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WQRFG7BD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
