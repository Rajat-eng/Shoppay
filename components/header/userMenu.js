import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { signOut,signIn } from "next-auth/react";

const userMenu = ({loggedIn}) => {
  return (
    <div className={styles.menu}>
    {loggedIn ? 
    (
        <div className={styles.flex}>
            <Image
                  src={loggedIn.user.image}
                  alt="user"
                  width={50}
                  height={50}
                  style={{ borderRadius: 50 }}
            />
            <div className={styles.col}> 
                <span>Welcome</span>
                <h4>{loggedIn.user.name}</h4>
                <button className={styles.btn_primary} onClick={()=>signOut()}>Sign Out</button>
            </div>
        </div>
    ):
    (
        <div className={styles.flex}> 
            <button className={styles.btn_primary}>Register</button>
            <button className={styles.btn_secondary}onClick={()=>signIn()}>Login</button>
        </div>
    )}
    <ul>
        <li>
            <Link href="/Account">Account</Link>
        </li>

        <li>
            <Link href="/profile/orders">My Orders</Link>
        </li>

        <li>
            <Link href="/profile/messages">Messgae Center</Link>
        </li>

        <li>
            <Link href="/profile/address">Address</Link>
        </li>

        <li>
            <Link href="/profile/wishlist">Wishlist</Link>
        </li>
    </ul>
    </div>
  )
}

export default userMenu