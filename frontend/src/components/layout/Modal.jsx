import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 600,
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal(props) {
  const { open, handleClose, handleConfirmation } = props;

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.text}
          </Typography>
          <Button onClick={handleClose}>{props.btnText1}</Button>
          <Button onClick={handleConfirmation}>{props.btnText2}</Button>
        </Box>
      </Modal>
    </div>
  );
}

BasicModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  btnText1: PropTypes.string.isRequired,
  btnText2: PropTypes.string.isRequired,
};

export default BasicModal;
