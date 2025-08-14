// import TaskList from "../../components/TaskList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { createTask, updateTaskAction, removeTask, loadTasks } from "../../features/taskSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import TaskForm from "../../components/TaskForm";
import TaskTable from "../../components/TaskTable";
import GoalsTable from "../../components/GoalsTable";
import GoalForm from "../../components/GoalForm";
import { v4 as uuidv4 } from "uuid";
import ButtonComponent from "../../components/ButtonComponent";
import { Task, Goal } from "../../types/taskTypes";
import { getGoals, addGoal, updateGoal, deleteGoal } from "../../services/localStorageService";

const Home = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isGoalConfirmOpen, setIsGoalConfirmOpen] = useState(false);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadTasks());
    loadGoals();
  }, [dispatch]);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const data = await getGoals();
      setGoals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async (values: { title: string; type: "daily" | "monthly" }) => {
    try {
      setLoading(true);
      if (selectedGoal) {
        const updatedGoal = await updateGoal(selectedGoal.id, {
          ...selectedGoal,
          title: values.title,
          type: values.type,
        });
        setGoals(goals.map(goal => 
          goal.id === updatedGoal.id ? updatedGoal : goal
        ));
      } else {
        const newGoal = await addGoal({
          id: uuidv4(),
          title: values.title,
          type: values.type,
          completed: false,
        });
        setGoals([...goals, newGoal]);
      }
      setIsGoalModalOpen(false);
      setSelectedGoal(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleGoal = async (goalId: string) => {
    try {
      setLoading(true);
      const goal = goals.find(g => g.id === goalId);
      if (goal) {
        const updatedGoal = await updateGoal(goalId, {
          ...goal,
          completed: !goal.completed,
        });
        setGoals(goals.map(g => 
          g.id === updatedGoal.id ? updatedGoal : g
        ));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setIsGoalModalOpen(true);
  };

  const handleDeleteGoal = (goalId: string) => {
    setSelectedGoal(goals.find(goal => goal.id === goalId) || null);
    setIsGoalConfirmOpen(true);
  };

  const confirmDeleteGoal = async () => {
    if (selectedGoal) {
      try {
        setLoading(true);
        await deleteGoal(selectedGoal.id);
        setGoals(goals.filter(goal => goal.id !== selectedGoal.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }
    setIsGoalConfirmOpen(false);
    setSelectedGoal(null);
  };

  const handleAddClick = () => {
    setSelectedTask(null);
    setIsEditMode(false);
    setIsModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTask) dispatch(removeTask(selectedTask.id));
    setIsConfirmOpen(false);
  };

  const handleSaveTask = (values: Omit<Task, "id">) => {
    if (isEditMode && selectedTask) {
      dispatch(updateTaskAction({ ...selectedTask, ...values }));
    } else {
      dispatch(createTask(values));
    }
    setIsModalOpen(false);
  };
  

  const handleStatusChange = (task: Task, newStatus: Task["status"]) => {
    dispatch(updateTaskAction({ ...task, status: newStatus }));
  };
  return (
    <>
      <ButtonComponent
        variant="contained"
        color="primary"
        icon={<Add />}
        text="Add Task"
        onClick={handleAddClick}
        sx={{ marginBottom: 2 }}
      />
      <TaskTable
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Goals
        </Typography>
        <ButtonComponent
          variant="contained"
          color="primary"
          icon={<Add />}
          text="Add Goal"
          onClick={() => {
            setSelectedGoal(null);
            setIsGoalModalOpen(true);
          }}
        />
      </Box>

      <GoalsTable 
        goals={goals} 
        onToggleGoal={handleToggleGoal}
        onEditGoal={handleEditGoal}
        onDeleteGoal={handleDeleteGoal}
      />

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>{isEditMode ? "Edit Task" : "Add New Task"}</DialogTitle>
        <DialogContent>
          <TaskForm
            onSubmit={handleSaveTask}
            initialValues={
              selectedTask || {
                title: "",
                description: "",
                status: "Not Started",
                completed: false,
                startDate: new Date().toISOString(), 
                endDate: new Date().toISOString(),
                taskType: "work",
              }
            }
            isEditMode={isEditMode}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete <b>{selectedTask?.title}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsConfirmOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isGoalModalOpen} onClose={() => setIsGoalModalOpen(false)}>
        <DialogTitle>{selectedGoal ? "Edit Goal" : "Add New Goal"}</DialogTitle>
        <DialogContent>
          <GoalForm 
            onSubmit={handleAddGoal} 
            initialValues={selectedGoal || undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isGoalConfirmOpen} onClose={() => setIsGoalConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete the goal <b>{selectedGoal?.title}</b>?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsGoalConfirmOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteGoal} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
