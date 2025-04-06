document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Daily Affirmation
    const affirmations = [
        "You are worthy of love and deserve to take care of yourself.",
        "Your needs matter. It's okay to put yourself first.",
        "You are enough, just as you are right now.",
        "Taking time for yourself is not selfish, it's necessary.",
        "Small steps lead to big changes. Be patient with yourself.",
        "Your body deserves respect and care.",
        "It's okay to set boundaries and say no.",
        "You are stronger than you think.",
        "Today is a new opportunity to be kind to yourself.",
        "Self-care is how you take your power back."
    ];
    
    const dailyAffirmation = document.getElementById('daily-affirmation');
    const newAffirmationBtn = document.getElementById('new-affirmation-btn');
    
    if (dailyAffirmation && newAffirmationBtn) {
        // Set initial affirmation
        dailyAffirmation.textContent = getRandomItem(affirmations);
        
        // New affirmation button
        newAffirmationBtn.addEventListener('click', function() {
            dailyAffirmation.textContent = getRandomItem(affirmations);
        });
    }
    
    // Daily Tips
    const selfCareTips = [
        "Take 5 minutes to practice deep breathing. Inhale for 4 counts, hold for 4, and exhale for 6.",
        "Drink a glass of water as soon as you wake up to hydrate your body.",
        "Take a short walk outside to get fresh air and sunlight.",
        "Write down three things you're grateful for today.",
        "Stretch your body for 5 minutes to release tension.",
        "Put your phone on 'Do Not Disturb' for an hour and focus on yourself.",
        "Take a warm bath with essential oils to relax your muscles.",
        "Listen to your favorite uplifting song and dance like nobody's watching.",
        "Practice mindful eating by savoring each bite of your meal.",
        "Set a bedtime alarm to ensure you get enough sleep tonight."
    ];
    
    const dailyTip = document.getElementById('daily-tip');
    const newTipBtn = document.getElementById('new-tip-btn');
    
    if (dailyTip && newTipBtn) {
        // Set initial tip
        dailyTip.textContent = getRandomItem(selfCareTips);
        
        // New tip button
        newTipBtn.addEventListener('click', function() {
            dailyTip.textContent = getRandomItem(selfCareTips);
        });
    }
    
    // Personalized Self-Care Plan
    const questionnaire = document.getElementById('questionnaire');
    const planResult = document.getElementById('plan-result');
    const planContent = document.getElementById('plan-content');
    const savePlanBtn = document.getElementById('save-plan-btn');
    const restartBtn = document.getElementById('restart-btn');
    const navButtons = document.getElementById('nav-buttons');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (questionnaire) {
        const questions = document.querySelectorAll('.question');
        let currentQuestion = 0;
        let answers = {};
        
        // Show first question and navigation buttons
        if (questions.length > 0) {
            questions[0].classList.remove('hidden');
            navButtons.classList.remove('hidden');
        }
        
        // Option buttons
        const optionBtns = document.querySelectorAll('.option-btn');
        optionBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove selected class from all buttons in this question
                const questionId = this.closest('.question').id;
                const questionBtns = document.querySelectorAll(`#${questionId} .option-btn`);
                questionBtns.forEach(qBtn => qBtn.classList.remove('selected'));
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Save answer
                const questionNumber = questionId.split('-')[1];
                answers[questionNumber] = this.dataset.value;
            });
        });
        
        // Navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function() {
                if (currentQuestion > 0) {
                    questions[currentQuestion].classList.add('hidden');
                    currentQuestion--;
                    questions[currentQuestion].classList.remove('hidden');
                    
                    // Hide prev button on first question
                    if (currentQuestion === 0) {
                        prevBtn.style.visibility = 'hidden';
                    }
                    
                    // Change next button text
                    nextBtn.textContent = 'Next';
                }
            });
            
            nextBtn.addEventListener('click', function() {
                // If we're on the last question and have an answer, show results
                if (currentQuestion === questions.length - 1 && answers[currentQuestion + 1]) {
                    showPlanResults();
                    return;
                }
                
                // If we have an answer for the current question, move to next
                if (answers[currentQuestion + 1]) {
                    questions[currentQuestion].classList.add('hidden');
                    currentQuestion++;
                    
                    // If there are more questions, show the next one
                    if (currentQuestion < questions.length) {
                        questions[currentQuestion].classList.remove('hidden');
                        prevBtn.style.visibility = 'visible';
                        
                        // If this is the last question, change next button text
                        if (currentQuestion === questions.length - 1) {
                            nextBtn.textContent = 'Get My Plan';
                        }
                    }
                } else {
                    // Alert user to select an option
                    alert('Please select an option to continue.');
                }
            });
            
            // Initially hide prev button
            prevBtn.style.visibility = 'hidden';
        }
        
        // Generate plan based on answers
        function showPlanResults() {
            questionnaire.classList.add('hidden');
            planResult.classList.remove('hidden');
            
            // Generate plan content based on answers
            let planHTML = '<div class="plan-section">';
            
            // Focus area
            const focusArea = answers['1'];
            planHTML += `<h4>Your Focus Area: ${capitalizeFirstLetter(focusArea)} Well-being</h4>`;
            planHTML += '<p>Based on your responses, here are personalized recommendations:</p>';
            
            // Time commitment
            const timeCommitment = answers['2'];
            planHTML += `<h4>Daily Time Commitment: ${timeCommitment}</h4>`;
            
            // Stress level
            const stressLevel = answers['3'];
            planHTML += `<h4>Current Stress Level: ${capitalizeFirstLetter(stressLevel)}</h4>`;
            
            // Recommendations based on focus area
            planHTML += '<h4>Recommended Activities:</h4><ul>';
            
            if (focusArea === 'mental') {
                planHTML += '<li>5-minute mindfulness meditation each morning</li>';
                planHTML += '<li>Journaling for 10 minutes before bed</li>';
                planHTML += '<li>Take short mental breaks throughout the day</li>';
                planHTML += '<li>Read a book for pleasure for 15 minutes</li>';
            } else if (focusArea === 'physical') {
                planHTML += '<li>10-minute morning stretch routine</li>';
                planHTML += '<li>Take a 15-minute walk during lunch break</li>';
                planHTML += '<li>Drink 8 glasses of water throughout the day</li>';
                planHTML += '<li>Prepare a nutritious meal</li>';
            } else if (focusArea === 'emotional') {
                planHTML += '<li>Practice gratitude by listing 3 things you\'re thankful for</li>';
                planHTML += '<li>Connect with a loved one for 15 minutes</li>';
                planHTML += '<li>Set healthy boundaries with work and relationships</li>';
                planHTML += '<li>Listen to uplifting music or podcasts</li>';
            } else if (focusArea === 'spiritual') {
                planHTML += '<li>Spend 10 minutes in quiet reflection or prayer</li>';
                planHTML += '<li>Connect with nature for 15 minutes</li>';
                planHTML += '<li>Practice mindful breathing throughout the day</li>';
                planHTML += '<li>Read inspirational literature</li>';
            }
            
            planHTML += '</ul>';
            
            // Stress management recommendations
            if (stressLevel === 'high' || stressLevel === 'extreme') {
                planHTML += '<h4>Stress Management Recommendations:</h4><ul>';
                planHTML += '<li>Practice deep breathing exercises 3 times daily</li>';
                planHTML += '<li>Consider limiting caffeine and screen time</li>';
                planHTML += '<li>Prioritize 7-8 hours of sleep</li>';
                planHTML += '<li>Try the guided meditation in our app</li>';
                planHTML += '</ul>';
            }
            
            planHTML += '</div>';
            
            // Set the plan content
            planContent.innerHTML = planHTML;
        }
        
        // Save plan button
        if (savePlanBtn) {
            savePlanBtn.addEventListener('click', function() {
                alert('Your personalized self-care plan has been saved! You can access it anytime from your profile.');
            });
        }
        
        // Restart button
        if (restartBtn) {
            restartBtn.addEventListener('click', function() {
                // Reset answers
                answers = {};
                currentQuestion = 0;
                
                // Reset selected options
                optionBtns.forEach(btn => btn.classList.remove('selected'));
                
                // Hide all questions except the first one
                questions.forEach((q, index) => {
                    if (index === 0) {
                        q.classList.remove('hidden');
                    } else {
                        q.classList.add('hidden');
                    }
                });
                
                // Reset navigation buttons
                prevBtn.style.visibility = 'hidden';
                nextBtn.textContent = 'Next';
                
                // Show questionnaire, hide results
                planResult.classList.add('hidden');
                questionnaire.classList.remove('hidden');
                navButtons.classList.remove('hidden');
            });
        }
    }
    
    // Self-Care Routine Builder
    const addActivityBtn = document.getElementById('add-activity-btn');
    const routineItems = document.getElementById('routine-items');
    const routineEmptyState = document.getElementById('routine-empty-state');
    const activityNameInput = document.getElementById('activity-name');
    const activityCategorySelect = document.getElementById('activity-category');
    const activityDurationInput = document.getElementById('activity-duration');
    const activityTimeSelect = document.getElementById('activity-time');
    
    if (addActivityBtn && routineItems) {
        // Load saved routine from localStorage
        loadRoutine();
        
        // Add activity button
        addActivityBtn.addEventListener('click', function() {
            if (!activityNameInput.value) {
                alert('Please enter an activity name.');
                return;
            }
            
            // Create new activity item
            const activityItem = document.createElement('li');
            activityItem.className = 'routine-item';
            
            // Get category icon
            let categoryIcon = '';
            switch (activityCategorySelect.value) {
                case 'mental':
                    categoryIcon = 'fa-brain';
                    break;
                case 'physical':
                    categoryIcon = 'fa-walking';
                    break;
                case 'emotional':
                    categoryIcon = 'fa-heart';
                    break;
                case 'spiritual':
                    categoryIcon = 'fa-spa';
                    break;
                default:
                    categoryIcon = 'fa-check';
            }
            
            // Create activity HTML
            activityItem.innerHTML = `
                <div class="routine-item-content">
                    <div class="routine-item-icon">
                        <i class="fas ${categoryIcon}"></i>
                    </div>
                    <div class="routine-item-details">
                        <h4>${activityNameInput.value}</h4>
                        <p>${activityDurationInput.value} minutes • ${capitalizeFirstLetter(activityTimeSelect.value)}</p>
                    </div>
                </div>
                <div class="routine-item-actions">
                    <button class="complete-btn"><i class="fas fa-check"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // Add to routine list
            routineItems.appendChild(activityItem);
            
            // Hide empty state
            if (routineEmptyState) {
                routineEmptyState.classList.add('hidden');
            }
            
            // Save routine to localStorage
            saveRoutine();
            
            // Clear form
            activityNameInput.value = '';
            activityDurationInput.value = '10';
            
            // Add event listeners to buttons
            const deleteBtn = activityItem.querySelector('.delete-btn');
            const completeBtn = activityItem.querySelector('.complete-btn');
            
            deleteBtn.addEventListener('click', function() {
                routineItems.removeChild(activityItem);
                
                // Show empty state if no items
                if (routineItems.children.length === 0 && routineEmptyState) {
                    routineEmptyState.classList.remove('hidden');
                }
                
                // Save routine to localStorage
                saveRoutine();
            });
            
            completeBtn.addEventListener('click', function() {
                activityItem.classList.toggle('completed');
                saveRoutine();
            });
        });
        
        // Save routine to localStorage
        function saveRoutine() {
            const routineData = [];
            const routineItemElements = document.querySelectorAll('.routine-item');
            
            routineItemElements.forEach(item => {
                const name = item.querySelector('h4').textContent;
                const details = item.querySelector('p').textContent;
                const isCompleted = item.classList.contains('completed');
                const category = getCategoryFromIcon(item.querySelector('.routine-item-icon i').className);
                
                routineData.push({
                    name,
                    details,
                    category,
                    isCompleted
                });
            });
            
            localStorage.setItem('selfCareRoutine', JSON.stringify(routineData));
        }
        
        // Load routine from localStorage
        function loadRoutine() {
            const savedRoutine = localStorage.getItem('selfCareRoutine');
            
            if (savedRoutine && routineItems) {
                const routineData = JSON.parse(savedRoutine);
                
                if (routineData.length > 0 && routineEmptyState) {
                    routineEmptyState.classList.add('hidden');
                }
                
                routineData.forEach(item => {
                    const activityItem = document.createElement('li');
                    activityItem.className = 'routine-item';
                    
                    if (item.isCompleted) {
                        activityItem.classList.add('completed');
                    }
                    
                    // Get category icon
                    let categoryIcon = '';
                    switch (item.category) {
                        case 'mental':
                            categoryIcon = 'fa-brain';
                            break;
                        case 'physical':
                            categoryIcon = 'fa-walking';
                            break;
                        case 'emotional':
                            categoryIcon = 'fa-heart';
                            break;
                        case 'spiritual':
                            categoryIcon = 'fa-spa';
                            break;
                        default:
                            categoryIcon = 'fa-check';
                    }
                    
                    // Create activity HTML
                    activityItem.innerHTML = `
                        <div class="routine-item-content">
                            <div class="routine-item-icon">
                                <i class="fas ${categoryIcon}"></i>
                            </div>
                            <div class="routine-item-details">
                                <h4>${item.name}</h4>
                                <p>${item.details}</p>
                            </div>
                        </div>
                        <div class="routine-item-actions">
                            <button class="complete-btn"><i class="fas fa-check"></i></button>
                            <button class="delete-btn"><i class="fas fa-trash"></i></button>
                        </div>
                    `;
                    
                    // Add to routine list
                    routineItems.appendChild(activityItem);
                    
                    // Add event listeners to buttons
                    const deleteBtn = activityItem.querySelector('.delete-btn');
                    const completeBtn = activityItem.querySelector('.complete-btn');
                    
                    deleteBtn.addEventListener('click', function() {
                        routineItems.removeChild(activityItem);
                        
                        // Show empty state if no items
                        if (routineItems.children.length === 0 && routineEmptyState) {
                            routineEmptyState.classList.remove('hidden');
                        }
                        
                        // Save routine to localStorage
                        saveRoutine();
                    });
                    
                    completeBtn.addEventListener('click', function() {
                        activityItem.classList.toggle('completed');
                        saveRoutine();
                    });
                });
            }
        }
        
        // Get category from icon class
        function getCategoryFromIcon(iconClass) {
            if (iconClass.includes('fa-brain')) return 'mental';
            if (iconClass.includes('fa-walking')) return 'physical';
            if (iconClass.includes('fa-heart')) return 'emotional';
            if (iconClass.includes('fa-spa')) return 'spiritual';
            return 'other';
        }
    }
    
    // Self-Care Challenges
    const challengeBtns = document.querySelectorAll('.challenge-btn');
    const activeChallenge = document.getElementById('active-challenge');
    const activeChallengeTitle = document.getElementById('active-challenge-title');
    const challengeProgressFill = document.getElementById('challenge-progress-fill');
    const challengeProgressText = document.getElementById('challenge-progress-text');
    const todayTaskDescription = document.getElementById('today-task-description');
    const completeTaskBtn = document.getElementById('complete-task-btn');
    const upcomingTasksList = document.getElementById('upcoming-tasks-list');
    
    if (challengeBtns.length > 0 && activeChallenge) {
        // Challenge data
        const challenges = {
            'mindfulness': {
                title: '7-Day Mindfulness Challenge',
                days: 7,
                tasks: [
                    'Day 1: 5-minute meditation',
                    'Day 2: Mindful eating practice',
                    'Day 3: Gratitude journaling',
                    'Day 4: Body scan meditation',
                    'Day 5: Mindful walking',
                    'Day 6: Digital detox for 1 hour',
                    'Day 7: Mindful breathing exercises'
                ]
            },
            'self-love': {
                title: '30-Day Self-Love Challenge',
                days: 30,
                tasks: [
                    'Day 1: Write 3 things you love about yourself',
                    'Day 2: Take a relaxing bath or shower',
                    'Day 3: Try a new healthy recipe',
                    'Day 4: Compliment yourself in the mirror',
                    'Day 5: Do something creative you enjoy',
                    'Day 6: Practice saying no to something',
                    'Day 7: Buy yourself flowers or a small gift',
                    'Day 8: Take a social media break',
                    'Day 9: Go for a nature walk',
                    'Day 10: Write a forgiveness letter to yourself',
                    'Day 11: Try a new form of movement',
                    'Day 12: Declutter one space in your home',
                    'Day 13: Listen to uplifting music',
                    'Day 14: Practice positive affirmations',
                    'Day 15: Connect with a supportive friend',
                    'Day 16: Try a new self-care activity',
                    'Day 17: Set a healthy boundary',
                    'Day 18: Get enough sleep tonight',
                    'Day 19: Drink plenty of water all day',
                    'Day 20: Do a random act of kindness',
                    'Day 21: Take yourself on a date',
                    'Day 22: Practice deep breathing',
                    'Day 23: Write down your achievements',
                    'Day 24: Try a new relaxation technique',
                    'Day 25: Spend time with pets or plants',
                    'Day 26: Create a vision board',
                    'Day 27: Practice mindful eating',
                    'Day 28: Unplug from technology for 2 hours',
                    'Day 29: Do something that makes you laugh',
                    'Day 30: Reflect on your journey and growth'
                ]
            }
        };
        
        // Load active challenge from localStorage
        loadActiveChallenge();
        
        // Challenge buttons
        challengeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const challengeType = this.dataset.challenge;
                const challenge = challenges[challengeType];
                
                if (challenge) {
                    // Set active challenge
                    localStorage.setItem('activeChallenge', JSON.stringify({
                        type: challengeType,
                        currentDay: 1,
                        completedDays: []
                    }));
                    
                    // Load the challenge
                    loadActiveChallenge();
                }
            });
        });
        
        // Complete task button
        if (completeTaskBtn) {
            completeTaskBtn.addEventListener('click', function() {
                const activeChallenge = JSON.parse(localStorage.getItem('activeChallenge'));
                
                if (activeChallenge) {
                    // Add current day to completed days if not already completed
                    if (!activeChallenge.completedDays.includes(activeChallenge.currentDay)) {
                        activeChallenge.completedDays.push(activeChallenge.currentDay);
                        
                        // Move to next day if not at the end
                        const challenge = challenges[activeChallenge.type];
                        if (activeChallenge.currentDay < challenge.days) {
                            activeChallenge.currentDay++;
                        }
                        
                        // Save updated challenge
                        localStorage.setItem('activeChallenge', JSON.stringify(activeChallenge));
                        
                        // Reload challenge
                        loadActiveChallenge();
                        
                        // Show completion message
                        alert('Great job! Task completed.');
                    } else {
                        alert('You\'ve already completed this task. Great job!');
                    }
                }
            });
        }
        
        // Load active challenge
        function loadActiveChallenge() {
            const savedChallenge = localStorage.getItem('activeChallenge');
            
            if (savedChallenge && activeChallenge) {
                const challengeData = JSON.parse(savedChallenge);
                const challenge = challenges[challengeData.type];
                
                if (challenge) {
                    // Show active challenge section
                    activeChallenge.classList.remove('hidden');
                    
                    // Set challenge title
                    if (activeChallengeTitle) {
                        activeChallengeTitle.textContent = challenge.title;
                    }
                    
                    // Set progress
                    const progress = (challengeData.completedDays.length / challenge.days) * 100;
                    if (challengeProgressFill) {
                        challengeProgressFill.style.width = `${progress}%`;
                    }
                    
                    if (challengeProgressText) {
                        challengeProgressText.textContent = `Day ${challengeData.currentDay}/${challenge.days}`;
                    }
                    
                    // Set today's task
                    if (todayTaskDescription) {
                        todayTaskDescription.textContent = challenge.tasks[challengeData.currentDay - 1];
                    }
                    
                    // Set upcoming tasks
                    if (upcomingTasksList) {
                        upcomingTasksList.innerHTML = '';
                        
                        // Add next 3 tasks (or fewer if near the end)
                        for (let i = challengeData.currentDay; i < challengeData.currentDay + 3 && i < challenge.days; i++) {
                            const taskItem = document.createElement('li');
                            taskItem.textContent = challenge.tasks[i];
                            upcomingTasksList.appendChild(taskItem);
                        }
                    }
                    
                    // Update complete button state
                    if (completeTaskBtn) {
                        if (challengeData.completedDays.includes(challengeData.currentDay)) {
                            completeTaskBtn.textContent = 'Completed';
                            completeTaskBtn.classList.add('completed');
                        } else {
                            completeTaskBtn.textContent = 'Mark Complete';
                            completeTaskBtn.classList.remove('completed');
                        }
                    }
                }
            }
        }
    }
    
    // Habit Tracker
    const addHabitBtn = document.getElementById('add-habit-btn');
    const habitsList = document.getElementById('habits-list');
    const habitsEmptyState = document.getElementById('habits-empty-state');
    const habitNameInput = document.getElementById('habit-name');
    const habitGoalInput = document.getElementById('habit-goal');
    const prevDateBtn = document.getElementById('prev-date-btn');
    const nextDateBtn = document.getElementById('next-date-btn');
    const currentDateDisplay = document.getElementById('current-date');
    
    if (addHabitBtn && habitsList) {
        // Current date for habit tracking
        let currentDate = new Date();
        let currentDateString = formatDate(currentDate);
        
        // Update date display
        if (currentDateDisplay) {
            currentDateDisplay.textContent = formatDateForDisplay(currentDate);
        }
        
        // Load habits from localStorage
        loadHabits();
        
        // Add habit button
        addHabitBtn.addEventListener('click', function() {
            if (!habitNameInput.value) {
                alert('Please enter a habit name.');
                return;
            }
            
            // Create new habit
            addHabitToList(habitNameInput.value, habitGoalInput.value);
            
            // Clear form
            habitNameInput.value = '';
            habitGoalInput.value = '';
        });
        
        // Date navigation buttons
        if (prevDateBtn && nextDateBtn) {
            prevDateBtn.addEventListener('click', function() {
                currentDate.setDate(currentDate.getDate() - 1);
                updateDateDisplay();
            });
            
            nextDateBtn.addEventListener('click', function() {
                // Don't allow future dates
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                
                if (currentDate < new Date(new Date().setHours(0, 0, 0, 0))) {
                    currentDate.setDate(currentDate.getDate() + 1);
                    updateDateDisplay();
                }
            });
        }
        
        // Update date display and load habits for that date
        function updateDateDisplay() {
            currentDateString = formatDate(currentDate);
            
            if (currentDateDisplay) {
                currentDateDisplay.textContent = formatDateForDisplay(currentDate);
            }
            
            // Reload habits for this date
            loadHabits();
        }
        
        // Add habit to list
        function addHabitToList(name, goal) {
            // Get saved habits
            let habits = JSON.parse(localStorage.getItem('selfCareHabits')) || [];
            
            // Check if habit already exists
            const existingHabit = habits.find(h => h.name === name);
            
            if (existingHabit) {
                alert('This habit already exists. Please use a different name.');
                return;
            }
            
            // Add new habit
            habits.push({
                name,
                goal,
                logs: {}
            });
            
            // Save habits
            localStorage.setItem('selfCareHabits', JSON.stringify(habits));
            
            // Reload habits
            loadHabits();
        }
        
        // Load habits from localStorage
        function loadHabits() {
            const savedHabits = localStorage.getItem('selfCareHabits');
            
            if (habitsList) {
                // Clear habits list
                habitsList.innerHTML = '';
                
                if (savedHabits) {
                    const habits = JSON.parse(savedHabits);
                    
                    if (habits.length > 0 && habitsEmptyState) {
                        habitsEmptyState.classList.add('hidden');
                    } else if (habitsEmptyState) {
                        habitsEmptyState.classList.remove('hidden');
                    }
                    
                    // Add each habit to the list
                    habits.forEach(habit => {
                        const habitItem = document.createElement('div');
                        habitItem.className = 'habit-item';
                        
                        // Check if habit is completed for current date
                        const isCompleted = habit.logs[currentDateString] === true;
                        
                        // Create habit HTML
                        habitItem.innerHTML = `
                            <div class="habit-item-content">
                                <div class="habit-item-details">
                                    <h4>${habit.name}</h4>
                                    <p>Goal: ${habit.goal || 'Daily'}</p>
                                </div>
                                <div class="habit-item-actions">
                                    <button class="habit-complete-btn ${isCompleted ? 'completed' : ''}">
                                        <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-circle'}"></i>
                                    </button>
                                    <button class="habit-delete-btn">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `;
                        
                        // Add to habits list
                        habitsList.appendChild(habitItem);
                        
                        // Add event listeners to buttons
                        const completeBtn = habitItem.querySelector('.habit-complete-btn');
                        const deleteBtn = habitItem.querySelector('.habit-delete-btn');
                        
                        completeBtn.addEventListener('click', function() {
                            toggleHabitCompletion(habit.name);
                        });
                        
                        deleteBtn.addEventListener('click', function() {
                            deleteHabit(habit.name);
                        });
                    });
                } else if (habitsEmptyState) {
                    habitsEmptyState.classList.remove('hidden');
                }
            }
        }
        
        // Toggle habit completion for current date
        function toggleHabitCompletion(habitName) {
            let habits = JSON.parse(localStorage.getItem('selfCareHabits')) || [];
            
            // Find the habit
            const habitIndex = habits.findIndex(h => h.name === habitName);
            
            if (habitIndex !== -1) {
                // Initialize logs object if it doesn't exist
                if (!habits[habitIndex].logs) {
                    habits[habitIndex].logs = {};
                }
                
                // Toggle completion for current date
                habits[habitIndex].logs[currentDateString] = !habits[habitIndex].logs[currentDateString];
                
                // Save habits
                localStorage.setItem('selfCareHabits', JSON.stringify(habits));
                
                // Reload habits
                loadHabits();
            }
        }
        
        // Delete habit
        function deleteHabit(habitName) {
            if (confirm(`Are you sure you want to delete the habit "${habitName}"?`)) {
                let habits = JSON.parse(localStorage.getItem('selfCareHabits')) || [];
                
                // Filter out the habit
                habits = habits.filter(h => h.name !== habitName);
                
                // Save habits
                localStorage.setItem('selfCareHabits', JSON.stringify(habits));
                
                // Reload habits
                loadHabits();
            }
        }
    }
    
    // Breathing Exercise
    const breathingCircle = document.getElementById('breathing-circle');
    const breathingText = document.getElementById('breathing-text');
    const startBreathingBtn = document.getElementById('start-breathing-btn');
    const breathingPatternSelect = document.getElementById('breathing-pattern');
    
    if (breathingCircle && startBreathingBtn) {
        let isBreathing = false;
        let breathingInterval;
        
        startBreathingBtn.addEventListener('click', function() {
            if (isBreathing) {
                // Stop breathing exercise
                clearInterval(breathingInterval);
                breathingCircle.style.transform = 'scale(1)';
                breathingText.textContent = 'Breathe In';
                startBreathingBtn.textContent = 'Start';
                isBreathing = false;
            } else {
                // Start breathing exercise
                startBreathingBtn.textContent = 'Stop';
                isBreathing = true;
                
                // Get selected pattern
                const pattern = breathingPatternSelect.value.split('-').map(Number);
                
                // Start breathing cycle
                startBreathingCycle(pattern);
            }
        });
        
        function startBreathingCycle(pattern) {
            let phase = 0;
            let phaseNames = ['Breathe In', 'Hold', 'Breathe Out', 'Hold'];
            let phaseDurations = pattern;
            
            // If pattern has 3 phases, adjust phaseNames
            if (pattern.length === 3) {
                phaseNames = ['Breathe In', 'Hold', 'Breathe Out'];
            } else if (pattern.length === 2) {
                phaseNames = ['Breathe In', 'Breathe Out'];
            }
            
            // Initial state
            breathingText.textContent = phaseNames[0];
            
            // For breathe in, scale up
            if (phase === 0) {
                breathingCircle.style.transform = 'scale(1.5)';
            }
            
            breathingInterval = setInterval(() => {
                // Move to next phase
                phase = (phase + 1) % phaseDurations.length;
                
                // Update text
                breathingText.textContent = phaseNames[phase];
                
                // Update circle size based on phase
                if (phase === 0) { // Breathe in
                    breathingCircle.style.transform = 'scale(1.5)';
                } else if (phaseNames[phase] === 'Breathe Out') { // Breathe out
                    breathingCircle.style.transform = 'scale(1)';
                }
                
            }, phaseDurations[phase] * 1000);
        }
    }
    
    // DIY Self-Care Ideas
    const categoryBtns = document.querySelectorAll('.category-btn');
    const diyCards = document.querySelectorAll('.diy-card');
    
    if (categoryBtns.length > 0 && diyCards.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Filter DIY cards
                const category = this.dataset.category;
                
                diyCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
        
        // View DIY button
        const viewDiyBtns = document.querySelectorAll('.view-diy-btn');
        viewDiyBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const diyTitle = this.closest('.diy-content').querySelector('h3').textContent;
                alert(`Viewing details for: ${diyTitle}`);
                // In a real app, this would open a modal with the full recipe/instructions
            });
        });
    }
    
    // Mental Well-Being Check-In
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodInsights = document.getElementById('mood-insights');
    const moodInsightContent = document.getElementById('mood-insight-content');
    const moodSuggestions = document.getElementById('mood-suggestions');
    const moodCalendar = document.getElementById('mood-calendar');
    
    if (moodBtns.length > 0 && moodInsights) {
        // Load mood history
        loadMoodHistory();
        
        // Mood buttons
        moodBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const mood = this.dataset.mood;
                
                // Save mood for today
                saveMood(mood);
                
                // Show insights
                showMoodInsights(mood);
                
                // Update mood calendar
                loadMoodHistory();
            });
        });
        
        // Save mood to localStorage
        function saveMood(mood) {
            let moodHistory = JSON.parse(localStorage.getItem('selfCareMoodHistory')) || {};
            const today = formatDate(new Date());
            
            // Save mood for today
            moodHistory[today] = mood;
            
            // Save to localStorage
            localStorage.setItem('selfCareMoodHistory', JSON.stringify(moodHistory));
        }
        
        // Show mood insights
        function showMoodInsights(mood) {
            moodInsights.classList.remove('hidden');
            
            // Set insight content based on mood
            let insightHTML = '<p>Based on your mood today:</p>';
            let suggestionsHTML = '<h4>Suggestions for Today:</h4><ul>';
            
            switch (mood) {
                case 'great':
                    insightHTML += '<p>You\'re feeling great today! This is a perfect time to engage in activities that bring you joy and maintain this positive energy.</p>';
                    suggestionsHTML += `
                        <li>Share your positive energy with others</li>
                        <li>Try something new that excites you</li>
                        <li>Journal about what's going well in your life</li>
                    `;
                    break;
                case 'good':
                    insightHTML += '<p>You\'re having a good day! This is a great opportunity to focus on activities that maintain your positive mood.</p>';
                    suggestionsHTML += `
                        <li>Engage in a hobby you enjoy</li>
                        <li>Connect with a friend or loved one</li>
                        <li>Spend some time in nature</li>
                    `;
                    break;
                case 'okay':
                    insightHTML += '<p>You\'re feeling okay today. This is a good time for gentle self-care activities that might lift your mood.</p>';
                    suggestionsHTML += `
                        <li>Take a short walk outside</li>
                        <li>Listen to uplifting music</li>
                        <li>Practice a brief meditation</li>
                    `;
                    break;
                case 'down':
                    insightHTML += '<p>You\'re feeling down today. Remember that it\'s okay to have these days, and there are things you can do to support yourself.</p>';
                    suggestionsHTML += `
                        <li>Practice self-compassion</li>
                        <li>Do something soothing like taking a warm bath</li>
                        <li>Reach out to someone supportive</li>
                    `;
                    break;
                case 'stressed':
                    insightHTML += '<p>You\'re feeling stressed today. It\'s important to acknowledge this feeling and take steps to reduce your stress levels.</p>';
                    suggestionsHTML += `
                        <li>Try the breathing exercise in our app</li>
                        <li>Take short breaks throughout the day</li>
                        <li>Prioritize tasks and consider what can wait</li>
                    `;
                    break;
            }
            
            suggestionsHTML += '</ul>';
            
            // Set content
            if (moodInsightContent) {
                moodInsightContent.innerHTML = insightHTML;
            }
            
            if (moodSuggestions) {
                moodSuggestions.innerHTML = suggestionsHTML;
            }
        }
        
        // Load mood history
        function loadMoodHistory() {
            if (moodCalendar) {
                const moodHistory = JSON.parse(localStorage.getItem('selfCareMoodHistory')) || {};
                
                // Clear calendar
                moodCalendar.innerHTML = '';
                
                // Get dates for the last 7 days
                const dates = [];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date();
                    date.setDate(date.getDate() - i);
                    dates.push(date);
                }
                
                // Create calendar items
                dates.forEach(date => {
                    const dateString = formatDate(date);
                    const mood = moodHistory[dateString];
                    
                    const calendarItem = document.createElement('div');
                    calendarItem.className = 'calendar-item';
                    
                    // Get mood icon
                    let moodIcon = '';
                    let moodColor = '';
                    
                    switch (mood) {
                        case 'great':
                            moodIcon = 'fa-grin-beam';
                            moodColor = '#a8e6cf';
                            break;
                        case 'good':
                            moodIcon = 'fa-smile';
                            moodColor = '#fdfd96';
                            break;
                        case 'okay':
                            moodIcon = 'fa-meh';
                            moodColor = '#ffcc80';
                            break;
                        case 'down':
                            moodIcon = 'fa-frown';
                            moodColor = '#ff9aa2';
                            break;
                        case 'stressed':
                            moodIcon = 'fa-tired';
                            moodColor = '#b19cd9';
                            break;
                        default:
                            moodIcon = 'fa-circle';
                            moodColor = '#ddd';
                    }
                    
                    // Create calendar item HTML
                    calendarItem.innerHTML = `
                        <div class="calendar-date">${formatDateShort(date)}</div>
                        <div class="calendar-mood">
                            <i class="fas ${moodIcon}" style="color: ${moodColor}"></i>
                        </div>
                    `;
                    
                    // Add to calendar
                    moodCalendar.appendChild(calendarItem);
                });
            }
        }
    }
    
    // Emergency Help Button
    const emergencyBtn = document.querySelector('.emergency-btn');
    
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            // In a real app, this would open a modal with emergency resources
            // and possibly offer to connect to a crisis line
            alert('Emergency Resources:\n\n• National Suicide Prevention Lifeline: 988\n• Crisis Text Line: Text HOME to 741741\n• Emergency Services: 911\n\nIf you are in immediate danger, please call 911 or go to your nearest emergency room.');
        });
    }
    
    // Get Started Button
    const getStartedBtn = document.getElementById('get-started-btn');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            // Scroll to personalized plan section
            const personalizedPlanSection = document.getElementById('personalized-plan');
            if (personalizedPlanSection) {
                personalizedPlanSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Helper Functions
    
    // Get random item from array
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    // Format date as YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // Format date for display
    function formatDateForDisplay(date) {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
    
    // Format date short (e.g., "Mon 12")
    function formatDateShort(date) {
        const options = { weekday: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
});