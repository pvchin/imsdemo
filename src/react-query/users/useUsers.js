import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllUsers(userId) {
  if (userId) {
    const { data } = await axios.get(`${queryKeys.users}?fv=${userId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.users}`);
    return data;
  }
}

export function useUsers() {
  const [userId, setUserId] = useState("");

  const fallback = [];
  const { data: users = fallback } = useQuery({
    queryKey: [queryKeys.users, userId],
    queryFn: () => getAllUsers(userId),
  });

  return { users, setUserId };
}
