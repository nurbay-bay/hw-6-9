import type { ReactNode } from "react";
import s from "./MainLayoute.module.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface Props {
  children: ReactNode;
}

function MainLayout({ children }: Props) {
  return (
    <div className={s.layout}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
