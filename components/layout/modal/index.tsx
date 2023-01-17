import ReactDOM from "react-dom";
import { PropsWithChildren } from "react";
import { ModalTemplate, ModalBackground, ModalInner } from "./style";

interface ModalProps {
  onClose: () => void;
}

const ModalBgDimed = (props: ModalProps) => {
  return <ModalBackground onClick={props.onClose} />;
};

const ModalContents = ({ children }: PropsWithChildren) => {
  return <ModalInner>{children}</ModalInner>;
};

const Modal = (props: PropsWithChildren<ModalProps>) => {
  const modalElement = document.getElementById("_modal");
  if (modalElement === null) {
    return <div></div>;
  } else {
    return (
      <>
        {ReactDOM.createPortal(
          <>
            <ModalTemplate>
              <ModalContents>{props.children}</ModalContents>
              <ModalBgDimed onClose={props.onClose}></ModalBgDimed>
            </ModalTemplate>
          </>,
          modalElement
        )}
      </>
    );
  }
};

export default Modal;
