import React from "react";
import { Button } from "@/components/ui/button";
import { useOrderHistory, Product } from "@/hooks/order";
import { useSession } from "next-auth/react";
import Image from "next/image";

const OrderHistory = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Fetch order history
  const { data: apiResponse, isLoading, error } = useOrderHistory(userId);

  // Access the products array properly depending on API structure
  const orders: Product[] = Array.isArray(apiResponse)
    ? apiResponse
    : apiResponse?.data || [];

  if (isLoading)
    return <div className="p-4 text-center">Loading history...</div>;
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Failed to load history</div>
    );

  return (
    <div className="w-full px-2 sm:px-0">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Order History</h2>
        <p className="text-gray-500 mt-1 text-sm sm:text-base">
          Manage your personal information and profile details.
        </p>
      </div>

      {/* Mobile & Tablet Card Layout (visible below lg) */}
      <div className="lg:hidden space-y-4">
        {orders.length === 0 ? (
          <div className="py-8 text-center text-gray-500 bg-gray-50 rounded-lg">
            No orders found.
          </div>
        ) : (
          orders.map((order: Product) => (
            <div
              key={order._id}
              className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Header - Product Info */}
              <div className="flex items-start gap-3 mb-3">
                {order.imgs?.[0] && (
                  <Image
                    width={56}
                    height={56}
                    src={
                      typeof order.imgs[0] === "string"
                        ? order.imgs[0]
                        : order.imgs[0].url
                    }
                    alt={order.productName}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {order.productName}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Invoice: #{order._id.slice(-6).toUpperCase()}
                  </p>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-secondary text-primary-foreground flex-shrink-0`}
                >
                  {order.productType == "marchandice" ? "Merch" : "Card"}
                </span>
              </div>

              {/* Card Body - Details Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Qty</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">
                    {order.quantity}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Amount</p>
                  <p className="text-sm font-semibold text-primary mt-0.5">
                    ${order.price}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Table Layout (visible on lg and above) */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="pb-4 text-left text-xs font-semibold text-primary uppercase tracking-wider pl-4">
                INVOICE
              </th>
              <th className="pb-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                Item
              </th>
              <th className="pb-4 text-left text-xs font-semibold text-primary uppercase tracking-wider">
                <div className="flex items-center gap-1 cursor-pointer">
                  BILLING DATE
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </th>
              <th className="pb-4 text-center text-xs font-semibold text-primary uppercase tracking-wider">
                AMOUNT
              </th>
              <th className="pb-4 text-center text-xs font-semibold text-primary uppercase tracking-wider">
                Quantity
              </th>
              <th className="pb-4 text-right text-xs font-semibold text-primary uppercase tracking-wider pr-4">
                Product Type
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order: Product) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 pl-4 text-sm font-medium text-gray-600">
                    #{order._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      {order.imgs?.[0] && (
                        <Image
                          width={40}
                          height={40}
                          src={
                            typeof order.imgs[0] === "string"
                              ? order.imgs[0]
                              : order.imgs[0].url
                          }
                          alt={order.productName}
                          className="w-8 h-8 rounded object-cover"
                        />
                      )}
                      <span>{order.productName}</span>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-sm font-semibold text-gray-900 text-center">
                    ${order.price}
                  </td>
                  <td className="py-4 text-sm font-semibold text-gray-900 text-center">
                    {order.quantity} Items
                  </td>
                  <td className="py-4 text-right pr-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-secondary text-primary-foreground`}
                    >
                      {order.productType == "marchandice"
                        ? "Merchandise"
                        : "Card Game"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - Responsive */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6 sm:mt-8 pt-4 border-t border-gray-100">
        <span className="text-sm text-gray-500 order-2 sm:order-1">Page 1 of 10</span>
        <div className="flex gap-2 order-1 sm:order-2 w-full sm:w-auto">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full px-4 sm:px-6 flex-1 sm:flex-none"
            disabled
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="rounded-full px-4 sm:px-6 flex-1 sm:flex-none"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
