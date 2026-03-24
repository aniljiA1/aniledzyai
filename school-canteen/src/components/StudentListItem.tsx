import type { Student } from "../types";
import { Link } from "react-router-dom";

const StudentListItem = ({ student }: { student: Student }) => (
  <div className="border p-4 rounded flex justify-between items-center">
    <div>
      <h3 className="font-bold">{student.name}</h3>
      <p>Referral Code: {student.referralCode}</p>
      <p>Total Spent: ₹{student.totalSpent}</p>
    </div>
    <Link to={`/students/${student.id}`} className="text-blue-500">
      View Details
    </Link>
  </div>
);

export default StudentListItem;
