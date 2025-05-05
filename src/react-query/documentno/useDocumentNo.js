import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getDocumentno(Id) {
  if (Id) {
    const { data } = await axios.get(`${queryKeys.documentno}?fv=${Id}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.documentno}`);
    return data;
  }
}

export function useDocumentNo() {
  const [docId, setDocId] = useState("");

  const fallback = [];
  const { data: documentno = fallback } = useQuery({
    queryKey: [queryKeys.documentno, docId],
    queryFn: () => getDocumentno(docId),
  });

  return { documentno, setDocId };
}
