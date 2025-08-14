import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { GoalFormValues } from "../types/taskTypes";

interface GoalFormProps {
  onSubmit: (values: GoalFormValues) => void;
  initialValues?: GoalFormValues;
}

const GoalForm = ({ onSubmit, initialValues }: GoalFormProps) => {
  const formik = useFormik<GoalFormValues>({
    initialValues: initialValues || {
      title: "",
      type: "daily",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title cannot exceed 50 characters")
        .required("Title is required"),
      type: Yup.string()
        .oneOf(["daily", "monthly"], "Invalid goal type")
        .required("Type is required"),
    }),
    onSubmit,
    enableReinitialize: true,
  });

  return (
    <Box
      sx={{
        width: { xs: "95%", sm: 400 },
        maxWidth: "100%",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <TextField
          label="Goal Title"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Goal Type</InputLabel>
          <Select
            {...formik.getFieldProps("type")}
            label="Goal Type"
          >
            <MenuItem value="daily">Daily Goal</MenuItem>
            <MenuItem value="monthly">Monthly Goal</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          {initialValues ? "Update Goal" : "Add Goal"}
        </Button>
      </form>
    </Box>
  );
};

export default GoalForm; 