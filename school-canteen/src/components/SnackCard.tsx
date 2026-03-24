import type { Snack } from "../types";

export default function SnackCard({
  snack,
  onOrder,
}: {
  snack: Snack;
  onOrder: (snack: Snack) => void;
}) {
  return (
    <div className="border p-4 rounded flex justify-between">
      <div>
        <h3 className="font-bold">{snack.name}</h3>
        <p>₹{snack.price}</p>
        <p>Orders: {snack.ordersCount}</p>
      </div>
      <button
        onClick={() => onOrder(snack)}
        className="bg-blue-600 hover:bg-blue-700 transition text-white px-3 py-1 rounded"
      >
        Order
      </button>
    </div>
  );
}
