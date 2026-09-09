'use client';
import { useRouter } from 'next/navigation';
import { vt323 } from './fonts/fonts';
import styles from './css/terminal.module.css';
import { useCrtContext } from './context/CrtContext';

export default function NotFound() {
  const router = useRouter();
  const { crt } = useCrtContext();

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100%', 
      width: '100%',
      padding: '25px',
      color: 'white'
    }}>
      <div className={`${styles.terminal} ${crt ? "bright__border" : ""}`} style={{ height: 'auto', width: '100%', maxWidth: '800px', animation: 'none' }}>
        <div className={`${styles.terminal__history} ${vt323.className}`}>
          SYS_ERROR: 404_NOT_FOUND
          <br /><br />
          &gt; The requested buffer could not be allocated.
          <br />
          &gt; Packet dropped. Connection to remote host severed.
          <br /><br />
        </div>
        <section className={styles.terminal__prompt}>
          <article className={vt323.className}>SYS_GUEST@dcb-portfolio ~</article>
          <article className={styles.terminal__inputContainer}>
            <p className={vt323.className}>&gt;</p>
            <span 
              className={`${styles.terminal__input} ${vt323.className}`} 
              onClick={() => router.push('/')}
              style={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              return_to_main_terminal
            </span>
          </article>
        </section>
      </div>
    </main>
  );
}
