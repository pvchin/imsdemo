import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllTrans(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.transactions}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.transactions}`);
    return data;
  }
}

export function useTrans() {
  const [tranId, setTranId] = useState("");

  const fallback = [];
  const { data: transactions = fallback } = useQuery({
    queryKey: [queryKeys.transactions, tranId],
    queryFn: () => getAllTrans(tranId),
  });

  return { transactions, setTranId };
}
