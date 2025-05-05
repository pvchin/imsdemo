import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addUser(data) {
  await fetch(queryKeys.users, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddUser(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addUser(data),
    onSuccess: () => {
      Toast({
        title: "New User being added!",
        status: "success",
        customId: "userAdd",
      });
    },
    onError: () => {
      Toast({
        title: "User Add Error!",
        status: "warning",
        customId: "userAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return mutate;
}
