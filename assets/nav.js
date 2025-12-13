// Mobile navigation implementation
(function() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileNav);
    } else {
        initMobileNav();
    }

    function initMobileNav() {
        // Insert navigation HTML
        const mount = document.getElementById('global-nav');
        if (!mount) return;

        mount.innerHTML = `
            <button class="menu-toggle" aria-label="Toggle menu">☰</button>
            <nav class="mobile-nav">
                <div class="nav-header">
                    <button class="close-nav" aria-label="Close menu">×</button>
                </div>
                <div class="nav-links">
                    <a href="index.html">Home</a>
                    <a href="about bot.html">Product</a>
                    <a href="features.html">Features</a>
                    <a href="order page.html">Pricing</a>
                    <a href="bot works.html">Support</a>
                    <a href="about.html">About Us</a>
                </div>
            </nav>
            <div class="nav-overlay"></div>
        `;

        // Get elements
        const menuBtn = mount.querySelector('.menu-toggle');
        const nav = mount.querySelector('.mobile-nav');
        const closeBtn = mount.querySelector('.close-nav');
        const overlay = mount.querySelector('.nav-overlay');
        const links = mount.querySelectorAll('.nav-links a');

        // Toggle menu
        function toggleMenu() {
            const isOpen = nav.classList.contains('open');
            nav.classList.toggle('open');
            overlay.classList.toggle('show');
            document.body.style.overflow = isOpen ? '' : 'hidden';
        }

        // Add event listeners
        menuBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
        
        links.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                toggleMenu();
            }
        });
    }
})();