import React from 'react'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

const CartView = ({ onBackToShop, onProceedToCheckout, onLogoClick, user, onLoginClick, onLogout }) => {
  const { cartItems, updateQuantity, removeItem } = useCart()

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen flex flex-col bg-white">
     <Navbar 
      onViewCart={onBackToShop} 
      onCheckout={onProceedToCheckout} 
      onLogoClick={onLogoClick}
      user={user}
    onLoginClick={undefined}
      onLogout={onLogout}
    />

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-semibold mb-8">Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-600 py-24">
            <p>Your cart is currently empty.</p>
            <button type="button" onClick={onBackToShop} className="mt-6 bg-black text-white px-6 py-3 rounded hover:bg-gray-800">Return to shop</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items */}
            <div className="lg:col-span-2 border rounded-md">
              <div className="grid grid-cols-12 px-6 py-4 border-b bg-rose-50 text-sm font-medium text-gray-700 gap-x-6">
                <div className="col-span-6">Product</div>
                <div className="col-span-2">Price</div>
                <div className="col-span-2">Quantity</div>
                <div className="col-span-2">Subtotal</div>
              </div>
              {cartItems.map(item => (
                <div key={item.id + item.color + item.size} className="grid grid-cols-12 items-center px-6 py-5 border-b last:border-b-0 gap-x-6">
                  <div className="col-span-6 flex items-center gap-4">
                    <button onClick={() => removeItem(item.id, item.color, item.size)} className="text-gray-400 hover:text-red-500">×</button>
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">Size: {item.size}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-gray-700">${item.price.toFixed(2)}</div>
                  <div className="col-span-2">
                    <div className="inline-flex items-center border rounded">
                      <button onClick={() => updateQuantity(item.id, item.color, item.size, Math.max(1, item.quantity - 1))} className="px-3 py-1">-</button>
                      <span className="px-4">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)} className="px-3 py-1">+</button>
                    </div>
                  </div>
                  <div className="col-span-2 font-semibold ml-4 md:ml-6">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="border rounded-md h-fit">
              <div className="px-6 py-4 border-b bg-rose-50 font-medium">Cart totals</div>
              <div className="px-6 py-4 flex justify-between border-b">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="px-6 py-4 flex justify-between">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="p-6">
                <button className="w-full bg-black text-white py-3 rounded hover:bg-gray-800" onClick={onProceedToCheckout}>Proceed to checkout</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default CartView
