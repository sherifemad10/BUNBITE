import { useContext, useEffect, useMemo, useState } from "react";
import { DataContext } from "../Hooks/DataContext";

const emptyProduct = { name: "", category: "Main Course", price: "", description: "", image: "", available: true };

const Dashboard = () => {
  const { auth, product, orders, loadOrders, updateOrderStatus, createMenuItem, updateMenuItem, deleteMenuItem } = useContext(DataContext);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadOrders().catch((error) => setMessage(error.response?.data?.message || "Unable to load orders."));
  }, [loadOrders]);

  const analytics = useMemo(() => {
    const now = Date.now();
    const week = orders.filter((order) => now - new Date(order.createdAt).getTime() <= 7 * 24 * 60 * 60 * 1000);
    const month = orders.filter((order) => now - new Date(order.createdAt).getTime() <= 30 * 24 * 60 * 60 * 1000);
    const products = orders.flatMap((order) => order.items || []).reduce((result, item) => {
      result[item.name] = (result[item.name] || 0) + item.quantity;
      return result;
    }, {});
    const best = Object.entries(products).sort((a, b) => b[1] - a[1])[0];
    return { week: week.length, month: month.length, revenue: orders.reduce((sum, order) => sum + Number(order.total || 0), 0), best: best ? `${best[0]} (${best[1]} sold)` : "No sales yet" };
  }, [orders]);

  const changeStatus = async (orderId, status) => {
    try { await updateOrderStatus(orderId, status); } catch (error) { setMessage(error.response?.data?.message || "Unable to update order status."); }
  };

  const submitProduct = async (event) => {
    event.preventDefault();
    try {
      if (editingId) await updateMenuItem(editingId, form);
      else await createMenuItem(form);
      setForm(emptyProduct);
      setEditingId(null);
      setMessage("Product saved successfully.");
    } catch (error) { setMessage(error.response?.data?.message || "Unable to save product."); }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setForm({ name: item.name, category: item.category, price: item.price, description: item.description, image: item.image, available: item.available !== false });
  };

  const removeProduct = async (itemId) => {
    if (!window.confirm("Delete this product?")) return;
    try { await deleteMenuItem(itemId); setMessage("Product deleted."); } catch (error) { setMessage(error.response?.data?.message || "Unable to delete product."); }
  };

  return (
    <main className="min-h-screen bg-[#f5ecdc] px-4 pb-16 pt-28 text-[#2f4d3b]"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#ef9f21]">Admin area</p><h1 className="mt-2 text-4xl font-black">Restaurant dashboard</h1><p className="mt-2 text-[#2f4d3b]/70">Welcome, {auth?.name}. Track performance and manage your menu.</p>{message && <p role="alert" className="mt-5 rounded-lg bg-[#2e5a46] p-3 text-white">{message}</p>}
      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><article className="rounded-2xl bg-[#2e5a46] p-5 text-white"><p className="text-sm text-white/70">Orders this week</p><strong className="mt-2 block text-4xl">{analytics.week}</strong></article><article className="rounded-2xl bg-[#efb53e] p-5"><p className="text-sm text-[#2f4d3b]/70">Orders this month</p><strong className="mt-2 block text-4xl">{analytics.month}</strong></article><article className="rounded-2xl bg-white p-5"><p className="text-sm text-[#2f4d3b]/70">Total revenue</p><strong className="mt-2 block text-4xl">${analytics.revenue.toFixed(0)}</strong></article><article className="rounded-2xl bg-white p-5"><p className="text-sm text-[#2f4d3b]/70">Best product</p><strong className="mt-2 block text-lg">{analytics.best}</strong></article></section>
      <section className="mt-8 grid gap-8 xl:grid-cols-[0.8fr_1.2fr]"><form onSubmit={submitProduct} className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-black">{editingId ? "Edit product" : "Add product"}</h2><label className="mt-5 block text-sm font-bold">Name<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 h-11 w-full rounded-lg border p-3" /></label><label className="mt-3 block text-sm font-bold">Category<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="mt-2 h-11 w-full rounded-lg border p-3" /></label><label className="mt-3 block text-sm font-bold">Price<input required type="number" min="0" step="0.01" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} className="mt-2 h-11 w-full rounded-lg border p-3" /></label><label className="mt-3 block text-sm font-bold">Image URL<input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} className="mt-2 h-11 w-full rounded-lg border p-3" /></label><label className="mt-3 block text-sm font-bold">Description<textarea rows="3" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} className="mt-2 w-full rounded-lg border p-3" /></label><label className="mt-3 flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={form.available} onChange={(event) => setForm({ ...form, available: event.target.checked })} /> Available to customers</label><div className="mt-5 flex gap-2"><button type="submit" className="rounded-lg bg-[#2e5a46] px-5 py-3 font-bold text-white">{editingId ? "Save changes" : "Add product"}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setForm(emptyProduct); }} className="rounded-lg border px-5 py-3 font-bold">Cancel</button>}</div></form><div className="rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-black">Menu products</h2><div className="mt-5 space-y-3">{product.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-xl border p-3"><img src={item.image} alt="" className="h-14 w-14 rounded-lg object-cover" /><div className="min-w-0 flex-1"><p className="font-bold">{item.name}</p><p className="text-sm text-[#2f4d3b]/60">${item.price} · {item.available === false ? "Unavailable" : "Available"}</p></div><button type="button" onClick={() => startEdit(item)} className="rounded-lg bg-[#f4e8c3] px-3 py-2 text-sm font-bold">Edit</button><button type="button" onClick={() => removeProduct(item.id)} className="rounded-lg bg-red-100 px-3 py-2 text-sm font-bold text-red-700">Delete</button></div>)}</div></div></section>
      <section className="mt-8 overflow-x-auto rounded-3xl bg-white p-6 shadow-sm"><h2 className="text-2xl font-black">All orders</h2><table className="mt-4 w-full min-w-162.5 text-left text-sm"><thead className="border-b"><tr><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-b"><td className="p-3 font-bold">#{order.id.slice(-6)}</td><td className="p-3">{order.customer?.name || "-"}<br /><span className="text-xs">{order.customer?.phone}</span></td><td className="p-3">{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</td><td className="p-3 font-bold">${Number(order.total).toFixed(2)}</td><td className="p-3"><select value={order.status} onChange={(event) => changeStatus(order.id, event.target.value)} className="rounded-lg border p-2"><option>pending</option><option>preparing</option><option>completed</option><option>cancelled</option></select></td></tr>)}</tbody></table>{!orders.length && <p className="p-6 text-center">No orders yet.</p>}</section>
    </div></main>
  );
};

export default Dashboard;
