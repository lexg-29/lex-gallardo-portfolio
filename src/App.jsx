
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechText from './components/TechText.jsx';
import SplitFlapText from './components/SplitFlapText.jsx';

gsap.registerPlugin(ScrollTrigger);

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

      root.render(
        <TechText
          text={text}
          {...settings}
          style={{ width: '100%', height: '104px' }}
        />
      );

      roots.push(root);
    });

    return () => roots.forEach((root) => root.unmount());
  }, []);

  return null;
}


function ContactFlapText() {
  useEffect(() => {
    const contactSection = document.getElementById('contact');
    if (!contactSection) return;

    const mounts = [
      {
        id: 'contact-phone-flap',
        text: '0915 915 1028',
        fontSize: 22,
        padTo: 13,
        charset: '0123456789 ',
      },
      {
        id: 'contact-email-flap',
        text: 'lexgallardo17@gmail.com',
        fontSize: 19,
        padTo: 23,
        charset: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@.+',
      },
    ];

    const roots = [];
    let hasMounted = false;
    let observer = null;

    const mountAnimations = () => {
      if (hasMounted) return;
      hasMounted = true;

      mounts.forEach(({ id, text, fontSize, padTo, charset }) => {
        const node = document.getElementById(id);
        if (!node) return;

        const root = createRoot(node);
        root.render(
          <SplitFlapText
            text={text}
            fontSize={fontSize}
            padTo={padTo}
            charset={charset}
            flipDuration={0.12}
            stagger={0.035}
            flipsPerChar={7}
            tileStyle="minimal"
            tileColor="#111111"
            textColor="#F4EDE4"
            gap={2}
            depth={0.3}
            intro
            loop={false}
          />
        );
        roots.push(root);
      });
    };

    // Start the intro only when Contact is about to become visible.
    // Otherwise, the animation would finish while the section is still off-screen.
    if (!('IntersectionObserver' in window)) {
      mountAnimations();
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            mountAnimations();
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );

      observer.observe(contactSection);
    }

    return () => {
      observer?.disconnect();
      roots.forEach((root) => root.unmount());
    };
  }, []);

  return null;
}

export default function App() {
  const [markup, setMarkup] = useState('');

  // Load portfolio HTML and CSS
  useEffect(() => {
    fetch('/portfolio-content.html')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load portfolio content.');
        }
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

  // Load existing portfolio JavaScript
  useEffect(() => {
    if (!markup) return;

    const script = document.createElement('script');
    script.src = '/script.js';
    script.async = false;
    document.body.appendChild(script);

    return () => script.remove();
  }, [markup]);

  // Fade sections in when they enter the viewport
  useEffect(() => {
    if (!markup) return;

    const sections = gsap.utils.toArray('[data-fade]');

    const animations = sections.map((section) => {
      return gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => {
      animations.forEach((animation) => {
        animation.scrollTrigger?.kill();
        animation.kill();
      });
    };
  }, [markup]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      {markup && <HeroTechText />}
      {markup && <ContactFlapText />}
    </>
  );
}
