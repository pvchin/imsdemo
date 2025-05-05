import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addTran(data) {
  await fetch(queryKeys.transactions, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTran(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addTran(data),
    onSuccess: () => {
      Toast({
        title: "New Transaction being added!",
        status: "success",
        customId: "tranAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction Add Error!",
        status: "warning",
        customId: "tranAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transactions");
    },
  });

  return mutate;
}
