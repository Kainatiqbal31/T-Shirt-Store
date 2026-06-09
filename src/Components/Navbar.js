import React, { useState } from 'react';
import { useCart } from './CartContext';

const Navbar = ({ onViewCart, onCheckout, onLogoClick, onLoginClick, user, onLogout, isHome }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showEmptyCartPopup, setShowEmptyCartPopup] = useState(false);
  const { cartItems, updateQuantity, removeItem } = useCart();
  // Use prop if provided, else fallback to pathname
  const isHomePage = typeof isHome === 'boolean' ? isHome : window.location.pathname === '/';

  const toggleCart = () => {
    if (cartItems.length === 0) {
      setShowEmptyCartPopup(true);
      setIsCartOpen(true);
    } else {
      setIsCartOpen((prev) => !prev);
      setShowEmptyCartPopup(false);
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setShowEmptyCartPopup(false);
  };

  const getCartSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

    return (
      <div>
      {/* ... existing nav code ... */}
      <nav className="bg-white shadow">
        <div className="w-full px-8 md:px-10">
          <div className="grid grid-cols-3 items-center h-24 md:h-28">
            <div className="flex items-center gap-4 text-[16px] font-normal whitespace-nowrap h-full">
              {/* ... nav links ... */}
              <a href="/" className="relative flex items-center h-full tracking-wide text-black hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-400 after:opacity-0 hover:after:opacity-100 transition-colors">BUY T-SHIRTS</a>
              <a href="/shop" className="relative flex items-center h-full tracking-wide text-black hover:text-gray-600 after:content-[''] after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-400 after:opacity-0 hover:after:opacity-100 transition-colors">WOMEN</a>
              <a href="/about" className="relative flex items-center h-full tracking-wide text-black hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-400 after:opacity-0 hover:after:opacity-100 transition-colors">MEN</a>
              <a href="/about" className="relative flex items-center h-full tracking-wide text-black hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-400 after:opacity-0 hover:after:opacity-100 transition-colors">ABOUT</a>
              <a href="/about" className="relative flex items-center h-full tracking-wide text-black hover:text-gray-600 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-px after:bg-gray-400 after:opacity-0 hover:after:opacity-100 transition-colors">CONTACT</a>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  if (window.location.pathname !== '/') {
                    window.history.pushState({}, '', '/');
                  }
                  if (onLogoClick) onLogoClick();
                }}
                className="inline-flex items-center"
                style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}
                aria-label="Go to homepage"
                title="Go to homepage"
              >
                <img src="/logo-regular.png" alt="Logo" className="h-12 md:h-14" />
              </button>
            </div>
            <div className="flex items-center justify-end gap-3 md:gap-6 pr-4">
              <button aria-label="Search" className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18a7.5 7.5 0 006.15-3.35z" />
                </svg>
              </button>
              <button onClick={toggleCart} className="hidden sm:inline font-semibold tracking-wide hover:text-gray-600 cursor-pointer">${getCartSubtotal()}</button>
              <button onClick={toggleCart} className="relative inline-flex items-center cursor-pointer">
                <img src="/icons8-shopping-cart-50.png" alt="Cart" className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1 text-xs rounded-full bg-black text-white flex items-center justify-center">{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="px-4 py-2 border border-gray-900 rounded-md text-sm md:text-base font-medium bg-gray-100 text-black">{user.name || user.username}</span>
                  <button onClick={onLogout} className="px-2 py-1 text-xs border border-gray-400 rounded hover:bg-gray-200">Logout</button>
                </div>
              ) : (
                isHomePage && onLoginClick && <button onClick={onLoginClick} className="px-4 py-2 border border-gray-900 rounded-md text-sm md:text-base font-medium hover:bg-gray-900 hover:text-white">LOG IN</button>
              )}
            </div>
            </div>
          </div>
        </nav>
      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeCart} />
          {/* Sidebar */}
          <div className="fixed top-0 right-0 h-full w-80 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out bg-white">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Shopping Cart</h2>
                <button onClick={closeCart} className="text-2xl font-light hover:text-gray-600 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center transition-colors">×</button>
              </div>
              {/* Cart Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <p>No products in the cart.</p>
                  </div>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={item.id + item.color + item.size} className="flex items-center mb-6 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover mr-4" />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500 mb-2">Size: {item.size} | Color: {item.color}</div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.color, item.size, Math.max(1, item.quantity - 1))} className="px-2 py-1 border rounded">-</button>
                          <span className="px-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-gray-400 hover:text-red-500 text-lg mb-2">×</button>
                        <div className="text-gray-900 font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Footer */}
              <div className="border-t border-gray-200 p-6">
                {cartItems.length === 0 ? (
                  <button onClick={closeCart} className="w-full bg-black text-white py-3 px-4 rounded hover:bg-white hover:text-black hover:border hover:border-black transition-colors">Continue Shopping</button>
                ) : (
                  <>
                    <div className="flex justify-between mb-4 text-lg font-medium">
                      <span>Subtotal:</span>
                      <span>${getCartSubtotal()}</span>
                    </div>
                    <button className="w-full bg-black text-white py-3 px-4 rounded mb-3 hover:bg-gray-800 transition-colors" onClick={() => { setIsCartOpen(false); if (onViewCart) onViewCart(); }}>View cart</button>
                    <button className="w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors" onClick={() => { setIsCartOpen(false); if (onCheckout) onCheckout(); }}>Checkout</button>
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Popup for empty cart */}
          {showEmptyCartPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded shadow-lg border text-center">
                <p className="mb-4 text-lg font-medium">Select product to see that in cart</p>
                <button onClick={closeCart} className="bg-black text-white px-4 py-2 rounded">OK</button>
              </div>
            </div>
          )}
        </>
      )}
      </div>
  );
};

export default Navbar;
