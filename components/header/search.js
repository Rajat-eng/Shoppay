import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { RiSearch2Line } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState } from "react";

const Search = ({searchHandler}) => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search||"");

  const handleSubmit = (e) => {
    e.preventDefault();
    if(router.pathname!=='/browse'){
      //home page
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    }else{
      // browse page
      searchHandler(query)
    }
    
  };
  return (
    <div className={styles.main}>
      <div className={styles.mainContainer}>
        <Link href="/">
          <Image src="/logo.png" width={400} height={40} alt="logo" />
        </Link>

        <form onSubmit={(e) => handleSubmit(e)} className={styles.search}>
          <input
            type="text"
            name="search"
            placeholder="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className={styles.search__icon}>
            <RiSearch2Line />
          </button>
        </form>

        <Link href="/cart">
          <FiShoppingCart />
          <span>4</span>
        </Link>
      </div>
    </div>
  );
};

export default Search;
