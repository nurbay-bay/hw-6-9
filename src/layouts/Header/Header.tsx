import Navigation from "../../features/Navigation/Navigation";
import s from "./Header.module.scss";

function Header() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}

export default Header;
