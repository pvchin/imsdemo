import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateItemsHistory(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.itemshistory, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateItemsHistory(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateItemsHistory(data),
    onSuccess: () => {
      Toast({
        title: "Item history being updated!",
        status: "success",
        customId: "itemhistupd",
      });
    },
    onError: () => {
      Toast({
        title: "Item History Update Error! ",
        status: "warning",
        customId: "itemhistupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemshistory");
    },
  });

  return mutate;
}
