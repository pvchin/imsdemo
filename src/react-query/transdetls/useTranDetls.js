import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllTransDetls(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.transdetls}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.transdetls}`);
    return data;
  }
}

export function useTransDetls() {
  const [trandetlId, setTranDetlId] = useState("");

  const fallback = [];
  const { data: transdetls = fallback } = useQuery({
    queryKey: [queryKeys.transdetls, trandetlId],
    queryFn: () => getAllTransDetls(trandetlId),
  });

  return { transdetls, setTranDetlId };
}
