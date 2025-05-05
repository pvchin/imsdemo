import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addCustomer(data) {
  await fetch(queryKeys.customers, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddCustomer(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addCustomer(data),
    onSuccess: () => {
      Toast({
        title: "New Customer being added!",
        status: "success",
        customId: "custAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Customer Add Error!",
        status: "warning",
        customId: "custAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("customers");
    },
  });

  return mutate;
}
