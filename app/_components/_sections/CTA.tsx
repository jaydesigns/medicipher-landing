'use client'
import { useGSAP } from "@gsap/react";
import Button from "../Button";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { useRef } from "react";

export default function CTASection(){
    const ctaSectionRef = useRef(null)
    useGSAP(() => {
        const cta = SplitText.create('.cta-title',{type: "words"})
        gsap.set(cta.words,{
			filter: "blur(10px)",
            translateY: "2rem",
            opacity:0
        })
        gsap.fromTo(cta.words,{
			filter: "blur(10px)",
            translateY: "1.2rem",
            opacity:0
        },{
            filter: "blur(0px)",
            translateY: "0rem",
            opacity:1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: ctaSectionRef.current,
                start: "top 70%",
                end: "top 50%",
                scrub: true,
            }
        })
    },{dependencies:[]})
    return(
        <section ref={ctaSectionRef} className="flex w-full h-60vh flex-col lg:flex-row">
            <div className="flex w-full lg:w-1/2 flex-col justify-start bg-accent px-6 py-10">
                <h2 className="cta-title text-[56px] leading-[1.2rem] text-white lg:text-[96px]">
                    Ready to transform your facility management?
                </h2>
            </div>
            <div className="flex w-full lg:w-1/2 flex-col gap-8 justify-between bg-light-blue px-6 py-10 lg:px-8 lg:py-12">
                <p className="text-[24px] font-semibold leading-none lg:text-[36px]">
                    Our comprehensive suite of tools help you manage the documentation and finances of your nursing facility.
                </p>
                <div className="mt-8 w-full rounded-[40px] bg-pale-blue lg:mt-0">
                    <div className="flex flex-col gap-8 px-6 py-8">
                        <input
                            className="w-full min-w-0 border-b border-(--color-navy) bg-transparent pb-2 text-[18px] font-medium text-(--color-navy) outline-none placeholder:text-(--color-navy)/60 lg:text-[20px]"
                            placeholder="Full name"
                            type="text"
                        />
                        <input
                            className="w-full min-w-0 border-b border-(--color-navy) bg-transparent pb-2 text-[18px] font-medium text-(--color-navy) outline-none placeholder:text-(--color-navy)/60 lg:text-[20px]"
                            placeholder="Work email"
                            type="email"
                        />
                        <div className="flex justify-center pt-4">
                            <Button className="">
                                Sign Up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}