// ** React Imports
import { useState } from "react";

// ** Reactstrap Imports
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ModalFooterBasic from "./ModalFooterBasic";
import InputBasic from "./InputBasic";
import CheckboxBasic from "./CheckboxBasic";
import SwitchBasic from "./SwitchBasic";
import SelectBasic from "../components/SelectBasic";

const ModalForm = ({
  blurHandler,
  changeHandler,
  errorMessage,
  value,
  formSetting,
  selectOptions = [],
  mainType = "",
  preview = "",
}) => {
  // const [formModal, setFormModal] = useState(false);
  // const form = formSetting.reduce((types, name) => {
  //     if (!types[name.type]) {
  //       types[name.type] = [];
  //     }
  //     types[name.type].push(name);
  //     return types;
  //   }, {});

  // const categories = [
  //   { value: "PIZZA & PASTA DEALS", label: "PIZZA & PASTA DEALS" },
  //   { value: "SMALL PIZZA 10' DEALS", label: "SMALL PIZZA 10' DEALS" },
  //   { value: "MEDIUM PIZZA 10' DEALS", label: "MEDIUM PIZZA 10' DEALS" },
  //   { value: "LARGE PIZZA 12' DEALS", label: "LARGE PIZZA 12' DEALS" },
  //   { value: "SQUARE PIZZA DEALS", label: "SQUARE PIZZA DEALS" },
  // ];

  return (
    <div>
      <ModalBody>
        {formSetting?.map((form) => {
          //  console.log(form?.options)
          return (
            <div key={form?.id} className="mb-2">
              {form?.mainType === mainType &&
                (form?.type !== "Select" ? (
                  <InputBasic
                    changeHandler={changeHandler}
                    id={form?.id}
                    value={value[form?.name]}
                    name={form?.name}
                    label={form?.label}
                    type={form?.type}
                    placeholder={form?.placeHolder}
                    preview={preview}
                    errorMessage={errorMessage[form?.name]}
                  />
                ) : (
                  <SelectBasic
                    selectedOptions={
                      form?.options ? form?.options : selectOptions
                    }
                    changeHandler={changeHandler}
                    value={value[form?.name]}
                    name={form?.name}
                    label={form?.label}
                    placeholder={form?.placeHolder}
                    errorMessage={errorMessage[form?.name]}
                  />
                ))}
            </div>
          );
        })}
      </ModalBody>
    </div>
  );
};
export default ModalForm;
