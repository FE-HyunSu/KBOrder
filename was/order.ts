import { getData } from "../api/firestore";

interface orderListType {
  date: string;
  title: string;
  seq: number;
  open: boolean;
}

// 'code === list' -> 목록 조회 및 seq 기준으로 정렬하여 return.
const apiOrder = async (code: string, method: string, param: any) => {
  if (code === "list" && method === "get") {
    let orderList: any = {};
    await getData("order").then((data) => {
      orderList = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    orderList.sort((a: orderListType, b: orderListType) => {
      return b.seq - a.seq;
    });
    return orderList;
  } else if (code === "orderDetail" && method === "get") {
    let orderDetailData: any = [];
    await getData("orderDetail").then((data) => {
      orderDetailData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    return orderDetailData.filter((item: any) => item.seq === Number(param))[0];
  }
};

export default apiOrder;
