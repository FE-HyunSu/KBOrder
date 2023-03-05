import { getData } from "../api/firestore";

interface orderListType {
  date: string;
  title: string;
  seq: number;
  open: boolean;
}

// 'code === list' -> 목록 조회 및 seq 기준으로 정렬하여 return.
const apiOrder = async (code: string, method: string, param: any) => {
  if (code === "orderList" && method === "get") {
    let orderDetailData: any = [];
    await getData("orderList").then((data) => {
      orderDetailData = data.docs.map((item: any) => {
        return { ...item.data(), id: item.id };
      });
    });
    return orderDetailData.filter((item: any) => item.seq === String(param));
  }
};

export default apiOrder;
