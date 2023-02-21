import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderListUI, BtnCreateOrder } from "./OrderListStyle";
// import { getData } from "../../api/firestore";
import getOrderList from "../../api/order";

const OrderList = () => {
  const [isList, setList] = useState([]);
  const getList = async () => {
    const dataList = await getOrderList();
    setList(dataList);
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
            {isList &&
              isList.map((item: any, idx: any) => {
                return (
                  <li key={idx}>
                    <Link href={`/list`}>{item.title}</Link>
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
