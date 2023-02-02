import ReactModal, { Props } from "react-modal";

export const Modal = ({ children, style, ...rest }: Props) => (
  <ReactModal
    {...rest}
    style={{
      overlay: {
        backgroundColor: "#000000bf",
        ...style?.content,
      },
      content: {
        width: 700,
        height: "fit-content",
        maxHeight: "90%",
        inset: "50%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
        overflow: "auto",
        ...style?.content,
      },
    }}
  >
    {children}
  </ReactModal>
);
