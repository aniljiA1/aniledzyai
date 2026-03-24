import { createContext, useContext, useState } from "react";
import type { Student } from "../types";

type ContextType = {
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
};

const StudentContext = createContext<ContextType | null>(null);

export const StudentProvider = ({ children }: any) => {
  const [students, setStudents] = useState<Student[]>([]);
  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("Context error");
  return ctx;
};
