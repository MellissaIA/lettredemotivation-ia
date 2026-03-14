import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content="Generez votre lettre de motivation personnalisee en 30 secondes grace a l intelligence artificielle. Normes francaises, 3 formats, 2 essais gratuits." />
        <meta name="keywords" content="lettre de motivation, generateur, IA, intelligence artificielle, candidature, emploi, CV" />
        <meta property="og:title" content="Lettre de Motivation - IA | Generateur intelligent" />
        <meta property="og:description" content="Votre lettre de motivation parfaite en 30 secondes grace a l IA." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lettredemotivation-ia.fr" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
