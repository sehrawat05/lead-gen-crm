"use client"

import { useEffect, useRef, useState } from "react"
import { Chart } from "chart.js/auto"
import * as THREE from 'three'
import anime from 'animejs'

export function LeadsChart({ data }) {
  const chartRef = useRef(null)
  const threeRef = useRef(null)
  const chartInstance = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  // Three.js initialization
  useEffect(() => {
    if (!threeRef.current) return

    const container = threeRef.current
    const width = container.clientWidth
    const height = container.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // Create floating particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 100
    
    const posArray = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      color: 0x0d9488,
      transparent: true,
      opacity: 0.6
    })
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)
    
    camera.position.z = 15

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      particlesMesh.rotation.x += 0.0005
      particlesMesh.rotation.y += 0.0005
      renderer.render(scene, camera)
    }
    
    animate()

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    
    window.addEventListener('resize', handleResize)

    // Intersection Observer for animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    return () => {
      window.removeEventListener('resize', handleResize)
      container.removeChild(renderer.domElement)
      observer.disconnect()
    }
  }, [])

  // Chart.js initialization with animations
  useEffect(() => {
    if (!chartRef.current || !data.length) return

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Format data for Chart.js
    const labels = data.map((item) => item._id)
    const counts = data.map((item) => item.count)

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "New Leads",
            data: counts,
            borderColor: "#0d9488",
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            tension: 0.3,
            pointRadius: 5,
            pointBackgroundColor: "#0d9488",
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#f8fafc',
            bodyColor: '#e2e8f0',
            borderColor: '#0d9488',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              color: "#64748b",
              font: {
                family: "'Inter', sans-serif",
              }
            }
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#64748b",
              font: {
                family: "'Inter', sans-serif",
              }
            }
          },
        },
        animation: {
          duration: isVisible ? 2000 : 0,
          easing: 'easeOutQuart',
        }
      },
    })

    // Text animation when visible
    if (isVisible) {
      anime({
        targets: '.chart-title',
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutExpo'
      })

      anime({
        targets: '.chart-description',
        translateY: [10, 0],
        opacity: [0, 1],
        duration: 800,
        delay: 200,
        easing: 'easeOutExpo'
      })
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data, isVisible])

  return (
    <div className="w-full rounded-xl overflow-hidden shadow-lg bg-white relative">
      {/* Three.js background */}
      <div 
        ref={threeRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <h3 className="chart-title text-2xl font-bold text-gray-900 mb-1 opacity-0">
          Leads Overview
        </h3>
        <p className="chart-description text-gray-600 mb-6 opacity-0">
          Track your lead generation progress over time
        </p>
        
        <div className="w-full h-80 relative">
          <canvas 
            ref={chartRef} 
            className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
        
        {/* Animated stats */}
        <div className="flex justify-between mt-4">
          {data.slice(0, 3).map((item, index) => (
            <div 
              key={index}
              className="stat-item opacity-0"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1 + 0.3}s forwards` : 'none'
              }}
            >
              <p className="text-sm text-gray-500">{item._id}</p>
              <p className="text-xl font-semibold text-teal-900">{item.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stat-item {
          flex: 1;
          padding: 0.5rem;
          text-align: center;
          background: rgba(241, 245, 249, 0.5);
          border-radius: 0.5rem;
          margin: 0 0.25rem;
        }
      `}</style>
    </div>
  )
}