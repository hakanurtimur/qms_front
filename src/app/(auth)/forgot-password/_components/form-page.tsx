import Logo from "@/components/ui/Logo";
import CagriButon from "@/components/ui/cagriButon";

interface Props {
  children: React.ReactNode;
}

const FormPage = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-2 w-full h-screen bg-primary-50">
      <div className="md:col-span-1 md:pb-0 py-5 md:px-0 px-5  col-span-2 flex flex-col items-center justify-center gap-8 animate-slide-in-from-left relative">
        <div className="md:absolute top-5 left-5 mt-5 md:mt-0">
          <Logo />
        </div>
        <div className="md:absolute bottom-5 left-5">
          <CagriButon />
        </div>
        {children}
      </div>
      <div className="md:col-span-1 md:pb-0 md:px-0 px-5 py-5 col-span-2  flex flex-col gap-4 items-center bg-gradient-to-b from-slate-700 to-slate-900 relative"></div>
    </div>
  );
};

export default FormPage;
