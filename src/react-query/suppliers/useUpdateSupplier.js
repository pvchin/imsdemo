import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateSupplier(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.suppliers, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateSupplier(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateSupplier(data),
    onSuccess: () => {
      Toast({
        title: "Supplier being updated!",
        status: "success",
        customId: "suppupd",
      });
    },
    onError: () => {
      Toast({
        title: "Supplier Update Error! ",
        status: "warning",
        customId: "suppupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("suppliers");
    },
  });

  return mutate;
}
