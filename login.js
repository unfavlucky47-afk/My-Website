// Form submission
const loginForm = document.getElementById('loginForm');
const statusText = document.getElementById('status-text');
const passwordInput = document.getElementById('password');
const securityFill = document.getElementById('security-fill');
const securityLevel = document.getElementById('security-level');

// Password strength indicator
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    // Check password strength
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    // Cap at 100%
    strength = Math.min(strength, 100);
    
    // Update security indicator
    securityFill.style.width = `${strength}%`;
    
    // Update security text
    if (strength < 30) {
        securityLevel.textContent = "VERY WEAK";
        securityLevel.style.color = "#ff0000";
    } else if (strength < 50) {
        securityLevel.textContent = "WEAK";
        securityLevel.style.color = "#ff6600";
    } else if (strength < 75) {
        securityLevel.textContent = "MODERATE";
        securityLevel.style.color = "#ffff00";
    } else if (strength < 90) {
        securityLevel.textContent = "STRONG";
        securityLevel.style.color = "#66ff00";
    } else {
        securityLevel.textContent = "QUANTUM SECURE";
        securityLevel.style.color = "#00ff00";
    }
});

// Form submission handler
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const loginCard = document.querySelector('.login-card');
    
    // Change status text
    statusText.textContent = "AUTHENTICATING...";
    statusText.style.color = "#ffff00";
    
    // Simulate authentication process
    setTimeout(() => {
        if (username && password.length >= 8) {
            statusText.textContent = "ACCESS GRANTED // WELCOME TO NEOSYSTEMS";
            statusText.style.color = "#00ff00";
            
            // Save user data to localStorage
            localStorage.setItem('quantumUser', username);
            localStorage.setItem('quantumAuth', 'true');
            localStorage.setItem('loginTime', new Date().toISOString());
            
            // Add success effect to button
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ACCESS GRANTED';
            submitBtn.style.background = 'linear-gradient(90deg, #00cc00, #00ff00)';
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            statusText.textContent = "ACCESS DENIED // INVALID CREDENTIALS";
            statusText.style.color = "#ff0000";
            
            // Add shake effect to form
            loginCard.classList.add('shake');
            setTimeout(() => {
                loginCard.classList.remove('shake');
            }, 500);
            
            // Reset after 3 seconds
            setTimeout(() => {
                statusText.textContent = "SYSTEM SECURE // READY FOR AUTHENTICATION";
                statusText.style.color = "#00ff00";
            }, 3000);
        }
    }, 1500);
});

// Random status updates
const statusMessages = [
    "SYSTEM SECURE // READY FOR AUTHENTICATION",
    "QUANTUM ENCRYPTION ACTIVE",
    "NEURAL NETWORK SCANNING",
    "BIOMETRIC VERIFICATION STANDBY",
    "ALL SYSTEMS NOMINAL"
];

setInterval(() => {
    const randomIndex = Math.floor(Math.random() * statusMessages.length);
    if (statusText.textContent.includes("READY") || statusText.textContent.includes("NOMINAL")) {
        statusText.textContent = statusMessages[randomIndex];
    }
}, 5000);