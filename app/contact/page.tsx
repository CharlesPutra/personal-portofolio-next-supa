"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const phoneNumber = "6281234567890" // GANTI dengan nomor WA kamu
    const text = `Halo, saya *${formData.name}* (%0AEmail: ${formData.email})%0A%0A${formData.message}`
    const encodedText = encodeURIComponent(text)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`
    window.open(whatsappURL, "_blank")
  }

  return (
    <>
      <Navbar/>
    <section
      id="contact"
      className="min-h-[80vh] flex items-center justify-center px-6 md:px-10 py-20 bg-gray-50 mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8 md:p-10 border border-gray-200"
      >
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Hubungi Saya 📩
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Punya ide keren, ingin berkolaborasi, atau sekadar ngobrol santai?
          Kirim pesan langsung ke WhatsApp saya!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nama
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="Masukkan nama kamu"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
              placeholder="Masukkan email kamu"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Pesan
            </label>
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              placeholder="Tulis pesan kamu di sini..."
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            Kirim ke WhatsApp
          </motion.button>
        </form>
      </motion.div>
    </section>
    <Footer/>
    </>
  )
}
