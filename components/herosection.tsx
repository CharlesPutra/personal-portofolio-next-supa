"use client"

import { Typewriter } from "react-simple-typewriter"
import { motion } from "framer-motion"
import Link from "next/link"

export default function HeroSection() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between min-h-[80vh] max-w-6xl mx-auto px-6 md:px-10">
            {/* LEFT TEXT */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-4 text-center md:text-left"
            >
                <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
                    Hi, I'm <span className="text-blue-600">CharlesPutra</span> 👋
                </h1>

                <h2 className="text-2xl md:text-3xl font-semibold text-gray-600">
                    I'm a{" "}
                    <span className="text-blue-600">
                        <Typewriter
                            words={["Backend Developer", "Frontend Developer", "Fullstack Developer"]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={90}
                            deleteSpeed={70}
                            delaySpeed={1500}
                        />
                    </span>
                </h2>

                <p className="text-gray-600 max-w-xl mt-2">
                    Passionate about building web applications with clean code and modern design.
                </p>

                <div className="mt-6 flex gap-4 justify-center md:justify-start">
                    <Link
                        href="/projects"
                        className="px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Lihat Project
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-xl border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
                    >
                        Hubungi Saya
                    </Link>
                </div>
            </motion.div>

            {/* RIGHT IMAGE */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mt-10 md:mt-0"
            >
                <img
                    src="/profile.jpg"
                    alt="Profile"
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                />
            </motion.div>
        </section>
    )
}
