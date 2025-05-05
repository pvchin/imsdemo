import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateUser(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.users, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateUser(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateUser(data),
    onSuccess: () => {
      Toast({
        title: "User being updated!",
        status: "success",
        customId: "userupd",
      });
    },
    onError: () => {
      Toast({
        title: "User Update Error! ",
        status: "warning",
        customId: "userupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return mutate;
}
