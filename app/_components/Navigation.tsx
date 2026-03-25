'use client'

import { useGSAP } from '@gsap/react';
import Logomark from '../_symbols/Logomark';
import Button from './Button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import 'material-symbols';
import Question from './Question';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);

  
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [isQuestionClosing, setIsQuestionClosing] = useState(false);

  const handleCloseQuestion = () => {
    setIsQuestionOpen(false);
    setIsQuestionClosing(false);
  };

  const handleToggleQuestion = () => {
    if (isQuestionOpen) {
      setIsQuestionClosing(true);
    } else {
      setIsQuestionOpen(true);
      setIsQuestionClosing(false);
    }
  };

  useGSAP(
    () => {
      gsap.fromTo(
        '.fade',
        { filter: 'blur(10px)', opacity: 0 },
        { filter: 'blur(0px)', opacity: 1, translateY: 0, delay: 0.8, duration: 0.6, ease: 'sine.out', stagger: 0.08 }
      );

      const showNav = () => {
        gsap.to('.navBar', { y: '0%', duration: 0.28, ease: 'power2.out' });
      };

      const hideNav = () => {
        gsap.to('.navBar', { y: '5.5rem', duration: 0.26, ease: 'power2.in' });
      };

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
          hideNav();
        } else if (currentScrollY < lastScrollY.current) {
          showNav();
        }
        lastScrollY.current = currentScrollY;
      };

      const handleMouseMove = (e: MouseEvent) => {
        const windowHeight = window.innerHeight;
        const mouseY = e.clientY;
        const bottomThreshold = windowHeight - 120;
        if (mouseY > bottomThreshold) {
          showNav();
        }
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    },
    { dependencies: [] }
  );

  useEffect(() => {
    const handleResize = () => {
      // close mobile menu state, not used but kept for future extension
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      ref={navRef}
      className="navBar fade fixed w-full bottom-6 z-20 px-6"
      aria-label="Main navigation"
    >
        <div className='w-full max-w-270 mx-auto'>
          {isQuestionOpen && (
            <Question isOpen={isQuestionOpen} fixed={true} isClosing={isQuestionClosing} onClose={handleCloseQuestion} />
          )}
        </div>
        <div className='mx-auto max-w-270 w-full p-1 bg-white/75 backdrop-blur-2xl border border-slate-200 shadow-[0_15px_35px_rgba(12,20,45,0.16)] text-navy rounded-[20px] transition-all duration-300 ease-out'>
            <div className="flex items-center justify-between w-full px-4 py-2">
                <Logomark color={'currentColor'} style={{ transform: 'scale(0.7) translateX(-20%)' }} />
                <Button variant='outlined' onClick={handleToggleQuestion}><span className='text-xs font-bold text-nowrap'>Ask Medicipher AI</span></Button>
            </div>
        </div>
    </nav>
  );
}
