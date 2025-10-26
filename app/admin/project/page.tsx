'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/db'
import { motion } from 'framer-motion'
import { PlusCircle, Edit2, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import type { IProject } from '@/type/projects'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState<IProject | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState<Partial<IProject>>({
    title: '',
    description: '',
    image_url: '',
    github_url: '',
    demo_url: '',
    status: 'Belum',
  })

  // 🔹 Fetch Data dari Supabase
  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('projects').select('*')
    if (!error && data) setProjects(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  // 🔹 Hapus Project
  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus project ini?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchProjects()
  }

  // 🔹 Submit Tambah / Edit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingProject) {
      await supabase.from('projects').update(formData).eq('id', editingProject.id)
    } else {
      await supabase.from('projects').insert([{ ...formData }])
    }

    setShowForm(false)
    setEditingProject(null)
    setFormData({
      title: '',
      description: '',
      image_url: '',
      github_url: '',
      demo_url: '',
      status: 'Belum',
    })
    fetchProjects()
  }

  // 🔹 Handle Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  // 🖼️ Upload Gambar ke Supabase Storage
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]
      if (!file) return
      setUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `projects/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('projects').getPublicUrl(filePath)
      if (data?.publicUrl) {
        setFormData({ ...formData, image_url: data.publicUrl })
      }
    } catch (error) {
      alert('Gagal upload gambar.')
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-white to-indigo-100 p-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-extrabold text-purple-700 drop-shadow-lg mb-10"
      >
        🚀 Manage Projects
      </motion.h1>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setEditingProject(null)
          setShowForm(true)
        }}
        className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-2xl shadow-[0_5px_15px_rgba(139,92,246,0.4)] hover:shadow-[0_8px_20px_rgba(139,92,246,0.6)] transition-all mb-10"
      >
        <PlusCircle className="w-5 h-5" />
        Tambah Project
      </motion.button>

      {/* 🧩 Form Tambah / Edit */}
      {showForm && (
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-[0_8px_25px_rgba(0,0,0,0.15)] p-6 mb-10 border border-gray-100 space-y-4"
        >
          <h2 className="text-2xl font-bold text-purple-600 mb-4">
            {editingProject ? '✏️ Edit Project' : '➕ Tambah Project'}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="title"
              placeholder="Judul Project"
              value={formData.title || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
            <select
              name="status"
              value={formData.status || 'Belum'}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="Belum">Belum</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Deskripsi Project"
            value={formData.description || ''}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-purple-500 outline-none"
            rows={3}
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="github_url"
              placeholder="Github URL"
              value={formData.github_url || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <input
              name="demo_url"
              placeholder="Demo URL"
              value={formData.demo_url || ''}
              onChange={handleChange}
              className="p-3 rounded-xl border border-gray-300 shadow-inner focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* Upload Gambar */}
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-xl shadow hover:shadow-md">
              <Upload className="w-4 h-4 text-purple-600" />
              <span className="text-purple-600">{uploading ? 'Uploading...' : 'Upload Gambar'}</span>
              <input type="file" accept="image/*" onChange={handleUpload} hidden />
            </label>

            {formData.image_url && (
              <Image
                src={formData.image_url}
                alt="Preview"
                width={60}
                height={60}
                className="rounded-lg shadow-lg object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-purple-700 transition"
          >
            {editingProject ? 'Update' : 'Simpan'}
          </button>
        </motion.form>
      )}

      {/* 💫 List Projects */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.03, rotateY: 5 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-white rounded-3xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100 hover:shadow-[0_15px_35px_rgba(139,92,246,0.3)] transition-all"
          >
            <div className="relative w-full h-48 bg-gradient-to-r from-purple-400 to-purple-600">
              {project.image_url && (
                <Image
                  src={project.image_url}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="p-5 space-y-2">
              <h3 className="text-2xl font-bold text-purple-700">{project.title}</h3>
              <p className="text-gray-500 text-sm">{project.description}</p>

              <p
                className={`inline-block px-3 py-1 text-xs rounded-full shadow-inner ${
                  project.status === 'Selesai'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {project.status}
              </p>

              <div className="flex justify-end gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => {
                    setEditingProject(project)
                    setFormData(project)
                    setShowForm(true)
                  }}
                  className="p-2 bg-yellow-100 text-yellow-600 rounded-xl shadow hover:shadow-md"
                >
                  <Edit2 size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDelete(project.id)}
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
