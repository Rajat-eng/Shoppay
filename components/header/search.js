import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { RiSearch2Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";

const search = () => {
  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <Link href="/">
          <Image src='/logo.png' width={400} height={40} />
        </Link>

        <div className={styles.search}>
          <input type="text" placeholder="search" />
          <RiSearch2Line />
        </div>

        <Link href="/cart">
          <FiShoppingCart />
          <span>4</span>
        </Link>
      </div>
    </div>
  );
};

export default search;
