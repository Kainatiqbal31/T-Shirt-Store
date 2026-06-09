import React from 'react';

const ShopNow = () => {
	return (
		   <section
			   className="relative w-full max-w-7xl mx-auto min-h-[800px] h-[95vh] flex items-center justify-center bg-fixed bg-cover bg-center shadow-lg"
			   style={{
				   backgroundImage: "url('/bg-01.jpg')",
				   marginTop: '2rem',
				   marginBottom: '2rem',
			   }}
		   >
			<div className="w-full h-full bg-black/20 flex items-center justify-center">
				<div className="text-white text-center w-full max-w-2xl mx-auto z-10">
					<p className="text-base text-[13px] mb-4 tracking-wide animate-slideDown">New Collection</p>
					<h1 className="text-3xl md:text-4xl font-semibold mb-4 animate-slideDown delay-100">Be different in your own way!</h1>
					<h2 className="text-lg md:text-2xl mb-8 font-semibold animate-slideDown delay-200">Find your unique style.</h2>
					<button className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-900 transition">Shop Collection</button>
				</div>
			</div>
			<style>{`
				@keyframes slideDown {
					from { opacity: 0; transform: translateY(-40px); }
					to { opacity: 1; transform: translateY(0); }
				}
				.animate-slideDown { animation: slideDown 1s ease; }
				.delay-100 { animation-delay: 0.1s; }
				.delay-200 { animation-delay: 0.2s; }
			`}</style>
		</section>
	);
};

export default ShopNow;
