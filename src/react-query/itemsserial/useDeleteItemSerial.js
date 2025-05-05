import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteItemSerial(id) {
  await fetch(queryKeys.itemsserial, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteItemSerial(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteItemSerial(data),
    onSuccess: () => {
      Toast({
        title: "Serial Item being deleted!",
        status: "warning",
        customId: "itemserialdel",
      });
    },
    onError: () => {
      Toast({
        title: "Serial Item Delete Error!",
        status: "warning",
        customId: "itemserialdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemsserial");
    },
  });

  return mutate;
}
