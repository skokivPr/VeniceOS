(function () {
    const bgImages = [
        'https://picsum.photos/2500/1400?random=0.9706441778165951&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.123456789&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.234567890&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.345678901&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.456789012&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.567890123&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.678901234&mask=circle&blur=1',
        'https://picsum.photos/2500/1400?random=0.789012345&mask=circle&blur=1'
    ];

    // Create background layers
    const backgroundLayer1 = document.createElement('div');
    const backgroundLayer2 = document.createElement('div');

    // Style the background layers
    const layerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: -1,
        transition: 'opacity 2s ease-in-out'
    };

    Object.assign(backgroundLayer1.style, layerStyle);
    Object.assign(backgroundLayer2.style, layerStyle);

    // Add mask overlay divs
    const maskLayer1 = document.createElement('div');
    const maskLayer2 = document.createElement('div');

    const maskStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        transition: 'opacity 2s ease-in-out'
    };

    Object.assign(maskLayer1.style, maskStyle);
    Object.assign(maskLayer2.style, maskStyle);

    // Add layers to body
    document.body.appendChild(backgroundLayer1);
    document.body.appendChild(backgroundLayer2);
    document.body.appendChild(maskLayer1);
    document.body.appendChild(maskLayer2);

    let currentLayer = backgroundLayer1;
    let currentMask = maskLayer1;
    let nextLayer = backgroundLayer2;
    let nextMask = maskLayer2;
    let currentImage = bgImages[0];
    let isTransitioning = false;

    function getMaskColor() {
        const isDarkTheme = document.body.classList.contains('dark-theme');
        return {
            color: isDarkTheme ? 'var(--bg-primary)' : 'var(--bg-primary)',
            baseOpacity: isDarkTheme ? '0.8' : '0.7'
        };
    }

    function updateLayerBackground(bgLayer, maskLayer, image, instant = false) {
        const { color, baseOpacity } = getMaskColor();

        if (instant) {
            bgLayer.style.transition = 'none';
            maskLayer.style.transition = 'none';
            bgLayer.offsetHeight; // Force reflow
        }

        bgLayer.style.backgroundImage = `url('${image}')`;
        maskLayer.style.backgroundColor = color;

        if (bgLayer === currentLayer) {
            bgLayer.style.opacity = baseOpacity;
            maskLayer.style.opacity = baseOpacity;
        }

        if (instant) {
            bgLayer.offsetHeight; // Force reflow
            bgLayer.style.transition = layerStyle.transition;
            maskLayer.style.transition = layerStyle.transition;
        }
    }

    // Set initial background
    updateLayerBackground(backgroundLayer1, maskLayer1, currentImage, true);
    backgroundLayer1.style.opacity = getMaskColor().baseOpacity;
    maskLayer1.style.opacity = getMaskColor().baseOpacity;
    backgroundLayer2.style.opacity = '0';
    maskLayer2.style.opacity = '0';

    function updateBackground() {
        if (isTransitioning) return;
        isTransitioning = true;

        const nextImageIndex = Math.floor(Math.random() * bgImages.length);
        const nextImage = bgImages[nextImageIndex];

        // Preload next image
        const img = new Image();
        img.src = nextImage;

        img.onload = () => {
            const { baseOpacity } = getMaskColor();
            updateLayerBackground(nextLayer, nextMask, nextImage);
            nextLayer.style.opacity = baseOpacity;
            nextMask.style.opacity = baseOpacity;
            currentLayer.style.opacity = '0';
            currentMask.style.opacity = '0';

            // Update current image reference
            currentImage = nextImage;

            // Swap layers after transition
            setTimeout(() => {
                [currentLayer, nextLayer] = [nextLayer, currentLayer];
                [currentMask, nextMask] = [nextMask, currentMask];
                isTransitioning = false;
            }, 1000);
        };

        img.onerror = () => {
            isTransitioning = false;
        };
    }

    // Theme change handler
    function handleThemeChange() {
        const { baseOpacity } = getMaskColor();
        updateLayerBackground(currentLayer, currentMask, currentImage, true);
        currentLayer.style.opacity = baseOpacity;
        currentMask.style.opacity = baseOpacity;

        const nextImage = nextLayer.style.backgroundImage?.split('url(')[0]?.replace(/['")\s]/g, '');
        if (nextImage) {
            updateLayerBackground(nextLayer, nextMask, nextImage, true);
        }
    }

    // Add theme change listener
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' &&
                (mutation.target.classList.contains('dark-theme') ||
                    mutation.target.classList.contains('light-theme'))) {
                handleThemeChange();
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });

    // Add window resize handler
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleThemeChange, 1000);
    });

    // Expose to global scope
    window.backgroundUtils = {
        updateBackground,
        handleThemeChange
    };

    // Start the background transition
    setInterval(updateBackground, 10000);
})(); 