import React, { useState } from 'react';
import { useCart } from './CartContext';
import Navbar from './Navbar';
import Footer from './Footer';

const CartPage = ({ selectedProduct, onClose, onViewCart, onCheckout }) => {
  const [openSection, setOpenSection] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentMainImage, setCurrentMainImage] = useState(selectedProduct?.image || '');
  const [currentVariantImages, setCurrentVariantImages] = useState({
    image1: '/product-001-b-300x366.jpg',
    image2: '/product-01-c-300x366.jpg',
    image3: '/product-01-d-300x366.jpg',
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const { addToCart } = useCart();

  // Handler to open fullscreen modal
  const openFullscreen = (img) => setFullscreenImage(img);
  const closeFullscreen = () => setFullscreenImage(null);

  // Dynamic pricing based on selections
  const getDisplayPrice = () => {
    if (selectedColor && selectedSize) {
      const basePrice = 21;
      const colorMultiplier = { Black: 1, Orange: 1.2, White: 1.1 };
      const sizeMultiplier = { XS: 0.9, S: 0.95, M: 1, L: 1.05, XL: 1.1 };
      const unitPrice = basePrice * colorMultiplier[selectedColor] * sizeMultiplier[selectedSize];
      const totalPrice = unitPrice * quantity;
      return `$${totalPrice.toFixed(2)}`;
    } else {
      return selectedProduct?.price || '$21.00 – $25.00';
    }
  };

  const clearSelections = () => {
    setSelectedColor('');
    setSelectedSize('');
    setQuantity(1);
    // Reset images to default
    setCurrentMainImage(selectedProduct?.image || '');
    setCurrentVariantImages({
      image1: '/product-001-b-300x366.jpg',
      image2: '/product-01-c-300x366.jpg',
      image3: '/product-01-d-300x366.jpg',
    });
  };

  // color → image mapping
  const colorToImageMap = {
    Black: {
      main: '/product-001-b-300x366.jpg',
      variant1: '/product-001-b-300x366.jpg',
      variant2: '/product-01-c-300x366.jpg',
      variant3: '/product-01-d-300x366.jpg',
    },
    Orange: {
      main: '/product-01-c-300x366.jpg',
      variant1: '/product-01-c-300x366.jpg',
      variant2: '/product-01-d-300x366.jpg',
      variant3: '/product-001-b-300x366.jpg',
    },
    White: {
      main: '/product-01-d-300x366.jpg',
      variant1: '/product-01-d-300x366.jpg',
      variant2: '/product-001-b-300x366.jpg',
      variant3: '/product-01-c-300x366.jpg',
    },
  };

  // Update images when color changes
  const updateImages = (colorName) => {
    if (colorToImageMap[colorName]) {
      setCurrentMainImage(colorToImageMap[colorName].main);
      setCurrentVariantImages({
        image1: colorToImageMap[colorName].variant1,
        image2: colorToImageMap[colorName].variant2,
        image3: colorToImageMap[colorName].variant3,
      });
    }
  };

  const handleSelectColor = (colorName) => {
    setSelectedColor(colorName);
    updateImages(colorName);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const toggleSection = (sectionName) => {
    if (openSection === sectionName) {
      setOpenSection(null);
    } else {
      setOpenSection(sectionName);
    }
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      setShowSuccess(false);
      return;
    }
    const basePrice = 21;
    const colorMultiplier = { Black: 1, Orange: 1.2, White: 1.1 };
    const sizeMultiplier = { XS: 0.9, S: 0.95, M: 1, L: 1.05, XL: 1.1 };
    const unitPrice = basePrice * colorMultiplier[selectedColor] * sizeMultiplier[selectedSize];

    addToCart(
      {
        ...selectedProduct,
        price: unitPrice,
        color: selectedColor,
        size: selectedSize,
        image: currentMainImage,
      },
      quantity,
      selectedColor,
      selectedSize
    );

    setShowSuccess(true);

    // ✅ Auto clear selections after successful add
    clearSelections();

    setTimeout(() => setShowSuccess(false), 1500);
  };

  if (!selectedProduct) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <Navbar 
        onViewCart={onViewCart} 
        onCheckout={onCheckout} 
        onLogoClick={onClose}
        isHome={false} // Explicitly not home, so login button never shows
      />

      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg border text-center">
            <p className="mb-4 text-lg font-medium">Item added to cart successfully!</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg">
                <img
                  src={currentMainImage}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Additional Product Images */}
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openFullscreen(currentVariantImages.image1)}
                  >
                    <img
                      src={currentVariantImages.image1}
                      alt="Product variant 1"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div
                    className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg cursor-pointer"
                    onClick={() => openFullscreen(currentVariantImages.image2)}
                  >
                    <img
                      src={currentVariantImages.image2}
                      alt="Product variant 2"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="flex justify-start">
                  <div
                    className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-lg w-1/2 cursor-pointer"
                    onClick={() => openFullscreen(currentVariantImages.image3)}
                  >
                    <img
                      src={currentVariantImages.image3}
                      alt="Product variant 3"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* Fullscreen Image Modal */}
              {fullscreenImage && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-90 transition-all">
                  <div className="absolute inset-0" onClick={closeFullscreen} />
                  <div className="relative z-10 max-w-2xl w-full flex flex-col items-center">
                    <img
                      src={fullscreenImage}
                      alt="Fullscreen"
                      className="w-full h-auto object-contain rounded shadow-lg"
                      style={{ maxHeight: '80vh' }}
                    />
                    <button
                      onClick={closeFullscreen}
                      className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-40 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  {selectedProduct.category}
                </span>
                <h1 className="mt-2 text-3xl font-bold text-gray-900">
                  {selectedProduct.name}
                </h1>
                <p className="mt-3 text-2xl text-gray-900">{getDisplayPrice()}</p>
              </div>

              {/* Product Description */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Description</h3>
                <p className="mt-2 text-gray-600">
                  This premium t-shirt is crafted from high-quality cotton for ultimate comfort and
                  durability. Perfect for everyday wear, it features a classic fit and comes in
                  multiple colors and sizes to suit your style preferences.
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Color</h3>
                <div className="mt-3 flex items-center space-x-3">
                  {selectedProduct.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectColor(color.label)}
                      className={`relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                        selectedColor === color.label ? 'ring-2 ring-offset-2 ring-black' : ''
                      }`}
                    >
                      <span
                        className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="sr-only">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Size</h3>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSelectSize(size)}
                      className={`py-2 px-3 text-sm font-medium border border-gray-300 rounded-md hover:border-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                        selectedSize === size ? 'border-black' : ''
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <h3 className="text-lg font-medium text-gray-900">Quantity</h3>
                <div className="mt-3 flex items-center space-x-3">
                  <button
                    onClick={handleQuantityDecrease}
                    className="p-2 border border-gray-300 rounded-md hover:border-black transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-lg font-medium min-w-[2rem] text-center">{quantity}</span>
                  <button
                    onClick={handleQuantityIncrease}
                    className="p-2 border border-gray-300 rounded-md hover:border-black transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Collapsible Sections */}
              {/* (your collapsible sections remain unchanged here) */}

              {/* Add to Cart Button */}
              <div className="pt-6">
                <button
                  className="w-full bg-black text-white py-4 px-6 text-lg font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
