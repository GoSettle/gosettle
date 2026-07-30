import prisma from '../lib/prisma.js';

// @desc    Create an inquiry
// @route   POST /api/inquiries
// @access  Public
export const createInquiry = async (req, res) => {
  try {
    const { propertyId, name, email, phone, message } = req.body;
    
    // Note: We're not doing req.user here since the route is public,
    // but you could add optional auth middleware later if you want to link it to a logged-in user.

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId,
        name,
        email,
        phone,
        message
      }
    });

    res.status(201).json(inquiry);
  } catch (error) {
    console.error('Error in createInquiry:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get owner inquiries
// @route   GET /api/inquiries/owner
// @access  Private/Owner
export const getOwnerInquiries = async (req, res) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      where: {
        property: {
          ownerId: req.user.id
        }
      },
      include: {
        property: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(inquiries);
  } catch (error) {
    console.error('Error in getOwnerInquiries:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
