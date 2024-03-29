import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { BounceTurnMotion } from '@styles/keyframe';
import { MEDIA } from '@styles/theme';
import Loading from '@components/@common/Loading';
import ModalKbSelect from '../../modal/kbSelect';
import { getData, setData, delData, updateData } from '@api/firestore';
import { userAtom } from '@store/store';
import { useRecoilValue } from 'recoil';
import { unitWon, returnDate } from '@utils/returnData';
import ButtonFixed from '@components/@common/ButtonFixed';
import Link from 'next/link';
import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routers';
import { COLOR } from '@styles/theme';

interface menuListType {
  menuName: string;
  count: number;
}

interface orderDataType {
  id: string;
  menuName: string;
  price: number;
  seq: string;
  userEmail: string;
  userName: string;
}

interface orderDetailType {
  id: string;
  menuName: string;
  price: number;
  seq: string;
  userEmail: string;
  userName: string;
}

const OrderDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [isOrderData, setOrderData] = useState<orderDataType[] | undefined>([]);
  const [orderTotal, setOrderTotal] = useState<menuListType[]>([]);
  const [isModalOpen, setModalOpen] = useState<Boolean>(false);
  const [dateTitle, setDateTitle] = useState<String>('');
  const [isOpen, setOpen] = useState<Boolean>(false);
  const [isOrderClose, setOrderClose] = useState<Boolean>(false);
  const atomUserInfo = useRecoilValue(userAtom);
  const dateNumber = !!id ? String(id).split('_')[0] : '';
  const madeUser = !!id ? String(id).split('_')[1] : '';

  const todayCloseCheck = async () => {
    await getData('dateList').then((data) => {
      const dataList = data.docs.map((item: any) => {
        return { ...item.data() };
      });
      const todayInfo = dataList.filter((item) => item.seq === id)[0];
      if (!!todayInfo.orderClose) setOrderClose(todayInfo.orderClose);
    });
  };

  const orderClose = async () => {
    if (confirm('주문을 마감처리 하시겠습니까?')) {
      await getData('dateList').then((data) => {
        const dataList = data.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        });
        const todayInfo = dataList.filter((item) => item.seq === id)[0];
        updateData('dateList', todayInfo.id, {
          seq: todayInfo.seq,
          orderClose: true,
        }).then((res) => {
          alert('주문이 마감 되었습니다.');
          setOrderClose(true);
          orderListData();
        });
      });
    }
  };

  // 페이지 정보 기본 셋팅.
  const pageInfoSet = (date: string) => {
    const dateText = returnDate(date);
    setDateTitle(dayjs(new Date(dateText)).format('YYYY년 MM월 DD일 (ddd)'));
    if (dayjs(new Date(dateText)).format('YYYY/MM/DD') < dayjs(new Date()).format('YYYY/MM/DD')) {
      setOpen(false);
      setOrderClose(true);
    } else if (dayjs(new Date(dateText)).format('YYYY/MM/DD') === dayjs(new Date()).format('YYYY/MM/DD')) {
      setOpen(true);
      todayCloseCheck();
    }
    orderListData();
  };

  const apiOrder = async (code: string, method: string, param: string) => {
    if (code === 'orderList' && method === 'get') {
      let orderDetailData: orderDetailType[] = [];
      await getData('orderList').then((data) => {
        orderDetailData = data.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        });
      });
      return orderDetailData.filter((item: orderDetailType) => item.seq === String(param));
    }
  };

  // 전체데이터 삭제.
  const orderDeleteAll = async (id: string) => {
    if (await confirm('주문 전체를 삭제 할까요?')) {
      // 전체데이터 삭제 로직 추가 필요.
      await alert('주문 전체가 삭제되었습니다.');
      router.push(ROUTES.LIST);
    } else {
      alert('주문 전체 삭제를 취소 하셨습니다.');
    }
  };

  // 목록 갱신. 추후 주문 업데이트 시 해당 함수만 재실행.
  const orderListData = () => {
    let orderSum: string[] = [];
    let orderResult: menuListType[] = [];
    setLoading(true);
    const orderData = apiOrder('orderList', 'get', String(id));
    orderData.then((data: orderDataType[] | undefined) => {
      setOrderData(data);
      if (!!data)
        data.forEach((item: orderDataType) => {
          if (item.menuName !== '오늘은 다른거 먹을래요') orderSum.push(item.menuName);
        });
      const selectList = Array.from(new Set(orderSum));
      selectList.forEach((item) => {
        orderResult.push({
          menuName: String(item),
          count: orderSum.filter((subItem: string) => subItem === item).length,
        });
      });

      setOrderTotal(orderResult);
      setLoading(false);
    });
  };
  const orderDelete = async (id: string) => {
    if (await confirm('주문을 취소 할까요?')) {
      await delData('orderList', id);
      await alert('주문이 취소 되었습니다.');
      await orderListData();
    } else {
      alert('주문 취소를 취소 하셨습니다.');
    }
  };
  const updateList = async (name: string, email: string, menuName: string, seq: string) => {
    let menuPrice = 0;
    await getData('menuList').then((data) => {
      const menuData = data.docs.map((item: any) => {
        return { ...item.data(), id: item.id };
      });
      menuPrice = menuData.filter((item) => item.name === menuName)[0].price;
    });
    await setData('orderList', {
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
    isOrderClose ? alert('오늘의 주문이 마감되었습니다.') : setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (typeof id === 'string') pageInfoSet(dateNumber);
  }, [router.isReady]);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <OrderDetailUI>
          <div className="inner">
            <h1>
              <span>🍙</span>
              <strong>
                <em>{dateTitle}</em>
                {isOrderClose ? <strong>주문마감</strong> : ` 주문`}({madeUser})
              </strong>
              {!isOrderClose ? (
                <BtnOrderClose type="button" onClick={() => orderClose()}>
                  주문마감
                </BtnOrderClose>
              ) : null}
              <Link href={ROUTES.STORE_TEL}>전화걸기</Link>
            </h1>
            <div className="order-info">
              <p>
                {orderTotal && orderTotal.length === 0
                  ? `주문 내역이 없습니다.`
                  : orderTotal.map((item: menuListType, idx: number) => {
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
                isOrderData.map((item: orderDataType, idx: number) => {
                  return (
                    <li key={idx}>
                      <dl>
                        <dt>
                          <span></span>
                          {item.menuName}
                        </dt>
                        <dd>
                          <strong>{item.userName}</strong>
                          <em>{unitWon(item.price)}원</em>
                          {atomUserInfo.email !== '' &&
                          isOpen &&
                          !isOrderClose &&
                          atomUserInfo.email === item.userEmail ? (
                            <BtnDeleteUI type="button" onClick={() => orderDelete(item.id)}>
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
            {isOpen && isOpen ? <ButtonFixed name={`주문하기`} onClickFn={handleModalOpen} /> : null}
          </div>
        </OrderDetailUI>
      )}
      {isModalOpen && isModalOpen ? <ModalKbSelect onClose={handleModalClose} returnFn={updateList} /> : null}
    </>
  );
};

export default OrderDetail;

const OrderDetailUI = styled.section`
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
    box-sizing: border-box;
    h1 {
      display: flex;
      align-items: center;
      position: relative;
      padding: 2rem 0 0.5rem;
      font-weight: 700;
      font-size: 1.4rem;
      color: ${COLOR.black};
      text-align: left;
      span {
        display: inline-block;
        padding-bottom: 0.5rem;
        font-size: 2rem;
      }
      strong {
        display: inline-block;
        flex: 1 auto;
        padding-left: 0.5rem;
        em {
          color: ${COLOR.green};
        }
        strong {
          color: ${COLOR.orange};
        }
      }
      a {
        display: inline-block;
        padding: 1rem;
        color: ${COLOR.white};
        font-size: 1.2rem;
        font-weight: 400;
        text-decoration: none;
        background-color: ${COLOR.green};
        border-radius: 4rem;
      }
    }
    .order-info {
      width: 100%;
      margin: 1rem auto 2rem;
      padding: 2rem;
      font-size: 1.4rem;
      text-align: left;
      border: 0.1rem solid ${COLOR.grayCC};
      border-radius: 0.8rem;
      box-sizing: border-box;
      p {
        color: ${COLOR.gray99};
        strong {
          display: inline-block;
          line-height: 1.3;
          & + strong {
            padding-left: 0.4rem;
            &:before {
              content: '+ ';
            }
          }
        }
        span {
          font-weight: 700;
          color: ${COLOR.black};
        }
        em {
          font-weight: 700;
          color: ${COLOR.green};
        }
        ${MEDIA.mobile} {
          text-align: center;
        }
      }
    }
    ul {
      li {
        border-bottom: 0.1rem solid ${COLOR.grayEE};
        &:first-of-type {
          border-top: 0.1rem solid ${COLOR.grayEE};
        }
        &.open {
          dd {
            color: ${COLOR.orangeL};
          }
        }
        &.closed {
          a {
            cursor: default;
          }
          dt,
          dd {
            color: ${COLOR.grayCC};
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
                content: '';
                position: absolute;
                top: 0;
                left: 1rem;
                bottom: 0;
                width: 2rem;
                height: 2rem;
                margin: auto;
                background: url(${IMAGES.LOGO}) no-repeat 0 0 / 100% auto;
                animation: ${BounceTurnMotion} 1s infinite;
              }
            }
          }
          dd {
            em {
              display: inline-block;
              padding: 0.6rem;
              font-size: 1.4rem;
              color: ${COLOR.black};
            }
            strong {
              display: inline-block;
              margin: 0.2rem;
              padding: 0.6rem 1rem;
              font-size: 1.4rem;
              color: ${COLOR.white};
              background-color: ${COLOR.green};
              border-radius: 2rem;
            }
          }
        }
      }
    }
  }
`;

const NoneOrderUI = styled.div`
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
      color: ${COLOR.green};
    }
  }
`;

const BtnDeleteUI = styled.button`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #ee2929;
  text-indent: -9999rem;
  border-radius: 100%;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    height: 0.1rem;
    margin: auto;
    background-color: ${COLOR.white};
    transition: 0.2s;
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    height: 0.1rem;
    margin: auto;
    background-color: ${COLOR.white};
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
  ${MEDIA.mobile} {
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

const BtnOrderClose = styled.button`
  display: inline-block;
  margin-right: 0.6rem;
  padding: 0.9rem 1rem;
  color: ${COLOR.white};
  font-size: 1.2rem;
  font-weight: 400;
  text-decoration: none;
  background-color: ${COLOR.orange};
  border-radius: 4rem;
  outline: 0;
  box-sizing: border-box;
`;
