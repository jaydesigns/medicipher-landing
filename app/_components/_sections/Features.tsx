'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { useRef } from "react"

export default function Features(){
    const featuresContainer = useRef(null)

    useGSAP(() => {
        gsap.fromTo('.scrollFade',{opacity:0},{opacity:1,stagger:0.2,scrollTrigger:{trigger:'.featuresContainer',scrub:true,start:'top 60%',end:'top top'}})
    },{dependencies:[],scope:featuresContainer})
    return(
        <section ref={featuresContainer} className="featuresContainer relative flex flex-col justify-center items-center w-full md:h-screen p-6 md:pt-24">
            <div className="flex flex-col w-full max-w-270 h-full md:h-5/6">
                <h2>Features</h2>
                <div className="grid grid-flow-row md:grid-flow-col grid-cols-6 md:grid-rows-4 gap-4 h-full w-full">
                    <FeatureCard additionalClass="scrollFade opacity-0 md:row-span-2 md:row-span-4 col-span-6 md:col-span-2 bg-light-blue">
                        <h3>Up to ~$130/day</h3>
                        <h6>Recapture Lost Daily Revenue</h6>
                        <span className="caption">Prevent PDPM coding errors and recapture $80 to $130 per patient, per day.</span>
                    </FeatureCard>
                    <FeatureCard additionalClass="scrollFade opacity-0 md:row-span-2 col-span-full md:col-span-2 bg-accent text-white">
                        <h3>{`>20% ROI`}</h3>
                        <h6>Drastically Reduce Staff Turnover Costs</h6>
                        <span className="caption"><span className="text-white/50">{`AI automates assessment prepopulation, preventing the >$120,000 cost of replacing an MDS Coordinator.`}</span></span>
                    </FeatureCard>
                    <FeatureCard additionalClass="scrollFade opacity-0 row-span-2 col-span-6 md:col-span-4 bg-cover bg-[url(https://res.cloudinary.com/df9xjyhfb/image/upload/v1770350247/pexels-marcus-aurelius-6787761_og4odb.jpg)]">
                        <div className="w-full md:w-1/3 p-2 rounded-2xl bg-pale-blue/10 backdrop-blur-md">
                            <div className="text-white">
                                <h3>ZERO Friction</h3>
                                <h6>{`Eliminate the "Point Solution Tax"`}</h6>
                                <span className="text-xs">{`Stop paying the "Point Solution Tax" with a unified suite that eliminates data silos and workflow friction.`}</span>
                            </div>
                        </div>
                    </FeatureCard>
                    <FeatureCard additionalClass="scrollFade opacity-0 row-span-2 col-span-full md:col-start-4 md:row-start-3 md:row-start-1 md:col-span-2 bg-primary">
                        <h3>15%</h3>
                        <h6>Defend Against Aggressive Audits</h6>
                        <span className="caption">{`Protect earned revenue by instantly building undeniable evidence trails to counter the national 15.1% improper payment rate.`}</span>
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