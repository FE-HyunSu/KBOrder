import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderListUI, BtnCreateOrder } from "./OrderListStyle";
import apiGetOrder from "../../api/order";

interface orderListType {
  date: String;
  title: String;
  seq: Number;
  open: Boolean;
}

const OrderList = () => {
  const [isOrderList, setOrderList] = useState([]);
  const getList = async () => {
    const dataList = await apiGetOrder("list");
    setOrderList(dataList);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <OrderListUI>
        <div className="inner">
          <h1>주문 목록</h1>
          <ul>
            {isOrderList &&
              isOrderList.map((item: orderListType, idx: number) => {
                return (
                  <li key={idx} className={item.open ? `open` : `closed`}>
                    <Link href={item.open ? `/list/` + item.seq : ``}>
                      <dl>
                        <dt>{item.title}</dt>
                        <dd>{item.open ? `모집중` : `마감`}</dd>
                      </dl>
                    </Link>
                  </li>
                );
              })}
          </ul>
          <BtnCreateOrder onClick={() => console.log("버튼클릭")}>
            주문하기
          </BtnCreateOrder>
        </div>
      </OrderListUI>
    </>
  );
};

export default OrderList;
