'use client';
import styles from '../css/switch.module.css';
import { vt323 } from '../fonts/fonts';
import { useLanguageContext } from '../context/LanguageContext';
import { useCrtContext } from '../context/CrtContext';

const CrtSwitch = () => {
  const { t } = useLanguageContext();
  const { crt, setCrt } = useCrtContext();

  return (
    <section className={styles.container}>
      <input
        className={styles.checkbox}
        id="crtSwitch"
        type="checkbox"
        checked={crt}
        onChange={() => setCrt(!crt)}
      />
      <label className={vt323.className} htmlFor="crtSwitch">{t("crtButton")}</label>
    </section>
  );
};

export default CrtSwitch;
