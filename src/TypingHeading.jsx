import { useEffect, useState } from 'react';

export default function TypingHeading({ text }) {
  const [length, setLength] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? text.length : 0,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let position = 0;
    let deleting = false;
    let timer;
    const tick = () => {
      position += deleting ? -1 : 1;
      setLength(position);
      let delay = deleting ? 45 : 85;
      if (position >= text.length) {
        deleting = true;
        delay = 2000;
      } else if (position <= 0) {
        deleting = false;
        delay = 500;
      }
      timer = window.setTimeout(tick, delay);
    };
    if (!preference.matches) timer = window.setTimeout(tick, 85);
    const handlePreference = (event) => {
      window.clearTimeout(timer);
      if (event.matches) {
        setLength(text.length);
      } else {
        position = 0;
        deleting = false;
        setLength(0);
        timer = window.setTimeout(tick, 85);
      }
    };
    preference.addEventListener('change', handlePreference);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener('change', handlePreference);
    };
  }, [text]);

  return <span className="typing-heading">
    <span className="sr-only">{text}, </span>
    <span className="typing-layout" aria-hidden="true">
      <span className="typing-space">{text},</span>
      <span>{text.slice(0, length)}{length < text.length ? <span className="typing-cursor">|</span> : ','}</span>
    </span>
  </span>;
}
