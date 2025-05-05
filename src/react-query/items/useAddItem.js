import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addItem(data) {
  await fetch(queryKeys.items, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddItem(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addItem(data),
    onSuccess: () => {
      Toast({
        title: "New Item being added!",
        status: "success",
        customId: "itemAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Item Add Error!",
        status: "warning",
        customId: "itemAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("items");
    },
  });

  return mutate;
}
