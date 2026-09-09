'use client';
import { useLanguageContext } from '../context/LanguageContext';
import { useCrtContext } from '../context/CrtContext';
import { useState, useEffect } from 'react';
import styles from '../css/marquee.module.css';
import { dotFont } from '../fonts/fonts';

const Marquee = () => {
  const { tArray } = useLanguageContext();
  const quotes = tArray("quotes");
  const { crt } = useCrtContext();

  const [quote, setQuote] = useState('');
  const [speed, setSpeed] = useState('10');
  const [checkQuotes, setCheckQuotes] = useState([]);

  useEffect(() => {
    if (quotes && quotes.length > 0 && quote === '') {
      const initialIndex = Math.floor(Math.random() * quotes.length);
      const initialQuote = quotes[initialIndex];
      setQuote(initialQuote);
      setSpeed((initialQuote.length * 0.5).toString());
      setCheckQuotes([initialQuote]);
    }
  }, [quotes, quote]);

  if (!quote) return null;

  return (
    <header className={`${styles.header} ${crt ? "bright__border" : ""}`} style={{ '--transition-duration': speed + 's' }}>
      <h1
        key={quote}
        className={dotFont.className}
        onAnimationIteration={() => {
          setCheckQuotes(prev => {
            let index = 0;
            const current = prev.length === quotes.length ? [prev[prev.length - 1]] : prev;

            index = Math.floor(Math.random() * quotes.length);
            while (current.includes(quotes[index])) {
              index = Math.floor(Math.random() * quotes.length);
            }

            const nextQuote = quotes[index];
            setQuote(nextQuote);
            setSpeed((nextQuote.length * 0.5).toString());
            return [...current, nextQuote];
          });
        }}
      >
        {quote}
      </h1>
    </header>
  );
};

export default Marquee;
