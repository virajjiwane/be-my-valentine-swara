// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
(function() {
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS public key
})();

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionDialog = document.getElementById('questionDialog');
const thankYouDialog = document.getElementById('thankYouDialog');
const buttonsContainer = document.querySelector('.buttons-container');

// Function to move the "No" button to a random position
function moveNoButton() {
    const containerRect = buttonsContainer.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate maximum positions (keeping button inside container)
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    // Generate random positions
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    // Apply new position
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Event listeners for "No" button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// "Yes" button click handler
yesBtn.addEventListener('click', async () => {
    // Send email using EmailJS
    try {
        // Replace with your EmailJS service ID, template ID, and parameters
        const serviceID = 'YOUR_SERVICE_ID'; // Replace with your service ID
        const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID
        
        const templateParams = {
            to_name: 'Viraj', // Your name
            from_name: 'Swara',
            message: 'Swara said YES to being your Valentine! 💖',
            reply_to: 'your-email@example.com' // Your email
        };

        await emailjs.send(serviceID, templateID, templateParams);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Failed to send email:', error);
        // Still show the thank you message even if email fails
    }
    
    // Show thank you dialog
    questionDialog.classList.add('hidden');
    thankYouDialog.classList.remove('hidden');
    
    // Add celebration confetti effect
    createConfetti();
});

// Confetti effect function
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#d946ef', '#c026d3', '#e879f9'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { 
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${window.innerHeight}px) translateX(${xMovement}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}
