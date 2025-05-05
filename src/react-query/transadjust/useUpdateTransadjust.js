import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateTransAdjust(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.tranadjust, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTransadjust(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateTransAdjust(data),
    onSuccess: () => {
      Toast({
        title: "Transaction adjustment being updated!",
        status: "success",
        customId: "tranadjupd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction adjustment Update Error! ",
        status: "warning",
        customId: "tranadjupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("tranadjust");
    },
  });

  return mutate;
}
