import { Button, TextField, Box, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TaskFormValues } from "../types/taskTypes";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface TaskFormProps {
  onSubmit: (values: TaskFormValues) => void;
  initialValues?: TaskFormValues;
  isEditMode?: boolean;
}

const TaskForm = ({ onSubmit, initialValues, isEditMode = false }: TaskFormProps) => {
  const formik = useFormik<TaskFormValues>({
    initialValues: initialValues || {
      title: "",
      description: "",
      status: "Not Started",
      completed: false,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Title must be at least 3 characters")
        .max(50, "Title cannot exceed 50 characters")
        .required("Title is required"),
      description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(300, "Description cannot exceed 300 characters")
        .required("Description is required"),
      startDate: Yup.date().required("Start date is required"),
      endDate: Yup.date()
        .required("End date is required")
        .test("is-after-start", "End date must be after start date", function (value) {
          return value && new Date(value) > new Date(this.parent.startDate);
        }),
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
          label="Title"
          fullWidth
          margin="normal"
          {...formik.getFieldProps("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="normal"
          {...formik.getFieldProps("description")}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <FormControl fullWidth margin="normal" error={formik.touched.status && Boolean(formik.errors.status)}>
          <InputLabel>Status</InputLabel>
          <Select
            {...formik.getFieldProps("status")}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          {formik.touched.status && formik.errors.status && <FormHelperText>{formik.errors.status}</FormHelperText>}
        </FormControl>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 2,
          }}
        >
          <Box sx={{  display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center", flex: 1 }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block", textAlign: "center" }}>
              Start Date
            </label>
            <ReactDatePicker
              selected={formik.values.startDate ? new Date(formik.values.startDate) : null}
              onChange={(date) => {
                if (date) {
                  formik.setFieldValue("startDate", date.toISOString());
                }
              }}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeSelect
              timeIntervals={15}
              className="custom-datepicker"
            />
            {formik.touched.startDate && formik.errors.startDate && (
              <FormHelperText error>{formik.errors.startDate}</FormHelperText>
            )}
          </Box>

          <Box sx={{  display:"flex" , flexDirection:"column", justifyContent:"center", alignItems:"center", flex: 1 }}>
            <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block", textAlign: "center" }}>
              End Date
            </label>
            <ReactDatePicker
              selected={formik.values.endDate ? new Date(formik.values.endDate) : null}
              onChange={(date) => {
                if (date) {
                  formik.setFieldValue("endDate", date.toISOString());
                }
              }}
              dateFormat="yyyy-MM-dd HH:mm"
              showTimeSelect
              timeIntervals={15}
              className="custom-datepicker"
            />
            {formik.touched.endDate && formik.errors.endDate && (
              <FormHelperText error>{formik.errors.endDate}</FormHelperText>
            )}
          </Box>
        </Box>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
          {isEditMode ? "Update" : "Save"}
        </Button>
      </form>
    </Box>
  );
};

export default TaskForm;
