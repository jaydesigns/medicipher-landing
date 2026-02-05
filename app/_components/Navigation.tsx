import Logomark from "../_symbols/Logomark";
import Link from "next/link";

export default function Navigation(){
    return(
        <nav className="flex items-center justify-between fixed z-10 p-6 w-full">
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