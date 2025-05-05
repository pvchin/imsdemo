import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addTranLot(data) {
  await fetch(queryKeys.translots, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddTranLot(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addTranLot(data),
    onSuccess: () => {
      Toast({
        title: "New Transaction lot being added!",
        status: "success",
        customId: "tranlotAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction lot Add Error!",
        status: "warning",
        customId: "tranlotAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("translots");
    },
  });

  return mutate;
}
