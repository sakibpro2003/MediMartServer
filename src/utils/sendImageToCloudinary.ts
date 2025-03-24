import { v2 as cloudinary } from 'cloudinary';
export const sendImageToCloudinary = ()=>{



    // Configuration
    cloudinary.config({ 
        cloud_name: 'dwhbksgr6', 
        api_key: '586593298214658', 
        api_secret: 'pAxMut4OgAflzErYDUYLzbak7Fw' 
    });
} 