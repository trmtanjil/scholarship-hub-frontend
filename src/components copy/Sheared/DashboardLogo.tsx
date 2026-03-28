"use client"

import Link from "next/link"

const DashboardLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted transition "
    >
      <img
        src="https://i.ibb.co/rGRZwXJB/Chat-GPT-Image-Feb-6-2026-01-24-37-AM.png"
        alt="MediCare"
        className="w-8 h-8 object-contain"
      />
      <span className="font-bold text-lg">MediCare</span>
    </Link>
  )
}

export default DashboardLogo
