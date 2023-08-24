import { ModalFooter, Button, Progress } from "reactstrap";
import ButtonBasic from "./ButtonBasic";
import ProgressBasic from "./Loading";

const ModalFooterBasic = ({
  disabled = false,
  clickHandlerSubmit,
  clickHandlerCancel,
  isLoading,
  edit,
  buttonText = "Submit",
  buttonColour = "primary",
}) => {
  return (
    <ModalFooter>
      <ButtonBasic color="secondary" clickHandler={clickHandlerCancel}>
        Cancel
      </ButtonBasic>{" "}
      {isLoading ? (
        <div className="ms-1">
          <ProgressBasic color={buttonColour}/>
        </div>
      ) : (
        <ButtonBasic
          // type='submit'
          color={buttonColour}
          disabled={disabled}
          clickHandler={clickHandlerSubmit}
        >
          {buttonText}
        </ButtonBasic>
      )}
    </ModalFooter>
  );
};
export default ModalFooterBasic;
