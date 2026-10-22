
// Home.js - All JavaScript functionality for the homepage

document.addEventListener('DOMContentLoaded', function () {

    // Find the element that displays the background slideshow.
    const backgroundElement = document.querySelector('.page-background');

    /*
     * Image paths are relative to pages/HomePage.HTML,
     * not to the location of this JavaScript file.
     */
    const imageUrls = [
        '../backgrounds/Page0.webp',
        '../backgrounds/page2.jpg',
        '../backgrounds/page4.jpeg',
        '../backgrounds/page1.jpg',
        '../backgrounds/page7.webp',
        '../backgrounds/page3.jpeg'
    ];

    let currentIndex = 0;
    let isChanging = false;

    // Preload the background images to reduce delays during transitions.
    const preloadImages = imageUrls.map(function (url) {
        const img = new Image();
        img.src = url;
        return img;
    });

    // Change the background image with a fade transition.
    function changeBackgroundImage() {
        if (!backgroundElement || isChanging) {
            return;
        }

        isChanging = true;

        // Fade out the current background.
        backgroundElement.style.opacity = '0';

        setTimeout(function () {
            const nextImage = preloadImages[currentIndex];

            // Only change to an image that loaded successfully.
            if (nextImage && nextImage.complete && nextImage.naturalWidth > 0) {
                backgroundElement.style.backgroundImage =
                    `url("${imageUrls[currentIndex]}")`;
            }

            // Fade the background back in.
            backgroundElement.style.opacity = '1';

            // Move to the next image for the next transition.
            currentIndex = (currentIndex + 1) % imageUrls.length;

            // Prevent another transition from starting too early.
            setTimeout(function () {
                isChanging = false;
            }, 1000);

        }, 1000);
    }

    // Start the slideshow and repeat every 8 seconds.
    if (backgroundElement && imageUrls.length > 0) {
        setInterval(changeBackgroundImage, 8000);
    }

    // Update the copyright year.
    // Do not nest another DOMContentLoaded listener here.
    const copyrightElement = document.querySelector('footer p');

    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent =
            `\u00A9 ${currentYear} Healthcare Website`;
    }

    // --- Wellness Wisdom Card ---

    const showHealthNuggetBtn =
        document.getElementById('showHealthNuggetBtn');

    const healthNuggetCard =
        document.getElementById('healthNuggetCard');

    const nuggetContent =
        document.getElementById('nuggetContent');

    // Find the close button only if the card exists.
    const closeBtn = healthNuggetCard
        ? healthNuggetCard.querySelector('.close-btn')
        : null;

    const healthMessages = [
        "**Medical Fact:** Regular hand washing is one of the most effective ways to prevent the spread of germs.",
        "**Motivation:** 'The greatest wealth is health.' – Virgil. Prioritize your well-being today!",
        "**Importance:** A balanced diet fuels your body and mind, boosting your overall health and productivity.",
        "**Medical Fact:** Aim for at least 30 minutes of moderate-intensity exercise most days of the week.",
        "**Motivation:** 'To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear.' – Buddha.",
        "**Importance:** Adequate sleep is crucial for cognitive function, mood regulation, and immune system strength.",
        "**Medical Fact:** Limiting processed foods and sugars can significantly reduce your risk of chronic diseases.",
        "**Motivation:** 'Take care of your body. It’s the only place you have to live.' – Jim Rohn. Invest in yourself!",
        "**Importance:** Regular check-ups with your doctor can help detect and prevent health issues early.",
        "**Medical Fact:** Staying hydrated improves energy levels, brain function, and skin health.",
        "**Motivation:** 'Your body is a temple, keep it pure and clean for the soul to reside in.' – B.K.S. Iyengar.",
        "**Importance:** Mental health is as vital as physical health; don't hesitate to seek support if needed."
    ];

    let currentNuggetIndex = -1;

    // Display a wellness message when the button is clicked.
    if (showHealthNuggetBtn) {
        showHealthNuggetBtn.addEventListener('click', function () {
            if (
                healthNuggetCard &&
                healthNuggetCard.style.display === 'block'
            ) {
                healthNuggetCard.style.display = 'none';

                // Brief delay before displaying another message.
                setTimeout(displayRandomNugget, 100);
            } else {
                displayRandomNugget();
            }
        });
    }

    // Close the wellness card.
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            if (healthNuggetCard) {
                healthNuggetCard.style.display = 'none';
            }
        });
    }

    // Select a random message different from the previous one.
    function displayRandomNugget() {
        if (!nuggetContent || !healthNuggetCard) {
            return;
        }

        let newIndex;

        do {
            newIndex = Math.floor(Math.random() * healthMessages.length);
        } while (
            newIndex === currentNuggetIndex &&
            healthMessages.length > 1
        );

        currentNuggetIndex = newIndex;

        // Convert the Markdown-style bold markers into HTML.
        const message = healthMessages[currentNuggetIndex];
        nuggetContent.innerHTML = message.replace(
            /\*\*(.*?)\*\*/g,
            '<strong>$1</strong>'
        );

        healthNuggetCard.style.display = 'block';
    }

});
