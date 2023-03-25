import { getData } from "../api/firestore";

interface orderDetailType {
  id: string;
  menuName: string;
  price: number;
  seq: string;
  userEmail: string;
  userName: string;
}

// 'code === list' -> 목록 조회 및 seq 기준으로 정렬하여 return.
const apiOrder = async (code: string, method: string, param: string) => {
  if (code === "orderList" && method === "get") {
    let orderDetailData: orderDetailType[] = [];
    await getData("orderList").then((data) => {
      orderDetailData = data.docs.map((item: any) => {
        return { ...item.data(), id: item.id };
      });
    });
    return orderDetailData.filter(
      (item: orderDetailType) => item.seq === String(param)
    );
  }
};

export default apiOrder;
