const API_KEY = "AIzaSyAbflu9HfEuB9N5SNrIaqiFVgFHWwKwfUc";
const MAPS_API_KEY = "AIzaSyAgXDGwkRGzjko1aLe5-nFt4FsZLDjfcvw";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateText";

let currentLang = 'en';
let stream = null; // For camera stream

const messages = {
  en: {
    heroTitle: "Plant Disease Detector",
    heroSubtitle: "Scan or upload an image of your plant leaf<br>to detect disease and get solutions instantly.",
    scanBtn: "Scan",
    uploadBtn: "Upload",
    feature1Title: "Disease Detection",
    feature1Text: "AI-powered diagnosis from your plant image",
    feature2Title: "Medicine Guide",
    feature2Text: "Accurate medicine suggestions for recovery",
    feature3Title: "Nearby Assistance",
    feature3Text: "Find pesticide shops near you in Nepal",
    chatTitle: "Chatbot",
    welcome: "Hello! How can I help you?",
    placeholder: "Type your message...",
    send: "Send",
    geolocationError: "Unable to detect your location. Showing pesticide shops near Biratnagar, Nepal.",
    geolocationDenied: "You denied the location request. Showing results for Biratnagar, Nepal.",
    geolocationTimeout: "Location request timed out. Showing results for Biratnagar, Nepal.",
    outsideNepal: "You appear to be outside Nepal. Showing results for pesticide shops in Biratnagar.",
    sampleTitle: "Plant Disease Samples",
    aboutTitle: "🌿 About Plant Disease Detector",
    aboutPara1: "<strong>Plant Disease Detector</strong> is a smart, AI-powered web application built to assist farmers, gardeners, and plant enthusiasts in identifying plant diseases with just a simple image scan.",
    aboutPara2: "Using advanced machine learning models, it analyzes leaf images to detect possible diseases with high accuracy. Within seconds, users receive the disease name, confidence score, and helpful treatment suggestions.",
    aboutPara3: "Our mission is to make plant care easier, reduce crop loss, and support eco-friendly farming by providing fast, accessible, and reliable plant health diagnostics."
  },
  np: {
    heroTitle: "बिरुवा रोग पहिचानकर्ता",
    heroSubtitle: "तपाईंको बिरुवाको पातको तस्वीर स्क्यान गर्नुहोस् वा अपलोड गर्नुहोस्<br>रोग पहिचान गर्न र तुरुन्त समाधान प्राप्त गर्न।",
    scanBtn: "स्क्यान",
    uploadBtn: "अपलोड",
    feature1Title: "रोग पहिचान",
    feature1Text: "तपाईंको बिरुवाको तस्वीरबाट AI-संचालित निदान",
    feature2Title: "औषधि मार्गदर्शन",
    feature2Text: "निको हुनको लागि सटीक औषधि सुझावहरू",
    feature3Title: "नजिकको सहायता",
    feature3Text: "नेपालमा तपाईंको नजिकका कीटनाशक पसलहरू फेला पार्नुहोस्",
    chatTitle: "च्याटबट",
    welcome: "नमस्ते! म तपाईंलाई कसरी सहयोग गर्न सक्छु?",
    placeholder: "तपाईंको सन्देश टाइप गर्नुहोस्...",
    send: "पठाउनुहोस्",
    geolocationError: "तपाईंको स्थान पत्ता लगाउन सकिएन। नेपालको विराटनगर नजिकका कीटनाशक पसलहरू देखाउँदै।",
    geolocationDenied: "तपाईंले स्थान अनुरोध अस्वीकार गर्नुभयो। विराटनगरका लागि परिणामहरू देखाउँदै।",
    geolocationTimeout: "स्थान अनुरोधको समय सकियो। विराटनगरका लागि परिणामहरू देखाउँदै।",
    outsideNepal: "तपाईं नेपाल बाहिर हुनुहुन्छ जस्तो देखिन्छ। विराटनगरमा कीटनाशक पसलहरूको नतिजा देखाउँदै।",
    sampleTitle: "बिरुवा रोग नमूनाहरू",
    aboutTitle: "🌿 बिरुवा रोग पहिचानकर्ता बारे",
    aboutPara1: "<strong>बिरुवा रोग पहिचानकर्ता</strong> एक स्मार्ट, AI-संचालित वेब अनुप्रयोग हो जसले किसान, बगैचा प्रेमी, र बिरुवा प्रेमीहरूलाई सरल तस्वीर स्क्यानबाट बिरुवा रोग पहिचान गर्न मद्दत गर्दछ।",
    aboutPara2: "उन्नत मेसिन लर्निंग मोडेलहरूको प्रयोग गरेर, यो पातको तस्वीरहरू विश्लेषण गरी उच्च सटीकताका साथ सम्भावित रोगहरू पत्ता लगाउँछ। केही सेकेन्डमा, प्रयोगकर्ताहरूलाई रोगको नाम, विश्वास स्कोर, र उपयोगी उपचार सुझावहरू प्राप्त हुन्छन्।",
    aboutPara3: "हाम्रो मिशन छ बिरुवा हेरचाह सजिलो बनाउने, बालीको नोक्सानी घटाउने, र दिगो खेतीलाई समर्थन गर्ने तिब्र, पहुँचयोग्य, र भरपर्दो बिरुवा स्वास्थ्य निदान प्रदान गरेर।"
  }
};

// Disease information data
const diseaseInfo = {
  'leaf-spot': {
    en: {
      title: 'Leaf Spot Disease',
      description: 'Leaf spot is caused by fungi or bacteria, characterized by dark spots with yellow halos on leaves, leading to reduced photosynthesis and premature leaf drop.',
      cures: [
        'Remove and destroy affected leaves to reduce spread.',
        'Apply fungicides like copper-based sprays or mancozeb.',
        'Ensure proper plant spacing for air circulation.',
        'Avoid overhead watering to keep foliage dry.'
      ]
    },
    np: {
      title: 'पातको दाग रोग',
      description: 'पातको दाग रोग ढुसी वा ब्याक्टेरियाका कारण हुन्छ, जसमा पातहरूमा पहेंलो किनारसहित गाढा दागहरू देखिन्छन्, जसले प्रकाश संश्लेषण कम गर्छ र पातहरू झर्छन्।',
      cures: [
        'प्रभावित पातहरू हटाएर नष्ट गर्नुहोस्।',
        'कपर-आधारित फङ्गिसाइड वा म्यान्कोजेब प्रयोग गर्नुहोस्।',
        'हावाको संचरणका लागि बिरुवाहरू बीच उचित दूरी राख्नुहोस्।',
        'पानी माथिबाट नहाल्नुहोस्, पातहरू सुख्खा राख्नुहोस्।'
      ]
    }
  },
  'powdery-mildew': {
    en: {
      title: 'Powdery Mildew',
      description: 'Powdery mildew is a fungal disease appearing as white or grayish powdery spots on leaves, often in warm, dry conditions.',
      cures: [
        'Apply sulfur-based fungicides or neem oil.',
        'Improve air circulation around plants.',
        'Avoid excessive nitrogen fertilizers.',
        'Water plants at the base rather than overhead.'
      ]
    },
    np: {
      title: 'पाउडरी मिल्ड्यू',
      description: 'पाउडरी मिल्ड्यू एक ढुसी रोग हो जसमा पातहरूमा सेतो वा खैरो पाउडरजस्ता दागहरू देखिन्छन्, प्रायः तातो र सुख्खा अवस्थामा।',
      cures: [
        'सल्फर-आधारित फङ्गिसाइड वा नीमको तेल प्रयोग गर्नुहोस्।',
        'बिरुवाहरू वरपर हावाको संचरण सुधार गर्नुहोस्।',
        'अत्यधिक नाइट्रोजन मलको प्रयोग नगर्नुहोस्।',
        'पानी माथिबाट नभई बिरुवाको आधारमा हाल्नुहोस्।'
      ]
    }
  },
  'yellow-mosaic': {
    en: {
      title: 'Yellow Mosaic Virus',
      description: 'Yellow mosaic virus causes yellowing and mottling of leaves, stunted growth, and reduced yield, transmitted by whiteflies.',
      cures: [
        'Control whitefly populations with insecticidal soap.',
        'Remove and destroy infected plants.',
        'Use virus-resistant plant varieties.',
        'Apply reflective mulches to deter whiteflies.'
      ]
    },
    np: {
      title: 'पहेंलो मोजाइक भाइरस',
      description: 'पहेंलो मोजाइक भाइरसले पातहरू पहेंलो र धब्बा हुने, बृद्धि रोकिने र उत्पादन कम हुने गर्छ, यो सेतो माखाले सर्छ।',
      cures: [
        'कीटनाशक साबुनले सेतो माखा नियन्त्रण गर्नुहोस्।',
        'प्रभावित बिरुवाहरू हटाएर नष्ट गर्नुहोस्।',
        'भाइरस-प्रतिरोधी बिरुवा प्रजातिहरू प्रयोग गर्नुहोस्।',
        'सेतो माखालाई रोक्न परावर्तक मल्च प्रयोग गर्नुहोस्।'
      ]
    }
  },
  'rust': {
    en: {
      title: 'Rust Infection',
      description: 'Rust is a fungal disease causing orange or yellowish pustules on leaves, reducing photosynthesis and vigor.',
      cures: [
        'Apply fungicides like triadimefon or sulfur.',
        'Remove and destroy affected plant parts.',
        'Improve air circulation and reduce humidity.',
        'Avoid wetting foliage during watering.'
      ]
    },
    np: {
      title: 'खिया रोग',
      description: 'खिया एक ढुसी रोग हो जसले पातहरूमा सुन्तला वा पहेंलो फोका उत्पन्न गर्छ, जसले प्रकाश संश्लेषण र बिरुवाको जोश कम गर्छ।',
      cures: [
        'ट्रायाडिमेफोन वा सल्फरजस्ता फङ्गिसाइड प्रयोग गर्नुहोस्।',
        'प्रभावित बिरुवाका भागहरू हटाएर नष्ट गर्नुहोस्।',
        'हावाको संचरण सुधार गर्नुहोस् र आर्द्रता कम गर्नुहोस्।',
        'पानी हाल्दा पातहरू भिजाउनबाट जोगिनुहोस्।'
      ]
    }
  }
};

// ======= NAVIGATION SCROLL & ACTIVE LINK HANDLER =======
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            if (targetId === 'hero') {
                 document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            } else if (document.getElementById(targetId)) {
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', () => {
        let fromTop = window.scrollY + 100;
        navLinks.forEach(link => {
            const section = document.getElementById(link.getAttribute('href').substring(1));
            if (section && section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });

    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
        document.body.classList.add("dark");
        const toggleInput = document.querySelector('.dark-toggle input');
        if (toggleInput) toggleInput.checked = true;
    }

    updateSiteUI();
    updateChatUI();

    const nearbyFeature = document.querySelector('[data-feature="nearby-assistance"]');
    if (nearbyFeature) {
        nearbyFeature.style.cursor = 'pointer';
        nearbyFeature.addEventListener('click', openPesticideShopsMap);
    }

    document.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const disease = btn.getAttribute('data-disease');
            alert(`Learn more about ${disease}`);
        });
    });

    const uploadInput = document.getElementById('uploadInput');
    if (uploadInput) uploadInput.addEventListener('change', previewImage);
});


// Scan Modal Functions
function openScanModal() {
  const modal = document.getElementById('scanModal');
  const video = document.getElementById('videoStream');
  const canvas = document.getElementById('scanCanvas');
  const result = document.getElementById('scanResult');
  
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert(messages[currentLang].geolocationError || 'Camera not supported on this device.');
    return;
  }

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(s => {
      stream = s;
      video.srcObject = stream;
      modal.classList.add('active');
      result.innerHTML = '';
      result.classList.remove('active');
    })
    .catch(err => {
      console.error('Error accessing camera:', err);
      alert(messages[currentLang].geolocationError || 'Unable to access camera.');
    });
}

function closeScanModal() {
  const modal = document.getElementById('scanModal');
  const video = document.getElementById('videoStream');
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  video.srcObject = null;
  modal.classList.remove('active');
}

function captureImage() {
  const video = document.getElementById('videoStream');
  const canvas = document.getElementById('scanCanvas');
  const preview = document.getElementById('imagePreview');
  const result = document.getElementById('scanResult');

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);

  const img = document.createElement('img');
  img.src = canvas.toDataURL('image/jpeg');
  img.alt = 'Captured Plant Leaf';
  preview.innerHTML = '';
  preview.appendChild(img);

  result.innerHTML = '<p class="loading">Analyzing image...</p>';
  result.classList.add('active');

  // Simulate API call delay
  setTimeout(() => {
    const detectedDisease = 'leaf-spot';
    const disease = diseaseInfo[detectedDisease][currentLang];
    result.innerHTML = `
      <h2>${disease.title}</h2>
      <p>${disease.description}</p>
      <h3>${messages[currentLang].cure || 'Cure Measures'}</h3>
      <ul>
        ${disease.cures.map(cure => `<li>${cure}</li>`).join('')}
      </ul>
    `;
  }, 1000);
  closeScanModal();
}

function retakeImage() {
  const result = document.getElementById('scanResult');
  result.innerHTML = '';
  result.classList.remove('active');
  const video = document.getElementById('videoStream');
  if (stream) {
    video.srcObject = stream;
  }
}

// Disease Modal Functions
function showDiseaseInfo(diseaseId) {
  const modal = document.getElementById('diseaseModal');
  const title = document.getElementById('diseaseTitle');
  const description = document.getElementById('diseaseDescription');
  const cures = document.getElementById('cureMeasures');
  const disease = diseaseInfo[diseaseId][currentLang];

  title.textContent = disease.title;
  description.textContent = disease.description;
  cures.innerHTML = disease.cures.map(cure => `<li>${cure}</li>`).join('');
  modal.classList.add('active');
}

function closeDiseaseModal() {
  const modal = document.getElementById('diseaseModal');
  modal.classList.remove('active');
}

// Existing functions (unchanged)
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
}

function previewImage(event) {
  const preview = document.getElementById('imagePreview');
  preview.innerHTML = '';
  const file = event.target.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.alt = 'Uploaded Plant Leaf';
    preview.appendChild(img);
  }
}

function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.classList.toggle('active');
}

function switchLanguage() {
  currentLang = document.getElementById('language').value;
  updateChatUI();
}

function switchSiteLanguage() {
  currentLang = document.getElementById('siteLanguage').value;
  updateSiteUI();
  updateChatUI();
}

function updateSiteUI() {
  const msgs = messages[currentLang];
  if (!msgs) return;

  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) heroTitle.innerHTML = msgs.heroTitle;

  const heroSubtitle = document.getElementById('heroSubtitle');
  if (heroSubtitle) heroSubtitle.innerHTML = msgs.heroSubtitle;

  const scanBtnText = document.getElementById('scanBtnText');
  if (scanBtnText) scanBtnText.textContent = msgs.scanBtn;

  const uploadBtnText = document.getElementById('uploadBtnText');
  if (uploadBtnText) uploadBtnText.textContent = msgs.uploadBtn;

  const feature1Title = document.getElementById('feature1Title');
  if (feature1Title) feature1Title.textContent = msgs.feature1Title;

  const feature1Text = document.getElementById('feature1Text');
  if (feature1Text) feature1Text.textContent = msgs.feature1Text;

  const feature2Title = document.getElementById('feature2Title');
  if (feature2Title) feature2Title.textContent = msgs.feature2Title;

  const feature2Text = document.getElementById('feature2Text');
  if (feature2Text) feature2Text.textContent = msgs.feature2Text;

  const feature3Title = document.getElementById('feature3Title');
  if (feature3Title) feature3Title.textContent = msgs.feature3Title;

  const feature3Text = document.getElementById('feature3Text');
  if (feature3Text) feature3Text.textContent = msgs.feature3Text;

  const sampleTitle = document.getElementById('sampleTitle');
  if (sampleTitle) sampleTitle.textContent = msgs.sampleTitle;

  const aboutPara1 = document.getElementById('aboutPara1');
  const aboutPara2 = document.getElementById('aboutPara2');
  const aboutPara3 = document.getElementById('aboutPara3');

  if (aboutPara1) aboutPara1.innerHTML = msgs.aboutPara1;
  if (aboutPara2) aboutPara2.innerHTML = msgs.aboutPara2;
  if (aboutPara3) aboutPara3.innerHTML = msgs.aboutPara3;
}

function updateChatUI() {
  const msgs = messages[currentLang];
  if (!msgs) return;

  const chatTitle = document.getElementById('chatTitle');
  if (chatTitle) chatTitle.textContent = msgs.chatTitle;

  const welcomeMsg = document.getElementById('welcomeMsg');
  if (welcomeMsg) welcomeMsg.textContent = msgs.welcome;

  const userInput = document.getElementById('userInput');
  if (userInput) userInput.placeholder = msgs.placeholder;

  const sendBtn = document.getElementById('sendBtn');
  if (sendBtn) sendBtn.textContent = msgs.send;
}

function scrollChatToBottom() {
  const chatBody = document.getElementById('chatBody');
  if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('userInput');
  if (!input) return;

  const userText = input.value.trim();
  if (userText === '') return;

  const chatBody = document.getElementById('chatBody');
  if (!chatBody) return;

  const userMsg = document.createElement('p');
  userMsg.classList.add('user-msg');
  userMsg.textContent = userText;
  chatBody.appendChild(userMsg);
  scrollChatToBottom();

  input.value = '';

  const botMsg = document.createElement('p');
  botMsg.classList.add('bot-msg');
  botMsg.textContent = "...";
  chatBody.appendChild(botMsg);
  scrollChatToBottom();

  const prompt = currentLang === 'np'
    ? "कृपया यस कुराकानीलाई नेपाली भाषामा उत्तर दिनुहोस्:\n" + userText
    : userText;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: { text: prompt },
        temperature: 0.7,
        maxOutputTokens: 512,
        topP: 0.8,
        topK: 40
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.output || "Sorry, I couldn't respond.";
    botMsg.textContent = reply;
    scrollChatToBottom();
  } catch (err) {
    botMsg.textContent = "Sorry, I couldn't respond.";
    console.error(err);
  }
}

// Chatbot code
const CHATBOT_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
    chatWindow.style.flexDirection = 'column';
  }

  function switchLanguage() {
    currentLang = document.getElementById('language').value;
    document.getElementById('chatTitle').innerText = messages[currentLang].chatTitle;
    document.getElementById('welcomeMsg').innerText = messages[currentLang].welcome;
    document.getElementById('userInput').placeholder = messages[currentLang].placeholder;
    document.querySelector('.chat-footer button').innerText = messages[currentLang].send;
  }

  async function sendMessage() {
    const input = document.getElementById('userInput');
    const userText = input.value.trim();
    if (userText === '') return;

    const userMsg = document.createElement('p');
    userMsg.textContent = userText;
    userMsg.style.textAlign = "right";
    document.getElementById('chatBody').appendChild(userMsg);
    input.value = '';

    // Show temporary loading
    const botMsg = document.createElement('p');
    botMsg.textContent = "...";
    botMsg.style.textAlign = "left";
    document.getElementById('chatBody').appendChild(botMsg);

    const prompt = currentLang === 'np'
      ? "कृपया यस कुराकानीलाई नेपाली भाषामा उत्तर दिनुहोस्:\n" + userText
      : userText;

    try {
      const response = await fetch(`${CHATBOT_API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond.";
      botMsg.textContent = reply;
    } catch (err) {
      botMsg.textContent = "Sorry, I couldn't respond.";
      console.error(err);
    }
  }


// google maps        
function openPesticideShopsMap() {
  // Define the precise search query for pesticide shops in Near Me.
  const query = "pesticide shop agrovet Near Me";

  // Create the final Google Maps URL with the precise search query.
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  // Open the map in a new tab.
  window.open(mapsUrl, '_blank');
}


function openAuthModal() {
  const modal = document.getElementById('authModal');
  const modalContent = document.querySelector('.auth-modal-content');
  if (modal && modalContent) {
    modal.style.display = 'block';
    modal.classList.add('active');
    modalContent.classList.add('active');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  const modalContent = document.querySelector('.auth-modal-content');
  if (modal && modalContent) {
    modal.style.display = 'none';
    modal.classList.remove('active');
    modalContent.classList.remove('active');
  }
}

function showLogin() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginToggle = document.getElementById('loginToggle');
  const signupToggle = document.getElementById('signupToggle');

  if (loginForm && signupForm && loginToggle && signupToggle) {
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
  }
}

function showSignup() {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginToggle = document.getElementById('loginToggle');
  const signupToggle = document.getElementById('signupToggle');

  if (loginForm && signupForm && loginToggle && signupToggle) {
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
  }
}

window.onclick = function (event) {
  const authModal = document.getElementById('authModal');
  const diseaseModal = document.getElementById('diseaseModal');
  const scanModal = document.getElementById('scanModal');
  const modalContent = document.querySelector('.auth-modal-content');
  if (event.target === authModal && authModal && modalContent) {
    authModal.style.display = 'none';
    authModal.classList.remove('active');
    modalContent.classList.remove('active');
  }
  if (event.target === diseaseModal && diseaseModal) {
    closeDiseaseModal();
  }
  if (event.target === scanModal && scanModal) {
    closeScanModal();
  }
};

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  let hasError = false;

  if (!email.value.trim()) {
    email.classList.add('error');
    hasError = true;
    setTimeout(() => email.classList.remove('error'), 400);
  }
  if (!password.value.trim()) {
    password.classList.add('error');
    hasError = true;
    setTimeout(() => password.classList.remove('error'), 400);
  }

  if (!hasError) {
    alert(`Logging in with:\nEmail: ${email.value.trim()}`);
    closeAuthModal();
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById('signupName');
  const email = document.getElementById('signupEmail');
  const password = document.getElementById('signupPassword');
  let hasError = false;

  if (!name.value.trim()) {
    name.classList.add('error');
    hasError = true;
    setTimeout(() => name.classList.remove('error'), 400);
  }
  if (!email.value.trim()) {
    email.classList.add('error');
    hasError = true;
    setTimeout(() => email.classList.remove('error'), 400);
  }
  if (!password.value.trim()) {
    password.classList.add('error');
    hasError = true;
    setTimeout(() => password.classList.remove('error'), 400);
  }

  if (!hasError) {
    alert(`Signing up with:\nName: ${name.value.trim()}\nEmail: ${email.value.trim()}`);
    closeAuthModal();
  }
}

function handleContactForm(e) {
  e.preventDefault();
  alert("Thank you for contacting us! We'll get back to you soon.");
}