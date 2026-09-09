'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useLanguageContext } from '../context/LanguageContext';
import styles from '../css/terminal.module.css';
import { vt323 } from '../fonts/fonts';
import { useCrtContext } from '../context/CrtContext';

const Terminal = () => {
  const { t, tArray, language } = useLanguageContext();
  const { crt } = useCrtContext();
  const divRef = useRef(null);
  const inputRef = useRef(null);
  
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [slicedText, setSlicedText] = useState("");
  const timeoutRef = useRef(null);

  const smallScreen = typeof window !== 'undefined' ? window.innerWidth <= 760 : false;
  const joinArray = (key, sep) => {
    const arr = tArray(key);
    return Array.isArray(arr) ? arr.join(sep) : '';
  };
  const sep = '\n';
  
  const banner = smallScreen ? joinArray("smallBanner", sep) : joinArray("banner", sep);
  const help = smallScreen ? joinArray("smallHelp", sep) : joinArray("help", sep);
  const skills = smallScreen ? joinArray("smallSkills", sep) : joinArray("skills", sep);
  const projects = joinArray("projects", sep);
  const education = joinArray("education", sep);
  const awards = joinArray("awards", sep);
  const bio = joinArray("bio", sep);
  const contact = joinArray("contact", sep);
  
  const speed = smallScreen ? 15 : 2;

  useEffect(() => {
    animateText('', banner, '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const animateText = (base, textToAppend, link) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOutput(base);
    let i = 0;

    const tick = () => {
      i++;
      setSlicedText(textToAppend.slice(0, i));
      if (i < textToAppend.length) {
        timeoutRef.current = setTimeout(tick, speed);
      } else {
        if (link !== '') setTimeout(() => { window.open(link, '_blank'); }, 500);

        setOutput(base + textToAppend);
        setSlicedText("");
      }
    };

    timeoutRef.current = setTimeout(tick, speed);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (divRef.current) divRef.current.scrollTop = divRef.current.scrollHeight;
    if (inputRef.current) inputRef.current.focus();
  }, [slicedText, output]);

  const formatOutputWithLinks = (text) => {
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
      
    const linkified = escaped.replace(
      /(https?:\/\/[^\s]+|\/Don_Cornelius_B_Resume\.pdf)/g,
      '<a href="$1" target="_blank" class="underline cursor-pointer text-[#8be9fd] hover:text-[#50fa7b] transition-colors">$1</a>'
    );
    return linkified;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      let textToAppend = "";
      let link = "";
      textToAppend = `SYS_GUEST@dcb-portfolio ~ ${input}\n\n`;
      let openLink = `${t("opening")} ${input}...\n\n`;
      
      const cmd = input.trim().toLowerCase();
      
      switch (cmd) {
        case "banner": textToAppend += banner; break;
        case "help": textToAppend += help; break;
        case "skills": textToAppend += skills; break;
        case "projects": textToAppend += projects; break;
        case "project 1":
          textToAppend += openLink;
          link = "https://github.com/tanmaya-kamma/multimodal_ai";
          break;
        case "project 2":
          textToAppend += openLink;
          link = "https://github.com/Don-Cornelius-B/Smart_Rental_Tracking_System_SDD";
          break;
        case "project 3":
          textToAppend += openLink;
          link = "https://github.com/Don-Cornelius-B/Don-Cornelius-B.github.io";
          break;
        case "education": textToAppend += education; break;
        case "awards": textToAppend += awards; break;
        case "bio": textToAppend += bio; break;
        case "contact": textToAppend += contact; break;
        case "github":
          textToAppend += openLink;
          link = "https://github.com/Don-Cornelius-B";
          break;
        case "linkedin":
          textToAppend += openLink;
          link = "https://linkedin.com/in/don-cornelius-livi/";
          break;
        case "resume":
          textToAppend += openLink;
          link = "/Don_Cornelius_B_Resume.pdf";
          break;
        case "cls":
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setOutput("");
          setSlicedText("");
          setInput("");
          break;
        default:
          if (cmd !== "") {
            textToAppend += `${t("errPart1")} "${input}" ${t("errPart2")}\n\n`;
          }
      }

      if (cmd !== "cls" && cmd !== "") {
        animateText(output, textToAppend, link);
      }
      setInput("");
    }
  };

  return (
    <div ref={divRef} className={`${styles.terminal} ${crt ? "bright__border" : ""}`} onClick={() => inputRef.current?.focus()}>
      <div className={`${styles.terminal__history} ${vt323.className}`}>
        <span dangerouslySetInnerHTML={{ __html: formatOutputWithLinks(output) }} />
        <span>{slicedText}</span>
      </div>
      <section className={styles.terminal__prompt}>
        <article className={vt323.className}>SYS_GUEST@dcb-portfolio ~</article>
        <article className={styles.terminal__inputContainer}>
          <p className={vt323.className}>&gt;</p>
          <input
            className={`${styles.terminal__input} ${vt323.className}`}
            ref={inputRef}
            type="text"
            id='prompt'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
          />
        </article>
      </section>
    </div>
  );
};

export default Terminal;
