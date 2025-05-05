import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteTranLot(id) {
  await fetch(queryKeys.translots, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTranLot(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteTranLot(data),
    onSuccess: () => {
      Toast({
        title: "Transaction lot being deleted!",
        status: "warning",
        customId: "tranlotdel",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction lot Delete Error!",
        status: "warning",
        customId: "tranlotdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("translots");
    },
  });

  return mutate;
}
