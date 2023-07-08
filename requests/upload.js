import axios from "axios";
export const uploadImages = async (formData) => {
  try{
    const { data } = await axios.post('/api/cloudinary',formData,{
      headers:{
        'Content-Type':'multipart/form-data',
      }
    })
    console.log("cloudinary",data)
    return data.images;
  }catch(error){
    console.log(error)
    console.log("error in uploading images")
    return null;
  }
};
