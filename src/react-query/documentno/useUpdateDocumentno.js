import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { Toast } from "../../helpers/CustomToastify";

async function updateDocumentno(data) {
  const { id, ...fields } = data;

  await fetch(queryKeys.documentno, {
    method: "PUT",
    body: JSON.stringify({ id, ...fields }),
  });
}

export function useUpdateDocumentno(data) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data) => updateDocumentno(data),
    onSuccess: () => {
      Toast({
        title: "Document being updated!",
        status: "success",
        customId: "docupd",
      });
    },
    onError: () => {
      Toast({
        title: "Document Update Error! ",
        status: "warning",
        customId: "docupdErr",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries("documentno");
    },
  });

  return mutate;
}
