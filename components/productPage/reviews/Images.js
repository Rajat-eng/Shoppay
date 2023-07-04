import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import { MdOutlineRemoveCircle } from "react-icons/md";
import styles from "./styles.module.scss";

export default function Images({ images, setImages }) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (images.length > 3) {
      setError("Images cannot Exceed 3");
    } else {
      setError("");
    }
  }, [images]);

  const handleImages = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (images.length + files.length > 3) {
        setError("Total images cannot exceed 3");
        return;
      }
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
          }
        } else {
          setError("Invalid file format or size");
        }
      }
      
    },
    [images, setImages]
  );

  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
  };

  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={(e) => handleImages(e)}
        multiple
        accept="image/png,image/jpeg,image/webp"
      />
      <button
        className={styles.login_btn}
        style={{ width: "150px" }}
        onClick={() => inputRef.current.click()}
      >
        Add images
      </button>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.imgs_wrap}>
        {images.length > 0 &&
          images.map((img, i) => (
            <span key={i}>
              <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
              <img src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  );
}
