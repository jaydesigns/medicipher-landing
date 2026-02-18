'use client'

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const showcasePhoto = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177774/Landscape_candid_sho_xduwvv.png";
const dashboardImage = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770353660/Dashboard_pmubx7.png";

export default function ShowcaseSection(){
	const showcaseContainer = useRef(null)

	useGSAP(() => {
        gsap.fromTo('.scrollFade',{opacity:0,filter:'blur(10px)'},{opacity:1,filter:'blur(0px)',stagger:0.2,scrollTrigger:{trigger:'.showcaseContainer',scrub:true,start:'top 60%',end:'top top'}})
    },{dependencies:[],scope:showcaseContainer})

	return(
		<section ref={showcaseContainer} className="showcaseContainer flex w-full h-screen flex-col items-center justify-center gap-10 bg-accent p-6 lg:flex-row lg:gap-10 lg:p-[80px]">
			<div className="flex flex-col md:flex-row gap-8 w-full max-w-270 h-full">
				<div className="flex w-full flex-col items-start justify-between gap-8 lg:h-full lg:w-150">
					<div className="flex w-full flex-col gap-2 text-white">
						<h4 className="scrollFade blur-[10px]">
							Powerful automation for modern nursing facilities
						</h4>
						<p className="scrollFade blur-[10px]">
							Medicipher transforms how nursing facilities operate by automating critical documentation, compliance tracking, and financial management. Our intelligent platform reduces manual workload, minimizes errors, and ensures regulatory adherence—allowing your team to focus on what matters most: delivering exceptional patient care.
						</p>
					</div>
					<div className="h-40 scrollFade blur-[10px] w-full overflow-hidden rounded-[40px] lg:h-50">
						<img alt="" className="h-full w-full object-cover" src={showcasePhoto} />
					</div>
				</div>
				<div className="flex grow relative h-full p-4 scrollFade blur-[10px] w-full overflow-hidden rounded-[40px] bg-light-blue lg:w-250">
					<div className="relative w-full h-full"><img alt="" className="absolute left-1/2 top-1/2 h-80 w-115 -translate-x-1/2 -translate-y-1/2 object-contain overflow-hidden rounded-lg lg:h-180 lg:w-250" src={dashboardImage} /></div>
				</div>
			</div>
		</section>
	)
}
