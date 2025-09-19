// --- Multilingual support ---
const eduTranslations = {
  en: {
    welcomeTitle: "Educational Resources",
    iep1Title: "What is an IEP?",
    iep1Text: "An Individualized Education Program (IEP) is a personalized plan for students with special needs to provide tailored educational support.",
    iep2Title: "Why IEP is Important",
    iep2Text: "IEPs ensure measurable goals, accommodations, and resources for academic and social success for students with autism.",
    resourcesTitle: "Free Educational Resources",
    worksheetsTitle: "Uploaded Worksheets"
  },
  hi: {
    welcomeTitle:"शैक्षिक संसाधन",
    iep1Title:"IEP क्या है?",
    iep1Text:"व्यक्तिगत शैक्षिक कार्यक्रम (IEP) विशेष जरूरतों वाले छात्रों के लिए एक व्यक्तिगत योजना है जो विशेष शैक्षिक समर्थन प्रदान करता है।",
    iep2Title:"IEP क्यों महत्वपूर्ण है",
    iep2Text:"IEP सुनिश्चित करता है कि छात्रों को मापने योग्य लक्ष्य, आवश्यक सुविधाएं और शैक्षिक एवं सामाजिक सफलता के लिए संसाधन मिलें।",
    resourcesTitle:"मुफ़्त शैक्षिक संसाधन",
    worksheetsTitle:"अपलोड की गई वर्कशीट्स"
  }
  // Add other languages: ja, zh, ar, vi, ur, es
};

// --- Language Switcher ---
const langLinksEdu = document.querySelectorAll('#language-switcher a');
langLinksEdu.forEach(link=>{
  link.addEventListener('click', e=>{
    e.preventDefault();
    const lang = link.getAttribute('data-lang');
    const t = eduTranslations[lang] || eduTranslations['en'];
    document.getElementById('welcome-title').textContent = t.welcomeTitle;

    const items = document.querySelectorAll('.resource-item');
    if(items[0]) {
      items[0].querySelector('.title').textContent = t.iep1Title;
      items[0].querySelector('.text').textContent = t.iep1Text;
    }
    if(items[1]) {
      items[1].querySelector('.title').textContent = t.iep2Title;
      items[1].querySelector('.text').textContent = t.iep2Text;
    }
    if(items[2]) items[2].querySelector('.title').textContent = t.resourcesTitle;
    if(items[3]) items[3].querySelector('.title').textContent = t.worksheetsTitle;
  });
});

// --- Filter Buttons ---
const filterBtns = document.querySelectorAll('.filter-btns button');
const resourcesItems = document.querySelectorAll('.resource-item');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const category = btn.getAttribute('data-filter');
    resourcesItems.forEach(res=>{
      res.style.display = (category==='all'||res.getAttribute('data-category')===category)?'block':'none';
    });
  });
});

// --- Auto-generate downloadable worksheets from JSON ---
fetch('resources/resources.json')
  .then(response => response.json())
  .then(files => {
    const ul = document.getElementById('uploadedFiles');
    if(!ul) return;
    files.forEach(file => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = 'resources/' + file;
      a.download = file;
      a.textContent = file;
      li.appendChild(a);
      ul.appendChild(li);
    });
  })
  .catch(err => console.error("Failed to load resources.json:", err));
