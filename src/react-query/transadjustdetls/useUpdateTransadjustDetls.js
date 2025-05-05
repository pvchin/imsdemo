import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateTransadjustDetls(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.tranadjustdetls, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTransadjustDetls(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateTransadjustDetls(data),
    onSuccess: () => {
      Toast({
        title: "Transaction adjustment details being updated!",
        status: "success",
        customId: "tranadjdetlupd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction adjustment details Update Error! ",
        status: "warning",
        customId: "tranadjdetlupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("tranadjustdetls");
    },
  });

  return mutate;
}
