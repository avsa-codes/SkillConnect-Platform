"use client"

import { useEffect, useState } from "react"

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showInstall, setShowInstall] = useState(false)

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstall(true)
    })
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setShowInstall(false)
  }

  if (!showInstall) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-5 py-3 rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <span>Install SkillConnect App</span>
        <button
          onClick={handleInstall}
          className="bg-white text-orange-500 px-3 py-1 rounded"
        >
          Install
        </button>
      </div>
    </div>
  )
}