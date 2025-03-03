export interface Task {
    id: string;
    title: string;
    description: string;
    status: "Not Started" | "In Progress" | "Completed";
    completed: boolean;
    startDate: string;
    endDate: string;
}

export interface TaskFormValues extends Omit<Task, "id"> {}
