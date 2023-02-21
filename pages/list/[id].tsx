import React from "react";
import { useRouter } from "next/router";

const ListDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  return <>{id}</>;
};

export default ListDetail;
