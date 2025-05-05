import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addTranSerial(data) {
  await fetch(queryKeys.transserial, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTranSerial(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addTranSerial(data),
    onSuccess: () => {
      Toast({
        title: "New Transaction serial being added!",
        status: "success",
        customId: "transerialAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction serial Add Error!",
        status: "warning",
        customId: "transerialAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("transserial");
    },
  });

  return mutate;
}
