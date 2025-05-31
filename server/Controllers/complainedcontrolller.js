const Complaint = require('../Models/complainedschema');

// Add Complaint
exports.addComplaint = async (req, res) => {
  try {
    const { complaintMessage, complaintByUserType, userId, organizationId } = req.body;

    const complaint = new Complaint({
      complaintMessage,
      complaintByUserType,
      userId: complaintByUserType === 'users' ? userId : undefined,
      organizationId: complaintByUserType === 'organizations' ? organizationId : undefined,
    });

    await complaint.save();
    res.status(201).json({ success: true, message: "Complaint added", data: complaint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View All Complaints
exports.viewAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('userId').populate('organizationId');
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View Complaints by UserType = user
exports.viewUserComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ complaintByUserType: 'user' }).populate('userId');
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View Complaints by UserType = organization
exports.viewOrganizationComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ complaintByUserType: 'organization' }).populate('organizationId');
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View Complaint by ID
exports.viewComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('userId').populate('organizationId');
    if (!complaint) return res.status(404).json({ success: false, message: "Complaint not found" });
    res.status(200).json({ success: true, data: complaint });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View Complaint by userId
exports.viewComplaintByUserId = async (req, res) => {
  try {
    const complaints = await Complaint.find({ userId: req.params.userId });
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// View Complaint by organizationId
exports.viewComplaintByOrganizationId = async (req, res) => {
  try {
    const complaints = await Complaint.find({ organizationId: req.params.organizationId });
    res.status(200).json({ success: true, data: complaints });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
