// Initialize EmailJS with your public key
// Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
(function() {
    try {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('9z5tnKtdB_iK5PmTE'); // Replace with your EmailJS public key
        }
    } catch (error) {
        console.log('EmailJS not loaded, email functionality will be disabled');
    }
})();

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionDialog = document.getElementById('questionDialog');
const thankYouDialog = document.getElementById('thankYouDialog');
const buttonsContainer = document.querySelector('.buttons-container');

// Function to calculate distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to check if two rectangles overlap
function doRectanglesOverlap(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

// Function to move the "No" button to a random position
function moveNoButton(pointerX = null, pointerY = null) {
    // Make button fixed positioned on first move (so it can move anywhere on screen)
    if (noBtn.style.position !== 'fixed') {
        noBtn.style.position = 'fixed';
        noBtn.style.zIndex = '100';
    }
    
    const btnRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate maximum positions (keeping button inside viewport)
    const maxX = viewportWidth - btnRect.width - 20; // 20px margin from edge
    const maxY = viewportHeight - btnRect.height - 20;
    
    const minX = 20; // 20px margin from edge
    const minY = 20;
    
    const minDistanceFromPointer = 150; // Minimum distance from pointer (in pixels)
    const minDistanceFromYes = 100; // Minimum distance from Yes button
    
    let newX, newY;
    let attempts = 0;
    const maxAttempts = 50;
    
    // Try to find a position that satisfies all constraints
    do {
        // Generate random positions
        newX = minX + Math.random() * (maxX - minX);
        newY = minY + Math.random() * (maxY - minY);
        
        // Create a temporary rect for the new position
        const newRect = {
            left: newX,
            top: newY,
            right: newX + btnRect.width,
            bottom: newY + btnRect.height
        };
        
        // Check distance from pointer (if pointer position is provided)
        const distanceFromPointer = (pointerX !== null && pointerY !== null) 
            ? getDistance(pointerX, pointerY, newX + btnRect.width / 2, newY + btnRect.height / 2)
            : minDistanceFromPointer + 1; // Skip this check if no pointer position
        
        // Check distance from Yes button
        const yesCenterX = yesRect.left + yesRect.width / 2;
        const yesCenterY = yesRect.top + yesRect.height / 2;
        const newCenterX = newX + btnRect.width / 2;
        const newCenterY = newY + btnRect.height / 2;
        const distanceFromYes = getDistance(yesCenterX, yesCenterY, newCenterX, newCenterY);
        
        // Check if position is valid
        const farEnoughFromPointer = distanceFromPointer > minDistanceFromPointer;
        const farEnoughFromYes = distanceFromYes > minDistanceFromYes;
        const noOverlap = !doRectanglesOverlap(newRect, yesRect);
        
        if (farEnoughFromPointer && farEnoughFromYes && noOverlap) {
            break; // Found a good position
        }
        
        attempts++;
    } while (attempts < maxAttempts);
    
    // Apply new position with smooth transition
    noBtn.style.transition = 'all 0.3s ease';
    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
}

// Event listeners for "No" button
noBtn.addEventListener('mouseenter', (e) => {
    moveNoButton(e.clientX, e.clientY);
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton(e.clientX, e.clientY);
});

// Touch support for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveNoButton(touch.clientX, touch.clientY);
});

// Also handle touchmove to move button away if user tries to follow it
noBtn.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    moveNoButton(touch.clientX, touch.clientY);
});

// "Yes" button click handler
yesBtn.addEventListener('click', async () => {
    // Send email using EmailJS
    try {
        if (typeof emailjs !== 'undefined') {
            // Replace with your EmailJS service ID, template ID, and parameters
            const serviceID = 'service_p6epjnl'; // Replace with your service ID
            const templateID = 'template_1mkuifk'; // Replace with your template ID
            
            const templateParams = {
                to_name: 'Viraj', // Your name
                from_name: 'Swara',
                message: 'Swara said YES to being your Valentine! 💖',
                reply_to: 'vjiwane27@gmail.com' // Your email
            };

            await emailjs.send(serviceID, templateID, templateParams);
            console.log('Email sent successfully!');
        } else {
            console.log('EmailJS not available, skipping email');
        }
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
