"use client"

import { useEffect, useRef } from "react"
import { Chart } from "chart.js/auto"

export function ConversionReportChart() {
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
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Lead to Contact Rate",
            data: [40, 45, 50, 55, 60, 65],
            borderColor: "#0d9488",
            backgroundColor: "rgba(13, 148, 136, 0.1)",
            tension: 0.3,
          },
          {
            label: "Contact to Meeting Rate",
            data: [25, 30, 28, 35, 40, 45],
            borderColor: "#67e8f9",
            backgroundColor: "rgba(103, 232, 249, 0.1)",
            tension: 0.3,
          },
          {
            label: "Meeting to Deal Rate",
            data: [15, 18, 20, 22, 25, 30],
            borderColor: "#4ade80",
            backgroundColor: "rgba(74, 222, 128, 0.1)",
            tension: 0.3,
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
            text: "Conversion Rates (%)",
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
            max: 100,
            ticks: {
              callback: (value) => value + "%",
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
      <h2 className="text-xl font-semibold text-teal-900 mb-6">Conversion Report</h2>
      <canvas ref={chartRef} />
    </div>
  )
}
