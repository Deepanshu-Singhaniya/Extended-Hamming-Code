"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HammingCodeVisualizer({ hammingCode, correctedCode, errorPosition, onBitClick, activeStep }) {
  const isPowerOfTwo = (n) => {
    return n > 0 && (n & (n - 1)) === 0
  }

  const getBitType = (index) => {
    const position = index + 1
    if (isPowerOfTwo(position)) {
      return "parity"
    }
    return "data"
  }

  const getBitTooltip = (index) => {
    const position = index + 1
    const bitType = getBitType(index)

    if (bitType === "parity") {
      return `Parity Bit P${position}`
    }
    return `Data Bit at position ${position}`
  }

  const getBitColor = (index, value, isOriginal = false) => {
    const position = index + 1
    const bitType = getBitType(index)

    // Highlight error position
    if (!isOriginal && index === errorPosition) {
      return "bg-red-500 border-red-700"
    }

    // Highlight bits being checked in step 2
    if (activeStep === 1 && !isOriginal) {
      return "bg-yellow-500/50 border-yellow-700"
    }

    // Highlight corrected bit in step 3
    if (activeStep === 3 && index === errorPosition && !isOriginal) {
      return "bg-green-500 border-green-700"
    }

    if (bitType === "parity") {
      return "bg-cyan-500/70 border-cyan-700"
    }

    return "bg-purple-500/70 border-purple-700"
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Original Hamming Code</h3>
          <div className="flex flex-wrap gap-2">
            {hammingCode.map((bit, index) => (
              <TooltipProvider key={`original-${index}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-md border-2 font-mono text-black cursor-default",
                        getBitColor(index, bit, true),
                      )}
                    >
                      {bit}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getBitTooltip(index)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-purple-500/70 border border-purple-700"></div>
              <span className="text-xs text-gray-400">Data Bit</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-cyan-500/70 border border-cyan-700"></div>
              <span className="text-xs text-gray-400">Parity Bit</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">
            {errorPosition !== null ? "Modified Code (with error)" : "Click a bit to introduce an error"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {correctedCode.map((bit, index) => (
              <TooltipProvider key={`modified-${index}`}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onBitClick(index)}
                      className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-md border-2 font-mono text-black cursor-pointer",
                        getBitColor(index, bit),
                      )}
                    >
                      {bit}
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getBitTooltip(index)}</p>
                    <p className="text-xs">Click to flip this bit</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
          <div className="flex gap-4 mt-2">
            {errorPosition !== null && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-700"></div>
                <span className="text-xs text-gray-400">Error Bit</span>
              </div>
            )}
            {activeStep === 3 && errorPosition !== null && (
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-700"></div>
                <span className="text-xs text-gray-400">Corrected Bit</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

