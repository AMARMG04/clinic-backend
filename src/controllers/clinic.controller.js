const Clinic = require("../models/clinic.model");

// CREATE
exports.createClinic = async (req, res) => {
  try {
    console.log(req.body)
    const clinic = await Clinic.create(req.body);
    res.status(201).json(clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET ALL
exports.getClinics = async (req, res) => {
  try {
    const clinics = await Clinic.find();
    res.json(clinics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
exports.getClinicById = async (req, res) => {
  try {
    const clinic = await Clinic.findById(req.params.id);

    if (!clinic)
      return res.status(404).json({ message: "Clinic not found" });

    res.json(clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE
exports.updateClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!clinic)
      return res.status(404).json({ message: "Clinic not found" });

    res.json(clinic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE
exports.deleteClinic = async (req, res) => {
  try {
    const clinic = await Clinic.findByIdAndDelete(req.params.id);

    if (!clinic)
      return res.status(404).json({ message: "Clinic not found" });

    res.json({ message: "Clinic deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};