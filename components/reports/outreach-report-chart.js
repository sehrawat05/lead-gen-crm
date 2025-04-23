"use client"

import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

export function OutreachReportChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Sample data - in a real app, this would come from props
    const labels = ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4", "Campaign 5"]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sent",
            data: [100, 150, 120, 200, 180],
            backgroundColor: "#0d9488",
          },
          {
            label: "Opened",
            data: [70, 90, 60, 120, 100],
            backgroundColor: "#67e8f9",
          },
          {
            label: "Replied",
            data: [20, 30, 15, 40, 35],
            backgroundColor: "#4ade80",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Email Campaign Performance",
            font: {
              size: 18,
              weight: 'bold',
            },
            color: "#333",
            padding: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              font: {
                size: 12,
                family: "Arial, sans-serif",
              },
            },
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              lineWidth: 1,
            },
          },
          x: {
            grid: {
              color: "rgba(0, 0, 0, 0.05)",
              lineWidth: 1,
            },
            ticks: {
              font: {
                size: 12,
                family: "Arial, sans-serif",
              },
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
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 py-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-teal-900 mb-6">Outreach Report</h2>
      <canvas ref={chartRef} />
    </div>
  )
}
