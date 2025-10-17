"use client"

import { useEffect, useState } from "react"
import { Github, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { supabase } from "@/lib/db"
import type { IProfile } from "@/type/profiles"

export default function AboutUs() {
  const [profile, setProfile] = useState<IProfile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .single()

      if (!error && data) {
        setProfile(data)
      } else {
        console.error("Error fetching profile:", error)
      }
    }

    fetchProfile()
  }, [])

  if (!profile)
    return (
      <div className="flex justify-center items-center py-20 text-gray-400">
        Loading profile...
      </div>
    )

  return (
    <section
      id="about"
      className="max-w-6xl mx-auto px-6 md:px-10 py-24 flex flex-col md:flex-row items-center gap-12"
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
          src={profile.avatar_url}
          alt={profile.name}
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
          Halo! Saya {" "}
          <span className="font-semibold text-blue-600">
            {profile.name}
          </span>
          , {profile.headline}.
        </p>

        <p className="text-gray-600 leading-relaxed mb-6">{profile.bio}</p>

        {/* Skills */}
        {profile.skills && profile.skills.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-6">
            {profile.skills.map((skill, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-full border border-blue-200 shadow-sm hover:bg-blue-100 transition"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        )}

        {/* Social Links */}
        <div className="flex justify-center md:justify-start gap-6 mt-8">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-600 transition transform hover:scale-110"
            >
              <Github className="w-6 h-6" />
            </a>
          )}
          {profile.instagram_url && (
            <a
              href={profile.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-pink-500 transition transform hover:scale-110"
            >
              <Instagram className="w-6 h-6" />
            </a>
          )}
        </div>
      </motion.div>
    </section>
  )
}
