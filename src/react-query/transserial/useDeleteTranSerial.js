import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteTranSerial(id) {
  await fetch(queryKeys.transserial, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTranSerial(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteTranSerial(data),
    onSuccess: () => {
      Toast({
        title: "Transaction serial being deleted!",
        status: "warning",
        customId: "transerialdel",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction serial Delete Error!",
        status: "warning",
        customId: "transerialdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transserial");
    },
  });

  return mutate;
}
