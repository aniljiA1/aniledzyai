import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export default function OrderForm({ snack, close }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const qc = useQueryClient();

  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data,
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const amount = snack.price * data.quantity;

      await api.post("/orders", {
        ...data,
        snackId: snack.id,
        amount,
      });

      const student = await api.get(`/students/${data.studentId}`);
      await api.patch(`/students/${data.studentId}`, {
        totalSpent: student.data.totalSpent + amount,
      });

      const snackData = await api.get(`/snacks/${snack.id}`);
      await api.patch(`/snacks/${snack.id}`, {
        ordersCount: snackData.data.ordersCount + 1,
      });

      const prev = JSON.parse(localStorage.getItem("orders") || "[]");
      localStorage.setItem(
        "orders",
        JSON.stringify([{ ...data, amount }, ...prev]),
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["snacks"] });
      qc.invalidateQueries({ queryKey: ["orders"] });
      close();
    },
  });

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
      <select
        {...register("studentId", { required: true })}
        className="border p-2 w-full mb-2"
      >
        <option value="">Select Student</option>
        {students.map((s: any) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
      {errors.studentId && <p className="text-red-500">Required</p>}

      <input
        type="number"
        {...register("quantity", { required: true, min: 1, max: 5 })}
        placeholder="Quantity"
        className="border p-2 w-full mb-2"
      />
      {errors.quantity && <p className="text-red-500">1-5 only</p>}

      <button
        disabled={!students.length}
        className="bg-green-500 text-white w-full py-2 disabled:bg-gray-400"
      >
        Place Order
      </button>
    </form>
  );
}
