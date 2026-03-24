export type Snack = {
  id: number;
  name: string;
  price: number;
  ordersCount: number;
};

export type Student = {
  id: number;
  name: string;
  referralCode: string;
  totalSpent: number;
};

export type Order = {
  id: number;
  snackId: number;
  studentId: number;
  quantity: number;
  amount: number;
};
