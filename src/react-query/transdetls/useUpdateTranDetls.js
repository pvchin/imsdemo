import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateTranDetls(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.transdetls, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTranDetls(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateTranDetls(data),
    onSuccess: () => {
      Toast({
        title: "Transaction details being updated!",
        status: "success",
        customId: "trandetlupd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction Details Update Error! ",
        status: "warning",
        customId: "trandetlupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transdetls");
    },
  });

  return mutate;
}
