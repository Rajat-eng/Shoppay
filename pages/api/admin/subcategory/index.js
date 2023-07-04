import nc from "next-connect";
import db from "../../../../utils/db";
import SubCategory from "../../../../models/SubCategory";
import admin from "../../../../middleware/admin";
import auth from "../../../../middleware/auth";
import slugify from "slugify";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, Try a different name" });
    }
    await SubCategory.create({ name, parent, slug: slugify(name) });

    res.status(200).json({
      message: `SubCategory ${name} has been created successfully.`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    db.disconnectDb();
    res.status(500).json({ message: error.message });
  } finally {
    db.disconnectDb();
  }
});

handler.get(async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.json([]);
    }
    db.connectDb();
    const results = await SubCategory.find({ parent: category }).select("name");
    // console.log(results);
    return res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }finally{
      db.disconnectDb();
  }
});

export default handler;
