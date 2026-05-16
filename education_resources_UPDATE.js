<!--
=====================================================================
  HOW TO ADD THESE NEW WORKSHEETS TO YOUR EDUCATION PAGE
  
  Step 1: Upload all 10 PDF files to GitHub
  Step 2: In your repo, click "Add file" > "Upload files"
  Step 3: Navigate into the "resources/" folder (create it if needed)
  Step 4: Upload all 10 PDF files
  Step 5: Replace the "var resources = [...]" array in education.html
          with the one below
  Step 6: Commit changes — done!
=====================================================================
-->

<!-- PASTE THIS ENTIRE BLOCK to replace "var resources = [...]" in education.html -->

var resources = [

  /* ── COMMUNICATION ─────────────────────────────────── */
  {
    title: "My Communication Journal",
    desc: "Helps children express needs, feelings, and wants. Includes communication style checklist, favourite word log, and a weekly goal.",
    cat: "communication", age: "early",
    tags: ["communication", "expression", "journal", "feelings"],
    icon: "💬", iconBg: "#e8f1fc", iconColor: "#1a5fa8",
    badge: "badge-blue", badgeText: "Communication",
    file: "resources/Communication_My_Communication_Journal.pdf"
  },
  {
    title: "AAC Practice Worksheet",
    desc: "Augmentative & Alternative Communication practice. Sentence starters, conversation scripts, and a weekly star chart.",
    cat: "communication", age: "school",
    tags: ["AAC", "speech", "device", "conversation"],
    icon: "📱", iconBg: "#e8f1fc", iconColor: "#1a5fa8",
    badge: "badge-blue", badgeText: "Communication",
    file: "resources/Communication_AAC_Practice_Worksheet.pdf"
  },

  /* ── MOTOR SKILLS ───────────────────────────────────── */
  {
    title: "Fine Motor Skills Practice",
    desc: "Pencil grip check, tracing exercises, scissor skill levels, and a daily fine motor activity log.",
    cat: "motor", age: "early",
    tags: ["fine motor", "pencil grip", "tracing", "cutting"],
    icon: "✏️", iconBg: "#fdf2e0", iconColor: "#c47d15",
    badge: "badge-gold", badgeText: "Motor Skills",
    file: "resources/MotorSkills_FineMotor_Practice.pdf"
  },
  {
    title: "Sensory Play Activity Cards",
    desc: "10 structured sensory and gross motor activities including playdough, obstacle courses, and weighted blanket techniques. Includes weekly tracker.",
    cat: "motor", age: "early",
    tags: ["sensory", "gross motor", "play", "proprioception"],
    icon: "🖐️", iconBg: "#fdf2e0", iconColor: "#c47d15",
    badge: "badge-gold", badgeText: "Motor Skills",
    file: "resources/MotorSkills_Sensory_Play_Activities.pdf"
  },

  /* ── READING ────────────────────────────────────────── */
  {
    title: "Sight Words Flashcard Sheet",
    desc: "Cut-out flashcard sheets with Dolch pre-primer and high-frequency words. Includes instructions and a progress star chart.",
    cat: "reading", age: "early",
    tags: ["sight words", "flashcards", "reading", "literacy"],
    icon: "🔠", iconBg: "#fdeaea", iconColor: "#b83232",
    badge: "badge-red", badgeText: "Reading",
    file: "resources/Reading_Sight_Words_Flashcards.pdf"
  },
  {
    title: "Reading Comprehension: A Day at the Park",
    desc: "Short story with literal and inferential comprehension questions. Great for school-age readers building understanding beyond decoding.",
    cat: "reading", age: "school",
    tags: ["comprehension", "reading", "inference", "story"],
    icon: "📖", iconBg: "#fdeaea", iconColor: "#b83232",
    badge: "badge-red", badgeText: "Reading",
    file: "resources/Reading_Comprehension_A_Day_at_the_Park.pdf"
  },

  /* ── IEP / SCHOOL ───────────────────────────────────── */
  {
    title: "IEP Goal Progress Tracker",
    desc: "Track up to 3 IEP goals with weekly evidence logs, scoring scale (1–4), and parent notes section. Ready to bring to IEP meetings.",
    cat: "iep", age: "school",
    tags: ["IEP", "goals", "progress", "tracking", "school"],
    icon: "📋", iconBg: "#e0f5f1", iconColor: "#0d7f6e",
    badge: "badge-teal", badgeText: "IEP / School",
    file: "resources/IEP_Goal_Progress_Tracker.pdf"
  },
  {
    title: "Classroom Accommodations Checklist",
    desc: "Evidence-based accommodations across sensory, communication, academic, and social-behavioural domains. For teachers and families.",
    cat: "iep", age: "school",
    tags: ["accommodations", "classroom", "IEP", "inclusion", "teacher"],
    icon: "🏫", iconBg: "#e0f5f1", iconColor: "#0d7f6e",
    badge: "badge-teal", badgeText: "IEP / School",
    file: "resources/IEP_Classroom_Accommodations_Checklist.pdf"
  },

  /* ── SOCIAL SKILLS ──────────────────────────────────── */
  {
    title: "Emotions Recognition Worksheet",
    desc: "Identify 8 core emotions, practise recognizing feelings in social situations, and build personal coping strategies.",
    cat: "social", age: "school",
    tags: ["emotions", "feelings", "social", "coping", "recognition"],
    icon: "😊", iconBg: "#f0eefa", iconColor: "#5b3fa8",
    badge: "badge-purple", badgeText: "Social Skills",
    file: "resources/SocialSkills_Emotions_Recognition.pdf"
  },
  {
    title: "Social Story: Making a New Friend",
    desc: "A 6-step social story covering noticing, approaching, greeting, listening, finding common ground, and ending a conversation. Includes practice script.",
    cat: "social", age: "school",
    tags: ["social story", "friendship", "conversation", "scripts"],
    icon: "🤝", iconBg: "#f0eefa", iconColor: "#5b3fa8",
    badge: "badge-purple", badgeText: "Social Skills",
    file: "resources/SocialSkills_Making_A_New_Friend.pdf"
  },

];

/*
  Also add this CSS for the purple badge to your style.css:

  .badge-purple { background: #f0eefa; color: #5b3fa8; }

  And add this filter button to your education.html filter bar
  (in the Category row of buttons):

  <button class="filter-btn" onclick="setFilter('cat','social',this)">Social Skills</button>

  (This button may already be there from the previous upgrade — check first!)
*/
