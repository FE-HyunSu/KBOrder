import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import Loading from "../../@common/Loading/Loading";
import { getData } from "../../../api/firestore";
import dayjs from "dayjs";
import { returnDate } from "../../../utils/returnData";
import { BounceTurnMotion } from "../../../styles/keyframe";

interface dateListType {
  seq: string;
}

const OrderList = () => {
  const [isOrderList, setOrderList] = useState<dateListType[]>([]);
  const [isLoading, setLoading] = useState<Boolean>(true);
  const getList = async () => {
    let dataList: dateListType[] = [];
    await getData("dateList").then((data) => {
      console.log("data.docs", data.docs);
      dataList = data.docs.map((item: any) => {
        console.log("data.docs", item);
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
      {isLoading && isLoading ? (
        <Loading />
      ) : (
        <OrderListUI>
          <div className="inner">
            <h1>
              <em>🦉</em> 주문 목록
            </h1>
            <ul>
              {isOrderList &&
                isOrderList.map((item: dateListType, idx: number) => {
                  return (
                    <li
                      key={idx}
                      className={
                        dayjs(new Date(returnDate(item.seq))).format(
                          "YYYY/MM/DD"
                        ) === dayjs(new Date()).format("YYYY/MM/DD")
                          ? `open`
                          : `closed`
                      }
                    >
                      <Link href={!!item.seq ? `/list/` + item.seq : ``}>
                        <dl>
                          <dt>
                            <span></span>
                            {dayjs(new Date(returnDate(item.seq))).format(
                              "M월D일(ddd)"
                            )}{" "}
                            김밥주문
                          </dt>
                          <dd>
                            {dayjs(new Date(returnDate(item.seq))).format(
                              "YYYY/MM/DD"
                            ) === dayjs(new Date()).format("YYYY/MM/DD")
                              ? `모집중`
                              : `마감`}
                          </dd>
                        </dl>
                      </Link>
                    </li>
                  );
                })}
            </ul>
            {/* <br />
            <Link href={"/render/csr"}>DEV(RenderType)</Link> */}
            {/* <BtnCreateOrder onClick={() => console.log("버튼클릭")}>
              주문하기
            </BtnCreateOrder> */}
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
        font-size: 4rem;
      }
    }
    ul {
      li {
        border-bottom: 0.1rem solid #eee;
        &:first-child {
          border-top: 0.1rem solid #eee;
        }
        &.open {
          dd {
            color: #ff7111;
          }
        }
        &.closed {
          a {
            cursor: default;
          }
          dt,
          dd {
            color: #ccc;
          }
        }
        a {
          display: block;
          position: relative;
          padding: 2rem 1rem 2rem 1.6rem;
          font-size: 1.4rem;
          color: #111;
          text-decoration: none;
          box-sizing: border-box;
          dl {
            display: flex;
            justify-content: center;
            align-items: center;
            dt {
              flex: 1 auto;
              span {
                display: inline-block;
                flex: 1 auto;
                padding-left: 2rem;
                font-size: 1.4rem;
                transition: 0.3s;
                &:before {
                  content: "";
                  position: absolute;
                  top: 0;
                  left: 1rem;
                  bottom: 0;
                  width: 2rem;
                  height: 2rem;
                  margin: auto;
                  background: url(/images/img_logo.png) no-repeat 0 0 / 100%
                    auto;
                  animation: ${BounceTurnMotion} 1s infinite;
                }
              }
            }
            dd {
            }
          }
        }
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
