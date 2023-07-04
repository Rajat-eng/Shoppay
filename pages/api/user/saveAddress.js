import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    db.connectDb();
    const { address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,{
      $push:{
        address:address
      }
    },{
      new:true
    });
    db.disconnectDb();
    return res.status(200).json({ addresses: user.address });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
