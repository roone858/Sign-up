import React from "react";
import Alert from "@mui/material/Alert";
export const AlertComponent = ({ err }) => {
  return <>{err && <Alert severity="error">{err}</Alert>}</>;
};
