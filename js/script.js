// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Work Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const workItems = document.querySelectorAll('.work-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        workItems.forEach(item => {
            if (filterValue === 'all') {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 10);
            } else {
                if (item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }
        });
    });
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate sections on scroll
const animatedElements = document.querySelectorAll('.work-item, .about-content');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
});

// Profile Navigation Active State
const profileNavLinks = document.querySelectorAll('.profile-nav-link');
profileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        profileNavLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});



// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function activateNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.add('active');
        } else {
            document.querySelector('.nav-links a[href*=' + sectionId + ']')?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', activateNavLink);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Cursor effect (optional - can be removed if not desired)
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add cursor styles
const style = document.createElement('style');
style.textContent = `
    .custom-cursor {
        width: 20px;
        height: 20px;
        border: 2px solid #667eea;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        display: none;
    }

    @media (min-width: 1024px) {
        .custom-cursor {
            display: block;
        }
    }

    a:hover ~ .custom-cursor,
    button:hover ~ .custom-cursor {
        transform: scale(1.5);
        background: rgba(102, 126, 234, 0.2);
    }
`;
document.head.appendChild(style);

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}



// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalClose = document.querySelector('.modal-close');
const modalWorkItems = document.querySelectorAll('.work-item[data-project-id]');

console.log('Modal element:', modal);
console.log('Modal close button:', modalClose);
console.log('Found modal work items:', modalWorkItems.length);

// Open modal when clicking on work items with data-project-id
if (modal && modalClose && modalWorkItems.length > 0) {
    modalWorkItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Work item clicked:', item.getAttribute('data-title'));
        const title = item.getAttribute('data-title');
        const category = item.getAttribute('data-category-name');
        const description = item.getAttribute('data-description');
        const year = item.getAttribute('data-year');
        const client = item.getAttribute('data-client');
        const role = item.getAttribute('data-role');
        const images = JSON.parse(item.getAttribute('data-images'));

        // Set modal content
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalCategory').textContent = category;
        
        // Convert mentions to clickable links in description
        const descriptionElement = document.getElementById('modalDescription');
        let linkedDescription = description
            .replace(
                /@nostalgia2000/g, 
                '<a href="https://montink.com/n2k" target="_blank" rel="noopener noreferrer">@nostalgia2000</a>'
            )
            .replace(
                /Shein X/g,
                '<a href="https://us.shein.com/designer/10001399" target="_blank" rel="noopener noreferrer">Shein X</a>'
            )
            .replace(
                /Shein web site/g,
                '<a href="https://us.shein.com/designer/10001399" target="_blank" rel="noopener noreferrer">Shein web site</a>'
            )
            .replace(
                /#MandaJobs|"#MandaJobs"/g,
                '<a href="https://www.youtube.com/watch?v=_R0LnEGEsd8" target="_blank" rel="noopener noreferrer">#MandaJobs</a>'
            );
        descriptionElement.innerHTML = linkedDescription;

        // Add images/videos to gallery
        const gallery = document.getElementById('modalGallery');
        gallery.innerHTML = '';
        
        // Helper function to create media element (img, video, or YouTube)
        const createMediaElement = (src, altText) => {
            console.log('Creating media element for:', src);
            
            // Check if it's a YouTube embed URL
            const embedMatch = src.match(/youtube\.com\/embed\/([^?]+)/);
            if (embedMatch) {
                console.log('Detected YouTube embed URL');
                const iframe = document.createElement('iframe');
                iframe.src = src;
                iframe.width = '100%';
                iframe.height = '600';
                iframe.frameBorder = '0';
                iframe.title = 'YouTube video player';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                iframe.allowFullscreen = true;
                iframe.style.borderRadius = '4px';
                console.log('Created YouTube iframe with embed URL:', iframe.src);
                return iframe;
            }
            
            // Check if it's an iframe HTML code
            if (src.includes('<iframe') && src.includes('</iframe>')) {
                console.log('Detected iframe HTML code');
                const div = document.createElement('div');
                div.innerHTML = src;
                const iframe = div.querySelector('iframe');
                if (iframe) {
                    // Adjust iframe styling for responsive design
                    iframe.style.width = '100%';
                    iframe.style.height = '600px';
                    iframe.style.borderRadius = '4px';
                    console.log('Created iframe from HTML code');
                    return iframe;
                }
            }
            
            // Check if it's a YouTube video ID (11 characters, alphanumeric with - and _)
            const youtubeIdPattern = /^[A-Za-z0-9_-]{11}$/;
            // Or a YouTube URL
            const youtubeMatch = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
            
            if (youtubeIdPattern.test(src) || youtubeMatch) {
                const videoId = youtubeMatch ? youtubeMatch[1] : src;
                console.log('Detected YouTube video ID:', videoId);
                const iframe = document.createElement('iframe');
                iframe.src = `https://www.youtube.com/embed/${videoId}`;
                iframe.width = '100%';
                iframe.height = '600';
                iframe.frameBorder = '0';
                iframe.title = 'YouTube video player';
                iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
                iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
                iframe.allowFullscreen = true;
                iframe.style.borderRadius = '4px';
                console.log('Created YouTube iframe with src:', iframe.src);
                return iframe;
            }
            
            // Check if it's a local video file
            const isVideo = src.toLowerCase().endsWith('.mp4') || 
                           src.toLowerCase().endsWith('.webm') || 
                           src.toLowerCase().endsWith('.mov');
            
            if (isVideo) {
                const video = document.createElement('video');
                video.src = src;
                video.controls = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.preload = 'metadata';
                return video;
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = altText;
                return img;
            }
        };
        
        // Check if images is a nested array (rows) or flat array
        if (images.length > 0 && Array.isArray(images[0])) {
            // Nested array format - each sub-array is a row
            images.forEach(row => {
                const rowDiv = document.createElement('div');
                rowDiv.className = 'modal-gallery-row';
                row.forEach(mediaSrc => {
                    const mediaElement = createMediaElement(mediaSrc, title);
                    rowDiv.appendChild(mediaElement);
                });
                gallery.appendChild(rowDiv);
            });
        } else {
            // Flat array format - single column
            images.forEach(mediaSrc => {
                const mediaElement = createMediaElement(mediaSrc, title);
                gallery.appendChild(mediaElement);
            });
        }

        // Add project details
        const details = document.getElementById('modalDetails');
        details.innerHTML = '';
        
        if (year) {
            details.innerHTML += `
                <div class="modal-detail-item">
                    <strong>Year</strong>
                    <span>${year}</span>
                </div>
            `;
        }
        
        if (client) {
            details.innerHTML += `
                <div class="modal-detail-item">
                    <strong>Client</strong>
                    <span>${client}</span>
                </div>
            `;
        }
        
        if (role) {
            details.innerHTML += `
                <div class="modal-detail-item">
                    <strong>Role</strong>
                    <span>${role}</span>
                </div>
            `;
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('Modal should be visible now');
    });
    });

    // Close modal when clicking X
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
} else {
    console.error('Modal initialization failed:', { modal: !!modal, modalClose: !!modalClose, items: modalWorkItems.length });
}

// Console message for developers
console.log('%c✨ bdef.art', 'color: #0057ff; font-size: 18px; font-weight: 500;');
console.log('%cBeatriz Barbosa - Portfolio', 'color: #191919; font-size: 14px;');
