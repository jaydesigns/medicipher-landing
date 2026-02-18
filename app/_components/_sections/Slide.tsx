"use client";

import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../Button";

interface SlideData {
	image: string;
	title: string;
	description: string;
}

const slides: SlideData[] = [
	{
		image: "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177769/pexels-cottonbro-6939460_pb0y5r.jpg",
		title: "Save time and maximize savings",
		description: "Our comprehensive suite of tools help you manage the documentation and finances of your nursing facility."
	},
	{
		image: "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177766/ChatGPT_Image_Jan_20_2026_01_44_37_PM_eaaitp.png",
		title: "Streamline operations",
		description: "Simplify complex workflows and reduce manual data entry across your facility."
	},
	{
		image: "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177768/Gemini_Generated_Image_azaf8xazaf8xazaf_v1syhg.png",
		title: "Enhanced compliance",
		description: "Stay ahead of regulatory requirements with automated documentation and auditing."
	},
	{
		image: "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770350247/pexels-marcus-aurelius-6787761_og4odb.jpg",
		title: "Integrated solutions",
		description: "Connect all your facility management tools in one powerful platform."
	}
];

const paginationLabels = ["Features", "Products", "Services", "Tools"];

export default function SlideSection(){
	const [currentSlide, setCurrentSlide] = useState(0);
	const imgRefs = useRef<(HTMLDivElement | null)[]>([]);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLHeadingElement>(null);
	const descriptionRef = useRef<HTMLParagraphElement>(null);

	const handleSlideChange = (index: number) => {
		if (index === currentSlide) return;
		
		const tl = gsap.timeline();
		const container = scrollContainerRef.current;
		const targetSlide = imgRefs.current[index];
		
		if (!container || !targetSlide || !titleRef.current || !descriptionRef.current) return;
		
		const targetScrollLeft = targetSlide.offsetLeft;
		
		// Fade out title and description while scrolling to new slide
		tl.fromTo([titleRef.current, descriptionRef.current], {
			opacity: 1,
			translateY: "0%",
			filter: "blur(0px)",
		},{
			opacity: 0,
			translateY: "2rem",
			filter: "blur(10px)",
			duration: 0.8,
			ease: "power2.out"
		}, 0) // Start at the same time as scroll
		.to(container, {
			scrollLeft: targetScrollLeft,
			duration: 1.2,
			ease: "power3.inOut"
		}, 0) // Start at the same time as fade out
		.call(
			() => {
				setCurrentSlide(index);
			},
			[],
			0.6 // Call at the halfway point
		)
		// Fade in new title and description
		.fromTo([titleRef.current, descriptionRef.current], 
			{
				opacity: 0,
				translateY: "50%",
				filter: "blur(10px)",
			},
			{
				opacity: 1,
				translateY: "0%",
				filter: "blur(0px)",
				duration: 0.6,
				ease: "power2.out"
		}, 0.8);
	};

	return(
		<section className="flex w-full h-screen flex-col items-center bg-pale-blue px-6 py-12 lg:py-20">
			<div className="flex w-full max-w-270 h-full flex-col overflow-hidden rounded-[40px] bg-light-blue lg:flex-row">
				{/* Image Carousel */}
				<div ref={scrollContainerRef} className="relative h-1/2 w-full overflow-x-auto overflow-y-hidden scrollbar-hidden md:h-full md:w-1/2">
					<div className="flex h-full">
						{slides.map((slide, index) => (
							<div
								key={index}
								ref={el => {
									if (el) imgRefs.current[index] = el;
								}}
								className="h-full w-full shrink-0"
							>
								<img 
									alt={slide.title} 
									className="h-full w-full object-cover"
									src={slide.image}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Caption */}
				<div className="flex w-full flex-col items-start justify-center gap-4 px-8 py-10 lg:w-1/2 lg:px-20 h-1/2 lg:h-full">
					<div className="h-full flex flex-col gap-4">
						<h3 ref={titleRef} className="text-accent">
							{slides[currentSlide].title}
						</h3>
						<p ref={descriptionRef} className="">
							{slides[currentSlide].description}
						</p>
					</div>
					<div className="mt-6 flex flex-col gap-3 sm:flex-row">
						<Button className="font-bold leading-[1.2] tracking-[-0.24px] text-foreground">
							Schedule FREE Consultation
						</Button>
						<Button className="font-bold leading-[1.2] tracking-[-0.24px] text-foreground bg-secondary">
							Schedule a Demo
						</Button>
					</div>
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-8 flex w-full max-w-190 items-center justify-between rounded-full bg-white p-2">
				{paginationLabels.map((label, index) => (
					<button
						key={index}
						onClick={() => handleSlideChange(index)}
						className={`rounded-full px-2 md:px-6 py-1 md:py-2 text-xs md:text-base font-semibold tracking-[-0.24px] transition-all duration-300 ${
							currentSlide === index
								? "bg-light-blue text-black"
								: "bg-transparent text-[--color-navy] hover:bg-light-blue hover:text-black"
						}`}
					>
						{label}
					</button>
				))}
			</div>
		</section>
	)
}
