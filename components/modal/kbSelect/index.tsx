import React, { useRef, useState, useEffect } from "react";
import Modal from "../../layout/modal/index";
import { BtnClose, ModalOrderUI } from "./style";
import { getData } from "../../../api/firestore";
import Loading from "../../common/loading/Loading";

interface ModalProps {
  onClose: () => void;
}
interface menuListType {
  id: string;
  name: string;
  price: number;
}

const ModalKbSelect = (props: ModalProps) => {
  const [isModalView, setModalView] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [dataList, setDataList] = useState<any>([]);
  const getMenuList = async () => {
    setLoading(true);
    try {
      await getData("menuList").then((data) => {
        const menuList = data.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        });
        console.log(menuList);
        setDataList(menuList);
        console.log(dataList);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setModalView(true);
    setTimeout(() => {
      getMenuList();
    }, 2000);
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <BtnClose onClick={props.onClose}>닫기</BtnClose>
      <ModalOrderUI className={isModalView ? `active` : ``}>
        <h1>주문하기</h1>
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
                      <em>{item.price}</em>
                    </label>
                  </li>
                ))}
            </>
          )}
        </ul>
      </ModalOrderUI>
    </Modal>
  );
};

export default ModalKbSelect;
