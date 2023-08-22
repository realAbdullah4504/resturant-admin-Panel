import { Button, Modal, ModalHeader, Form, FormGroup } from "reactstrap"
import ModalFooterBasic from "./ModalFooterBasic"
import CommonModal from './CommonModal'


const ModalMain = ({
    changeHandler,
    errorMessage,
    blurHandler,
    value,
    formSetting,
    isLoading,
    clickHandlerSubmit,
    clickHandlerCancel,
    formModal,
    buttonDisabled=false,
    edit,
    selectOptions=[],
    mainType='',
    heading='modal',
    preview='',
}) => {

    return (
        <div className="demo-inline-spacing">
            {/* <Toaster position="top-right" /> */}

            <Modal
                isOpen={formModal}
                toggle={clickHandlerCancel}
                className="modal-dialog-centered"
            >
                <ModalHeader toggle={clickHandlerCancel}>
                    {heading}
                </ModalHeader>
                <CommonModal
                    changeHandler={changeHandler}
                    errorMessage={errorMessage}
                    // blurHandler={blurHandler}
                    value={value}
                    formSetting={formSetting}
                    selectOptions={selectOptions}
                    mainType={mainType}
                    preview={preview}
                />

                <ModalFooterBasic
                    disabled={buttonDisabled}
                    // disabled={false}
                    clickHandlerCancel={clickHandlerCancel}
                    clickHandlerSubmit={clickHandlerSubmit}
                    isLoading={isLoading}
                    edit={edit}
                />
            </Modal>

        </div>
    )

}

export default ModalMain