'use client'

import { useGSAP } from "@gsap/react";
import Logomark from "../_symbols/Logomark";
import Link from "next/link";
import gsap from "gsap";

export default function Navigation(){
    useGSAP(() => {
        gsap.fromTo('.fade',{filter:'blur(10px)',opacity:0},{filter:'blur(0px)',opacity:1,translateY:0,delay:2,duration:1,stagger:0.1})
    })
    return(
        <nav className="flex fade opacity-0 items-center justify-between fixed z-10 p-6 w-full">
            <Logomark color={'black'} style={{transform:'scale(1)'}}/>
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
        </nav>
    )
}