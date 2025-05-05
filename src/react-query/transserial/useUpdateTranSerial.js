import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateTranSerial(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.transserial, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTranSerial(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateTranSerial(data),
    onSuccess: () => {
      Toast({
        title: "Transaction serial being updated!",
        status: "success",
        customId: "transerialupd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction serial Update Error! ",
        status: "warning",
        customId: "transerialupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transserial");
    },
  });

  return mutate;
}
