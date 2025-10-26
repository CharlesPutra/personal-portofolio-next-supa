'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/db'
import { motion } from 'framer-motion'
import { PlusCircle, Edit2, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import type { IProfile } from '@/type/profiles'

export default function ProfilesPage() {
  const [profiles, setProfiles] = useState<IProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProfile, setEditingProfile] = useState<IProfile | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState<Partial<IProfile>>({
    name: '',
    headline: '',
    bio: '',
    avatar_url: '',
    github_url: '',
    instagram_url: '',
    skills: [],
  })

  const fetchProfiles = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('profiles').select('*')
    if (!error && data) setProfiles(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProfiles()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus profile ini?')) return
    await supabase.from('profiles').delete().eq('id', id)
    fetchProfiles()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProfile) {
      await supabase.from('profiles').update(formData).eq('id', editingProfile.id)
    } else {
      await supabase.from('profiles').insert([{ ...formData }])
    }

    setShowForm(false)
    setEditingProfile(null)
    setFormData({
      name: '',
      headline: '',
      bio: '',
      avatar_url: '',
      github_url: '',
      instagram_url: '',
      skills: [],
    })
    fetchProfiles()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === 'skills') {
      setFormData({ ...formData, skills: value.split(',').map((s) => s.trim()) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // 🖼️ Upload Avatar ke Supabase Storage
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return
      setUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `avatars/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      if (data?.publicUrl) {
        setFormData({ ...formData, avatar_url: data.publicUrl })
      }
    } catch (error) {
      alert('Gagal upload avatar.')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-indigo-700 drop-shadow-lg mb-10"
      >
        👤 Manage Profiles
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setEditingProfile(null)
          setShowForm(true)
        }}
        className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-[0_5px_15px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_20px_rgba(99,102,241,0.6)] transition-all mb-10"
      >
        <PlusCircle className="w-5 h-5" />
        Tambah Profile
      </motion.button>

      {/* Form Tambah/Edit */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.15)] p-6 mb-10 border border-gray-100 space-y-4"
        >
          <h2 className="text-2xl font-bold text-indigo-600 mb-4">
            {editingProfile ? '✏️ Edit Profile' : '➕ Tambah Profile'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="name"
              placeholder="Nama"
              value={formData.name || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <input
              name="headline"
              placeholder="Headline"
              value={formData.headline || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio || ''}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
            rows={3}
          />

          <input
            name="skills"
            placeholder="Skills (pisahkan dengan koma)"
            value={formData.skills?.join(', ') || ''}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="github_url"
              placeholder="Github URL"
              value={formData.github_url || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <input
              name="instagram_url"
              placeholder="Instagram URL"
              value={formData.instagram_url || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Upload Avatar */}
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 bg-indigo-100 px-4 py-2 rounded-xl shadow hover:shadow-md">
              <Upload className="w-4 h-4 text-indigo-600" />
              <span className="text-indigo-600">{uploading ? 'Uploading...' : 'Upload Avatar'}</span>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>

            {formData.avatar_url && (
              <Image
                src={formData.avatar_url}
                alt="Preview"
                width={60}
                height={60}
                className="rounded-full shadow-lg object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-indigo-700 transition"
          >
            {editingProfile ? 'Update' : 'Simpan'}
          </button>
        </motion.form>
      )}

      {/* List Profiles */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 hover:shadow-[0_15px_35px_rgba(99,102,241,0.3)] transition-all"
          >
            <div className="relative w-full h-48 bg-gradient-to-r from-indigo-400 to-indigo-600">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-2xl font-bold text-indigo-700">{profile.name}</h3>
              <p className="text-gray-500 text-sm">{profile.headline}</p>
              <p className="text-gray-700 text-sm">{profile.bio}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {profile.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full shadow-inner"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setEditingProfile(profile)
                    setFormData(profile)
                    setShowForm(true)
                  }}
                  className="p-2 bg-yellow-100 text-yellow-600 rounded-xl shadow hover:shadow-md"
                >
                  <Edit2 size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(profile.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-xl shadow hover:shadow-md"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
