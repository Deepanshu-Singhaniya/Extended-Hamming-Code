"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Code2, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const routes = [
    { name: "Home", path: "/" },
    { name: "Interactive Demo", path: "/demo" },
    { name: "Explanation", path: "/explanation" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-500/20 bg-black/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Code2 className="h-6 w-6 text-purple-400" />
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Hamming Code
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 ml-6">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-purple-400",
                pathname === route.path ? "text-purple-400" : "text-gray-400",
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="flex-1"></div>

        <Button
          variant="outline"
          size="sm"
          className="hidden md:flex border-purple-500 text-purple-400 hover:bg-purple-500/10"
          asChild
        >
          <Link href="https://github.com/harryli0088/hamming-code" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </Link>
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden ml-auto"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6 text-purple-400" /> : <Menu className="h-6 w-6 text-purple-400" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-purple-500/20 bg-black">
          <nav className="flex flex-col p-4 space-y-4">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-purple-400 p-2",
                  pathname === route.path ? "text-purple-400 bg-purple-500/10 rounded" : "text-gray-400",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {route.name}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/10 mt-2"
              asChild
            >
              <Link href="https://github.com/harryli0088/hamming-code" target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

