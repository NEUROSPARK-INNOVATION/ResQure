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
  
  document.addEventListener("DOMContentLoaded", () => {
    // Tab functionality
    const tabBtns = document.querySelectorAll(".tab-btn")
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons and panes
        tabBtns.forEach((b) => b.classList.remove("active"))
        document.querySelectorAll(".tab-pane").forEach((pane) => pane.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        // Show corresponding tab pane
        const tabId = btn.getAttribute("data-tab")
        document.getElementById(tabId).classList.add("active")
      })
    })
  
    // Meditation technique accordion
    const techniqueHeaders = document.querySelectorAll(".technique-header")
  
    techniqueHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const techniqueItem = header.parentElement
  
        // Close all other items
        document.querySelectorAll(".technique-item").forEach((item) => {
          if (item !== techniqueItem) {
            item.classList.remove("active")
          }
        })
  
        // Toggle current item
        techniqueItem.classList.toggle("active")
      })
    })
  
    // Playlist tabs
    const playlistTabs = document.querySelectorAll(".playlist-tab")
  
    playlistTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs and playlists
        playlistTabs.forEach((t) => t.classList.remove("active"))
        document.querySelectorAll(".playlist").forEach((playlist) => playlist.classList.remove("active"))
  
        // Add active class to clicked tab
        tab.classList.add("active")
  
        // Show corresponding playlist
        const playlistId = tab.getAttribute("data-playlist") + "-playlist"
        document.getElementById(playlistId).classList.add("active")
      })
    })
  
    // Level navigation
    const levelNodes = document.querySelectorAll(".level-node")
  
    levelNodes.forEach((node) => {
      node.addEventListener("click", () => {
        // Remove active class from all nodes and content
        levelNodes.forEach((n) => n.classList.remove("active"))
        document.querySelectorAll(".level-content").forEach((content) => content.classList.remove("active"))
  
        // Add active class to clicked node
        node.classList.add("active")
  
        // Show corresponding content
        const levelNum = node.getAttribute("data-level")
        document.getElementById(`level-${levelNum}-content`).classList.add("active")
      })
    })
  
    // Breathing exercise
    const startBreathingBtn = document.getElementById("start-breathing")
    const breathingCircle = document.getElementById("breathing-circle")
    const circleText = breathingCircle.querySelector(".circle-text")
  
    let breathingInterval
    let isBreathing = false
  
    startBreathingBtn.addEventListener("click", () => {
      if (isBreathing) {
        clearInterval(breathingInterval)
        breathingCircle.className = "breathing-visual"
        circleText.textContent = "Breathe"
        startBreathingBtn.textContent = "Start 4-7-8 Breathing"
        isBreathing = false
      } else {
        startBreathingExercise()
        startBreathingBtn.textContent = "Stop Breathing Exercise"
        isBreathing = true
      }
    })
  
    function startBreathingExercise() {
      let phase = 0
      let count = 0
  
      function updateBreathing() {
        if (phase === 0) {
          // Inhale
          breathingCircle.className = "breathing-visual inhale"
          circleText.textContent = `Inhale (${4 - count})`
          count++
          if (count >= 4) {
            count = 0
            phase = 1
          }
        } else if (phase === 1) {
          // Hold
          breathingCircle.className = "breathing-visual hold"
          circleText.textContent = `Hold (${7 - count})`
          count++
          if (count >= 7) {
            count = 0
            phase = 2
          }
        } else if (phase === 2) {
          // Exhale
          breathingCircle.className = "breathing-visual exhale"
          circleText.textContent = `Exhale (${8 - count})`
          count++
          if (count >= 8) {
            count = 0
            phase = 0
          }
        }
      }
  
      updateBreathing()
      breathingInterval = setInterval(updateBreathing, 1000)
    }
  
    // Meditation timer
    const timerModal = document.getElementById("meditation-timer-modal")
    const timerText = document.getElementById("timer-text")
    const pauseTimerBtn = document.getElementById("pause-timer")
    const stopTimerBtn = document.getElementById("stop-timer")
    const closeModalBtns = document.querySelectorAll(".close-modal")
  
    let timerInterval
    let remainingTime
    let isPaused = false
  
    document.querySelectorAll(".start-timer").forEach((btn) => {
      btn.addEventListener("click", () => {
        const minutes = Number.parseInt(btn.getAttribute("data-minutes"))
        startTimer(minutes)
        timerModal.style.display = "block"
      })
    })
  
    closeModalBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const modal = this.closest(".modal")
        modal.style.display = "none"
  
        if (modal === timerModal) {
          clearInterval(timerInterval)
        }
      })
    })
  
    window.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        e.target.style.display = "none"
  
        if (e.target === timerModal) {
          clearInterval(timerInterval)
        }
      }
    })
  
    pauseTimerBtn.addEventListener("click", function () {
      if (isPaused) {
        // Resume timer
        startTimer(remainingTime / 60)
        this.textContent = "Pause"
        isPaused = false
      } else {
        // Pause timer
        clearInterval(timerInterval)
        this.textContent = "Resume"
        isPaused = true
      }
    })
  
    stopTimerBtn.addEventListener("click", () => {
      clearInterval(timerInterval)
      timerModal.style.display = "none"
    })
  
    function startTimer(minutes) {
      clearInterval(timerInterval)
  
      const totalSeconds = minutes * 60
      remainingTime = totalSeconds
  
      updateTimerDisplay(remainingTime)
  
      timerInterval = setInterval(() => {
        remainingTime--
        updateTimerDisplay(remainingTime)
  
        if (remainingTime <= 0) {
          clearInterval(timerInterval)
          timerText.textContent = "Done!"
          pauseTimerBtn.disabled = true
        }
      }, 1000)
    }
  
    function updateTimerDisplay(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      timerText.textContent = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
  
    // Meditation challenges
    const challengeModal = document.getElementById("challenge-modal")
    const challengeContent = document.getElementById("challenge-content")
  
    document.querySelectorAll(".view-challenge").forEach((btn) => {
      btn.addEventListener("click", () => {
        const challenge = btn.getAttribute("data-challenge")
        loadChallengeContent(challenge)
        challengeModal.style.display = "block"
      })
    })
  
    function loadChallengeContent(challenge) {
      let content = ""
  
      switch (challenge) {
        case "beginner":
          content = `
                      <h3>7-Day Beginner Meditation Challenge</h3>
                      <p>This challenge is perfect for those new to meditation. Each day includes a 5-minute guided practice to help you build a consistent habit.</p>
                      <div class="challenge-schedule">
                          <div class="challenge-day">
                              <h4>Day 1: Breath Awareness</h4>
                              <p>Focus on your natural breathing pattern to anchor your attention to the present moment.</p>
                          </div>
                          <div class="challenge-day">
                              <h4>Day 2: Body Scan</h4>
                              <p>Bring awareness to different parts of your body, noticing sensations without judgment.</p>
                          </div>
                          <div class="challenge-day">
                              <h4>Day 3: Mindful Listening</h4>
                              <p>Practice being fully present with sounds in your environment.</p>
                          </div>
                          <div class="challenge-day">
                              <h4>Day 4: Gratitude</h4>
                              <p>Cultivate appreciation by focusing on things you're grateful for in your life.</p>
                          </div>
                          <div class="challenge-day">
                              <h4>Day 5: Loving-Kindness</h4>
                              <p>Direct positive wishes toward yourself and others to foster compassion.</p>
                          </div>
                          <div class="challenge-day">
                              <h4>Day 6: Mindful Movement</h4>
                              <p>Practice being fully present during gentle stretching or walking.</p>
                          </div>
                          <div class="challenge-day">
                              <h4>Day 7: Open Awareness</h4>
                              <p>Allow your attention to rest in a state of open, non-judgmental awareness.</p>
                          </div>
                      </div>
                      <button class="btn primary-btn">Start Challenge</button>
                  `
          break
        case "intermediate":
          content = `
                      <h3>14-Day Intermediate Meditation Challenge</h3>
                      <p>This two-week challenge builds on basic meditation skills with 10-minute daily practices to deepen your experience.</p>
                      <div class="challenge-schedule">
                          <h4>Week 1: Stabilizing Attention</h4>
                          <ul>
                              <li><strong>Day 1-2:</strong> Focused breath meditation</li>
                              <li><strong>Day 3-4:</strong> Body scan with detailed awareness</li>
                              <li><strong>Day 5-6:</strong> Counting breaths technique</li>
                              <li><strong>Day 7:</strong> Working with distractions</li>
                          </ul>
                          <h4>Week 2: Cultivating Qualities</h4>
                          <ul>
                              <li><strong>Day 8-9:</strong> Heart-centered gratitude practice</li>
                              <li><strong>Day 10-11:</strong> Compassion meditation</li>
                              <li><strong>Day 12-13:</strong> Working with difficult emotions</li>
                              <li><strong>Day 14:</strong> Integrating mindfulness into daily life</li>
                          </ul>
                      </div>
                      <button class="btn primary-btn">Start Challenge</button>
                  `
          break
        case "advanced":
          content = `
                      <h3>21-Day Advanced Meditation Challenge</h3>
                      <p>This three-week program features 15-minute daily practices designed to develop deeper awareness and emotional regulation.</p>
                      <div class="challenge-schedule">
                          <h4>Week 1: Deepening Concentration</h4>
                          <ul>
                              <li><strong>Day 1-3:</strong> Single-pointed focus meditation</li>
                              <li><strong>Day 4-5:</strong> Working with subtle sensations</li>
                              <li><strong>Day 6-7:</strong> Expanding and contracting awareness</li>
                          </ul>
                          <h4>Week 2: Insight Practices</h4>
                          <ul>
                              <li><strong>Day 8-10:</strong> Observing thoughts without attachment</li>
                              <li><strong>Day 11-12:</strong> Investigating impermanence</li>
                              <li><strong>Day 13-14:</strong> Non-self exploration</li>
                          </ul>
                          <h4>Week 3: Integration</h4>
                          <ul>
                              <li><strong>Day 15-17:</strong> Equanimity practice</li>
                              <li><strong>Day 18-19:</strong> Choiceless awareness</li>
                              <li><strong>Day 20-21:</strong> Integrating meditation into all activities</li>
                          </ul>
                      </div>
                      <button class="btn primary-btn">Start Challenge</button>
                  `
          break
      }
  
      challengeContent.innerHTML = content
    }
  
    // Self-assessment functionality
    const startAssessmentBtn = document.getElementById("start-assessment")
    const assessmentIntro = document.querySelector(".assessment-intro")
    const assessmentQuiz = document.getElementById("assessment-quiz")
    const questionContainer = document.getElementById("question-container")
    const prevQuestionBtn = document.getElementById("prev-question")
    const nextQuestionBtn = document.getElementById("next-question")
    const assessmentResults = document.getElementById("assessment-results")
    const resultsContent = document.getElementById("results-content")
    const retakeAssessmentBtn = document.getElementById("retake-assessment")
  
    // Sample assessment questions
    const questions = [
      {
        question: "How often have you felt overwhelmed by your responsibilities in the past month?",
        options: [
          "Never",
          "Rarely (once or twice)",
          "Sometimes (once a week)",
          "Often (several times a week)",
          "Very often (almost daily)",
        ],
      },
      {
        question: "How would you rate your sleep quality over the past two weeks?",
        options: [
          "Excellent - I sleep well and wake refreshed",
          "Good - I generally sleep well with occasional disruptions",
          "Fair - I have some trouble falling or staying asleep",
          "Poor - I frequently have trouble sleeping",
          "Very poor - I struggle to sleep most nights",
        ],
      },
      {
        question:
          "How often do you experience physical symptoms of stress (headaches, muscle tension, digestive issues)?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Very often"],
      },
      {
        question: "How difficult is it for you to relax when you have time to yourself?",
        options: [
          "Not difficult at all - I can relax easily",
          "Slightly difficult - It takes a little time",
          "Moderately difficult - It takes significant effort",
          "Very difficult - I rarely feel fully relaxed",
          "Extremely difficult - I can't remember the last time I felt relaxed",
        ],
      },
      {
        question: "How often do you engage in activities specifically for your mental well-being?",
        options: ["Daily", "Several times a week", "Once a week", "Rarely", "Never"],
      },
    ]
  
    let currentQuestion = 0
    let answers = []
  
    startAssessmentBtn.addEventListener("click", () => {
      assessmentIntro.classList.add("hidden")
      assessmentQuiz.classList.remove("hidden")
      loadQuestion(0)
    })
  
    prevQuestionBtn.addEventListener("click", () => {
      if (currentQuestion > 0) {
        currentQuestion--
        loadQuestion(currentQuestion)
      }
    })
  
    nextQuestionBtn.addEventListener("click", () => {
      // Save current answer if selected
      const selectedOption = document.querySelector('input[name="option"]:checked')
      if (selectedOption) {
        answers[currentQuestion] = Number.parseInt(selectedOption.value)
      }
  
      if (currentQuestion < questions.length - 1) {
        currentQuestion++
        loadQuestion(currentQuestion)
      } else {
        showResults()
      }
    })
  
    retakeAssessmentBtn.addEventListener("click", () => {
      assessmentResults.classList.add("hidden")
      assessmentIntro.classList.remove("hidden")
      currentQuestion = 0
      answers = []
    })
  
    function loadQuestion(index) {
      const question = questions[index]
  
      let optionsHTML = ""
      question.options.forEach((option, i) => {
        const checked = answers[index] === i ? "checked" : ""
        optionsHTML += `
                  <div class="option ${answers[index] === i ? "selected" : ""}">
                      <input type="radio" name="option" id="option${i}" value="${i}" ${checked}>
                      <label for="option${i}">${option}</label>
                  </div>
              `
      })
  
      questionContainer.innerHTML = `
              <div class="question">
                  <h4>${index + 1}. ${question.question}</h4>
                  <div class="options">
                      ${optionsHTML}
                  </div>
              </div>
          `
  
      // Update option selection behavior
      document.querySelectorAll(".option").forEach((option) => {
        option.addEventListener("click", function () {
          document.querySelectorAll(".option").forEach((opt) => opt.classList.remove("selected"))
          this.classList.add("selected")
          this.querySelector("input").checked = true
        })
      })
  
      // Update navigation buttons
      prevQuestionBtn.disabled = index === 0
      nextQuestionBtn.textContent = index === questions.length - 1 ? "Finish" : "Next"
    }
  
    function showResults() {
      assessmentQuiz.classList.add("hidden")
      assessmentResults.classList.remove("hidden")
  
      // Calculate score (higher = more stress)
      let totalScore = 0
      answers.forEach((answer) => {
        if (answer !== undefined) {
          // For question 5, reverse the scoring (higher frequency of self-care = lower stress)
          if (answers.indexOf(answer) === 4) {
            totalScore += 4 - answer
          } else {
            totalScore += answer
          }
        }
      })
  
      // Determine stress level
      let stressLevel, recommendations
      if (totalScore <= 5) {
        stressLevel = "low"
        recommendations = `
                  <p>Your stress levels appear to be well-managed. Continue with your current self-care practices.</p>
                  <h5>Recommendations:</h5>
                  <ul>
                      <li>Maintain your current wellness routines</li>
                      <li>Consider trying new mindfulness practices to further enhance well-being</li>
                      <li>Share your effective strategies with others who might benefit</li>
                  </ul>
              `
      } else if (totalScore <= 12) {
        stressLevel = "moderate"
        recommendations = `
                  <p>You're experiencing moderate stress levels that could benefit from additional self-care.</p>
                  <h5>Recommendations:</h5>
                  <ul>
                      <li>Incorporate regular relaxation techniques into your routine</li>
                      <li>Consider establishing clearer boundaries in demanding situations</li>
                      <li>Prioritize consistent sleep patterns</li>
                      <li>Explore our Level 2 wellness practices</li>
                  </ul>
              `
      } else {
        stressLevel = "high"
        recommendations = `
                  <p>Your responses indicate higher stress levels that deserve attention and care.</p>
                  <h5>Recommendations:</h5>
                  <ul>
                      <li>Consider speaking with a mental health professional</li>
                      <li>Implement daily stress reduction practices</li>
                      <li>Evaluate current commitments and consider where to reduce pressure</li>
                      <li>Prioritize physical exercise and quality sleep</li>
                      <li>Begin with our Level 1 wellness practices and breathing exercises</li>
                  </ul>
              `
      }
  
      resultsContent.innerHTML = `
              <div class="result-category ${stressLevel}">
                  <h4>Stress Level: ${stressLevel.charAt(0).toUpperCase() + stressLevel.slice(1)}</h4>
                  ${recommendations}
              </div>
              <p class="result-disclaimer">Note: This assessment is not a diagnostic tool. It's designed to help you reflect on your current stress levels and well-being. For personalized advice, please consult with a healthcare professional.</p>
          `
    }
  
    // Form submission handling
    const contactForm = document.getElementById("contact-form")
  
    // Video placeholder click
    const videoPlaceholders = document.querySelectorAll(".video-placeholder")
  
    videoPlaceholders.forEach((placeholder) => {
      placeholder.addEventListener("click", () => {
        alert("Video would play here in a production environment.")
      })
    })
  
    // Playlist items click
    // const playlistItems = document.querySelectorAll(".playlist-item")
  
    // playlistItems.forEach((item) => {
    //   item.addEventListener("click", () => {
    //     alert("Video would play here in a production environment.")
    //   })
    // })
  
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
  
  