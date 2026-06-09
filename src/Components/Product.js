import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import CartPage from './cartpage'

const products = [
  {
    id: 1,
    category: 'MEN',
    name: 'T‑Shirt Name 10',
    price: '$33.00 – $36.00',
    colors: [
      { hex: '#000000', label: 'Black' },
      { hex: '#f59e0b', label: 'Orange' },
      { hex: '#ffffff', label: 'White' },
    ],
    image: '/product-09-a-300x366.jpg',
  },
  {
    id: 2,
    category: 'WOMEN',
    name: 'T‑Shirt Name 9',
    price: '$23.00 – $28.00',
    colors: [
      { hex: '#000000', label: 'Black' },
      { hex: '#f59e0b', label: 'Orange' },
      { hex: '#ffffff', label: 'White' },
    ],
    image: '/product-06-a-300x366.jpg',
  },
  {
    id: 3,
    category: 'MEN',
    name: 'T‑Shirt Name 8',
    price: '$21.00 – $25.00',
    colors: [
      { hex: '#000000', label: 'Black' },
      { hex: '#f59e0b', label: 'Orange' },
      { hex: '#ffffff', label: 'White' },
    ],
    image: '/product-10-a-300x366.jpg',
  },
  {
    id: 4,
    category: 'WOMEN',
    name: 'T‑Shirt Name 7',
    price: '$36.00 – $39.00',
    colors: [
      { hex: '#000000', label: 'Black' },
      { hex: '#f59e0b', label: 'Orange' },
      { hex: '#ffffff', label: 'White' },
    ],
    image: '/product-08-a-300x366.jpg',
  },
]

const Product = ({ onViewCart, onCheckout, hideReviews }) => {
  const [selectedColorIndexById, setSelectedColorIndexById] = useState({})
  const [selectedSizeById, setSelectedSizeById] = useState({})
  const [selectedImageById, setSelectedImageById] = useState({})
  const [showCartPage, setShowCartPage] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  // color → image mapping (same for all products)
  const colorToImageMap = {
    Black: '/product-001-b-300x366.jpg',
    Orange: '/product-01-c-300x366.jpg',
    White: '/product-01-d-300x366.jpg',
  }

  // Restore selections + overlay from localStorage on first load
  useEffect(() => {
    try {
      const sizes = JSON.parse(localStorage.getItem('selectedSizeById') || '{}')
      const colors = JSON.parse(localStorage.getItem('selectedColorIndexById') || '{}')
      const images = JSON.parse(localStorage.getItem('selectedImageById') || '{}')
      setSelectedSizeById(sizes)
      setSelectedColorIndexById(colors)
      setSelectedImageById(images)

      const overlayOpen = localStorage.getItem('overlay_open') === 'true'
      const overlayProductId = parseInt(localStorage.getItem('overlay_product_id') || '', 10)
      if (overlayOpen && overlayProductId) {
        const prod = products.find(p => p.id === overlayProductId)
        if (prod) {
          setSelectedProduct(prod)
          setShowCartPage(true)
        }
      }
    } catch (_) {}
  }, [])

  // Persist selections
  useEffect(() => {
    localStorage.setItem('selectedSizeById', JSON.stringify(selectedSizeById))
  }, [selectedSizeById])
  useEffect(() => {
    localStorage.setItem('selectedColorIndexById', JSON.stringify(selectedColorIndexById))
  }, [selectedColorIndexById])
  useEffect(() => {
    localStorage.setItem('selectedImageById', JSON.stringify(selectedImageById))
  }, [selectedImageById])

  const handleSelectColor = (productId, colorIdx, label) => {
    setSelectedColorIndexById((prev) => ({ ...prev, [productId]: colorIdx }))
    // Only switch image if a size is already selected for this product
    if (selectedSizeById[productId]) {
      const newImage = colorToImageMap[label]
      if (newImage) {
        setSelectedImageById((prev) => ({ ...prev, [productId]: newImage }))
      }
    }
  }

  const handleSelectSize = (productId, size) => {
    setSelectedSizeById((prev) => ({ ...prev, [productId]: size }))
  }

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setShowCartPage(true)
    try {
      localStorage.setItem('overlay_open', 'true')
      localStorage.setItem('overlay_product_id', String(product.id))
      // push a history entry so browser Back closes the overlay (avoid duplicates)
      const current = (window.history.state && window.history.state.view) || 'home'
      if (current !== 'overlay') {
        window.history.pushState({ view: 'overlay', productId: product.id }, '', '/cartpage')
      }
    } catch (_) {}
  }

  // Handle browser Back to close overlay
  useEffect(() => {
    const onPop = (e) => {
      const v = (e.state && e.state.view) || 'home'
      if (v !== 'overlay') {
        setShowCartPage(false)
        try {
          localStorage.removeItem('overlay_open')
          localStorage.removeItem('overlay_product_id')
        } catch (_) {}
      }
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const closeCartPage = () => {
    try {
      localStorage.removeItem('overlay_open')
      localStorage.removeItem('overlay_product_id')
    } catch (_) {}
    // Only go back one step if current state is overlay; otherwise just hide
    try {
      const current = (window.history.state && window.history.state.view) || 'home'
      if (current === 'overlay') {
        window.history.back()
      } else {
        setShowCartPage(false)
      }
    } catch (_) {
      setShowCartPage(false)
    }
  }

  return (
    <>
      <section className="w-full">
        <div className="mx-auto" style={{ width: '100%', paddingLeft: '100px', paddingRight: '80px' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <article key={p.id} className="group cursor-pointer" onClick={() => handleProductClick(p)}>
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                  <img src={selectedImageById[p.id] || p.image} alt={p.name} className="w-full h-full object-cover object-center" />
                </div>
                <div className="mt-4">
                  <div className="text-xs tracking-wide text-gray-500 uppercase mb-1">{p.category}</div>
                  <button type="button" className="block text-left w-full text-lg font-medium hover:underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleProductClick(p); }}>
                    {p.name}
                  </button>
                  <div className="mt-1 text-sm text-gray-700">{p.price}</div>
                  <div className="mt-3 flex items-center gap-3">
                    {p.colors.map((c, idx) => {
                      const isSelected = selectedColorIndexById[p.id] === idx
                      return (
                        <button
                          type="button"
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectColor(p.id, idx, c.label)
                          }}
                          className={`group relative inline-flex items-center justify-center p-[2px] rounded-sm border ${
                            isSelected ? 'border-black' : 'border-gray-300 hover:border-black'
                          }`}
                          aria-label={c.label}
                          title={c.label}
                        >
                          <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] px-2 py-[2px] rounded shadow">
                            {c.label}
                            <span className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0 border-t-[6px] border-t-black border-x-[6px] border-x-transparent"></span>
                          </span>
                          <span
                            className="block h-3.5 w-3.5 ring-2 ring-white"
                            style={{ backgroundColor: c.hex }}
                          />
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    {['XS', 'S', 'M', 'L', 'XL'].map((s) => {
                      const isSelected = selectedSizeById[p.id] === s
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSelectSize(p.id, s)
                          }}
                          className={`px-2 py-1 text-[11px] rounded-sm border ${
                            isSelected ? 'border-black' : 'border-gray-300 hover:border-black'
                          }`}
                        >
                          {s}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

                 {/* Full Cart Page */}
        {showCartPage && selectedProduct && (
          <CartPage 
            selectedProduct={selectedProduct} 
            onClose={closeCartPage}
            onViewCart={onViewCart}
            onCheckout={onCheckout}
          />
        )}
    </>
  )
}

export default Product


