document.addEventListener("DOMContentLoaded", () => {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle")
    const navbar = document.getElementById("navbar")
  
    menuToggle.addEventListener("click", () => {
      navbar.classList.toggle("active")
      menuToggle.classList.toggle("active")
    })
  
    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll("nav ul li a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navbar.classList.remove("active")
        menuToggle.classList.remove("active")
      })
    })
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")
  
      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })
  
        // Toggle current item
        item.classList.toggle("active")
      })
    })
  
    // Modal functionality
    const modal = document.getElementById("topic-modal")
    const closeModal = document.querySelector(".close-modal")
    const modalContent = document.getElementById("modal-content-container")
    const readMoreButtons = document.querySelectorAll(".card-btn")
  
    // Close modal when clicking the X
    closeModal.addEventListener("click", () => {
      modal.style.display = "none"
    })
  
    // Close modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none"
      }
    })
  
    // Open modal with appropriate content when clicking Read More
    readMoreButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const topic = button.getAttribute("data-topic")
        loadModalContent(topic)
        modal.style.display = "block"
      })
    })
  
    // Load content based on topic
    function loadModalContent(topic) {
      let content = ""
  
      switch (topic) {
        case "menstrual":
          content = `
                      <h2>Menstrual Health</h2>
                      <div class="modal-section">
                          <h3>Common Menstrual Disorders</h3>
                          <p>Menstrual disorders can significantly impact quality of life. Some common conditions include:</p>
                          <ul>
                              <li><strong>Premenstrual Syndrome (PMS):</strong> Physical and emotional symptoms that occur before menstruation.</li>
                              <li><strong>Polycystic Ovary Syndrome (PCOS):</strong> A hormonal disorder causing enlarged ovaries with small cysts.</li>
                              <li><strong>Dysmenorrhea:</strong> Painful menstruation often involving severe cramping.</li>
                              <li><strong>Amenorrhea:</strong> Absence of menstruation.</li>
                              <li><strong>Menorrhagia:</strong> Abnormally heavy or prolonged menstrual bleeding.</li>
                          </ul>
                      </div>
                      <div class="modal-section">
                          <h3>Management Strategies</h3>
                          <p>Various approaches can help manage menstrual health issues:</p>
                          <ul>
                              <li>Regular exercise and physical activity</li>
                              <li>Balanced nutrition with adequate iron intake</li>
                              <li>Stress management techniques</li>
                              <li>Over-the-counter pain relievers for cramps</li>
                              <li>Heat therapy for pain relief</li>
                              <li>Hormonal treatments (prescribed by healthcare providers)</li>
                              <li>Regular check-ups with healthcare providers</li>
                          </ul>
                      </div>
                  `
          break
        case "contraception":
          content = `
                      <h2>Contraception & Family Planning</h2>
                      <div class="modal-section">
                          <h3>Contraceptive Methods</h3>
                          <p>There are many contraceptive options available, each with different effectiveness rates, benefits, and considerations:</p>
                          <ul>
                              <li><strong>Barrier Methods:</strong> Condoms, diaphragms, cervical caps</li>
                              <li><strong>Hormonal Methods:</strong> Pills, patches, rings, injections</li>
                              <li><strong>Long-Acting Reversible Contraceptives:</strong> IUDs, implants</li>
                              <li><strong>Permanent Methods:</strong> Tubal ligation, vasectomy</li>
                              <li><strong>Natural Methods:</strong> Fertility awareness-based methods</li>
                              <li><strong>Emergency Contraception:</strong> Morning-after pill</li>
                          </ul>
                      </div>
                      <div class="modal-section">
                          <h3>Choosing the Right Method</h3>
                          <p>When selecting a contraceptive method, consider:</p>
                          <ul>
                              <li>Effectiveness rate</li>
                              <li>Ease of use</li>
                              <li>Side effects and health considerations</li>
                              <li>Protection against sexually transmitted infections</li>
                              <li>Future fertility plans</li>
                              <li>Personal preferences and lifestyle</li>
                          </ul>
                          <p>Consult with a healthcare provider to determine the most appropriate method for your individual needs.</p>
                      </div>
                  `
          break
        case "pregnancy":
          content = `
                      <h2>Pregnancy & Maternal Health</h2>
                      <div class="modal-section">
                          <h3>Prenatal Care</h3>
                          <p>Proper prenatal care is essential for a healthy pregnancy and includes:</p>
                          <ul>
                              <li>Regular check-ups with healthcare providers</li>
                              <li>Appropriate nutrition and supplementation</li>
                              <li>Monitoring for potential complications</li>
                              <li>Education about pregnancy, childbirth, and infant care</li>
                              <li>Physical activity as recommended by healthcare providers</li>
                              <li>Avoiding harmful substances (alcohol, tobacco, certain medications)</li>
                          </ul>
                      </div>
                      <div class="modal-section">
                          <h3>Common Pregnancy Concerns</h3>
                          <p>Many women experience various symptoms and concerns during pregnancy:</p>
                          <ul>
                              <li>Morning sickness and nausea</li>
                              <li>Fatigue and sleep disturbances</li>
                              <li>Back pain and physical discomfort</li>
                              <li>Gestational diabetes</li>
                              <li>Preeclampsia</li>
                              <li>Emotional and mental health changes</li>
                          </ul>
                          <p>Always discuss any concerns with your healthcare provider promptly.</p>
                      </div>
                  `
          break
        case "sti":
          content = `
                      <h2>Sexually Transmitted Infections & Prevention</h2>
                      <div class="modal-section">
                          <h3>Common STIs</h3>
                          <p>Sexually transmitted infections (STIs) can affect anyone who is sexually active. Common STIs include:</p>
                          <ul>
                              <li>Chlamydia</li>
                              <li>Gonorrhea</li>
                              <li>Syphilis</li>
                              <li>Human Papillomavirus (HPV)</li>
                              <li>Herpes</li>
                              <li>HIV</li>
                              <li>Trichomoniasis</li>
                          </ul>
                      </div>
                      <div class="modal-section">
                          <h3>Prevention Strategies</h3>
                          <p>Preventing STIs involves multiple approaches:</p>
                          <ul>
                              <li>Consistent and correct use of barrier methods (condoms)</li>
                              <li>Regular STI testing</li>
                              <li>Open communication with partners about sexual health</li>
                              <li>Limiting number of sexual partners</li>
                              <li>Vaccination (for HPV and Hepatitis B)</li>
                              <li>Abstinence or mutual monogamy</li>
                          </ul>
                          <p>Early detection and treatment are crucial for managing STIs and preventing complications.</p>
                      </div>
                  `
          break
        case "menopause":
          content = `
                      <h2>Menopause & Hormonal Changes</h2>
                      <div class="modal-section">
                          <h3>Understanding Menopause</h3>
                          <p>Menopause is a natural biological process marking the end of menstrual cycles, typically occurring in the 40s or 50s. The transition includes:</p>
                          <ul>
                              <li><strong>Perimenopause:</strong> The transitional period before menopause</li>
                              <li><strong>Menopause:</strong> Defined as 12 consecutive months without a menstrual period</li>
                              <li><strong>Postmenopause:</strong> The years following menopause</li>
                          </ul>
                      </div>
                      <div class="modal-section">
                          <h3>Common Symptoms</h3>
                          <p>Women may experience various symptoms during the menopausal transition:</p>
                          <ul>
                              <li>Hot flashes and night sweats</li>
                              <li>Sleep disturbances</li>
                              <li>Mood changes</li>
                              <li>Vaginal dryness</li>
                              <li>Decreased bone density</li>
                              <li>Changes in libido</li>
                              <li>Weight changes</li>
                          </ul>
                      </div>
                      <div class="modal-section">
                          <h3>Management Approaches</h3>
                          <p>Various strategies can help manage menopausal symptoms:</p>
                          <ul>
                              <li>Hormone replacement therapy (when appropriate)</li>
                              <li>Non-hormonal medications for specific symptoms</li>
                              <li>Lifestyle modifications (diet, exercise, stress management)</li>
                              <li>Regular health screenings</li>
                              <li>Calcium and vitamin D supplementation for bone health</li>
                              <li>Mind-body practices (yoga, meditation)</li>
                          </ul>
                      </div>
                  `
          break
        default:
          content = "<h2>Information not available</h2><p>Please try another topic.</p>"
      }
  
      modalContent.innerHTML = content
    }
  
    // Form submission handling
    const consultationForm = document.getElementById("consultation-form")
    const newsletterForm = document.getElementById("newsletter-form")
  
    if (consultationForm) {
      consultationForm.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Thank you for your submission! Our team will contact you shortly.")
        consultationForm.reset()
      })
    }
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Thank you for subscribing to our newsletter!")
        newsletterForm.reset()
      })
    }
  
    // Active navigation link based on scroll position
    window.addEventListener("scroll", () => {
      const sections = document.querySelectorAll("section")
      const navLinks = document.querySelectorAll("nav ul li a")
  
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  })
  
  