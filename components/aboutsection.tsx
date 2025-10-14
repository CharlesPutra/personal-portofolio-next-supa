"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "bootstrap",
    "React",
    "Next.js",
    "Tailwind CSS",
    "PHP",
    "Laravel",
    "Supabase",
    "Git & GitHub",
  ]

  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-center gap-10"
    >
      {/* LEFT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 flex justify-center"
      >
        <img
          src="/abous.jpg"
          alt="About Me"
          className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] hover:scale-[1.03] transition"
        />
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          Tentang Saya 👋
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Halo! Saya <span className="font-semibold text-blue-600">CharlesPutra</span>, 
          seorang pengembang web yang berfokus pada pembuatan aplikasi 
          modern dengan desain yang bersih, performa tinggi, dan pengalaman pengguna yang menarik.
          Saya menikmati proses membangun sesuatu dari ide menjadi produk digital nyata.
        </p>
        <p className="text-gray-600 leading-relaxed mb-6">
          Saat ini saya sedang mendalami pengembangan fullstack 
          menggunakan <span className="font-semibold">Next.js</span> dan <span className="font-semibold">Supabase</span>, 
          dengan perhatian khusus pada kemudahan penggunaan dan kecepatan akses.
        </p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
          {skills.map((skill, index) => (
            <motion.span
              key={index}
              whileHover={{ scale: 1.1 }}
              className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-full border border-blue-200 shadow-sm hover:bg-blue-100 transition"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
