import { useMutation } from "@tanstack/react-query";
import documentsGeneralService from "@/services/user/documents/DocumentsGeneralService";

interface UseGetFileProps {
  handleShow: () => void;
  key: string[];
}

const useGetFile = ({ handleShow, key }: UseGetFileProps) => {
  const getFileMutation = useMutation({
    mutationKey: key,
    mutationFn: (fileId: string) => documentsGeneralService.getFile(fileId),
    onSuccess: (data) => {
      const regex = /\.(xls|xlsx|csv)$/i;
      const fileUrl = data.data.url;
      if (fileUrl && regex.test(fileUrl)) {
        window.open(fileUrl);
        return;
      }
      handleShow();
    },
  });

  return {
    fileUrl: getFileMutation.data?.data.url,
    fileName: getFileMutation.data?.data.fileName,
    getFileMutation,
  };
};

export default useGetFile;
