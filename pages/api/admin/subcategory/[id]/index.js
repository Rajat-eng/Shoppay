import nc from "next-connect";
import admin from '../../../../../middleware/admin'
import auth from '../../../../../middleware/auth'
import db from '../../../../../utils/db';
import SubCategory from '../../../../../models/SubCategory';
import slugify from "slugify";


const handler=nc().use(auth).use(admin)


handler.delete(async (req, res) => {
    try {
      const { id } = req.query;
      db.connectDb();
      await SubCategory.findByIdAndDelete(id);
      const subCategories=await SubCategory.find({}).sort({ updatedAt: -1 })
      return res.status(200).json({
        message: "Category has been deleted successfuly",
        subCategories
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }finally{
      db.disconnectDb();
    }
  });
handler.put(async (req, res) => {
    try {  
      const { name,parent } = req.body;
      const {id}=req.query;
      console.log(id)
      db.connectDb();
      await SubCategory.findByIdAndUpdate(id, { name,parent,slug:slugify(name)});
      return res.status(200).json({
        message: "Category has been updated successfuly",
         subCategories: await SubCategory.find({}).sort({ createdAt: -1 }),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }finally{
        db.disconnectDb();
      }
});



  export default handler