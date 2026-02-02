'use client'

import React, { useEffect, useState, useRef } from 'react'

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Don't add script twice
    if (document.querySelector('script[src*="translate.google.com"]')) return

    const script = document.createElement('script')
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    document.body.appendChild(script)

    ;(window as any).googleTranslateElementInit = () => {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar,en',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_hidden'
        )
      }
    }

    return () => {
      const script = document.querySelector('script[src*="translate.google.com"]')
      if (script) script.remove()
    }
  }, [])

  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      // Don't close while applying a language
      if (isApplying) return
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('click', handleOutside)
    return () => document.removeEventListener('click', handleOutside)
  }, [isApplying])

  const setLanguage = (lang: 'ar' | 'en') => {
    setIsApplying(true)

    const trySet = (attempt = 0) => {
      const select = document.querySelector('#google_translate_hidden select') as HTMLSelectElement | null
      if (select) {
        select.value = lang
        select.dispatchEvent(new Event('change', { bubbles: true }))

        // Let Google process translation, then close menu
        setTimeout(() => {
          setIsOpen(false)
          setIsApplying(false)
        }, 800)
        return
      }

      // Retry a few times then give up
      if (attempt < 6) {
        if ((window as any).google && (window as any).google.translate) {
          ;(window as any).googleTranslateElementInit?.()
        }
        setTimeout(() => trySet(attempt + 1), 300)
        return
      }

      // Failed to find widget
      setIsApplying(false)
      // keep menu open so user can try again
    }

    trySet(0)
  }

  return (
    <div ref={wrapperRef} className="relative inline-block">
      <button
        aria-label="Language"
        aria-expanded={isOpen}
        title="Language / اللغة"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-1.5 py-0.5 border rounded text-xs bg-white shadow-sm hover:bg-gray-50 transition-colors"
      >
        <i className="fas fa-globe mr-1 text-xs"></i>
        <span className="text-xs">Language</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-md border border-gray-100 shadow-lg z-50">
          <button onClick={() => setLanguage('en')} disabled={isApplying} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${isApplying ? 'opacity-60 cursor-wait' : ''}`}>
            {isApplying ? 'Applying…' : 'English'}
          </button>
          <button onClick={() => setLanguage('ar')} disabled={isApplying} className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${isApplying ? 'opacity-60 cursor-wait' : ''}`}>
            {isApplying ? 'Applying…' : 'العربية'}
          </button>
        </div>
      )}

      {/* Hidden translate element - kept for functionality */}
      <div id="google_translate_hidden" className="hidden" />
    </div>
  )
}

