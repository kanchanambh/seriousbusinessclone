"use client"

import React, { useEffect } from 'react'
import  {animatePageIn}  from "@/utils/animations"

function template( {children}) {

    useEffect(() => {
        animatePageIn()
      }, [])

  return (
    <div>
    <div
      id="banner-1"
      className="min-h-screen bg-red-900 z-10 fixed top-0 left-0 w-screen"
    />
    <div
      id="banner-2"
      className="min-h-screen bg-red-800 z-20 fixed top-0 left-0 w-screen"
    />
    <div
      id="banner-3"
      className="min-h-screen bg-red-600 z-20 fixed top-0 left-0 w-screen"
    />
    <div
      id="banner-4"
      className="min-h-screen bg-red-500 z-40 fixed top-0 left-0 w-screen"
    />
    {children}
  </div>
  )
}

export default template