const Footer = () => {
  return (
    <footer className="bg-[#2e5a46] px-4 py-10 text-[#f4e8c3] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.8fr_0.9fr_1fr]">
          <div>
            <h3 className="text-2xl font-black uppercase tracking-wide">BUNBITE</h3>
            <p className="mt-4 max-w-sm text-sm leading-6 text-[#f4e8c3]/75">
              Fresh burgers, loaded fries, and bold flavors made for every craving.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.25em] text-[#efb53e]">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#f4e8c3]/80">
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Home</a></li>
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Menu</a></li>
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Best Sellers</a></li>
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Reviews</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.25em] text-[#efb53e]">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#f4e8c3]/80">
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Contact</a></li>
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Shipping</a></li>
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Privacy Policy</a></li>
              <li><a href="#" className="transition hover:text-[#f4e8c3]">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-[0.25em] text-[#efb53e]">Visit us</h4>
            <ul className="mt-4 space-y-3 text-sm text-[#f4e8c3]/80">
              <li>24 Burger Street</li>
              <li>Downtown, City 101</li>
              <li>+1 (555) 123-4567</li>
              <li>hello@bunbite.com</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#f4e8c3]/15 pt-5">
          <div className="flex flex-col gap-3 text-center text-sm text-[#f4e8c3]/70 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Bunbite. All rights reserved.</p>
            <div className="flex items-center justify-center gap-4">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>TikTok</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
