import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllGroups(Id) {
  if (Id) {
    const { data } = await axios.get(`${queryKeys.groups}?fv=${Id}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.groups}`);
    return data;
  }
}

export function useGroups() {
  const [groupId, setGroupId] = useState("");

  const fallback = [];
  const { data: groups = fallback } = useQuery({
    queryKey: [queryKeys.groups, groupId],
    queryFn: () => getAllGroups(groupId),
  });

  return { groups, setGroupId };
}
