import { useMutation } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

interface Props {
  handleShow: () => void;
  userId: string | undefined;
}

const useGetApprovedGarbageFile = ({ handleShow, userId }: Props) => {
  const getGarbageMutation = useMutation({
    mutationKey: ["get-approved-garbage"],
    mutationFn: (approved_garbage_id: string) =>
      documentsGeneralService.getApprovedGarbage(
        userId ?? "",
        approved_garbage_id,
      ),
    onSuccess: (data) => {
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.garbageURL;
      console.log(fileUrl);
      if (fileUrl && regex.test(fileUrl)) {
        window.open(fileUrl);
        return;
      }
      handleShow();
    },
  });

  return {
    garbageSrc: getGarbageMutation.data?.data.garbageURL,
    getGarbageMutation,
  };
};

export default useGetApprovedGarbageFile;
