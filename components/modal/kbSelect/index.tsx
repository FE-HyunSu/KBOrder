import React, { useState, useEffect } from "react";
import Modal from "../../layout/modal/index";
import * as commonFn from "../../common/CommonFn";
import { BtnClose, ModalOrderUI, BtnComplete } from "./style";
import { getData } from "../../../api/firestore";
import Loading from "../../common/loading/Loading";

interface ModalProps {
  onClose: () => void;
  returnFn: () => void;
}
interface menuListType {
  id: string;
  name: string;
  price: number;
}

const ModalKbSelect = (props: ModalProps) => {
  const [isModalView, setModalView] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [dataList, setDataList] = useState<menuListType[]>([]);
  const getMenuList = async () => {
    setLoading(true);
    try {
      await getData("menuList").then((data) => {
        const menuList = data.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        });
        setDataList(menuList);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setModalView(true);
    getMenuList();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <BtnClose onClick={props.onClose}>닫기</BtnClose>
      <ModalOrderUI className={isModalView ? `active` : ``}>
        <h1>📝 주문하기 (메뉴를 선택해 주세요)</h1>
        <ul>
          {isLoading && isLoading ? (
            <Loading />
          ) : (
            <>
              {dataList &&
                dataList.map((item: menuListType, idx: number) => (
                  <li key={idx}>
                    <label>
                      <input type="checkbox" />
                      <span>{item.name}</span>
                      <em>{commonFn.unitWon(item.price)}</em>
                    </label>
                  </li>
                ))}
            </>
          )}
        </ul>
        <BtnComplete type="button" onClick={() => props.returnFn()}>
          선택완료
        </BtnComplete>
      </ModalOrderUI>
    </Modal>
  );
};

export default ModalKbSelect;
