import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllItemsHistory(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.itemshistory}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.itemshistory}`);
    return data;
  }
}

export function useItemsHistory() {
  const [itemHistId, setItemHistId] = useState("");

  const fallback = [];
  const { data: itemshistory = fallback } = useQuery({
    queryKey: [queryKeys.itemshistory, itemHistId],
    queryFn: () => getAllItemsHistory(itemHistId),
  });

  return { itemshistory, setItemHistId };
}
