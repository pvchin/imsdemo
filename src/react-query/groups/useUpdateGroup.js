import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateGroup(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.groups, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateGroup(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateGroup(data),
    onSuccess: () => {
      Toast({
        title: "Group being updated!",
        status: "success",
        customId: "groupupd",
      });
    },
    onError: () => {
      Toast({
        title: "Group Update Error! ",
        status: "warning",
        customId: "groupupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  return mutate;
}
