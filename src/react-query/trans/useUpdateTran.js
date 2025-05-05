import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateTran(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.transactions, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTran(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateTran(data),
    onSuccess: () => {
      Toast({
        title: "Transaction being updated!",
        status: "success",
        customId: "tranupd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction Update Error! ",
        status: "warning",
        customId: "tranupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return mutate;
}
