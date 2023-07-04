import styles from "./styles.module.scss";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { MdOutlineSecurity } from "react-icons/md";
import { BsSuitHeart } from "react-icons/bs";
import { RiAccountCircleLine, RiArrowDropDownFill } from "react-icons/ri";
import UserMenu from "./userMenu";
import { useSession } from "next-auth/react"

const Top = (props) => {
  const{country}=props
  // console.log(country)
  const { data: session } = useSession();
  const [visible,setVisible]=useState(false);
  return (
    <div className={styles.top}>
      <div className={styles.topContainer}>
        <div></div>
        <ul className={styles.topList}>
          <li>
            <Image
              src={country?.flag}
              alt="country"
              height={20}
              width={40}
            />
            <span>{country?.name}</span>
          </li>

          <li>
            <MdOutlineSecurity />
            <span>Buyer protection</span>
          </li>
          <li>
            <span>customer service</span>
          </li>
          <li>
            <span>Help</span>
          </li>
          <li>
            <BsSuitHeart />
            <Link href="/profile/wishlist">
              <span>wishlist</span>
            </Link>
          </li>
          <li onClick={(e)=>setVisible(!visible)}>
          {session ? (      
              <div className={styles.flex}>
                <Image
                  src={session?.user?.image}
                  alt="user"
                  width={30}
                  height={20}
                  style={{ borderRadius: 50 }}
                />
                <span>{session?.user?.name}</span>
                <RiArrowDropDownFill />  
              </div>   
          ) : (   
              <div className={styles.flex}>
                <RiAccountCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>      
          )}
          {visible && <UserMenu loggedIn={session} />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Top;
