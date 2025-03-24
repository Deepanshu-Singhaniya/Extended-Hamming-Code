"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, Circle } from "lucide-react"

export default function StepByStepExplanation({ inputData, hammingCode, correctedCode, errorPosition, activeStep }) {
  const steps = [
    {
      title: "Encoding Data with Hamming Code",
      description:
        errorPosition === null
          ? "The original data has been encoded with Hamming code. Click on any bit in the visualization to introduce an error."
          : "An error has been introduced at position " +
            (errorPosition + 1) +
            ". Click 'Detect & Correct Error' to see the error correction process.",
    },
    {
      title: "Calculating Syndrome",
      description: "Recalculating parity bits to detect if an error exists and determine its location.",
    },
    {
      title: "Error Detection",
      description:
        errorPosition !== null
          ? `Error detected at position ${errorPosition + 1}. The syndrome calculation identified the error location.`
          : "No error was detected in the Hamming code.",
    },
    {
      title: "Error Correction",
      description:
        errorPosition !== null
          ? `The error at position ${errorPosition + 1} has been corrected by flipping the bit.`
          : "No correction needed as no error was detected.",
    },
  ]

  // Calculate the number of parity bits and data bits
  const calculateBitDetails = () => {
    if (!hammingCode.length) return { parityBits: 0, dataBits: 0 }

    const totalBits = hammingCode.length
    let parityBits = 0

    for (let i = 0; i < totalBits; i++) {
      if (isPowerOfTwo(i + 1)) {
        parityBits++
      }
    }

    return {
      parityBits,
      dataBits: totalBits - parityBits,
    }
  }

  const isPowerOfTwo = (n) => {
    return n > 0 && (n & (n - 1)) === 0
  }

  const { parityBits, dataBits } = calculateBitDetails()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-2">Input Data</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {inputData.split("").map((bit, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-purple-500/70 border-2 border-purple-700 font-mono text-black"
              >
                {bit}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400">Original binary data: {inputData}</p>
        </div>

        <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
          <h3 className="text-sm font-medium text-white mb-2">Hamming Code Details</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">Data bits:</span> {dataBits}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">Parity bits:</span> {parityBits}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">Total bits:</span> {hammingCode.length}
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">Error detection:</span> Single-bit errors
            </p>
            <p className="text-sm text-gray-400">
              <span className="font-medium text-white">Error correction:</span> Single-bit errors
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Process Steps</h3>
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "flex gap-4 p-4 rounded-lg border transition-colors",
                activeStep === index
                  ? "bg-purple-900/30 border-purple-500"
                  : activeStep > index
                    ? "bg-purple-950/20 border-purple-500/30"
                    : "bg-purple-950/10 border-purple-500/20",
              )}
            >
              <div className="flex-shrink-0 mt-1">
                {activeStep > index ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : activeStep === index ? (
                  <div className="h-5 w-5 rounded-full bg-purple-500 animate-pulse" />
                ) : (
                  <Circle className="h-5 w-5 text-gray-500" />
                )}
              </div>
              <div>
                <h4 className="font-medium text-white">{step.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{step.description}</p>

                {index === 1 && activeStep >= 1 && (
                  <div className="mt-2 p-2 bg-black/30 rounded border border-purple-500/20 text-xs text-gray-400">
                    <p className="font-mono">
                      Syndrome calculation: Checking each parity bit position to detect errors...
                    </p>
                  </div>
                )}

                {index === 2 && activeStep >= 2 && errorPosition !== null && (
                  <div className="mt-2 p-2 bg-black/30 rounded border border-purple-500/20 text-xs text-gray-400">
                    <p className="font-mono">
                      Error syndrome: {errorPosition + 1} (binary:{" "}
                      {(errorPosition + 1).toString(2).padStart(parityBits, "0")})
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

