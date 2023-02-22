import styled from "styled-components";

export const OrderDetailUI = styled.section`
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
          padding: 2rem 1rem;
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
            }
            dd {
            }
          }
        }
      }
    }
  }
`;
