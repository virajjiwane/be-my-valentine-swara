# 💖 Be My Valentine, Swara! 💖

A romantic, interactive Valentine's Day webpage to ask that special someone to be your valentine!

## ✨ Features

- 🎀 Beautiful pink, violet, and magenta gradient background
- ✨ Glittery effects and floating hearts animation
- 💕 Cute stickers and romantic GIFs
- 🎯 Interactive "Yes" and "No" buttons
- 🏃 "No" button that runs away when you try to click it
- 💌 Email notification via EmailJS when "Yes" is clicked
- 🎉 Celebration confetti animation
- 📱 Fully responsive design

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/virajjiwane/be-my-valentine-swara.git
cd be-my-valentine-swara
```

### 2. Configure EmailJS

To enable email notifications:

⚠️ **Important Security Note**: The placeholder values (YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, etc.) in `script.js` are intentional and MUST be replaced with your actual EmailJS credentials. Never commit real credentials to a public repository.

1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_name}}` - Recipient name
   - `{{from_name}}` - Sender name
   - `{{message}}` - Message content
4. Get your credentials from EmailJS dashboard:
   - Public Key (from Account settings)
   - Service ID
   - Template ID

5. Update the `script.js` file with your EmailJS credentials:
   ```javascript
   // Replace these placeholders:
   emailjs.init('YOUR_PUBLIC_KEY');
   const serviceID = 'YOUR_SERVICE_ID';
   const templateID = 'YOUR_TEMPLATE_ID';
   
   // And update the email in templateParams:
   reply_to: 'your-email@example.com'
   ```

### 3. Open the page

Simply open `index.html` in your web browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

Then navigate to `http://localhost:8000`

## 💝 How It Works

1. The page displays a beautiful dialog asking "Will you be my Valentine, Swara?"
2. Two buttons appear: "Yes!" and "No"
3. **"No" button**: Moves to a random position whenever you try to hover or click it (it keeps running away!)
4. **"Yes" button**: When clicked:
   - Sends an email notification via EmailJS
   - Shows a thank you message with celebration GIF
   - Triggers a confetti animation
   - Displays a romantic thank you message

## 🎨 Customization

You can customize the page by editing:

- **Colors**: Modify the gradient colors in `styles.css`
- **GIFs**: Replace the Giphy URLs in `index.html` with your preferred GIFs
- **Text**: Change the messages in `index.html`
- **Names**: Update "Swara" to your special person's name
- **Email recipient**: Change the recipient email in `script.js`

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💖 Made with Love

Created with love for Swara! 💕