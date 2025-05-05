import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addGroup(data) {
  await fetch(queryKeys.groups, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddGroup(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addGroup(data),
    onSuccess: () => {
      Toast({
        title: "New Group being added!",
        status: "success",
        customId: "groupAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Group Add Error!",
        status: "warning",
        customId: "groupAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("groups");
    },
  });

  return mutate;
}
