import ReactModal, { Props } from "react-modal";

export const Modal = (props: Props) => (
  <ReactModal
    {...props}
    style={{
      overlay: {
        backgroundColor: "#000000bf",
        ...props.style?.content,
      },
      content: {
        width: 700,
        height: "fit-content",
        maxHeight: '90%',
        inset: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        overflow: "auto",
        ...props.style?.content,
      },
    }}
  >
    {props.children}
  </ReactModal>
);
