import styles from "./styles.module.scss";
import MainSwiper from "./mainSwiper";
import Offers from "./offers";
import { useSession } from "next-auth/react";
import Menu from "./menu";
import User from "./user";
import Header from "./header";

export default function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Header />
      </div>

      <Menu />

      <MainSwiper />

      <Offers />

      <User />
    </div>
  );
}
