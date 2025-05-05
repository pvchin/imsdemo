import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteSupplier(id) {
  await fetch(queryKeys.suppliers, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteSupplier(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteSupplier(data),
    onSuccess: () => {
      Toast({
        title: "Supplier being deleted!",
        status: "warning",
        customId: "suppdel",
      });
    },
    onError: () => {
      Toast({
        title: "Supplier Delete Error!",
        status: "warning",
        customId: "suppdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("suppliers");
    },
  });

  return mutate;
}
