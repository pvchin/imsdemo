import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteItemExpiry(id) {
  await fetch(queryKeys.itemsexpiry, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteItemExpiry(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteItemExpiry(data),
    onSuccess: () => {
      Toast({
        title: "Expiry Item being deleted!",
        status: "warning",
        customId: "itemexpdel",
      });
    },
    onError: () => {
      Toast({
        title: "Expiry Item Delete Error!",
        status: "warning",
        customId: "itemexpdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemsexpiry");
    },
  });

  return mutate;
}
