export interface Task {
    id: string;
    title: string;
    description: string;
    status: "Not Started" | "In Progress" | "Completed";
    completed: boolean;
    startDate: string;
    endDate: string;
    taskType: "work" | "personal";
}

export interface TaskFormValues extends Omit<Task, "id"> {}

export interface Goal {
    id: string;
    title: string;
    type: "daily" | "monthly";
    completed: boolean;
}

export interface GoalFormValues extends Omit<Goal, "id"> {}
