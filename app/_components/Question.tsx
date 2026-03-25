'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Pluggable } from 'unified'

const remarkPlugins: Pluggable[] = [remarkGfm as unknown as Pluggable]

interface QuestionProps {
  fixed?: boolean
  isClosing?: boolean
  onClose?: () => void
  isOpen: boolean
}

export default function Question({ fixed = false, isClosing = false, onClose, isOpen }: QuestionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const animateOpen = useCallback(() => {
    if (!sectionRef.current) return
    gsap.fromTo(
      sectionRef.current,
      { y: 24, autoAlpha: 0, scale: 0.97, filter: 'blur(8px)' },
      { y: 0, autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
    )
  }, [])

  const animateClose = useCallback(() => {
    if (!sectionRef.current) {
      onClose?.()
      return
    }
    gsap.to(sectionRef.current, {
      y: 24,
      autoAlpha: 0,
      scale: 0.97,
      filter: 'blur(8px)',
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        onClose?.()
      },
    })
  }, [onClose])

  useEffect(() => {
    animateOpen()
  }, [animateOpen])

  useEffect(() => {
    if (isClosing) {
      animateClose()
    }
  }, [isClosing, animateClose])

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const playbackTimeoutRef = useRef<number | null>(null)

  const [prompt, setPrompt] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const clearPlaybackTimeout = () => {
    if (playbackTimeoutRef.current !== null) {
      window.clearTimeout(playbackTimeoutRef.current)
      playbackTimeoutRef.current = null
    }
  }

  const handleClose = () => {
    animateClose()
  }

  const submitPrompt = async () => {
    if (!prompt.trim()) {
      setError('Please enter a question.')
      return
    }

    setIsSubmitting(true)
    setAiResponse('')
    setError(null)

    try {
      const response = await fetch('/api/groq-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: currentDone } = await reader.read()
        done = currentDone
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          setAiResponse((prev) => prev + chunk)
        }
      }
    } catch (err) {
      console.error('groq-chat streaming error', err)
      setError('Could not get response from AI. Try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitPrompt()
  }

  const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitPrompt()
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    clearPlaybackTimeout()

    if (isOpen) {
      video.currentTime = 0
      const playPromise = video.play()
      if (playPromise) {
        playPromise.catch((err) => {
          console.error('Error playing video on open:', err)
        })
      }

      playbackTimeoutRef.current = window.setTimeout(() => {
        if (!video.paused) {
          video.pause()
        }
        video.currentTime = Math.min(video.duration, 4)
        playbackTimeoutRef.current = null
      }, 4000)
    }

    return () => {
      clearPlaybackTimeout()
    }
  }, [isOpen])

  useGSAP(
    () => {
      if (!sectionRef.current) return
      gsap.fromTo(
        sectionRef.current.querySelectorAll('button'),
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    },
    { dependencies: [] }
  )

  const rootClass = fixed
    ? 'fixed bottom-6 left-1/2 z-30 w-full max-w-270 min-h-1/2 -translate-x-1/2 rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.24)] backdrop-blur-xl'
    : 'w-full bg-gradient-to-b from-white/80 via-white to-pale-blue py-14 md:py-20'

  return (
    <section ref={sectionRef} className={`${rootClass} rounded-[20px] p-6 relative`}>
      {(fixed && onClose) && (
        <div className="absolute right-6 top-6 z-50 mb-3 flex justify-end">
          <button onClick={handleClose} className="rounded-full border border-primary bg-white p-2 text-sm text-slate-700 hover:bg-slate-100">Close</button>
        </div>
      )}
      <div className="mx-auto flex w-full max-w-270 gap-8 px-2 md:px-0">
        <div className="flex flex-col flex-1">
            <form onSubmit={handleSubmit} className='space-y-2'>
              <label className='rounded-md border border-primary p-2 flex items-start gap-2'>
                <span className='material-symbols-outlined text-primary'>bubble_chart</span>
                <textarea
                  ref={inputRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleTextareaKeyDown}
                  className='outline-none w-full'
                  placeholder='What do you want to ask us? (Enter to submit, Shift+Enter for newline)'
                />
              </label>

              <div className='flex items-center gap-2'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='rounded-md bg-primary px-4 py-2 text-white disabled:opacity-50'
                >
                  {isSubmitting ? 'Generating...' : 'Submit'}
                </button>
              </div>

              <div className='rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-700 min-h-[120px]'>
                {error ? (
                  <p className='text-red-500'>{error}</p>
                ) : aiResponse ? (
                  <ReactMarkdown remarkPlugins={remarkPlugins} className='prose prose-slate leading-relaxed whitespace-pre-wrap'>
                    {aiResponse}
                  </ReactMarkdown>
                ) : (
                  <p className='text-slate-400'>AI response will stream here after submit.</p>
                )}
              </div>
            </form>
          </div>

        <div className="flex-1">
          <video ref={videoRef} controls={false} muted className='mix-blend-multiply'>
            <source src={'/media/video/Teddy_Bear_Animation_Sequence.mp4'} type='video/mp4'/>
          </video>
        </div>
      </div>
    </section>
  )
}

