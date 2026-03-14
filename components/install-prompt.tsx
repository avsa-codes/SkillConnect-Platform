"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

export default function InstallPrompt() {
  const [prompt, setPrompt] = useState<any>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setPrompt(e)
      setVisible(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const installApp = async () => {
    if (!prompt) return
    prompt.prompt()
    await prompt.userChoice
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-4 bg-white border shadow-xl rounded-xl px-5 py-3">

        {/* App icon */}
        <img
          src="/icon-192.png"
          className="w-8 h-8 rounded-md"
        />

        {/* Text */}
        <div className="text-sm">
          <p className="font-semibold text-gray-900">
            Install SkillConnect
          </p>
          <p className="text-gray-500 text-xs">
            Faster access to tasks
          </p>
        </div>

        {/* Install button */}
        <button
          onClick={installApp}
          className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-1.5 rounded-md"
        >
          Install
        </button>

        {/* Close button */}
        <button
          onClick={() => setVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>

      </div>
    </div>
  )
}