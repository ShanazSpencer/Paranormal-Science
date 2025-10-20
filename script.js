// --- STATE MANAGEMENT ---
let currentScreen = 0;
let score = 0;
const totalScore = 15;
let screenStates = []; // To store answers and states

// --- DOM ELEMENTS ---
const screenTitle = document.getElementById('screen-title');
const screenContent = document.getElementById('screen-content');
const backBtn = document.getElementById('back-btn');
const homeBtn = document.getElementById('home-btn');
const nextBtn = document.getElementById('next-btn');

// --- SCREEN DATA ARRAY ---
// This array holds all the content for the 20 screens
const screenData = [
    // --- Section 1: The Mission ---
    {
        title: "Paranormal Physics: The Science of a Haunting",
        content: `
            <p>Strange noises, slamming doors, and sudden chills... are these signs of the supernatural? Or can they be explained by science?</p>
            <p>In this module, you will use your <strong>Unit 5 Physics</strong> knowledge to investigate the claims.</p>
            <button class="start-btn" onclick="goNext()">Begin Investigation</button>
        `,
        type: "intro"
    },
    {
        title: "Your Investigation Objectives",
        content: `
            <ul>
                <li>Apply the <strong>Laws of Thermodynamics</strong> to explain "energy draining" cold spots.</li>
                <li>Use <strong>Material Science</strong> to explain strange creaks and moving objects.</li>
                <li>Use <strong>Bernoulli's Principle</strong> to explain slamming doors and rattling windows.</li>
            </ul>
        `,
        type: "info" // This will now auto-enable the 'Next' button
    },
    {
        title: "The Case File: 13 Blackwood Manor",
        content: `
            <p>Watch the video below to see the 'evidence' collected at the manor.</p>
            <div style="width:100%; height:300px; background-color:#000; color:#fff; display:flex; justify-content:center; align-items:center; font-size:1.5rem; border-radius: 8px;">
                [Simulated Video: A door creaks... a light flickers... a door slams.]
            </div>
            <p style="text-align:center; margin-top:10px;"><em>Video shows: a door creaking, an investigator noting a "cold spot," and a door slamming.</em></p>
        `,
        type: "info" // This will now auto-enable the 'Next' button
    },
    {
        title: "Key Term: Paranormal",
        content: `
            <p>"Paranormal" means 'beyond normal.' It's for claims, like ghosts, that science cannot currently explain.</p>
            <div class="gap-fill-container">
                <p>Events that are 'beyond normal' are called <input type="text" id="gap-fill" class="gap-fill-input" data-answer="paranormal">.</p>
                <div class="feedback" id="feedback"></div>
            </div>
        `,
        type: "gap-fill"
    },

    // --- Section 2: Thermodynamics ---
    {
        title: "Clue #1: The Unnatural Cold",
        content: `
            <p>Investigators claim spirits 'drain heat energy' from the air to manifest, causing cold spots.</p>
            <p>This claim goes against the fundamental laws of energy, a topic called <strong>Thermodynamics</strong>.</p>
        `,
        type: "info" // This will now auto-enable the 'Next' button
    },
    {
        title: "Physics Law: The First Law of Thermodynamics",
        content: `
            <p>This is a simple but unbreakable rule: <strong>Energy cannot be created or destroyed, only moved or changed from one form to another.</strong></p>
            <div class="analogy">
                <p><strong>Analogy:</strong> You can't *destroy* the heat in a room to make it cold. You can only *move* that heat somewhere else (like an air conditioner moves it outside).</p>
            </div>
            <div class="gap-fill-container">
                <p>Energy cannot be created or <input type="text" id="gap-fill" class="gap-fill-input" data-answer="destroyed">, only moved or changed.</p>
                <div class="feedback" id="feedback"></div>
            </div>
        `,
        type: "gap-fill"
    },
    {
        title: "Material Property: Specific Heat Capacity",
        content: `
            <p>Different materials need different amounts of heat to warm up. A material that needs a *lot* of energy to get hot has a 'high specific heat capacity'.</p>
            <div class="example">
                <p><strong>Example:</strong> A stone floor (high specific heat capacity) feels cold because it takes a lot of heat *from your hand* to warm up. It's a heat sponge!</p>
            </div>
            <div class="gap-fill-container">
                <p>The measure of how much heat a material needs to warm up is its <input type="text" id="gap-fill" class="gap-fill-input" data-answer="specific heat capacity">.</p>
                <div class="feedback" id="feedback"></div>
            </div>
        `,
        type: "gap-fill"
    },
    {
        title: "Knowledge Check: Thermodynamics",
        content: `
            <p>You're investigating a cellar. Why does the stone wall feel colder than a wooden crate, even if they are the same temperature?</p>
            <div class="mcq-options" id="mcq-options">
                <button class="mcq-option" data-correct="false">The wood is a better insulator.</button>
                <button class="mcq-option" data-correct="true">The stone has a higher specific heat capacity and conducts heat away from your hand faster.</button>
                <button class="mcq-option" data-correct="false">The stone is magically colder.</button>
            </div>
            <div class="feedback" id="feedback"></div>
        `,
        type: "mcq",
        points: 2
    },
    {
        title: "Case Solved: The 'Unnatural Cold'",
        content: `
            <p>You place a temperature sensor in the 'haunted' room. It shows the temperature is the same everywhere. Why did the investigator *feel* a cold spot when they stood near the brick fireplace?</p>
            <div class="mcq-options" id="mcq-options">
                <button class="mcq-option" data-correct="false">A ghost was standing there.</button>
                <button class="mcq-option" data-correct="true">The bricks have a high specific heat capacity and are drawing heat from the investigator's body, making them *feel* cold.</button>
                <button class="mcq-option" data-correct="false">The investigator was imagining it.</button>
            </div>
            <div class="feedback" id="feedback"></div>
        `,
        type: "mcq",
        points: 3
    },

    // --- Section 3: Material Science ---
    {
        title: "Clue #2: The Moaning Walls",
        content: `
            <p>The house groans and creaks at night. Is it a restless spirit, or can we explain it with <strong>Material Science</strong> - the study of how materials behave under pressure?</p>
        `,
        type: "info" // This will now auto-enable the 'Next' button
    },
    {
        title: "Material Properties: Stress and Strain",
        content: `
            <p>When a force pulls or pushes on an object (like a roof beam), it creates <strong>Stress</strong> inside it. The tiny change in the object's shape (a stretch or squash) is called <strong>Strain</strong>.</p>
            <div class="analogy">
                <p><strong>Analogy:</strong> Stretching a rubber band puts it under stress, and the amount it stretches is the strain.</p>
            </div>
            <div class="gap-fill-container">
                <p>The force inside a material is <input type="text" id="gap-fill" class="gap-fill-input" data-answer="stress">, and the change in its shape is <input type="text" id="gap-fill-2" class="gap-fill-input" data-answer="strain">.</p>
                <div class="feedback" id="feedback"></div>
            </div>
        `,
        type: "gap-fill"
    },
    {
        title: "Material Property: Thermal Expansion",
        content: `
            <p>Most materials get slightly <strong>bigger</strong> when they get hot and <strong>smaller</strong> when they get cold. This is called 'Thermal Expansion and Contraction'.</p>
            <div class="example">
                <p><strong>Example:</strong> At night, a house cools down. The wooden beams get slightly shorter. This movement creates stress and can cause loud creaking noises!</p>
            </div>
            <div class="gap-fill-container">
                <p>When things get cold, they get slightly <input type="text" id="gap-fill" class="gap-fill-input" data-answer="smaller">.</p>
                <div class="feedback" id="feedback"></div>
            </div>
        `,
        type: "gap-fill"
    },
    {
        title: "Knowledge Check: Material Science",
        content: `
            <p>A bridge has special joints to stop it from buckling in summer. This is to allow for...</p>
            <div class="mcq-options" id="mcq-options">
                <button class="mcq-option" data-correct="false">Stress and Strain</button>
                <button class="mcq-option" data-correct="false">Ghosts</button>
                <button class="mcq-option" data-correct="true">Thermal Expansion</button>
            </div>
            <div class="feedback" id="feedback"></div>
        `,
        type: "mcq",
        points: 2
    },
    {
        title: "Case Solved: The Footsteps",
        content: `
            <p>An investigator hears a 'footstep' from the floorboard above every time the heating turns on. What is the scientific cause?</p>
            <p>Complete the sentence using the drop-down menus.</p>
            <div class="select-container">
                The noise is caused by the
                <select id="select-1" class="select-dropdown" data-answer="Stress">
                    <option value="">...</option>
                    <option value="Stress">Stress</option>
                    <option value="Strain">Strain</option>
                    <option value="Expansion">Expansion</option>
                </select>
                on the wood as it undergoes thermal
                <select id="select-2" class="select-dropdown" data-answer="Expansion">
                    <option value="">...</option>
                    <option value="Stress">Stress</option>
                    <option value="Strain">Strain</option>
                    <option value="Expansion">Expansion</option>
                </select>
                from the heat, causing a tiny change in shape, or
                <select id="select-3" class="select-dropdown" data-answer="Strain">
                    <option value="">...</option>
                    <option value="Stress">Stress</option>
                    <option value="Strain">Strain</option>
                    <option value="Expansion">Expansion</option>
                </select>.
            </div>
            <button class="check-btn" id="check-btn">Check Answers</button>
            <div class="feedback" id="feedback"></div>
        `,
        type: "dropdown-check",
        points: 3
    },

    // --- Section 4: Bernoulli's Principle ---
    {
        title: "Clue #3: The Slamming Door",
        content: `
            <p>A door slams shut in an empty hallway. An invisible force? Or <strong>Bernoulli's Principle</strong>, a key rule of how fluids (like air) move.</p>
        `,
        type: "info" // This will now auto-enable the 'Next' button
    },
    {
        title: "Physics Law: Bernoulli's Principle",
        content: `
            <p>Bernoulli's Principle states that a stream of <strong>fast-moving air has lower pressure</strong> than the <strong>slow-moving air</strong> around it.</p>
            <div class="analogy">
                <p><strong>Analogy:</strong> Blow over the top of a piece of paper. The fast air on top has low pressure, while the still air underneath has higher pressure. The high pressure pushes the paper upwards!</p>
            </div>
            <div class="gap-fill-container">
                <p>Fast-moving air has <input type="text" id="gap-fill" class="gap-fill-input" data-answer="lower"> pressure than slow-moving air.</p>
                <div class="feedback" id="feedback"></div>
            </div>
        `,
        type: "gap-fill"
    },
    {
        title: "Knowledge Check: Bernoulli's Principle",
        content: `
            <p>A fast train rushes through a station. Why are you warned to stand back from the platform edge?</p>
            <div class="mcq-options" id="mcq-options">
                <button class="mcq-option" data-correct="false">The train might wobble.</button>
                <button class="mcq-option" data-correct="true">The fast-moving air of the train creates a low-pressure zone that can pull you towards the track.</button>
                <button class="mcq-option" data-correct="false">The train driver might see you.</button>
            </div>
            <div class="feedback" id="feedback"></div>
        `,
        type: "mcq",
        points: 2
    },
    {
        title: "Case Solved: The Invisible Force",
        content: `
            <p>A window is open in a room, and a strong wind is blowing outside. The door to the room is slightly ajar. Why might it slam shut?</p>
            <div class="mcq-options" id="mcq-options">
                <button class="mcq-option" data-correct="false">The wind is a spirit that pushed the door.</button>
                <button class="mcq-option" data-correct="true">Bernoulli's Principle: The fast-moving wind outside creates low pressure. The still, high-pressure air inside the house pushes the door shut.</button>
                <button class="mcq-option" data-correct="false">The house is shrinking due to thermal contraction.</button>
            </div>
            <div class="feedback" id="feedback"></div>
        `,
        type: "mcq",
        points: 3
    },

    // --- Section 5: Final Report ---
    {
        title: "Final Report: Your Investigation Summary",
        content: `
            <p><strong>Investigation Complete!</strong></p>
            <p>You have successfully used the principles of Thermodynamics, Material Science, and Bernoulli's Law to explain the 'haunting' of 13 Blackwood Manor.</p>
            <p>Science can explain many things that seem mysterious at first!</p>
            <button class="start-btn" onclick="goNext()">See Your Score</button>
        `,
        type: "info" // This will now auto-enable the 'Next' button
    },
    {
        title: "Your Final Score",
        content: `
            <div id="score-container">
                <h2>Mission Report</h2>
                <div id="score-total"></div>
                <div id="score-details">
                    <p>Thermodynamics Check: <span id="score-1">0 / 2</span></p>
                    <p>Cold Spot Assessment: <span id="score-2">0 / 3</span></p>
                    <p>Material Science Check: <span id="score-3">0 / 2</span></p>
                    <p>Floorboard Assessment: <span id="score-4">0 / 3</span></p>
                    <p>Bernoulli Check: <span id="score-5">0 / 2</span></p>
                    <p>Slamming Door Assessment: <span id="score-6">0 / 3</span></p>
                    <hr style="margin: 10px 0;">
                    <p><strong>Total:</strong> <span id="score-total-final">0 / 15</span></p>
                </div>
                <button class="check-btn" onclick="goHome()">Try Again</button>
            </div>
        `,
        type: "score"
    }
];

// --- APP LOGIC ---

/**
 * Initializes the application and renders the first screen
 */
function init() {
    // Initialize the screenStates array to store progress
    screenStates = new Array(screenData.length).fill(null).map(() => ({
        completed: false,
        score: 0
    }));

    // Add event listeners for navigation
    backBtn.addEventListener('click', goBack);
    homeBtn.addEventListener('click', goHome);
    nextBtn.addEventListener('click', goNext);

    // Render the first screen
    renderScreen();
}

/**
 * Renders the content for the current screen
 */
function renderScreen() {
    // Get the data for the current screen
    const screen = screenData[currentScreen];
    
    // Update the title and content
    screenTitle.innerHTML = screen.title;
    screenContent.innerHTML = screen.content;

    // *** THIS IS THE FIX ***
    // If the screen is just for info, mark it 'completed' so 'Next' is enabled
    if (screen.type === 'info') {
        screenStates[currentScreen].completed = true; 
    }
    // *** END OF FIX ***

    // Set up interactivity based on the screen type
    const feedback = document.getElementById('feedback');
    if (screen.type === 'gap-fill') {
        setupGapFill(feedback);
    } else if (screen.type === 'mcq') {
        setupMCQ(feedback, screen.points);
    } else if (screen.type === 'dropdown-check') {
        setupDropdownCheck(feedback, screen.points);
    } else if (screen.type === 'score') {
        renderScore();
    }
    
    // Update the navigation buttons
    updateNavButtons();
}

/**
 * Updates the state and visibility of navigation buttons
 */
function updateNavButtons() {
    // Hide 'Back' on the first screen
    backBtn.style.visibility = (currentScreen === 0) ? 'hidden' : 'visible';

    // Hide 'Next' on the first (intro) and last (score) screens
    // On other screens, disable it until the task is completed
    const screen = screenData[currentScreen];
    if (screen.type === 'intro' || screen.type === 'score') {
        nextBtn.style.visibility = 'hidden';
    } else {
        nextBtn.style.visibility = 'visible';
        // Disable 'Next' until the screen is marked as completed
        nextBtn.disabled = !screenStates[currentScreen].completed;
    }
}

/**
 * Sets up a gap-fill exercise
 */
function setupGapFill(feedback) {
    const inputs = screenContent.querySelectorAll('.gap-fill-input');
    
    const checkAnswers = () => {
        let allCorrect = true;
        inputs.forEach(input => {
            const answer = input.getAttribute('data-answer').toLowerCase();
            if (input.value.toLowerCase().trim() !== answer) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedback.textContent = "Correct! Well done.";
            feedback.className = "feedback correct";
            screenStates[currentScreen].completed = true;
            nextBtn.disabled = false;
        } else {
            feedback.textContent = "Not quite, try again.";
            feedback.className = "feedback incorrect";
            screenStates[currentScreen].completed = false;
            nextBtn.disabled = true;
        }
    };

    inputs.forEach(input => {
        input.addEventListener('input', checkAnswers);
    });
}

/**
 * Sets up a multiple-choice question
 */
function setupMCQ(feedback, points) {
    const options = screenContent.querySelectorAll('.mcq-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Prevent re-clicking
            if (screenStates[currentScreen].completed) return;

            const isCorrect = option.getAttribute('data-correct') === 'true';

            if (isCorrect) {
                feedback.textContent = `Correct! +${points} points.`;
                feedback.className = "feedback correct";
                option.classList.add('correct-choice');
                
                // Add score only once
                screenStates[currentScreen].score = points;
                updateTotalScore();
            } else {
                feedback.textContent = "That's not the right answer.";
                feedback.className = "feedback incorrect";
                option.classList.add('incorrect-choice');
                
                // Find and show the correct answer
                const correctOption = screenContent.querySelector('[data-correct="true"]');
                correctOption.classList.add('correct-choice');
            }

            // Mark as completed and enable 'Next'
            screenStates[currentScreen].completed = true;
            nextBtn.disabled = false;
            // Disable all options
            options.forEach(btn => btn.disabled = true);
        });
    });
}

/**
 * Sets up the drop-down check assessment
 */
function setupDropdownCheck(feedback, points) {
    const checkBtn = document.getElementById('check-btn');
    const selects = screenContent.querySelectorAll('.select-dropdown');
    
    checkBtn.addEventListener('click', () => {
        let allCorrect = true;
        selects.forEach(select => {
            const answer = select.getAttribute('data-answer');
            if (select.value !== answer) {
                allCorrect = false;
            }
        });

        if (allCorrect) {
            feedback.textContent = `Perfect! +${points} points.`;
            feedback.className = "feedback correct";
            
            // Add score only once
            if (!screenStates[currentScreen].completed) {
                screenStates[currentScreen].score = points;
                updateTotalScore();
            }
            
            screenStates[currentScreen].completed = true;
            nextBtn.disabled = false;
            checkBtn.disabled = true;
        } else {
            feedback.textContent = "One or more answers are incorrect. Try again.";
            feedback.className = "feedback incorrect";

            // Reset score if they were wrong after being right
            if (screenStates[currentScreen].completed) {
                screenStates[currentScreen].score = 0;
                updateTotalScore();
            }
            screenStates[currentScreen].completed = false;
            nextBtn.disabled = true;
        }
    });

    // Add listener to reset if they change their answer
    selects.forEach(select => {
        select.addEventListener('change', () => {
             if (screenStates[currentScreen].completed) {
                feedback.textContent = "Your answer has changed. Please check again.";
                feedback.className = "feedback";
                checkBtn.disabled = false;
                nextBtn.disabled = true;
                screenStates[currentScreen].completed = false;
                screenStates[currentScreen].score = 0;
                updateTotalScore();
             }
        });
    });
}


/**
 * Renders the final score screen
 */
function renderScore() {
    document.getElementById('score-1').textContent = `${screenStates[7].score} / 2`;
    document.getElementById('score-2').textContent = `${screenStates[8].score} / 3`;
    document.getElementById('score-3').textContent = `${screenStates[12].score} / 2`;
    document.getElementById('score-4').textContent = `${screenStates[13].score} / 3`;
    document.getElementById('score-5').textContent = `${screenStates[16].score} / 2`;
    document.getElementById('score-6').textContent = `${screenStates[17].score} / 3`;
    
    document.getElementById('score-total').textContent = `${score} / ${totalScore}`;
    document.getElementById('score-total-final').textContent = `${score} / ${totalScore}`;
}

/**
 * Recalculates the total score
 */
function updateTotalScore() {
    score = 0;
    screenStates.forEach(state => {
        score += state.score;
    });
}

// --- NAVIGATION FUNCTIONS ---

function goNext() {
    if (currentScreen < screenData.length - 1) {
        currentScreen++;
        renderScreen();
    }
}

function goBack() {
    if (currentScreen > 0) {
        currentScreen--;
        renderScreen();
    }
}

function goHome() {
    currentScreen = 0;
    score = 0;
    // Reset all screen states
    screenStates = new Array(screenData.length).fill(null).map(() => ({
        completed: false,
        score: 0
    }));
    renderScreen();
}

// --- INITIALIZE THE APP ---
init();