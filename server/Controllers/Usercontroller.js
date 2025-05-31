var User = require('../Models/Userschema');
const multer = require('multer');

// Multer Setup
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadimg = multer({ storage: storage }).single("profilepic");

// Register New User
const saveuser = async (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    
    try {
        console.log(req.body);
        let profilepic = req.file;

        // Check if email or mobile already exists
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        });

        if (existingUser) {
            if (existingUser.email === req.body.email) {
                return res.json({ message: "Email already registered" });
            } else if (existingUser.mobile === parseInt(req.body.mobile)) {
                return res.json({ message: "Mobile number already registered" });
            }
        }

        const u = new User({
            fullname: req.body.fullname,
            gender: req.body.gender,
            profilepic: req.file,
            mobile: req.body.mobile,
            email: req.body.email,
            district: req.body.district,
            city: req.body.city,
            pincode: req.body.pincode,
            password: req.body.password,
            confirmPass: req.body.confirmpassword,
isactive:true
        });

        await u.save();
        res.status(200).json({success:true, message: "Registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login
const loginvalidateuser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const result = await User.findOne({ email: email });

        if (!result) {
            res.json({ message: "User not found" });
        } else if (result.password !== password) {
            res.json({ message: "Wrong password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                data: result
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View one user by ID
const viewOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found" });
        } else {
            res.status(200).json(user);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all users
const viewAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    console.log(req.body);
    
  try {
    const id = req.params.id;
    const {
      fullname,
      gender,
      mobile,
      email,
      district,
      city,
      pincode,
      password
    } = req.body;

    // If profilepic is coming from multer (as file), get it from req.file
    const profilepic = req.file ? req.file.filename : undefined;

    // Prepare the update object
    const updateFields = {
      fullname,
      gender,
      mobile,
      email,
      district,
      city,
      pincode,
      password
    };

    if (profilepic) {
      updateFields.profilepic = profilepic;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Forgot Password
const forgotPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "Email not found" });
        }

        user.password = password;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    saveuser,
    uploadimg,
    loginvalidateuser,
    viewOneUser,
    viewAllUsers,
    updateUser,
    forgotPassword
};
