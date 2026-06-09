import React from 'react'

const About = () => {
  return (
    <section className="w-full">
      {/* match footer: pink block has side gaps using 95% width */}
      <div className="pink-bg mx-auto" style={{ width: '95%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[65vh] py-14 md:py-20">
          {/* Left text */}
          <div className="relative h-full">
            <div className="px-[5%] lg:absolute lg:top-[35%] lg:-translate-y-1/2 lg:left-[40px]">
              <span className="block text-sm text-gray-600 mb-4">Women</span>
              <h1 className="text-4xl md:text-6xl font-semibold text-black leading-tight mb-10">
                <span className="block pb-4">Slick. Modern.</span>
                <span className="block">Awesome.</span>
              </h1>
              <button className="mt-4 inline-block bg-black hover:bg-gray-800 transition-colors text-white px-7 py-3.5 text-base rounded-none">Shop Collection</button>
            </div>
          </div>

          {/* Right image with decorative circles */}
          <div className="relative flex justify-center items-center">
            {/* large white circle (top-right) */}
            <div className="absolute rounded-full bg-white opacity-90" style={{ width: '70%', paddingTop: '70%', right: '16%', top: '8%' }}></div>
            {/* small white circle (bottom-left) */}
            <div className="absolute rounded-full bg-white opacity-90" style={{ width: '28%', paddingTop: '28%', left: '10%', bottom: '6%' }}></div>

            <img src="/hero.png" alt="Hero" className="relative z-10 w-[85%] md:w-[88%] lg:w-[92%] object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


