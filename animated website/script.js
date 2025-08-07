
        // Page Navigation
        function showPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Find and activate the clicked nav link
            document.querySelectorAll('.nav-links a').forEach(link => {
                if (link.textContent.toLowerCase() === pageId) {
                    link.classList.add('active');
                } else if (pageId === 'home' && link.textContent === 'Home') {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Trigger animations for new page
            setTimeout(initPageAnimations, 100);
        }

        // Initialize page animations
        function initPageAnimations() {
            const animatedElements = document.querySelectorAll('.animated');
            animatedElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
            });
            
            // Trigger animations after a short delay
            setTimeout(() => {
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, 150 * index);
                });
            }, 300);
        }

        // Hamburger menu toggle
        document.querySelector('.hamburger').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });

        // Hide navbar on scroll down
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                document.querySelector('.navbar').classList.add('hidden');
            } else {
                document.querySelector('.navbar').classList.remove('hidden');
            }
            lastScrollTop = scrollTop;
        });

        // Initialize animations on page load
        window.addEventListener('DOMContentLoaded', function() {
            initPageAnimations();
            
            // Set up Intersection Observer for scroll animations
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.animated').forEach(el => {
                observer.observe(el);
            });
        });
    