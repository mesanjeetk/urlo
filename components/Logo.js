'use client'

import React from 'react'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" aria-label="Home">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer hover:opacity-90 transition"
      >
        <rect width="40" height="40" rx="8" fill="#ae7cec" />
        <path
          d="M10 20C10 14.477 14.477 10 20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30"
          stroke="#7cc1ec"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M20 30C17.239 30 15 27.761 15 25C15 22.239 17.239 20 20 20"
          stroke="#e98b10"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="16" r="3" fill="#e98b10" />
      </svg>
    </Link>
  )
}

export default Logo
