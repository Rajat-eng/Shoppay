import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { FaStaylinked } from "react-icons/fa";
import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/DialogSlice";
import styles from "./styles.module.scss";
import { GiExtractionOrb } from "react-icons/gi";
export default function Images({
  images,
  setImages,
  header,
  text,
  setColorImage,
  ...props
}) {
  const fileInput = useRef(null);
  const [field, meta] = useField(props);
  // console.log("Image",field)
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (allowedFormats.includes(file.type) && file.size <= maxSize) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          setImages((prevImages) => {
            const newImages = [...prevImages, event.target.result];
            return newImages;
          });
        };
      } else {
        window.alert("Invalid file size of format");
      }
    }
  };

  const handleRemove = (image) => {
    setImages((images) => images.filter((item) => item !== image));
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/warning.png" alt="" />}
          {header}
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error__msg}>
              <span></span>
              <ErrorMessage name={field.name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name={field.name}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImages}
      />
      <div className={styles.images__main}>
        <div
          className={`${styles.images__main_grid} ${
            images.length == 2
              ? styles.grid__two
              : images.length == 3
              ? styles.grid__three
              : images.length == 4
              ? styles.grid__foor
              : images.length == 5
              ? styles.grid__five
              : images.length == 6
              ? styles.grid__six
              : ""
          }`}
        >
          {!images.length ? (
            <img src="../../../images/no_image.png" alt="" />
          ) : (
            images.map((img, i) => (
              <div className={styles.images__main_grid_wrap} key={i}>
                <div className={styles.blur}></div>
                <img src={img} alt="" />
                <div className={styles.images__main_grid_actions}>
                  <button onClick={() => handleRemove(img)}>
                    <RiDeleteBin7Fill />
                  </button>
                  <button onClick={() => setColorImage(img)}>
                    <GiExtractionOrb />
                  </button>
                  <button>
                    <RiShape2Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <button
        type="reset"
        disabled={images.length == 6}
        style={{ opacity: `${images.length == 6 && "0.5"}` }}
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        {text}
      </button>
    </div>
  );
}
