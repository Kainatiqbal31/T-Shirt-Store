import React from 'react'

const SummerCollection = () => {
  return (
    <section className="w-full">
      <div className="mx-auto" style={{ width: '95%' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16 md:py-24">
          {/* Left image with pink rectangle behind (same height, slightly wider) */}
          <div className="relative flex items-start justify-center min-h-[380px] md:min-h-[460px]">
            <div
              className="absolute top-0 left-0 h-full w-[100%] md:w-[110%] lg:w-[115%] rounded-sm"
              style={{ backgroundColor: 'var(--e-global-color-astglobalcolor4)' }}
            />
            <img
              src="/pexels-dhanno-18885576.jpg"
              alt="Summer"
              className="relative z-10 w-[58%] md:w-[62%] lg:w-[66%] object-cover transform -translate-y-[100px]"
            />
          </div>

          {/* Right content */}
          <div className="relative px-2 md:px-6">
            <span className="block text-[13px] text-gray-600 mb-2">Women</span>
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Spring Summer Collection</h2>
            <p className="text-gray-600 text-[14px] mb-7 max-w-[560px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id leo tempor, congue justo at, lobortis orci. 
              Aliquam venenatis dui lectus, eu convallis turpis convallis et. Pellentesque.
            </p>
            <button className="bg-black text-white px-4 py-3 hover:bg-gray-800">See Whole Collection</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SummerCollection


