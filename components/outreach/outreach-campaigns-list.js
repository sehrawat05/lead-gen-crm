"use client"

import { useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import * as THREE from "three"

export function OutreachCampaignsList({ campaigns, variant = "default" }) {
  // Sample data if campaigns is empty
  const sampleCampaigns = [
    { _id: "1", name: "Q2 Newsletter", status: "active", sentCount: 120 },
    { _id: "2", name: "Product Launch", status: "draft", sentCount: 0 },
    { _id: "3", name: "Follow-up Campaign", status: "active", sentCount: 80 },
  ]

  const displayCampaigns = campaigns.length > 0 ? campaigns : sampleCampaigns
  const threeCanvasRef = useRef(null)

  useEffect(() => {
    const canvas = threeCanvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas: canvas })
    renderer.setSize(window.innerWidth, window.innerHeight)
    
    // Remove black footer and make canvas fully responsive to the screen
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.zIndex = '-1'
    canvas.style.backgroundColor = 'transparent' // Set canvas background to transparent

    // Set body margin to 0 and prevent horizontal scroll
    document.body.style.margin = '0'
    document.body.style.overflowX = 'hidden' // Disable horizontal scroll

    // Set the 3D scene
    camera.position.z = 5

    const animate = function () {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (renderer) {
        renderer.dispose()
      }
    }
  }, [])

  if (variant === "compact") {
    return (
      <div className="relative space-y-3">
        <canvas ref={threeCanvasRef} />
        {displayCampaigns.map((campaign) => (
          <Link
            key={campaign._id}
            href={`/outreach/${campaign._id}`}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 border transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className={`w-3 h-3 rounded-full mr-3 ${campaign.status === "active" ? "bg-teal-500" : campaign.status === "draft" ? "bg-yellow-400" : "bg-gray-300"}`}
            />
            <span className="flex-1">{campaign.name}</span>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="relative space-y-3">
      <canvas ref={threeCanvasRef} />
      {displayCampaigns.map((campaign) => (
        <Link
          key={campaign._id}
          href={`/outreach/${campaign._id}`}
          className="block p-4 rounded-lg hover:bg-gray-50 border transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="flex items-center mb-2">
            <h3 className="font-medium">{campaign.name}</h3>
            <span
              className={`ml-auto px-2 py-1 text-xs rounded-full ${
                campaign.status === "active"
                  ? "bg-green-100 text-green-800"
                  : campaign.status === "draft"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {campaign.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {campaign.sentCount > 0 ? `${campaign.sentCount} emails sent` : "No emails sent yet"}
          </p>
        </Link>
      ))}
    </div>
  )
}
