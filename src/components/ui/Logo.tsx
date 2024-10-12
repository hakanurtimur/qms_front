const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={className + " font-semibold text-3xl text-primary-900"}>
      QMS
    </div>
  );
};

export default Logo;
