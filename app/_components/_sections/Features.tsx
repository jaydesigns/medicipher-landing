'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export default function Features(){
    const featuresContainer = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.scrollFade',{opacity:0,filter:'blur(10px)'},{opacity:1,filter:'blur(0px)',stagger:0.2,scrollTrigger:{trigger:'.featuresContainer',scrub:true,start:'top 60%',end:'top top'}})
    },{dependencies:[],scope:featuresContainer})
    return(
        <section ref={featuresContainer} className="featuresContainer relative flex flex-col justify-center items-center w-full h-screen p-6 pt-24">
            <div className="flex flex-col w-full max-w-270 h-full">
                <h2>Features</h2>
                <div className="grid grid-flow-row md:grid-flow-col grid-cols-6 grid-rows-4 gap-4 h-full w-full">
                    <FeatureCard additionalClass="scrollFade blur-[10px] opacity-0 row-span-2 md:row-span-4 col-span-6 md:col-span-2 bg-light-blue">
                        <h3>43%</h3>
                        <p>Less time spent on skilled nursing documentation with AI-assisted summaries and auto-filled MDS sections.</p>
                        <span className="caption">Across 120 SNF teams, 6-month average.</span>
                    </FeatureCard>
                    <FeatureCard additionalClass="scrollFade blur-[10px] opacity-0 row-span-2 col-span-3 md:col-span-2 bg-accent text-white">
                        <h3>18 hrs</h3>
                        <p>Saved per clinician each month on daily notes, therapy updates, and care-plan edits.</p>
                        <span className="caption"><span className="text-white/50">Median savings per FTE.</span></span>
                    </FeatureCard>
                    <FeatureCard additionalClass="scrollFade blur-[10px] opacity-0 row-span-2 col-span-6 md:col-span-4 bg-cover bg-[url(https://res.cloudinary.com/df9xjyhfb/image/upload/v1770350247/pexels-marcus-aurelius-6787761_og4odb.jpg)]">
                        <div className="w-full md:w-1/3 p-2 rounded-2xl bg-pale-blue/10 backdrop-blur-md">
                            <div className="text-white">
                                <h3>2.4x</h3>
                                <p>Faster narrative generation for skilled nursing visits, with structured citations from the chart.</p>
                                <span className="text-xs">Average speedup in pilot sites.</span>
                            </div>
                        </div>
                    </FeatureCard>
                    <FeatureCard additionalClass="scrollFade blur-[10px] opacity-0 row-span-2 col-span-3 col-start-4 row-start-3 md:row-start-1 md:col-span-2 bg-primary">
                        <h3>92%</h3>
                        <p>Documentation accuracy when AI checks for missing risk factors and inconsistent meds.</p>
                        <span className="caption">Internal QA review, 3,800 notes.</span>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

const FeatureCard = ({children,additionalClass}:{children:React.ReactNode, additionalClass?:string}) => {
    return(
        <div className={`rounded-3xl p-6 ${additionalClass}`}>
            {children}
        </div>
    )
}