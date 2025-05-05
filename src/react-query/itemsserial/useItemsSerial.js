import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllItemsSerial(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.itemsserial}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.itemsserial}`);
    return data;
  }
}

export function useItemsSerial() {
  const [itemserialId, setItemSerialId] = useState("");

  const fallback = [];
  const { data: itemsserial = fallback } = useQuery({
    queryKey: [queryKeys.itemsserial, itemserialId],
    queryFn: () => getAllItemsSerial(itemserialId),
  });

  return { itemsserial, setItemSerialId };
}
