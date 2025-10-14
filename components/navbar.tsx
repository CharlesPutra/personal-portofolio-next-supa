"use client"

import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] md:w-[80%] 
                 bg-white/30 backdrop-blur-lg border border-white/40 
                 shadow-[0_8px_30px_rgba(0,0,0,0.12)] rounded-2xl"
    >
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
        >
          CharlesPutra<span className="text-gray-800">Dev</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-gray-800 font-medium">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative transition duration-300 ${
                pathname === link.href
                  ? "text-blue-600 font-semibold"
                  : "hover:text-blue-600"
              }`}
            >
              {link.name}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-500 transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-white/40 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-white/40 bg-white/40 backdrop-blur-lg rounded-b-2xl"
        >
          <div className="flex flex-col px-6 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`transition ${
                  pathname === link.href
                    ? "text-blue-600 font-semibold"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
