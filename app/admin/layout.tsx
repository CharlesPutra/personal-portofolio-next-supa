'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/db'
import { motion } from 'framer-motion'
import { LogOut, LayoutDashboard, Users, FolderKanban } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  const links = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/admin/profiles', label: 'Profiles', icon: <Users size={18} /> },
    { href: '/admin/project', label: 'Projects', icon: <FolderKanban size={18} /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white">
      {/* 🌟 Navbar 3D */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 80 }}
        className="sticky top-0 z-50 backdrop-blur-lg bg-white/20 border-b border-white/30 shadow-lg"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Brand */}
          <motion.div
            whileHover={{ rotateY: 15, rotateX: 5 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 text-transparent bg-clip-text select-none"
          >
            Admin Panel
          </motion.div>

          {/* Menu */}
          <div className="flex items-center space-x-6">
            {links.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{
                  scale: 1.1,
                  rotateY: 10,
                  y: -2,
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all ${pathname === link.href
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-700 hover:bg-blue-100'
                  }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Tombol Logout */}
          <motion.button
            whileHover={{ scale: 1.05, rotateZ: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </div>
      </motion.nav>

      {/* 🌈 Konten halaman */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto px-6 py-8"
      >
        {children}
      </motion.main>
    </div>
  )
}
