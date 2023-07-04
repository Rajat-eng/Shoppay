import nc from "next-connect";
import admin from '../../../../../middleware/admin'
import auth from '../../../../../middleware/auth'
import db from '../../../../../utils/db';
import Category from '../../../../../models/Category';


const handler=nc().use(auth).use(admin)

handler.delete(async (req, res) => {
    try {
      const { id } = req.query;
      console.log(id)
      db.connectDb();
      await Category.findByIdAndDelete(id);
      const categories=await Category.find({}).sort({ updatedAt: -1 })
      return res.status(200).json({
        message: "Category has been deleted successfuly",
        categories
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }finally{
      db.disconnectDb();
    }
  });
  handler.put(async (req, res) => {
    try {
      const { id } = req.query;
      const {name}=req.body
      db.connectDb();
      await Category.findByIdAndUpdate(id, { name });
      return res.status(200).json({
        message: "Category has been updated successfuly",
        categories: await Category.find({}).sort({ createdAt: -1 }),
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }finally{
        db.disconnectDb();
      }
  });

  export default handler