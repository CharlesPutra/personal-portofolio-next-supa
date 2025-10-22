'use client'

import { supabase } from '@/lib/db'
import { useEffect, useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']

export default function AdminHome() {
  const [projectData, setProjectData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      // ambil data project
      const { data: projects } = await supabase.from('projects').select('*')

      if (projects) {
        // hitung jumlah project berdasarkan status
        const projectCounts = ['Belum', 'Selesai',].map(
          (status) => ({
            name: status,
            value: projects.filter((p) => p.status === status).length,
          })
        )

        setProjectData(projectCounts)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">📊 Dashboard Admin</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Chart Project */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Status Projects</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={projectData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {projectData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
