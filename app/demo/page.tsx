"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Slider } from "@/components/ui/slider"
import { AlertTriangle, CheckCircle, RefreshCw, HelpCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import HammingCodeVisualizer from "@/components/hamming-code-visualizer"
import StepByStepExplanation from "@/components/step-by-step-explanation"

export default function DemoPage() {
  const [inputData, setInputData] = useState("1011")
  const [hammingCode, setHammingCode] = useState([])
  const [errorPosition, setErrorPosition] = useState(null)
  const [correctedCode, setCorrectedCode] = useState([])
  const [errorDetected, setErrorDetected] = useState(false)
  const [errorCorrected, setErrorCorrected] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [isAnimating, setIsAnimating] = useState(false)

  // Calculate Hamming code when input data changes
  useEffect(() => {
    if (inputData.match(/^[01]+$/)) {
      const data = inputData.split("").map((bit) => Number.parseInt(bit))
      const code = calculateHammingCode(data)
      setHammingCode(code)
      setCorrectedCode([...code])
      setErrorPosition(null)
      setErrorDetected(false)
      setErrorCorrected(false)
      setActiveStep(0)
    }
  }, [inputData])

  // Function to calculate Hamming code
  const calculateHammingCode = (data) => {
    // Determine number of parity bits needed (2^r >= m + r + 1)
    const m = data.length
    let r = 1
    while (Math.pow(2, r) < m + r + 1) {
      r++
    }

    // Initialize Hamming code array with zeros
    const hammingLength = m + r
    const hammingCode = Array(hammingLength).fill(0)

    // Place data bits in non-parity positions
    let dataIndex = 0
    for (let i = 0; i < hammingLength; i++) {
      // Skip parity bit positions (powers of 2)
      if (!isPowerOfTwo(i + 1)) {
        hammingCode[i] = data[dataIndex]
        dataIndex++
      }
    }

    // Calculate parity bits
    for (let i = 0; i < r; i++) {
      const parityPos = Math.pow(2, i) - 1
      let parity = 0

      // Check bits that include this parity bit in their coverage
      for (let j = parityPos; j < hammingLength; j++) {
        if ((j + 1) & (parityPos + 1)) {
          // Bitwise AND to check if position j+1 includes parity bit 2^i
          parity ^= hammingCode[j] // XOR operation for even parity
        }
      }

      hammingCode[parityPos] = parity
    }

    return hammingCode
  }

  // Function to check if a number is a power of 2
  const isPowerOfTwo = (n) => {
    return n > 0 && (n & (n - 1)) === 0
  }

  // Function to introduce an error at a specific position
  const introduceError = (position) => {
    if (position >= 0 && position < hammingCode.length) {
      const newCode = [...hammingCode]
      newCode[position] = newCode[position] === 0 ? 1 : 0 // Flip the bit
      setCorrectedCode(newCode)
      setErrorPosition(position)
      setErrorDetected(false)
      setErrorCorrected(false)
      setActiveStep(0)
    }
  }

  // Function to detect and correct errors
  const detectAndCorrectError = async () => {
    setIsAnimating(true)
    setActiveStep(1)

    // Simulate processing time for animation
    await new Promise((resolve) => setTimeout(resolve, 1000 / animationSpeed))

    // Calculate syndrome (error position)
    let errorPos = 0
    const r = Math.log2(hammingCode.length + 1)

    for (let i = 0; i < r; i++) {
      const parityPos = Math.pow(2, i) - 1
      let parity = 0

      for (let j = 0; j < correctedCode.length; j++) {
        if ((j + 1) & (parityPos + 1)) {
          parity ^= correctedCode[j]
        }
      }

      if (parity !== 0) {
        errorPos += Math.pow(2, i)
      }
    }

    setErrorDetected(errorPos > 0)
    setActiveStep(2)

    // Simulate processing time for animation
    await new Promise((resolve) => setTimeout(resolve, 1000 / animationSpeed))

    // Correct the error if detected
    if (errorPos > 0) {
      const newCode = [...correctedCode]
      newCode[errorPos - 1] = newCode[errorPos - 1] === 0 ? 1 : 0 // Flip the bit
      setCorrectedCode(newCode)
      setErrorCorrected(true)
    }

    setActiveStep(3)
    setIsAnimating(false)
  }

  // Function to reset the demo
  const resetDemo = () => {
    setCorrectedCode([...hammingCode])
    setErrorPosition(null)
    setErrorDetected(false)
    setErrorCorrected(false)
    setActiveStep(0)
  }

  // Function to generate random input data
  const generateRandomData = () => {
    const length = Math.floor(Math.random() * 8) + 4 // Random length between 4 and 11
    let randomData = ""
    for (let i = 0; i < length; i++) {
      randomData += Math.round(Math.random()).toString()
    }
    setInputData(randomData)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Interactive Hamming Code Demo
          </h1>

          <p className="text-gray-400 mb-8">
            This interactive demo allows you to experiment with Hamming code. Input your binary data, introduce errors,
            and see how Hamming code can detect and correct them.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-1 bg-purple-950/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Input Data
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Enter binary data (0s and 1s) to encode using Hamming code</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <CardDescription>Enter binary data (0s and 1s)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={inputData}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^01]/g, "")
                        setInputData(value)
                      }}
                      placeholder="e.g., 1011"
                      className="bg-purple-900/20 border-purple-500/30 focus-visible:ring-purple-500"
                    />
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                      onClick={generateRandomData}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Random
                    </Button>
                  </div>

                  <div>
                    <p className="text-sm text-gray-400 mb-2">Animation Speed</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs">Slow</span>
                      <Slider
                        value={[animationSpeed]}
                        min={0.5}
                        max={2}
                        step={0.5}
                        onValueChange={(value) => setAnimationSpeed(value[0])}
                        className="flex-1"
                      />
                      <span className="text-xs">Fast</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2 bg-purple-950/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Hamming Code Visualization
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">Click on any bit to introduce an error and test error correction</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </CardTitle>
                <CardDescription>Click on any bit to introduce an error</CardDescription>
              </CardHeader>
              <CardContent>
                <HammingCodeVisualizer
                  hammingCode={hammingCode}
                  correctedCode={correctedCode}
                  errorPosition={errorPosition}
                  onBitClick={introduceError}
                  activeStep={activeStep}
                />

                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <Button
                    onClick={detectAndCorrectError}
                    disabled={isAnimating}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                  >
                    Detect & Correct Error
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetDemo}
                    disabled={isAnimating}
                    className="border-purple-500 text-purple-400 hover:bg-purple-500/10"
                  >
                    Reset Demo
                  </Button>
                </div>

                {errorDetected && (
                  <Alert className="mt-4 bg-yellow-900/20 border-yellow-500/30">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <AlertTitle>Error Detected!</AlertTitle>
                    <AlertDescription>An error was detected at position {errorPosition + 1}.</AlertDescription>
                  </Alert>
                )}

                {errorCorrected && (
                  <Alert className="mt-4 bg-green-900/20 border-green-500/30">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <AlertTitle>Error Corrected!</AlertTitle>
                    <AlertDescription>The error has been successfully corrected.</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="explanation" className="mb-12">
            <TabsList className="bg-purple-950/20 border border-purple-500/30">
              <TabsTrigger value="explanation">Step-by-Step Explanation</TabsTrigger>
              <TabsTrigger value="details">Technical Details</TabsTrigger>
            </TabsList>
            <TabsContent value="explanation" className="mt-4">
              <Card className="bg-purple-950/20 border-purple-500/30">
                <CardContent className="pt-6">
                  <StepByStepExplanation
                    inputData={inputData}
                    hammingCode={hammingCode}
                    correctedCode={correctedCode}
                    errorPosition={errorPosition}
                    activeStep={activeStep}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <Card className="bg-purple-950/20 border-purple-500/30">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">How Hamming Code Works</h3>
                    <p className="text-gray-400">
                      Hamming code is a set of error-correction codes that can detect and correct single-bit errors.
                      Here's how it works:
                    </p>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">1. Determining Parity Bits</h4>
                      <p className="text-gray-400">
                        For m data bits, we need r parity bits where 2^r ≥ m + r + 1. These parity bits are placed at
                        positions that are powers of 2 (1, 2, 4, 8, etc.).
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">2. Calculating Parity Values</h4>
                      <p className="text-gray-400">
                        Each parity bit checks specific data bits based on its position. For example, parity bit 1
                        checks bits 1, 3, 5, 7, etc. Parity bit 2 checks bits 2, 3, 6, 7, etc.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">3. Error Detection</h4>
                      <p className="text-gray-400">
                        When data is received, we recalculate the parity bits. If any parity bit is incorrect, we can
                        determine the position of the error by adding up the positions of the incorrect parity bits.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-white">4. Error Correction</h4>
                      <p className="text-gray-400">
                        Once we know the position of the error, we can correct it by flipping the bit at that position.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

