import React from "react";
import styled from "styled-components";
import RenderNav from "../../components/renderNav/RenderNav";
import { getData } from "../../api/firestore";

const SSR = ({ userList }: any) => {
  return (
    <>
      <RenderNav />
      <RenderTestBox>
        <h1>SSR (Server Side Rendering)</h1>
        <p>회원 이름 목록</p>
        <ul>
          {userList &&
            userList.map((item: any, idx: any) => {
              return (
                <>
                  <li key={idx}>{item.name}</li>
                </>
              );
            })}
        </ul>
      </RenderTestBox>
    </>
  );
};

export const getServerSideProps = async () => {
  let userList = {};
  await getData("user").then((data) => {
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
  padding: 2rem;
  box-sizing: border-box;
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
      border-bottom: 0.1rem solid #eee;
      &:first-child {
        border-top: 0.1rem solid #eee;
      }
    }
  }
`;
