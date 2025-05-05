import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateItemSerial(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.itemsserial, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateItemSerial(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateItemSerial(data),
    onSuccess: () => {
      Toast({
        title: "Serial Item being updated!",
        status: "success",
        customId: "itemserialupd",
      });
    },
    onError: () => {
      Toast({
        title: "Serial Item Update Error! ",
        status: "warning",
        customId: "itemserialupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemsserial");
    },
  });

  return mutate;
}
