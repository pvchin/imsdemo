import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addSupplier(data) {
  await fetch(queryKeys.suppliers, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddSupplier(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addSupplier(data),
    onSuccess: () => {
      Toast({
        title: "New Supplier being added!",
        status: "success",
        customId: "suppAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Supplier Add Error!",
        status: "warning",
        customId: "suppAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("suppliers");
    },
  });

  return mutate;
}
