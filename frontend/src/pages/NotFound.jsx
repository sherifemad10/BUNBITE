import React from 'react'

const NotFound = () => {
  return (
    <section className="flex h-[500px] items-center justify-center bg-transparent text-[#1a1a1a]">
      <svg className="w-[200px]" viewBox="0 0 320 380">
        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="25">
          {/* Eyes */}
          <g className="animate-face-eyes" transform="translate(0,112.5)">
            {/* Left Eye */}
            <g transform="translate(15,0)">
              <polyline className="animate-eye-lid" points="37,0 0,120 75,120" />
              <polyline className="animate-pupil" points="55,120 55,155" strokeDasharray="35 35" />
            </g>
            {/* Right Eye */}
            <g transform="translate(230,0)">
              <polyline className="animate-eye-lid" points="37,0 0,120 75,120" />
              <polyline className="animate-pupil" points="55,120 55,155" strokeDasharray="35 35" />
            </g>
          </g>
          {/* Nose */}
          <rect className="animate-nose" x="132.5" y="112.5" width="55" height="155" rx="4" ry="4" />
          {/* Mouth */}
          <g transform="translate(65,334)" strokeDasharray="102 102">
            <path className="animate-mouth-left" d="M 0 30 C 0 30 40 0 95 0" />
            <path className="animate-mouth-right" d="M 95 0 C 150 0 190 30 190 30" />
          </g>
        </g>
      </svg>
    </section>
  )
}

export default NotFound
