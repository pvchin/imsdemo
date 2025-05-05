import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
import { GraphQLClient, gql } from 'graphql-request';
//import { gql } from "@apollo/client";
//import { employees_url } from "../../utils/constants";
import { filterById } from './utils';

import axios from 'axios';
import { queryKeys } from '../constants';

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = `http://localhost:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

async function getSuppliersActive() {
  const { allSuppliersActive } = await graphQLClient.request(gql`
    query {
      allSuppliersActive {
        s_suppid
        s_suppno
        s_supp
        s_add1
        s_add2
        s_add3
        s_tel1
        s_tel2
        s_fax
        s_email
        s_contact
        s_crlimit
        s_terms
        s_glcode
        s_prino
        s_messno
        s_actype
        s_lastbal
        s_yearbal
        s_mthbal
        s_currbal
        s_lcdate
        s_lpdate
        s_lcamt
        s_lpamt
        s_balcur
        s_bal30
        s_bal60
        s_bal90
        s_area
        s_pay
        s_bfbal
        s_totbal
        s_inactive
      }
    }
  `);
  return allSuppliersActive;
}

export function useSuppliersActive() {
  const [suppactiveId, setSuppActiveId] = useState('');

  const fallback = [];
  const { data: suppliersactive = fallback } = useQuery({
    queryKey: [queryKeys.suppliersactive, suppactiveId],
    queryFn: () => getSuppliersActive(),
  });

  return { suppliersactive, setSuppActiveId };
}
