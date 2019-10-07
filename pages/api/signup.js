import connectDb from '../../utils/connectDb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import User from '../../models/User';
import Cart from '../../models/Cart';

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1) Validate name/email/password

    if (!isLength(name, { min: 3, max: 10 })) {
      return res
        .status(422)
        .send('Name must be 3-10 characters long.');
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send('Password must be atleast 6 characters long.');
    } else if (!isEmail(email)) {
      return res.status(422).send('E-mail must be valid.');
    }

    //2) Check to see if the user already exists in the db
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(422)
        .send(`User already exists with email ${email}`);
    }
    //3) -- if not, hash their password
    const hash = await bcrypt.hash(password, 10);
    //4) Create user
    const newUser = await new User({
      name,
      email,
      password: hash,
    }).save();

    console.log({ newUser });

    //Create cart for newly created user
    await new Cart({ user: newUser._id }).save();

    //5) Create token for the new user

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d',
      },
    );
    res.status(201).json(token);
  } catch (error) {
    console.log('Oops, there was an error.', error);
    res.status(500).send('Oops, there was an error.' + error);
  }
};
