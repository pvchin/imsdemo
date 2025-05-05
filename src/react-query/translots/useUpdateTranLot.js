import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateTranLot(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.translots, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateTranLot(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateTranLot(data),
    onSuccess: () => {
      Toast({
        title: "Transaction lot being updated!",
        status: "success",
        customId: "tranlotupd",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction lot Update Error! ",
        status: "warning",
        customId: "tranlotupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("translots");
    },
  });

  return mutate;
}
