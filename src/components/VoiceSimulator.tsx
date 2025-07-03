"use client"

import { useState } from "react"

export default function VoiceSimulator() {
  const [step, setStep] = useState("welcome")
  const [conversation, setConversation] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleNext = async () => {
    const res = await fetch(`/api/voice?step=${step}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `SpeechResult=${inputValue}`
    })

    const text = await res.text()
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(text, "text/xml")
    const say = xmlDoc.getElementsByTagName("Say")

    let message = "..."

    if (say.length > 0) {
      message = say[0].textContent || "No message"
    }

    setConversation(prev => [...prev, `🧠: ${message}`])
    setInputValue("")

    if (step === "welcome") setStep("name")
    else if (step === "name") setStep("age")
    else if (step === "age") setStep("done")
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded-xl shadow">
      <h2 className="text-xl font-bold">AI Call Center Simulator</h2>

      <div className="space-y-2">
        {conversation.map((line, idx) => (
          <div key={idx} className="bg-gray-100 rounded px-3 py-1 text-sm">{line}</div>
        ))}
      </div>

      {step !== "done" ? (
        <div className="flex gap-2 items-center">
          <input
            className="border px-2 py-1 rounded w-full"
            placeholder={step === "welcome" ? "Say something..." : step === "name" ? "Enter name" : "Enter age"}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-1 rounded"
          >
            Send
          </button>
        </div>
      ) : (
        <div className="text-green-600 font-semibold">Call transferred to agent.</div>
      )}
    </div>
  )
}
