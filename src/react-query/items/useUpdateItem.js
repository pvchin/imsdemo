import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateItem(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.items, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateItem(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateItem(data),
    onSuccess: () => {
      Toast({
        title: "Item being updated!",
        status: "success",
        customId: "itemupd",
      });
    },
    onError: () => {
      Toast({
        title: "Item Update Error! ",
        status: "warning",
        customId: "itemupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("items");
    },
  });

  return mutate;
}
