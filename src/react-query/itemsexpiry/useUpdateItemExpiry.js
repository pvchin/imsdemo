import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateItemExpiry(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.itemsexpiry, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateItemExpiry(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateItemExpiry(data),
    onSuccess: () => {
      Toast({
        title: "Expiry Item being updated!",
        status: "success",
        customId: "itemexpupd",
      });
    },
    onError: () => {
      Toast({
        title: "Expiry Item Update Error! ",
        status: "warning",
        customId: "itemexpupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemsexpiry");
    },
  });

  return mutate;
}
