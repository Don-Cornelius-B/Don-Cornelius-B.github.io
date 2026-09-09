import './globals.css';
import Dots from './components/Dots';
import Marquee from './components/Marquee';
import { LanguageContextProvider } from './context/LanguageContext';
import { CrtContextProvider } from './context/CrtContext';

export const metadata = {
  title: 'Don Cornelius B | Cloud Systems & DevOps Engineer',
  description: 'Interactive Terminal Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" translate="no">
      <body>
        <LanguageContextProvider>
          <CrtContextProvider>
            <Marquee />
            <Dots />
            {children}
          </CrtContextProvider>
        </LanguageContextProvider>
      </body>
    </html>
  );
}