import Member from '../models/memberModel.js'
import bcrypt from  'bcrypt'
import jwt from 'jsonwebtoken'
// Create a new member
export const createMember = async (req, res) => {
  try {
    const { fullName, email, password,position,role, entryDate, exitDate, skills, contacts } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const newMember = await Member.create({
      fullName,
      email,
      password:hashedPassword,  // Note: Hash password before saving for security
      role,
      position,
      entryDate,
      exitDate,
      skills,
      contacts,
      isActive:true, //
    });

    res.status(201).json({
      message: 'Member created successfully!',
      data: newMember,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating member',
      error: error.message,
    });
  }
};

// Get all members
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      where: { isActive: true }, // Correctly specifies the condition
    });
    
    res.status(200).json({
      message: 'Members fetched successfully!',
      data: members,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching members',
      error: error.message,
    });
  }
};

// Get a single member by ID
export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);

    if (member) {
      res.status(200).json({
        message: 'Member found!',
        data: member,
      });
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching member',
      error: error.message,
    });
  }
};

// Update a member by ID
export const updateMember = async (req, res) => {

  try {
    const { id } = req.params;
    const { fullName, email,position,role, password, entryDate, exitDate, skills, contacts } = req.body;
    const hashedPassword = await bcrypt.hash(password,10)
    const member = await Member.findByPk(id);

    if (member) {
      await member.update({
        fullName,
        email,
        password:hashedPassword, // Hash if needed
        entryDate,
        position,
        Role:role

        // exitDate,
        // skills,
        // contacts,
      });

      res.status(200).json({
        message: 'Member updated successfully!',
        data: member,
      });
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error updating member',
      error: error.message,
    });
  }
};

// Delete a member by ID
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findByPk(id);

    if (member) {
      await member.update({isActive:false});
      res.status(200).json({
        message: 'Member deleted successfully!',
      });
    } else {
      res.status(404).json({ message: 'Member not found' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting member',
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await Member.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, skills:user.skills,profile:user.profile,fullName:user.fullName,position:user.position }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expiration
    );

    // Respond with user info and token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
