import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addItemshistory(data) {
  await fetch(queryKeys.itemshistory, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddItemsHistory(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addItemshistory(data),
    onSuccess: () => {
      Toast({
        title: "New Item history being added!",
        status: "success",
        customId: "itemhistAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Item History Add Error!",
        status: "warning",
        customId: "itemhistAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemshistory");
    },
  });

  return mutate;
}
