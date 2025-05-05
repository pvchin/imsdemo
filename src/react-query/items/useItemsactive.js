import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
//import { useQuery as useApolloQuery, useMutation } from "@apollo/react-hooks";
import { GraphQLClient, gql } from "graphql-request";
//import { gql } from "@apollo/client";
//import { employees_url } from "../../utils/constants";

import axios from "axios";
import { queryKeys } from "../constants";

const API_URL = process.env.REACT_APP_API_URL;
//const API_URL = `http://localhost:4000/graphql`;
//const API_URL = `http://192.168.0.107:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
});

async function getAllItemsActive() {
  const { allItemsActive } = await graphQLClient.request(gql`
    query {
      allItemsActive {
        item_id
        item_no
        item_group
        item_desp
        item_pack
        item_unit
        item_pfactor
        item_suppno
        item_supp
        item_minlvl
        item_qtyhand
        item_remark
        item_cat
        item_date
        item_brand
        item_dept
        item_wsp
        item_qq
        item_rsp
        item_cif
        item_duty
        item_fob
        item_bal
        item_comm
        item_storea
        item_storeb
        item_storef
        item_lsqty
        item_lsprice
        item_lsdate
        item_lpqty
        item_lpcost
        item_lpdate
        item_cost
        item_fc
        item_inf
        item_bc
        item_tf
        item_lc
        item_cnf
        item_tinqty
        item_tinamt
        item_toutqty
        item_toutamt
        item_phyqty
        item_phydate
        item_phystor
        item_mtdsqty
        item_mtdsamt
        item_mtdpqty
        item_mtdpamt
        item_lock
        item_nonstock
        item_qty
        item_inactive
      }
    }
  `);
  return allItemsActive;
}

async function getItem(itemno) {
  const { items } = await graphQLClient.request(
    gql`
      query getItem($itemno: String) {
        items(itemno: $itemno) {
          item_id
          item_no
          item_group
          item_desp
          item_pack
          item_unit
          item_pfactor
          item_suppno
          item_supp
          item_minlvl
          item_qtyhand
          item_remark
          item_cat
          item_date
          item_brand
          item_dept
          item_wsp
          item_qq
          item_rsp
          item_cif
          item_duty
          item_fob
          item_bal
          item_comm
          item_storea
          item_storeb
          item_storef
          item_lsqty
          item_lsprice
          item_lsdate
          item_lpqty
          item_lpcost
          item_lpdate
          item_extcost
          item_fc
          item_inf
          item_bc
          item_tf
          item_lc
          item_cnf
          item_tinqty
          item_tinamt
          item_toutqty
          item_toutamt
          item_phyqty
          item_phydate
          item_phystor
          item_mtdsqty
          item_mtdsamt
          item_mtdpqty
          item_mtdpamt
          item_lock
          item_nonstock
          item_qty
          item_inactive
        }
      }
    `,
    { itemno }
  );
  return items;
}

export function useItemsActive() {
  const [itemactiveId, setItemActiveId] = useState("");

  const fallback = [];
  const { data: itemsactive = fallback } = useQuery({
    queryKey: [queryKeys.itemsactive, itemactiveId],
    queryFn: () => (itemactiveId ? getItem(itemactiveId) : getAllItemsActive()),
  });

  return { itemsactive, setItemActiveId };
}
