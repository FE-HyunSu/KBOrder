import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderListUI, BtnCreateOrder } from "./OrderListStyle";
import { getData } from "../../api/firestore";

const OrderList = () => {
  const [isList, setList] = useState([]);
  const getList = async () => {
    await getData("order").then((data) => {
      let orderList: any = {};
      orderList = data.docs.map((item: any) => {
        return { ...item.data() };
      });
      setList(orderList);
    });
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
                    <Link href={`/list/` + item.date}>{item.date}</Link>
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
