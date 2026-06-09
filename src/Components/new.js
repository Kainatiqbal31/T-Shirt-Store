import React from 'react'

const New = () => {
  return (
    <section className="w-full">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center justify-items-center">
          {/* Men card */}
          <a href="#" className="relative block overflow-hidden group mb-12">
            <img
              src="/cat-men-300x300.jpg"
              alt="Men"
              className="w-full md:w-full lg:w-full h-[420px] md:h-[520px] mx-auto object-cover group-hover:scale-[1.02] transition-transform"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 text-center py-3 shadow-sm">
              <div className="text-[11px] tracking-widest font-medium">MEN</div>
              <div className="text-[10px] text-gray-500 mt-1">5 PRODUCTS</div>
            </div>
          </a>

          {/* Women card */}
          <a href="#" className="relative block overflow-hidden group mb-12">
            <img
              src="/cat-women-300x300.jpg"
              alt="Women"
              className="w-full md:w-full lg:w-full h-[420px] md:h-[520px] mx-auto object-cover group-hover:scale-[1.02] transition-transform"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-white/95 text-center py-3 shadow-sm">
              <div className="text-[11px] tracking-widest font-medium">WOMEN</div>
              <div className="text-[10px] text-gray-500 mt-1">5 PRODUCTS</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}

export default New


