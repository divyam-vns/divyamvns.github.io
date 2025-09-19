// Multilingual translations (starter)
const translations = {
  en: { siteTitle:"🌍 Global Autism Hub", siteTagline:"Trusted, accessible autism information and resources worldwide", welcomeTitle:"Welcome", welcomeText:"Our mission is to provide comprehensive, multilingual, and accessible information about autism, support for families, and the latest research worldwide.", accordionTitle:"Frequently Asked Questions", resourcesTitle:"Resources Directory" },
  hi: { siteTitle:"🌍 ग्लोबल ऑटिज़्म हब", siteTagline:"विश्वसनीय, सुलभ ऑटिज़्म जानकारी और संसाधन", welcomeTitle:"स्वागत है", welcomeText:"हमारा मिशन ऑटिज़्म के बारे में व्यापक, बहुभाषी और सुलभ जानकारी, परिवारों के लिए समर्थन और नवीनतम अनुसंधान प्रदान करना है।", accordionTitle:"अक्सर पूछे जाने वाले प्रश्न", resourcesTitle:"संसाधन निर्देशिका" },
  es: { siteTitle:"🌍 Centro Global de Autismo", siteTagline:"Información y recursos confiables y accesibles sobre autismo en todo el mundo", welcomeTitle:"Bienvenido", welcomeText:"Nuestra misión es brindar información integral, multilingüe y accesible sobre el autismo, apoyo para familias y la investigación más reciente en todo el mundo.", accordionTitle:"Preguntas Frecuentes", resourcesTitle:"Directorio de Recursos" }
  // add other languages: ja, zh, ar, vi, ur
};

// Language switcher
const langLinks = document.querySelectorAll('#language-switcher a');
langLinks.forEach(link=>{
  link.addEventListener('click', (e)=>{
    e.preventDefault();
    const lang = link.getAttribute('data-lang');
    const t = translations[lang];
    document.getElementById('site-title').textContent = t.siteTitle;
    document.getElementById('site-tagline').textContent = t.siteTagline;
    const wTitle = document.getElementById('welcome-title');
    if(wTitle) wTitle.textContent = t.welcomeTitle;
    const wText = document.getElementById('welcome-text');
    if(wText) wText.textContent = t.welcomeText;
    const accTitle = document.getElementById('accordion-title');
    if(accTitle) accTitle.textContent = t.accordionTitle;
    const resTitle = document.getElementById('resources-title');
    if(resTitle) resTitle.textContent = t.resourcesTitle;
  });
});

// Accordion
var acc = document.getElementsByClassName("accordion");
for(let i=0;i<acc.length;i++){
  acc[i].addEventListener("click", function(){
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
}

// Resource filtering
const filterBtns = document.querySelectorAll('.filter-btns button');
const resources = document.querySelectorAll('.resource-item');
filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const category = btn.getAttribute('data-filter');
    resources.forEach(res=>{
      if(category==='all'||res.getAttribute('data-category')===category){res.style.display='block';}
      else{res.style.display='none';}
    });
  });
});
