import React from "react";
import Link from "next/link";
import { OrderListUI, BtnCreateOrder } from "./OrderListStyle";

interface listType {
  id: number;
  title: string;
  code: string;
}

const list = [
  { id: 0, title: "2023년2월8일", code: "p1" },
  { id: 1, title: "2023년2월7일", code: "p2" },
  { id: 2, title: "2023년2월6일", code: "p3" },
  { id: 3, title: "2023년2월5일", code: "p4" },
  { id: 4, title: "2023년2월4일", code: "p5" },
];

const OrderList = () => {
  return (
    <>
      <OrderListUI>
        <div className="inner">
          <h1>주문 목록</h1>
          <ul>
            {list &&
              list.map((item: listType) => {
                return (
                  <li key={item.id}>
                    <Link href={`/list/` + item.code}>{item.title}</Link>
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
