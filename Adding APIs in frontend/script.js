const API_KEY = "AIzaSyAbflu9HfEuB9N5SNrIaqiFVgFHWwKwfUc";
const MAPS_API_KEY = "AIzaSyAgXDGwkRGzjko1aLe5-nFt4FsZLDjfcvw";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

let currentLang = 'en';

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
    geolocationError: "Unable to detect your location. Showing pesticide shops near Biratnagar, Nepal."
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
    geolocationError: "तपाईंको स्थान पत्ता लगाउन सकिएन। नेपालको विराटनगर नजिकका कीटनाशक पसलहरू देखाउँदै।"
  }
};

document.getElementById('themeToggle').addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

function previewImage(event) {
  const preview = document.getElementById('imagePreview');
  preview.innerHTML = '';
  const file = event.target.files[0];
  if (file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    preview.appendChild(img);
  }
}

const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
  cursor.style.top = e.clientY + 'px';
  cursor.style.left = e.clientX + 'px';
});

function toggleChat() {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
  chatWindow.style.flexDirection = 'column';
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
  document.getElementById('heroTitle').innerHTML = messages[currentLang].heroTitle;
  document.getElementById('heroSubtitle').innerHTML = messages[currentLang].heroSubtitle;
  document.getElementById('scanBtnText').textContent = messages[currentLang].scanBtn;
  document.getElementById('uploadBtnText').textContent = messages[currentLang].uploadBtn;
  document.getElementById('feature1Title').textContent = messages[currentLang].feature1Title;
  document.getElementById('feature1Text').textContent = messages[currentLang].feature1Text;
  document.getElementById('feature2Title').textContent = messages[currentLang].feature2Title;
  document.getElementById('feature2Text').textContent = messages[currentLang].feature2Text;
  document.getElementById('feature3Title').textContent = messages[currentLang].feature3Title;
  document.getElementById('feature3Text').textContent = messages[currentLang].feature3Text;
}

function updateChatUI() {
  document.getElementById('chatTitle').textContent = messages[currentLang].chatTitle;
  document.getElementById('welcomeMsg').textContent = messages[currentLang].welcome;
  document.getElementById('userInput').placeholder = messages[currentLang].placeholder;
  document.getElementById('sendBtn').textContent = messages[currentLang].send;
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

  const botMsg = document.createElement('p');
  botMsg.textContent = "...";
  botMsg.style.textAlign = "left";
  document.getElementById('chatBody').appendChild(botMsg);

  const prompt = currentLang === 'np'
    ? "कृपया यस कुराकानीलाई नेपाली भाषामा उत्तर दिनुहोस्:\n" + userText
    : userText;

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
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

// Pesticide Shops Near User (Nepal) or default Nepal center fallback
function openPesticideShopsMap() {
  const query = currentLang === 'np' ? 'कीटनाशक पसल' : 'pesticide shop';
  const nepalCenter = { lat: 28.3949, lng: 84.1240 }; // Nepal center approx

  if (!navigator.geolocation) {
    alert(messages[currentLang].geolocationError);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&center=${nepalCenter.lat},${nepalCenter.lng}&zoom=12`;
    window.open(mapsUrl, '_blank');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Check if inside Nepal bounding box
      const isInNepal =
        latitude >= 26.347 && latitude <= 30.447 &&
        longitude >= 80.052 && longitude <= 88.201;

      const center = isInNepal
        ? `${latitude},${longitude}`
        : `${nepalCenter.lat},${nepalCenter.lng}`;

      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&center=${center}&zoom=14`;

      window.open(mapsUrl, '_blank');
    },
    () => {
      alert(messages[currentLang].geolocationError);
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}&center=${nepalCenter.lat},${nepalCenter.lng}&zoom=12`;
      window.open(mapsUrl, '_blank');
    }
  );
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  updateSiteUI();
  updateChatUI();
  document.querySelectorAll('.feature')[2].addEventListener('click', openPesticideShopsMap);
});