import { getData } from "../api/firestore";

interface orderListType {
  date: String;
  title: String;
  seq: Number;
  open: Boolean;
}

// 'code === list' -> 목록 조회 및 seq 기준으로 정렬하여 return.
const apiGetOrder = async (code: string) => {
  if (code === "list") {
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
  }
};

export default apiGetOrder;
