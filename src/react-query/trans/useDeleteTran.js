import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteTran(id) {
  await fetch(queryKeys.transactions, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTran(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteTran(data),
    onSuccess: () => {
      Toast({
        title: "Transaction being deleted!",
        status: "warning",
        customId: "trandel",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction Delete Error!",
        status: "warning",
        customId: "trandelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return mutate;
}
