import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteCustomer(id) {
  await fetch(queryKeys.customers, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteCustomer(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteCustomer(data),
    onSuccess: () => {
      Toast({
        title: "Customer being deleted!",
        status: "warning",
        customId: "custdel",
      });
    },
    onError: () => {
      Toast({
        title: "Customer Delete Error!",
        status: "warning",
        customId: "custdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("customers");
    },
  });

  return mutate;
}
