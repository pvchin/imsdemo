import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteTransAdjust(id) {
  await fetch(queryKeys.tranadjust, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTransadjust(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteTransAdjust(data),
    onSuccess: () => {
      Toast({
        title: "Transaction adjustment being deleted!",
        status: "warning",
        customId: "tranadjdel",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction adjustment Delete Error!",
        status: "warning",
        customId: "tranadjdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("tranadjust");
    },
  });

  return mutate;
}
