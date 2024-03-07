interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header = ({title, subtitle}: HeaderProps) => {
  return (
    // <header className="w-full h-[200px] md:h-[280px] flex-start flex-col bg-[#faead6] smallround md:round">
    <header className="w-full h-[130px] flex-start flex-col bg-[#faead6] smallround md:round">

      {/* <div className="max-container w-full mt-16 text-center md:text-start"> */}
      <div className="max-container w-full mt-8 text-center md:text-start">
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
        <h3 className="mt-3 text-sm font-semibold text-neutral-500">{subtitle}</h3>
      </div>
    </header>
  );
};

export default Header;
