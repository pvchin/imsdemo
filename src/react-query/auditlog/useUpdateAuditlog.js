import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateAuditlog(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.auditlog, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateAuditlog(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateAuditlog(data),
    onSuccess: () => {
      Toast({
        title: "Auditlog being updated!",
        status: "success",
        customId: "auditupd",
      });
    },
    onError: () => {
      Toast({
        title: "Auditlog Update Error! ",
        status: "warning",
        customId: "auditupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("auditlog");
    },
  });

  return mutate;
}
