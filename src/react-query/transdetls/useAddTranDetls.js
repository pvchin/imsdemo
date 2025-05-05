import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addTranDetls(data) {
  await fetch(queryKeys.transdetls, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTranDetls(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addTranDetls(data),
    onSuccess: () => {
      Toast({
        title: "New Transaction details being added!",
        status: "success",
        customId: "trandetlAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction details Add Error!",
        status: "warning",
        customId: "trandetlAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transdetls");
    },
  });

  return mutate;
}
