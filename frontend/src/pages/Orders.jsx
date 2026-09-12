import { useContext, useEffect, useState } from "react";
import { DataContext } from "../Hooks/DataContext";

const Orders = () => {
  const { orders, loadOrders } = useContext(DataContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadOrders().catch((error) => setMessage(error.response?.data?.message || "Unable to load your orders."));
  }, [loadOrders]);

  return (
    <main className="min-h-screen bg-[#f5ecdc] px-4 pb-16 pt-28 text-[#2f4d3b]"><div className="mx-auto max-w-4xl"><h1 className="text-4xl font-black">My orders</h1>{message && <p role="alert" className="mt-5 text-red-700">{message}</p>}<div className="mt-8 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-black">Order #{order.id.slice(-6)}</h2><span className="rounded-full bg-[#f4e8c3] px-3 py-1 text-sm font-bold capitalize">{order.status}</span></div><p className="mt-3 text-sm">{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p><p className="mt-3 font-black">Total: ${Number(order.total).toFixed(2)}</p></article>)}{!orders.length && <p className="rounded-2xl bg-white p-8 text-center">You have no orders yet.</p>}</div></div></main>
  );
};

export default Orders;
