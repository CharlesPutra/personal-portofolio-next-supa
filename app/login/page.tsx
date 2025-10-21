'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/db'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        alert('Login gagal: ' + error.message)
      } else {
        alert('Login sukses!')
        router.push('/admin') // ⬅️ pindah ke halaman admin
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        alert('Register gagal: ' + error.message)
      } else {
        alert('Akun berhasil dibuat! Silakan cek email kamu untuk verifikasi.')
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-80">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        <form onSubmit={handleAuth} className="flex flex-col space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            disabled={loading}
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
          >
            {loading
              ? 'Loading...'
              : isLogin
              ? 'Login'
              : 'Register'}
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
          <button
            type="button"
            className="text-blue-500 underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Daftar di sini' : 'Login di sini'}
          </button>
        </p>
      </div>
    </div>
  )
}
