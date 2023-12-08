export type Todo = {
    id: string;
    title: string;
    description: string | null;
    createdAt: Date;
    lastUpdatedAt: Date;
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'onetime' | null;
    completed: Date[] | null;
};
