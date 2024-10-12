import dashboardItems from "@/constants/dashboardItems";
import GridCard from "@/components/ui/gridCard";

const Page = () => {
  return (
    <>
      {dashboardItems.map((item) => (
        <GridCard
          key={item.title}
          title={item.title}
          description={item.description}
          className={"min-w-52 max-w-52"}
        />
      ))}
    </>
  );
};

export default Page;
