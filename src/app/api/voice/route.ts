import { NextResponse } from "next/server"
import twilio from "twilio"  

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const step = searchParams.get("step") || "welcome"

  const body = await req.text()
  const params = new URLSearchParams(body)
  const speech = params.get("SpeechResult")

  console.log("STEP:", step)
  console.log("SPEECH:", speech)

  const VoiceResponse = twilio.twiml.VoiceResponse
  const voiceResponse = new VoiceResponse()

  if (step === "welcome") {
    const gather = voiceResponse.gather({
      input: ["speech"],
      action: "/api/voice?step=name",
      method: "POST",
    })
    gather.say("Welcome to the AI Call Center. Please tell us your full name after the beep.")
  } else if (step === "name") {
    const gather = voiceResponse.gather({
      input: ["speech"],
      action: "/api/voice?step=age",
      method: "POST",
    })
    gather.say("Thank you. Now please tell us your age.")
  } else if (step === "age") {
    voiceResponse.say("Thank you. Please hold while we transfer you to a human agent.")
    voiceResponse.dial("+919152653034") 
  } else {
    voiceResponse.say("Sorry, something went wrong. Goodbye.")
    voiceResponse.hangup()
  }

  return new NextResponse(voiceResponse.toString(), {
    headers: { "Content-Type": "text/xml" },
  })
}