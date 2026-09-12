import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../Hooks/DataContext";

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useContext(DataContext);
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "" });
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const total = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const handleOrder = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    try {
      const createdOrder = await placeOrder(customer);
      setOrder(createdOrder);
    } catch (error) {
      setMessage(error.response?.data?.message || "Unable to place the order.");
    } finally {
      setSubmitting(false);
    }
  };

  if (order) {
    return (
      <main className="min-h-screen bg-[#f5ecdc] px-4 pb-16 pt-28 text-[#2f4d3b]">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#2e5a46] text-3xl text-white">✓</div>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-[#ef9f21]">Order confirmed</p>
          <h1 className="mt-2 text-4xl font-black">Thanks for your order!</h1>
          <p className="mt-3 text-[#2f4d3b]/70">Order #{order.id.slice(-6)} is now being prepared.</p>
          <div className="mt-6 rounded-2xl bg-[#f4e8c3] p-5 text-left">
            <div className="flex justify-between"><span>Status</span><strong className="capitalize">{order.status}</strong></div>
            <div className="mt-2 flex justify-between"><span>Total</span><strong>${Number(order.total).toFixed(2)}</strong></div>
            <p className="mt-3 text-sm">Delivery to: {order.customer?.address}</p>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><Link to="/orders" className="rounded-lg bg-[#2e5a46] px-5 py-3 font-bold text-white">Track my orders</Link><Link to="/" className="rounded-lg border border-[#2e5a46] px-5 py-3 font-bold">Continue shopping</Link></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5ecdc] px-4 pb-16 pt-28 text-[#2f4d3b]"><div className="mx-auto max-w-5xl"><h1 className="text-4xl font-black">Your cart</h1>{!cart.length ? <div className="mt-8 rounded-2xl bg-white p-8 text-center"><p>Your cart is empty.</p><Link to="/" className="mt-5 inline-block rounded-lg bg-[#2e5a46] px-5 py-3 font-bold text-white">Browse menu</Link></div> : <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"><div className="space-y-3">{cart.map((item) => <div key={item.id} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"><img src={item.image} alt="" className="h-20 w-20 rounded-xl object-cover" /><div className="min-w-0 flex-1"><h2 className="font-bold">{item.name}</h2><p>${Number(item.price).toFixed(2)} each</p></div><div className="flex items-center gap-2"><button type="button" onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="h-8 w-8 rounded bg-[#f4e8c3]">-</button><span>{item.quantity}</span><button type="button" onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="h-8 w-8 rounded bg-[#f4e8c3]">+</button></div><button type="button" onClick={() => removeFromCart(item.id)} className="text-sm font-bold text-red-600">Remove</button></div>)}</div><form onSubmit={handleOrder} className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-black">Delivery information</h2><p className="mt-1 text-sm text-[#2f4d3b]/60">Where should we deliver your order?</p><label className="mt-5 block text-sm font-bold">Full name<input required value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })} className="mt-2 h-12 w-full rounded-lg border border-[#2f4d3b]/20 px-3 outline-none focus:border-[#2e5a46]" /></label><label className="mt-4 block text-sm font-bold">Phone number<input required type="tel" value={customer.phone} onChange={(event) => setCustomer({ ...customer, phone: event.target.value })} className="mt-2 h-12 w-full rounded-lg border border-[#2f4d3b]/20 px-3 outline-none focus:border-[#2e5a46]" /></label><label className="mt-4 block text-sm font-bold">Delivery address<textarea required rows="3" value={customer.address} onChange={(event) => setCustomer({ ...customer, address: event.target.value })} className="mt-2 w-full rounded-lg border border-[#2f4d3b]/20 p-3 outline-none focus:border-[#2e5a46]" /></label>{message && <p role="alert" className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">{message}</p>}<div className="mt-6 flex items-center justify-between border-t border-[#2f4d3b]/10 pt-4"><span className="text-xl font-black">${total.toFixed(2)}</span><button disabled={submitting} type="submit" className="rounded-lg bg-[#2e5a46] px-5 py-3 font-bold text-white disabled:opacity-60">{submitting ? "Confirming..." : "Confirm order"}</button></div></form></div>}<button type="button" onClick={() => navigate("/")} className="mt-6 text-sm font-bold underline">Continue shopping</button></div></main>
  );
};

export default Cart;
