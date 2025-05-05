import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllCustomers(custId) {
  if (custId) {
    const { data } = await axios.get(`${queryKeys.customers}?fv=${custId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.customers}`);
    return data;
  }
}

export function useCustomers() {
  const [custId, setCustId] = useState("");

  const fallback = [];
  const { data: customers = fallback } = useQuery({
    queryKey: [queryKeys.customers, custId],
    queryFn: () => getAllCustomers(custId),
  });

  return { customers, setCustId };
}
