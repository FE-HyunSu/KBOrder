import { getData } from "../api/firestore";

interface orderListType {
  date: String;
  title: String;
  seq: Number;
  open: Boolean;
}

const getOrderList = async () => {
  let orderList: any = {};
  await getData("order").then((data) => {
    orderList = data.docs.map((item: any) => {
      return { ...item.data() };
    });
  });
  orderList.sort((a: any, b: any) => {
    return b.seq - a.seq;
  });
  return orderList;
};

export default getOrderList;
