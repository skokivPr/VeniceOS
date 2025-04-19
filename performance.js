/**
 * VeniceOS Dashboard Performance Optimizations
 * This script improves performance by:
 * - Debouncing and throttling expensive operations
 * - Lazy loading components
 * - Optimizing animations
 * - Implementing intersection observer for offscreen components
 */

(function () {
    // Utility functions
    const debounce = (func, wait = 100) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, wait);
        };
    };

    const throttle = (func, limit = 100) => {
        let inThrottle;
        return function (...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    // Optimize scroll and resize events
    const optimizeScroll = () => {
        const scrollHandler = throttle(() => {
            const scrollY = window.scrollY;

            // Toggle header appearance on scroll
            const header = document.querySelector('.header');
            if (header) {
                if (scrollY > 20) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }
        }, 50);

        window.addEventListener('scroll', scrollHandler);
    };

    const optimizeResize = () => {
        const resizeHandler = debounce(() => {
            // Update mobile-specific layouts if needed
            if (window.innerWidth <= 768) {
                document.body.classList.add('mobile-view');
            } else {
                document.body.classList.remove('mobile-view');
                // Ensure mobile menu is closed on desktop
                document.body.style.overflow = 'auto';
            }
        }, 150);

        window.addEventListener('resize', resizeHandler);
        // Run once on initial load
        resizeHandler();
    };

    // Optimize animations with requestAnimationFrame
    const optimizeAnimations = () => {
        // Replace setTimeout-based animations with requestAnimationFrame
        // where appropriate
        const animElements = document.querySelectorAll('.fade-in, .hover-lift');

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animElements.forEach(el => observer.observe(el));
        } else {
            // Fallback for browsers that don't support IntersectionObserver
            animElements.forEach(el => el.classList.add('visible'));
        }
    };

    // Optimize images and defer non-critical resources
    const optimizeResources = () => {
        // Lazy load images that are not immediately visible
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.classList.contains('preload')) return;
                img.loading = 'lazy';
            });
        }

        // Defer non-critical CSS
        const deferStyles = () => {
            const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"][data-defer="true"]'));
            if (stylesheets.length) {
                stylesheets.forEach(stylesheet => {
                    stylesheet.setAttribute('rel', 'stylesheet');
                    stylesheet.removeAttribute('data-defer');
                });
            }
        };

        // Run after initial render is complete
        if (window.requestIdleCallback) {
            window.requestIdleCallback(deferStyles);
        } else {
            setTimeout(deferStyles, 1000);
        }
    };

    // Reduce browser reflows
    const optimizeDOM = () => {
        // Add content-visibility where appropriate to improve rendering performance
        const offscreenContainers = document.querySelectorAll('.links-container, .footer');
        offscreenContainers.forEach(container => {
            container.style.contentVisibility = 'auto';
        });
    };

    // Initialize all optimizations
    const init = () => {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initOptimizations);
        } else {
            initOptimizations();
        }

        // Execute optimizations
        function initOptimizations() {
            optimizeScroll();
            optimizeResize();
            optimizeAnimations();
            optimizeResources();
            optimizeDOM();

            // Remove initial animations after page load to improve performance
            setTimeout(() => {
                document.body.classList.add('animations-done');
            }, 2000);
        }
    };

    // Run initialization
    init();
})(); 