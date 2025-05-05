import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function addAuditlog(data) {
  await fetch(queryKeys.auditlog, {
    method: "POST",
    body: JSON.stringify({ ...data }),
  });
}

export function useAddAuditlog(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => addAuditlog(data),
    onSuccess: () => {
      Toast({
        title: "New Auditlog being added!",
        status: "success",
        customId: "auditAdd",
      });
    },
    onError: () => {
      Toast({
        title: "Auditlog Add Error!",
        status: "warning",
        customId: "auditAddErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("auditlog");
    },
  });

  return mutate;
}
