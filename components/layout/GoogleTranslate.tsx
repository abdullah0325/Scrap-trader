'use client'

import { useEffect } from 'react'

export default function GoogleTranslate() {
  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="translate.google.com"]')) {
      return
    }

    // Add Google Translate script
    const addScript = () => {
      const script = document.createElement('script')
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
      script.async = true
      document.body.appendChild(script)
    }

    // Initialize Google Translate
    ;(window as any).googleTranslateElementInit = () => {
      if ((window as any).google && (window as any).google.translate) {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'ar,en,fr,es,de,it,pt,ru,zh,ja,ko',
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          'google_translate_element'
        )
      }
    }

    addScript()

    return () => {
      // Cleanup
      const script = document.querySelector('script[src*="translate.google.com"]')
      if (script) {
        script.remove()
      }
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        id="google_translate_element"
        className="bg-white rounded-lg shadow-lg p-2 border border-gray-200"
      ></div>
    </div>
  )
}

