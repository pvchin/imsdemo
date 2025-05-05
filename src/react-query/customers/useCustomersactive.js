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

async function getCustomersActive() {
  const { allCustomersActive } = await graphQLClient.request(gql`
    query {
      allCustomersActive {
        c_custid
        c_custno
        c_cust
        c_add1
        c_add2
        c_add3
        c_tel1
        c_tel2
        c_fax
        c_email
        c_crlimit
        c_terms
        c_contact
        c_post
        c_branch
        c_glcode
        c_category
        c_actype
        c_area
        c_prino
        c_messno
        c_lastbal
        c_yearbal
        c_mthbal
        c_currbal
        c_lsdate
        c_lpdate
        c_lsamt
        c_lpamt
        c_balcur
        c_bal30
        c_bal60
        c_bal90
        c_mtdrept
        c_bfbal
        c_totbal
        c_inactive
      }
    }
  `);
  return allCustomersActive;
}

export function useCustomersActive() {
  const [custactiveId, setCustActiveId] = useState('');

  const fallback = [];
  const { data: customersactive = fallback } = useQuery({
    queryKey: [queryKeys.customersactive, custactiveId],
    queryFn: () => getCustomersActive(),
  });

  return { customersactive, setCustActiveId };
}
