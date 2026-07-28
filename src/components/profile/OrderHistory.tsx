import { useSession } from "next-auth/react";
import { useOrderHistory } from "@/hooks/order";

type ProductDetails = {
  _id: string;
  productName: string;
  imgs?: string[];
  productType?: string;
};

type OrderItem = {
  productId: string;
  productName: string;
  price: number;
  currency?: string;
  quantity: number;
  product?: ProductDetails | null;
};

type OrderRecord = {
  _id: string;
  createdAt: string;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  currency: string;
  shippingAddress?: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
};

const statusClass = (status: string) =>
  status === "paid" || status === "delivered"
    ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
    : status === "failed" || status === "cancelled"
      ? "bg-rose-50 text-rose-700 ring-rose-600/20"
      : "bg-amber-50 text-amber-700 ring-amber-600/20";

const OrderHistory = () => {
  const { data: session } = useSession();
  const { data: apiResponse, isLoading, error } = useOrderHistory(
    session?.user?.id,
  );
  const orders: OrderRecord[] = Array.isArray(apiResponse)
    ? apiResponse
    : apiResponse?.data || [];

  if (isLoading) return <div className="py-12 text-center text-sm text-slate-500">Loading orders…</div>;
  if (error) return <div className="py-12 text-center text-sm text-rose-600">Failed to load order history.</div>;

  return (
    <section className="w-full">
      <div className="mb-6 border-b border-slate-100 pb-6">
        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Order history</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">Review every order, its payment status, delivery address, and purchased items.</p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center text-sm text-slate-500">No orders found.</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-[1160px] w-full border-collapse text-left">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Product ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Qty</th>
                <th className="px-4 py-3 text-right">Item price</th>
                <th className="px-4 py-3 text-right">Order total</th>
                <th className="px-4 py-3">Payment / order</th>
                <th className="px-4 py-3">Shipping address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {orders.flatMap((order) =>
                order.items.map((item, itemIndex) => {
                  const image = item.product?.imgs?.[0];
                  const currency = order.currency?.toUpperCase() || "USD";
                  const itemCurrency = item.currency?.toUpperCase() || "USD";
                  return (
                    <tr key={`${order._id}-${item.productId}-${itemIndex}`} className="align-top transition-colors hover:bg-slate-50/80">
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <p className="font-semibold text-slate-800">#{order._id.slice(-8).toUpperCase()}</p>
                        <p className="mt-1 text-xs text-slate-400">{order._id}</p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex min-w-[210px] items-center gap-3">
                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {image ? <img src={image} alt={item.product?.productName || item.productName} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-400">—</div>}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{item.product?.productName || item.productName}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{item.product?.productType || "Product"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-slate-500">{item.productId}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">{new Date(order.createdAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</td>
                      <td className="px-4 py-4 text-center text-sm font-semibold text-slate-700">{item.quantity}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm text-slate-700">{itemCurrency} {item.price.toFixed(2)}</td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-sm font-bold text-slate-900">{currency} {order.totalAmount.toFixed(2)}</td>
                      <td className="px-4 py-4">
                        <div className="flex min-w-[115px] flex-col items-start gap-1.5">
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass(order.paymentStatus)}`}>Payment: {order.paymentStatus}</span>
                          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ring-1 ring-inset ${statusClass(order.orderStatus)}`}>Order: {order.orderStatus}</span>
                        </div>
                      </td>
                      <td className="min-w-[190px] px-4 py-4 text-xs leading-5 text-slate-600">
                        {order.shippingAddress ? <>{order.shippingAddress.street}<br />{order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}<br />{order.shippingAddress.country}</> : "—"}
                      </td>
                    </tr>
                  );
                }),
              )}
            </tbody>
          </table>
        </div>
      )}
      {orders.length > 0 && <p className="mt-3 text-xs text-slate-400">Scroll horizontally to view all order details.</p>}
    </section>
  );
};

export default OrderHistory;
