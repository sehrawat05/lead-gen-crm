"use client"

import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

export function EmailPerformanceChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Sample data - in a real app, this would come from props
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"]
    const data = [10, 15, 12, 18, 15, 22, 20, 25, 30]

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Email Performance",
            data,
            borderColor: "#0d9488",
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            tension: 0.3,
            pointRadius: 5,
            pointBackgroundColor: "#0d9488",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="w-full h-64">
      <canvas ref={chartRef} />
    </div>
  )
}
