interface Props {
  className?: string;
}

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={"font-semibold text-3xl text-primary-900 " + className}>
      QMS
    </div>
  );
};

export default Logo;
