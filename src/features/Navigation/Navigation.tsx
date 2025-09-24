import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.scss";

const Navigation: React.FC = () => {
  return (
    <nav className={s.nav}>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Главная
      </NavLink>
      <NavLink to="/students" className={({ isActive }) => (isActive ? "active" : "")}>
        Студенты
      </NavLink>
      <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")}>
        Пользователи
      </NavLink>
    </nav>
  );
};

export default Navigation;
