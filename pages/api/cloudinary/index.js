import nc from "next-connect";
import cloudinary from "cloudinary";
import multer from 'multer';
import DataURI from 'datauri';
import bodyParser from "body-parser";
import fs from "fs";
import fileUpload from "express-fileupload";
import { imgMiddleware } from "../../../middleware/imgMiddleware";
import { IoMegaphoneSharp } from "react-icons/io5";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const handler = nc()
  .use(
    fileUpload({
      useTempFiles: true,
    })
)

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(async (req, res) => {
  try {
    let images=[]
    let files=Object.values(req.files).flat()
    const {path}=req.body;
    for(const file of files){
       const img=await uploadToCloudinaryHandler(file,path)
       images.push(img)
    }
    return res.status(200).json({
        images,
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

const uploadToCloudinaryHandler = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
          public_url: res.public_id,
        });
      }
    );
  });
};

// handler.delete(async (req, res) => {
//   let image_id = req.body.public_id;
//   cloudinary.v2.uploader.destroy(image_id, (err, res) => {
//     if (err) return res.status(400).json({ success: false, err });
//     res.status(200).json({ success: true });
//   });
// });


export default handler;