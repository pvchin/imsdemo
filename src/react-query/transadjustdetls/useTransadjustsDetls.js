import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllTransAdjustsDetls(itemId) {
  if (itemId) {
    const { data } = await axios.get(
      `${queryKeys.tranadjustdetls}?fv=${itemId}`
    );
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.tranadjustdetls}`);
    return data;
  }
}

export function useTransadjustDetls() {
  const [tranadjdetlId, setTranAdjDetlId] = useState("");

  const fallback = [];
  const { data: tranadjustdetls = fallback } = useQuery({
    queryKey: [queryKeys.tranadjustdetls, tranadjdetlId],
    queryFn: () => getAllTransAdjustsDetls(tranadjdetlId),
  });

  return { tranadjustdetls, setTranAdjDetlId };
}
