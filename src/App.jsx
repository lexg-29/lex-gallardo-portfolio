import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import TechText from './components/TechText.jsx';

function HeroTechText() {
  useEffect(() => {
    const settings = {
      fontFamily: "'Space Grotesk', sans-serif",
      fontWeight: 700,
      fontSize: 112,
      letterSpacing: -0.075,
      align: 'left',
      color: '#F4EDE4',
      accentColor: '#B94A5C',
      reveal: 'letter',
      dashLength: 4,
      dashGap: 2,
      specks: 15,
      intro: 'none',
      clickKick: true,
      guides: false,
      selection: true,
      labels: false,
      draggable: true,
      sweep: true,
      speed: 0.7,
    };
    const mounts = [
      ['tech-line-one', 'LEX GABRIEL E.'],
      ['tech-line-two', 'GALLARDO'],
      ['tech-line-three', 'A COMPUTER SCIENCE STUDENT'],
    ];
    const roots = [];
    mounts.forEach(([id, text]) => {
      const node = document.getElementById(id);
      if (!node) return;
      const root = createRoot(node);
      root.render(<TechText text={text} {...settings} fontSize={text === 'SCIENCE' ? 112 : 112} style={{ width: '100%', height: '104px' }} />);
      roots.push(root);
    });
    return () => roots.forEach((root) => root.unmount());
  }, []);
  return null;
}

export default function App() {
  const [markup, setMarkup] = useState('');
  useEffect(() => {
    fetch('/portfolio-content.html')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load portfolio content.');
        return response.text();
      })
      .then(setMarkup)
      .catch((error) => console.error(error));

    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '/style.css';
    document.head.appendChild(stylesheet);
    return () => stylesheet.remove();
  }, []);

  useEffect(() => {
    if (!markup) return;
    const script = document.createElement('script');
    script.src = '/script.js';
    script.async = false;
    document.body.appendChild(script);
    return () => script.remove();
  }, [markup]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {markup && <HeroTechText />}
    </>
  );
}
