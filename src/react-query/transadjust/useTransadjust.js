import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllTransadjust(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.tranadjust}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.tranadjust}`);
    return data;
  }
}

export function useTransadjust() {
  const [tranadjId, setTranAdjId] = useState("");

  const fallback = [];
  const { data: tranadjust = fallback } = useQuery({
    queryKey: [queryKeys.tranadjust, tranadjId],
    queryFn: () => getAllTransadjust(tranadjId),
  });

  return { tranadjust, setTranAdjId };
}
