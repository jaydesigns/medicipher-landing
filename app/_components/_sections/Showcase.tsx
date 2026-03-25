'use client'

import { useEffect, useState } from "react";
import Button from "../Button";
import Image from "next/image";

const showcasePhoto = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1770177774/Landscape_candid_sho_xduwvv.png";
const sampleDocument = "https://res.cloudinary.com/df9xjyhfb/image/upload/v1772822437/Sample_Document_x4zeki.png";
const rollingLabels = ['MDS', 'ADR', 'CMI']

type ShowcaseStage = 'idle' | 'processing' | 'parsed';

function ProcessingCopy() {
	const [dots, setDots] = useState(1)
	const [visibleLines, setVisibleLines] = useState(1)

	useEffect(() => {
		const dotsIntervalId = window.setInterval(() => {
			setDots((prev) => (prev % 3) + 1)
		}, 350)

		const nextLineTimeoutId = window.setTimeout(() => {
			setVisibleLines(2)
		}, 700)

		return () => {
			window.clearInterval(dotsIntervalId)
			window.clearTimeout(nextLineTimeoutId)
		}
	}, [])

	const ellipses = '.'.repeat(dots)

	return (
		<div className="mb-2 text-[18px] font-medium text-[#161718]">
			<p className="transition-opacity duration-300">Uploading your file{ellipses}</p>
			<p className={`transition-opacity duration-300 ${visibleLines === 2 ? 'opacity-100' : 'opacity-0'}`}>
				Gathering info from the document{ellipses}
			</p>
		</div>
	)
}

function RollingSelect({ items }: { items: string[] }) {
	const [currentIndex, setCurrentIndex] = useState(0)

	useEffect(() => {
		if (items.length <= 1) {
			return
		}

		const intervalId = window.setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % items.length)
		}, 3000)

		return () => window.clearInterval(intervalId)
	}, [items])

	return (
		<div className="relative inline-flex h-[1.1em] min-w-18 overflow-hidden bg-white/40 px-3 align-middle">
			<div
				className="flex flex-col transition-transform duration-500 ease-in-out"
				style={{ transform: `translateY(-${currentIndex * 100}%)` }}
			>
				{items.map((item) => (
					<span key={item} className="block text-center leading-[1.1]">
						{item}
					</span>
				))}
			</div>
		</div>
	)
}

export default function ShowcaseSection(){
	const [ stage, setStage ] = useState<ShowcaseStage>('idle')

	useEffect(() => {
		if (stage !== 'processing') {
			return
		}

		const timeoutId = window.setTimeout(() => {
			setStage('parsed')
		}, 5200)

		return () => window.clearTimeout(timeoutId)
	}, [stage])

	const startSimulation = () => {
		if (stage !== 'idle') {
			return
		}
		setStage('processing')
	}

	const resetStage = () => {
		setStage('idle')
	}

	return(
		<section className="showcaseContainer flex w-full min-h-screen flex-col items-center justify-center gap-8 bg-accent p-6 lg:gap-10 lg:p-20">
			<div className="flex w-full max-w-400 flex-col gap-8 md:flex-row">
				<div className="flex w-full flex-col items-start justify-between gap-8 md:w-[36%]">
					<div className="flex w-full flex-col gap-6 text-white">
						<h2 className="scrollFade relative z-40 max-w-135 ">
							Your <span className="inline-flex items-center"><RollingSelect items={rollingLabels} /></span> Assistant
						</h2>
						<h4 className="scrollFade max-w-130 text-[18px] leading-[1.1]  lg:text-2xl z-40">
							Powerful automation for modern nursing facilities
						</h4>
						<p className="scrollFade max-w-130 text-white/90 z-40">
							Clinicians shift from &quot;data hunters&quot; to &quot;clinical validators&quot;, instantly verifying every prepopulated data point with a single click and a verifiable citation.
						</p>
					</div>
					<div className="scrollFade relative h-60 w-full overflow-hidden rounded-[40px] hidden lg:block lg:h-82.25">
						<Image alt="Nursing facility operations" className="object-cover" src={showcasePhoto} fill sizes="(min-width: 1024px) 33vw, 100vw" />
					</div>
				</div>
				<div className="scrollFade relative flex gap-4 min-h-130 w-full grow items-center justify-center overflow-hidden rounded-[40px] bg-light-blue p-6  lg:min-h-182.5 lg:p-10">
					<div className={`uploadContainer absolute inset-0 z-20 flex flex-col gap-12 items-center justify-center px-6 transition-opacity duration-500 ${stage === 'idle' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
						<h4>Click the button to experience how easy it is when using Medicipher</h4>
						<div
							onClick={startSimulation}
							className="group relative h-fit w-full max-w-68.75 cursor-pointer p-1.25 text-left transition-transform duration-300 hover:scale-[1.02]"
						>
							<div className="rounded-[25px] bg-white px-5 py-4 cursor-pointer">
								<div className="mb-4 min-h-12.5">
									<p className="text-[14px] font-bold text-[#161718]">Simulated Upload Document</p>
									<p className="text-[14px] font-bold text-red-500">*This is just for sample</p>
								</div>
								<div className="flex min-h-30 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-pale-blue/30 p-2 text-center text-primary">
									<span className="font-['Material_Symbols_Outlined'] text-[30px] leading-none">upload</span>
									<p className="text-[14px] font-medium">Drop files or click</p>
								</div>
							</div>
						</div>
					</div>
					<div className="relative flex h-full w-full items-center justify-center">
						<div className={`absolute inset-0 transition-opacity duration-500 ${stage === 'idle' ? 'opacity-0' : 'opacity-100'}`}>
							<Image alt="Sample document" className="h-full w-full" src={sampleDocument} sizes="100vw" fill style={{ position:'absolute', objectFit:'contain' }} />
						</div>
						<div className="relative z-10 h-screen lg:h-full w-full lg:max-h-160">
							{stage==='parsed'&&<Button onClick={()=>resetStage()} className="absolute right-4 bottom-4 z-50 flex items-center cursor-pointer">
									<span className="material-symbols-outlined">replay</span>
									<p>Restart</p>
								</Button>}
								<div
									className={`absolute inset-0 flex flex-col items-center rounded-[40px] border border-pale-blue bg-pale-blue p-8 transition-opacity duration-500 ${stage === 'parsed' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
								>
									<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-light-blue text-accent z-50">
										<span className="material-symbols-outlined">check_circle</span>
									</div>
									<h6 className="mb-4 text-[#161718]">MDS Assessment Parsed</h6>
									<p className="mb-6 max-w-none text-[20px] font-medium leading-[1.35] text-[#646465]">
										We&apos;ve successfully extracted the ICD-10 codes and reimbursement data. Ready to validate the HIPPS codes against the documentation.
									</p>
									<div className="flex flex-wrap gap-4">
										<div className="w-full rounded-3xl bg-white p-4 sm:w-[46%]">
											<p className="mb-2 text-[12px] font-bold uppercase text-[#8A8B8B]">Primary Diagnosis</p>
											<p className="mb-1 text-[18px] font-bold text-primary">I63.9</p>
											<p className="max-w-none text-[14px] font-normal text-[#161718]">Cerebral infarction, unspecified</p>
										</div>
										<div className="w-full rounded-3xl bg-white p-4 sm:w-[46%]">
											<p className="mb-2 text-[12px] font-bold uppercase text-[#8A8B8B]">HIPPS Code</p>
											<p className="mb-1 text-[18px] font-bold text-primary">PC2</p>
											<p className="max-w-none text-[14px] font-normal text-[#161718]">Nursing - Physical Care</p>
										</div>
										<div className="w-full rounded-3xl bg-white p-4 sm:w-[46%]">
											<p className="mb-2 text-[12px] font-bold uppercase text-[#8A8B8B]">MDS ARD</p>
											<p className="mb-1 text-[18px] font-bold text-primary">01/22/2026</p>
											<p className="max-w-none text-[14px] font-normal text-[#161718]">Assessment Reference Date</p>
										</div>
									</div>
								</div>

								{stage === 'processing' ? (
									<div className="absolute inset-0 w-full transition-opacity bg-white p-4 h-fit rounded-2xl duration-500 opacity-100">
										<ProcessingCopy />
										<div className="h-1.5 w-full overflow-hidden rounded-full bg-pale-blue">
											<div className="h-full w-full rounded-full bg-primary transition-all duration-5200 ease-linear" />
										</div>
									</div>
								) : null}
							</div>
					</div>
				</div>
			</div>
		</section>
	)
}
