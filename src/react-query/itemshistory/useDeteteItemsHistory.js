import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteItemsHistory(id) {
  await fetch(queryKeys.itemshistory, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteItemsHistory(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteItemsHistory(data),
    onSuccess: () => {
      Toast({
        title: "Item history being deleted!",
        status: "warning",
        customId: "itemhistdel",
      });
    },
    onError: () => {
      Toast({
        title: "Item History Delete Error!",
        status: "warning",
        customId: "itemhistdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemshistory");
    },
  });

  return mutate;
}
