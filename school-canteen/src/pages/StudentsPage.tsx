import { useQuery } from "@tanstack/react-query";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import CreateStudentForm from "../components/CreateStudentForm";

export default function StudentsPage() {
  const { data = [] } = useQuery({
    queryKey: ["students"],
    queryFn: async () => (await api.get("/students")).data,
  });

  return (
    <div>
      <CreateStudentForm />

      {data.length === 0 && <p>No students yet</p>}

      {data.map((s: any) => (
        <div key={s.id} className="border p-3 mb-2 rounded">
          <h3 className="font-semibold">{s.name}</h3>
          <p>Code: {s.referralCode}</p>
          <p>Spent: ₹{s.totalSpent}</p>

          <Link
            to={`/students/${s.id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
}
