import nc from "next-connect";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import auth from "../../../../middleware/auth";

const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const product = await Product.findById(req.query.id);
    const review = {
      reviewBy: req.user,
      rating: req.body.rating,
      review: req.body.review,
      size: req.body.size,
      fit: req.body.fit,
      style: req.body.style,
      images: req.body.images,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, r) => r.rating + a, 0) /
      product.reviews.length;
    await product.save();
    await product.populate("reviews.reviewBy");
    await db.disconnectDb();
    return res.status(200).json({ reviews: product.reviews.reverse() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
