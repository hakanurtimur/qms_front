import Logo from "@/components/ui/Logo";
import LoadingSpinner from "@/components/ui/loading-spinner";

const LoadingScreen = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-12 items-center justify-center absolute top-0 left-0 bg-slate-50">
      <Logo />
      <LoadingSpinner className={"w-48 h-48"} />
    </div>
  );
};

export default LoadingScreen;
