import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { OrderDetailUI, BtnOrderUI, NoneOrderUI } from "./OrderDetailStyle";
import apiOrder from "../../../was/order";
import Loading from "../../common/loading/Loading";
import * as commonFn from "../../common/CommonFn";
import ModalKbSelect from "../../modal/kbSelect";
import { getData, setData, delData } from "../../../api/firestore";
import dayjs from "dayjs";
import { userAtom } from "../../../store/store";
import { useRecoilValue } from "recoil";

interface menuListType {}

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [isOrderData, setOrderData] = useState<any>(null);
  const [orderTotal, setOrderTotal] = useState<any>([]);
  const [isModalOpen, setModalOpen] = useState<Boolean>(false);
  const [dateTitle, setDateTitle] = useState<String>("");
  const [isOpen, setOpen] = useState<Boolean>(false);
  const atomUserInfo = useRecoilValue(userAtom);

  // 페이지 정보 기본 셋팅.
  const pageInfoSet = (date: String | String[] | undefined) => {
    setLoading(true);
    const dateText = String(date).replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
    setDateTitle(dayjs(new Date(dateText)).format("YYYY년 MM월 DD일 (ddd)"));
    if (
      dayjs(new Date(dateText)).format("YYYY/MM/DD") <
      dayjs(new Date()).format("YYYY/MM/DD")
    ) {
      // console.log("과거");
      setOpen(false);
    } else if (
      dayjs(new Date(dateText)).format("YYYY/MM/DD") ===
      dayjs(new Date()).format("YYYY/MM/DD")
    ) {
      // console.log("오늘");
      setOpen(true);
    } else {
      alert("오픈전입니다. 돌아가세요.");
      router.push("/list");
    }
    orderListData();
  };

  // 목록 갱신. 추후 주문 업데이트 시 해당 함수만 재실행.
  const orderListData = () => {
    let orderSum: any = [];
    let orderResult: any = [];
    setLoading(true);
    const orderData = apiOrder("orderList", "get", id);
    orderData.then((data: any) => {
      setOrderData(data);
      data.forEach((item: any) => orderSum.push(item.menuName));
      const selectList = Array.from(new Set(orderSum));
      selectList.forEach((item) => {
        orderResult.push({
          menuName: item,
          count: orderSum.filter((subItem: any) => subItem === item).length,
        });
      });

      setOrderTotal(orderResult);
      setLoading(false);
    });
  };
  const orderDelete = async (id: string) => {
    if (await confirm("주문을 취소 할까요?")) {
      await delData("orderList", id);
      await alert("주문이 취소 되었습니다.");
      await orderListData();
    } else {
      alert("주문 취소를 취소 하셨습니다.");
    }
  };
  const updateList = async (
    name: string,
    email: string,
    menuName: string,
    seq: string
  ) => {
    let menuPrice = 0;
    await getData("menuList").then((data) => {
      const menuData = data.docs.map((item: any) => {
        return { ...item.data(), id: item.id };
      });
      menuPrice = menuData.filter((item) => item.name === menuName)[0].price;
    });
    await setData("orderList", {
      menuName: menuName,
      seq: seq,
      price: menuPrice,
      userEmail: email,
      userName: name,
    });
    orderListData();
    handleModalClose();
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (!router.isReady) return;
    pageInfoSet(id);
  }, [router.isReady]);
  return (
    <>
      {isLoading && isLoading ? (
        <Loading />
      ) : (
        <OrderDetailUI>
          <div className="inner">
            <h1>
              <em>🍙</em>
              <strong>{dateTitle}</strong> 주문 현황
            </h1>
            <div className="order-info">
              <p>
                {orderTotal &&
                  orderTotal.map((item: any, idx: number) => {
                    return (
                      <strong key={idx}>
                        <span>{item.menuName}</span> <em>{item.count}줄</em>
                      </strong>
                    );
                  })}
              </p>
            </div>
            <ul>
              {isOrderData && isOrderData.length === 0 ? (
                <>
                  <NoneOrderUI>
                    <strong>
                      <em>{dateTitle}</em>
                      <br />
                      주문 이력이 없습니다.
                    </strong>
                  </NoneOrderUI>
                </>
              ) : (
                isOrderData &&
                isOrderData.map((item: any, idx: number) => {
                  return (
                    <li key={idx}>
                      <dl>
                        <dt>{item.menuName}</dt>
                        <dd>
                          <strong>{item.userName}</strong>
                          <em>{commonFn.unitWon(item.price)}</em>
                          {atomUserInfo.email !== "" &&
                          atomUserInfo.email === item.userEmail ? (
                            <button
                              type="button"
                              onClick={() => orderDelete(item.id)}
                            >
                              주문취소
                            </button>
                          ) : null}
                        </dd>
                      </dl>
                    </li>
                  );
                })
              )}
            </ul>
            {isOpen && isOpen ? (
              <BtnOrderUI type="button" onClick={() => handleModalOpen()}>
                주문하기
              </BtnOrderUI>
            ) : null}
          </div>
        </OrderDetailUI>
      )}
      {isModalOpen && isModalOpen ? (
        <ModalKbSelect onClose={handleModalClose} returnFn={updateList} />
      ) : null}
    </>
  );
};

export default OrderDetail;
