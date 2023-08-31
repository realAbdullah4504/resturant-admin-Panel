import { Input, Label, FormFeedback, Button } from "reactstrap";
import styles from "./InputBasic.module.css";
import { FilePlus } from "react-feather";
const url = import.meta.env.VITE_REACT_APP_BASE_URL;
import { useState } from "react";
import { Trash } from "react-feather";

const InputBasic = ({
  className = "form-control",
  type = "text",
  name = "name",
  id = "basicInput",
  disabled = false,
  value = "",
  label = "name",
  changeHandler,
  blurHandler,
  errorMessage = "",
  required = false,
  placeholder = "Enter Name",
  preview = "",
}) => {
  const [file, setFile] = useState("");
  console.log("value", value);
  return (
    <div>
      <div>
        {type !== "file" ? (
          <div>
            <Label className="form-label" for={id}>
              {label}
            </Label>
            <Input
              className={className}
              type={type}
              name={name}
              id={id}
              disabled={disabled}
              value={value}
              onChange={(e) => changeHandler(name, e.target.value, type)}
              // onBlur={blurHandler}
              required={required}
              placeholder={placeholder}
              // invalid={errorMessage ? true : false}
            />
          </div>
        ) : (
          <div>
            <label
              for={id}
              className={styles.chooseFileLabel}
              style={{ display: "inline-block" }}
            >
              <div
                className="button-container"
                style={{ color: "#7367f0", textEmphasisColor: "#7367f0" }}
              >
                <FilePlus /> Upload file
              </div>
            </label>

            <Input
              className={className}
              type={type}
              name={name}
              id={id}
              disabled={disabled}
              onChange={(e) => {
                setFile(e.target.files[0].name);
                changeHandler(name, e.target.files[0], type);
              }}
              // onBlur={blurHandler}
              required={required}
              placeholder={placeholder}
              style={{ display: "none" }}
              // invalid={errorMessage ? true : false}
            />

            {type === "file" && preview && (
              <div className={styles.filePreview}>
                <img
                  src={preview}
                  alt="Preview"
                  className={styles.previewImage}
                />
                <div className={styles.fileInfo}>
                  <p className={styles.fileName}>{file}</p>
                  {/* <Button color="success">Upload</Button> */}
                </div>
                {/* <Trash
                  style={{ stroke: "red", cursor: "pointer" }}
                  className="font-medium-2"
                /> */}
              </div>
            )}
          </div>
        )}

        {/* {type === "file" && preview && (
          <div className="ms-2">
            <img src={preview} width="75" height="75" />
          </div>
        )} */}
        {errorMessage && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};
export default InputBasic;
