// Authentication Check
function checkAuth() {
    const isAuthenticated = localStorage.getItem('quantumAuth');
    const username = localStorage.getItem('quantumUser');
    
    if (!isAuthenticated || !username) {
        alert('QUANTUM ACCESS REQUIRED\nRedirecting to login portal...');
        window.location.href = 'Log-In.html';
        return false;
    }
    
    // Check session timeout (1 hour)
    const loginTime = new Date(localStorage.getItem('loginTime'));
    const now = new Date();
    const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
    
    if (hoursDiff > 1) {
        localStorage.clear();
        alert('SESSION EXPIRED\nPlease login again.');
        window.location.href = 'Log-In.html';
        return false;
    }
    
    return true;
}

// Initialize Dashboard
function initDashboard() {
    if (!checkAuth()) return;
    
    // Load user data
    const username = localStorage.getItem('quantumUser');
    document.getElementById('username-display').textContent = username.toUpperCase();
    document.getElementById('profile-name').textContent = userData.name;
    document.getElementById('profile-bio').textContent = userData.bio;
    
    // Populate Skills
    const skillsContainer = document.getElementById('skills-container');
    userData.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percent">${skill.percent}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-fill" style="width: ${skill.percent}%"></div>
            </div>
        `;
        skillsContainer.appendChild(skillItem);
    });
    
    // Populate Timeline
    const timelineContainer = document.getElementById('timeline-container');
    userData.experience.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-date">${exp.date}</div>
            <div class="timeline-title">${exp.title}</div>
            <div class="timeline-desc">${exp.desc}</div>
        `;
        timelineContainer.appendChild(timelineItem);
    });
    
    // Populate Projects
    const projectsContainer = document.getElementById('projects-container');
    userData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-icon">
                <i class="${project.icon}"></i>
            </div>
            <div class="project-title">${project.title}</div>
            <div class="project-desc">${project.desc}</div>
            <div class="project-tech">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <a href="${project.link}" class="project-link">
                <span>ACCESS PROJECT</span>
                <i class="fas fa-arrow-right"></i>
            </a>
        `;
        projectsContainer.appendChild(projectCard);
    });
    
    // Setup Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (item.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const targetSection = item.getAttribute('data-section');
                
                // Update active nav item
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Show target section
                sections.forEach(section => {
                    section.style.display = 'none';
                    if (section.id === targetSection) {
                        section.style.display = 'block';
                        section.style.animation = 'slideIn 0.5s ease-out';
                    }
                });
            }
        });
    });
    
    // Setup Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('QUANTUM TRANSMISSION INITIATED\nMessage sent through quantum entanglement channels.');
            contactForm.reset();
        });
    }
    
    // System Status Updates
    const statusText = document.getElementById('system-status');
    const statusMessages = [
        "SYSTEM ONLINE",
        "QUANTUM NETWORK ACTIVE",
        "NEURAL LINK STABLE",
        "ALL SYSTEMS NOMINAL",
        "DATA FLOW OPTIMAL"
    ];
    
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * statusMessages.length);
        if (statusText && statusText.textContent.includes("ONLINE") || statusText.textContent.includes("NOMINAL")) {
            statusText.textContent = statusMessages[randomIndex];
        }
    }, 5000);
    
    // Animate skill bars on scroll
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFills = entry.target.querySelectorAll('.skill-fill');
                skillFills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 300);
                });
            }
        });
    }, observerOptions);
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);
}

// Logout Function
function logout() {
    if (confirm('TERMINATE QUANTUM SESSION?\nYou will be redirected to the access portal.')) {
        localStorage.clear();
        window.location.href = 'Log-In.html';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initDashboard);