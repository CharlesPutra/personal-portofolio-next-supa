'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data.user) {
        // belum login → pindah ke /login
        router.push('/login')
      } else {
        setUser(data.user)
      }
      setLoading(false)
    }

    checkUser()
  }, [router])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar sederhana untuk semua halaman admin */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between">
        <div className="flex space-x-4">
          <a href="/admin" className="hover:underline">Dashboard</a>
          <a href="/admin/profiles" className="hover:underline">Profiles</a>
          <a href="/admin/project" className="hover:underline">Projects</a>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            router.push('/login')
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Konten halaman anak (profiles, projects, dll) */}
      <main className="p-8">{children}</main>
    </div>
  )
}
