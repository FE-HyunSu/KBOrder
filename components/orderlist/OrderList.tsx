import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderListUI, BtnCreateOrder } from "./OrderListStyle";
import apiOrder from "../../was/order";
import Loading from "../loading/Loading";
import { useRouter } from "next/router";
import { apiAuth } from "../../was/auth";

interface orderListType {
  date: string;
  title: string;
  seq: number;
  open: boolean;
}

const OrderList = () => {
  const router = useRouter();
  const [isOrderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const getList = async () => {
    const dataList = await apiOrder("list", "get");
    setOrderList(dataList);
    setLoading(false);
  };
  useEffect(() => {
    getList();
    // apiAuth("inga", "get") ? console.log("good") : router.push("login");
  }, []);
  return (
    <>
      {isLoading && isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
};

export default OrderList;
