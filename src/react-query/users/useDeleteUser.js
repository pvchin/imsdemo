import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteUser(id) {
  await fetch(queryKeys.users, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteUser(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteUser(data),
    onSuccess: () => {
      Toast({
        title: "User being deleted!",
        status: "warning",
        customId: "userdel",
      });
    },
    onError: () => {
      Toast({
        title: "User Delete Error!",
        status: "warning",
        customId: "userdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return mutate;
}
