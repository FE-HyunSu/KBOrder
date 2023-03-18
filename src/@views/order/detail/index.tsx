import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import { media } from "../../../styles/theme";
import apiOrder from "../../../was/order";
import Loading from "../../@common/Loading/Loading";
import * as commonFn from "../../../utils/returnData";
import ModalKbSelect from "../../modal/kbSelect";
import { getData, setData, delData } from "../../../api/firestore";
import dayjs from "dayjs";
import { userAtom } from "../../../store/store";
import { useRecoilValue } from "recoil";
import { returnDate } from "../../../utils/returnData";

interface menuListType {}

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [isOrderData, setOrderData] = useState<any>(null);
  const [orderTotal, setOrderTotal] = useState<any>([]);
  const [isModalOpen, setModalOpen] = useState<Boolean>(false);
  const [dateTitle, setDateTitle] = useState<String>("");
  const [isOpen, setOpen] = useState<Boolean>(false);
  const atomUserInfo = useRecoilValue(userAtom);

  // 페이지 정보 기본 셋팅.
  const pageInfoSet = (date: string) => {
    const dateText = commonFn.returnDate(date);
    setDateTitle(dayjs(new Date(dateText)).format("YYYY년 MM월 DD일 (ddd)"));
    if (
      dayjs(new Date(dateText)).format("YYYY/MM/DD") <
      dayjs(new Date()).format("YYYY/MM/DD")
    ) {
      // console.log("과거");
      setOpen(false);
    } else if (
      dayjs(new Date(dateText)).format("YYYY/MM/DD") ===
      dayjs(new Date()).format("YYYY/MM/DD")
    ) {
      // console.log("오늘");
      setOpen(true);
    } else {
      alert("오픈전입니다. 돌아가세요.");
      router.push("/list");
    }
    orderListData();
  };

  // 목록 갱신. 추후 주문 업데이트 시 해당 함수만 재실행.
  const orderListData = () => {
    let orderSum: any = [];
    let orderResult: any = [];
    setLoading(true);
    const orderData = apiOrder("orderList", "get", id);
    orderData.then((data: any) => {
      setOrderData(data);
      data.forEach((item: any) => orderSum.push(item.menuName));
      const selectList = Array.from(new Set(orderSum));
      selectList.forEach((item) => {
        orderResult.push({
          menuName: item,
          count: orderSum.filter((subItem: any) => subItem === item).length,
        });
      });

      setOrderTotal(orderResult);
      setLoading(false);
    });
  };
  const orderDelete = async (id: string) => {
    if (await confirm("주문을 취소 할까요?")) {
      await delData("orderList", id);
      await alert("주문이 취소 되었습니다.");
      await orderListData();
    } else {
      alert("주문 취소를 취소 하셨습니다.");
    }
  };
  const updateList = async (
    name: string,
    email: string,
    menuName: string,
    seq: string
  ) => {
    let menuPrice = 0;
    await getData("menuList").then((data) => {
      const menuData = data.docs.map((item: any) => {
        return { ...item.data(), id: item.id };
      });
      menuPrice = menuData.filter((item) => item.name === menuName)[0].price;
    });
    await setData("orderList", {
      menuName: menuName,
      seq: seq,
      price: menuPrice,
      userEmail: email,
      userName: name,
    });
    orderListData();
    handleModalClose();
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof id === "string") pageInfoSet(id);
  }, [router.isReady]);
  return (
    <>
      {isLoading && isLoading ? (
        <Loading />
      ) : (
        <OrderDetailUI>
          <div className="inner">
            <h1>
              <span>🍙</span>
              <strong>
                <em>{dateTitle}</em> 주문
              </strong>
              <a href="tel:025675976">전화걸기</a>
            </h1>
            <div className="order-info">
              <p>
                {orderTotal &&
                  orderTotal.map((item: any, idx: number) => {
                    return (
                      <strong key={idx}>
                        <span>{item.menuName}</span> <em>{item.count}줄</em>
                      </strong>
                    );
                  })}
              </p>
            </div>
            <ul>
              {isOrderData && isOrderData.length === 0 ? (
                <>
                  <NoneOrderUI>
                    <strong>
                      <em>{dateTitle}</em>
                      <br />
                      주문 이력이 없습니다.
                    </strong>
                  </NoneOrderUI>
                </>
              ) : (
                isOrderData &&
                isOrderData.map((item: any, idx: number) => {
                  return (
                    <li key={idx}>
                      <dl>
                        <dt>
                          <span></span>
                          {item.menuName}
                        </dt>
                        <dd>
                          <strong>{item.userName}</strong>
                          <em>{commonFn.unitWon(item.price)}</em>
                          {atomUserInfo.email !== "" &&
                          isOpen &&
                          atomUserInfo.email === item.userEmail ? (
                            <BtnDeleteUI
                              type="button"
                              onClick={() => orderDelete(item.id)}
                            >
                              주문취소
                            </BtnDeleteUI>
                          ) : null}
                        </dd>
                      </dl>
                    </li>
                  );
                })
              )}
            </ul>
            {isOpen && isOpen ? (
              <BtnOrderUI type="button" onClick={() => handleModalOpen()}>
                주문하기
              </BtnOrderUI>
            ) : null}
          </div>
        </OrderDetailUI>
      )}
      {isModalOpen && isModalOpen ? (
        <ModalKbSelect onClose={handleModalClose} returnFn={updateList} />
      ) : null}
    </>
  );
};

export default OrderDetail;

const BounceMotion = keyframes`
  0%{transform:scale(1,1) rotate(0deg);}
  30%{transform:scale(.9,1.1);}
  70%{transform:scale(1.1,.9);}
  100%{transform:scale(1,1) rotate(360deg);}
`;

const IntroMotion = keyframes`
  0%{
    width:0;
    height: .5rem;
    text-indent:-30rem;
  }
  20%{
    width:1rem;
    height: 4.5rem;
    text-indent:-30rem;
  }
  100%{
    width:80%;
    height: 4.5rem;
    text-indent:0;
  }
`;

export const OrderDetailUI = styled.section`
  display: block;
  width: 100%;
  min-height: calc(100vh - 10rem);
  padding-bottom: 10rem;
  box-sizing: border-box;
  .inner {
    max-width: 102.4rem;
    min-height: 20rem;
    margin: auto;
    padding: 1.6rem;
    background-color: eee;
    box-sizing: border-box;
    h1 {
      display: flex;
      align-items: center;
      position: relative;
      padding: 2rem 0 0.5rem;
      font-weight: 700;
      font-size: 1.6rem;
      color: #1a1a1a;
      text-align: left;
      span {
        display: inline-block;
        padding-bottom: 0.5rem;
        font-size: 2.4rem;
      }
      strong {
        display: inline-block;
        flex: 1 auto;
        padding-left: 0.5rem;
        em {
          color: #299438;
        }
      }
      a {
        display: inline-block;
        padding: 1rem;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 400;
        text-decoration: none;
        background-color: #299438;
        border-radius: 4rem;
      }
    }
    .order-info {
      width: 100%;
      margin: 2rem auto;
      padding: 2rem;
      font-size: 1.4rem;
      text-align: left;
      border: 0.1rem solid #ddd;
      border-radius: 0.8rem;
      box-sizing: border-box;
      p {
        color: #777;
        strong {
          display: inline-block;
          line-height: 1.3;
          & + strong {
            padding-left: 0.4rem;
            &:before {
              content: "+ ";
            }
          }
        }
        span {
          font-weight: 700;
          color: #111;
        }
        em {
          font-weight: 700;
          color: #299438;
        }
        ${media.mobile} {
          text-align: center;
        }
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
        dl {
          display: flex;
          justify-content: center;
          align-items: center;
          dt {
            flex: 1 auto;
            position: relative;
            padding: 2rem 0 2rem 1.5rem;
            font-size: 1.6rem;
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
                background: url(images/img_logo.png) no-repeat 0 0 / 100% auto;
                animation: ${BounceMotion} 1s infinite;
              }
            }
          }
          dd {
            em {
              display: inline-block;
              padding: 0.6rem;
              font-size: 1.4rem;
              color: #111;
            }
            strong {
              display: inline-block;
              margin: 0.2rem;
              padding: 0.6rem 1rem;
              font-size: 1.4rem;
              color: #fff;
              background-color: #299438;
              border-radius: 2rem;
            }
          }
        }
      }
    }
  }
`;

export const BtnOrderUI = styled.button`
  position: fixed;
  right: 0;
  bottom: 7rem;
  left: 0;
  width: 0;
  max-width: 16rem;
  height: 0.5rem;
  margin: auto;
  font-weight: 500;
  font-size: 1.4rem;
  color: #fff;
  background-color: #299438;
  border-radius: 6rem;
  overflow: hidden;
  animation: ${IntroMotion} 2s forwards;
  z-index: 2;
`;

export const NoneOrderUI = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  font-size: 1.4rem;
  line-height: 1.3;
  text-align: center;
  strong {
    font-weight: 400;
    em {
      color: #299438;
    }
  }
`;

export const BtnDeleteUI = styled.button`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #ee2929;
  text-indent: -9999rem;
  border-radius: 100%;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    height: 0.1rem;
    margin: auto;
    background-color: #fff;
    transition: 0.2s;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    height: 0.1rem;
    margin: auto;
    background-color: #fff;
    transition: 0.2s;
  }
  &:hover {
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
  ${media.mobile} {
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
    &:hover {
      &:before {
        transform: rotate(45deg);
      }
      &:after {
        transform: rotate(-45deg);
      }
    }
  }
`;