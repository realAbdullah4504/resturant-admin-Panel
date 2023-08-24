import Select from "react-select";
import { Alert, Label } from "reactstrap";

const SelectBasic = ({
  className = "react-select",
  selectedOptions = "",
  id = "",
  value = { value: "", label: "" },
  name = "select",
  changeHandler,
  blurHandler,
  errorMessage = false,
  placeholder = "Select",
  isDisabled = false,
  isLoading = false,
  isClearable = false,
  label = "Select",
}) => {
  // console.log('selected',selectedOptions)
  return (
    <>
      <Label className="form-label" for={id}>
        {label}
      </Label>
      <Select
        className={className}
        classNamePrefix="select"
        defaultValue={selectedOptions.length > 0 ? selectedOptions[0] : null}
        options={selectedOptions}
        isLoading={isLoading}
        name={name}
        value={value}
        onChange={(e) => changeHandler(name,e)}
        onBlur={blurHandler}
        isClearable={isClearable}
        isDisabled={isDisabled}
        invalid={errorMessage}
        placeholder={placeholder}
      />
      {errorMessage && <span className="text-danger">{errorMessage}</span>}
    </>
  );
};

export default SelectBasic;

// disabled
