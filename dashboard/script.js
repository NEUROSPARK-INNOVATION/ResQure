document.addEventListener('DOMContentLoaded', function() {
    // Initialize the app
    initApp();

    // Navigation
    initNavigation();

    // Dashboard
    initDashboard();

    // Period Tracker
    initPeriodTracker();

    // SOS Features
    initSOS();

    // Self-Care Features
    initSelfCare();

    // Modals
    initModals();
});

// Initialize App
function initApp() {
    // Set current date
    const currentDateElement = document.getElementById('current-date');
    if (currentDateElement) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // Set greeting based on time of day
    const greetingElement = document.getElementById('greeting');
    if (greetingElement) {
        const hour = new Date().getHours();
        let greeting = 'Hello';
        
        if (hour < 12) {
            greeting = 'Good Morning';
        } else if (hour < 18) {
            greeting = 'Good Afternoon';
        } else {
            greeting = 'Good Evening';
        }
        
        // Get user name from localStorage or use default
        const userName = localStorage.getItem('userName') || 'Sarah';
        greetingElement.textContent = `${greeting}, ${userName}`;
    }

    // Load user data from localStorage
    loadUserData();
}

// Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links li');
    const pages = document.querySelectorAll('.page');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Navigation click handler
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const pageId = this.getAttribute('data-page');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Show selected page
            pages.forEach(page => {
                if (page.id === pageId) {
                    page.classList.add('active');
                } else {
                    page.classList.remove('active');
                }
            });
            
            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Menu toggle for mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // SOS Button
    const sosButton = document.getElementById('sos-button');
    if (sosButton) {
        sosButton.addEventListener('click', function() {
           
            sendSOS("basic")
        });
    }
}

// Dashboard Functions
function initDashboard() {
    // Mood Buttons
    const moodButtons = document.querySelectorAll('.mood-btn');
    moodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const mood = this.getAttribute('data-mood');
            saveMood(mood);
            
            // Visual feedback
            moodButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            
            // Show confirmation
            alert(`Your mood has been recorded as: ${mood}`);
        });
    });

    // Quick SOS Buttons
    const basicSosBtn = document.getElementById('basic-sos-btn');
   
    
    if (basicSosBtn) {
        basicSosBtn.addEventListener('click', function() {
            // if (confirm('Are you sure you want to activate Basic SOS?')) {
            //     sendSOS("basic")
            // }
            customIf("Are you sure you want to activate Basic SOS?").then((confirmed) => {
                if (confirmed) {
                    sendSOS("basic");
                } 
            }); 
        });
    }
    
    // if (highAlertBtn) {
    //     highAlertBtn.addEventListener('click', function() {
    //         if (confirm('Are you sure you want to activate High Alert SOS?')) {
               
               
    //         }
    //     });
    // }


    // Complete Self-Care Reminder
    const completeReminderBtn = document.getElementById('complete-reminder-btn');
    if (completeReminderBtn) {
        completeReminderBtn.addEventListener('click', function() {
            alert('Reminder marked as complete!');
            this.textContent = 'Completed';
            this.disabled = true;
        });
    }

    // Update Period Button
    const updatePeriodBtn = document.getElementById('update-period-btn');
    if (updatePeriodBtn) {
        updatePeriodBtn.addEventListener('click', function() {
            // Open period log modal or navigate to period tracker
            const periodTrackerLink = document.querySelector('[data-page="period-tracker"]');
            if (periodTrackerLink) {
                periodTrackerLink.click();
                
                // Open log period modal
                const logPeriodBtn = document.getElementById('log-period-btn');
                if (logPeriodBtn) {
                    setTimeout(() => {
                        logPeriodBtn.click();
                    }, 300);
                }
            }
        });
    }

    // Manage Contacts Button
    const manageContactsBtn = document.getElementById('manage-contacts-btn');
    if (manageContactsBtn) {
        manageContactsBtn.addEventListener('click', function() {
            // Navigate to profile page
            const profileLink = document.querySelector('[data-page="profile"]');
            if (profileLink) {
                profileLink.click();
            }
        });
    }
}

// Period Tracker Functions
function initPeriodTracker() {
    // Calendar generation
    generateCalendar();
    
    // Month navigation
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const currentMonthElement = document.getElementById('current-month');
    
    let currentDate = new Date();
    
    if (prevMonthBtn && nextMonthBtn && currentMonthElement) {
        // Set initial month display
        updateMonthDisplay();
        
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateMonthDisplay();
            generateCalendar(currentDate);
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateMonthDisplay();
            generateCalendar(currentDate);
        });
        
        function updateMonthDisplay() {
            const options = { year: 'numeric', month: 'long' };
            currentMonthElement.textContent = currentDate.toLocaleDateString('en-US', options);
        }
    }
    
    // Log Period Button
    const logPeriodBtn = document.getElementById('log-period-btn');
    const logPeriodModal = document.getElementById('log-period-modal');
    
    if (logPeriodBtn && logPeriodModal) {
        logPeriodBtn.addEventListener('click', function() {
            openModal(logPeriodModal);
            
            // Set default date to today
            const periodStartDateInput = document.getElementById('period-start-date');
            if (periodStartDateInput) {
                const today = new Date().toISOString().split('T')[0];
                periodStartDateInput.value = today;
            }
        });
    }
    
    // Flow Buttons
    const flowButtons = document.querySelectorAll('.flow-btn');
    flowButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            flowButtons.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Save Period Button
    const savePeriodBtn = document.getElementById('save-period-btn');
    if (savePeriodBtn) {
        savePeriodBtn.addEventListener('click', function() {
            const startDate = document.getElementById('period-start-date').value;
            const endDate = document.getElementById('period-end-date').value;
            
            if (!startDate) {
                alert('Please select a start date');
                return;
            }
            
            // Get selected flow
            let flow = 'medium';
            const selectedFlowBtn = document.querySelector('.flow-btn.selected');
            if (selectedFlowBtn) {
                flow = selectedFlowBtn.getAttribute('data-flow');
            }
            
            // Get selected symptoms
            const symptoms = [];
            document.querySelectorAll('.symptom-checkbox input:checked').forEach(checkbox => {
                symptoms.push(checkbox.value);
            });
            
            // Get notes
            const notes = document.getElementById('period-notes').value;
            
            // Save period data
            savePeriodData(startDate, endDate, flow, symptoms, notes);
            
            // Close modal
            closeModal(logPeriodModal);
            
            // Update calendar
            generateCalendar();
            
            // Update period prediction
            updatePeriodPrediction();
            
            // Show confirmation
            alert('Period data saved successfully!');
        });
    }
    
    // Cancel Log Button
    const cancelLogBtn = document.getElementById('cancel-log-btn');
    if (cancelLogBtn && logPeriodModal) {
        cancelLogBtn.addEventListener('click', function() {
            closeModal(logPeriodModal);
        });
    }
    
    // Period Settings Button
    const periodSettingsBtn = document.getElementById('period-settings-btn');
    if (periodSettingsBtn) {
        periodSettingsBtn.addEventListener('click', function() {
            alert('Period settings will be implemented in a future update.');
        });
    }
    
    // Toggle Switches
    const toggleSwitches = document.querySelectorAll('.period-notifications .toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            
            // Save setting to localStorage
            saveSetting(settingName, isEnabled);
            
            // Show confirmation
            const settingLabel = this.closest('.notification-setting').querySelector('h4').textContent;
            alert(`${settingLabel} has been ${isEnabled ? 'enabled' : 'disabled'}.`);
        });
    });
}

// Generate Calendar
function generateCalendar(date = new Date()) {
    const calendarDays = document.getElementById('calendar-days');
    if (!calendarDays) return;
    
    // Clear previous calendar
    calendarDays.innerHTML = '';
    
    // Get first day of month and number of days
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay();
    
    // Create empty cells for days before first day of month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        calendarDays.appendChild(emptyDay);
    }
    
    // Get period data from localStorage
    const periodData = JSON.parse(localStorage.getItem('periodData')) || [];
    
    // Get current month and year
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    
    // Create cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        
        // Check if this is today
        const today = new Date();
        if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
            dayElement.classList.add('today');
        }
        
        // Check if this day is in a period
        const currentDate = new Date(currentYear, currentMonth, day);
        const isPeriodDay = isPeriod(currentDate, periodData);
        if (isPeriodDay) {
            dayElement.classList.add('period-day');
        }
        
        // Check if this day is in fertile window
        const isFertileDay = isFertile(currentDate, periodData);
        if (isFertileDay) {
            dayElement.classList.add('fertile-day');
        }
        
        // Check if this is ovulation day
        const isOvulationDay = isOvulation(currentDate, periodData);
        if (isOvulationDay) {
            dayElement.classList.add('ovulation-day');
        }
        
        // Check if this is PMS day
        const isPMSDay = isPMS(currentDate, periodData);
        if (isPMSDay) {
            dayElement.classList.add('pms-day');
        }
        
        // Add click event to log period
        dayElement.addEventListener('click', function() {
            const selectedDate = new Date(currentYear, currentMonth, day);
            const formattedDate = selectedDate.toISOString().split('T')[0];
            
            // Open log period modal
            const logPeriodModal = document.getElementById('log-period-modal');
            const periodStartDateInput = document.getElementById('period-start-date');
            
            if (logPeriodModal && periodStartDateInput) {
                openModal(logPeriodModal);
                periodStartDateInput.value = formattedDate;
            }
        });
        
        calendarDays.appendChild(dayElement);
    }
}

// Check if a date is during period
function isPeriod(date, periodData) {
    if (!periodData || periodData.length === 0) return false;
    
    for (const period of periodData) {
        const startDate = new Date(period.startDate);
        let endDate;
        
        if (period.endDate) {
            endDate = new Date(period.endDate);
        } else {
            // If no end date, assume period lasts for 5 days
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 4);
        }
        
        if (date >= startDate && date <= endDate) {
            return true;
        }
    }
    
    return false;
}

// Check if a date is in fertile window
function isFertile(date, periodData) {
    if (!periodData || periodData.length === 0) return false;
    
    // Get the most recent period
    const lastPeriod = periodData[periodData.length - 1];
    const lastPeriodStart = new Date(lastPeriod.startDate);
    
    // Calculate next period start (assuming 28-day cycle)
    const nextPeriodStart = new Date(lastPeriodStart);
    nextPeriodStart.setDate(lastPeriodStart.getDate() + 28);
    
    // Fertile window is typically 5 days before ovulation and ovulation day
    // Ovulation is typically 14 days before next period
    const ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);
    
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDay);
    
    return date >= fertileStart && date <= fertileEnd;
}

// Check if a date is ovulation day
function isOvulation(date, periodData) {
    if (!periodData || periodData.length === 0) return false;
    
    // Get the most recent period
    const lastPeriod = periodData[periodData.length - 1];
    const lastPeriodStart = new Date(lastPeriod.startDate);
    
    // Calculate next period start (assuming 28-day cycle)
    const nextPeriodStart = new Date(lastPeriodStart);
    nextPeriodStart.setDate(lastPeriodStart.getDate() + 28);
    
    // Ovulation is typically 14 days before next period
    const ovulationDay = new Date(nextPeriodStart);
    ovulationDay.setDate(nextPeriodStart.getDate() - 14);
    
    return date.getDate() === ovulationDay.getDate() && 
           date.getMonth() === ovulationDay.getMonth() && 
           date.getFullYear() === ovulationDay.getFullYear();
}

// Check if a date is in PMS window
function isPMS(date, periodData) {
    if (!periodData || periodData.length === 0) return false;
    
    // Get the most recent period
    const lastPeriod = periodData[periodData.length - 1];
    const lastPeriodStart = new Date(lastPeriod.startDate);
    
    // Calculate next period start (assuming 28-day cycle)
    const nextPeriodStart = new Date(lastPeriodStart);
    nextPeriodStart.setDate(lastPeriodStart.getDate() + 28);
    
    // PMS is typically 7 days before next period
    const pmsStart = new Date(nextPeriodStart);
    pmsStart.setDate(nextPeriodStart.getDate() - 7);
    
    return date >= pmsStart && date < nextPeriodStart;
}

// Save Period Data
function savePeriodData(startDate, endDate, flow, symptoms, notes) {
    // Get existing data
    let periodData = JSON.parse(localStorage.getItem('periodData')) || [];
    
    // Add new period
    periodData.push({
        startDate,
        endDate,
        flow,
        symptoms,
        notes,
        timestamp: new Date().toISOString()
    });
    
    // Sort by date (newest first)
    periodData.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    
    // Save to localStorage
    localStorage.setItem('periodData', JSON.stringify(periodData));
    
    // Update period prediction
    updatePeriodPrediction();
}

// Update Period Prediction
function updatePeriodPrediction() {
    const periodData = JSON.parse(localStorage.getItem('periodData')) || [];
    
    if (periodData.length === 0) return;
    
    // Get the most recent period
    const lastPeriod = periodData[0];
    const lastPeriodStart = new Date(lastPeriod.startDate);
    
    // Calculate average cycle length (default to 28 days)
    let avgCycleLength = 28;
    
    if (periodData.length >= 2) {
        let totalDays = 0;
        let cycleCount = 0;
        
        for (let i = 0; i < periodData.length - 1; i++) {
            const currentPeriodStart = new Date(periodData[i].startDate);
            const nextPeriodStart = new Date(periodData[i + 1].startDate);
            
            const cycleDays = Math.round((currentPeriodStart - nextPeriodStart) / (1000 * 60 * 60 * 24));
            
            if (cycleDays > 0 && cycleDays < 45) { // Ignore outliers
                totalDays += cycleDays;
                cycleCount++;
            }
        }
        
        if (cycleCount > 0) {
            avgCycleLength = Math.round(totalDays / cycleCount);
        }
    }
    
    // Calculate next period date
    const nextPeriodDate = new Date(lastPeriodStart);
    nextPeriodDate.setDate(lastPeriodStart.getDate() + avgCycleLength);
    
    // Calculate days until next period
    const today = new Date();
    const daysToNextPeriod = Math.round((nextPeriodDate - today) / (1000 * 60 * 60 * 24));
    
    // Update UI
    const daysToElement = document.getElementById('days-to-period');
    const nextPeriodElement = document.getElementById('next-period-date');
    const nextPeriodElements = document.querySelectorAll('#next-period');
    const avgCycleLengthElement = document.getElementById('avg-cycle-length');
    
    if (daysToElement) {
        daysToElement.textContent = daysToNextPeriod > 0 ? daysToNextPeriod : 0;
    }
    
    if (nextPeriodElement) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        nextPeriodElement.textContent = nextPeriodDate.toLocaleDateString('en-US', options);
    }
    
    nextPeriodElements.forEach(element => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        element.textContent = nextPeriodDate.toLocaleDateString('en-US', options);
    });
    
    if (avgCycleLengthElement) {
        avgCycleLengthElement.textContent = avgCycleLength;
    }
    
    // Calculate fertile window
    const ovulationDay = new Date(nextPeriodDate);
    ovulationDay.setDate(nextPeriodDate.getDate() - 14);
    
    const fertileStart = new Date(ovulationDay);
    fertileStart.setDate(ovulationDay.getDate() - 5);
    
    const fertileEnd = new Date(ovulationDay);
    
    // Update fertile window display
    const fertileWindowElement = document.getElementById('fertile-window');
    if (fertileWindowElement) {
        const options = { month: 'long', day: 'numeric' };
        fertileWindowElement.textContent = `${fertileStart.toLocaleDateString('en-US', options)} - ${fertileEnd.toLocaleDateString('en-US', options)}`;
    }
    
    // Calculate average period length
    let avgPeriodLength = 5; // Default
    
    if (periodData.length > 0) {
        let totalDays = 0;
        let periodCount = 0;
        
        for (const period of periodData) {
            if (period.endDate) {
                const startDate = new Date(period.startDate);
                const endDate = new Date(period.endDate);
                const periodDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                
                if (periodDays > 0 && periodDays < 10) { // Ignore outliers
                    totalDays += periodDays;
                    periodCount++;
                }
            }
        }
        
        if (periodCount > 0) {
            avgPeriodLength = Math.round(totalDays / periodCount);
        }
    }
    
    // Update average period length display
    const avgPeriodLengthElement = document.getElementById('avg-period-length');
    if (avgPeriodLengthElement) {
        avgPeriodLengthElement.textContent = avgPeriodLength;
    }
}

// SOS Functions
// function initSOS() {
//     // Activate Basic SOS Button
//     const activateBasicSosBtn = document.getElementById('activate-basic-sos');
//     if (activateBasicSosBtn) {
//         activateBasicSosBtn.addEventListener('click', function() {
//             if (confirm('Are you sure you want to activate Basic SOS?')) {
//                 activateSOS('basic');
//             }
//         });
//     }
    
//     // Activate High Alert Button
    // const activateHighAlertBtn = document.getElementById('activate-high-alert');
    // if (activateHighAlertBtn) {
    //     activateHighAlertBtn.addEventListener('click', function() {
    //         if (confirm('Are you sure you want to activate High Alert SOS?')) {
    //             activateSOS('high');
    //         }
    //     });
    // }
    
//     // Test SOS Button
//     const testSosBtn = document.getElementById('test-sos-btn');
//     if (testSosBtn) {
//         testSosBtn.addEventListener('click', function() {
//             alert('This is a test of the SOS system. In a real emergency, your location would be sent to your emergency contacts.');
//         });
//     }
    
    // Edit SOS Message Button
    const editSosMessageBtn = document.getElementById('edit-sos-message-btn');
    const sosMessageModal = document.getElementById('sos-message-modal');
    
    if (editSosMessageBtn && sosMessageModal) {
        editSosMessageBtn.addEventListener('click', function() {
            openModal(sosMessageModal);
            
            // Load saved message
            const sosMessage = localStorage.getItem('sosMessage') || 'EMERGENCY! I need help. This is my current location. Please contact me or emergency services immediately.';
            const sosMessageInput = document.getElementById('sos-message');
            
            if (sosMessageInput) {
                sosMessageInput.value = sosMessage;
            }
        });
    }
    
    // Save SOS Message Button
    const saveMessageBtn = document.getElementById('save-message-btn');
    if (saveMessageBtn && sosMessageModal) {
        saveMessageBtn.addEventListener('click', function() {
            const sosMessageInput = document.getElementById('sos-message');
            
            if (sosMessageInput) {
                const message = sosMessageInput.value;
                localStorage.setItem('sosMessage', message);
                
                // Close modal
                closeModal(sosMessageModal);
                
                // Show confirmation
                alert('SOS message saved successfully!');
            }
        });
    }
    
    // Cancel Message Button
    const cancelMessageBtn = document.getElementById('cancel-message-btn');
    if (cancelMessageBtn && sosMessageModal) {
        cancelMessageBtn.addEventListener('click', function() {
            closeModal(sosMessageModal);
        });
    }
    
    // Toggle Switches
    const toggleSwitches = document.querySelectorAll('.sos-settings .toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            
            // Save setting to localStorage
            saveSetting(settingName, isEnabled);
            
            // Show confirmation
            const settingLabel = this.closest('.setting-item').querySelector('h4').textContent;
            alert(`${settingLabel} has been ${isEnabled ? 'enabled' : 'disabled'}.`);
        });
    });
    
    // Add SOS Contact Button
    const addSosContactBtn = document.getElementById('add-sos-contact-btn');
    if (addSosContactBtn) {
        addSosContactBtn.addEventListener('click', function() {
            // Navigate to profile page
            const profileLink = document.querySelector('[data-page="profile"]');
            if (profileLink) {
                profileLink.click();
            }
        });
    }   


import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// ✅ Supabase Setup
const supabaseUrl = 'https://qfkurcgfivvhroudxvjr.supabase.co';
const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFma3VyY2dmaXZ2aHJvdWR4dmpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0ODIxNjYsImV4cCI6MjA1OTA1ODE2Nn0.6a7HA6kXkl5oEGwGAJedr-MuJHDmH7bO7sB6msiwG5E';  // ⚠️ Replace with your actual Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

let mediaRecorder;
let recordedChunks = [];
let recordingActive = false;

// 🎥 Start Recording Function
async function startRecording() {
    if (recordingActive) return;

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = async () => {
            const blob = new Blob(recordedChunks, { type: "video/webm" });
            recordedChunks = [];
            await handleUploadAndAlert(blob); // 🔹 Upload and trigger emergency alert
        };

        mediaRecorder.start();
        recordingActive = true;
        console.log("🎥 Recording started...");
    } catch (error) {
        console.error("❌ Error starting recording:", error);
    }
}

// ⏹️ Stop Recording Function
function stopRecording() {
    if (mediaRecorder && recordingActive) {
        mediaRecorder.stop();
        recordingActive = false;
        console.log("🛑 Recording stopped...");
    }
}

// 📂 Upload to Supabase
async function uploadToSupabase(blob) {
    try {
        const fileName = `recording-${Date.now()}.webm`;
        console.log(`📤 Uploading file: ${fileName}`);

        const { data, error } = await supabase.storage
            .from('sosvideos') // Your Supabase bucket name
            .upload(fileName, blob, { contentType: "video/webm" });

        if (error) throw new Error(error.message);

        console.log("✅ Upload successful:", data);
        return fileName;
    } catch (error) {
        console.error("❌ Upload failed:", error.message);
        return null;
    }
}

// 🔑 Generate Signed URL (Valid for 10 Minutes)
async function getSignedUrl(fileName) {
    try {
        console.log(`🔗 Generating signed URL for: ${fileName}`);

        const { data, error } = await supabase
            .storage
            .from("sosvideos")
            .createSignedUrl(fileName, 600); // 600 seconds = 10 minutes

        if (error) throw new Error(error.message);

        console.log("🔑 Signed URL:", data.signedUrl);
        return data.signedUrl;
    } catch (error) {
        console.error("❌ Failed to generate signed URL:", error.message);
        return null;
    }
}

// 🚀 Upload & Send Emergency Alert
async function handleUploadAndAlert(blob) {
    try {
        // ✅ Step 1: Upload File to Supabase
        const fileName = await uploadToSupabase(blob);
        if (!fileName) return;

        // ✅ Step 2: Generate Signed URL
        const signedUrl = await getSignedUrl(fileName);
        if (!signedUrl) return;

        // ✅ Step 3: Get User Email from Local Storage
        const userEmail = localStorage.getItem("email");
        if (!userEmail) {
            console.error("⚠️ No user email found in local storage!");
            return;
        }

        console.log(`📧 Sending alert to backend for email: ${userEmail}`);

        // ✅ Step 4: Send Signed URL & Email to Backend
        const response = await fetch("https://hershield-rn5q.onrender.com/send-alert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail, signedUrl }),
        });

        const result = await response.json();
        console.log("🚨 Emergency alert sent:", result);
    } catch (error) {
        console.error("❌ Error in upload process:", error.message);
    }
}


function initSOS() {
    document.getElementById("basic-sos-btn")?.addEventListener("click", function () {
        // if (confirm("Are you sure you want to activate Basic SOS?")) {
        //     sendSOS("basic"); 
        // }
    });

    document.getElementById("high-alert-btn")?.addEventListener("click", function () {
        // if (confirm("⚠ High Alert Mode will notify emergency contacts and police station. Proceed?")) {   
        // }
    });

    document.getElementById("test-sos-btn")?.addEventListener("click", function () {
        alert("🔔 This is a test SOS alert. No messages will be sent.");
    });

    // document.getElementById("stop-sos-btn")?.addEventListener("click", function () {
    //     // if (confirm("Are you sure you want to stop the SOS alert?")) {
    //     //     deactivateSOS();
    //     // }
    // });
    document.getElementById("stop-sos-btn")?.addEventListener("click", function () {
        customIf("Are you sure you want to stop the SOS alert?")
            .then((confirmed) => {
                if (confirmed) {
                    deactivateSOS();
                }
            });
    });
    
}
// const basicSosBtn = document.getElementById('basic-sos-btn');
   
    
//     if (basicSosBtn) {
//         basicSosBtn.addEventListener('click', function() {
//             // if (confirm('Are you sure you want to activate Basic SOS?')) {
//             //     sendSOS("basic")
//             // }
//             customIf("Are you sure you want to activate Basic SOS?").then((confirmed) => {
//                 if (confirmed) {
//                     sendSOS("basic");
//                 } 
//             }); 
//         });
//     }
// 🚨 Send SOS Alert Function
async function sendSOS(mode) {
    if (!navigator.geolocation) {
        alert("❌ Location services not supported. Enable GPS.");
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationURL = `https://www.google.com/maps?q=${latitude},${longitude}`;
        const userEmail = localStorage.getItem("email");

        if (!userEmail) {
            alert("⚠ User email not found. Please log in.");
            return;
        }

        // Display SOS Active Modal
        openModal(document.getElementById("sos-active-modal"));
        startSOSTimer();
        const savedMessage = localStorage.getItem("sosMessage") || 
        "EMERGENCY! I need help. This is my current location. "; 
    
        // Prepare data for the backend
        const sosData = {
            email: userEmail,
            mode: mode,
            latitude: latitude,
            longitude: longitude,
            locationURL: locationURL,
            customMessage: savedMessage
        };
        startRecording();
        try {
            const response = await fetch("https://hershield-rn5q.onrender.com/sendSOS", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sosData),
            });

            const data = await response.json();
            if (response.ok) {
                alert(`🚨 ${mode === "high" ? "High Alert" : "Basic"} SOS Activated! Your emergency contacts have been notified.`);
            } else {
                alert("❌ Failed to send SOS alert: " + data.message);
            }
        } catch (error) {
            console.error("Error sending SOS:", error);
            alert("❌ Error while sending SOS alert.");
        }
    }, () => {
        alert("❌ Failed to get location. Ensure GPS is enabled.");
    });
}

// 🛑 Deactivate SOS
function deactivateSOS() {
    closeModal(document.getElementById("sos-active-modal"));
    stopSOSTimer();
    stopRecording();
    alert("✅ SOS alert deactivated.");
}

// ⏳ SOS Timer
let sosSeconds = 0, sosTimerInterval;

function startSOSTimer() {
    sosSeconds = 0;
    updateSOSTimerDisplay();
    sosTimerInterval = setInterval(() => {
        sosSeconds++;
        updateSOSTimerDisplay();
    }, 1000);
}

function stopSOSTimer() {
    clearInterval(sosTimerInterval);
}

function updateSOSTimerDisplay() {
    const timerElement = document.getElementById("sos-timer");
    if (timerElement) {
        const minutes = Math.floor(sosSeconds / 60);
        const seconds = sosSeconds % 60;
        timerElement.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
}



// Self-Care Functions
function initSelfCare() {
    // Date navigation
    const prevDayBtn = document.getElementById('prev-day-btn');
    const nextDayBtn = document.getElementById('next-day-btn');
    const currentDayElement = document.getElementById('current-day');
    
    let currentDate = new Date();
    
    if (prevDayBtn && nextDayBtn && currentDayElement) {
        // Set initial day display
        updateDayDisplay();
        
        prevDayBtn.addEventListener('click', function() {
            currentDate.setDate(currentDate.getDate() - 1);
            updateDayDisplay();
        });
        
        nextDayBtn.addEventListener('click', function() {
            // Don't allow future dates
            if (currentDate < new Date()) {
                currentDate.setDate(currentDate.getDate() + 1);
                updateDayDisplay();
            }
        });
        
        function updateDayDisplay() {
            const today = new Date();
            const isToday = currentDate.getDate() === today.getDate() && 
                           currentDate.getMonth() === today.getMonth() && 
                           currentDate.getFullYear() === today.getFullYear();
            
            const options = { month: 'long', day: 'numeric' };
            currentDayElement.textContent = isToday ? 
                `Today, ${currentDate.toLocaleDateString('en-US', options)}` : 
                currentDate.toLocaleDateString('en-US', options);
        }
    }
    
    // Activity checkboxes
    const activityCheckboxes = document.querySelectorAll('.activity-checkbox input');
    activityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const activityItem = this.closest('.activity-item');
            
            if (this.checked) {
                activityItem.classList.add('completed');
            } else {
                activityItem.classList.remove('completed');
            }
            
            // Save activity state
            saveActivityState(this.id, this.checked);
        });
    });
    
    // Add Activity Button
    const addActivityBtn = document.getElementById('add-activity-btn');
    const addActivityModal = document.getElementById('add-activity-modal');
    
    if (addActivityBtn && addActivityModal) {
        addActivityBtn.addEventListener('click', function() {
            openModal(addActivityModal);
            
            // Set default date to today
            const activityDateInput = document.getElementById('activity-date');
            if (activityDateInput) {
                const today = new Date().toISOString().split('T')[0];
                activityDateInput.value = today;
            }
        });
    }
    
    // Save Activity Button
    const saveActivityBtn = document.getElementById('save-activity-btn');
    if (saveActivityBtn) {
        saveActivityBtn.addEventListener('click', function() {
            const activityName = document.getElementById('activity-name').value;
            const activityDate = document.getElementById('activity-date').value;
            const activityTime = document.getElementById('activity-time').value;
            const activityDuration = document.getElementById('activity-duration').value;
            const activityCategory = document.getElementById('activity-category').value;
            const activityNotes = document.getElementById('activity-notes').value;
            
            if (!activityName) {
                alert('Please enter an activity name');
                return;
            }
            
            // Save activity data
            saveActivityData(activityName, activityDate, activityTime, activityDuration, activityCategory, activityNotes);
            
            // Close modal
            closeModal(addActivityModal);
            
            // Show confirmation
            alert('Activity added successfully!');
            
            // Refresh activity list (in a real app, this would update the UI)
            alert('In a real app, the activity list would be updated with the new activity.');
        });
    }
    
    // Cancel Activity Button
    const cancelActivityBtn = document.getElementById('cancel-activity-btn');
    if (cancelActivityBtn && addActivityModal) {
        cancelActivityBtn.addEventListener('click', function() {
            closeModal(addActivityModal);
        });
    }
    
    // Mood & Stress Sliders
    const moodSlider = document.getElementById('mood-slider');
    const stressSlider = document.getElementById('stress-slider');
    
    // Declare saveMoodValue and saveStressValue
    let saveMoodValue, saveStressValue;

    if (moodSlider) {
        moodSlider.addEventListener('input', function() {
            // Update mood value
            // Assign a dummy function to saveMoodValue for demonstration
            saveMoodValue = (value) => {
                console.log("Mood value saved:", value);
            };
            saveMoodValue(this.value);
        });
    }
    
    if (stressSlider) {
        stressSlider.addEventListener('input', function() {
            // Update stress value
            // Assign a dummy function to saveStressValue for demonstration
            saveStressValue = (value) => {
                console.log("Stress value saved:", value);
            };
            saveStressValue(this.value);
        });
    }
    
    // Save Mood Button
    const saveMoodBtn = document.getElementById('save-mood-btn');
    if (saveMoodBtn) {
        saveMoodBtn.addEventListener('click', function() {
            const moodValue = moodSlider ? moodSlider.value : 3;
            const stressValue = stressSlider ? stressSlider.value : 3;
            const moodNotes = document.getElementById('mood-notes').value;
            
            // Save mood data
            saveMoodData(moodValue, stressValue, moodNotes);
            
            // Show confirmation
            alert('Mood and stress levels saved successfully!');
        });
    }
    
    // Add Reminder Button
    const addReminderBtn = document.getElementById('add-reminder-btn');
    if (addReminderBtn) {
        addReminderBtn.addEventListener('click', function() {
            alert('Add reminder functionality will be implemented in a future update.');
        });
    }
}

// Modal Functions
function initModals() {
    // Close modal buttons
    const closeModalBtns = document.querySelectorAll('.close-modal-btn');
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
    }
}

// Data Storage Functions

const backendUrl = 'https://hershield-rn5q.onrender.com';
async function loadUserData() {
    try {
        // Get the user's email (assuming it's stored in localStorage after login)
        const userEmail = localStorage.getItem('email'); 
        
        if (!userEmail) {
            alert('User email not found. Please log in again.');
            return;
        }

        // Send a request to fetch user data using the email
        const response = await fetch(`${backendUrl}/getUserData?email=${encodeURIComponent(userEmail)}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const data = await response.json();
        
        if (response.ok) {
            document.getElementById('full-name').value = data.name || '';
            document.getElementById('age').value = data.age || '';
            document.getElementById('email').value = data.email || '';
            document.getElementById('phone').value = data.phone || '';
            document.getElementById('phone').value = data.phone || '';

            // Update Profile Display Name
            const profileDisplayName = document.getElementById('profile-display-name');
            if (profileDisplayName) {
                profileDisplayName.textContent = data.name || 'User';
            }
            const genderDropdown = document.getElementById('gender');
            if (genderDropdown) {
                genderDropdown.value = data.gender || 'female'; // Default to female if no gender found
            }

            const contactList = document.querySelector('.emergency-contacts-list');
            contactList.innerHTML = ''; // Clear existing contacts

            if (data.emergencyContacts && data.emergencyContacts.length > 0) {
                data.emergencyContacts.forEach((contact, index) => {
                    const contactHTML = `
                        <div class="emergency-contact">
                            <div class="contact-details">
                                <div class="form-group">
                                    <label for="contact-name-${index + 1}">Name</label>
                                    <input type="text" id="contact-name-${index + 1}" value="${contact.name}">
                                </div>
                                <div class="form-group">
                                    <label for="contact-phone-${index + 1}">Phone Number</label>
                                    <input type="tel" id="contact-phone-${index + 1}" value="${contact.phone}">
                                </div>
                                <div class="form-group">
                                    <label for="contact-relation-${index + 1}">Relationship</label>
                                    <input type="text" id="contact-relation-${index + 1}" value="${contact.relation}">
                                </div>
                            </div>
                            <button class="delete-contact-btn" onclick="deleteContact(${index})">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                    contactList.insertAdjacentHTML('beforeend', contactHTML);
                });
            }
        } else {
            alert('Error fetching user data: ' + data.message);
        }
    } catch (error) {
        // console.error('Error:', error);
        alert('An error occurred while fetching user data.');
    }
}



// function loadUserData() {
//     // Load user profile
//     const userName = localStorage.getItem('userName');
//     const userAge = localStorage.getItem('userAge');
//     const userEmail = localStorage.getItem('userEmail');
//     const userPhone = localStorage.getItem('userPhone');
    
//     // Set profile fields if they exist
//     if (userName) {
//         const fullNameInput = document.getElementById('full-name');
//         const profileDisplayName = document.getElementById('profile-display-name');
        
//         if (fullNameInput) {
//             fullNameInput.value = userName;
//         }
        
//         if (profileDisplayName) {
//             profileDisplayName.textContent = userName;
//         }
//     }
    
//     if (userAge) {
//         const ageInput = document.getElementById('age');
//         if (ageInput) {
//             ageInput.value = userAge;
//         }
//     }
    
//     if (userEmail) {
//         const emailInput = document.getElementById('email');
//         if (emailInput) {
//             emailInput.value = userEmail;
//         }
//     }
    
//     if (userPhone) {
//         const phoneInput = document.getElementById('phone');
//         if (phoneInput) {
//             phoneInput.value = userPhone;
//         }
//     }
    
//     // Load period prediction
//     updatePeriodPrediction();
    
//     // Load settings
//     loadSettings();
// }

// function saveUserData() {
//     const fullNameInput = document.getElementById('full-name');
//     const ageInput = document.getElementById('age');
//     const emailInput = document.getElementById('email');
//     const phoneInput = document.getElementById('phone');
    
//     if (fullNameInput) {
//         localStorage.setItem('userName', fullNameInput.value);
//     }
    
//     if (ageInput) {
//         localStorage.setItem('userAge', ageInput.value);
//     }
    
//     if (emailInput) {
//         localStorage.setItem('userEmail', emailInput.value);
//     }
    
//     if (phoneInput) {
//         localStorage.setItem('userPhone', phoneInput.value);
//     }
// }
async function saveUserData() {
    const fullNameInput = document.getElementById('full-name').value;
    const ageInput = document.getElementById('age').value;
    const emailInput = document.getElementById('email').value;
    const phoneInput = document.getElementById('phone').value;
    const genderInput = document.getElementById('gender').value;


    const emergencyContacts = [];
    document.querySelectorAll('.emergency-contact').forEach((contact, index) => {
        const name = document.getElementById(`contact-name-${index + 1}`).value;
        const phone = document.getElementById(`contact-phone-${index + 1}`).value;
        const relation = document.getElementById(`contact-relation-${index + 1}`).value;

        if (name && phone && relation) {
            emergencyContacts.push({ name, phone, relation });
        }
    });


    // Create a user object
    const userData = {
        name: fullNameInput,
        age: ageInput,
        email: emailInput,
        phone: phoneInput,
        gender: genderInput,
        emergencyContacts
    };

    try {
        const response = await fetch(`${backendUrl}/saveUserData`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        if (response.ok) {
            alert('User data saved successfully!');
        } else {
            alert('Error saving user data: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving user data.');
    }
}


function saveMood(mood) {
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing mood data
    let moodData = JSON.parse(localStorage.getItem('moodData')) || {};
    
    // Save today's mood
    moodData[today] = mood;
    
    // Save to localStorage
    localStorage.setItem('moodData', JSON.stringify(moodData));
}

function saveActivityState(activityId, isCompleted) {
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing activity data
    let activityData = JSON.parse(localStorage.getItem('activityData')) || {};
    
    // Initialize today's data if it doesn't exist
    if (!activityData[today]) {
        activityData[today] = {};
    }
    
    // Save activity state
    activityData[today][activityId] = isCompleted;
    
    // Save to localStorage
    localStorage.setItem('activityData', JSON.stringify(activityData));
}

function saveActivityData(name, date, time, duration, category, notes) {
    // Get existing activities
    let activities = JSON.parse(localStorage.getItem('selfCareActivities')) || [];
    
    // Add new activity
    activities.push({
        name,
        date,
        time,
        duration,
        category,
        notes,
        completed: false,
        id: 'activity-' + Date.now()
    });
    
    // Save to localStorage
    localStorage.setItem('selfCareActivities', JSON.stringify(activities));
}

function saveMoodData(mood, stress, notes) {
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing mood data
    let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || {};
    
    // Save today's data
    moodHistory[today] = {
        mood,
        stress,
        notes,
        timestamp: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
}

function saveSetting(settingName, isEnabled) {
    // Get existing settings
    let settings = JSON.parse(localStorage.getItem('appSettings')) || {};
    
    // Update setting
    settings[settingName] = isEnabled;
    
    // Save to localStorage
    localStorage.setItem('appSettings', JSON.stringify(settings));
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('appSettings')) || {};
    
    // Apply settings to toggle switches
    for (const [settingName, isEnabled] of Object.entries(settings)) {
        const toggleElement = document.getElementById(settingName);
        if (toggleElement) {
            toggleElement.checked = isEnabled;
        }
    }
}

// Save Profile Button
const saveProfileBtn = document.getElementById('save-profile-btn');
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
        saveUserData();
        alert('Profile saved successfully!');
    });
}

// Add Contact Button
// const addContactBtn = document.getElementById('add-contact-btn');
// if (addContactBtn) {
//     addContactBtn.addEventListener('click', function() {
//         // In a real app, this would add a new contact form
//         alert('In a real app, this would add a new emergency contact form.');
//     });
// }
document.getElementById('add-contact-btn').addEventListener('click', function() {
    const contactList = document.querySelector('.emergency-contacts-list');
    const contactCount = document.querySelectorAll('.emergency-contact').length + 1;

    const newContactHTML = `
        <div class="emergency-contact">
            <div class="contact-details">
                <div class="form-group">
                    <label for="contact-name-${contactCount}">Name</label>
                    <input type="text" id="contact-name-${contactCount}">
                </div>
                <div class="form-group">
                    <label for="contact-phone-${contactCount}">Phone Number</label>
                    <input type="tel" id="contact-phone-${contactCount}">
                </div>
                <div class="form-group">
                    <label for="contact-relation-${contactCount}">Relationship</label>
                    <input type="text" id="contact-relation-${contactCount}">
                </div>
            </div>
            <button  class="delete-contact-btn" >
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    contactList.insertAdjacentHTML('beforeend', newContactHTML);
});
// Delete Contact Buttons
// const deleteContactBtns = document.querySelectorAll('.delete-contact-btn');
//  deleteContactBtns.forEach(btn => {
//     btn.addEventListener('click', function() {
//         if (confirm('Are you sure you want to delete this contact?')) {
//         }
//     });
// });

document.querySelector('.emergency-contacts-list').addEventListener('click', function (e) {
    const deleteBtn = e.target.closest('.delete-contact-btn');

    // Only proceed if you actually clicked on a delete button
    if (deleteBtn && e.currentTarget.contains(deleteBtn)) {
        const index = Array.from(document.querySelectorAll('.delete-contact-btn')).indexOf(deleteBtn);
        //const confirmDelete = confirm('Are you sure you want to delete this contact?');
        // if (confirmDelete) {
        //     deleteContact(index);
        // }
        customIf("Are you sure you want to delete this contact?").then((confirmed) => {
            if (confirmed) {
                deleteContact(index);
            } 
          });
          
    }
});

async function deleteContact(index) {
    const userEmail = localStorage.getItem('email'); // Get user email

    try {
        const response = await fetch(`${backendUrl}/deleteEmergencyContact`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail, contactId: index })
        });

        const data = await response.json();
        if (response.ok) {
            alert('Contact deleted successfully!');
            loadUserData(); // Refresh contacts after deletion
        } else {
            alert('Error deleting contact: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting contact.');
    }
}


// Settings Save Button
const saveSettingsBtn = document.getElementById('save-settings-btn');
if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', function() {
        // Save all settings
        const toggleSwitches = document.querySelectorAll('.settings-container .toggle-switch input');
        toggleSwitches.forEach(toggle => {
            saveSetting(toggle.id, toggle.checked);
        });
        
        alert('Settings saved successfully!');
    });
}

// Account Settings Buttons
const changePasswordBtn = document.getElementById('change-password-btn');
if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', function() {
        alert('Change password functionality will be implemented in a future update.');
    });
}

const exportDataBtn = document.getElementById('export-data-btn');
if (exportDataBtn) {
    exportDataBtn.addEventListener('click', function() {
        alert('Export data functionality will be implemented in a future update.');
    });
}

const deleteAccountBtn = document.getElementById('delete-account-btn');
if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', function() {
        // if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        //     alert('This would delete your account and all associated data.');
        // }
        customIf("Are you sure you want to delete your account? This action cannot be undone.").then((confirmed) => {
            if (confirmed) {
                alert('This would delete your account and all associated data.');
            } 
          });
          
    });
}

const highAlertBtn = document.getElementById('high-alert-btn');

if (highAlertBtn) {
    highAlertBtn.addEventListener("click", async function () {
      //const confirmed = confirm("Are you sure you want to activate High Alert SOS?");
     // if (!confirmed) return;
     const result = await customIf("Are you sure you want to activate High Alert SOS?");
        if (!result) {
            return;
        }

      const email = localStorage.getItem("email");
      if (!email) {
        alert("User not logged in.");
        return;
      }
  
      // ✅ Create link to live-map page
      const liveLocationLink = `http://localhost:5000/dashboard/live-map.html?email=${encodeURIComponent(email)}`;
  
      // ✅ Notify backend to send alert with live location link
      try {
        const alertRes = await fetch("https://hershield-rn5q.onrender.com/api/sent-alert", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, liveLocationLink }),
        });
  
        if (!alertRes.ok) throw new Error("Failed to send alert to contacts");
      } catch (error) {
        console.error("❌ Backend alert failed:", error.message);
      }
  
      // ✅ Start live location updates
      navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            await fetch("https://hershield-rn5q.onrender.com/api/update-location", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, latitude, longitude }),
            });
          } catch (err) {
            console.error("❌ Location update failed", err);
          }
        },
        (err) => console.error("⚠️ Location permission error", err),
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
      );
  
      // ✅ Black out the screen
      document.body.style.backgroundColor = "black";
      document.body.innerHTML = "";
  
      // ✅ Start screen recording using your custom upload flow
      startHighAlertRecording();

    });
  }
  
let highAlertRecorder;
let isHighAlertRecording = false;
  async function startHighAlertRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        highAlertRecorder = new MediaRecorder(stream);

        highAlertRecorder.ondataavailable = async (event) => {
            if (event.data.size > 0) {
                const blob = new Blob([event.data], { type: "video/webm" });
                await uploadHighAlertChunk(blob);
            }
        };

        highAlertRecorder.start(60000); // 1-minute chunks
        isHighAlertRecording = true;
        console.log("🚨 High Alert Recording started (1-min chunks)");
    } catch (err) {
        console.error("❌ Error accessing media devices:", err);
    }
}

// 📤 Upload Blob to Supabase
async function uploadHighAlertChunk(blob) {
    try {
        const fileName = `highalert-${Date.now()}.webm`;
        const { data, error } = await supabase.storage
            .from('sosvideos')
            .upload(fileName, blob, { contentType: "video/webm" });

        if (error) throw new Error(error.message);
        console.log("✅ Uploaded:", fileName);

        // Optionally: Send alert
        const signedUrl = await generateSignedHighAlertUrl(fileName);
        const userEmail = localStorage.getItem("email");

        if (userEmail && signedUrl) {
            await fetch("https://hershield-rn5q.onrender.com/send-alert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: userEmail, signedUrl })
            });
            console.log("📨 Alert sent with video link");
        }
    } catch (error) {
        console.error("❌ Upload error:", error.message);
    }
}

// 🔑 Generate Signed URL
async function generateSignedHighAlertUrl(fileName) {
    try {
        const { data, error } = await supabase
            .storage
            .from('sosvideos')
            .createSignedUrl(fileName, 600); // 10 minutes

        if (error) throw new Error(error.message);
        return data.signedUrl;
    } catch (error) {
        console.error("❌ Failed to generate signed URL:", error.message);
        return null;
    }
}
    

window.alert = function(message) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);
  
    setTimeout(() => {
      toast.remove();
    }, 3000); // Visible for 10s total
  };
  