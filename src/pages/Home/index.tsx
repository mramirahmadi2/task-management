// import TaskList from "../../components/TaskList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { deleteTask, updateTask, addTask } from "../../features/taskSlice";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { useState } from "react";
import TaskForm from "../../components/TaskForm";
import TaskTable from "../../components/TaskTable";
import { v4 as uuidv4 } from "uuid";
import ButtonComponent from "../../components/ButtonComponent";
import { Task } from "../../types/taskTypes";

const Home = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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
    if (selectedTask) dispatch(deleteTask(selectedTask.id));
    setIsConfirmOpen(false);
  };

  const handleSaveTask = (values: Omit<Task, "id">) => {
    if (isEditMode && selectedTask) {
      dispatch(updateTask({ ...selectedTask, ...values }));
    } else {
      dispatch(
        addTask({
          id: uuidv4(),
          ...values,
          completed: false,
          startDate: values.startDate ?? new Date().toISOString(),
          endDate: values.endDate ?? new Date().toISOString(),
        })
      );
    }
    setIsModalOpen(false);
  };
  

  const handleStatusChange = (task: Task, newStatus: Task["status"]) => {
    dispatch(updateTask({ ...task, status: newStatus }));
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
    </>
  );
};

export default Home;
