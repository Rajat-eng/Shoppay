import nc from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
const handler = nc().use(auth);

handler.put(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    let user = await User.findOneAndUpdate(
      {_id:req.user},
      {
        $set:{
          "address.$[element].active":true
        },
      },
      {
        arrayFilters:[ {"element._id":{$eq:id}} ]
      },
      {
        new:true
      }
    );

    db.disconnectDb();
    return res.status(200).json({ addresses:user.address });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    db.connectDb();
    const { id } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user,
      {
        $pull: { address: { _id: id } },
      },
      { new: true }
    );
    db.disconnectDb();
    res.json({ addresses: user.address.filter((a) => a._id != id) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
