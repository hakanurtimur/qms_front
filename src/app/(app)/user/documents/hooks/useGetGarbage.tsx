import { useMutation } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

interface UseGetGarbageProps {
  handleShow: () => void;
  userId: string | undefined;
}

const useGetGarbage = ({ handleShow, userId }: UseGetGarbageProps) => {
  const getGarbageMutation = useMutation({
    mutationKey: ["get-garbage"],
    mutationFn: (garbageId: string) =>
      documentsGeneralService.getGarbage(garbageId, userId ?? ""),
    onSuccess: (data) => {
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.garbageURL;
      if (fileUrl && regex.test(fileUrl)) {
        window.open(fileUrl);
        return;
      }
      handleShow();
    },
  });

  return {
    garbageSrc: getGarbageMutation.data?.data.garbageURL,
    garbageFileName: getGarbageMutation.data?.data.fileName,
    getGarbageMutation,
  };
};

export default useGetGarbage;
