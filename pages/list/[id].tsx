import React from "react";
import { useRouter } from "next/router";
import OrderDetail from "../../components/order/detail/OrderDetail";

const ListDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <OrderDetail />
      {id}
    </>
  );
};

export default ListDetail;
