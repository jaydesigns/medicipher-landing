'use client'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Button from "../Button";
export const BLUR_DATA_URL = `data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCABnAKkDASIAAhEBAxEB/8QAGQAAAgMBAAAAAAAAAAAAAAAAAAECAwUE/8QAHBABAAIDAQEBAAAAAAAAAAAAABJhARMUAhED/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/ANr4eMLYHjw8EemoYwnjCWPCePBAsYTxg8eE8eFgjjCXxLHlKLeYiHwvi2JRbxnVWcI5wuz5LPh1xjVOcI/F2fBQbxnVPwfFsBBUVfD+LICCaqGMHjCePJwZ1UPg+LIiCKr1nj83TrPW4RuufH5pY/Nfj80seCFU48JY8LseEseCLVOPCUFuPBwXMSqYCC+Ag3jOueBZ8OmBZ8N4zrmz4R1uqBQaRzaxrdEBBUc8BB0QEBVEDgvgIIqiAg6ICCKUDis+D45wqETin8BFpY8njykZCoxOJmRKjE4mbQhERTJrGUIiKYVFcRFP4FEIiKYFQiIpgVCIimEFX0fVGwbGIL/pyUbBsB0SElGwbAdEjk59h7AXyOTn2DYqOiQk59g2Ki+Qko2WNii+RSU7BsUXSElGwbAXyElGwtgrokJKNg2A4Nw3Wzuix0WyNLdY3Wzuix0WDS3WN1s7osb7RGlusbrZ2+z32o0N1nutnb7HRYjR3WN1s7osdFqNHdY3Wzuix0W0jQ3WN1s7osdFitHdZbrZ/RZdFrBo7rG62d0WOixWjusbmd0WOiwrI6bPptk9Fn0W5jV6bPotldFnj97Bq9Fn0Wyt9pY/exGp0WOi2Zvs99iNPosdFszfY320laXRY6LZm+xvtcK0+iy6bZm+y6LaiVqdNl02y99jotYtanTY6bZfQN9kK1Omx0Wy99jeRa1Oix0WzN9jfZCsyeTnkBxaPHvKWPeQAPHvKU8gCJY9ZOeQBkTyU8gNYgnkp5AaxEZ5KeQG8QTyU8gKCeTnkAUTyc8gCieRPIAP/9k=`

export default function HeroSection(){

    useGSAP(() => {
        gsap.fromTo('.heroImage',{clipPath:'inset(20% 20% 20% 20%)'},{clipPath:'inset(0% 0% 0% 0%)',duration:1,ease:'sine.inOut'})
    },{dependencies:[]})

    return(
        <section className="relative flex flex-col justify-start w-full h-screen p-6 pt-24">
            <div className="flex flex-col gap-8">
                <h1 className="flex">Building Profitable Facilities</h1>
                <p>MEDICIPHER is revolutionizing skilled nursing billing and medical documentation workflow with our comprehensive suite of AI-powered software solutions</p>
                <p>Schedule your free consultation today.</p>
                <div className="flex gap-12">
                    <Button>Schedule a Demo</Button>
                    <Button>Contact Us</Button>
                </div>
            </div>
            <div className="heroImage absolute inset-0 -z-10" style={{clipPath:'inset(20% 20% 20% 20%)'}}>
                <Image src={`https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177765/skilled-nursing-facility-photo_rnm6pp.png`} alt="Skilled nursing facility" fill className="absolute object-cover inset-0" sizes="100vw" placeholder="blur" blurDataURL={`${BLUR_DATA_URL}`} />
            </div>
        </section>
    )
}