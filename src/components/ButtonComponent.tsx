import { Button, ButtonProps } from "@mui/material";
import { ReactNode } from "react";

interface CustomButtonProps extends ButtonProps {
  icon?: ReactNode;
  text: string;
}

const ButtonComponent = ({ icon, text, ...props }: CustomButtonProps) => {
  return (
    <Button
      startIcon={icon}
      sx={{
        borderRadius: "8px",
        fontWeight: "bold",
        textTransform: "none",
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
