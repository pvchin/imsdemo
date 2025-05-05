import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateCustomer(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.customers, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateCustomer(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateCustomer(data),
    onSuccess: () => {
      Toast({
        title: "Customer being updated!",
        status: "success",
        customId: "custupd",
      });
    },
    onError: () => {
      Toast({
        title: "Customer Update Error! ",
        status: "warning",
        customId: "custupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("customers");
    },
  });

  return mutate;
}
