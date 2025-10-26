'use client'

import { supabase } from '@/lib/db'
import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { motion } from 'framer-motion'
import { BarChart3, PieChart as PieIcon } from 'lucide-react'

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444']

export default function AdminHome() {
  const [projectData, setProjectData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: projects } = await supabase.from('projects').select('*')

      if (projects) {
        const projectCounts = ['Belum', 'Selesai'].map((status) => ({
          name: status,
          value: projects.filter((p) => p.status === status).length,
        }))
        setProjectData(projectCounts)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p className="text-center mt-10 text-lg font-semibold">Loading...</p>

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-white p-8">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent mb-10"
      >
        📊 Dashboard Admin
      </motion.h1>

      {/* Charts Container */}
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* 3D Chart Card */}
        <motion.div
          whileHover={{
            scale: 1.05,
            rotateY: 10,
            rotateX: 5,
            boxShadow: '0 25px 45px rgba(0,0,0,0.15)',
          }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="relative bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <PieIcon className="text-indigo-600" size={28} />
            <h2 className="text-2xl font-semibold text-indigo-700">Status Projects</h2>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label
                animationBegin={100}
                animationDuration={1500}
                isAnimationActive
              >
                {projectData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="white"
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>

          {/* Glow 3D effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/20 via-transparent to-indigo-300/30 blur-2xl -z-10"></div>
        </motion.div>

        {/* Summary Card */}
        <motion.div
          whileHover={{
            scale: 1.05,
            rotateY: -8,
            rotateX: 3,
            boxShadow: '0 25px 45px rgba(0,0,0,0.15)',
          }}
          transition={{ type: 'spring', stiffness: 120 }}
          className="relative bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="text-green-500" size={28} />
            <h2 className="text-2xl font-semibold text-green-700">Summary</h2>
          </div>

          <ul className="space-y-3 text-gray-700 text-lg">
            {projectData.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex justify-between bg-white/60 px-4 py-2 rounded-xl shadow-sm hover:shadow-md hover:bg-white/80 transition"
              >
                <span className="font-medium">{p.name}</span>
                <span className="font-bold text-indigo-700">{p.value}</span>
              </motion.li>
            ))}
          </ul>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-green-200/20 via-transparent to-blue-300/30 blur-2xl -z-10"></div>
        </motion.div>
      </div>
    </div>
  )
}
