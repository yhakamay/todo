export type Todo = {
  title: string;
  description: string | null;
  createdAt: Date;
  lastUpdatedAt: Date;
  frequency: "daily" | "weekly" | "monthly" | "yearly" | "onetime" | null;
  completedDates: Date[] | null;
};
