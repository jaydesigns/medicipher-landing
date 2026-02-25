'use client'

import { useGSAP } from "@gsap/react";
import Logomark from "../_symbols/Logomark";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";
import 'material-symbols'

gsap.registerPlugin(ScrollTrigger);

export default function Navigation(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const lastScrollY = useRef(0);
    const navRef = useRef<HTMLElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const closedNavHeight = useRef(0);

    useGSAP(() => {
        gsap.fromTo('.fade',{filter:'blur(10px)',opacity:0},{filter:'blur(0px)',opacity:1,translateY:0,delay:2,duration:0.7,ease:'sine.out',stagger:0.1})
        
        // Scroll-based navbar animation
        const showNav = () => {
            gsap.to('.navBar', {
                y: '0%',
                duration: 0.3,
                ease: 'power2.out'
            });
        };

        const hideNav = () => {
            gsap.to('.navBar', {
                y: '6rem',
                duration: 0.3,
                ease: 'power2.in'
            });
        };

        // Track scroll direction
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                // Scrolling down
                hideNav();
            } else if (currentScrollY < lastScrollY.current) {
                // Scrolling up
                showNav();
            }
            
            lastScrollY.current = currentScrollY;
        };

        // Track mouse position for bottom hover
        const handleMouseMove = (e: MouseEvent) => {
            const windowHeight = window.innerHeight;
            const mouseY = e.clientY;
            const bottomThreshold = windowHeight - 150; // Show nav when mouse is within 150px of bottom
            
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
    }, {dependencies: []})

    useGSAP(() => {
        if (window.innerWidth >= 768 || !isMenuVisible) {
            return;
        }

        const nav = navRef.current;
        const mobileMenu = mobileMenuRef.current;

        if (!nav || !mobileMenu) {
            return;
        }

        const openHeight = mobileMenu.getBoundingClientRect().height + 20;
        const currentNavHeight = nav.getBoundingClientRect().height;

        const tl = gsap.timeline();

        if (isMenuOpen) {
            tl.set(nav, { overflow: 'hidden' })
                .fromTo(
                    nav,
                    { height: closedNavHeight.current || currentNavHeight },
                    { height: openHeight, duration: 0.45, ease: 'power2.out' }
                )
                .fromTo(
                    '.mobileMenuText',
                    { opacity: 0, filter: 'blur(10px)', y: 8 },
                    { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.5, ease: 'sine.out', stagger: 0.1 },
                    0.1
                )
                .set(nav, { height: 'auto' });
        } else {
            tl.set(nav, { overflow: 'hidden', height: currentNavHeight })
                .to(
                    '.mobileMenuText',
                    {
                        opacity: 0,
                        filter: 'blur(10px)',
                        y: 8,
                        duration: 0.25,
                        ease: 'sine.inOut',
                        stagger: { each: 0.05, from: 'end' }
                    }
                )
                .to(
                    nav,
                    {
                        height: closedNavHeight.current || currentNavHeight,
                        duration: 0.35,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            setIsMenuVisible(false);
                            requestAnimationFrame(() => {
                                gsap.set(nav, { clearProps: 'overflow,height' });
                            });
                        }
                    },
                    0.05
                );
        }

        return () => {
            tl.kill();
        };
    }, { dependencies: [isMenuOpen, isMenuVisible], scope: navRef })

    const toggleMenu = () => {
        if (!isMenuOpen && navRef.current) {
            closedNavHeight.current = navRef.current.getBoundingClientRect().height;
            setIsMenuVisible(true);
        }
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
                setIsMenuVisible(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
        <>
            <nav ref={navRef} className="navBar fade opacity-0 fixed left-1/2 -translate-x-1/2 w-[90vw] md:w-full max-w-270 bottom-6 z-10 bg-pale-blue/60 backdrop-blur-[25px] text-navy rounded-[20px] px-5 py-2.5">
                <div className="hidden md:flex items-center justify-between w-full p-2">
                    <Logomark color={'currentColor'} style={{transform:'scale(0.7) translateX(-20%)'}}/>
                    <ul className="flex gap-8">
                        <li>
                            <Link href={"/"}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href={"/"}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="md:hidden w-full">
                    {isMenuVisible ? (
                        <div ref={mobileMenuRef} className="flex h-full min-h-78 flex-col items-end gap-2">
                            <ul className="flex w-full flex-col items-end gap-1 pt-2">
                                <li>
                                    <Link href={'/'} onClick={closeMenu} className="mobileMenuText inline-flex justify-end py-2 text-2xl font-medium tracking-[-0.02em] text-navy leading-[1.2]">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} onClick={closeMenu} className="mobileMenuText inline-flex justify-end py-2 text-2xl font-medium tracking-[-0.02em] text-navy leading-[1.2]">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} onClick={closeMenu} className="mobileMenuText inline-flex justify-end py-2 text-2xl font-medium tracking-[-0.02em] text-navy leading-[1.2]">
                                        Solutions
                                    </Link>
                                </li>
                                <li>
                                    <Link href={'/'} onClick={closeMenu} className="mobileMenuText inline-flex justify-end py-2 text-2xl font-medium tracking-[-0.02em] text-navy leading-[1.2]">
                                        Contact
                                    </Link>
                                </li>
                            </ul>

                            <div className="mt-auto flex w-full items-center justify-between pt-2">
                                <Logomark color={'currentColor'} style={{transform:'scale(0.72)',transformOrigin:'left center'}}/>
                                <button
                                    onClick={closeMenu}
                                    className="relative flex h-8 w-8 items-center justify-center"
                                    aria-label="Close menu"
                                    aria-expanded={isMenuOpen}
                                >
                                    <span className="material-symbols-rounded rotate-45" >add</span> 
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between">
                            <Logomark color={'currentColor'} style={{transform:'scale(0.72)',transformOrigin:'left center'}}/>
                            <button
                                onClick={toggleMenu}
                                className="flex h-8.25 w-8.25 flex-col items-center justify-center gap-1.5"
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                            >
                                <span className="material-symbols-rounded">menu</span> 
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </>
    )
}