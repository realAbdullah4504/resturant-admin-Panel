import { Input, Label, FormFeedback } from "reactstrap";
const url = import.meta.env.VITE_REACT_APP_BASE_URL;

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
  return (
    <div>
      <Label className="form-label" for={id}>
        {label}
      </Label>
      <div>
        {type !== "file" ? (
          <div>
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
            <Input
              className={className}
              type={type}
              name={name}
              id={id}
              disabled={disabled}
              onChange={(e) => changeHandler(name, e.target.files[0], type)}
              // onBlur={blurHandler}
              required={required}
              placeholder={placeholder}
              // invalid={errorMessage ? true : false}
            />
          </div>
        )}

        {type === "file" && preview && (
          <div className="ms-2">
            <img src={preview} width="75" height="75" />
          </div>
        )}
        {errorMessage && <span className="text-danger">{errorMessage}</span>}
      </div>
    </div>
  );
};
export default InputBasic;
