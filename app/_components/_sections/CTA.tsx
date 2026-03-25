'use client'
import { useGSAP } from "@gsap/react";
import Button from "../Button";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";
import { FormEvent, useRef, useState } from "react";

type StatusType = 'success' | 'warning' | 'error'

export default function CTASection(){
    const ctaSectionRef = useRef(null)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<{ type: StatusType; message: string } | null>(null)

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const trimmedName = name.trim()
        const trimmedEmail = email.trim()

        if (!trimmedName || !trimmedEmail) {
            setStatus({
                type: 'warning',
                message: 'Please fill in both your name and work email.',
            })
            return
        }

        setIsSubmitting(true)
        setStatus(null)

        try {
            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: trimmedName,
                    email: trimmedEmail,
                }),
            })

            if (!response.ok) {
                const data = (await response.json().catch(() => null)) as { error?: string } | null
                setStatus({
                    type: 'error',
                    message: data?.error ?? 'Something went wrong. Please try again.',
                })
                return
            }

            setStatus({
                type: 'success',
                message: 'Thanks. We received your details and will reach out soon.',
            })
            setName('')
            setEmail('')
        } catch {
            setStatus({
                type: 'error',
                message: 'Unable to submit right now. Please try again in a moment.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const statusClassName = status?.type === 'success'
        ? 'border border-emerald-700/20 bg-emerald-100 text-emerald-800'
        : status?.type === 'warning'
            ? 'border border-amber-700/20 bg-amber-100 text-amber-900'
            : 'border border-red-700/20 bg-red-100 text-red-800'

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
        <section id="cta-section" ref={ctaSectionRef} className="flex w-full h-60vh flex-col lg:flex-row">
            <div className="flex w-full lg:w-1/2 flex-col justify-start bg-accent px-6 py-10">
                <span className="cta-title text-4xl md:text-[76px] leading-[1.1] font-semibold text-white lg:text-[96px]">
                    Ready to transform your facility management?
                </span>
            </div>
            <div className="flex w-full lg:w-1/2 flex-col gap-8 justify-between bg-light-blue px-6 py-10 lg:px-8 lg:py-12">
                <p className="text-[24px] font-semibold leading-none lg:text-[36px]">
                    Our comprehensive suite of tools help you manage the documentation and finances of your nursing facility.
                </p>
                <div className="mt-8 w-full rounded-[40px] bg-pale-blue lg:mt-0">
                    <form className="flex flex-col gap-8 px-6 py-8" onSubmit={handleSubmit}>
                        <input
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            name="name"
                            className="w-full min-w-0 border-b border-(--color-navy) bg-transparent pb-2 text-[18px] font-medium text-(--color-navy) outline-none placeholder:text-(--color-navy)/60 lg:text-[20px]"
                            placeholder="Full name"
                            type="text"
                            autoComplete="name"
                            required
                        />
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            name="email"
                            className="w-full min-w-0 border-b border-(--color-navy) bg-transparent pb-2 text-[18px] font-medium text-(--color-navy) outline-none placeholder:text-(--color-navy)/60 lg:text-[20px]"
                            placeholder="Work email"
                            type="email"
                            autoComplete="email"
                            required
                        />
                        <div className="flex justify-center pt-4">
                            <Button className=" cursor-pointer" disabled={isSubmitting} type="submit">
                                {isSubmitting ? 'Submitting...' : 'Get your FREE trial'}
                            </Button>
                        </div>
                        {status ? (
                            <p className={`rounded-xl px-4 py-2 text-center text-sm font-medium ${statusClassName}`}>
                                {status.message}
                            </p>
                        ) : null}
                    </form>
                </div>
            </div>
        </section>
    )
}