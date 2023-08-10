import React from "react";
import "./RequestPopupModal.css";
import AppBtn from "../AppBtn/AppBtn";
import { useNavigate } from "react-router-dom";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function RequestPopUp({
  showPayItForwardCoverObject,
  setshowThankYouNoteModal,
  setshowRequestPopUpModal,
  open,
  handleClose,

  openRequest,
  setOpenRequest,
  handleOpenRequest,
  handleCloseRequest,
}) {
  const navigate = useNavigate();
  return (
    <Modal
      open={openRequest}
      onClose={handleCloseRequest}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          style={{ textAlign: "justify" }}
          className="text-xl justify-center"
        >
          Would you like to pay it forward to someone else, which will also
          unlock special viewing features and other perks?
        </div>

        <br />

        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <AppBtn
            title="WATCH NOW"
            onClick={() => {
              setshowThankYouNoteModal(false);
              handleCloseRequest();
              setshowRequestPopUpModal(false);
            }}
            className={`border-[#EB440F] bg-[#EB440F] text-[#FFF] border-[1px] font-medium p-3 px-5 rounded-[20px] ml-5`}
          />

          <AppBtn
            title="PAY IT FORWARD"
            onClick={() => {
              navigate("/payFwd");
            }}
            className="border-[#EB440F] text-[#000] border-[1px] font-medium p-3 px-5 rounded-[20px] ml-5"
          />
        </div>
      </Box>
    </Modal>

    // <div className='POP-Cover'>
    //     <div className='POP-Container'>

    //     </div>
    // </div>
  );
}
