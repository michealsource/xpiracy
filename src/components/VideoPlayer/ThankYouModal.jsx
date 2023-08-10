import React, { useState } from "react";
import "./ThankYouModal.css";
import AppBtn from "../AppBtn/AppBtn";
import axiosClient from "../../api/axios";
import { Box, Modal } from "@mui/material";
import Spinner from "../Spinner/Spinner";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

export default function ThankYouModal({
  showPayItForwardCoverObject,
  setshowThankYouNoteModal,
  setshowRequestPopUpModal,
  open,
  handleClose,
  handleOpen,
  handleOpenRequest,
}) {
  const [note, setNote] = useState("");
  const [checked, setChecked] = useState(false);
  const [sending, setSending] = useState("#EB440F");
  const [spinner, setSpinner] = useState(false);

  const sendNote = async () => {
    if (!checked) {
      alert("acknowledgement is required");
      return;
    }
    // setSending("#808080");
    setSpinner(true);
    try {
      await axiosClient().post("community", {
        note,
        pay_it_forward_user_id: showPayItForwardCoverObject.id,
      });
      setSpinner(false);
      setshowRequestPopUpModal(true);
      handleOpenRequest();
      handleClose();
      setshowThankYouNoteModal(false);
    } catch (error) {}

    setSending("#EB440F");
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="">
          <div className="text-2xl font-medium">Say Thank You</div>

          <br />
          <div>
            <label>Message</label>
            <textarea
              onChange={(e) => setNote(e.target.value)}
              id="tyn-textarea"
              placeholder="Enter Message"
              style={{
                height: 180,
                width: "100%",
                marginTop: 12,
                borderColor: "#EB440F",
                borderWidth: 1,
                borderRadius: 4,
                padding: 8,
              }}
            >
              {note}
            </textarea>
          </div>

          <br />
          <div style={{ display: "flex" }}>
            <input
              checked={checked}
              onChange={(e) => setChecked(!checked)}
              color="#EB440F"
              type="checkbox"
              id="tyn-checkbox"
              style={{ borderColor: "#EB440F", borderWidth: 1 }}
            />
            <span style={{ marginLeft: 8 }}>
              I understand my notes may appear publicly
            </span>
          </div>

          <div
            style={{
              marginTop: 20,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <AppBtn
              title="CANCEL"
              onClick={() => {
                setshowThankYouNoteModal(false);
                handleClose();
              }}
              className="border-[#EB440F] text-[#000] border-[1px] font-medium p-3 px-5 rounded-[20px] ml-5"
            />

            <AppBtn
              disabled={!checked}
              showSpinner={spinner}
              title="SAY THANK YOU"
              onClick={() => {
                sendNote();
              }}
              className={`border-[#EB440F] bg-[${sending}] text-[#FFF] border-[1px] font-medium p-3 px-5 rounded-[20px] ml-5`}
            />

            {/* <Spinner /> */}
          </div>
        </div>
      </Box>
    </Modal>
  );
}
