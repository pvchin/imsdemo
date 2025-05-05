import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addTransadjust(data) {
  await fetch(queryKeys.tranadjust, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTransadjust(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addTransadjust(data),
    onSuccess: () => {
      Toast({
        title: "New Transaction Adjustment being added!",
        status: "success",
        customId: "tranadjAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction adjustment Add Error!",
        status: "warning",
        customId: "tranadjustAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("tranadjust");
    },
  });

  return mutate;
}
