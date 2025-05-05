import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function deleteAuditlog(id) {
  await fetch(queryKeys.auditlog, {
    method: "DELETE",
    body: JSON.stringify({ id: id }),
  });
}

export function useDeleteAuditlog(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => deleteAuditlog(data),
    onSuccess: () => {
      Toast({
        title: "Auditlog being deleted!",
        status: "warning",
        customId: "auditdel",
      });
    },
    onError: () => {
      Toast({
        title: "Auditlog Delete Error!",
        status: "warning",
        customId: "auditdelErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("auditlog");
    },
  });

  return mutate;
}
