import React, { useMemo, useState, useEffect } from 'react'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

const Field = ({ label, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
)

const CheckoutView = ({ onBackToShop, user, onLoginClick, onLogout, onViewCart, onLogoClick }) => {
  const { cartItems } = useCart()

  // Form state (basic fields for confirmation)
  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    country: 'United States (US)',
    address1: '',
    address2: '',
    city: '',
    state: 'California',
    zip: '',
    phone: ''
  })
  const update = (key) => (e) => setForm(prev => ({ ...prev, [key]: e.target.value }))

  const [showOrderPopup, setShowOrderPopup] = useState(false)

  // Coupon state (persisted)
  const [couponCode, setCouponCode] = useState(() => localStorage.getItem('couponCode') || '')
  const [couponApplied, setCouponApplied] = useState(() => localStorage.getItem('couponApplied') === 'true')
  const [couponFeedback, setCouponFeedback] = useState({ message: '', isError: false })

  useEffect(() => {
    localStorage.setItem('couponCode', couponCode)
    localStorage.setItem('couponApplied', String(couponApplied))
  }, [couponCode, couponApplied])

  const baseSubtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  )

  const isValidCoupon = couponApplied && couponCode.trim() === '34567'
  const discountRate = isValidCoupon ? 0.05 : 0
  const discountedSubtotal = useMemo(
    () => (baseSubtotal * (1 - discountRate)),
    [baseSubtotal, discountRate]
  )

  const handleApplyCoupon = () => {
    if (couponCode.trim() === '34567') {
      setCouponApplied(true)
      setCouponFeedback({ message: '5% discount applied', isError: false })
    } else {
      setCouponApplied(false)
      setCouponFeedback({ message: 'Invalid coupon code', isError: true })
    }
    // Auto-hide feedback after 2.5s
    setTimeout(() => setCouponFeedback({ message: '', isError: false }), 2500)
  }

  const handlePlaceOrder = () => {
    setShowOrderPopup(true)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onViewCart={onViewCart || (()=>{})}
        onCheckout={onBackToShop}
        onLogoClick={onLogoClick}
        user={user}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
      />
      <main className="flex-1 w-full px-0 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: form - page scroll, wider, with extra inner left gap */}
          <div className="lg:col-span-7 bg-rose-50 rounded pl-16 pr-6 py-6">
            <h2 className="text-xl font-semibold mb-4">Contact</h2>
            <Field label="Email Address *">
              <input className="w-full border rounded px-3 py-2" placeholder="you@example.com" value={form.email} onChange={update('email')} />
            </Field>

            <h2 className="text-xl font-semibold mt-6 mb-4">Billing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="First name *"><input className="w-full border rounded px-3 py-2" value={form.firstName} onChange={update('firstName')} /></Field>
              <Field label="Last name *"><input className="w-full border rounded px-3 py-2" value={form.lastName} onChange={update('lastName')} /></Field>
            </div>
            <Field label="Country / Region">
              <select className="w-full border rounded px-3 py-2" value={form.country} onChange={update('country')}>
                <option>United States (US)</option>
              </select>
            </Field>
            <Field label="House number and street name *"><input className="w-full border rounded px-3 py-2" value={form.address1} onChange={update('address1')} /></Field>
            <Field label="Apartment, suite, unit, etc. (optional)"><input className="w-full border rounded px-3 py-2" value={form.address2} onChange={update('address2')} /></Field>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="Town / City *"><input className="w-full border rounded px-3 py-2" value={form.city} onChange={update('city')} /></Field>
              <Field label="State"><input className="w-full border rounded px-3 py-2" value={form.state} onChange={update('state')} /></Field>
              <Field label="Postcode / ZIP *"><input className="w-full border rounded px-3 py-2" value={form.zip} onChange={update('zip')} /></Field>
            </div>
            <Field label="Phone *"><input className="w-full border rounded px-3 py-2" value={form.phone} onChange={update('phone')} /></Field>

            <h2 className="text-xl font-semibold mt-6 mb-4">Additional Information</h2>
            <Field label="Notes about your order, e.g. special notes for delivery.">
              <textarea className="w-full border rounded px-3 py-2" rows={4} />
            </Field>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment</h2>
            <div className="border rounded p-4 text-gray-600">
              Sorry, it seems that there are no available payment methods for your state. Please contact us if you require assistance or wish to make alternate arrangements.
            </div>

            <button className="mt-6 w-full bg-black text-white py-3 rounded hover:bg-gray-800" onClick={handlePlaceOrder}>Place Order ${discountedSubtotal.toFixed(2)}</button>
          </div>

          {/* Right: sticky order summary (kept at same position) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="sticky top-24">
              {cartItems.map(item => (
                <div key={item.id + item.color + item.size} className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.quantity}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">Size: {item.size}</div>
                  </div>
                  <div className="font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}

              <div className="mt-6">
                <div className="flex gap-3">
                  <input className="flex-1 border rounded px-3 py-2" placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                  <button className="bg-black text-white px-5 rounded hover:bg-gray-800" onClick={handleApplyCoupon}>Apply</button>
                </div>
                <div className="mt-1 min-h-[20px]">
                  {couponFeedback.message && (
                    <div className={`${couponFeedback.isError ? 'text-red-500' : 'text-green-600'} text-xs`}>{couponFeedback.message}</div>
                  )}
                </div>
                <div className="mt-3 flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${discountedSubtotal.toFixed(2)}</span>
                </div>
                <div className="mt-2 flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${discountedSubtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order confirmation popup */}
      {showOrderPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded shadow-xl w-full max-w-lg mx-4 p-6">
            <h3 className="text-xl font-semibold mb-4">Order placed successfully</h3>
            <p className="text-gray-700 mb-4">Thank you, {form.firstName || 'Customer'}! Your order has been placed.</p>
            <div className="text-sm text-gray-700 space-y-1 mb-4">
              <div><span className="font-medium">Email:</span> {form.email || '—'}</div>
              <div><span className="font-medium">Name:</span> {form.firstName || '—'} {form.lastName || ''}</div>
              <div><span className="font-medium">Phone:</span> {form.phone || '—'}</div>
              <div><span className="font-medium">Address:</span> {form.address1 || '—'} {form.address2} {form.city} {form.state} {form.zip}</div>
              <div><span className="font-medium">Country:</span> {form.country}</div>
              <div><span className="font-medium">Total Paid:</span> ${discountedSubtotal.toFixed(2)}</div>
            </div>
            <div className="bg-gray-50 border rounded p-3 text-gray-800 mb-4">
              Estimated delivery: <span className="font-medium">6–7 working days</span>.
            </div>
            <div className="text-right">
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800" onClick={() => setShowOrderPopup(false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default CheckoutView
