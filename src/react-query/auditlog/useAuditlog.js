import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
//import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { items_url } from "../constants";

import axios from "axios";
import { queryKeys } from "../constants";

async function getAllAuditlog(auditId) {
  if (auditId) {
    const { data } = await axios.get(`${queryKeys.auditlog}?fv=${auditId}`);
    return data;
  } else {
    const { data } = await axios.get(`${queryKeys.auditlog}`);
    return data;
  }
}

export function useAuditlog() {
  const [auditlogId, setAuditLogId] = useState("");

  const fallback = [];
  const { data: auditlog = fallback } = useQuery({
    queryKey: [queryKeys.auditlog, auditlogId],
    queryFn: () => getAllAuditlog(auditlogId),
  });

  return { auditlog, setAuditLogId };
}
