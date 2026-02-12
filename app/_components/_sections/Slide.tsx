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
		tl.to([titleRef.current, descriptionRef.current], {
			opacity: 0,
			duration: 1,
			ease: "cubic.inOut"
		}, 0) // Start at the same time as scroll
		.to(container, {
			scrollLeft: targetScrollLeft,
			duration: 1,
			ease: "cubic.out"
		}, "<") // Start at the same time as fade out
		.call(
			() => {
				setCurrentSlide(index);
			},
			[],
			"<" // Call at the halfway point after fade out
		)
		// Fade in new title and description
		.to([titleRef.current, descriptionRef.current], {
			opacity: 1,
			duration: 0.5,
			ease: "power2.inOut"
		});
	};

	return(
		<section className="flex w-full flex-col items-center bg-pale-blue px-6 py-12 lg:py-20">
			<div className="flex w-full max-w-270 flex-col overflow-hidden rounded-[40px] bg-light-blue lg:flex-row">
				{/* Image Carousel */}
				<div ref={scrollContainerRef} className="relative h-45 w-full overflow-x-auto overflow-y-hidden scrollbar-hidden lg:h-150 lg:w-1/2 scroll-smooth">
				<div className="flex h-full">
					{slides.map((slide, index) => (
						<div
							key={index}
							ref={el => {
								if (el) imgRefs.current[index] = el;
							}}
							className="h-full w-full flex-shrink-0"
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
				<div className="flex w-full flex-col items-start justify-center gap-4 px-8 py-10 lg:w-1/2 lg:px-[80px]">
				<h3 ref={titleRef} className="text-accent">
					{slides[currentSlide].title}
				</h3>
				<p ref={descriptionRef} className="">
					{slides[currentSlide].description}
					</p>
					<div className="mt-6 flex flex-col gap-3 sm:flex-row">
						<Button className="font-bold leading-[1.2] tracking-[-0.24px] text-white">
							Schedule FREE Consultation
						</Button>
						<Button className="font-bold leading-[1.2] tracking-[-0.24px] text-accent bg-accent">
							Schedule a Demo
						</Button>
					</div>
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-8 flex w-full max-w-[787px] items-center justify-between rounded-full bg-white p-2">
				{paginationLabels.map((label, index) => (
					<button
						key={index}
						onClick={() => handleSlideChange(index)}
						className={`rounded-full px-6 py-2 font-semibold tracking-[-0.24px] transition-all duration-300 ${
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
