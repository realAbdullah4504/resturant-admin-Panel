import { Toaster, toast } from "react-hot-toast";

export const handleToast = (type, message) => {
  toast[type](message);
};

export const validation = (value, formSetting) => {
  // console.log("formSetting", formSetting);
  // console.log("value", value);
  let isValid = true;
  const errorMessage = {};

  formSetting.forEach((obj) => {
    // const test = !obj?.regex?.test(value);
    // console.log(obj?.errorMessage)
    // if (obj.required) {
      
      if (value === "" || value === undefined) {
        errorMessage[obj.id] = obj?.errorMessage;
        isValid = false;
      } else {
        errorMessage[obj.id] = "";
      }
    // } else {
    //   errorMessage[obj.id] = "";
    // }
  });

  // const isValid = !Object.values(errorMessage).some(
  //   (errorMsg) => errorMsg !== ""
  // );
  console.log(errorMessage)

  return { isValid, error: errorMessage };
};

export const filteration = (deals, searchTerm) => {
  return deals.filter((deal) => {
    const dealValues = Object.values(deal).join(" ").toLowerCase();
    return dealValues.includes(searchTerm.toLowerCase());
  });
};

// const obj = FormData?.form?.find((data) => data.name === name);
//     //console.log(obj);

//     const test = !obj?.regex?.test(value);
//     // console.log(test);
//     if (obj?.required) {
//       if (value === "" || value === undefined || test) {
//         const updatedErrors = {
//           ...errorMessage,
//           [obj?.id]: obj?.errorMessage,
//         };
//         // console.log(updatedErrors);
//         setErrorMessage(updatedErrors);
//       } else {
//         setErrorMessage({
//           ...errorMessage,
//           [obj?.id]: "",
//         });
//       }
//     } else {
//       setErrorMessage({
//         ...errorMessage,
//         [obj?.id]: "",
//       });
//     }
