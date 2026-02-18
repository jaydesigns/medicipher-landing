'use client'

import { useGSAP } from "@gsap/react";
import Logomark from "../_symbols/Logomark";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useState, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Navigation(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const lastScrollY = useRef(0);

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
    })

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return(
        <>
            <nav className="navBar fade opacity-0 fixed left-1/2 -translate-x-1/2 w-full max-w-270 bottom-6 z-10 px-2 py-1 bg-pale-blue/80 backdrop-blur-md rounded-2xl">
                <div className="flex items-center justify-between w-full p-2 text-navy">
                    <Logomark color={'currentColor'} style={{transform:'scale(0.7) translateX(-20%)'}}/>
                    
                    {/* Desktop Menu */}
                    <ul className="hidden md:flex gap-8">
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
                    {/* Hamburger Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center z-50"
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Modal */}
            {isMenuOpen && (
                <div 
                    className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={closeMenu}
                >
                    <div 
                        className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl p-8 pt-24"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ul className="flex flex-col gap-6">
                            <li>
                                <Link 
                                    href={"/"}
                                    onClick={closeMenu}
                                    className="text-lg font-medium hover:text-gray-600 transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={"/"}
                                    onClick={closeMenu}
                                    className="text-lg font-medium hover:text-gray-600 transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link 
                                    href={"/"}
                                    onClick={closeMenu}
                                    className="text-lg font-medium hover:text-gray-600 transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    )
}