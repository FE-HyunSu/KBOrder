import React, { useState, useEffect } from "react";
import Link from "next/link";
import { OrderListUI, BtnCreateOrder } from "./OrderListStyle";
import Loading from "../../common/loading/Loading";
import { getData } from "../../../api/firestore";
import dayjs from "dayjs";
import { dateText } from "../../common/CommonFn";

interface orderListType {
  date: string;
  title: string;
  seq: number;
  open: boolean;
}

const OrderList = () => {
  const [isOrderList, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState<Boolean>(true);
  const getList = async () => {
    let dataList: any = [];
    await getData("dateList").then((data) => {
      dataList = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    setOrderList(dataList.sort((a: any, b: any) => b.seq - a.seq));
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
                isOrderList.map((item: orderListType, idx: number) => {
                  return (
                    <li
                      key={idx}
                      className={
                        dayjs(new Date(dateText(item.seq))).format(
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
                            {dayjs(new Date(dateText(item.seq))).format(
                              "M월D일(ddd)"
                            )}{" "}
                            김밥주문
                          </dt>
                          <dd>
                            {dayjs(new Date(dateText(item.seq))).format(
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
