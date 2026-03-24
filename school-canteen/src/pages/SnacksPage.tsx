import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import SnackCard from "../components/SnackCard";
import OrderForm from "../components/OrderForm";

export default function SnacksPage() {
  const [selected, setSelected] = useState<any>(null);

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["snacks"],
    queryFn: async () => (await api.get("/snacks")).data,
  });

  if (isLoading) return <p className="text-blue-500">Loading snacks...</p>;
  if (isError) return <p className="text-red-500">Error loading snacks</p>;

  return (
    <div className="space-y-4">
      {data.length === 0 && <p>No snacks available</p>}

      {data.map((s: any) => (
        <SnackCard key={s.id} snack={s} onOrder={setSelected} />
      ))}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-5 rounded w-80 shadow-lg">
            <h2 className="font-bold mb-2">{selected.name}</h2>

            <OrderForm snack={selected} close={() => setSelected(null)} />

            <button
              onClick={() => setSelected(null)}
              className="mt-2 text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
