require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
    });


 const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'wonderlust_DEV',
    allowed_formats: ['png', 'jpg', 'jpeg', 'webp'],
    // optional: use public_id to customize file names:
    // public_id: (req, file) => `some/path/${Date.now()}-${file.originalname}`
  }
});

module.exports={cloudinary,storage};