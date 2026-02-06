// EmailJS Configuration Template
// Copy this file and rename it to config.js (optional)
// Or directly edit the values in script.js

const EMAIL_CONFIG = {
    // Get these from https://www.emailjs.com/
    publicKey: 'YOUR_PUBLIC_KEY',      // From Account > API Keys
    serviceId: 'YOUR_SERVICE_ID',      // From Email Services
    templateId: 'YOUR_TEMPLATE_ID',    // From Email Templates
    
    // Email template parameters
    toName: 'Viraj',                   // Your name
    fromName: 'Swara',                 // Special person's name
    replyTo: 'your-email@example.com'  // Your email address
};

// Example EmailJS template content:
/*
Subject: 💖 Swara Said YES! 💖

Hello {{to_name}},

Great news! {{from_name}} said YES to being your Valentine! 💕

Message: {{message}}

🎉 Congratulations! 🎉

---
This email was sent from your Valentine's Day webpage.
*/
