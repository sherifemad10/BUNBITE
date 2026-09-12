import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Hooks/DataContext";

const Menu = () => {
  const { product, auth, addToCart, error } = useContext(DataContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const categories = useMemo(() => ["All", ...new Set(product.map((item) => item.category))], [product]);
  const visibleProducts = category === "All" ? product : product.filter((item) => item.category === category);

  const addItem = (item) => {
    if (!auth) {
      navigate("/login");
      return;
    }
    addToCart(item);
  };

  return (
    <section id="menu" className="bg-[#f5ecdc] px-4 py-12 text-[#2f4d3b]">
      <div className="mx-auto max-w-6xl">
        <div className="text-center"><h2 className="text-3xl font-black uppercase sm:text-5xl">Discover our menu</h2><p className="mt-2 text-[#2f4d3b]/70">Fresh meals, ready to order.</p></div>
        <div className="mt-7 flex flex-wrap justify-center gap-2">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`rounded-full px-4 py-2 text-sm font-bold ${category === item ? "bg-[#2e5a46] text-white" : "bg-white"}`}>{item}</button>)}</div>
        {error && product.length === 0 ? <p className="mt-8 text-center font-semibold text-red-700">The menu is temporarily unavailable. Please try again later.</p> : null}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((item) => <article key={item.id} className="flex flex-col rounded-2xl bg-white p-4 shadow-sm"><img src={item.image} alt={item.name} className="h-44 w-full rounded-xl object-cover" /><div className="flex flex-1 flex-col pt-4"><p className="text-xs font-bold uppercase tracking-wider text-[#ef9f21]">{item.category}</p><h3 className="mt-1 text-xl font-black">{item.name}</h3><p className="mt-2 flex-1 text-sm text-[#2f4d3b]/70">{item.description}</p><div className="mt-4 flex items-center justify-between"><strong className="text-xl">${Number(item.price).toFixed(2)}</strong><button type="button" onClick={() => addItem(item)} className="rounded-lg bg-[#2e5a46] px-4 py-2 text-sm font-bold text-white">{auth ? "Add to cart" : "Login to order"}</button></div></div></article>)}</div>
      </div>
    </section>
  );
};

export default Menu;
