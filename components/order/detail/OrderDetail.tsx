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
      { name: "제육김밥", user: ["마손", "이브"], price: 5000 },
      { name: "묵은지김밥", user: ["렌"], price: 5000 },
      { name: "불고기김밥", user: ["에밀리"], price: 5000 },
      { name: "참치김밥", user: [], price: 4300 },
    ],
  };
  return (
    <>
      <OrderDetailUI>
        <div className="inner">
          <h1>
            <span className="open">모집중</span>
            <span className="closed">마감</span>
            <em>🍙</em>
            <strong>{sampleData.title}</strong> 주문 현황
          </h1>
          <ul>
            {sampleData &&
              sampleData.data.map((item: any, idx: number) => {
                return (
                  <li key={idx}>
                    <dl>
                      <dt>
                        {item.name}
                        <em>{item.user.length}J</em>
                      </dt>
                      <dd>
                        {item.user.map((subItem: string, subIdx: number) => {
                          return <strong key={subIdx}>{subItem}</strong>;
                        })}
                      </dd>
                    </dl>
                  </li>
                );
              })}
          </ul>
          <div className="order-info">
            <p>
              {sampleData &&
                sampleData.data
                  .filter((item) => item.user.length > 0)
                  .map((item: any, idx: number) => {
                    return (
                      <>
                        <strong key={idx}>
                          <span>{item.name}</span>(<em>{item.user.length}줄</em>{" "}
                          * {item.price}원)
                        </strong>
                      </>
                    );
                  })}
            </p>
          </div>
        </div>
      </OrderDetailUI>
    </>
  );
};

export default OrderDetail;
