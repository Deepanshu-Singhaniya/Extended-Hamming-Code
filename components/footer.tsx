import Link from "next/link"
import { Code2, Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-black text-gray-400">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 className="h-6 w-6 text-purple-400" />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Hamming Code
              </span>
            </Link>
            <p className="text-sm">
              An interactive educational website about Hamming code, error detection, and correction.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-purple-400 transition-colors">
                  Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/explanation" className="hover:text-purple-400 transition-colors">
                  Explanation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="https://en.wikipedia.org/wiki/Hamming_code"
                  className="hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Wikipedia: Hamming Code
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/harryli0088/hamming-code"
                  className="hover:text-purple-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Original GitHub Repository
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {new Date().getFullYear()} Hamming Code Interactive. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link
              href="https://github.com"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://twitter.com"
              className="text-gray-400 hover:text-purple-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

