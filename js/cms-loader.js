// CMS Content Loader - JSON Approach
document.addEventListener('DOMContentLoaded', function() {
    console.log('CMS Loader initialized');
    loadPackages();
    loadContactInfo();
});

// Load and display safari packages
async function loadPackages() {
    try {
        console.log('Loading packages...');
        const response = await fetch('./content/packages.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Packages loaded:', data);
        displayPackages(data.packages);
    } catch (error) {
        console.error('Error loading packages:', error);
        displayFallbackPackages();
    }
}

function displayPackages(packages) {
    const container = document.getElementById('packages-container');
    if (!container) {
        console.error('Packages container not found');
        return;
    }

    if (!packages || packages.length === 0) {
        console.log('No packages found, showing fallback');
        displayFallbackPackages();
        return;
    }

    let packagesHTML = '';
    
    packages.forEach(pkg => {
        packagesHTML += `
            <div class="package-card">
                <div class="package-image">
                    <img src="${pkg.image}" alt="${pkg.image_alt || pkg.title}" loading="lazy">
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
    console.log('Packages displayed successfully');
}

function displayFallbackPackages() {
    const container = document.getElementById('packages-container');
    if (!container) return;

    // Show the original static packages as fallback
    container.innerHTML = `
        <div class="package-card">
            <div class="package-image">
                <img src="assets/images/PHOTO-2025-11-15-14-35-27.jpg" alt="Okavango Delta - Mokoro Experience">
            </div>
            <div class="package-content">
                <h3 class="package-title">Okavango Delta Explorer</h3>
                <p class="package-description">Journey through the world's largest inland delta, home to incredible biodiversity and stunning landscapes. Experience mokoro rides and walking safaris.</p>
                <div class="package-details">
                    <span><i class="far fa-clock"></i> 5 Days / 4 Nights</span>
                    <span><i class="fas fa-users"></i> Small Groups (Max 8)</span>
                </div>
                <div class="package-price">$1,850</div>
                <a href="okavango-delta.html" class="view-details-btn">View Details</a>
            </div>
        </div>
        <div class="package-card">
            <div class="package-image">
                <img src="assets/images/PHOTO-2025-11-15-14-31-15.jpg" alt="Chobe National Park - Elephant Herd">
            </div>
            <div class="package-content">
                <h3 class="package-title">Chobe National Park Adventure</h3>
                <p class="package-description">Experience one of Africa's greatest elephant sanctuaries with incredible game viewing opportunities. Enjoy river cruises and guided game drives.</p>
                <div class="package-details">
                    <span><i class="far fa-clock"></i> 4 Days / 3 Nights</span>
                    <span><i class="fas fa-users"></i> Small Groups (Max 6)</span>
                </div>
                <div class="package-price">$1,450</div>
                <a href="chobe-national-park.html" class="view-details-btn">View Details</a>
            </div>
        </div>
        <div class="package-card">
            <div class="package-image">
                <img src="assets/images/PHOTO-2025-11-15-14-59-55 2.jpg" alt="Kalahari Desert - Gemsbok">
            </div>
            <div class="package-content">
                <h3 class="package-title">Kalahari Desert Expedition</h3>
                <p class="package-description">Discover the unique ecosystem of the Kalahari and its specially adapted wildlife. Experience the culture of the San people and breathtaking sunsets.</p>
                <div class="package-details">
                    <span><i class="far fa-clock"></i> 6 Days / 5 Nights</span>
                    <span><i class="fas fa-users"></i> Small Groups (Max 8)</span>
                </div>
                <div class="package-price">$1,850</div>
                <a href="kalahari-desert.html" class="view-details-btn">View Details</a>
            </div>
        </div>
    `;
}

// Load contact information
async function loadContactInfo() {
    try {
        console.log('Loading contact info...');
        const response = await fetch('./content/contact.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Contact info loaded:', data);
        updateContactInfo(data);
    } catch (error) {
        console.error('Error loading contact info:', error);
        // Keep the original contact info if JSON fails
    }
}

function updateContactInfo(contact) {
    // Update contact details section
    const contactDetails = document.getElementById('contact-details');
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
    const whatsappBtn = document.getElementById('whatsapp-btn');
    if (whatsappBtn && contact.whatsapp) {
        // Clean the phone number for WhatsApp link
        const cleanNumber = contact.whatsapp.replace(/\s+/g, '');
        whatsappBtn.href = `https://wa.me/${cleanNumber}`;
    }

    // Update email button
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn && contact.email) {
        emailBtn.href = `mailto:${contact.email}`;
    }
    
    console.log('Contact info updated successfully');
}
