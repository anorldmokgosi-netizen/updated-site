// CMS Content Loader - JSON Approach
document.addEventListener('DOMContentLoaded', function() {
    loadPackages();
    loadContactInfo();
    loadSettings();
});

// Load and display safari packages
async function loadPackages() {
    try {
        const response = await fetch('/content/packages.json');
        const data = await response.json();
        displayPackages(data.packages);
    } catch (error) {
        console.error('Error loading packages:', error);
        displayFallbackPackages();
    }
}

function displayPackages(packages) {
    const container = document.getElementById('packages-container');
    if (!container) return;

    if (!packages || packages.length === 0) {
        displayFallbackPackages();
        return;
    }

    let packagesHTML = '';
    
    packages.forEach(pkg => {
        packagesHTML += `
            <div class="package-card">
                <div class="package-image">
                    <img src="${pkg.image}" alt="${pkg.image_alt || pkg.title}">
                </div>
                <div class="package-content">
                    <h3 class="package-title">${pkg.title}</h3>
                    <p class="package-description">${pkg.description}</p>
                    <div class="package-details">
                        <span><i class="far fa-clock"></i> ${pkg.duration}</span>
                        <span><i class="fas fa-users"></i> ${pkg.group_size}</span>
                    </div>
                    <div class="package-price">${pkg.price}</div>
                    <a href="${pkg.link}" class="view-details-btn">View Details</a>
                </div>
            </div>
        `;
    });

    container.innerHTML = packagesHTML;
}

function displayFallbackPackages() {
    const container = document.getElementById('packages-container');
    if (!container) return;

    container.innerHTML = `
        <div class="package-card">
            <div class="package-content">
                <h3>Packages Coming Soon</h3>
                <p>Our safari packages are being updated. Please check back soon or contact us directly.</p>
                <a href="#contact" class="view-details-btn">Contact Us</a>
            </div>
        </div>
    `;
}

// Load contact information
async function loadContactInfo() {
    try {
        const response = await fetch('/content/contact.json');
        const data = await response.json();
        updateContactInfo(data);
    } catch (error) {
        console.error('Error loading contact info:', error);
    }
}

function updateContactInfo(contact) {
    // Update contact details section
    const contactDetails = document.querySelector('.contact-details');
    if (contactDetails && contact.phones) {
        let phonesHTML = '';
        contact.phones.forEach(phone => {
            phonesHTML += `<p><i class="fas fa-phone"></i> ${phone.number}</p>`;
        });
        
        contactDetails.innerHTML = `
            <h4>Contact Information</h4>
            ${phonesHTML}
            <p><i class="fas fa-envelope"></i> ${contact.email}</p>
            <p><i class="fas fa-map-marker-alt"></i> ${contact.address}</p>
        `;
    }

    // Update WhatsApp button
    const whatsappBtn = document.querySelector('[href*="wa.me"]');
    if (whatsappBtn && contact.whatsapp) {
        whatsappBtn.href = `https://wa.me/${contact.whatsapp}`;
    }

    // Update email button
    const emailBtn = document.querySelector('[href^="mailto:"]');
    if (emailBtn && contact.email) {
        emailBtn.href = `mailto:${contact.email}`;
    }
}

// Load site settings
async function loadSettings() {
    try {
        const response = await fetch('/content/settings.json');
        const data = await response.json();
        updateSettings(data);
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

function updateSettings(settings) {
    // Update hero section
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    
    if (heroTitle && settings.hero_title) heroTitle.textContent = settings.hero_title;
    if (heroSubtitle && settings.hero_subtitle) heroSubtitle.textContent = settings.hero_subtitle;
    
    // Update hero background
    if (settings.hero_bg) {
        const hero = document.querySelector('.hero');
        hero.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url('${settings.hero_bg}')`;
    }
}
