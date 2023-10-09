const {verifyToken,verifyTokenAdmin} = require('../middlewares/verifyToken')
const Property = require('../models/Property')
const User = require('../models/User')
const propertyController = require('express').Router()

// get all
propertyController.get('/getAll', async (req, res) => {
    try {
        const properties = await Property.find({}).populate("currentOwner", '-password')
        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})
propertyController.get('/propertyCount', async (req, res) => {
    try {
        const propertyCount = await Property.countDocuments();
        res.status(200).json({ count: propertyCount });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})


// get featured
propertyController.get('/find/featured', async (req, res) => {
    try {
        const featuredProperties = await Property.find({ featured: true }).populate("currentOwner", '-password')
        return res.status(200).json(featuredProperties)
    } catch (error) {
        return res.status(500).json(error)
    }
})


propertyController.get('/unVerifiedProperties',verifyTokenAdmin, async (req, res) => {
    try {

      const properties = await Property.find({ isVerified: false });
      res.json(properties);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// get all from type
propertyController.get('/find', async (req, res) => {
    const type = req.query
    let properties = []
    try {
        if (type) {
            properties = await Property.find(type).populate("owner", '-password')
        } else {
            properties = await Property.find({})
        }

        return res.status(200).json(properties)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// TODO FETCH TYPE OF PROPERTIES. EX: {CITY: 34, MOUNTAIN: 23}
propertyController.get('/find/types', async (req, res) => {
    try {
        const cityType = await Property.countDocuments({ type: 'city' })
        const mountainType = await Property.countDocuments({ type: 'mountain' })
        const villageType = await Property.countDocuments({ type: 'village' })

        return res.status(200).json({ city: cityType, mountain: mountainType, village: villageType })
    } catch (error) {
        return res.status(500).json(error)
    }
})



//TODO FETCH TYPE 

propertyController.get('/find/type', async (req, res) => {
    try {
        const requestedType = req.params.type;
        
        // Use your Property model to query the database based on the requested type
        const cityOnly = await Property.find({ type: 'city' });
        const mountainOnly = await Property.find({ type: 'mountain' })
        const villageOnly = await Property.find({ type: 'village' })
    
        return res.status(200).json({ city: cityOnly, mountain: mountainOnly, village: villageOnly });
      } catch (error) {
        return res.status(500).json({ error: 'An error occurred' });
      }
})

// fetch my properties
propertyController.get('/find/my-properties', verifyToken, async (req, res) => {
    try {
        const properties = await Property.find({ currentOwner: req.user.id })

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})
propertyController.get('/find/allProperties', verifyToken, async (req, res) => {
    try {
        const properties = await Property.find({ })

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})

// fetch bookmarked yachts
propertyController.get('/find/bookmarked-properties', verifyToken, async (req, res) => {
    try {
        const properties = await Property.find({ bookmarkedUsers: { $in: [req.user.id] } })

        return res.status(200).json(properties)
    } catch (error) {
        console.error(error)
    }
})


// TODO FETCH INDIVIDUAL PROPERTY
propertyController.get('/find/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate('currentOwner', '-password')

        if (!property) {
            throw new Error('No such property with that id')
        } else {
            return res.status(200).json(property)
        }
    } catch (error) {
        return res.status(500).json(error)
    }
})


// create estate
propertyController.post('/', verifyToken, async (req, res) => {
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.user.id , isVerified: false,})

        return res.status(201).json(newProperty)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// update estate
propertyController.put('/:id',verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() !== req.user.id || !req.user.isAdmin) {
            return res.status(403).json({ message: "You are not allowed to update other people's properties" });
          }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        )


        return res.status(200).json(updatedProperty)
    } catch (error) {
        return res.status(500).json(error)
    }
})


propertyController.put('/:id/verified',verifyTokenAdmin,async (req, res) => {
    try {
        // Check if the user making the request is an admin (you can use your own logic here)
       
        const property = await Property.findById(req.params.id)
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "You are not allowed to  verify properties" });
          }
        // Find the property by ID and update the isVerified field to true
        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
          { isVerified: true },
          { new: true }
        );
    
        if (!updatedProperty) {
          return res.status(404).json({ message: 'Property not found.' });
        }
    
        return res.status(200).json({ message: 'Property verified successfully.', property: updatedProperty });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
      
})

// bookmark/unbookmark estate
propertyController.put('/bookmark/:id', verifyToken, async (req, res) => {
    try {
        let property = await Property.findById(req.params.id)
        if (property.currentOwner.toString() === req.user.id) {
            throw new Error("You are not allowed to bookmark your project")
        }


        if (property.bookmarkedUsers.includes(req.user.id)) {
            property.bookmarkedUsers = property.bookmarkedUsers.filter(id => id !== req.user.id)
            await property.save()
        } else {
            property.bookmarkedUsers.push(req.user.id)

            await property.save()
        }

        return res.status(200).json(property)
    } catch (error) {
        return res.status(500).json(error)
    }
})

// delete estate
propertyController.delete('/:id', verifyToken,verifyTokenAdmin, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        
        // Check if the user is the owner of the property or an admin
        if (property.currentOwner.toString() !== req.user.id && !req.user.isAdmin) {
            throw new Error("You are not allowed to delete other people's properties")
        }

        await property.delete()

        return res.status(200).json({ msg: "Successfully deleted property" })
    } catch (error) {
        return res.status(500).json(error)
    }
})



module.exports = propertyController