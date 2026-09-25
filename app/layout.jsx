import './globals.css';
import Dots from './components/Dots';
import Marquee from './components/Marquee';
import { LanguageContextProvider } from './context/LanguageContext';
import { vt323 } from './fonts/fonts';

export const metadata = {
  title: 'Don Cornelius B | Cloud Systems & DevOps Engineer',
  description: 'Interactive Terminal Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no" className={vt323.variable}>
      <body className={vt323.className}>
        <LanguageContextProvider>
          <Marquee />
          <Dots />
          {children}
        </LanguageContextProvider>
      </body>
    </html>
  );
}