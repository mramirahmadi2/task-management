import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CheckCircle, RadioButtonUnchecked, Edit, Delete } from "@mui/icons-material";
import { Goal } from "../types/taskTypes";

interface GoalsTableProps {
  goals: Goal[];
  onToggleGoal: (goalId: string) => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
}

const GoalsTable: React.FC<GoalsTableProps> = ({ 
  goals, 
  onToggleGoal, 
  onEditGoal,
  onDeleteGoal 
}) => {
  const dailyGoals = goals.filter(goal => goal.type === "daily");
  const monthlyGoals = goals.filter(goal => goal.type === "monthly");

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Type</b></TableCell>
            <TableCell><b>Title</b></TableCell>
            <TableCell align="center"><b>Status</b></TableCell>
            <TableCell align="center"><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dailyGoals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>Daily</TableCell>
              <TableCell>{goal.title}</TableCell>
              <TableCell align="center">
                <Tooltip title={goal.completed ? "Mark as pending" : "Mark as completed"}>
                  <IconButton onClick={() => onToggleGoal(goal.id)}>
                    {goal.completed ? (
                      <CheckCircle color="success" />
                    ) : (
                      <RadioButtonUnchecked />
                    )}
                  </IconButton>
                  
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEditGoal(goal)}>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDeleteGoal(goal.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
          {monthlyGoals.map((goal) => (
            <TableRow key={goal.id}>
              <TableCell>Monthly</TableCell>
              <TableCell>{goal.title}</TableCell>
              <TableCell align="center">
                <Tooltip title={goal.completed ? "Mark as pending" : "Mark as completed"}>
                  <IconButton onClick={() => onToggleGoal(goal.id)}>
                    {goal.completed ? (
                      <CheckCircle color="success" />
                    ) : (
                      <RadioButtonUnchecked />
                    )}
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="center">
                <Tooltip title="Edit">
                  <IconButton onClick={() => onEditGoal(goal)}>
                    <Edit color="primary" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => onDeleteGoal(goal.id)}>
                    <Delete color="error" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GoalsTable; 