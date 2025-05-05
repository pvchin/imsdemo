import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addItemExpiry(data) {
  await fetch(queryKeys.itemsexpiry, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddItemExpiry(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addItemExpiry(data),
    onSuccess: () => {
      Toast({
        title: "New Expiry Item being added!",
        status: "success",
        customId: "itemexpAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Item Expiry Add Error!",
        status: "warning",
        customId: "itemexpAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("itemsexpiry");
    },
  });

  return mutate;
}
