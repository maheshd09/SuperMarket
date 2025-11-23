import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `p-3 rounded-xl font-medium transition-all ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow"
        : "text-gray-700 hover:bg-blue-100"
    }`;

  return (
    <div className="w-64 bg-white/70 backdrop-blur-xl shadow-xl h-full px-6 py-8 border-r">
      <h2 className="text-2xl font-bold mb-10 tracking-wide">Dashboard</h2>

      <nav className="flex flex-col gap-4">
        <Link to="/products" className={linkClasses("/products")}>
          ➕  Products
        </Link>

        <Link to="/basket" className={linkClasses("/basket")}>
          🧺 View Basket
        </Link>

        <Link to="/saved" className={linkClasses("/saved")}>
          💾 Saved
        </Link>
      </nav>
    </div>
  );
}
