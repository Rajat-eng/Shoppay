import Link from "next/link";
import styles from "./styles.module.scss";
import { HiLocationMarker } from "react-icons/hi";


const Copyright=({country})=> {
  const data = [
    {
      name: "Privacy Center",
      link: "",
    },
    {
      name: "Privacy & Cookie Policy",
      link: "",
    },
    {
      name: "Manage Cookies",
      link: "",
    },
    {
      name: "Terms & Conditions",
      link: "",
    },
    {
      name: "Copyright Notice",
      link: "",
    },
  ];
  return (
    <div className={styles.footer__copyright}>
      <section>©2022 SHOPPAY All Rights Resereved.</section>
      <section>
        <ul>
          {data.map((link,index) => (
            <li key={index}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))} 
        </ul>
        <div>
            <a>
              <HiLocationMarker /> 
              {country?.name}
            </a>
        </div>
      </section>
    </div>
  );
}

export default Copyright;