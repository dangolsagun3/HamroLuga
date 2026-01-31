"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-bold mb-2">HamroLuga</h4>
            <p className="text-sm text-muted">Quality products at great prices. Fast delivery.</p>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Shop</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/cart">Cart</Link></li>
              <li><Link href="/checkout">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Company</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-2">Stay in touch</h5>
            <p className="text-sm text-muted mb-4">Subscribe for updates and offers.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input placeholder="Email address" className="border rounded px-3 py-2 text-sm w-full" />
              <button className="bg-blue-600 text-black px-4 py-2 rounded text-sm">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t mt-8 pt-6 text-sm text-muted text-center">
          © {new Date().getFullYear()} HamroLuga. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
