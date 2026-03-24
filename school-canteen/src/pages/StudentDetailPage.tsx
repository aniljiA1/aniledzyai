import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";

export default function StudentDetailPage() {
  const { id } = useParams();

  const { data: student } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => (await api.get(`/students/${id}`)).data,
  });

  const { data: orders = [] } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => (await api.get(`/orders?studentId=${id}`)).data,
  });

  const { data: snacks = [] } = useQuery({
    queryKey: ["snacks"],
    queryFn: async () => (await api.get("/snacks")).data,
  });

  return (
    <div>
      <h2 className="text-xl font-bold">{student?.name}</h2>
      <p>Total Spent: ₹{student?.totalSpent}</p>

      <h3 className="mt-4 font-bold">Orders</h3>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((o: any) => {
        const snack = snacks.find((s: any) => s.id === o.snackId);

        return (
          <div key={o.id} className="border p-2 mt-2 rounded">
            <p>
              <strong>Snack:</strong> {snack?.name}
            </p>
            <p>
              <strong>Qty:</strong> {o.quantity}
            </p>
            <p>
              <strong>Amount:</strong> ₹{o.amount}
            </p>
          </div>
        );
      })}
    </div>
  );
}
