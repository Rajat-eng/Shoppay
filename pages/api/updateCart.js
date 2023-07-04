// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from "next-connect";
import Product from "../../models/Product";
import Cart from "../../models/Cart";
import db from "../../utils/db";
// import auth from "../../middleware/auth";

const handler=nc();

handler.post(async(req, res)=>{
  try {
    const promises=req.body.products.map(async(p)=>{
      let dbProduct = await Product.findById(p._id).lean();
      let originalPrice=dbProduct.subProducts[p.style].sizes.find(x=>x.size===p.size).price
      let quantity=dbProduct.subProducts[p.style].sizes.find(x=>x.size===p.size).quantity
      let discount=dbProduct.subProducts[p.style].discount
      return {
        ...p,
        style:p.style,
        priceBefore:originalPrice,
        price:discount>0?originalPrice-originalPrice/discount:originalPrice,
        discount,
        quantity,
        shippingFee:dbProduct.shipping
      }
    })
    const data=await Promise.all(promises)
    return res.status(200).json({
      success:true,
      data
    })
  } catch (error) {
    console.log("error update cart",error)
  }
}) 

export default handler
 

