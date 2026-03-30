"use client"

import Link from "next/link"

const DashboardLogo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 px-2 py-2 rounded-md hover:bg-muted transition "
    >
      <img
        src="https://i.ibb.co.com/rRtQNNjL/Scholarship-Hub-logo-design.png"
        alt="scholarship hub"
        className="w-8 h-8 object-contain"
      />
      <span className="font-bold text-lg">Sholarship Hub</span>
    </Link>
  )
}

export default DashboardLogo
