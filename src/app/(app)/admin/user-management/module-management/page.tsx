import PageHeader from "@/components/ui/pageHeader";

const Page = () => {
  return (
    <div className="w-full flex flex-col space-y-10">
      <PageHeader
        variant={"dark"}
        title={"Modül İşlemleri"}
        description={"Buradan modülleri yönetebilirsiniz."}
      />
    </div>
  );
};

export default Page;
