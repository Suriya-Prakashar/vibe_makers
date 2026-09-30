import "./globals.css";

export const metadata = {
  title: "Vibe Makers | We Create. You Celebrate",
  description: "Vibe Makers is an event production and décor company creating visually impressive, well-executed celebrations.",
  icons: {
    icon: "/images/logo-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:wght@400;700&family=Alegreya+Sans:ital,wght@0,300;0,400;0,500;0,700;0,900&family=Aleo:wght@500&family=Alex+Brush&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
