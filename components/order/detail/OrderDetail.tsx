import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { OrderDetailUI } from "./OrderDetailStyle";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const menuList = [
    { name: "제육김밥", price: 5000 },
    { name: "묵은지김밥", price: 5000 },
    { name: "불고기김밥", price: 5000 },
    { name: "참치김밥", price: 4300 },
  ];
  const sampleData = {
    id: 20230222,
    title: "2023년 2월 22일",
    data: [
      { name: "제육김밥", user: [], price: 5000 },
      { name: "묵은지김밥", user: [], price: 5000 },
      { name: "불고기김밥", user: [], price: 5000 },
      { name: "참치김밥", user: [], price: 4300 },
    ],
  };
  return (
    <>
      <OrderDetailUI>
        <div className="inner">
          <h1>
            <em>🍙</em> {sampleData.title} 주문 현황
          </h1>
          <ul>
            {sampleData &&
              sampleData.data.map((item: any, idx: any) => {
                return (
                  <li key={idx}>
                    <dl>
                      <dt>{item.name}</dt>
                      <dd>{item.price}</dd>
                    </dl>
                  </li>
                );
              })}
          </ul>
        </div>
      </OrderDetailUI>
    </>
  );
};

export default OrderDetail;
