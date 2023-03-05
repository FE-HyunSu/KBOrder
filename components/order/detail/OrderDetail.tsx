import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { OrderDetailUI, BtnOrderUI, NoneOrderUI } from "./OrderDetailStyle";
import apiOrder from "../../../was/order";
import Loading from "../../common/loading/Loading";
import * as commonFn from "../../common/CommonFn";
import ModalKbSelect from "../../modal/kbSelect";
import { setData } from "../../../api/firestore";
import dayjs from "dayjs";

interface menuListType {}

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [isOrderData, setOrderData] = useState<any>(null);
  const [orderTotal, setOrderTotal] = useState<any>([]);
  const [isModalOpen, setModalOpen] = useState<Boolean>(false);
  const [dateTitle, setDateTitle] = useState<String>("");

  // 페이지 정보 기본 셋팅.
  const pageInfoSet = (date: String | String[] | undefined) => {
    setLoading(true);
    const dateText = String(date).replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
    setDateTitle(dayjs(new Date(dateText)).format("YYYY년 MM월 DD일 (ddd)"));
    if (
      dayjs(new Date(dateText)).format("YYYY/MM/DD") <
      dayjs(new Date()).format("YYYY/MM/DD")
    ) {
      console.log("과거");
    } else if (
      dayjs(new Date(dateText)).format("YYYY/MM/DD") ===
      dayjs(new Date()).format("YYYY/MM/DD")
    ) {
      console.log("오늘");
    } else {
      alert("잘못된 경로로 들어오셨습니다. 돌아가세요.");
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
  const updateList = async (
    name: string,
    email: string,
    menuName: string,
    seq: string
  ) => {
    await setData("orderList", {
      menuName: menuName,
      seq: seq,
      price: 5000,
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
                        </dd>
                      </dl>
                    </li>
                  );
                })
              )}
            </ul>
            <BtnOrderUI type="button" onClick={() => handleModalOpen()}>
              주문하기
            </BtnOrderUI>
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
