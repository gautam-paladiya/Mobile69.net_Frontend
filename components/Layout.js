import HeaderComponent from "./header";
export default function ({
  children,
  title = `${process.env.NAME_SPACE}`,
  canonical = "",
}) {
  return (
    <div className="layout-parent">
      <HeaderComponent />
      {children}
    </div>
  );
}
