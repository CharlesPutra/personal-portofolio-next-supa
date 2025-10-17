"use client"

import { Github, Instagram } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative overflow-hidden mt-25">
            {/* Garis gradien neon di atas */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />

            <div className="bg-[#0f172a] text-gray-300 py-12 px-6 md:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                            CharlesPutra<span className="text-white">Dev</span>
                        </h2>
                        <p className="text-sm text-gray-400 mt-2">
                            Crafting modern web experiences with Next.js & Supabase 🚀
                        </p>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center gap-6">
                        <SocialIcon
                            href="https://github.com/CharlesPutra"
                            icon={<Github className="w-5 h-5" />}
                        />
                        <SocialIcon
                            href="https://www.instagram.com/charp.ete?igsh=MWIxaDlqNmc5Njc3cw=="
                            icon={<Instagram className="w-5 h-5" />}
                        />
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-gray-500 text-center md:text-right">
                        © {currentYear} <span className="text-gray-300">CharlesPutraDev</span>. All rights reserved.
                    </div>
                </div>
            </div>

            {/* Glow efek di bawah */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />
        </footer>
    )
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative z-10"
        >
            {/* decorative gradient: jangan tangkap pointer sehingga tidak menghalangi klik */}
            <span className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-lg transition duration-500 rounded-full pointer-events-none" />
            <span className="relative text-gray-400 group-hover:text-white transition duration-300 pointer-events-none">
                {icon}
            </span>
        </a>
    )
}
