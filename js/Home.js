// script.js - All JavaScript functionality for the homepage
document.addEventListener('DOMContentLoaded', function() {
  /*runs only after the 
  full HTML content has loaded.
  
  */

      const backgroundElement = document.querySelector('.page-background');
      /*finds the HTML element with the class .page-background*/

   /*   const imageUrls = [ 'Page0.webp', 'page2.jpg','page4.jpeg','page1.jpg','page7.webp','page3.jpeg' ];*/
      const imageUrls = [ 'backgrounds/Page0.webp', 'backgrounds/page2.jpg', 'backgrounds/page4.jpeg', 'backgrounds/page1.jpg', 'backgrounds/page7.webp', 'backgrounds/page3.jpeg' ];
      
      
      /*list of image filenames*/ 

      let currentIndex = 0;/*keeps track of which image is currently showing. */
      let isChanging = false;


// Preload images to prevent delays in switching
const preloadImages = imageUrls.map(url => {
  const img = new Image();
  img.src = url;
  return img;
});
     function changeBackgroundImage() {// checks 
     // if backgroundElement actually exists in the HTML(onterwise then we check null.style)
  if (backgroundElement && !isChanging) {

    isChanging = true;
    
    //  fades out the current image by setting the opacity to 0 (invisible)
    backgroundElement.style.opacity = 0;


    // then we , change the background imageand wait one second
    setTimeout(() => {
      backgroundElement.style.backgroundImage = `url('${imageUrls[currentIndex]}')`;
      /*Wait 1 second before changing the background image.

This gives time for the fade-out effect (opacity becomes 0) to finish*/ 

            setTimeout(() => {// Fade in after the background image is set

        backgroundElement.style.opacity = 1;

        currentIndex = (currentIndex + 1) % imageUrls.length;

        /*moves to the next image.
         When it reaches the end of the list,
          it starts again from the first image (because of % operator).*/
        setTimeout(() => {

          isChanging = false;

        }, 1000);
      }, 50);  // Small delay before fading in
    }, 1000); //  a delay to prevent immediate background changes
  }
}

      setInterval(changeBackgroundImage, 8000);
//run changeBackgroundImage() every 8 seconds
      changeBackgroundImage();
 /* Run it once immediately when the page loads
This makes the first background change happen right away*/

   
        // Dynamic Copyright Year
        document.addEventListener('DOMContentLoaded', function() {
        const copyrightElement = document.querySelector('footer p');
        if (copyrightElement) {
          const currentYear = new Date().getFullYear();
          copyrightElement.textContent = `\u00A9 ${currentYear} Healthcare Website`;
        }   }); 


 

    // --- Wellness Wisdom Card ---
    const showHealthNuggetBtn = document.getElementById('showHealthNuggetBtn');
    const healthNuggetCard = document.getElementById('healthNuggetCard');
    const nuggetContent = document.getElementById('nuggetContent');
    // Ensure closeBtn is only queried if healthNuggetCard exists
    const closeBtn = healthNuggetCard ? healthNuggetCard.querySelector('.close-btn') : null;

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

    let currentNuggetIndex = -1; // To ensure a new one is always shown

    if (showHealthNuggetBtn) { // Only add listener if button exists
        showHealthNuggetBtn.addEventListener('click', () => {
            // If the card is already visible, hide it first, then show a new one
            if (healthNuggetCard && healthNuggetCard.style.display === 'block') {
                healthNuggetCard.style.display = 'none';
                // A tiny delay before showing the next one for smoother transition
                setTimeout(() => displayRandomNugget(), 100);
            } else {
                displayRandomNugget();
            }
        });
    }

    if (closeBtn) { // Only add listener if close button exists
        closeBtn.addEventListener('click', () => {
            if (healthNuggetCard) {
                healthNuggetCard.style.display = 'none';
            }
        });
    }

    function displayRandomNugget() {
        if (!nuggetContent || !healthNuggetCard) return; // Exit if elements not found

        let newIndex;
        // Loop to ensure we get a different message if there's more than one
        do {
            newIndex = Math.floor(Math.random() * healthMessages.length);
        } while (newIndex === currentNuggetIndex && healthMessages.length > 1);

        currentNuggetIndex = newIndex;
        nuggetContent.innerHTML = healthMessages[currentNuggetIndex]; // Use innerHTML for bolding
        healthNuggetCard.style.display = 'block';
    }

});



     




