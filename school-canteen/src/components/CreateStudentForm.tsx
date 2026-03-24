import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/api";

export default function CreateStudentForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/students", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      reset();
    },
  });

  return (
    <form
      onSubmit={handleSubmit((d) =>
        mutation.mutate({
          ...d,
          referralCode: Math.random().toString(36).slice(2, 7),
          totalSpent: 0,
        }),
      )}
      className="mb-4"
    >
      <input
        {...register("name", { required: true })}
        placeholder="Student name"
        className="border p-2 mr-2"
      />
      {errors.name && <p className="text-red-500">Required</p>}

      <button className="bg-blue-600 text-white px-3 py-1">Add</button>
    </form>
  );
}
