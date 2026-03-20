import './globals.css';

export const metadata = {
  title: 'Don Cornelius B | Modern Pro Portfolio',
  description: 'Creative technologist portfolio showcasing software systems, immersive products, and automation-first engineering.',
  metadataBase: new URL('https://don-cornelius-b.github.io'),
  openGraph: {
    title: 'Don Cornelius B | Modern Pro Portfolio',
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
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <div aria-hidden="true" className="stars stars--far" />
        <div aria-hidden="true" className="stars stars--near" />
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}