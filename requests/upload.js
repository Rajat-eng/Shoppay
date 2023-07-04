import axios from "axios";
export const uploadImages = async (formData) => {
  try{
    // for(let pair of formData.entries()){
    //   console.log(pair[0],pair[1])
    // }
    const { data } = await axios.post('/api/cloudinary',formData,{
      headers:{
        'Content-Type':'multipart/form-data',
      }
    })
    return data;
  }catch(error){
    console.log(error)
    console.log("error in uploading images")
    return null;
  }
};
