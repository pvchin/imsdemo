import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteTranDetls(id) {
  await fetch(queryKeys.transdetls, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTranDetls(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteTranDetls(data),
    onSuccess: () => {
      Toast({
        title: "Transaction details being deleted!",
        status: "warning",
        customId: "trandetldel",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction Details Delete Error!",
        status: "warning",
        customId: "trandetldelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transdetls");
    },
  });

  return mutate;
}
