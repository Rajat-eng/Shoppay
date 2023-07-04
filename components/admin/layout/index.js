import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import styles from "./styles.module.scss";

export default function Layout({ children }) {
  
  const [show,setShow]=useState(true)

  return (
    <div className={styles.layout}>
      {/* <DialogModal /> */}
      <Sidebar show={show} setShow={setShow} />
      <div
        style={{ marginLeft: `${show ? "280px" : "80px"}` }}
        className={styles.layout__main}
      >
        {children}
      </div>
    </div>
  );
}
