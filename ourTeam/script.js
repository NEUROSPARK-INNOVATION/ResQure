// Add smooth scrolling for anchor links
document.addEventListener("DOMContentLoaded", () => {
    // This adds a subtle animation when the page loads
    const teamMembers = document.querySelectorAll(".team-member")
  
    teamMembers.forEach((member, index) => {
      // Add a staggered fade-in effect
      member.style.opacity = "0"
      member.style.transform = "translateY(20px)"
  
      setTimeout(() => {
        member.style.transition = "opacity 0.5s ease, transform 0.5s ease"
        member.style.opacity = "1"
        member.style.transform = "translateY(0)"
      }, 100 * index)
    })
  
    // Optional: Add hover sound effect (uncomment if desired)
    
    //   teamMembers.forEach(member => {
    //       member.addEventListener('mouseenter', () => {
    //           // You could add a subtle sound effect here
    //           //const hoverSound = new Audio('hover.mp3');
    //           // hoverSound.volume = 0.2;
    //           // hoverSound.play();
    //       });
    //   });
      
  })
  
  