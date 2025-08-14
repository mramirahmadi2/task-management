import ButtonComponent from "./ButtonComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Tooltip,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Task } from "../types/taskTypes";

interface TaskTableProps {
  tasks: Task[];
  onStatusChange: (task: Task, newStatus: Task["status"]) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onStatusChange, onEdit, onDelete }) => {
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const order = { "In Progress": 1, "Not Started": 2, "Completed": 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Title</b></TableCell>
            <TableCell><b>Description</b></TableCell>
            <TableCell><b>Start Date</b></TableCell>
            <TableCell><b>End Date</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
            <TableCell align="center"><b>Type</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTasks.map((task) => {
            const getStatusColor = () => {
              switch (task.status) {
                case "In Progress":
                  return "#fff9c4";
                case "Completed":
                  return "#c8e6c9";
                default:
                  return "#eeeeee";
              }
            };

            return (
              <TableRow key={task.id}>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{formatDate(task.startDate)}</TableCell>
                <TableCell>{formatDate(task.endDate)}</TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  <Select
                    value={task.status}
                    onChange={(e) => onStatusChange(task, e.target.value as Task["status"])}
                    sx={{
                      minWidth: 120,
                      backgroundColor: getStatusColor(),
                      color: "black",
                      borderRadius: "4px",
                      "& .MuiSelect-icon": {
                        color: "black",
                      },
                    }}
                  >
                    <MenuItem value="Not Started">Not Started</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Completed">Completed</MenuItem>
                  </Select>
                </TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      backgroundColor: task.taskType === 'work' ? '#1976d2' : '#f50057',
                      color: 'white',
                    }}
                  >
                    {task.taskType}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Tooltip title="Edit">
                    <ButtonComponent
                      variant="text"
                      color="primary"
                      icon={<Edit />}
                      text=""
                      onClick={() => onEdit(task)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <ButtonComponent
                      variant="text"
                      color="error"
                      icon={<Delete />}
                      text=""
                      onClick={() => onDelete(task)}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
