/* Shared JS: Mobile navigation implementation */
document.addEventListener('DOMContentLoaded', function() {
    // Find or create navigation mount point
    const mount = document.getElementById('global-nav');
    if (!mount) return;

    // Create navigation HTML
    mount.innerHTML = `
        <div class="liquid-glass side-nav" role="navigation" aria-label="Main Navigation">
            <div class="brand">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M12 2L2 7v7c0 5 4 9 10 9s10-4 10-9V7l-10-5z" fill="url(#g)"/>
                </svg>
                <div>Nevoxio</div>
            </div>
            <nav>
                <a href=index.html><span class="dot"></span> Home</a>
                <a href="about bot.html"><span class="dot"></span> Product</a>
                <a href="features.html"><span class="dot"></span> Features</a>
                <a href="order page.html"><span class="dot"></span> Pricing</a>
                <a href="bot works.html"><span class="dot"></span> Support</a>
                <a href="about.html"><span class="dot"></span> About Us</a>
                <a href="feedback.html"><span class="dot"></span> Testimonials</a>
            </nav>
        </div>
        <button class="menu-btn" aria-label="Toggle menu">☰</button>
        <div class="overlay"></div>
    `;

    // Add abstract background if not present
    if(!document.querySelector('.abstract-bg')){
        const bg = document.createElement('div');
        bg.className = 'abstract-bg';
        bg.innerHTML = `
            <div class="blob a"></div>
            <div class="blob b"></div>
            <div class="blob c"></div>
        `;
        document.body.appendChild(bg);
    }

        // Get elements and ensure they exist
    const nav = mount.querySelector('.side-nav');
    const menuBtn = mount.querySelector('.menu-btn');
    const navOverlay = mount.querySelector('.overlay');

    if (!nav || !menuBtn || !navOverlay) {
        console.error('Required navigation elements not found');
        return;
    }

    // Toggle navigation function
    function toggleNav(e) {
        if (e) e.stopPropagation();
        nav.classList.toggle('open');
        menuBtn.classList.toggle('open');
        menuBtn.innerHTML = nav.classList.contains('open') ? '×' : '☰';
        navOverlay.classList.toggle('show');
        
        // Log state for debugging
        console.log('Navigation toggled:', {
            isOpen: nav.classList.contains('open'),
            navClasses: nav.classList.toString(),
            btnClasses: menuBtn.classList.toString()
        });
    }

    // Menu button click handler
    menuBtn.addEventListener('click', toggleNav);

    // Close menu when clicking overlay
    navOverlay.addEventListener('click', toggleNav);

    // Close menu when clicking a navigation link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleNav);
    });

    // Close menu when pressing ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            toggleNav();
        }
    });

    // Highlight current page in navigation
    const currentPath = window.location.pathname.split('/').pop().toLowerCase();
    nav.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href').toLowerCase();
        if (href.includes(currentPath) || (currentPath === '' && href.includes('home'))) {
            link.classList.add('active');
        }
    });

});
