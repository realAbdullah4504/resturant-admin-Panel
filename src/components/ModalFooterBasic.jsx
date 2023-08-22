import { ModalFooter, Button, Progress } from "reactstrap";
import ButtonBasic from "./ButtonBasic";
import ProgressBasic from "./Loading";

const ModalFooterBasic = ({
  disabled = false,
  clickHandlerSubmit,
  clickHandlerCancel,
  isLoading,
  edit,
}) => {
  return (
    <ModalFooter>
      <ButtonBasic color="secondary" clickHandler={clickHandlerCancel}>
        Cancel
      </ButtonBasic>{" "}
      {isLoading ? (
        <div className="ms-1">
        <ProgressBasic />
        </div>
      ) : (
        <ButtonBasic
          // type='submit'
          color="primary"
          disabled={disabled}
          clickHandler={clickHandlerSubmit}
        >
          {edit ? "Update" : "Submit"}
        </ButtonBasic>
      )}
    </ModalFooter>
  );
};
export default ModalFooterBasic;
