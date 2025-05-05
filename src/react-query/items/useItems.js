import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllItems(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.items}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.items}`);
    return data;
  }
}

export function useItems() {
  const [itemId, setItemId] = useState("");

  const fallback = [];
  const { data: items = fallback } = useQuery({
    queryKey: [queryKeys.items, itemId],
    queryFn: () => getAllItems(itemId),
  });

  return { items, setItemId };
}
