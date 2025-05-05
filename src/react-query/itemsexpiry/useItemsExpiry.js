import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllItemsExpiry(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.itemsexpiry}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.itemsexpiry}`);
    return data;
  }
}

export function useItemsExpiry() {
  const [itemexpId, setItemExpId] = useState("");

  const fallback = [];
  const { data: itemsexpiry = fallback } = useQuery({
    queryKey: [queryKeys.itemsexpiry, itemexpId],
    queryFn: () => getAllItemsExpiry(itemexpId),
  });

  return { itemsexpiry, setItemExpId };
}
