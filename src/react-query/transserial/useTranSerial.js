import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllTranSerial(itemId) {
  if (itemId) {
    const { data } = await axios.get(`${queryKeys.transserial}?fv=${itemId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.transserial}`);
    return data;
  }
}

export function useTranSerial() {
  const [transerialId, setTranSerialId] = useState("");

  const fallback = [];
  const { data: transserial = fallback } = useQuery({
    queryKey: [queryKeys.transserial, transerialId],
    queryFn: () => getAllTranSerial(transerialId),
  });

  return { transserial, setTranSerialId };
}
