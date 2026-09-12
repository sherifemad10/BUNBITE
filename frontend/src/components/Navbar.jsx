import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut, Menu, UserRound, X } from "lucide-react";
import { DataContext } from "../Hooks/DataContext";
import cartIcon from "../assets/cart.png";

const Navbar = () => {
  const { auth, cart, logout } = useContext(DataContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const signOut = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#2e5a46] shadow-lg shadow-[#f4e8c3]/20">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link
          to="/"
          className="text-2xl font-bold tracking-wide text-[#f4e8c3]"
        >
          <h1>
          BUNBITE
          </h1>
        </Link>
        <nav
          className={`${open ? "absolute left-0 top-16 flex w-full flex-col bg-[#2e5a46] p-4" : "hidden"} gap-5 text-sm font-medium text-[#f4e8c3]/80 md:static md:flex md:w-auto md:flex-row md:bg-transparent md:p-0`}
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-[#f4e8c3]"
          >
            Home
          </Link>
          <a
            href="/#menu"
            onClick={() => setOpen(false)}
            className="hover:text-[#f4e8c3]"
          >
            Menu
          </a>
          {auth?.role === "admin" && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="font-bold text-[#efb53e]"
            >
              Dashboard
            </Link>
          )}
          {auth && auth.role !== "admin" && (
            <Link
              to="/orders"
              onClick={() => setOpen(false)}
              className="hover:text-[#f4e8c3]"
            >
              My orders
            </Link>
          )}
          {!auth && (
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="md:hidden"
            >
              Create account
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          {auth && (
            <span className="hidden items-center gap-2 text-sm text-[#f4e8c3]/80 lg:flex">
              <UserRound size={16} />
              {auth.name}
            </span>
          )}
          {auth && (
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative flex h-10 w-10 items-center justify-center text-[#f4e8c3] cursor-pointer"
            >
              {/* <ShoppingCart size={22} /> */}
              <figure className="w-8">
                <img src={cartIcon} alt="Shopping cart" className="w-full" />
              </figure>
              <span className="absolute right-0 top-0 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] text-white">
                {cartCount}
              </span>
            </Link>
          )}
          {!auth ? (
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-lg bg-[#f4e8c3] px-4 py-2 text-sm font-semibold text-[#2e5a46] sm:flex cursor-pointer"
            >
              <LogIn size={16} />
              Login
            </Link>
          ) : (
            <button
              type="button"
              onClick={signOut}
              className="hidden items-center gap-2 rounded-lg bg-[#f4e8c3] px-4 py-2 text-sm font-semibold text-[#2e5a46] sm:flex cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>
          )}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center text-[#f4e8c3] md:hidden cursor-pointer"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
