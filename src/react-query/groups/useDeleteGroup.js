import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteGroup(id) {
  await fetch(queryKeys.groups, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteGroup(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteGroup(data),
    onSuccess: () => {
      Toast({
        title: "Group being deleted!",
        status: "warning",
        customId: "groupdel",
      });
    },
    onError: () => {
      Toast({
        title: "Group Delete Error!",
        status: "warning",
        customId: "groupdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  return mutate;
}
