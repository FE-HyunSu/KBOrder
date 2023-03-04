import React, { useRef, useState, useEffect } from "react";
import Modal from "../../layout/modal/index";
import { BtnClose, ModalOrderUI } from "./style";

interface ModalProps {
  onClose: () => void;
}

const ModalKbSelect = (props: ModalProps) => {
  const [isModalView, setModalView] = useState<boolean>(false);

  useEffect(() => {
    setModalView(true);
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <BtnClose onClick={props.onClose}>닫기</BtnClose>
      <ModalOrderUI className={isModalView ? `active` : ``}>
        <h1>주문하기</h1>
        <ul>
          <li>
            <label>
              <input type="checkbox" />
              <span>참치김밥</span>
              <em>5000</em>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span>참치김밥</span>
              <em>5000</em>
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" />
              <span>참치김밥</span>
              <em>5000</em>
            </label>
          </li>
        </ul>
      </ModalOrderUI>
    </Modal>
  );
};

export default ModalKbSelect;
