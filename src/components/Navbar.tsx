import { useState, useEffect } from "react";
import { Heart, ShoppingBag, Menu, X, Search, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const { totalCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();

  // Load favorites from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("favorites");
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavorites([]);
    }
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800 hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Left nav */}
          <div className="hidden lg:flex items-center gap-8">
            {["Collections", "Our Craft", "Heritage"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-sans tracking-widest uppercase text-gray-600 hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-2xl lg:text-3xl font-serif tracking-[0.3em] gold-text font-semibold">
              Dharohar
            </h1>
          </Link>

          {/* Right nav */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="hidden lg:block text-gray-600 hover:text-primary transition-colors">
              <Search size={20} />
            </button>

            {/* User menu or Login button */}
            {isLoggedIn && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-primary transition-colors px-3 py-2 rounded-md">
                    <User size={20} />
                    <span className="text-sm">{user.name || user.email || "User"}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden lg:block text-gray-600 hover:text-primary transition-colors"
              >
                <User size={20} />
              </button>
            )}

            {/* Favorites */}
            <Link
              to="/favorites"
              className="text-gray-600 hover:text-primary transition-colors relative"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-sans">
                  {favorites.length > 99 ? "99+" : favorites.length}
                </span>
              )}
              {favorites.length === 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-sans">
                  0
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="text-gray-600 hover:text-primary transition-colors relative flex items-center">
              <ShoppingBag size={20} />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-sans">
                  {totalCount > 99 ? "99+" : totalCount}
                </span>
              )}
              {totalCount === 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-sans">
                  0
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {["Collections", "Our Craft", "Heritage", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setIsOpen(false)}
                className="text-sm font-sans tracking-widest uppercase text-gray-600 hover:text-primary transition-colors py-2"
              >
                {item}
              </a>
            ))}
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="text-sm font-sans tracking-widest uppercase text-gray-600 hover:text-primary transition-colors py-2 flex items-center gap-2"
            >
              Cart {totalCount > 0 && <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">{totalCount}</span>}
            </Link>
            <Link
              to="/favorites"
              onClick={() => setIsOpen(false)}
              className="text-sm font-sans tracking-widest uppercase text-gray-600 hover:text-primary transition-colors py-2 flex items-center gap-2"
            >
              Favorites {favorites.length > 0 && <span className="w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center">{favorites.length}</span>}
            </Link>
            {isLoggedIn ? (
              <Button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                variant="outline"
                className="w-full justify-start"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setAuthModalOpen(true);
                  setIsOpen(false);
                }}
                className="w-full"
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </nav>
  );
};

export default Navbar;
