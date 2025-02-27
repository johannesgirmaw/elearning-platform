import Navbar from "../navbar/Navbar";

function Header(props: any) {
  const { title, activeTab, underlined = "Form" } = props;
  return (
    <>
      <div className="relative top-0 left-0 w-full z-50">
        {/* <Advert /> */}
        <Navbar />
      </div>
    </>
  );
}

export default Header;
