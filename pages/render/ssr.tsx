import React from 'react';
import styled from '@emotion/styled';
import RenderNav from '@components/renderNav';
import { getData } from '@api/firestore';

interface userListType {
  map(arg0: (item: userListType, idx: number) => JSX.Element): React.ReactNode;
  email: string;
  id: string;
  name: string;
  uid: string;
}

interface ssrUserListType {
  userList: userListType;
  revalidate: number;
}

const SSR = ({ userList }: ssrUserListType) => {
  return (
    <>
      <RenderNav />
      <RenderTestBox>
        <h1>SSR (Server Side Rendering)</h1>
        <p>회원 이름 목록</p>
        <ul>
          {userList &&
            userList.map((item: userListType, idx: number) => {
              return (
                <li key={idx}>
                  {idx + 1}. {item.name}
                </li>
              );
            })}
        </ul>
      </RenderTestBox>
    </>
  );
};

export const getServerSideProps = async () => {
  let userList = {};
  await getData('user').then((data) => {
    userList = data.docs.map((item: any) => {
      return { ...item.data(), id: item.id };
    });
  });

  return { props: { userList } };
};

export default SSR;

const RenderTestBox = styled.section`
  width: 100%;
  max-width: 102.4rem;
  margin-top: 10rem;
  padding: 5rem;
  box-sizing: border-box;
  background-color: #b8d0f0;
  border-radius: 2rem;
  h1 {
    display: block;
    width: 100%;
    padding-bottom: 2rem;
    font-weight: 700;
    font-size: 4rem;
    color: #000;
  }
  p {
    font-weight: 500;
    font-size: 1.8rem;
    color: #3a3a3a;
  }
  ul {
    padding-top: 2rem;
    li {
      width: 100%;
      padding: 1rem 0;
      font-weight: 400;
      font-size: 1.4rem;
      border-bottom: 0.1rem solid rgba(0, 0, 0, 0.1);
      &:first-of-type {
        border-top: 0.1rem solid rgba(0, 0, 0, 0.1);
      }
    }
  }
`;
