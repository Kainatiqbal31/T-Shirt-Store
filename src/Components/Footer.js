import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Pink section with side gaps using percentage width for responsiveness */}
      <section className="footer-bg mx-auto" style={{ width: '95%' }}>
        <div className="max-w-screen-2xl mx-auto px-[5%] py-32">
          <div className="text-center max-w-[70%] mx-auto" style={{width: '70%'}}>
          <h3 className="text-xl md:text-2xl font-semibold mb-4">Subscribe To Get Offers In Your Inbox</h3>
          <p className="text-sm md:text-base text-gray-600 mb-8">Lorem ipsum dolor sit amet, adipiscing elit sed do eiusmod condimentum</p>
          </div>

          <nav className="w-full flex justify-center gap-6 md:gap-8 mb-8 text-sm md:text-base">
          <a href="/" className="footer-link text-gray-700 hover:text-black transition-colors">Buy T-Shirts</a>
          <a href="/" className="footer-link text-gray-700 hover:text-black transition-colors">Women</a>
          <a href="/" className="footer-link text-gray-700 hover:text-black transition-colors">Men</a>
          <a href="/about" className="footer-link text-gray-700 hover:text-black transition-colors">About</a>
          <a href="/contact" className="footer-link text-gray-700 hover:text-black transition-colors">Contact</a>
          </nav>

          <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="footer-icon w-10 h-10 flex items-center justify-center bg-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013 4.9a4.27 4.27 0 001.33 5.71 4.24 4.24 0 01-1.94-.54v.05a4.28 4.28 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.97A8.6 8.6 0 012 19.54 12.13 12.13 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.36-.01-.54A8.33 8.33 0 0022.46 6z" />
            </svg>
          </a>
          <a href="#" className="footer-icon w-10 h-10 flex items-center justify-center bg-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.4 2.85 8.14 6.81 9.46.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.77.6-3.36-1.19-3.36-1.19-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.21-.25-4.54-1.11-4.54-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.57 9.57 0 015 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.3.68.89.68 1.79 0 1.29-.01 2.33-.01 2.64 0 .26.18.58.69.48 3.95-1.32 6.8-5.06 6.8-9.46 0-5.5-4.46-9.96-9.96-9.96z" />
            </svg>
          </a>
          <a href="#" className="footer-icon w-10 h-10 flex items-center justify-center bg-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.75-.88a.88.88 0 110 1.75.88.88 0 010-1.75z" />
            </svg>
          </a>
          </div>
        </div>
      </section>

      {/* Black copyright bar matching the same width as the pink section */}
      <section className="mx-auto" style={{ width: '95%' }}>
        <div className="bg-black py-10 md:py-14">
          <div className="text-center text-white text-xs md:text-sm">
            <p>
              Copyright © 2025 <span className="font-medium">T-Shirts Store</span> | Powered by <span className="font-medium">T-Shirts Store</span>
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer


