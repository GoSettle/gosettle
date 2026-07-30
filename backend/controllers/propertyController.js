import prisma from '../lib/prisma.js';

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
export const getProperties = async (req, res) => {
  try {
    const { city, type, college, gender } = req.query;
    
    // Build query based on filters
    const query = {};
    if (city) query.city = { contains: city, mode: 'insensitive' };
    if (type) query.type = type.toUpperCase();
    if (college) query.college = { contains: college, mode: 'insensitive' };
    if (gender) query.gender = gender.toUpperCase();

    const properties = await prisma.property.findMany({
      where: query,
      include: {
        owner: {
          select: { name: true, phone: true }
        }
      }
    });

    res.json(properties);
  } catch (error) {
    console.error('Error in getProperties:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getPropertyById = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id },
      include: {
        owner: {
          select: { name: true, joinedAt: true }
        }
      }
    });

    if (property) {
      // Increment views count asynchronously
      await prisma.property.update({
        where: { id: property.id },
        data: { views: { increment: 1 } }
      });
      
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    console.error('Error in getPropertyById:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a property
// @route   POST /api/properties
// @access  Private/Owner
export const createProperty = async (req, res) => {
  try {
    const propertyData = req.body;
    
    const property = await prisma.property.create({
      data: {
        ...propertyData,
        ownerId: req.user.id,
      }
    });

    res.status(201).json(property);
  } catch (error) {
    console.error('Error in createProperty:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a property
// @route   PUT /api/properties/:id
// @access  Private/Owner
export const updateProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this property' });
    }

    const updatedProperty = await prisma.property.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json(updatedProperty);
  } catch (error) {
    console.error('Error in updateProperty:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a property
// @route   DELETE /api/properties/:id
// @access  Private/Owner
export const deleteProperty = async (req, res) => {
  try {
    const property = await prisma.property.findUnique({
      where: { id: req.params.id }
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.ownerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this property' });
    }

    await prisma.property.delete({
      where: { id: req.params.id }
    });

    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error('Error in deleteProperty:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get owner dashboard stats
// @route   GET /api/properties/owner/dashboard
// @access  Private/Owner
export const getOwnerDashboardStats = async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      where: { ownerId: req.user.id }
    });

    const activeListings = properties.length;
    const totalViews = properties.reduce((acc, curr) => acc + curr.views, 0);

    const inquiries = await prisma.inquiry.findMany({
      where: {
        property: {
          ownerId: req.user.id
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        property: { select: { title: true } }
      }
    });
    
    const totalInquiries = await prisma.inquiry.count({
      where: {
        property: {
          ownerId: req.user.id
        }
      }
    });

    res.json({
      activeListings,
      totalViews,
      totalInquiries,
      recentActivity: inquiries
    });
  } catch (error) {
    console.error('Error in getOwnerDashboardStats:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
