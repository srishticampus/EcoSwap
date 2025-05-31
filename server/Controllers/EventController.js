const Event = require('../Models/EventSchema');
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
exports.uploadimg = multer({ storage: storage }).single('image');
// Add a new event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, venue, eventDate, eventTime, purpose, organizedBy } = req.body;

    const event = new Event({
      eventName,
      venue,
      eventDate,
      eventTime,
      purpose,
      organizedBy: organizedBy ,
      image: req.file 
    });

    await event.save();
    res.status(201).json({ success: true, message: 'Event created successfully', data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error creating event', error: err.message });
  }
};

// View all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching events', error: err.message });
  }
};

// View one event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching event', error: err.message });
  }
};

// Edit/update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const updates = {
      eventName: req.body.eventName,
      venue: req.body.venue,
      eventDate: req.body.eventDate,
      eventTime: req.body.eventTime,
      purpose: req.body.purpose,
      organizedBy: req.body.organizedBy || 'EcoSwap Team',
    };

    if (req.file) {
      updates.image = {
        filename: req.file.filename,
        path: req.file.path,
        contentType: req.file.mimetype,
      };
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json({ success: true, message: 'Event updated', data: updatedEvent });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error updating event', error: err.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error deleting event', error: err.message });
  }
};

// View upcoming events (today or future)
exports.getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const upcomingEvents = await Event.find({ eventDate: { $gte: today } }).sort({ eventDate: 1 });
    res.status(200).json({ success: true, data: upcomingEvents });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching upcoming events', error: err.message });
  }
};

exports.viewEventsByOrganizer = async (req, res) => {
  try {
    const events = await Event.find({ organizedBy: req.params.organizerId })
      .sort({ createdAt: -1 }); // Latest first
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}