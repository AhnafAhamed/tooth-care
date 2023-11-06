import { useState } from "react";
import {
  IconLogout,
  IconLayoutDashboard,
  IconReceipt,
} from "@tabler/icons-react";
import classes from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const data = [
  { link: "/", label: "dashboard", icon: IconLayoutDashboard },
  { link: "/appointments", label: "appointments", icon: IconReceipt },
];

export function Navbar() {
  const [active, setActive] = useState("dashboard");
  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
