import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteTransAdjustDetls(id) {
  await fetch(queryKeys.tranadjustdetls, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteTransAdjustDetls(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteTransAdjustDetls(data),
    onSuccess: () => {
      Toast({
        title: "Transaction adjustment details being deleted!",
        status: "warning",
        customId: "tranadjdetldel",
      });
    },
    onError: () => {
      Toast({
        title: "Transaction adjustment details Delete Error!",
        status: "warning",
        customId: "tranadjdetldelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("tranadjustdetls");
    },
  });

  return mutate;
}
