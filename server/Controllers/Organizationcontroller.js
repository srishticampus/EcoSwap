const Organization = require('../Models/Organizationschema');
const multer = require('multer');

// Multer setup for uploading organization profilepic
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const uploadimg = multer({ storage: storage }).single('profilepic');

// Register Organization
const saveorg = async (req, res) => {
    try {
        const { organizationname, email, district, city, mobile, password, confirmPass } = req.body;

        // Check if organization already exists by email or phone number
        const existing = await Organization.findOne({
            $or: [{ email: email }, { mobile: mobile }],
        });

        if (existing) {
            return res.status(400).json({
                message: existing.email === email
                    ? 'Email already registered'
                    : 'Phone number already registered',
            });
        }

        const org = new Organization({
            organizationname,
            email,
            profilepic: req.file,
            mobile,
            password,
            confirmPass, district, city
        });

        await org.save();
        res.status(200).json({ message: 'Organization registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login validation
const loginvalidateorg = async (req, res) => {
    const { email, password } = req.body;

    try {
        const org = await Organization.findOne({ email: email });

        if (!org) {
            return res.json({ message: 'Organization not found' });
        }
        if (org.password !== password) {
            return res.json({ message: 'Wrong password' });
        }

        res.status(200).json({ success: true, message: 'Login successful', data: org });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all organizations
const viewAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find();
        res.status(200).json(organizations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View one organization by ID
const viewOneOrganization = async (req, res) => {
    try {
        const org = await Organization.findById(req.params.id);
        if (!org) {
            return res.status(404).json({ message: 'Organization not found' });
        }
        res.status(200).json(org);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update organization details by ID
const updateOrganizationDetails = async (req, res) => {
    try {
        const updatedData = req.body;

        if (req.file) {
            updatedData.profilepic = req.file;
        }

        const updatedOrg = await Organization.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedOrg) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        res.status(200).json({
            message: 'Organization updated successfully',
            data: updatedOrg,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Forgot password
const forgotPassword = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const org = await Organization.findOne({ email });

        if (!org) {
            return res.status(404).json({ success: false, message: 'Organization not found' });
        }

        // If you're NOT hashing password (not recommended in production)
        const updatedOrg = await Organization.findByIdAndUpdate(
            org._id,
            { password: password },
            { new: true } // Return the updated document
        );

        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};



module.exports = {
    saveorg,
    uploadimg,
    loginvalidateorg,
    viewAllOrganizations,
    viewOneOrganization,
    updateOrganizationDetails,
    forgotPassword,
};
