import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllTranLots(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.translots}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.translots}`);
    return data;
  }
}

export function useTranLots() {
  const [tranlotId, setTranLotId] = useState("");

  const fallback = [];
  const { data: translots = fallback } = useQuery({
    queryKey: [queryKeys.translots, tranlotId],
    queryFn: () => getAllTranLots(tranlotId),
  });

  return { translots, setTranLotId };
}
