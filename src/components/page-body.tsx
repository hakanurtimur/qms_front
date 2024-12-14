interface Props {
  children: React.ReactNode;
}
const PageBody = ({ children }: Props) => {
  return (
    <div className="w-full h-full flex flex-col space-y-10">{children}</div>
  );
};

export default PageBody;
