import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setData, getData } from "@api/firestore";
import Loading from "@views/@common/Loading/Loading";
import OrderItem from "@views/Order/List/OrderItem";
import dayjs from "dayjs";

interface dateListType {
  seq: string;
}

const OrderList = () => {
  const [isOrderList, setOrderList] = useState<dateListType[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);
  const setItem = async () => {
    setLoading(true);
    const today: string = dayjs(new Date()).format("YYYYMMDD");
    let dataCheck: Boolean = false;
    isOrderList.forEach((item) => {
      if (item.seq === today) dataCheck = true;
    });
    if (confirm("오늘의 주문을 만드시겠습니까?")) {
      if (dataCheck) {
        alert("오늘의 주문이 이미 생성 되어있습니다.");
        setLoading(false);
      } else {
        await setData("dateList", { seq: today }).then((data) => {
          getList();
        });
      }
    } else {
      alert("취소 되었습니다.");
      setLoading(false);
    }
  };
  const getList = async () => {
    let dataList: dateListType[] = [];
    await getData("dateList").then((data) => {
      dataList = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    setOrderList(
      dataList.sort(
        (a: dateListType, b: dateListType) => Number(b.seq) - Number(a.seq)
      )
    );
    setLoading(false);
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <OrderListUI>
          <div className="inner">
            <h1>
              <em>📝</em> 주문 목록
            </h1>
            <ul>
              {isOrderList &&
                isOrderList.map((item: dateListType, idx: number) => (
                  <OrderItem key={idx} seq={item.seq} />
                ))}
            </ul>
            <BtnCreateOrder onClick={() => setItem()}>
              주문만들기
            </BtnCreateOrder>
          </div>
        </OrderListUI>
      )}
    </>
  );
};

export default OrderList;

export const OrderListUI = styled.section`
  display: block;
  width: 100%;
  min-height: calc(100vh - 10rem);
  .inner {
    max-width: 102.4rem;
    min-height: 20rem;
    margin: auto;
    padding: 1.6rem;
    background-color: eee;
    box-sizing: border-box;
    h1 {
      display: block;
      padding: 2rem 0;
      font-weight: 700;
      font-size: 2.4rem;
      color: #1a1a1a;
      text-align: left;
      em {
        display: inline-block;
        padding-right: 0.5rem;
        font-size: 3rem;
      }
    }
  }
`;

export const BtnCreateOrder = styled.button`
  display: block;
  position: fixed;
  right: 3rem;
  bottom: 5rem;
  width: 5rem;
  height: 5rem;
  font-size: 1.4rem;
  color: #fff;
  text-indent: -9999rem;
  background-color: #ccc;
  border-radius: 100%;
  transition: 0.2s;
  transform-origin: 50% 50%;
  &:hover {
    text-indent: 0;
    right: 2rem;
    bottom: 4rem;
    width: 7rem;
    height: 7rem;
    &:before {
      bottom: 3.5rem;
      left: 3.5rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 100%;
      opacity: 0;
    }
    &:after {
      top: 3.5rem;
      right: 3.5rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 100%;
      opacity: 0;
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0.8rem;
    height: 2.2rem;
    margin: auto;
    transition: 0.2s;
    background-color: #fff;
    transform: rotate(45deg);
  }
  &:after {
    content: "";
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    bottom: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    margin: auto;
    background-color: #fff;
    transition: 0.2s;
  }
`;
