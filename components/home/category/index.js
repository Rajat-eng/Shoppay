import { BsArrowRightCircle } from "react-icons/bs";
import styles from "./styles.module.scss";
import Image from "next/image";

export default function Category({ header, products, background }) {
  return (
    <div className={styles.category} style={{ background: `${background}` }}>
      <div className={styles.category__header}>
        <h1>{header}</h1>
        <BsArrowRightCircle />
      </div>
      <div className={styles.category__products}>
        {products.length > 0 &&
          products.map((product, index) => {
            return (
              <div className={styles.product} key={index}>
                <Image src={product.image} alt="" height={200} width={200}  />
              </div>
            );
          })}
      </div>
    </div>
  );
}
