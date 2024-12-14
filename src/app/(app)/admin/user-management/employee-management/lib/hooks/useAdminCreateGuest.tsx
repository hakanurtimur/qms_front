import { useMutation } from "@tanstack/react-query";
import employeeManagementService from "@/services/admin/EmployeeManagement";
import { GuestCreated } from "@/models/admin/employeeManagement/guest";

export const useAdminCreateGuest = (
  onSuccess: () => void,
  onError: () => void,
) => {
  return useMutation({
    mutationKey: ["add-guest"],
    mutationFn: (args: { userId: string; data: GuestCreated }) =>
      employeeManagementService.addGuest(args),
    onSuccess: onSuccess,
    onError: onError,
  });
};
