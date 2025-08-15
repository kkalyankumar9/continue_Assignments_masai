import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Column 1 - App Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">📚 My Library</h2>
          <p className="text-sm text-gray-400">
            Discover, read, and share your favorite books.  
            A community for book lovers to explore and connect.
          </p>
        </div>

        {/* Column 2 - Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/categories" className="hover:text-white">Categories</a></li>
            <li><a href="/top-rated" className="hover:text-white">Top Rated</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3 - Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-400">Facebook</a>
            <a href="#" className="hover:text-sky-400">Twitter</a>
            <a href="#" className="hover:text-pink-400">Instagram</a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-sm text-gray-400 text-center py-3">
        &copy; {new Date().getFullYear()} My Library App. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
