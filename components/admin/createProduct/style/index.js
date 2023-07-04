import { ErrorMessage, useField } from "formik";
import { useRef } from "react";
import { FaStaylinked } from "react-icons/fa";
import { RiDeleteBin7Fill, RiShape2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { showDialog } from "../../../../store/DialogSlice";
import styles from "./styles.module.scss";
import { GiExtractionOrb } from "react-icons/gi";

export default function Style({
  product,
  setProduct,
  colorImage,
  ...props
}) {
  const [field,meta] = useField(props);
  // console.log("meta",meta)
  // console.log("field",field)
  const fileInput=useRef();

  const handleImage = (e) => {
      const file = e.target.files[0]; 
      const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
      const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
      if (allowedFormats.includes(file.type) && file.size <= maxSize) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (event) => {
            let obj={
              color:"#045b62",
              image:event.target.result
            }
            setProduct({
              ...product,
              color:obj
            })
          }
      } else {
          // setError("Invalid file format or size");
      } 
  }

  // const removeImage = (image) => {
  //   setImages((images) => images.filter((img) => img !== image));
  // };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header__error : ""}`}
      >
        <div className={styles.flex}>
          Pick a Product style image
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
        name="colorImageInput"
        ref={fileInput}
        hidden
        accept="image/jpeg,image/png,image/webp"
        onChange={handleImage}
      />

      <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn__primary}`}
      >
        Pick Style
      </button>
    </div>
  );
}
