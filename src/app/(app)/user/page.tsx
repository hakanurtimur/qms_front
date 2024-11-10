import dashboardItems from "@/constants/dashboardItems";
import GridCard from "@/components/ui/gridCard";

const Page = () => {
  return (
    <div
      className={`animate-slide-in-from-left grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 transition-all duration-500`}
    >
      {dashboardItems.map((item) => (
        <GridCard
          key={item.title}
          title={item.title}
          description={item.description}
          className={"min-w-52 max-w-52"}
        />
      ))}
    </div>
  );
};

export default Page;
