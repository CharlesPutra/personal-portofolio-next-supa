"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Globe } from "lucide-react"
import { supabase } from "@/lib/db"
import { IProject } from "@/type/projects"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"


export default function ProjectsPage() {
    const [projects, setProjects] = useState<IProject[]>([])
    const [loading, setLoading] = useState(true)
    const [hovered, setHovered] = useState<number | null>(null)
    const [rotation, setRotation] = useState({ x: 0, y: 0 })
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)

    const itemsPerPage = 6

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true)

            const start = (page - 1) * itemsPerPage
            const end = start + itemsPerPage - 1

            const { data, error, count } = await supabase
                .from("projects")
                .select("*", { count: "exact" })
                .order("id", { ascending: false })
                .range(start, end)

            if (error) console.error("Error fetching projects:", error)
            else {
                setProjects(data || [])
                setTotal(count || 0)
            }
            setLoading(false)
        }

        fetchProjects()
    }, [page])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const rotateY = ((x / rect.width) - 0.5) * 25
        const rotateX = ((y / rect.height) - 0.5) * -25
        setHovered(index)
        setRotation({ x: rotateX, y: rotateY })
    }

    const handleMouseLeave = () => {
        setHovered(null)
        setRotation({ x: 0, y: 0 })
    }

    const totalPages = Math.ceil(total / itemsPerPage)

    return (
        <div>
            <Navbar />
            <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        🚀 My Projects
                    </h2>

                    {loading ? (
                        <div className="text-center text-gray-500">Loading projects...</div>
                    ) : projects.length === 0 ? (
                        <div className="text-center text-gray-500">No projects found.</div>
                    ) : (
                        <>
                            {/* Project Grid */}
                            <div
                                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
                                style={{ perspective: "1000px" }}
                            >
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        className="relative bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            transform:
                                                hovered === index
                                                    ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.05)`
                                                    : "rotateX(0deg) rotateY(0deg) scale(1)",
                                            boxShadow:
                                                hovered === index
                                                    ? `${-rotation.y * 2}px ${rotation.x * 2}px 30px rgba(0,0,0,0.25)`
                                                    : "0 4px 20px rgba(0,0,0,0.1)",
                                        }}
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        onMouseLeave={handleMouseLeave}
                                        initial={{ opacity: 0, y: 40 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {/* Gambar */}
                                        <div className="relative">
                                            <img
                                                src={
                                                    project.image_url && project.image_url.startsWith("http")
                                                        ? project.image_url
                                                        : "https://placehold.co/600x400?text=No+Image"
                                                }
                                                alt={project.title}
                                                onError={(e) => {
                                                    e.currentTarget.src =
                                                        "https://placehold.co/600x400?text=No+Image"
                                                }}
                                                className="w-full h-56 object-cover"
                                            />

                                            {hovered === index && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent blur-[40px] pointer-events-none" />
                                            )}
                                        </div>

                                        {/* Konten */}
                                        <div className="p-5">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-600 mb-3 line-clamp-3">
                                                {project.description || "No description provided."}
                                            </p>

                                            <div className="mb-4">
                                                <span
                                                    className={`px-3 py-1 text-sm rounded-full ${project.status === "Selesai"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {project.status}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                {project.github_url && (
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        asChild
                                                        className="flex items-center gap-2"
                                                    >
                                                        <a
                                                            href={project.github_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Github className="w-4 h-4" /> GitHub
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.demo_url && (
                                                    <Button
                                                        size="sm"
                                                        asChild
                                                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                                                    >
                                                        <a
                                                            href={
                                                                project.demo_url.startsWith("http")
                                                                    ? project.demo_url
                                                                    : `https://${project.demo_url}`
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Globe className="w-4 h-4" /> Live Demo
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                        disabled={page === 1}
                                        className="border-gray-300"
                                    >
                                        Previous
                                    </Button>
                                    <span className="text-gray-700">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                                        disabled={page === totalPages}
                                        className="border-gray-300"
                                    >
                                        Next
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    )
}
