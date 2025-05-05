import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteItem(id) {
  await fetch(queryKeys.items, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteItem(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteItem(data),
    onSuccess: () => {
      Toast({
        title: "Item being deleted!",
        status: "warning",
        customId: "itemdel",
      });
    },
    onError: () => {
      Toast({
        title: "Item Delete Error!",
        status: "warning",
        customId: "itemdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("items");
    },
  });

  return mutate;
}
