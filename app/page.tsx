import Link from "next/link"
import { ArrowRight, Code2, BookOpen, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/30 rounded-full blur-[100px]"></div>
          <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-[100px]"></div>
        </div>

        <div className="container relative z-10 px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="inline-block px-6 py-2 border border-purple-500 rounded-full text-purple-400 text-sm font-medium mb-4 bg-purple-500/10">
              Error Detection & Correction
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Hamming Code
            </h1>
            <p className="max-w-[700px] text-gray-400 md:text-xl">
              Discover how Hamming codes detect and correct errors in data transmission through interactive
              demonstrations and detailed explanations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                <Link href="/demo">
                  Try Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
                <Link href="/explanation">
                  Learn the Theory <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-24 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code2 className="h-10 w-10 text-purple-400" />}
            title="Interactive Coding"
            description="Input binary data and see how Hamming code is generated. Flip bits to simulate errors and watch the correction process in action."
          />
          <FeatureCard
            icon={<BookOpen className="h-10 w-10 text-cyan-400" />}
            title="Comprehensive Theory"
            description="Understand the mathematical principles behind Hamming codes, including how parity bits work and how errors are detected."
          />
          <FeatureCard
            icon={<Home className="h-10 w-10 text-purple-400" />}
            title="Historical Context"
            description="Learn about Richard Hamming and how his groundbreaking work on error correction codes revolutionized digital communications."
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-to-b from-black to-purple-950/20 py-24">
        <div className="container px-4 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            How Hamming Code Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Step number={1} title="Add Parity Bits">
                Insert parity bits at positions that are powers of 2 (1, 2, 4, 8, etc.)
              </Step>
              <Step number={2} title="Calculate Parity Values">
                Each parity bit checks specific data bits based on its position
              </Step>
              <Step number={3} title="Detect Errors">
                When data is received, recalculate parity bits to find error location
              </Step>
              <Step number={4} title="Correct Errors">
                Flip the bit at the error location to correct the data
              </Step>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-xl p-6 relative">
              <div className="grid grid-cols-8 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center rounded-md text-sm font-mono ${i === 3 ? "bg-cyan-500 text-black" : "bg-purple-900/50 border border-purple-500/30"}`}
                  >
                    {i === 0 ? "P1" : i === 1 ? "P2" : i === 3 ? "X" : i === 7 ? "P8" : i + 1}
                  </div>
                ))}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i + 8}
                    className="aspect-square flex items-center justify-center rounded-md text-sm font-mono bg-purple-900/50 border border-purple-500/30"
                  >
                    {i + 9}
                  </div>
                ))}
              </div>
              <div className="absolute -top-3 -right-3 bg-cyan-500 text-black text-xs px-2 py-1 rounded-full">
                Error at bit 4
              </div>
              <div className="mt-4 text-sm text-gray-400 text-center">
                Visual representation of a Hamming code with an error
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 py-24 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
          Ready to Explore Hamming Code?
        </h2>
        <p className="max-w-[600px] mx-auto text-gray-400 mb-8">
          Jump into our interactive demo to see Hamming code in action or dive into the detailed explanations to
          understand the theory.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
          >
            <Link href="/demo">
              Try Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
            <Link href="/explanation">
              Learn the Theory <BookOpen className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-6 hover:bg-purple-900/20 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

function Step({ number, title, children }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-black font-bold">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400">{children}</p>
      </div>
    </div>
  )
}

