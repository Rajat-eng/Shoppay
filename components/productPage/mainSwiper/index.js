import styles from "./styles.module.scss";
import Image from "next/image";
import { useState } from "react";

export default function MainSwiper({ images }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.swiper}>
      <div className={styles.swiper__active}>
        <Image
          src={images[active].url}
          fill={true}
          alt="product-image"
        />
      </div>
      <div className={styles.swiper__list}>
        {images.map((img, i) => (
          <div
            className={`${styles.swiper__list__item} ${
              i == active && styles.active
            }`}
            key={i}
            onMouseOver={() => setActive(i)}
          >
            <Image src={img.url} alt="" fill={true} />
          </div>   
        ))}
      </div>
    </div>
  );
}
