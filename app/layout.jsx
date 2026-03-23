import './globals.css';
import { Cormorant_Garamond, Lora } from 'next/font/google';

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
});

const bodyFont = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});

export const metadata = {
  title: 'Don Cornelius B | Immersive Portfolio',
  description: 'Creative technologist portfolio showcasing cloud-native systems with an immersive luxury-forward interface.',
  metadataBase: new URL('https://don-cornelius-b.github.io'),
  openGraph: {
    title: 'Don Cornelius B | Immersive Portfolio',
    description:
      'Portfolio featuring modern motion design, engineering projects, and deployment-ready workflows built with Next.js.',
    url: 'https://don-cornelius-b.github.io',
    siteName: 'Don Cornelius B Portfolio',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}