import { off } from "process";
import { Toaster, toast } from "react-hot-toast";

export const handleToast = (type, message) => {
  toast[type](message);
};

export const validation = (value, formSetting) => {
  // console.log("formSetting", formSetting);
  // console.log("value", value);.
  let isValid = true;
  const errorMessage = {};

  for (const key in value) {
    const obj = formSetting?.find((data) => data.name === key);
    // console.log("value", value);
    // console.log("value", value);
    // const test = !obj?.regex?.test(value);
    if (obj?.required) {
      if (value[key] === "" || value[key] === undefined) {
        // console.log(obj?.errorMessage)
        errorMessage[key] = obj?.errorMessage;
        isValid = false;
      }
    } else {
      errorMessage[key] = "";
    }
  }

  // const isValid = !Object.values(errorMessage).some(
  //   (errorMsg) => errorMsg !== ""
  // );
  //  console.log("error", errorMessage);
  // console.log(isValid)
  return { isValid, error: errorMessage };
};

export const filteration = (deals, searchTerm) => {
  const searchInObject = (obj) => {
    for (const key in obj) {
      
      if (obj.hasOwnProperty(key) && key !=='image') {
        const value = obj[key];
        if (typeof value === "object") {
          const result = searchInObject(value);
          if (result) return true;
        } else if (
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        } else if (
          typeof value === "number" &&
          value.toString().includes(searchTerm)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  return deals.filter((deal) => searchInObject(deal));
};
