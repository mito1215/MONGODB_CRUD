import { User } from "../models/user.model.js";

export const getProfile = async (req, res) => {
    const {userId} = req;

    const foundUser = await User.findOne({_id: userId});

    const newUser = {
        name: foundUser.name,
        email: foundUser.email
    };

    res.status(200).json({ok: true, newUser});

}
