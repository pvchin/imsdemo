import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllSuppliers(suppId) {
  if (suppId) {
    const { data } = await axios.get(`${queryKeys.suppliers}?fv=${suppId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.suppliers}`);
    return data;
  }
}

export function useSuppliers() {
  const [suppId, setSuppId] = useState("");

  const fallback = [];
  const { data: suppliers = fallback } = useQuery({
    queryKey: [queryKeys.suppliers, suppId],
    queryFn: () => getAllSuppliers(suppId),
  });

  return { suppliers, setSuppId };
}
