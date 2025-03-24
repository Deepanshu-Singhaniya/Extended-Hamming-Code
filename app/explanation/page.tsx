import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, ExternalLink } from "lucide-react"

export default function ExplanationPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Understanding Hamming Code
          </h1>

          <div className="prose prose-invert max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">What is Hamming Code?</h2>
              <p className="text-gray-400 mb-4">
                Hamming code is a set of error-correction codes that can detect and correct errors that may occur when
                data is stored or transmitted. It was developed by Richard Hamming at Bell Telephone Laboratories in the
                1940s.
              </p>
              <p className="text-gray-400 mb-4">
                The key innovation of Hamming code is its ability to not only detect errors (like parity bits) but also
                to correct them. Specifically, Hamming codes can:
              </p>
              <ul className="list-disc pl-6 text-gray-400 mb-6 space-y-2">
                <li>Detect up to two-bit errors</li>
                <li>Correct single-bit errors</li>
              </ul>

              <Card className="bg-purple-950/20 border-purple-500/30 mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                      <img src="/placeholder.svg?height=96&width=96" alt="Richard Hamming" className="rounded-full" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Richard Hamming (1915-1998)</h3>
                      <p className="text-gray-400">
                        Richard Hamming was an American mathematician who worked at Bell Telephone Laboratories. He made
                        significant contributions to computer science and telecommunications, including the development
                        of Hamming codes. His work on error detection and correction was crucial for the reliability of
                        digital systems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">How Hamming Code Works</h2>

              <h3 className="text-xl font-bold mb-3 text-white">1. Determining Parity Bits</h3>
              <p className="text-gray-400 mb-4">
                For m data bits, we need r parity bits where 2^r ≥ m + r + 1. These parity bits are placed at positions
                that are powers of 2 (1, 2, 4, 8, etc.).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Example: 4-bit data (1011)</h4>
                  <p className="text-sm text-gray-400">For 4 data bits, we need 3 parity bits (2^3 ≥ 4 + 3 + 1).</p>
                  <div className="mt-4 grid grid-cols-7 gap-2">
                    <div className="text-center text-xs text-gray-400">Position</div>
                    <div className="text-center text-xs text-gray-400">1</div>
                    <div className="text-center text-xs text-gray-400">2</div>
                    <div className="text-center text-xs text-gray-400">3</div>
                    <div className="text-center text-xs text-gray-400">4</div>
                    <div className="text-center text-xs text-gray-400">5</div>
                    <div className="text-center text-xs text-gray-400">6</div>
                    <div className="text-center text-xs text-gray-400">7</div>

                    <div className="text-center text-xs text-gray-400">Bit Type</div>
                    <div className="text-center text-xs text-cyan-400">P1</div>
                    <div className="text-center text-xs text-cyan-400">P2</div>
                    <div className="text-center text-xs text-purple-400">D1</div>
                    <div className="text-center text-xs text-cyan-400">P4</div>
                    <div className="text-center text-xs text-purple-400">D2</div>
                    <div className="text-center text-xs text-purple-400">D3</div>
                    <div className="text-center text-xs text-purple-400">D4</div>

                    <div className="text-center text-xs text-gray-400">Value</div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-cyan-500/70 border border-cyan-700 font-mono text-black text-xs">
                      ?
                    </div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-cyan-500/70 border border-cyan-700 font-mono text-black text-xs">
                      ?
                    </div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-purple-500/70 border border-purple-700 font-mono text-black text-xs">
                      1
                    </div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-cyan-500/70 border border-cyan-700 font-mono text-black text-xs">
                      ?
                    </div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-purple-500/70 border border-purple-700 font-mono text-black text-xs">
                      0
                    </div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-purple-500/70 border border-purple-700 font-mono text-black text-xs">
                      1
                    </div>
                    <div className="w-6 h-6 mx-auto flex items-center justify-center rounded-md bg-purple-500/70 border border-purple-700 font-mono text-black text-xs">
                      1
                    </div>
                  </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-white mb-2">Parity Bit Coverage</h4>
                  <p className="text-sm text-gray-400 mb-4">Each parity bit checks specific data bits:</p>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>
                      <span className="text-cyan-400">P1</span> (position 1): Checks bits 1, 3, 5, 7, 9, 11, ...
                    </li>
                    <li>
                      <span className="text-cyan-400">P2</span> (position 2): Checks bits 2, 3, 6, 7, 10, 11, ...
                    </li>
                    <li>
                      <span className="text-cyan-400">P4</span> (position 4): Checks bits 4, 5, 6, 7, 12, 13, ...
                    </li>
                    <li>
                      <span className="text-cyan-400">P8</span> (position 8): Checks bits 8, 9, 10, 11, 12, 13, ...
                    </li>
                  </ul>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">2. Calculating Parity Values</h3>
              <p className="text-gray-400 mb-6">
                Each parity bit is set to ensure that the total number of 1s in its coverage (including itself) is even
                (for even parity) or odd (for odd parity). In our implementation, we use even parity.
              </p>

              <h3 className="text-xl font-bold mb-3 text-white">3. Error Detection</h3>
              <p className="text-gray-400 mb-4">
                When data is received, we recalculate the parity bits. If any parity bit is incorrect, we can determine
                the position of the error by adding up the positions of the incorrect parity bits.
              </p>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-medium text-white mb-2">Error Detection Example</h4>
                <p className="text-sm text-gray-400 mb-4">
                  If parity bits P1 and P4 are incorrect, the error is at position 1 + 4 = 5.
                </p>
                <div className="grid grid-cols-7 gap-2">
                  <div className="text-center text-xs text-gray-400">Position</div>
                  <div className="text-center text-xs text-gray-400">1</div>
                  <div className="text-center text-xs text-gray-400">2</div>
                  <div className="text-center text-xs text-gray-400">3</div>
                  <div className="text-center text-xs text-gray-400">4</div>
                  <div className="text-center text-xs text-gray-400">5</div>
                  <div className="text-center text-xs text-gray-400">6</div>
                  <div className="text-center text-xs text-gray-400">7</div>

                  <div className="text-center text-xs text-gray-400">Bit Type</div>
                  <div className="text-center text-xs text-red-400">P1 ✗</div>
                  <div className="text-center text-xs text-green-400">P2 ✓</div>
                  <div className="text-center text-xs text-purple-400">D1</div>
                  <div className="text-center text-xs text-red-400">P4 ✗</div>
                  <div className="text-center text-xs text-red-400">D2 ✗</div>
                  <div className="text-center text-xs text-purple-400">D3</div>
                  <div className="text-center text-xs text-purple-400">D4</div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white">4. Error Correction</h3>
              <p className="text-gray-400 mb-4">
                Once we know the position of the error, we can correct it by flipping the bit at that position.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Applications of Hamming Code</h2>
              <p className="text-gray-400 mb-4">
                Hamming codes are used in various applications where data integrity is crucial:
              </p>
              <ul className="list-disc pl-6 text-gray-400 mb-6 space-y-2">
                <li>Computer memory (ECC RAM)</li>
                <li>Digital communication systems</li>
                <li>Data storage devices</li>
                <li>Satellite communications</li>
                <li>Deep space communications</li>
              </ul>

              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Extended Hamming Code</h3>
                <p className="text-gray-400 mb-4">
                  Extended Hamming code adds an additional parity bit to the standard Hamming code, allowing it to
                  detect up to two-bit errors and correct single-bit errors.
                </p>
                <p className="text-gray-400">
                  This is particularly useful in applications where data integrity is critical, such as in
                  mission-critical systems or where retransmission is costly or impossible.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">Try It Yourself</h2>
              <p className="text-gray-400 mb-6">
                The best way to understand Hamming code is to see it in action. Try our interactive demo to experiment
                with encoding, error introduction, and correction.
              </p>

              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
              >
                <Link href="/demo">
                  Try Interactive Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-white">Additional Resources</h2>
              <p className="text-gray-400 mb-6">
                If you want to learn more about Hamming code and error correction in general, check out these resources:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a
                  href="https://en.wikipedia.org/wiki/Hamming_code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                    Wikipedia: Hamming Code
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    Comprehensive information about Hamming codes, their history, and applications.
                  </p>
                </a>

                <a
                  href="https://github.com/harryli0088/hamming-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                    Original GitHub Repository
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    The source code for the reference implementation that inspired this interactive website.
                  </p>
                </a>

                <a
                  href="https://www.youtube.com/watch?v=X8jsijhllIA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                    3Blue1Brown: Hamming Codes
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">An excellent visual explanation of how Hamming codes work.</p>
                </a>

                <a
                  href="https://www.cs.cmu.edu/~guyb/realworld/reedsolomon/reed_solomon_codes.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 hover:bg-purple-900/30 transition-colors"
                >
                  <h3 className="text-lg font-bold text-white mb-2 flex items-center">
                    Reed-Solomon Codes
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </h3>
                  <p className="text-sm text-gray-400">
                    Learn about Reed-Solomon codes, which are more powerful error-correcting codes used in many modern
                    applications.
                  </p>
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

