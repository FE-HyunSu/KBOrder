import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { OrderDetailUI } from "./OrderDetailStyle";
import apiOrder from "../../../was/order";
import Loading from "../../common/loading/Loading";
import * as commonFn from "../../common/CommonFn";

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState(true);
  const [isOrderData, setOrderData] = useState<any>(null);
  const getData = () => {
    const orderData = apiOrder("orderList", "get", id);
    orderData.then((data) => {
      setOrderData(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);
  return (
    <>
      {isLoading && isLoading ? (
        <Loading />
      ) : (
        <OrderDetailUI>
          <div className="inner">
            <h1>
              <em>🍙</em>
              <strong>
                {isOrderData && isOrderData.title ? isOrderData.title : null}
              </strong>{" "}
              주문 현황
            </h1>
            <div className="order-info">
              <p>
                {isOrderData &&
                  isOrderData.data
                    .filter((item: any) => item.user.length > 0)
                    .map((item: any, idx: number) => {
                      return (
                        <strong key={idx}>
                          <span>{item.name}</span>(<em>{item.user.length}줄</em>{" "}
                          * {commonFn.unitWon(item.price)})
                        </strong>
                      );
                    })}
              </p>
            </div>
            <ul>
              {isOrderData &&
                isOrderData.data.map((item: any, idx: number) => {
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
          </div>
        </OrderDetailUI>
      )}
    </>
  );
};

export default OrderDetail;
