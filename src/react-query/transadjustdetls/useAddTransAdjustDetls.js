import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addTransAdjustDetls(data) {
  await fetch(queryKeys.tranadjustdetls, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTransAdjustDetls(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addTransAdjustDetls(data),
    onSuccess: () => {
      Toast({
        title: "New Transaction Adjustment details being added!",
        status: "success",
        customId: "tranadjdetlAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction adjustment details Add Error!",
        status: "warning",
        customId: "tranadjustdetlAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("tranadjustdetls");
    },
  });

  return mutate;
}
