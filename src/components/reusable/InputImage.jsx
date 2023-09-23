import React from "react";
import Button from "@mui/material/Button";
import { AlertComponent } from "./AlertComponent";
import Input from "@mui/material/Input";


export const InputImage = ({handleImageChange,selectedFile,imagePreview,err}) => {
  return (
    <>
      {selectedFile && (
        <>
          <p>Selected file: {selectedFile.name}</p>
          {imagePreview && (
            <div
              style={{
                borderRadius: "50%",
                position: "relative",
                overflow: "hidden",
                width: "150px",
                height: "150px",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                marginBottom: "1rem",
              }}
            >
              <img
                src={imagePreview}
                alt="Selected"
                style={{ maxWidth: "170%" }}
              />
            </div>
          )}
        </>
      )}
      <label htmlFor="img">
        <Input
          type="file"
          id="img"
          name="img"
          inputProps={{ accept: "image/*" }}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <label htmlFor="img">
          <Button variant="outlined" component="span">
            Choose File
          </Button>
        </label>
      </label>

      <AlertComponent err={err} />
    </>
  );
};
