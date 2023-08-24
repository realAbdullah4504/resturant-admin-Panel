import { Button, Modal, ModalHeader, Form, FormGroup } from "reactstrap";
import ModalFooterBasic from "./ModalFooterBasic";
// import CommonModal from './CommonModal'

const ModalMain = ({
  isLoading,
  clickHandlerSubmit,
  clickHandlerCancel,
  formModal,
  buttonDisabled = false,
  buttonText = "Submit",
  heading ='',
  Component,
  buttonColour = "primary",
}) => {
  return (
    <div className="demo-inline-spacing">
      {/* <Toaster position="top-right" /> */}

      <Modal
        isOpen={formModal}
        toggle={clickHandlerCancel}
        className="modal-dialog-centered"
      >
        <ModalHeader toggle={clickHandlerCancel}>{heading}</ModalHeader>
        {/* <CommonModal
                    changeHandler={changeHandler}
                    errorMessage={errorMessage}
                    // blurHandler={blurHandler}
                    value={value}
                    formSetting={formSetting}
                    selectOptions={selectOptions}
                    mainType={mainType}
                    preview={preview}
                /> */}
        {Component}

        <ModalFooterBasic
          disabled={buttonDisabled}
          // disabled={false}
          buttonColour={buttonColour}
          clickHandlerCancel={clickHandlerCancel}
          clickHandlerSubmit={clickHandlerSubmit}
          isLoading={isLoading}
          buttonText={buttonText}
        />
      </Modal>
    </div>
  );
};

export default ModalMain;
