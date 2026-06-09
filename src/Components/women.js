import React, { useState } from 'react';

// 4 product cards from Product.js
const productCards = [
  { id: 1, category: 'MEN', name: 'T‑Shirt Name 10', price: '$33.00 – $36.00', image: '/product-09-a-300x366.jpg' },
  { id: 2, category: 'WOMEN', name: 'T‑Shirt Name 9', price: '$23.00 – $28.00', image: '/product-06-a-300x366.jpg' },
  { id: 3, category: 'MEN', name: 'T‑Shirt Name 8', price: '$21.00 – $25.00', image: '/product-10-a-300x366.jpg' },
  { id: 4, category: 'WOMEN', name: 'T‑Shirt Name 7', price: '$36.00 – $39.00', image: '/product-08-a-300x366.jpg' },
];
// 8 more cards (use previous demo or sale images)
const moreCards = [
  { id: 5, category: 'MEN', name: 'T‑Shirt Name 10', price: '$33.00 – $36.00', image: '/pexels-dhanno-18885576.jpg' },
  { id: 6, category: 'WOMEN', name: 'T‑Shirt Name 9', price: '$23.00 – $28.00', image: '/pexels-fari-14122252.jpg' },
  { id: 7, category: 'MEN', name: 'T‑Shirt Name 8', price: '$21.00 – $25.00', image: '/pexels-jean-carlos-1353551256-30435437.jpg' },
  { id: 8, category: 'WOMEN', name: 'T‑Shirt Name 7', price: '$36.00 – $39.00', image: '/pexels-karolina-grabowska-7692761.jpg' },
  { id: 9, category: 'MEN', name: 'T‑Shirt Name 10', price: '$33.00 – $36.00', image: '/pexels-mart-production-9558583.jpg' },
  { id: 10, category: 'WOMEN', name: 'T‑Shirt Name 9', price: '$23.00 – $28.00', image: '/pexels-mikhail-nilov-8669539.jpg' },
  { id: 11, category: 'MEN', name: 'T‑Shirt Name 8', price: '$21.00 – $25.00', image: '/pexels-mraflih12-3702587.jpg' },
  { id: 12, category: 'WOMEN', name: 'T‑Shirt Name 7', price: '$36.00 – $39.00', image: '/pexels-ronailson-1861907.jpg' },
];
const allCards = [...productCards, ...moreCards];

const CARDS_PER_PAGE = 12;


const Women = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');

  // Get all unique sizes and colors for filter dropdowns
  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const allColors = ['Black', 'Orange', 'White'];

  // Filtering logic
  let filtered = allCards.filter(card => {
    let match = true;
    if (search && !card.name.toLowerCase().includes(search.toLowerCase())) match = false;
    if (price && !card.price.includes(price)) match = false;
    if (size && card.sizes && !card.sizes.includes(size)) match = false;
    if (color && card.colors && !card.colors.some(c => c.label === color)) match = false;
    return match;
  });

  let totalPages = 2;
  let cardsToShow = [];
  if (page === 1) {
    // First page: show first 12 cards (productCards + first 8 of moreCards)
    cardsToShow = filtered.slice(0, 12);
  } else if (page === 2) {
    // Second page: show only the last 4 cards (sale cards)
    cardsToShow = filtered.slice(-4);
  }

  // Reset to page 1 if filters change
  React.useEffect(() => { setPage(1); }, [search, price, size, color]);


  return (
    <div style={{ minHeight: '80vh', padding: '2rem', display: 'flex', gap: 32 }}>
      {/* Sidebar on the left */}
      <aside style={{ minWidth: 260, maxWidth: 320, background: '#f7f7f7', borderRadius: 12, padding: 28, height: 'fit-content' }}>
        <h3 style={{ fontWeight: 600, fontSize: 20, marginBottom: 16 }}>Filters</h3>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Search by Name</label>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ width: '100%', marginTop: 4, padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Price</label>
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. $23" style={{ width: '100%', marginTop: 4, padding: 8, borderRadius: 4, border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Size</label>
          <select value={size} onChange={e => setSize(e.target.value)} style={{ width: '100%', marginTop: 4, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">All</option>
            {allSizes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontWeight: 500 }}>Color</label>
          <select value={color} onChange={e => setColor(e.target.value)} style={{ width: '100%', marginTop: 4, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}>
            <option value="">All</option>
            {allColors.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </aside>
      {/* Cards grid and search result count on the right */}
      <div style={{ flex: 1 }}>
        <div style={{ marginBottom: 16, fontWeight: 500, fontSize: 18 }}>
          Showing {cardsToShow.length} of {filtered.length} products
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cardsToShow.map((card, idx) => (
            <div key={card.id || idx} className="group">
              <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover object-center" />
              </div>
              <div className="mt-4">
                <div className="text-xs tracking-wide text-gray-500 uppercase mb-1">{card.category}</div>
                <div className="block text-lg font-medium">{card.name}</div>
                <div className="mt-1 text-sm text-gray-700">{card.price}</div>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination controls */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 16 }}>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>Previous</button>
          <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: '8px 16px', borderRadius: 4, border: '1px solid #ccc', background: page === totalPages ? '#eee' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Women;


