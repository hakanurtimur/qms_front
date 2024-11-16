import PageHeader from "@/components/ui/pageHeader";
import * as React from "react";
import ProfileDashboard from "@/components/ui/profile/profile-dashboard";

const Page = () => {
  return (
    <div className="space-y-12">
      <PageHeader
        title={"Profil"}
        variant={"dark"}
        description={"Profil bilgilerinizi buradan düzenleyebilirsiniz."}
      />
      <ProfileDashboard />
    </div>
  );
};

export default Page;
