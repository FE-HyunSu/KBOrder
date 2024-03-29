import React, { useState, useEffect } from 'react';
import Modal from '@components/@common/Modal';
import { useRouter } from 'next/router';
import { unitWon } from '@utils/returnData';
import styled from '@emotion/styled';
import { BounceTurnMotion } from '@styles/keyframe';
import { getData } from '@api/firestore';
import Loading from '@components/@common/Loading';
import { userAtom } from '@store/store';
import { useRecoilValue } from 'recoil';
import { IMAGES } from '@constants/images';
import { COLOR } from '@styles/theme';
import { ROUTES } from '@constants/routers';

interface ModalProps {
  onClose: () => void;
  returnFn: any;
}
interface menuListType {
  id: string;
  name: string;
  price: number;
}
interface menuListDataType {
  data(): any;
  id: string;
}

const ModalKbSelect = (props: ModalProps) => {
  const router = useRouter();
  const { id } = router.query;
  const [isModalView, setModalView] = useState<Boolean>(false);
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [dataList, setDataList] = useState<menuListType[]>([]);
  const [selectItem, setSelectItem] = useState<String>('');
  const [isSelect, setSelect] = useState<Boolean>(false);
  const atomUserInfo = useRecoilValue(userAtom);
  const getMenuList = async () => {
    setLoading(true);
    try {
      await getData('menuList').then((data) => {
        const menuList = data.docs.map((item: menuListDataType) => {
          return { ...item.data(), id: item.id };
        });
        setDataList(menuList);
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const validation = () => {
    if (atomUserInfo.email === '') {
      alert('주문 하시려면 로그인 후 이용해 주세요.');
      router.push(ROUTES.INDEX, undefined, { shallow: true });
    } else if (!selectItem) {
      alert('메뉴를 선택해 주세요.');
    } else {
      props.returnFn(atomUserInfo.name, atomUserInfo.email, selectItem, id);
    }
  };

  useEffect(() => {
    setModalView(true);
    getMenuList();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      <BtnClose onClick={props.onClose}>닫기</BtnClose>
      <ModalOrderUI className={isModalView ? `active` : ``}>
        <h1>📝 주문하기 (메뉴를 선택해 주세요)</h1>
        <ul>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {dataList &&
                dataList.map((item: menuListType, idx: number) => (
                  <li key={idx}>
                    <label>
                      <input
                        type="radio"
                        name="mySelect"
                        onChange={() => {
                          setSelectItem(item.name);
                          setSelect(true);
                        }}
                      />
                      <span>{item.name}</span>
                      <em>{unitWon(item.price)}원</em>
                    </label>
                  </li>
                ))}
            </>
          )}
        </ul>
        <BtnComplete type="button" onClick={() => validation()} disabled={!isSelect}>
          선택완료
        </BtnComplete>
      </ModalOrderUI>
    </Modal>
  );
};

export default ModalKbSelect;

export const BtnClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  text-indent: -9999rem;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0.1rem;
    height: 2rem;
    margin: auto;
    background-color: ${COLOR.black};
    transform: rotate(45deg);
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 2rem;
    height: 0.1rem;
    margin: auto;
    background-color: ${COLOR.black};
    transform: rotate(45deg);
  }
`;

export const ModalOrderUI = styled.div`
  padding: 3rem 3rem 8rem;
  h1 {
    padding-bottom: 1.5rem;
    font-weight: 700;
    font-size: 1.6rem;
    color: ${COLOR.black};
    border-bottom: 0.1rem solid ${COLOR.grayEE};
  }
  ul {
    position: relative;
    height: calc(100vh - 30rem);
    max-height: 40rem;
    overflow: auto;
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      height: calc(100vh - 30rem);
      max-height: 40rem;
    }
    li {
      border-bottom: 0.1rem solid ${COLOR.grayEE};
      label {
        display: flex;
        align-items: center;
        position: relative;
        padding: 2rem 1.2rem;
        cursor: pointer;
        box-sizing: border-box;
        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          &:checked + span {
            font-weight: 700;
            color: ${COLOR.green};
            &:before {
              opacity: 0;
            }
            &:after {
              content: '';
              position: absolute;
              top: 0;
              left: 1.4rem;
              bottom: 0.6rem;
              width: 1.2rem;
              height: 0.7rem;
              margin: auto;
              border-left: 0.2rem solid ${COLOR.green};
              border-bottom: 0.2rem solid ${COLOR.green};
              background: none;
              animation: none;
              transform: rotate(-45deg);
            }
            & + em {
              font-weight: 700;
              color: ${COLOR.green};
              &:before {
                background-color: #f2fcf1;
              }
            }
          }
        }
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
        em {
          font-size: 1.4rem;
          &:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${COLOR.white};
            transition: 0.3s;
            z-index: -1;
          }
        }
      }
    }
  }
`;

export const BtnComplete = styled.button`
  display: block;
  position: absolute;
  bottom: -0.2rem;
  left: 0;
  width: 100%;
  margin-top: 2rem;
  padding: 1.8rem 0;
  font-weight: 500;
  font-size: 1.6rem;
  color: ${COLOR.white};
  background-color: ${COLOR.green};
  cursor: pointer;
  transition: 0.3s;
  &:disabled {
    color: ${COLOR.white};
    background-color: ${COLOR.grayCC};
  }
`;
