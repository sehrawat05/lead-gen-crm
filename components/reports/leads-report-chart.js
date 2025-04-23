"use client"

import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

export function LeadsReportChart() {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    // Sample data - in a real app, this would come from props
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Website",
            data: [12, 19, 15, 22, 25, 30],
            backgroundColor: "#0d9488",
          },
          {
            label: "Referral",
            data: [8, 12, 10, 15, 18, 20],
            backgroundColor: "#67e8f9",
          },
          {
            label: "Social Media",
            data: [5, 8, 12, 10, 15, 18],
            backgroundColor: "#4ade80",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
            labels: {
              font: {
                size: 12,
                family: "Arial, sans-serif",
              },
            },
          },
          title: {
            display: true,
            text: "Lead Sources by Month",
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
      <h2 className="text-xl font-semibold text-teal-900 mb-6">Lead Report</h2>
      <canvas ref={chartRef} />
    </div>
  )
}
