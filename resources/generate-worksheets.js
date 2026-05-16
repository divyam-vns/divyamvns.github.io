const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE = '/tmp/cc-agent/66793226/project/worksheets';

const worksheets = {
  speech: [
    { id: 'WS-ST01', title: 'Core Vocabulary Communication Board', desc: '16-symbol core vocabulary board for AAC introduction', ages: '2–adult' },
    { id: 'WS-ST02', title: 'Social Scripting Practice Sheet', desc: 'Structured conversation scripts for common social situations', ages: '6–adult' },
    { id: 'WS-ST03', title: 'Expressive Language Visual Prompts', desc: 'Visual sentence frames to build expressive language', ages: '3–10' },
    { id: 'WS-ST04', title: 'Requesting Help Communication Card', desc: 'Picture-based card for requesting help in different settings', ages: '2–12' },
    { id: 'WS-ST05', title: 'Feelings & Needs Choice Board', desc: 'Interactive board linking emotions to needs and requests', ages: '3–adult' },
    { id: 'WS-ST06', title: 'Conversation Turn-Taking Visual', desc: 'Visual guide for back-and-forth conversation with prompts', ages: '5–16' },
    { id: 'WS-ST07', title: 'Yes/No & Choice Making Board', desc: 'Simple yes/no and binary choice communication board', ages: '2–adult' },
    { id: 'WS-ST08', title: 'Daily Communication Journal', desc: 'Structured daily log for tracking communication attempts and modes', ages: '5–adult' },
    { id: 'WS-ST09', title: 'WH-Question Practice Sheet', desc: 'Who, What, Where, When, Why question practice with picture prompts', ages: '4–12' },
    { id: 'WS-ST10', title: 'Pragmatic Language Checklist', desc: 'Checklist for social language skills: greetings, farewells, topic maintenance', ages: '6–16' },
    { id: 'WS-ST11', title: 'AAC Navigation Practice Grid', desc: 'Practice grid for navigating AAC device categories and pages', ages: '4–adult' },
    { id: 'WS-ST12', title: 'Story Retelling Graphic Organizer', desc: 'Visual organizer for retelling stories with beginning, middle, end', ages: '5–14' },
    { id: 'WS-ST13', title: 'Functional Request Phrase Builder', desc: 'Build "I want + object" and "I need + object" phrases visually', ages: '3–10' },
    { id: 'WS-ST14', title: 'Nonverbal Communication Cues Chart', desc: 'Chart showing body language, facial expressions, and gestures', ages: '8–adult' },
    { id: 'WS-ST15', title: 'Phone & Video Call Script', desc: 'Structured script for making and receiving phone/video calls', ages: '10–adult' },
    { id: 'WS-ST16', title: 'Category Sorting Speech Activity', desc: 'Sort words/pictures into categories to build vocabulary', ages: '4–10' },
    { id: 'WS-ST17', title: 'Following Directions Practice', desc: '1-step, 2-step, and 3-step direction practice with visuals', ages: '3–10' },
    { id: 'WS-ST18', title: 'Describing Objects Worksheet', desc: 'Use attributes (color, shape, size, function) to describe objects', ages: '5–12' },
    { id: 'WS-ST19', title: 'Problem-Solving Communication Flow', desc: 'Visual flowchart: identify problem, consider options, communicate choice', ages: '8–adult' },
    { id: 'WS-ST20', title: 'Self-Advocacy Script Cards', desc: 'Script cards for stating needs, setting boundaries, and requesting accommodations', ages: '10–adult' },
  ],
  ot: [
    { id: 'WS-OT01', title: 'Fine Motor Tracing & Pencil Control', desc: 'Progressive tracing from lines to letter formation', ages: '3–8' },
    { id: 'WS-OT02', title: 'Daily Living Routine Checklist', desc: 'Visual step-by-step checklists for morning and bedtime', ages: '4–12' },
    { id: 'WS-OT03', title: 'Bilateral Coordination Activity Cards', desc: '8 bilateral coordination activities with difficulty ratings', ages: '4–10' },
    { id: 'WS-OT04', title: 'Scissor Skills Practice Sheet', desc: 'Progressive cutting lines: straight, curved, zigzag, shapes', ages: '3–8' },
    { id: 'WS-OT05', title: 'Pencil Grip Guide & Practice', desc: 'Visual guide for correct tripod grip with practice exercises', ages: '3–8' },
    { id: 'WS-OT06', title: 'Hand Strength Exercise Log', desc: 'Daily log for squeeze, pinch, and grip strengthening activities', ages: '4–12' },
    { id: 'WS-OT07', title: 'Dressing Skills Sequence Cards', desc: 'Step-by-step visual cards for putting on clothes, shoes, zippers', ages: '3–10' },
    { id: 'WS-OT08', title: 'Mealtime Skills Checklist', desc: 'Checklist for utensil use, cup drinking, and table manners', ages: '2–10' },
    { id: 'WS-OT09', title: 'Playdough & Clay Activity Cards', desc: '10 hand-strengthening activities using playdough and clay', ages: '3–10' },
    { id: 'WS-OT10', title: 'Visual-Motor Integration Practice', desc: 'Copy shapes, connect dots, and complete patterns', ages: '4–10' },
    { id: 'WS-OT11', title: 'Self-Regulation Alert Program Sheet', desc: 'Engine speed analogy: how does your body run? High/low/just right', ages: '5–14' },
    { id: 'WS-OT12', title: 'Typing & Keyboard Familiarisation', desc: 'Introduction to keyboard layout with finger placement guide', ages: '6–adult' },
    { id: 'WS-OT13', title: 'Shoe-Tying Step-by-Step Visual', desc: 'Visual step-by-step guide for tying shoelaces', ages: '5–12' },
    { id: 'WS-OT14', title: 'Hygiene Routine Visual Schedule', desc: 'Handwashing, toothbrushing, and face washing visual sequences', ages: '3–12' },
    { id: 'WS-OT15', title: 'Grading Force & Pressure Worksheet', desc: 'Practice light vs. heavy touch for writing, handling objects', ages: '5–12' },
    { id: 'WS-OT16', title: 'Money Handling & Coin Recognition', desc: 'Identify coins, match values, and practice simple transactions', ages: '6–adult' },
    { id: 'WS-OT17', title: 'Cooking Skills Sequence: Snack Prep', desc: 'Visual recipe cards for simple snack preparation', ages: '6–adult' },
    { id: 'WS-OT18', title: 'Body Scheme & Spatial Awareness', desc: 'Identify body parts, left/right, and spatial concepts', ages: '4–10' },
    { id: 'WS-OT19', title: 'Sensory-Motor Warm-Up Cards', desc: 'Quick movement cards to prepare the body for table work', ages: '4–14' },
    { id: 'WS-OT20', title: 'Community Mobility Safety Checklist', desc: 'Safety checklist for crossing roads, using transport, navigating community', ages: '8–adult' },
  ],
  cbt: [
    { id: 'WS-CB01', title: '5-Point Emotional Regulation Scale', desc: 'Interactive scale with body cues and coping strategies', ages: '6–adult' },
    { id: 'WS-CB02', title: 'Anxiety Thought-Challenging Worksheet', desc: 'Simplified thought record with evidence for/against', ages: '10–adult' },
    { id: 'WS-CB03', title: 'Coping Mechanism Weekly Tracker', desc: 'Weekly tracker for recording and rating coping strategies', ages: '8–adult' },
    { id: 'WS-CB04', title: 'Feelings Identification Flashcards', desc: '24 emotion cards with faces, body cues, and situation labels', ages: '4–adult' },
    { id: 'WS-CB05', title: 'My Safe & Calm Place Visualization', desc: 'Guided worksheet for creating a mental safe space', ages: '8–adult' },
    { id: 'WS-CB06', title: 'Anger Thermometer & Action Plan', desc: 'Rate anger 1–10 with corresponding strategies at each level', ages: '6–16' },
    { id: 'WS-CB07', title: 'Positive Affirmation Builder', desc: 'Create personal affirmations with evidence from real life', ages: '8–adult' },
    { id: 'WS-CB08', title: 'Worry Time Scheduling Sheet', desc: 'Schedule and contain worry to a specific daily time slot', ages: '10–adult' },
    { id: 'WS-CB09', title: 'Gratitude & Strengths Journal', desc: 'Daily gratitude log with personal strengths spotlight', ages: '6–adult' },
    { id: 'WS-CB10', title: 'Social Situation Anxiety Ladder', desc: 'Break feared social situations into small, manageable steps', ages: '10–adult' },
    { id: 'WS-CB11', title: 'Body Scan Awareness Worksheet', desc: 'Guided body scan to identify where emotions are felt', ages: '8–adult' },
    { id: 'WS-CB12', title: 'Problem-Solving Decision Tree', desc: 'Visual decision tree: define problem, brainstorm, evaluate, act', ages: '10–adult' },
    { id: 'WS-CB13', title: 'Self-Esteem Building Activity Log', desc: 'Track daily achievements, compliments, and positive moments', ages: '8–adult' },
    { id: 'WS-CB14', title: 'Relaxation Techniques Practice Card', desc: '6 techniques: deep breathing, progressive muscle relaxation, 5-4-3-2-1', ages: '6–adult' },
    { id: 'WS-CB15', title: 'Cognitive Distortion Identifier', desc: 'Match thoughts to common thinking traps with correction prompts', ages: '12–adult' },
    { id: 'WS-CB16', title: 'Emotional First Aid Kit Planner', desc: 'Plan personal tools, people, and activities for emotional crises', ages: '8–adult' },
    { id: 'WS-CB17', title: 'Boundaries & Assertiveness Script', desc: 'Scripts for saying no, setting limits, and requesting space', ages: '12–adult' },
    { id: 'WS-CB18', title: 'Meltdown & Shutdown Recovery Plan', desc: 'Pre-plan for during and after meltdowns/shutdowns', ages: '8–adult' },
    { id: 'WS-CB19', title: 'Values & Goals Clarification Sheet', desc: 'Identify personal values and set meaningful goals', ages: '14–adult' },
    { id: 'WS-CB20', title: 'Interpersonal Effectiveness Worksheet', desc: 'Skills for making and keeping friendships', ages: '10–adult' },
  ],
  edu: [
    { id: 'WS-ED01', title: 'Visual Daily Schedule Template', desc: 'Picture-based daily schedule with Now/Next board', ages: '2–12' },
    { id: 'WS-ED02', title: 'Token Economy Chart', desc: 'Customisable token board with rewards menu', ages: '3–12' },
    { id: 'WS-ED03', title: 'Reading Comprehension Graphic Organizer', desc: '5W+H question boxes with drawing/writing options', ages: '6–14' },
    { id: 'WS-ED04', title: 'Homework Planner & Tracker', desc: 'Weekly homework planner with break scheduling', ages: '6–16' },
    { id: 'WS-ED05', title: 'Spelling Practice Multisensory Sheet', desc: 'Trace, write, build, and find spelling words', ages: '5–12' },
    { id: 'WS-ED06', title: 'Math Word Problem Visual Organizer', desc: 'Visual steps: read, draw, equation, solve, check', ages: '6–14' },
    { id: 'WS-ED07', title: 'IEP Goal Progress Tracker', desc: 'Track IEP goals with data collection tables', ages: 'All' },
    { id: 'WS-ED08', title: 'Classroom Accommodations Checklist', desc: 'Checklist of common accommodations for IEP/504 plans', ages: 'All' },
    { id: 'WS-ED09', title: 'Study Skills: Note-Taking Template', desc: 'Structured note-taking template with key vocabulary section', ages: '10–18' },
    { id: 'WS-ED10', title: 'Writing Planning Organizer', desc: 'Plan writing: topic, main idea, details, conclusion', ages: '6–14' },
    { id: 'WS-ED11', title: 'Transition Planning Workbook Page', desc: 'Plan transitions between activities, classes, or schools', ages: '10–adult' },
    { id: 'WS-ED12', title: 'Sight Word Flashcard Template', desc: 'Printable flashcard template for sight word practice', ages: '4–10' },
    { id: 'WS-ED13', title: 'Multiplication & Division Visual Aid', desc: 'Array and grouping visuals for multiplication concepts', ages: '7–12' },
    { id: 'WS-ED14', title: 'Science Experiment Recording Sheet', desc: 'Hypothesis, method, observation, conclusion template', ages: '6–14' },
    { id: 'WS-ED15', title: 'Social Studies Cause & Effect Chart', desc: 'Visual cause and effect mapping for history topics', ages: '8–14' },
    { id: 'WS-ED16', title: 'Test Preparation Checklist', desc: 'Pre-test preparation steps and anxiety management', ages: '8–18' },
    { id: 'WS-ED17', title: 'Self-Monitoring On-Task Chart', desc: 'Check-in system for monitoring attention and focus', ages: '6–16' },
    { id: 'WS-ED18', title: 'Vocabulary Building Frayer Model', desc: '4-quadrant vocabulary model: definition, examples, non-examples, drawing', ages: '8–16' },
    { id: 'WS-ED19', title: 'Project Planning Timeline', desc: 'Break large projects into steps with deadlines', ages: '10–18' },
    { id: 'WS-ED20', title: 'Executive Function Weekly Planner', desc: 'Plan, prioritize, and review tasks for the week', ages: '10–adult' },
  ],
  sensory: [
    { id: 'WS-SI01', title: 'Daily Sensory Diet Planner', desc: 'Schedule sensory activities across 4 daily time blocks', ages: 'All' },
    { id: 'WS-SI02', title: 'Environmental Trigger Tracker', desc: '14-day log to identify sensory overload patterns', ages: '5–adult' },
    { id: 'WS-SI03', title: 'Heavy Work Activity Checklist', desc: '20+ proprioceptive activities for home, school, outdoors', ages: 'All' },
    { id: 'WS-SI04', title: 'Sensory Profile Self-Assessment', desc: 'Identify sensory preferences across 7 sense categories', ages: '8–adult' },
    { id: 'WS-SI05', title: 'Vestibular Activity Menu', desc: 'Movement-based activities: swings, spinning, balancing', ages: '3–adult' },
    { id: 'WS-SI06', title: 'Tactile Tolerance Ladder', desc: 'Gradual exposure ladder for tactile sensitivities', ages: '4–adult' },
    { id: 'WS-SI07', title: 'Auditory Sensitivity Log', desc: 'Track sound triggers, intensity, and coping strategies', ages: '6–adult' },
    { id: 'WS-SI08', title: 'Visual Environment Checklist', desc: 'Assess lighting, clutter, and visual noise in spaces', ages: 'All' },
    { id: 'WS-SI09', title: 'Oral Sensory Activity Ideas', desc: 'Chew, crunch, and blow activities for oral sensory needs', ages: '3–adult' },
    { id: 'WS-SI10', title: 'Proprioceptive Input Menu', desc: 'Deep pressure and joint compression activity options', ages: 'All' },
    { id: 'WS-SI11', title: 'Sensory Break Choice Board', desc: 'Visual choice board for selecting sensory break activities', ages: '3–14' },
    { id: 'WS-SI12', title: 'Classroom Sensory Accommodation Plan', desc: 'Plan sensory supports for the classroom environment', ages: 'All' },
    { id: 'WS-SI13', title: 'Home Sensory Modification Checklist', desc: 'Checklist for making home environments sensory-friendly', ages: 'All' },
    { id: 'WS-SI14', title: 'Interoception Body Signals Worksheet', desc: 'Identify internal body signals for hunger, thirst, pain, emotions', ages: '6–adult' },
    { id: 'WS-SI15', title: 'Sensory Regulation Scale (Child)', desc: 'Child-friendly scale: too little, just right, too much', ages: '3–10' },
    { id: 'WS-SI16', title: 'Sensory Regulation Scale (Teen/Adult)', desc: 'Self-assessment of sensory regulation across the day', ages: '12–adult' },
    { id: 'WS-SI17', title: 'Sensory-Motor Activity Schedule', desc: 'Weekly schedule combining sensory and motor activities', ages: '3–14' },
    { id: 'WS-SI18', title: 'Sensory Overload Early Warning Signs', desc: 'Identify personal early warning signs before overload', ages: '8–adult' },
    { id: 'WS-SI19', title: 'Sensory Kit Packing List', desc: 'Checklist for creating a portable sensory support kit', ages: 'All' },
    { id: 'WS-SI20', title: 'Sensory-Friendly Event Planner', desc: 'Plan events with sensory considerations built in', ages: 'All' },
  ],
};

const categoryColors = {
  speech: { primary: '#2563eb', light: '#dbeafe', mid: '#93c5fd', icon: '💬', label: 'Speech & Communication' },
  ot: { primary: '#059669', light: '#d8f3dc', mid: '#6ee7b7', icon: '🖐️', label: 'Occupational Therapy' },
  cbt: { primary: '#dc2626', light: '#fde8df', mid: '#f87171', icon: '🧠', label: 'CBT & Emotional Regulation' },
  edu: { primary: '#d97706', light: '#fdf2e0', mid: '#fbbf24', icon: '📚', label: 'Educational Support' },
  sensory: { primary: '#0d9488', light: '#e0f5f1', mid: '#5eead4', icon: '🌀', label: 'Sensory Integration' },
};

function generateHTML(cat, ws) {
  const c = categoryColors[cat];
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${ws.title} | Global Autism Hub</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; color: #1a1a2e; padding: 32px; line-height: 1.6; }
  .header { border-bottom: 3px solid ${c.primary}; padding-bottom: 16px; margin-bottom: 24px; }
  .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
  .header-icon { font-size: 2rem; }
  .header-id { font-size: 11px; color: #6b7280; font-weight: 600; letter-spacing: 1px; }
  .header h1 { font-family: 'DM Serif Display', serif; font-size: 1.6rem; color: ${c.primary}; margin-bottom: 4px; }
  .header .desc { font-size: 13px; color: #6b7280; }
  .meta { display: flex; gap: 12px; margin-bottom: 20px; }
  .meta-badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; }
  .meta-cat { background: ${c.light}; color: ${c.primary}; }
  .meta-age { background: #f3f4f6; color: #4b5563; }
  .note { background: ${c.light}; border: 1px solid ${c.mid}; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #374151; }
  .note strong { color: ${c.primary}; }
  .section { margin-bottom: 24px; }
  .section-title { font-family: 'DM Serif Display', serif; font-size: 1.1rem; color: ${c.primary}; border-bottom: 2px solid ${c.mid}; padding-bottom: 6px; margin-bottom: 12px; }
  .field-row { display: flex; gap: 16px; margin-bottom: 12px; flex-wrap: wrap; }
  .field { flex: 1; min-width: 150px; }
  .field label { display: block; font-size: 11px; font-weight: 600; color: #6b7280; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px; }
  .field-line { border: none; border-bottom: 1.5px solid #d1d5db; width: 100%; padding: 4px 0; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none; }
  .textarea { width: 100%; border: 1.5px solid #d1d5db; border-radius: 6px; padding: 8px 10px; font-size: 13px; font-family: 'DM Sans', sans-serif; resize: vertical; min-height: 60px; outline: none; }
  .table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 12px; }
  .table th { background: ${c.light}; padding: 8px 10px; text-align: left; font-weight: 600; color: ${c.primary}; border: 1px solid ${c.mid}; }
  .table td { padding: 8px 10px; border: 1px solid #e5e7eb; }
  .table input { border: none; border-bottom: 1px solid #d1d5db; width: 100%; font-size: 12px; font-family: 'DM Sans', sans-serif; outline: none; padding: 2px 0; }
  .checkbox-list { list-style: none; padding: 0; }
  .checkbox-list li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
  .checkbox-list li input[type="checkbox"] { width: 16px; height: 16px; accent-color: ${c.primary}; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; }
  .card { border: 1.5px solid #e5e7eb; border-radius: 8px; padding: 12px; }
  .card-title { font-weight: 600; font-size: 13px; color: ${c.primary}; margin-bottom: 6px; }
  .footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; text-align: center; }
  @media print { body { padding: 20px; } .no-print { display: none; } }
</style>
</head>
<body>
<div class="header">
  <div class="header-top">
    <div>
      <div class="header-id">${ws.id}</div>
      <h1>${ws.title}</h1>
      <div class="desc">${ws.desc}</div>
    </div>
    <div class="header-icon">${c.icon}</div>
  </div>
</div>
<div class="meta">
  <span class="meta-badge meta-cat">${c.label}</span>
  <span class="meta-badge meta-age">Ages ${ws.ages}</span>
</div>
<div class="note">
  <strong>2026 Clinical Guideline:</strong> This worksheet reflects updated 2026 best practices: strengths-based framing, individual autonomy, sensory-informed design, and co-regulation strategies. Adapt to the individual's communication style and preferences.
</div>
<div class="section">
  <div class="section-title">Personal Information</div>
  <div class="field-row">
    <div class="field"><label>Name</label><input class="field-line" type="text"></div>
    <div class="field"><label>Date</label><input class="field-line" type="text"></div>
    <div class="field"><label>Therapist / Parent</label><input class="field-line" type="text"></div>
  </div>
</div>
${generateContent(cat, ws)}
<div class="footer">
  Global Autism Hub &middot; ${ws.id} &middot; ${ws.title} &middot; Free &amp; Printable &middot; Updated 2026
</div>
</body>
</html>`;
}

function generateContent(cat, ws) {
  const c = categoryColors[cat];
  let html = '';

  // Generate category-specific content
  if (cat === 'speech') {
    html = generateSpeechContent(ws, c);
  } else if (cat === 'ot') {
    html = generateOTContent(ws, c);
  } else if (cat === 'cbt') {
    html = generateCBTContent(ws, c);
  } else if (cat === 'edu') {
    html = generateEduContent(ws, c);
  } else if (cat === 'sensory') {
    html = generateSensoryContent(ws, c);
  }

  // Add notes/reflection section for all
  html += `
<div class="section">
  <div class="section-title">Notes & Reflections</div>
  <div class="field-row">
    <div class="field"><label>What worked well today</label><textarea class="textarea" placeholder="Write or draw..."></textarea></div>
  </div>
  <div class="field-row">
    <div class="field"><label>What to try differently next time</label><textarea class="textarea" placeholder="Write or draw..."></textarea></div>
  </div>
</div>`;

  return html;
}

function generateSpeechContent(ws, c) {
  const id = ws.id;
  let html = '<div class="section"><div class="section-title">Activity</div>';

  if (id === 'WS-ST01') {
    const words = [
      {icon:'✅',word:'YES'},{icon:'❌',word:'NO'},{icon:'🙏',word:'MORE'},{icon:'🛑',word:'STOP'},
      {icon:'🍎',word:'EAT'},{icon:'💧',word:'DRINK'},{icon:'🚽',word:'TOILET'},{icon:'🛏️',word:'SLEEP'},
      {icon:'😊',word:'HAPPY'},{icon:'😢',word:'SAD'},{icon:'😤',word:'ANGRY'},{icon:'😟',word:'SCARED'},
      {icon:'🏠',word:'HOME'},{icon:'🏫',word:'SCHOOL'},{icon:'▶️',word:'GO'},{icon:'🤲',word:'HELP'}
    ];
    html += `<div class="note"><strong>How to use:</strong> Point to a symbol while saying the word. Model 1 symbol above the child's current level. Never remove symbols — add more over time.</div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0">`;
    words.forEach(w => {
      html += `<div style="border:2px solid #e5e7eb;border-radius:8px;padding:10px 6px;text-align:center"><div style="font-size:1.6rem;margin-bottom:4px">${w.icon}</div><div style="font-size:11px;font-weight:600">${w.word}</div></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-ST02') {
    const scenarios = [
      {title:'Greeting someone',lines:['Hi, my name is ___________','How are you?','It\'s nice to meet you.']},
      {title:'Asking for help',lines:['Excuse me, could you help me please?','I need help with ___________','Thank you!']},
      {title:'Joining play or a group',lines:['What are you playing / doing?','Can I join you?','That looks fun.']}
    ];
    scenarios.forEach(s => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;font-size:13px;color:${c.primary}">${s.title}</div><div style="padding:10px 12px">`;
      s.lines.forEach((l,i) => {
        html += `<div style="display:flex;gap:10px;align-items:center;padding:6px 0;border-bottom:1px solid #f3f4f6"><div style="width:22px;height:22px;border-radius:50%;background:${c.primary};color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;flex-shrink:0">${i+1}</div><div style="font-size:13px;color:#4b5563">${l}</div></div>`;
      });
      html += `</div></div>`;
    });
    html += `<div style="border:1.5px dashed #d1d5db;border-radius:8px;padding:12px;margin-top:8px"><div style="font-weight:600;font-size:13px;margin-bottom:8px">My own script: ___________</div><textarea class="textarea" placeholder="Write your own script here..."></textarea></div>`;
  } else if (id === 'WS-ST03') {
    const frames = [
      {label:'I want...',options:['to eat','to play','a hug','a break','help']},
      {label:'I feel...',options:['happy','sad','angry','scared','tired','excited']},
      {label:'I see...',options:['a person','an animal','food','a toy','something scary']},
      {label:'I need...',options:['quiet','space','water','the toilet','my thing']}
    ];
    frames.forEach(f => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:700;font-size:14px;color:${c.primary};margin-bottom:6px">${f.label}</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;
      f.options.forEach(o => {
        html += `<div style="border:1.5px solid #e5e7eb;border-radius:20px;padding:5px 14px;font-size:13px">${o}</div>`;
      });
      html += `</div></div>`;
    });
  } else if (id === 'WS-ST04') {
    html += `<div class="note"><strong>Instructions:</strong> Circle or point to what you need help with. Show this card to a teacher, parent, or friend.</div>`;
    const items = [{icon:'✏️',label:'Help with writing'},{icon:'📖',label:'Help with reading'},{icon:'🔢',label:'Help with math'},{icon:'👟',label:'Help with shoes'},{icon:'🧥',label:'Help with jacket'},{icon:'🚻',label:'Help with bathroom'},{icon:'🍎',label:'Help with food'},{icon:'🤝',label:'Help with a friend'}];
    html += `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">`;
    items.forEach(item => {
      html += `<div style="border:2px solid #e5e7eb;border-radius:10px;padding:12px;text-align:center"><div style="font-size:1.8rem;margin-bottom:4px">${item.icon}</div><div style="font-size:12px;font-weight:600">${item.label}</div><div style="margin-top:6px"><input type="checkbox" style="width:18px;height:18px;accent-color:${c.primary}"></div></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-ST05') {
    const feelings = [{icon:'😊',label:'Happy',need:'I want to share / play'},{icon:'😢',label:'Sad',need:'I need comfort / a hug'},{icon:'😤',label:'Angry',need:'I need space / to move'},{icon:'😟',label:'Scared',need:'I need safety / someone near'},{icon:'😴',label:'Tired',need:'I need rest / quiet'},{icon:'🤗',label:'Excited',need:'I want to tell someone'}];
    html += `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">`;
    feelings.forEach(f => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:10px;padding:12px"><div style="font-size:1.6rem;margin-bottom:4px">${f.icon}</div><div style="font-weight:600;font-size:13px;margin-bottom:2px">${f.label}</div><div style="font-size:11px;color:#6b7280">${f.need}</div></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-ST06') {
    html += `<div class="note"><strong>How to use:</strong> Each person takes a turn. Use the visual prompts to know when to speak and when to listen.</div>`;
    html += `<div style="display:flex;gap:16px;align-items:center;justify-content:center;margin:16px 0;flex-wrap:wrap">`;
    html += `<div style="border:2px solid ${c.primary};border-radius:10px;padding:16px;text-align:center;min-width:120px"><div style="font-size:2rem;margin-bottom:4px">🗣️</div><div style="font-weight:700;color:${c.primary}">MY TURN</div><div style="font-size:11px;color:#6b7280">I speak now</div></div>`;
    html += `<div style="font-size:1.5rem">→</div>`;
    html += `<div style="border:2px solid #6b7280;border-radius:10px;padding:16px;text-align:center;min-width:120px"><div style="font-size:2rem;margin-bottom:4px">👂</div><div style="font-weight:700;color:#6b7280">YOUR TURN</div><div style="font-size:11px;color:#6b7280">I listen now</div></div>`;
    html += `<div style="font-size:1.5rem">→</div>`;
    html += `<div style="border:2px solid ${c.primary};border-radius:10px;padding:16px;text-align:center;min-width:120px"><div style="font-size:2rem;margin-bottom:4px">🗣️</div><div style="font-weight:700;color:${c.primary}">MY TURN</div><div style="font-size:11px;color:#6b7280">I speak again</div></div>`;
    html += `</div>`;
    html += `<table class="table"><thead><tr><th>Turn</th><th>Who spoke?</th><th>What was said?</th><th>Did I listen?</th></tr></thead><tbody>`;
    for(let i=1;i<=6;i++) html += `<tr><td>${i}</td><td><input type="text"></td><td><input type="text"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-ST07') {
    html += `<div style="display:flex;gap:24px;justify-content:center;margin:16px 0">`;
    html += `<div style="border:3px solid #22c55e;border-radius:16px;padding:24px 32px;text-align:center"><div style="font-size:3rem;margin-bottom:8px">✅</div><div style="font-size:1.5rem;font-weight:700;color:#16a34a">YES</div></div>`;
    html += `<div style="border:3px solid #ef4444;border-radius:16px;padding:24px 32px;text-align:center"><div style="font-size:3rem;margin-bottom:8px">❌</div><div style="font-size:1.5rem;font-weight:700;color:#dc2626">NO</div></div>`;
    html += `</div>`;
    html += `<div class="section-title" style="margin-top:16px">Choice Making</div>`;
    const choices = [['Play outside','Play inside'],['Read a book','Watch a video'],['Eat an apple','Eat a banana'],['Sit with friend','Sit alone']];
    choices.forEach(pair => {
      html += `<div style="display:flex;gap:12px;margin-bottom:8px;align-items:center"><div style="border:2px solid #e5e7eb;border-radius:10px;padding:10px 16px;flex:1;text-align:center;font-size:13px;font-weight:500">${pair[0]}</div><div style="font-size:12px;color:#6b7280">OR</div><div style="border:2px solid #e5e7eb;border-radius:10px;padding:10px 16px;flex:1;text-align:center;font-size:13px;font-weight:500">${pair[1]}</div></div>`;
    });
  } else if (id === 'WS-ST08') {
    html += `<table class="table"><thead><tr><th>Day</th><th>What I communicated</th><th>How (speech/AAC/gesture)</th><th>Who I talked to</th><th>How it went</th></tr></thead><tbody>`;
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => {
      html += `<tr><td>${d}</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>`;
    });
    html += `</tbody></table>`;
  } else if (id === 'WS-ST09') {
    const qs = [{q:'WHO?',icon:'👤',hint:'Who is in this story?'},{q:'WHAT?',icon:'❓',hint:'What happened?'},{q:'WHERE?',icon:'📍',hint:'Where did it happen?'},{q:'WHEN?',icon:'🕐',hint:'When did it happen?'},{q:'WHY?',icon:'💭',hint:'Why did it happen?'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">`;
    qs.forEach(q => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:10px;padding:12px"><div style="font-size:1.2rem">${q.icon} <strong>${q.q}</strong></div><div style="font-size:11px;color:#6b7280;margin-bottom:6px">${q.hint}</div><textarea class="textarea" style="min-height:50px" placeholder="Answer or draw..."></textarea></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-ST10') {
    const skills = ['Greeting someone by name','Saying goodbye','Asking how someone is','Answering "How are you?"','Starting a conversation','Staying on topic','Taking turns talking','Asking a follow-up question','Ending a conversation politely','Asking for clarification when confused','Saying "I don\'t understand"','Changing the topic appropriately'];
    html += `<ul class="checkbox-list">`;
    skills.forEach(s => html += `<li><input type="checkbox"> ${s}</li>`);
    html += `</ul>`;
  } else if (id === 'WS-ST11') {
    const categories = ['People','Actions','Feelings','Places','Food & Drink','Things','Descriptions','Questions'];
    html += `<div class="note"><strong>Instructions:</strong> Practice navigating to each category on your AAC device. Time yourself and track improvement.</div>`;
    html += `<table class="table"><thead><tr><th>Category</th><th>Page number</th><th>Time to find (seconds)</th><th>Found it?</th></tr></thead><tbody>`;
    categories.forEach(cat => html += `<tr><td>${cat}</td><td><input type="text"></td><td><input type="text"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-ST12') {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">`;
    [{title:'BEGINNING',icon:'🎬',color:'#22c55e'},{title:'MIDDLE',icon:'⭐',color:'#eab308'},{title:'END',icon:'🏁',color:'#ef4444'}].forEach(p => {
      html += `<div style="border:2px solid ${p.color};border-radius:10px;padding:12px;text-align:center"><div style="font-size:1.5rem">${p.icon}</div><div style="font-weight:700;color:${p.color};font-size:13px;margin-bottom:8px">${p.title}</div><textarea class="textarea" style="min-height:80px" placeholder="What happened..."></textarea></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-ST13') {
    const frames = [{start:'I want',options:['to eat','to drink','to play','to go outside','a hug','a break']},{start:'I need',options:['help','quiet','the toilet','my thing','water','space']}];
    frames.forEach(f => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:700;font-size:14px;color:${c.primary};margin-bottom:6px">${f.start}...</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;
      f.options.forEach(o => html += `<div style="border:1.5px solid #e5e7eb;border-radius:20px;padding:5px 14px;font-size:13px">${o}</div>`);
      html += `</div></div>`;
    });
  } else if (id === 'WS-ST14') {
    const cues = [{icon:'😊',label:'Smiling = Happy/Friendly'},{icon:'😠',label:'Frowning = Angry/Upset'},{icon:'😢',label:'Tears = Sad'},{icon:'🤔',label:'Tilted head = Thinking/Confused'},{icon:'👋',label:'Waving = Hello/Goodbye'},{icon:'🤝',label:'Handshake = Formal greeting'},{icon:'🙅',label:'Hand up = Stop/No'},{icon:'👆',label:'Pointing = Directing attention'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
    cues.forEach(cue => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-size:1.5rem">${cue.icon}</span><span style="font-size:12px;font-weight:500">${cue.label}</span></div>`);
    html += `</div>`;
  } else if (id === 'WS-ST15') {
    html += `<div class="note"><strong>Tip:</strong> Practice each script before making a real call. It is okay to have notes in front of you.</div>`;
    const scripts = [{title:'Answering a call',lines:['Hello?','This is [your name]','How are you?']},{title:'Making a call',lines:['Hi, this is [your name]','I am calling about...','Is this a good time?']},{title:'Leaving a voicemail',lines:['Hi, this is [your name]','I am calling about...','Please call me back at [number]']},{title:'Video call opening',lines:['Can you see me?','Can you hear me?','How are you today?']}];
    scripts.forEach(s => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;font-size:13px;color:${c.primary}">${s.title}</div><div style="padding:10px 12px">`;
      s.lines.forEach((l,i) => html += `<div style="padding:4px 0;font-size:13px;color:#4b5563">${i+1}. ${l}</div>`);
      html += `</div></div>`;
    });
  } else if (id === 'WS-ST16') {
    const cats = [{name:'Animals',items:['Dog','Cat','Bird','Fish']},{name:'Food',items:['Apple','Bread','Milk','Rice']},{name:'Clothes',items:['Shirt','Pants','Socks','Hat']},{name:'Transport',items:['Car','Bus','Train','Bike']}];
    cats.forEach(cat => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${cat.name}</div><div style="display:flex;flex-wrap:wrap;gap:6px">`;
      cat.items.forEach(i => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:6px 12px;font-size:12px">${i}</div>`);
      html += `</div></div>`;
    });
  } else if (id === 'WS-ST17') {
    const levels = [{title:'1-Step Directions',items:['Touch your nose','Clap your hands','Stand up','Point to the door']},{title:'2-Step Directions',items:['Touch your nose then clap','Stand up then sit down','Pick up the pen and give it to me','Point to the window then the door']},{title:'3-Step Directions',items:['Stand up, touch your head, sit down','Pick up the book, open it, close it','Clap, turn around, sit down','Point to the ceiling, then the floor, then the door']}];
    levels.forEach(l => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${l.title}</div><ul class="checkbox-list">`;
      l.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-ST18') {
    const attrs = ['Color','Shape','Size','What it does','Where you find it','What group it belongs to'];
    html += `<div class="field-row"><div class="field"><label>Object name</label><input class="field-line" type="text" placeholder="Name of the object"></div></div>`;
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">`;
    attrs.forEach(a => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px"><div style="font-weight:600;font-size:12px;color:${c.primary};margin-bottom:4px">${a}</div><textarea class="textarea" style="min-height:40px" placeholder="Describe..."></textarea></div>`);
    html += `</div>`;
  } else if (id === 'WS-ST19') {
    html += `<div style="border:2px solid ${c.primary};border-radius:12px;padding:16px;text-align:center;margin-bottom:16px"><div style="font-size:1.5rem;margin-bottom:4px">🤔</div><div style="font-weight:700;color:${c.primary}">What is the problem?</div></div>`;
    html += `<div style="text-align:center;font-size:1.5rem;margin-bottom:8px">↓</div>`;
    html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:12px">`;
    [{icon:'💡',label:'Option 1'},{icon:'💡',label:'Option 2'},{icon:'💡',label:'Option 3'}].forEach(o => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.2rem">${o.icon}</div><div style="font-weight:600;font-size:12px;margin-bottom:6px">${o.label}</div><textarea class="textarea" style="min-height:40px" placeholder="What could I do?"></textarea></div>`;
    });
    html += `</div>`;
    html += `<div style="text-align:center;font-size:1.5rem;margin-bottom:8px">↓</div>`;
    html += `<div style="border:2px solid #22c55e;border-radius:12px;padding:16px;text-align:center"><div style="font-size:1.5rem;margin-bottom:4px">🗣️</div><div style="font-weight:700;color:#16a34a">Communicate my choice</div><textarea class="textarea" style="min-height:40px;margin-top:8px" placeholder="What will I say or show?"></textarea></div>`;
  } else if (id === 'WS-ST20') {
    const scripts = [{title:'When I need something different',lines:['I need ___________ instead','This is hard for me because ___________','Could I try ___________?']},{title:'When something is too much',lines:['This is too loud/bright/much for me','I need a break please','I will come back when I am ready']},{title:'When I disagree',lines:['I see it differently','I understand, but I prefer ___________','Can we find a middle way?']},{title:'When I need to leave',lines:['I need to step out for a moment','I will be back','Thank you for understanding']}];
    scripts.forEach(s => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;font-size:13px;color:${c.primary}">${s.title}</div><div style="padding:10px 12px">`;
      s.lines.forEach((l,i) => html += `<div style="padding:4px 0;font-size:13px;color:#4b5563">${i+1}. ${l}</div>`);
      html += `</div></div>`;
    });
  }

  html += '</div>';
  return html;
}

function generateOTContent(ws, c) {
  let html = '<div class="section"><div class="section-title">Activity</div>';
  const id = ws.id;

  if (id === 'WS-OT01') {
    const levels = ['Level 1: Straight lines (left to right)','Level 2: Zigzag lines','Level 3: Curved lines','Level 4: Circles & loops','Level 5: Letter formation (A, O, C, E, L)'];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">`;
    levels.forEach(l => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;font-size:12px;color:${c.primary};margin-bottom:8px">${l}</div>`;
      for(let i=0;i<3;i++) html += `<div style="border-bottom:1px dashed #ccc;height:28px;margin-bottom:6px"></div>`;
      html += `</div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-OT02') {
    const routines = [{name:'Morning Routine',steps:['Wake up and get out of bed','Use the toilet','Wash hands and face','Get dressed','Eat breakfast','Brush teeth','Pack school bag','Put on shoes']},{name:'Bedtime Routine',steps:['Change into pyjamas','Brush teeth','Wash face','Get into bed','Read or quiet activity (10 min)','Lights off']}];
    routines.forEach(r => {
      html += `<div style="margin-bottom:16px"><div style="font-family:'DM Serif Display',serif;font-size:1.1rem;border-bottom:2px solid ${c.primary};padding-bottom:6px;margin-bottom:10px">${r.name}</div><ul class="checkbox-list">`;
      r.steps.forEach(s => html += `<li><input type="checkbox"> ${s}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-OT03') {
    const acts = [{icon:'✂️',name:'Cutting along a curved line',diff:2},{icon:'🧵',name:'Threading beads on a string',diff:2},{icon:'👏',name:'Clapping rhythm patterns',diff:1},{icon:'🧩',name:'Puzzle assembly (10 pieces)',diff:1},{icon:'🥁',name:'Hand drum alternating beats',diff:2},{icon:'📦',name:'Open and close a zip-lock bag',diff:1},{icon:'🎁',name:'Wrapping an object in paper',diff:3},{icon:'🤲',name:'Rolling a ball of playdough',diff:1}];
    html += `<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">`;
    acts.forEach(a => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-size:1.5rem;margin-bottom:4px">${a.icon}</div><div style="font-weight:600;font-size:13px;margin-bottom:4px">${a.name}</div><div style="font-size:11px;color:${c.primary};margin-bottom:8px">Difficulty: ${'★'.repeat(a.diff)}${'☆'.repeat(3-a.diff)}</div><input type="checkbox" style="accent-color:${c.primary}"> Completed</div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-OT04') {
    const types = [{label:'Straight lines',desc:'Cut along the dotted line'},{label:'Curved lines',desc:'Follow the curve carefully'},{label:'Zigzag lines',desc:'Cut corner to corner'},{label:'Circle shape',desc:'Cut around the circle'},{label:'Square shape',desc:'Cut along each side'}];
    types.forEach(t => {
      html += `<div style="margin-bottom:16px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:8px">${t.label} — ${t.desc}</div><div style="border:2px dashed #999;height:60px;border-radius:4px;margin-bottom:4px"></div><div style="font-size:11px;color:#9ca3af">Cut along the dashed line</div></div>`;
    });
  } else if (id === 'WS-OT05') {
    html += `<div style="text-align:center;margin-bottom:16px"><div style="border:2px solid ${c.primary};border-radius:12px;padding:16px;display:inline-block"><div style="font-size:3rem;margin-bottom:8px">✏️</div><div style="font-weight:700;color:${c.primary};margin-bottom:4px">Correct Tripod Grip</div><div style="font-size:12px;color:#6b7280">Thumb and index finger pinch the pencil. Middle finger supports from below.</div></div></div>`;
    html += `<div class="section-title">Practice Exercises</div><ul class="checkbox-list">`;
    ['Pinch a pencil and hold for 10 seconds','Draw small circles maintaining grip','Write name 3 times with correct grip','Trace wavy lines with correct grip','Color within a small area'].forEach(s => html += `<li><input type="checkbox"> ${s}</li>`);
    html += `</ul>`;
  } else if (id === 'WS-OT06') {
    const exercises = [{name:'Squeeze ball (10x)',type:'Grip'},{name:'Clothespin pinch (10x)',type:'Pinch'},{name:'Playdough squeeze (2 min)',type:'Grip'},{name:'Tweezer pick-up (10 items)',type:'Pinch'},{name:'Rubber band stretch (10x)',type:'Grip'},{name:'Coin flipping (10x)',type:'Pinch'}];
    html += `<table class="table"><thead><tr><th>Exercise</th><th>Type</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th></tr></thead><tbody>`;
    exercises.forEach(e => html += `<tr><td>${e.name}</td><td>${e.type}</td>${[1,2,3,4,5].map(()=>`<td><input type="checkbox" style="accent-color:${c.primary}"></td>`).join('')}</tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-OT07') {
    const tasks = [{item:'T-shirt',steps:['Find shirt','Put head through hole','Put one arm in','Put other arm in','Pull down']},{item:'Pants',steps:['Find pants','Sit down','Put one leg in','Put other leg in','Pull up']},{item:'Shoes',steps:['Find shoes','Open velcro/laces','Put foot in','Pull heel down','Fasten velcro/laces']},{item:'Jacket',steps:['Find jacket','Put one arm in','Put other arm in','Pull together','Zip up']}];
    tasks.forEach(t => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;color:${c.primary}">${t.item}</div><ul class="checkbox-list" style="padding:8px 12px">`;
      t.steps.forEach(s => html += `<li><input type="checkbox"> ${s}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-OT08') {
    const skills = [{cat:'Using a spoon',items:['Hold spoon correctly','Scoop food','Bring to mouth','Keep food on spoon','Chew with mouth closed']},{cat:'Using a fork',items:['Hold fork correctly','Pierce food','Bring to mouth','Keep food on fork']},{cat:'Drinking from a cup',items:['Hold cup with both hands','Bring to mouth','Sip slowly','Put cup down carefully']},{cat:'Table manners',items:['Sit at the table','Use napkin','Wait for others','Clear my place']}];
    skills.forEach(s => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${s.cat}</div><ul class="checkbox-list">`;
      s.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-OT09') {
    const acts = [{icon:'🐍',name:'Make a snake: roll on the table',diff:'Easy'},{icon:'🥞',name:'Make a pancake: press flat',diff:'Easy'},{icon:'🍩',name:'Make a donut: roll and connect',diff:'Medium'},{icon:'🌟',name:'Make a star: pinch 5 points',diff:'Medium'},{icon:'🐛',name:'Make a caterpillar: roll small balls',diff:'Easy'},{icon:'🏠',name:'Make a house: shape walls and roof',diff:'Hard'},{icon:'✋',name:'Hand press: push into flat dough',diff:'Easy'},{icon:'🤏',name:'Pinch pot: pinch from a ball',diff:'Medium'},{icon:'🧵',name:'Roll a long snake and braid it',diff:'Hard'},{icon:'✨',name:'Free creation: make anything!',diff:'Fun'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
    acts.forEach(a => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-size:1.3rem">${a.icon}</span><div><div style="font-weight:600;font-size:12px">${a.name}</div><div style="font-size:10px;color:#6b7280">${a.diff}</div></div><input type="checkbox" style="margin-left:auto;accent-color:${c.primary}"></div>`);
    html += `</div>`;
  } else if (id === 'WS-OT10') {
    const tasks = [{name:'Copy a circle',level:'Easy'},{name:'Copy a square',level:'Easy'},{name:'Copy a triangle',level:'Medium'},{name:'Connect dots to make a shape',level:'Medium'},{name:'Complete the half-drawing',level:'Hard'},{name:'Copy a simple house',level:'Hard'}];
    tasks.forEach(t => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${t.name} (${t.level})</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div style="border:1px dashed #ccc;height:80px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#9ca3af">Model</div><div style="border:1px dashed #ccc;height:80px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:11px;color:#9ca3af">My copy</div></div></div>`;
    });
  } else if (id === 'WS-OT11') {
    html += `<div style="display:flex;gap:12px;justify-content:center;margin:16px 0;flex-wrap:wrap">`;
    [{speed:'Too Slow',icon:'🐢',color:'#3b82f6',desc:'Body feels sluggish, hard to focus'},{speed:'Just Right',icon:'🐻',color:'#22c55e',desc:'Body feels ready, can learn and play'},{speed:'Too Fast',icon:'🏎️',color:'#ef4444',desc:'Body feels revved up, hard to sit still'}].forEach(s => {
      html += `<div style="border:2px solid ${s.color};border-radius:12px;padding:16px;text-align:center;min-width:140px"><div style="font-size:2rem">${s.icon}</div><div style="font-weight:700;color:${s.color};margin:4px 0">${s.speed}</div><div style="font-size:11px;color:#6b7280">${s.desc}</div></div>`;
    });
    html += `</div>`;
    html += `<table class="table"><thead><tr><th>Time</th><th>My engine speed</th><th>What I did</th></tr></thead><tbody>`;
    ['Morning','Mid-morning','Lunch','Afternoon','Evening'].forEach(t => html += `<tr><td>${t}</td><td><input type="text" placeholder="Slow/Just Right/Fast"></td><td><input type="text" placeholder="Activity..."></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-OT12') {
    html += `<div style="text-align:center;margin-bottom:16px"><div style="border:2px solid ${c.primary};border-radius:12px;padding:16px;display:inline-block"><div style="font-size:2rem;margin-bottom:8px">⌨️</div><div style="font-weight:700;color:${c.primary}">Keyboard Layout</div><div style="font-size:11px;color:#6b7280">Left hand: A S D F · Right hand: J K L ;</div></div></div>`;
    html += `<table class="table"><thead><tr><th>Finger</th><th>Keys practiced</th><th>Minutes</th><th>Accuracy</th></tr></thead><tbody>`;
    ['Left pinky','Left ring','Left middle','Left index','Right index','Right middle','Right ring','Right pinky'].forEach(f => html += `<tr><td>${f}</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-OT13') {
    const steps = ['1. Make an X with the laces','2. Take one lace and make a loop','3. Hold the loop with your thumb','4. Wrap the other lace around the loop','5. Push through the hole to make a second loop','6. Pull both loops tight'];
    html += `<div style="max-width:400px;margin:0 auto">`;
    steps.forEach(s => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:12px;margin-bottom:8px;display:flex;align-items:center;gap:10px"><input type="checkbox" style="accent-color:${c.primary}"><span style="font-size:13px">${s}</span><div style="margin-left:auto;width:60px;height:40px;border:1px dashed #ccc;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#9ca3af">draw</div></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-OT14') {
    const routines = [{name:'Handwashing',steps:['Turn on tap','Wet hands','Apply soap','Rub palms together','Rub back of hands','Rinse hands','Dry hands','Turn off tap']},{name:'Toothbrushing',steps:['Get toothbrush','Apply toothpaste','Brush top teeth','Brush bottom teeth','Brush back teeth','Spit and rinse','Rinse brush','Put away']},{name:'Face washing',steps:['Wet hands','Apply soap to hands','Wash forehead','Wash cheeks','Wash nose area','Wash chin','Rinse','Dry face']}];
    routines.forEach(r => {
      html += `<div style="margin-bottom:16px"><div style="font-weight:700;color:${c.primary};margin-bottom:8px">${r.name}</div><ul class="checkbox-list">`;
      r.steps.forEach(s => html += `<li><input type="checkbox"> ${s}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-OT15') {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">`;
    html += `<div style="border:2px solid #3b82f6;border-radius:10px;padding:14px;text-align:center"><div style="font-size:2rem;margin-bottom:4px">🪶</div><div style="font-weight:700;color:#3b82f6">LIGHT touch</div><div style="font-size:11px;color:#6b7280">Like a feather, gentle, soft</div></div>`;
    html += `<div style="border:2px solid #ef4444;border-radius:10px;padding:14px;text-align:center"><div style="font-size:2rem;margin-bottom:4px">🔨</div><div style="font-weight:700;color:#ef4444">HEAVY touch</div><div style="font-size:11px;color:#6b7280">Like a hammer, firm, strong</div></div>`;
    html += `</div>`;
    const tasks = [{task:'Writing with a pencil',light:'Write so lightly you can barely see it',heavy:'Press hard enough to make a dark line'},{task:'Closing a door',light:'Push gently so it clicks',heavy:'Push firmly to close fully'},{task:'Placing a cup down',light:'Set it down like glass',heavy:'Set it down firmly'},{task:'Petting an animal',light:'Stroke gently with fingertips',heavy:'Pat firmly with whole hand'}];
    tasks.forEach(t => {
      html += `<div style="margin-bottom:10px;border:1.5px solid #e5e7eb;border-radius:8px;padding:10px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${t.task}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div style="font-size:12px;color:#3b82f6">Light: ${t.light}</div><div style="font-size:12px;color:#ef4444">Heavy: ${t.heavy}</div></div></div>`;
    });
  } else if (id === 'WS-OT16') {
    const coins = [{name:'Penny',value:'1 cent',color:'#cd7f32'},{name:'Nickel',value:'5 cents',color:'#c0c0c0'},{name:'Dime',value:'10 cents',color:'#c0c0c0'},{name:'Quarter',value:'25 cents',color:'#c0c0c0'}];
    html += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:16px">`;
    coins.forEach(coin => html += `<div style="border:2px solid ${coin.color};border-radius:50%;padding:12px;text-align:center;aspect-ratio:1;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="font-weight:700;font-size:14px">${coin.name}</div><div style="font-size:11px;color:#6b7280">${coin.value}</div></div>`);
    html += `</div>`;
    html += `<table class="table"><thead><tr><th>Item to buy</th><th>Cost</th><th>Coins needed</th><th>Did I pay correctly?</th></tr></thead><tbody>`;
    for(let i=0;i<5;i++) html += `<tr><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-OT17') {
    const recipes = [{name:'Toast with Butter',steps:['Get bread','Put in toaster','Wait for toast','Butter the toast','Put on plate','Eat and enjoy']},{name:'Cereal with Milk',steps:['Get bowl','Pour cereal','Pour milk','Get spoon','Eat and enjoy']},{name:'Crackers with Cheese',steps:['Get plate','Place crackers','Add cheese','Eat and enjoy']}];
    recipes.forEach(r => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;color:${c.primary}">${r.name}</div><ul class="checkbox-list" style="padding:8px 12px">`;
      r.steps.forEach(s => html += `<li><input type="checkbox"> ${s}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-OT18') {
    const parts = [{icon:'👤',label:'Head'},{icon:'🤚',label:'Hands'},{icon:'🦶',label:'Feet'},{icon:'👂',label:'Ears'},{icon:'👀',label:'Eyes'},{icon:'👃',label:'Nose'}];
    html += `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">`;
    parts.forEach(p => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.5rem">${p.icon}</div><div style="font-weight:600;font-size:12px">${p.label}</div><input type="checkbox" style="accent-color:${c.primary}"></div>`);
    html += `</div>`;
    html += `<div class="section-title">Left & Right</div><table class="table"><thead><tr><th>Body part</th><th>Left side</th><th>Right side</th></tr></thead><tbody>`;
    ['Hand','Foot','Ear','Eye','Shoulder'].forEach(p => html += `<tr><td>${p}</td><td><input type="checkbox" style="accent-color:${c.primary}"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-OT19') {
    const cards = [{icon:'🤸',name:'5 jumping jacks',time:'30 sec'},{icon:'🧎',name:'Wall push-ups x 5',time:'30 sec'},{icon:'🙆',name:'Arm circles x 10',time:'30 sec'},{icon:'🦋',name:'Butterfly stretch',time:'30 sec'},{icon:'🤲',name:'Finger stretches both hands',time:'30 sec'},{icon:'🦒',name:'Neck rolls x 3 each way',time:'30 sec'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
    cards.forEach(card => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-size:1.3rem">${card.icon}</span><div><div style="font-weight:600;font-size:12px">${card.name}</div><div style="font-size:10px;color:#6b7280">${card.time}</div></div><input type="checkbox" style="margin-left:auto;accent-color:${c.primary}"></div>`);
    html += `</div>`;
  } else if (id === 'WS-OT20') {
    const items = [{icon:'🚦',cat:'Crossing roads',items:['Look left, look right, look left again','Wait for the green man / walk signal','Walk, do not run','Stay on the crossing']},{icon:'🚌',cat:'Using public transport',items:['Wait behind the line','Let people off first','Find a seat or hold the rail','Press the stop button','Wait until the bus stops to stand']},{icon:'🛒',cat:'At the shops',items:['Stay with my adult','Hold the basket or trolley','Ask before touching things','Wait in line at the checkout']},{icon:'🅿️',cat:'In the car park',items:['Hold an adult\'s hand','Walk, do not run','Look out for reversing cars','Stay on the pavement']}];
    items.forEach(item => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;color:${c.primary}">${item.icon} ${item.cat}</div><ul class="checkbox-list" style="padding:8px 12px">`;
      item.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  }

  html += '</div>';
  return html;
}

function generateCBTContent(ws, c) {
  let html = '<div class="section"><div class="section-title">Activity</div>';
  const id = ws.id;

  if (id === 'WS-CB01') {
    const levels = [{n:1,face:'😊',label:'Calm & Ready',body:'Relaxed muscles, steady breathing',strat:'Keep going!'},{n:2,face:'😐',label:'A Little Uneasy',body:'Slightly tense, mild stomach feeling',strat:'3 slow breaths, water, fidget'},{n:3,face:'😟',label:'Worried / Bothered',body:'Faster heartbeat, tight chest',strat:'Sensory break, tell someone'},{n:4,face:'😠',label:'Very Upset',body:'Hot face, clenched fists',strat:'Heavy work, move away'},{n:5,face:'🤯',label:'Overwhelmed',body:'Unable to think, body out of control',strat:'Safe space, no demands, quiet'}];
    html += `<div style="display:flex;gap:6px;margin:12px 0;flex-wrap:wrap">`;
    levels.forEach(l => {
      const bg = ['#d1fae5','#e0f2fe','#fef9c3','#fed7aa','#fee2e2'][l.n-1];
      const bc = ['#6ee7b7','#7dd3fc','#fde047','#fb923c','#f87171'][l.n-1];
      html += `<div style="flex:1;min-width:80px;border:2px solid ${bc};border-radius:8px;padding:10px 4px;text-align:center;background:${bg}"><div style="font-size:1.2rem;font-weight:700">${l.n}</div><div style="font-size:1.4rem;margin:4px 0">${l.face}</div><div style="font-size:10px;font-weight:600">${l.label}</div></div>`;
    });
    html += `</div>`;
    html += `<table class="table"><thead><tr><th>Level</th><th>My coping strategy</th><th>Who can help me</th></tr></thead><tbody>`;
    levels.forEach(l => html += `<tr><td>${l.n} — ${l.label}</td><td><input type="text"></td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-CB02') {
    html += `<div class="field-row"><div class="field"><label>Situation (what happened?)</label><textarea class="textarea" placeholder="Describe the event..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Anxious thought</label><textarea class="textarea" placeholder="What did you think?"></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Feeling & intensity (0-100%)</label><input class="field-line" type="text" placeholder="e.g. Anxious 80%"></div><div class="field"><label>Body sensations</label><input class="field-line" type="text" placeholder="e.g. Tight chest"></div></div>`;
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0"><div style="border:1.5px solid #6ee7b7;border-radius:8px;padding:10px"><div style="font-size:12px;font-weight:700;color:#065f46;margin-bottom:6px">Evidence FOR this thought</div><textarea class="textarea" placeholder="What facts support this?"></textarea></div><div style="border:1.5px solid #f87171;border-radius:8px;padding:10px"><div style="font-size:12px;font-weight:700;color:#7f1d1d;margin-bottom:6px">Evidence AGAINST this thought</div><textarea class="textarea" placeholder="What facts contradict this?"></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Balanced thought</label><textarea class="textarea" placeholder="What is more accurate?"></textarea></div></div>`;
  } else if (id === 'WS-CB03') {
    const strategies = ['Deep breathing','Sensory break / quiet space','Heavy work (push/pull/carry)','Talk to someone I trust','Write / draw feelings','Listen to music','Stim freely','Take a walk','Use my AAC device','My special interest activity'];
    html += `<table class="table"><thead><tr><th>Strategy</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></thead><tbody>`;
    strategies.forEach(s => html += `<tr><td>${s}</td>${[1,2,3,4,5,6,7].map(()=>`<td><input type="text" style="width:28px;text-align:center" placeholder="—"></td>`).join('')}</tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-CB04') {
    const emotions = [{icon:'😊',name:'Happy'},{icon:'😢',name:'Sad'},{icon:'😤',name:'Angry'},{icon:'😟',name:'Scared'},{icon:'😴',name:'Tired'},{icon:'🤗',name:'Excited'},{icon:'🤔',name:'Confused'},{icon:'😌',name:'Calm'},{icon:'🥺',name:'Worried'},{icon:'😤',name:'Frustrated'},{icon:'🤯',name:'Overwhelmed'},{icon:'😊',name:'Proud'}];
    html += `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">`;
    emotions.forEach(e => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.8rem">${e.icon}</div><div style="font-weight:600;font-size:12px;margin-top:4px">${e.name}</div></div>`);
    html += `</div>`;
    html += `<div style="margin-top:12px"><div style="font-weight:600;font-size:13px;margin-bottom:6px">Today I feel:</div><div class="field-row"><div class="field"><label>Emotion</label><input class="field-line" type="text"></div><div class="field"><label>Why?</label><input class="field-line" type="text"></div><div class="field"><label>Where in my body?</label><input class="field-line" type="text"></div></div></div>`;
  } else if (id === 'WS-CB05') {
    html += `<div class="note"><strong>Instructions:</strong> Close your eyes and imagine a place where you feel completely safe and calm. It can be real or imaginary. Fill in the details below.</div>`;
    html += `<div class="field-row"><div class="field"><label>What does this place look like?</label><textarea class="textarea" placeholder="Describe or draw..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>What can you hear?</label><textarea class="textarea" placeholder="Sounds, music, silence..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>What can you feel?</label><textarea class="textarea" placeholder="Temperature, textures..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>What can you smell?</label><textarea class="textarea" placeholder="Scents, fresh air..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Who or what is there with you?</label><textarea class="textarea" placeholder="People, animals, objects..."></textarea></div></div>`;
  } else if (id === 'WS-CB06') {
    html += `<div style="text-align:center;margin-bottom:16px"><div style="display:flex;align-items:flex-end;justify-content:center;gap:4px;height:120px">`;
    for(let i=1;i<=10;i++) {
      const h = i*10;
      const color = i<=3?'#22c55e':i<=6?'#eab308':i<=8?'#f97316':'#ef4444';
      html += `<div style="width:28px;height:${h}px;background:${color};border-radius:4px 4px 0 0;display:flex;align-items:flex-start;justify-content:center;padding-top:4px;font-size:10px;font-weight:700;color:white">${i}</div>`;
    }
    html += `</div></div>`;
    html += `<table class="table"><thead><tr><th>Level</th><th>How my body feels</th><th>What I should do</th></tr></thead><tbody>`;
    [{l:'1-3: Cool',s:'Relaxed, calm',a:'I am OK. Keep going.'},{l:'4-6: Warm',s:'Tense, bothered',a:'Use a coping strategy now.'},{l:'7-8: Hot',s:'Very tense, loud thoughts',a:'Take a break. Tell someone.'},{l:'9-10: Boiling',s:'About to lose control',a:'Safe space immediately.'}].forEach(r => html += `<tr><td>${r.l}</td><td><input type="text" value="${r.s}"></td><td><input type="text" value="${r.a}"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-CB07') {
    html += `<div class="note"><strong>How to use:</strong> Write an affirmation that feels true for you. Back it up with real evidence. Read it daily.</div>`;
    for(let i=1;i<=5;i++) {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">Affirmation #${i}</div><div class="field-row"><div class="field"><label>My affirmation</label><input class="field-line" type="text" placeholder="e.g. I am capable of learning new things"></div></div><div class="field-row"><div class="field"><label>Evidence (why is this true?)</label><input class="field-line" type="text" placeholder="e.g. I learned to cook dinner last week"></div></div></div>`;
    }
  } else if (id === 'WS-CB08') {
    html += `<div class="note"><strong>How to use:</strong> Schedule 15-20 minutes each day as "worry time." Outside of worry time, tell yourself "I will think about this during worry time." Write worries here as they come up.</div>`;
    html += `<div class="field-row"><div class="field"><label>My worry time is at</label><input class="field-line" type="text" placeholder="e.g. 4:00-4:20pm"></div><div class="field"><label>Location</label><input class="field-line" type="text" placeholder="e.g. My bedroom"></div></div>`;
    html += `<table class="table"><thead><tr><th>Worry that came up</th><th>Time</th><th>Did I save it for worry time?</th><th>Resolved during worry time?</th></tr></thead><tbody>`;
    for(let i=0;i<7;i++) html += `<tr><td><input type="text"></td><td><input type="text"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-CB09') {
    html += `<table class="table"><thead><tr><th>Day</th><th>3 things I am grateful for</th><th>A strength I used today</th><th>How I felt (1-10)</th></tr></thead><tbody>`;
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => html += `<tr><td>${d}</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-CB10') {
    html += `<div class="note"><strong>How to use:</strong> Break a feared situation into small steps. Start at the bottom (easiest) and work your way up as you feel ready.</div>`;
    html += `<div class="field-row"><div class="field"><label>My feared social situation</label><input class="field-line" type="text" placeholder="e.g. Talking to new people"></div></div>`;
    for(let i=10;i>=1;i--) {
      html += `<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;padding:6px 0;border-bottom:1px solid #f3f4f6"><div style="width:28px;height:28px;border-radius:50%;background:${i<=3?'#d1fae5':i<=6?'#fef9c3':i<=8?'#fed7aa':'#fee2e2'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;flex-shrink:0">${i}</div><input type="text" style="border:none;border-bottom:1px solid #d1d5db;flex:1;font-size:13px;padding:4px 0;outline:none" placeholder="Step ${i}..."><input type="checkbox" style="accent-color:${c.primary}"></div>`;
    }
  } else if (id === 'WS-CB11') {
    const parts = [{part:'Head',prompt:'Tension, pressure, thoughts'},{part:'Neck & Shoulders',prompt:'Tight, hunched, heavy'},{part:'Chest',prompt:'Tight, heavy, breathing'},{part:'Stomach',prompt:'Butterflies, nausea, empty'},{part:'Hands',prompt:'Clenched, tingling, sweaty'},{part:'Legs',prompt:'Restless, weak, heavy'}];
    html += `<div class="note"><strong>Instructions:</strong> Slowly bring attention to each body part. Notice any sensations without judging them.</div>`;
    parts.forEach(p => {
      html += `<div style="margin-bottom:10px;border:1.5px solid #e5e7eb;border-radius:8px;padding:10px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${p.part}</div><div style="font-size:11px;color:#6b7280;margin-bottom:6px">${p.prompt}</div><div class="field-row"><div class="field"><label>What I notice</label><input class="field-line" type="text"></div><div class="field"><label>Intensity (1-10)</label><input class="field-line" type="text"></div></div></div>`;
    });
  } else if (id === 'WS-CB12') {
    html += `<div style="border:2px solid ${c.primary};border-radius:12px;padding:16px;text-align:center;margin-bottom:12px"><div style="font-size:1.5rem;margin-bottom:4px">🤔</div><div style="font-weight:700;color:${c.primary}">What is the problem?</div><textarea class="textarea" style="margin-top:8px" placeholder="Define the problem clearly..."></textarea></div>`;
    html += `<div style="text-align:center;font-size:1.2rem;margin-bottom:8px">↓</div>`;
    html += `<div style="border:2px solid #eab308;border-radius:12px;padding:16px;margin-bottom:12px"><div style="font-weight:700;color:#d97706;margin-bottom:8px">Brainstorm solutions</div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">`;
    for(let i=1;i<=3;i++) html += `<div><div style="font-weight:600;font-size:12px;margin-bottom:4px">Option ${i}</div><textarea class="textarea" style="min-height:40px" placeholder="One possible solution..."></textarea></div>`;
    html += `</div></div>`;
    html += `<div style="text-align:center;font-size:1.2rem;margin-bottom:8px">↓</div>`;
    html += `<div style="border:2px solid #3b82f6;border-radius:12px;padding:16px;margin-bottom:12px"><div style="font-weight:700;color:#2563eb;margin-bottom:8px">Evaluate each option</div><table class="table"><thead><tr><th>Option</th><th>Pros</th><th>Cons</th><th>Rating (1-5)</th></tr></thead><tbody>`;
    for(let i=1;i<=3;i++) html += `<tr><td>Option ${i}</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>`;
    html += `</tbody></table></div>`;
    html += `<div style="text-align:center;font-size:1.2rem;margin-bottom:8px">↓</div>`;
    html += `<div style="border:2px solid #22c55e;border-radius:12px;padding:16px"><div style="font-weight:700;color:#16a34a;margin-bottom:8px">My decision & action plan</div><textarea class="textarea" placeholder="I will choose option ___ because..."></textarea></div>`;
  } else if (id === 'WS-CB13') {
    html += `<table class="table"><thead><tr><th>Day</th><th>Something I achieved</th><th>A compliment I received</th><th>A positive moment</th><th>How I felt (1-10)</th></tr></thead><tbody>`;
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => html += `<tr><td>${d}</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-CB14') {
    const techniques = [{name:'Box Breathing',desc:'Breathe in 4 sec, hold 4 sec, out 4 sec, hold 4 sec',icon:'📦'},{name:'5-4-3-2-1 Grounding',desc:'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste',icon:'🖐️'},{name:'Progressive Muscle Relaxation',desc:'Tense each muscle group for 5 sec, then release',icon:'💪'},{name:'Cold Water Reset',desc:'Splash cold water on face or hold an ice cube',icon:'🧊'},{name:'4-7-8 Breathing',desc:'Breathe in 4 sec, hold 7 sec, exhale 8 sec',icon:'🌬️'},{name:'Body Scan',desc:'Slowly focus attention from toes to head',icon:'🔍'}];
    techniques.forEach(t => {
      html += `<div style="margin-bottom:10px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:1.3rem">${t.icon}</span><span style="font-weight:600;color:${c.primary}">${t.name}</span></div><div style="font-size:12px;color:#6b7280;margin-bottom:6px">${t.desc}</div><div class="field-row"><div class="field"><label>How helpful? (1-5)</label><input class="field-line" type="text"></div><div class="field"><label>When I used it</label><input class="field-line" type="text"></div></div></div>`;
    });
  } else if (id === 'WS-CB15') {
    const traps = [{name:'All-or-nothing thinking',desc:'Seeing things as totally good or totally bad'},{name:'Catastrophising',desc:'Expecting the worst possible outcome'},{name:'Mind reading',desc:'Assuming you know what others think'},{name:'Fortune telling',desc:'Predicting the future will be negative'},{name:'Filtering',desc:'Only noticing the bad, ignoring the good'},{name:'Overgeneralising',desc:'One bad event means everything is always bad'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">`;
    traps.forEach(t => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px"><div style="font-weight:600;font-size:12px;color:${c.primary};margin-bottom:4px">${t.name}</div><div style="font-size:11px;color:#6b7280">${t.desc}</div></div>`);
    html += `</div>`;
    html += `<div class="section-title">My Thought Record</div>`;
    html += `<div class="field-row"><div class="field"><label>My thought</label><textarea class="textarea" placeholder="Write the thought..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Which thinking trap(s)?</label><input class="field-line" type="text" placeholder="Name the trap(s)"></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Corrected thought</label><textarea class="textarea" placeholder="What is a more balanced way to think?"></textarea></div></div>`;
  } else if (id === 'WS-CB16') {
    html += `<div class="note"><strong>Instructions:</strong> Fill in your personal emotional first aid kit — the tools, people, and activities that help you when you are in distress.</div>`;
    html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">My Tools</div><ul class="checkbox-list">`;
    ['Deep breathing','Grounding exercise','Fidget/stim toy','Weighted blanket','Music playlist','Journal/drawing','Warm/cold water','Movement/exercise'].forEach(t => html += `<li><input type="checkbox"> ${t}</li>`);
    html += `</ul></div>`;
    html += `<div class="field-row"><div class="field"><label>People I can call or text</label><textarea class="textarea" placeholder="Name and phone number..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Safe places I can go</label><textarea class="textarea" placeholder="Locations..."></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Activities that help me reset</label><textarea class="textarea" placeholder="What works for you..."></textarea></div></div>`;
  } else if (id === 'WS-CB17') {
    const scripts = [{title:'Saying no to a request',lines:['Thank you for asking','I am not able to do that right now','Maybe another time']},{title:'Asking for personal space',lines:['I need some space right now','I will come back when I am ready','Thank you for understanding']},{title:'Setting a boundary',lines:['I am not comfortable with that','I need ___________ instead','Can we find a different way?']},{title:'Requesting an accommodation',lines:['I work best when ___________','Could I try ___________?','It would help me to ___________']}];
    scripts.forEach(s => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.light};padding:8px 12px;font-weight:600;font-size:13px;color:${c.primary}">${s.title}</div><div style="padding:10px 12px">`;
      s.lines.forEach((l,i) => html += `<div style="padding:4px 0;font-size:13px;color:#4b5563">${i+1}. ${l}</div>`);
      html += `</div></div>`;
    });
  } else if (id === 'WS-CB18') {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:16px">`;
    [{title:'BEFORE',icon:'⚠️',color:'#eab308',items:['My early warning signs','What usually triggers me','Who to tell']},{title:'DURING',icon:'🛑',color:'#ef4444',items:['Where is my safe space','What I need (no demands)','What helps me calm down']},{title:'AFTER',icon:'💚',color:'#22c55e',items:['How to recover','Who can debrief with me','What to do next time']}].forEach(p => {
      html += `<div style="border:2px solid ${p.color};border-radius:10px;padding:12px"><div style="text-align:center;font-size:1.5rem;margin-bottom:4px">${p.icon}</div><div style="font-weight:700;color:${p.color};text-align:center;margin-bottom:8px">${p.title}</div>`;
      p.items.forEach(item => html += `<div style="margin-bottom:6px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:2px">${item}</div><input class="field-line" type="text"></div>`);
      html += `</div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-CB19') {
    const values = ['Honesty','Kindness','Creativity','Independence','Learning','Family','Friendship','Justice','Nature','Humor','Safety','Growth'];
    html += `<div style="font-weight:600;margin-bottom:8px">Circle or highlight the values most important to you:</div>`;
    html += `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">`;
    values.forEach(v => html += `<div style="border:1.5px solid #e5e7eb;border-radius:20px;padding:5px 14px;font-size:13px">${v}</div>`);
    html += `</div>`;
    html += `<div class="field-row"><div class="field"><label>My top 3 values</label><input class="field-line" type="text" placeholder="1.  2.  3."></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Goal based on value 1</label><textarea class="textarea" placeholder="What is one small step I can take?"></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Goal based on value 2</label><textarea class="textarea" placeholder="What is one small step I can take?"></textarea></div></div>`;
    html += `<div class="field-row"><div class="field"><label>Goal based on value 3</label><textarea class="textarea" placeholder="What is one small step I can take?"></textarea></div></div>`;
  } else if (id === 'WS-CB20') {
    const skills = [{name:'Starting a conversation',desc:'Ask about their interests, comment on shared situation'},{name:'Active listening',desc:'Nod, ask follow-up questions, reflect back'},{name:'Sharing about myself',desc:'Offer information at a comfortable pace'},{name:'Handling disagreements',desc:'Use "I" statements, seek to understand'},{name:'Repairing misunderstandings',desc:'Acknowledge, clarify, restate intention'},{name:'Ending a conversation',desc:'Summarize, express appreciation, say goodbye'}];
    skills.forEach(s => {
      html += `<div style="margin-bottom:10px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${s.name}</div><div style="font-size:12px;color:#6b7280;margin-bottom:6px">${s.desc}</div><div class="field-row"><div class="field"><label>My example / script</label><input class="field-line" type="text" placeholder="Write your own..."></div><div class="field"><label>Practiced? (date)</label><input class="field-line" type="text"></div></div></div>`;
    });
  }

  html += '</div>';
  return html;
}

function generateEduContent(ws, c) {
  let html = '<div class="section"><div class="section-title">Activity</div>';
  const id = ws.id;

  if (id === 'WS-ED01') {
    const blocks = [{time:'Morning (7-9 am)',items:['Wake up','Breakfast','Teeth / wash','Dress','Pack bag']},{time:'School Morning (9-12 pm)',items:['Circle time','Work time 1','Snack break','Work time 2','Outside play']},{time:'Afternoon (12-3 pm)',items:['Lunch','Quiet time','Activity','Free time','Snack']},{time:'Evening (3-8 pm)',items:['Homework','Dinner','Family time','Bath / wash','Bedtime routine']}];
    blocks.forEach(b => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:${c.primary};color:white;padding:8px 14px;font-weight:600;font-size:13px">${b.time}</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:#e5e7eb">`;
      b.items.forEach(item => html += `<div style="background:white;padding:10px 6px;text-align:center"><div style="width:36px;height:36px;border:2px dashed #d1d5db;border-radius:8px;margin:0 auto 4px;display:flex;align-items:center;justify-content:center;font-size:9px;color:#9ca3af">pic</div><div style="font-size:10px;font-weight:500">${item}</div></div>`);
      html += `</div></div>`;
    });
  } else if (id === 'WS-ED02') {
    html += `<div style="font-weight:600;font-size:14px;margin-bottom:8px">10-Token Board</div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px">`;
    for(let i=0;i<10;i++) html += `<div style="border:2px solid #e5e7eb;border-radius:10px;aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:1.5rem"></div>`;
    html += `</div>`;
    html += `<div class="field-row"><div class="field"><label>Child's name</label><input class="field-line" type="text"></div><div class="field"><label>Target behaviour</label><input class="field-line" type="text"></div></div>`;
    html += `<table class="table"><thead><tr><th>Tokens needed</th><th>Reward</th></tr></thead><tbody>`;
    [['5 tokens',''],['10 tokens',''],['20 tokens','']].forEach(r => html += `<tr><td>${r[0]}</td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-ED03') {
    const boxes = [{q:'WHO?',icon:'👤',hint:'Who are the main characters?'},{q:'WHAT?',icon:'❓',hint:'What happened?'},{q:'WHERE?',icon:'📍',hint:'Where does it take place?'},{q:'WHEN?',icon:'🕐',hint:'When does this happen?'},{q:'WHY?',icon:'💭',hint:'Why did it happen?'},{q:'HOW?',icon:'🔄',hint:'How did it end or change?'}];
    html += `<div class="field-row"><div class="field"><label>Book / Story title</label><input class="field-line" type="text"></div><div class="field"><label>Date</label><input class="field-line" type="text"></div></div>`;
    html += `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:12px 0">`;
    boxes.forEach(b => html += `<div style="border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden"><div style="background:${c.primary};color:white;padding:8px 12px;display:flex;align-items:center;gap:6px"><span style="font-size:1.1rem">${b.icon}</span><div><div style="font-weight:700;font-size:12px">${b.q}</div><div style="font-size:9px;opacity:.8">${b.hint}</div></div></div><div style="padding:8px"><textarea class="textarea" style="min-height:60px" placeholder="Write or draw..."></textarea></div></div>`);
    html += `</div>`;
  } else if (id === 'WS-ED04') {
    html += `<table class="table"><thead><tr><th>Day</th><th>Subject</th><th>Assignment</th><th>Due date</th><th>Break time</th><th>Done?</th></tr></thead><tbody>`;
    ['Mon','Tue','Wed','Thu','Fri'].forEach(d => {
      for(let i=0;i<2;i++) html += `<tr><td>${d}</td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text" placeholder="5-15 min"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`;
    });
    html += `</tbody></table>`;
  } else if (id === 'WS-ED05') {
    html += `<div class="note"><strong>Instructions:</strong> For each word: 1) Trace it, 2) Write it, 3) Build it with letters, 4) Find it in the word search.</div>`;
    for(let i=0;i<5;i++) {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div class="field-row"><div class="field"><label>Word</label><input class="field-line" type="text"></div></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><div><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Trace</div><div style="border-bottom:1px dashed #ccc;height:24px;margin-bottom:4px"></div><div style="border-bottom:1px dashed #ccc;height:24px"></div></div><div><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Write</div><div style="border-bottom:1px solid #ccc;height:24px;margin-bottom:4px"></div><div style="border-bottom:1px solid #ccc;height:24px"></div></div></div></div>`;
    }
  } else if (id === 'WS-ED06') {
    const steps = [{icon:'📖',label:'Read',prompt:'What is the problem asking?'},{icon:'✏️',label:'Draw',prompt:'Draw a picture of the problem'},{icon:'🔢',label:'Equation',prompt:'Write the math equation'},{icon:'✅',label:'Solve',prompt:'Work out the answer'},{icon:'🔍',label:'Check',prompt:'Does the answer make sense?'}];
    html += `<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">`;
    steps.forEach(s => html += `<div style="border:2px solid ${c.primary};border-radius:10px;padding:10px;text-align:center;flex:1;min-width:80px"><div style="font-size:1.3rem">${s.icon}</div><div style="font-weight:700;font-size:12px;color:${c.primary}">${s.label}</div><div style="font-size:10px;color:#6b7280">${s.prompt}</div></div>`);
    html += `</div>`;
    html += `<div class="field-row"><div class="field"><label>Problem</label><textarea class="textarea" placeholder="Write the word problem here..."></textarea></div></div>`;
    steps.forEach(s => html += `<div class="field-row"><div class="field"><label>${s.icon} ${s.label}: ${s.prompt}</label><textarea class="textarea" style="min-height:40px"></textarea></div></div>`);
  } else if (id === 'WS-ED07') {
    html += `<table class="table"><thead><tr><th>Goal</th><th>Target</th><th>Week 1</th><th>Week 2</th><th>Week 3</th><th>Week 4</th></tr></thead><tbody>`;
    for(let i=0;i<5;i++) html += `<tr><td><input type="text" placeholder="Goal ${i+1}"></td><td><input type="text" placeholder="Target"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-ED08') {
    const accs = ['Preferential seating','Extended time on tests','Reduced homework load','Visual schedule provided','Sensory breaks allowed','Use of fidget tools','Alternative test location','Oral testing option','Modified assignments','Use of calculator','Speech-to-text software','Frequent check-ins','Chunked directions','Noise-reducing headphones','Movement breaks','Modified grading'];
    html += `<ul class="checkbox-list">`;
    accs.forEach(a => html += `<li><input type="checkbox"> ${a}</li>`);
    html += `</ul>`;
  } else if (id === 'WS-ED09') {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">`;
    html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:8px">Main Notes</div><textarea class="textarea" style="min-height:200px" placeholder="Write key ideas here..."></textarea></div>`;
    html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:8px">Key Vocabulary</div><textarea class="textarea" style="min-height:200px" placeholder="Word: Definition..."></textarea></div>`;
    html += `</div>`;
    html += `<div class="field-row"><div class="field"><label>Subject</label><input class="field-line" type="text"></div><div class="field"><label>Date</label><input class="field-line" type="text"></div><div class="field"><label>Topic</label><input class="field-line" type="text"></div></div>`;
  } else if (id === 'WS-ED10') {
    html += `<div class="field-row"><div class="field"><label>Topic</label><input class="field-line" type="text"></div></div>`;
    html += `<div style="display:grid;grid-template-columns:1fr;gap:10px;margin:12px 0">`;
    [{label:'Main Idea',icon:'💡'},{label:'Detail 1',icon:'1️⃣'},{label:'Detail 2',icon:'2️⃣'},{label:'Detail 3',icon:'3️⃣'},{label:'Conclusion',icon:'🏁'}].forEach(s => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${s.icon} ${s.label}</div><textarea class="textarea" style="min-height:40px" placeholder="Write or draw..."></textarea></div>`;
    });
    html += `</div>`;
  } else if (id === 'WS-ED11') {
    const sections = [{title:'Current situation',prompt:'Where am I now?'},{title:'Where I am going',prompt:'What is the new situation?'},{title:'What will be the same',prompt:'What stays the same?'},{title:'What will be different',prompt:'What will change?'},{title:'Who can help me',prompt:'People and resources'},{title:'My plan',prompt:'Steps I will take'}];
    sections.forEach(s => {
      html += `<div style="margin-bottom:10px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${s.title}</div><div style="font-size:11px;color:#6b7280;margin-bottom:6px">${s.prompt}</div><textarea class="textarea" style="min-height:50px"></textarea></div>`;
    });
  } else if (id === 'WS-ED12') {
    html += `<div class="note"><strong>Instructions:</strong> Write one sight word per card. Cut along the dotted lines. Practice reading each card.</div>`;
    for(let i=0;i<8;i++) {
      html += `<div style="display:inline-block;border:2px dashed #ccc;border-radius:8px;padding:12px 20px;margin:4px;text-align:center;min-width:100px"><input type="text" style="border:none;text-align:center;font-size:16px;font-weight:600;width:100%;outline:none" placeholder="Word"></div>`;
    }
  } else if (id === 'WS-ED13') {
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">`;
    [{title:'3 x 4 = 12',desc:'3 groups of 4'},{title:'5 x 2 = 10',desc:'5 groups of 2'},{title:'4 x 3 = 12',desc:'4 groups of 3'}].forEach(p => {
      html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:700;color:${c.primary};margin-bottom:4px">${p.title}</div><div style="font-size:11px;color:#6b7280;margin-bottom:8px">${p.desc}</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:2px">`;
      for(let i=0;i<15;i++) html += `<div style="width:20px;height:20px;border:1px solid #d1d5db;border-radius:2px"></div>`;
      html += `</div></div>`;
    });
    html += `</div>`;
    html += `<div class="section-title">Practice Problems</div><table class="table"><thead><tr><th>Problem</th><th>Draw the groups</th><th>Answer</th></tr></thead><tbody>`;
    for(let i=0;i<5;i++) html += `<tr><td><input type="text"></td><td><input type="text" placeholder="Draw..."></td><td><input type="text"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-ED14') {
    html += `<div class="field-row"><div class="field"><label>Experiment title</label><input class="field-line" type="text"></div></div>`;
    const sections = [{icon:'💭',label:'Hypothesis',prompt:'What do I think will happen?'},{icon:'🔧',label:'Method',prompt:'What did I do?'},{icon:'👁️',label:'Observations',prompt:'What did I see?'},{icon:'🏁',label:'Conclusion',prompt:'What did I learn?'}];
    sections.forEach(s => {
      html += `<div style="margin-bottom:12px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${s.icon} ${s.label}</div><div style="font-size:11px;color:#6b7280;margin-bottom:6px">${s.prompt}</div><textarea class="textarea" style="min-height:60px"></textarea></div>`;
    });
  } else if (id === 'WS-ED15') {
    html += `<div class="field-row"><div class="field"><label>Event / Topic</label><input class="field-line" type="text"></div></div>`;
    html += `<div style="display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:start;margin:12px 0">`;
    html += `<div style="border:2px solid #ef4444;border-radius:10px;padding:12px"><div style="font-weight:700;color:#ef4444;margin-bottom:8px">CAUSES</div>`;
    for(let i=0;i<4;i++) html += `<div style="margin-bottom:6px"><input class="field-line" type="text" placeholder="Cause ${i+1}"></div>`;
    html += `</div>`;
    html += `<div style="font-size:2rem;text-align:center;padding-top:20px">→</div>`;
    html += `<div style="border:2px solid #22c55e;border-radius:10px;padding:12px"><div style="font-weight:700;color:#22c55e;margin-bottom:8px">EFFECTS</div>`;
    for(let i=0;i<4;i++) html += `<div style="margin-bottom:6px"><input class="field-line" type="text" placeholder="Effect ${i+1}"></div>`;
    html += `</div></div>`;
  } else if (id === 'WS-ED16') {
    const items = ['Review notes and study guide','Get a good night\'s sleep','Eat a healthy breakfast','Pack all needed materials','Arrive early','Use the bathroom before the test','Read all directions carefully','Skip and return to hard questions','Check my work before submitting','Use my accommodations','Take deep breaths if anxious','Positive self-talk: "I can do this"'];
    html += `<ul class="checkbox-list">`;
    items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
    html += `</ul>`;
  } else if (id === 'WS-ED17') {
    html += `<table class="table"><thead><tr><th>Time</th><th>Task</th><th>On task?</th><th>Off-task behavior</th><th>Strategy used</th></tr></thead><tbody>`;
    const times = ['9:00','9:15','9:30','9:45','10:00','10:15','10:30','10:45'];
    times.forEach(t => html += `<tr><td>${t}</td><td><input type="text"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td><td><input type="text"></td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-ED18') {
    for(let i=0;i<4;i++) {
      html += `<div style="margin-bottom:16px;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden"><div style="background:${c.primary};color:white;padding:8px 12px;font-weight:600">Word: <input type="text" style="border:none;border-bottom:1px solid rgba(255,255,255,.5);background:transparent;color:white;font-size:14px;width:120px;outline:none"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#e5e7eb"><div style="background:white;padding:10px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Definition</div><textarea class="textarea" style="min-height:40px"></textarea></div><div style="background:white;padding:10px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Drawing</div><div style="border:1px dashed #ccc;height:50px;border-radius:4px"></div></div><div style="background:white;padding:10px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Examples</div><textarea class="textarea" style="min-height:40px"></textarea></div><div style="background:white;padding:10px"><div style="font-size:11px;font-weight:600;color:#6b7280;margin-bottom:4px">Non-examples</div><textarea class="textarea" style="min-height:40px"></textarea></div></div></div>`;
    }
  } else if (id === 'WS-ED19') {
    html += `<div class="field-row"><div class="field"><label>Project name</label><input class="field-line" type="text"></div><div class="field"><label>Due date</label><input class="field-line" type="text"></div></div>`;
    html += `<table class="table"><thead><tr><th>Step</th><th>Description</th><th>Deadline</th><th>Done?</th></tr></thead><tbody>`;
    for(let i=1;i<=8;i++) html += `<tr><td>${i}</td><td><input type="text" placeholder="What needs to be done?"></td><td><input type="text" placeholder="Date"></td><td><input type="checkbox" style="accent-color:${c.primary}"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-ED20') {
    html += `<table class="table"><thead><tr><th>Day</th><th>Top 3 priorities</th><th>Completed?</th><th>What I learned</th></tr></thead><tbody>`;
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => html += `<tr><td>${d}</td><td><textarea class="textarea" style="min-height:40px" placeholder="1.&#10;2.&#10;3."></textarea></td><td><input type="checkbox" style="accent-color:${c.primary}"></td><td><input type="text"></td></tr>`);
    html += `</tbody></table>`;
    html += `<div style="margin-top:12px;border:1.5px solid #e5e7eb;border-radius:8px;padding:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:8px">Weekly Review</div><div class="field-row"><div class="field"><label>What went well</label><input class="field-line" type="text"></div><div class="field"><label>What to improve</label><input class="field-line" type="text"></div></div></div>`;
  }

  html += '</div>';
  return html;
}

function generateSensoryContent(ws, c) {
  let html = '<div class="section"><div class="section-title">Activity</div>';
  const id = ws.id;

  if (id === 'WS-SI01') {
    const blocks = [{label:'Morning (7-9 am)',color:'#dbeafe'},{label:'Mid-morning (9-12 pm)',color:'#d8f3dc'},{label:'Afternoon (12-3 pm)',color:'#fdf2e0'},{label:'Evening (5-8 pm)',color:'#fde8df'}];
    html += `<div class="note"><strong>Sensory diet key:</strong> V = Vestibular · P = Proprioceptive · T = Tactile · A = Auditory · Vi = Visual</div>`;
    blocks.forEach(b => {
      html += `<div style="margin-bottom:12px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden"><div style="background:${b.color};padding:10px 14px;font-weight:600;font-size:13px">${b.label}</div><div style="padding:12px"><table class="table"><thead><tr><th>Activity</th><th>Duration</th><th>Sense type</th><th>Notes</th></tr></thead><tbody>`;
      for(let i=0;i<3;i++) html += `<tr><td><input type="text" placeholder="e.g. Trampoline"></td><td><input type="text" placeholder="5 min"></td><td><input type="text" placeholder="V/P/T"></td><td><input type="text"></td></tr>`;
      html += `</tbody></table></div></div>`;
    });
  } else if (id === 'WS-SI02') {
    html += `<div class="note"><strong>How to use:</strong> After any sensory overload event, fill in a row. After 14 days, look for patterns.</div>`;
    html += `<div style="overflow-x:auto"><table class="table"><thead><tr><th>Date</th><th>Time</th><th>Environment</th><th>Trigger sense</th><th>Intensity (1-5)</th><th>What helped?</th></tr></thead><tbody>`;
    for(let i=1;i<=14;i++) html += `<tr><td><input type="text" placeholder="Day ${i}"></td><td><input type="text" placeholder="e.g. 9am"></td><td><input type="text" placeholder="e.g. Classroom"></td><td><input type="text" placeholder="e.g. Sound"></td><td><input type="text" placeholder="1-5"></td><td><input type="text"></td></tr>`;
    html += `</tbody></table></div>`;
  } else if (id === 'WS-SI03') {
    const cats = {Home:[{icon:'🧺',a:'Carry a laundry basket'},{icon:'🍽️',a:'Set the table'},{icon:'🪟',a:'Push furniture to sweep'},{icon:'💧',a:'Carry a watering can'},{icon:'🧹',a:'Sweep / mop the floor'}],School:[{icon:'📚',a:'Carry a stack of books'},{icon:'🪑',a:'Stack and carry chairs'},{icon:'🗑️',a:'Empty classroom bins'},{icon:'✏️',a:'Press hard while writing'},{icon:'🤸',a:'Wall push-ups x 10'}],Outdoors:[{icon:'🌿',a:'Garden digging'},{icon:'🧗',a:'Climbing frame / monkey bars'},{icon:'🏋️',a:'Carry a weighted backpack'},{icon:'🪨',a:'Push a wheelbarrow'},{icon:'⚽',a:'Kick and retrieve a ball'}]};
    Object.keys(cats).forEach(cat => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:700;color:${c.primary};border-bottom:2px solid ${c.primary};padding-bottom:4px;margin-bottom:8px">${cat}</div><ul class="checkbox-list">`;
      cats[cat].forEach(a => html += `<li><input type="checkbox"> <span style="font-size:1.1rem;margin:0 4px">${a.icon}</span> ${a.a}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-SI04') {
    const senses = [{sense:'Visual (sight)',seeking:'Bright lights, patterns, spinning objects',avoiding:'Fluorescent lights, clutter, glare'},{sense:'Auditory (hearing)',seeking:'Music, humming, loud sounds',avoiding:'Sirens, crowds, sudden noises'},{sense:'Tactile (touch)',seeking:'Textures, messy play, tight clothing',avoiding:'Tags, seams, light touch'},{sense:'Vestibular (movement)',seeking:'Spinning, swinging, climbing',avoiding:'Heights, swings, escalators'},{sense:'Proprioceptive (body position)',seeking:'Crashing, jumping, deep pressure',avoiding:'Light touch, being lifted'},{sense:'Olfactory (smell)',seeking:'Strong scents, sniffing objects',avoiding:'Perfume, cleaning products, food smells'},{sense:'Interoception (internal)',seeking:'Seeking intense internal sensations',avoiding:'Difficulty reading hunger, pain signals'}];
    html += `<table class="table"><thead><tr><th>Sense</th><th>I seek (enjoy / want more)</th><th>I avoid (dislike / want less)</th></tr></thead><tbody>`;
    senses.forEach(s => html += `<tr><td style="font-weight:600;color:${c.primary}">${s.sense}</td><td><input type="text" value="${s.seeking}" style="font-size:11px"></td><td><input type="text" value="${s.avoiding}" style="font-size:11px"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-SI05') {
    const acts = [{icon:'🎠',name:'Swinging (back and forth)',time:'5-15 min',setting:'Home/Therapy'},{icon:'🌀',name:'Spinning on a swivel chair',time:'2-5 min',setting:'Home/School'},{icon:'🤸',name:'Somersaults on soft mat',time:'5 min',setting:'Home/Therapy'},{icon:'🧘',name:'Yoga balance poses',time:'5-10 min',setting:'Any'},{icon:'🚲',name:'Bike riding',time:'10-20 min',setting:'Outdoors'},{icon:'🏄',name:'Balance board',time:'5 min',setting:'Home/Therapy'},{icon:'💃',name:'Dancing to music',time:'5-15 min',setting:'Any'},{icon:'🏃',name:'Running / sprinting',time:'5 min',setting:'Outdoors'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
    acts.forEach(a => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-size:1.3rem">${a.icon}</span><div style="flex:1"><div style="font-weight:600;font-size:12px">${a.name}</div><div style="font-size:10px;color:#6b7280">${a.time} · ${a.setting}</div></div><input type="checkbox" style="accent-color:${c.primary}"></div>`);
    html += `</div>`;
  } else if (id === 'WS-SI06') {
    const steps = [{level:'1 - Easiest',desc:'Touch with a tool (spoon, brush)'},{level:'2',desc:'Touch with one fingertip'},{level:'3',desc:'Touch with whole hand briefly'},{level:'4',desc:'Touch for 10 seconds'},{level:'5 - Hardest',desc:'Touch and interact with the material'}];
    html += `<div class="field-row"><div class="field"><label>Texture I am working on</label><input class="field-line" type="text" placeholder="e.g. Sand, paint, grass"></div></div>`;
    steps.forEach(s => {
      html += `<div style="margin-bottom:8px;border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:10px"><div style="font-weight:600;color:${c.primary};min-width:100px;font-size:12px">${s.level}</div><div style="font-size:12px;color:#6b7280;flex:1">${s.desc}</div><input type="checkbox" style="accent-color:${c.primary}"><input type="text" style="border:none;border-bottom:1px solid #d1d5db;width:60px;font-size:11px;outline:none" placeholder="Date"></div>`;
    });
  } else if (id === 'WS-SI07') {
    html += `<table class="table"><thead><tr><th>Date</th><th>Sound trigger</th><th>Where</th><th>Intensity (1-5)</th><th>How I felt</th><th>What helped</th></tr></thead><tbody>`;
    for(let i=1;i<=10;i++) html += `<tr><td><input type="text"></td><td><input type="text" placeholder="e.g. Fire alarm"></td><td><input type="text"></td><td><input type="text" placeholder="1-5"></td><td><input type="text"></td><td><input type="text"></td></tr>`;
    html += `</tbody></table>`;
  } else if (id === 'WS-SI08') {
    const items = [{cat:'Lighting',checks:['Natural light available','No fluorescent lights','Dimmer switch installed','Glare-free surfaces','Adjustable desk lamp']},{cat:'Visual clutter',checks:['Clear desk surfaces','Organized shelves','Minimal wall displays','Closed storage available','Neutral wall colors']},{cat:'Visual noise',checks:['No flickering lights','No scrolling screens in view','Curtains/blinds available','Visual boundary markers','Reduced pattern density']}];
    items.forEach(item => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${item.cat}</div><ul class="checkbox-list">`;
      item.checks.forEach(ch => html += `<li><input type="checkbox"> ${ch}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-SI09') {
    const acts = [{icon:'🦷',name:'Chewy food (bagels, jerky)',type:'Chew'},{icon:'🥕',name:'Crunchy snacks (carrots, crackers)',type:'Crunch'},{icon:'🫧',name:'Blowing bubbles',type:'Blow'},{icon:'🎵',name:'Blowing a harmonica',type:'Blow'},{icon:'🥤',name:'Drinking through a thick straw',type:'Suck'},{icon:'🍬',name:'Chewable jewelry / chew tube',type:'Chew'},{icon:'🍿',name:'Popcorn',type:'Crunch'},{icon:'🌬️',name:'Blowing cotton balls across a table',type:'Blow'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
    acts.forEach(a => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-size:1.3rem">${a.icon}</span><div><div style="font-weight:600;font-size:12px">${a.name}</div><div style="font-size:10px;color:#6b7280">${a.type}</div></div><input type="checkbox" style="margin-left:auto;accent-color:${c.primary}"></div>`);
    html += `</div>`;
  } else if (id === 'WS-SI10') {
    const acts = [{icon:'🤗',name:'Deep pressure blanket',time:'15-30 min'},{icon:'🤸',name:'Wall push-ups',time:'2 min'},{icon:'🧘',name:'Yoga poses (downward dog)',time:'5 min'},{icon:'💪',name:'Resistance band exercises',time:'5-10 min'},{icon:'🤲',name:'Joint compressions (with therapist)',time:'5 min'},{icon:'🧸',name:'Weighted lap pad',time:'During seated work'},{icon:'🏋️',name:'Carrying heavy objects',time:'5 min'},{icon:'🧱',name:'Pushing against a wall',time:'2 min'}];
    html += `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">`;
    acts.forEach(a => html += `<div style="border:1.5px solid #e5e7eb;border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px"><span style="font-size:1.3rem">${a.icon}</span><div style="flex:1"><div style="font-weight:600;font-size:12px">${a.name}</div><div style="font-size:10px;color:#6b7280">${a.time}</div></div><input type="checkbox" style="accent-color:${c.primary}"></div>`);
    html += `</div>`;
  } else if (id === 'WS-SI11') {
    const options = [{icon:'🤸',name:'Jump on trampoline'},{icon:'🎧',name:'Listen to music'},{icon:'🧘',name:'Deep breaths'},{icon:'🤗',name:'Weighted blanket'},{icon:'🏃',name:'Run or walk'},{icon:'🎨',name:'Draw or color'},{icon:'💧',name:'Water play'},{icon:'🧸',name:'Squeeze a toy'},{icon:'🌀',name:'Spin or swing'},{icon:'🔇',name:'Quiet corner'}];
    html += `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">`;
    options.forEach(o => html += `<div style="border:2px solid #e5e7eb;border-radius:10px;padding:10px;text-align:center;cursor:pointer"><div style="font-size:1.5rem;margin-bottom:4px">${o.icon}</div><div style="font-size:10px;font-weight:600">${o.name}</div></div>`);
    html += `</div>`;
  } else if (id === 'WS-SI12') {
    const areas = [{area:'Seating',items:['Preferential seating away from noise','Wobble cushion or alternative chair','Foot fidget band on chair','Standing desk option']},{area:'Lighting',items:['Desk lamp instead of overhead','Seat away from windows/glare','Sunglasses for fluorescent lights','Natural light preferred']},{area:'Sound',items:['Noise-reducing headphones','Preferential seating away from door','Warning before loud events','Quiet work area available']},{area:'Movement',items:['Movement breaks every 20 min','Fidget tools allowed','Resistance band on chair legs','Walking breaks permitted']}];
    areas.forEach(a => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${a.area}</div><ul class="checkbox-list">`;
      a.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-SI13') {
    const rooms = [{room:'Bedroom',items:['Blackout curtains','Weighted blanket available','Low lighting option','Minimal visual clutter','Soft textures on bed','Quiet space for decompression']},{room:'Bathroom',items:['Non-fluorescent lighting','Soft towels available','Low-scent products','Warm water available','Non-slip mat']},{room:'Kitchen/Dining',items:['No fluorescent lights','Non-cluttered table surface','Comfortable seating','Reduced cooking smells','Visual schedule for meals']},{room:'Living Room',items:['Adjustable lighting','Comfortable seating options','Reduced background noise','Organized, minimal decor','Sensory tools within reach']}];
    rooms.forEach(r => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${r.room}</div><ul class="checkbox-list">`;
      r.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-SI14') {
    const signals = [{signal:'Hunger',prompt:'Stomach rumbling, empty feeling, irritability',body:'Stomach'},{signal:'Thirst',prompt:'Dry mouth, headache, difficulty concentrating',body:'Mouth, head'},{signal:'Need for toilet',prompt:'Pressure in lower stomach, restlessness',body:'Lower stomach'},{signal:'Pain',prompt:'Sharp or dull sensation, protective response',body:'Varies'},{signal:'Temperature',prompt:'Sweating, shivering, skin feels hot/cold',body:'Skin'},{signal:'Tiredness',prompt:'Heavy eyelids, yawning, difficulty focusing',body:'Eyes, whole body'},{signal:'Anxiety',prompt:'Racing heart, tight chest, butterflies',body:'Chest, stomach'},{signal:'Anger',prompt:'Hot face, clenched jaw, tense muscles',body:'Face, hands'}];
    html += `<table class="table"><thead><tr><th>Signal</th><th>Common body cues</th><th>Where I feel it</th><th>My personal cue</th></tr></thead><tbody>`;
    signals.forEach(s => html += `<tr><td style="font-weight:600;color:${c.primary}">${s.signal}</td><td style="font-size:11px;color:#6b7280">${s.prompt}</td><td>${s.body}</td><td><input type="text" placeholder="What do I notice?"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-SI15') {
    const senses = [{sense:'Sound',low:'Too quiet, hard to focus',just:'Can hear what I need',high:'Too loud, hurts ears'},{sense:'Light',low:'Too dark, sleepy',just:'Can see clearly, comfortable',high:'Too bright, hurts eyes'},{sense:'Touch',low:'Not enough input, fidgety',just:'Comfortable in my clothes',high:'Too much, itchy, painful'},{sense:'Movement',low:'Sluggish, need to move',just:'Body feels ready',high:'Can not sit still, dizzy'},{sense:'Smell',low:'Nothing to notice',just:'Pleasant or neutral',high:'Overwhelming, nauseating'}];
    html += `<div style="display:flex;gap:8px;margin-bottom:12px;justify-content:center"><div style="border:2px solid #3b82f6;border-radius:10px;padding:8px 16px;text-align:center"><div style="font-weight:700;color:#3b82f6">TOO LITTLE</div></div><div style="border:2px solid #22c55e;border-radius:10px;padding:8px 16px;text-align:center"><div style="font-weight:700;color:#22c55e">JUST RIGHT</div></div><div style="border:2px solid #ef4444;border-radius:10px;padding:8px 16px;text-align:center"><div style="font-weight:700;color:#ef4444">TOO MUCH</div></div></div>`;
    html += `<table class="table"><thead><tr><th>Sense</th><th>Too little</th><th>Just right</th><th>Too much</th></tr></thead><tbody>`;
    senses.forEach(s => html += `<tr><td style="font-weight:600;color:${c.primary}">${s.sense}</td><td style="font-size:11px;color:#6b7280">${s.low}</td><td style="font-size:11px;color:#6b7280">${s.just}</td><td style="font-size:11px;color:#6b7280">${s.high}</td></tr>`);
    html += `</tbody></table>`;
    html += `<div style="margin-top:12px"><div style="font-weight:600;margin-bottom:6px">Right now I feel:</div><div class="field-row"><div class="field"><label>Sense</label><input class="field-line" type="text"></div><div class="field"><label>Level (too little / just right / too much)</label><input class="field-line" type="text"></div><div class="field"><label>What I can do</label><input class="field-line" type="text"></div></div></div>`;
  } else if (id === 'WS-SI16') {
    html += `<table class="table"><thead><tr><th>Time</th><th>Sensory state (1-5)</th><th>What I noticed</th><th>What I did</th><th>Effectiveness</th></tr></thead><tbody>`;
    ['Morning','Mid-morning','Lunch','Afternoon','Evening','Before bed'].forEach(t => html += `<tr><td>${t}</td><td><input type="text" placeholder="1-5"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text" placeholder="1-5"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-SI17') {
    html += `<table class="table"><thead><tr><th>Day</th><th>Morning activity</th><th>Sense</th><th>Afternoon activity</th><th>Sense</th><th>Evening activity</th><th>Sense</th></tr></thead><tbody>`;
    ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => html += `<tr><td>${d}</td><td><input type="text"></td><td><input type="text" placeholder="V/P/T"></td><td><input type="text"></td><td><input type="text" placeholder="V/P/T"></td><td><input type="text"></td><td><input type="text" placeholder="V/P/T"></td></tr>`);
    html += `</tbody></table>`;
  } else if (id === 'WS-SI18') {
    const signs = [{cat:'Physical',items:['Muscle tension increasing','Breathing getting faster','Skin flushing or going pale','Clenching jaw or fists','Feeling hot or cold suddenly']},{cat:'Emotional',items:['Irritability rising','Feeling overwhelmed','Wanting to escape','Difficulty thinking clearly','Feeling "about to explode"']},{cat:'Behavioral',items:['Pacing or fidgeting more','Withdrawing from conversation','Stimming more intensely','Speaking louder or faster','Refusing demands or requests']}];
    signs.forEach(s => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${s.cat} signs</div><ul class="checkbox-list">`;
      s.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
    html += `<div class="field-row"><div class="field"><label>My personal early warning signs</label><textarea class="textarea" placeholder="What do I notice before overload?"></textarea></div></div>`;
  } else if (id === 'WS-SI19') {
    const items = [{cat:'Auditory',items:['Noise-reducing headphones','Earplugs','White noise app','Favorite music playlist']},{cat:'Visual',items:['Sunglasses','Hat with brim','Blue-light glasses','Small flashlight']},{cat:'Tactile',items:['Fidget toy','Chewable jewelry','Textured comfort object','Bandana or soft cloth']},{cat:'Proprioceptive',items:['Resistance band','Hand exerciser','Weighted lap pad','Stress ball']},{cat:'Vestibular',items:['Small wobble cushion','Spinning top toy','Balance board']},{cat:'Olfactory',items:['Favorite essential oil','Scented lip balm','Coffee beans (to reset smell)']},{cat:'General',items:['Water bottle','Snack','Communication card','Visual schedule card']}];
    items.forEach(item => {
      html += `<div style="margin-bottom:10px"><div style="font-weight:600;color:${c.primary};margin-bottom:4px">${item.cat}</div><ul class="checkbox-list">`;
      item.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  } else if (id === 'WS-SI20') {
    const areas = [{area:'Venue',items:['Low lighting available','Quiet space designated','No fluorescent lights','Temperature controlled','Minimal background music','Clear exit paths marked']},{area:'Schedule',items:['Visual schedule provided','Transition warnings given','Break times scheduled','Flexible end time','Arrival/departure plan clear']},{area:'Communication',items:['Sensory needs shared with organizers','AAC welcome','"I need a break" card available','Clear signage for spaces','Staff briefed on sensory needs']},{area:'Food & Drink',items:['Sensory-friendly food options','Drinks available throughout','Eating area separate from activity','Food smells minimized']}];
    areas.forEach(a => {
      html += `<div style="margin-bottom:12px"><div style="font-weight:600;color:${c.primary};margin-bottom:6px">${a.area}</div><ul class="checkbox-list">`;
      a.items.forEach(i => html += `<li><input type="checkbox"> ${i}</li>`);
      html += `</ul></div>`;
    });
  }

  html += '</div>';
  return html;
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  let total = 0;

  for (const [cat, list] of Object.entries(worksheets)) {
    for (const ws of list) {
      const html = generateHTML(cat, ws);
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      const filePath = path.join(BASE, cat, `${ws.id}_${ws.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`);
      await page.pdf({
        path: filePath,
        format: 'A4',
        printBackground: true,
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }
      });
      await page.close();
      total++;
      if (total % 10 === 0) console.log(`Generated ${total} worksheets...`);
    }
  }

  await browser.close();
  console.log(`Done! Generated ${total} worksheets total.`);
}

main().catch(console.error);
