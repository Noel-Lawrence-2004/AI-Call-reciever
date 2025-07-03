"use client"

import Component from "@/dashboard"
import VoiceSimulator from "@/components/VoiceSimulator"

export default function Home() {
  return (
    <main className="p-4">
      <Component />
      <VoiceSimulator />
    </main>
  )
}