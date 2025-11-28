/***** CONFIG *****/
const API_KEY = "AIzaSyAbflu9HfEuB9N5SNrIaqiFVgFHWwKwfUc";
const MAPS_API_KEY = "AIzaSyAgXDGwkRGzjko1aLe5-nFt4FsZLDjfcvw";
const CHATBOT_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

let currentLang = "en";
let stream = null;

/***** UI TEXT *****/
const messages = {
  en: {
    quickRecsHeading: "Quick Recommendations",
    careTipsHeading: "Care Tips",
    navAbout: "About",
    navContact: "Contact",
    loginSignup: "Login / Signup",
    heroTitle: "Plant Disease Detector",
    heroSubtitle:
      "Scan or upload an image of your plant leaf<br>to detect disease and get solutions instantly.",
    scanBtn: "Scan",
    uploadBtn: "Upload",
    scanModalTitle: "Scan Leaf",
    capture: "Capture",
    retake: "Retake",
    cancel: "Cancel",
    analyzing: "Analyzing image...",
    detectLabel: "Disease Detected:",
    askMedicine: "Do you want a medicine recommendation?",
    askCare: "Your plant looks healthy. Do you want general care tips?",
    yes: "Yes",
    no: "No",
    thanks: "Thank you for using Plant Disease Detector!",
    analyzeFail: "Failed to analyze image.",
    recosFor: "Recommendations for",
    cureMeasuresTitle: "Cure Measures",
    feature3Title: "Nearby Assistance",
    feature3Text: "Find pesticide shops near you in Nepal",
    sampleTitle: "Plant Disease Samples",
    sampleLeafSpot: "Leaf Spot Disease",
    samplePowderyMildew: "Powdery Mildew",
    sampleYellowMosaic: "Yellow Mosaic Virus",
    sampleRust: "Rust Infection",
    aboutTitle: "🌿 About Plant Disease Detector",
    aboutPara1:
      "<strong>Plant Disease Detector</strong> is a smart, AI-powered web application built to assist farmers, gardeners, and plant enthusiasts in identifying plant diseases with just a simple image scan.",
    aboutPara2:
      "Using advanced machine learning models, it analyzes leaf images to detect possible diseases with high accuracy. Within seconds, users receive the disease name, confidence score, and helpful treatment suggestions.",
    aboutPara3:
      "Our mission is to make plant care easier, reduce crop loss, and support eco-friendly farming by providing fast, accessible, and reliable plant health diagnostics.",
    chatTitle: "Chatbot",
    welcome: "Hello! How can I help you?",
    placeholder: "Type your message...",
    send: "Send",
    contactTitle: "Contact Us",
    contactName: "Your Name",
    contactEmail: "Your Email",
    contactMessage: "Your Message",
    contactSendBtn: "Send Message",
    getInTouch: "Get in Touch",
    login: "Login",
    signup: "Signup",
    email: "Email",
    password: "Password",
    fullName: "Full Name",
  },
  np: {
    quickRecsHeading: "छोटो सिफारिसहरू",
    careTipsHeading: "हेरचाह सुझाव",
    navAbout: "बारेमा",
    navContact: "सम्पर्क",
    loginSignup: "लग-इन / दर्ता",
    heroTitle: "बिरुवा रोग पहिचानकर्ता",
    heroSubtitle:
      "तपाईंको बिरुवाको पातको तस्वीर स्क्यान गर्नुहोस् वा अपलोड गर्नुहोस्<br>रोग पहिचान गर्न र तुरुन्त समाधान प्राप्त गर्न।",
    scanBtn: "स्क्यान",
    uploadBtn: "अपलोड",
    scanModalTitle: "पात स्क्यान",
    capture: "क्याप्चर",
    retake: "फेरि खिच्नुहोस्",
    cancel: "रद्द गर्नुहोस्",
    analyzing: "तस्वीर विश्लेषण हुँदैछ...",
    detectLabel: "पहिचान गरिएको रोग:",
    askMedicine: "के तपाईं औषधि सिफारिस चाहनुहुन्छ?",
    askCare: "बिरुवा स्वस्थ देखिन्छ। के तपाईं हेरचाह सुझाव चाहनुहुन्छ?",
    yes: "हो",
    no: "होइन",
    thanks: "Plant Disease Detector प्रयोग गर्नुभएकोमा धन्यवाद!",
    analyzeFail: "तस्वीर विश्लेषण असफल भयो।",
    recosFor: "यसका लागि सिफारिसहरू",
    cureMeasuresTitle: "उपचार उपायहरू",
    feature3Title: "नजिकको सहायता",
    feature3Text: "नेपालमा तपाईंको नजिकका कीटनाशक पसलहरू फेला पार्नुहोस्",
    sampleTitle: "बिरुवा रोग नमूनाहरू",
    sampleLeafSpot: "पातको दाग रोग",
    samplePowderyMildew: "पाउडरी मिल्ड्यू",
    sampleYellowMosaic: "पहेंलो मोजाइक भाइरस",
    sampleRust: "खिया संक्रमण",
    aboutTitle: "🌿 बिरुवा रोग पहिचानकर्ता बारे",
    aboutPara1:
      "<strong>बिरुवा रोग पहिचानकर्ता</strong> एक स्मार्ट, AI-सञ्चालित वेब अनुप्रयोग हो जसले किसान, बगैंचा तथा बिरुवा प्रेमीहरूलाई सरल तस्वीर स्क्यानबाट रोग पहिचान गर्न मद्दत गर्छ।",
    aboutPara2:
      "उन्नत मेसिन लर्निङ मोडेल प्रयोग गरेर, यो पातका तस्वीरहरू विश्लेषण गरी उच्च सटीकताका साथ सम्भावित रोगहरू पत्ता लगाउँछ। केही सेकेन्डमै रोगको नाम, भरोसा स्कोर र उपयोगी उपचार सिफारिसहरू प्रदान हुन्छन्।",
    aboutPara3:
      "हाम्रो लक्ष्य छ बिरुवा हेरचाह सजिलो बनाउने, बाली नोक्सानी घटाउने र दिगो खेतीलाई समर्थन गर्ने छिटो, पहुँचयोग्य र भरपर्दो स्वास्थ्य निदानमार्फत।",
    chatTitle: "च्याटबट",
    welcome: "नमस्ते! म तपाईंलाई कसरी सहयोग गर्न सक्छु?",
    placeholder: "सन्देश टाइप गर्नुहोस्...",
    send: "पठाउनुहोस्",
    contactTitle: "हामीलाई सम्पर्क गर्नुहोस्",
    contactName: "तपाईंको नाम",
    contactEmail: "तपाईंको इमेल",
    contactMessage: "तपाईंको सन्देश",
    contactSendBtn: "सन्देश पठाउनुहोस्",
    getInTouch: "सम्पर्कमा रहनुहोस्",
    login: "लग-इन",
    signup: "दर्ता",
    email: "इमेल",
    password: "पासवर्ड",
    fullName: "पूरा नाम",
  },
};

/***** DISEASE INFO (kept) *****/
const diseaseInfo = {
  "leaf-spot": {
    en: {
      title: "Leaf Spot Disease",
      description:
        "Leaf spot is caused by fungi or bacteria, characterized by dark spots with yellow halos on leaves, leading to reduced photosynthesis and premature leaf drop.",
      cures: [
        "Remove and destroy affected leaves to reduce spread.",
        "Apply fungicides like copper-based sprays or mancozeb.",
        "Ensure proper plant spacing for air circulation.",
        "Avoid overhead watering to keep foliage dry.",
      ],
    },
    np: {
      title: "पातको दाग रोग",
      description:
        "पातको दाग रोग ढुसी वा ब्याक्टेरियाका कारण हुन्छ, जसमा पातहरूमा पहेंलो किनारसहित गाढा दागहरू देखिन्छन्, जसले प्रकाश संश्लेषण कम गर्छ र पातहरू झर्छन्।",
      cures: [
        "प्रभावित पातहरू हटाएर नष्ट गर्नुहोस्।",
        "कपर-आधारित फङ्गिसाइड वा म्यान्कोजेब प्रयोग गर्नुहोस्।",
        "हावाको संचरणका लागि बिरुवाहरू बीच उचित दूरी राख्नुहोस्।",
        "पानी माथिबाट नहाल्नुहोस्, पातहरू सुख्खा राख्नुहोस्।",
      ],
    },
  },
  "powdery-mildew": {
    en: {
      title: "Powdery Mildew",
      description:
        "Powdery mildew is a fungal disease appearing as white or grayish powdery spots on leaves, often in warm, dry conditions.",
      cures: [
        "Apply sulfur-based fungicides or neem oil.",
        "Improve air circulation around plants.",
        "Avoid excessive nitrogen fertilizers.",
        "Water plants at the base rather than overhead.",
      ],
    },
    np: {
      title: "पाउडरी मिल्ड्यू",
      description:
        "पाउडरी मिल्ड्यू एक ढुसी रोग हो जसमा पातहरूमा सेतो वा खैरो पाउडरजस्ता दागहरू देखिन्छन्, प्रायः तातो र सुख्खा अवस्थामा।",
      cures: [
        "सल्फर-आधारित फङ्गिसाइड वा नीमको तेल प्रयोग गर्नुहोस्।",
        "बिरुवाहरू वरपर हावाको संचरण सुधार गर्नुहोस्।",
        "अत्यधिक नाइट्रोजन मलको प्रयोग नगर्नुहोस्।",
        "पानी माथिबाट नभई बिरुवाको आधारमा हाल्नुहोस्।",
      ],
    },
  },
  rust: {
    en: {
      title: "Rust Infection",
      description:
        "Rust is a fungal disease causing orange or yellowish pustules on leaves, reducing photosynthesis and vigor.",
      cures: [
        "Apply fungicides like triadimefon or sulfur.",
        "Remove and destroy affected plant parts.",
        "Improve air circulation and reduce humidity.",
        "Avoid wetting foliage during watering.",
      ],
    },
    np: {
      title: "खिया रोग",
      description:
        "खिया एक ढुसी रोग हो जसले पातहरूमा सुन्तला वा पहेंलो फोका उत्पन्न गर्छ, जसले प्रकाश संश्लेषण र बिरुवाको जोश कम गर्छ।",
      cures: [
        "ट्रायाडिमेफोन वा सल्फरजस्ता फङ्गिसाइड प्रयोग गर्नुहोस्।",
        "प्रभावित बिरुवाका भागहरू हटाएर नष्ट गर्नुहोस्।",
        "हावाको संचरण सुधार गर्नुहोस् र आर्द्रता कम गर्नुहोस्।",
        "पानी हाल्दा पातहरू भिजाउनबाट जोगिनुहोस्।",
      ],
    },
  },
};

/***** CLASS DESCRIPTIONS (English; description will be localized) *****/
const classDescriptions = {
  "Apple___Apple_scab": "Apple scab is a fungal disease causing dark spots on leaves and fruit.",
  "Apple___Black_rot": "Black rot causes rotting of fruits and leaf spots on apple trees.",
  "Apple___Cedar_apple_rust": "Cedar apple rust causes orange spots on apple leaves and fruit.",
  "Apple___healthy": "This apple leaf or fruit is healthy and free of diseases.",
  "Blueberry___healthy": "This blueberry plant is healthy and free of diseases.",
  "Cherry_(including_sour)___Powdery_mildew": "Powdery mildew causes white powdery growth on cherry leaves.",
  "Cherry_(including_sour)___healthy": "This cherry plant is healthy and free of diseases.",
  "Corn_(maize)___Cercospora_leaf_spot_Gray_leaf_spot": "Causes gray leaf spots on maize leaves.",
  "Corn_(maize)___Common_rust_": "Common rust causes reddish-brown pustules on maize leaves.",
  "Corn_(maize)___Northern_Leaf_Blight": "Northern Leaf Blight causes large, cigar-shaped lesions on maize leaves.",
  "Corn_(maize)___healthy": "This maize plant is healthy and free of diseases.",
  "Grape___Black_rot": "Black rot causes dark lesions and rotting on grape leaves and fruit.",
  "Grape___Esca_(Black_Measles)": "Esca causes black measles-like spots on grape leaves.",
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "Leaf blight causes spots and leaf damage on grapes.",
  "Grape___healthy": "This grape plant is healthy and free of diseases.",
  "Orange___Haunglongbing_(Citrus_greening)": "Citrus greening causes yellowing and misshapen oranges.",
  "Peach___Bacterial_spot": "Bacterial spot causes dark, sunken spots on peach leaves and fruit.",
  "Peach___healthy": "This peach plant is healthy and free of diseases.",
  "Pepper,_bell___Bacterial_spot": "Bacterial spot causes lesions on pepper leaves and fruit.",
  "Pepper,_bell___healthy": "This bell pepper plant is healthy and free of diseases.",
  "Potato___Early_blight": "Early blight causes dark spots and rings on potato leaves.",
  "Potato___Late_blight": "Late blight causes dark lesions leading to decay on potato leaves and tubers.",
  "Potato___healthy": "This potato plant is healthy and free of diseases.",
  "Raspberry___healthy": "This raspberry plant is healthy and free of diseases.",
  "Soybean___healthy": "This soybean plant is healthy and free of diseases.",
  "Squash___Powdery_mildew": "Powdery mildew causes white powdery spots on squash leaves.",
  "Strawberry___Leaf_scorch": "Leaf scorch causes brown edges and spots on strawberry leaves.",
  "Strawberry___healthy": "This strawberry plant is healthy and free of diseases.",
  "Tomato___Bacterial_spot": "Bacterial spot causes dark, water-soaked spots on tomato leaves and fruit.",
  "Tomato___Early_blight": "Early blight causes concentric rings on tomato leaves.",
  "Tomato___Late_blight": "Late blight causes dark lesions on tomato leaves and fruit, leading to decay.",
  "Tomato___Leaf_Mold": "Leaf mold causes yellow spots and fuzzy mold on tomato leaves.",
  "Tomato___Septoria_leaf_spot": "Septoria leaf spot causes small, round spots with gray centers on tomato leaves.",
  "Tomato___Spider_mites Two-spotted_spider_mite": "Spider mites cause stippling and webbing on tomato leaves.",
  "Tomato___Target_Spot": "Target spot causes dark spots with concentric rings on tomato leaves.",
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "Causes yellowing and curling of tomato leaves.",
  "Tomato___Tomato_mosaic_virus": "Causes mottled leaves and distorted fruit on tomato plants.",
  "Tomato___healthy": "This tomato plant is healthy and free of diseases."
};

/***** NEW: Small recommendations for ALL classes (short, actionable) *****/
const miniRecommendations = {
  "Apple___Apple_scab": [
    "Prune and remove infected leaves/fruit.",
    "Spray protectant fungicide (captan or mancozeb).",
    "Improve airflow; avoid overhead irrigation."
  ],
  "Apple___Black_rot": [
    "Remove mummified fruit and dead wood.",
    "Disinfect pruning tools between cuts.",
    "Use copper or captan sprays preventively."
  ],
  "Apple___Cedar_apple_rust": [
    "Remove nearby junipers/galls if possible.",
    "Apply myclobutanil/propiconazole at pink-bloom.",
    "Plant rust-resistant cultivars."
  ],
  "Apple___healthy": [
    "Water deeply but less often.",
    "Thin fruit and prune for airflow.",
    "Scout weekly for spots or insects."
  ],
  "Blueberry___healthy": [
    "Keep soil acidic (pH 4.5–5.5).",
    "Mulch 5–8 cm to conserve moisture.",
    "Avoid wetting foliage; drip is best."
  ],
  "Cherry_(including_sour)___Powdery_mildew": [
    "Remove infected leaves promptly.",
    "Use sulfur or neem oil early.",
    "Open canopy for better airflow."
  ],
  "Cherry_(including_sour)___healthy": [
    "Prune in dry weather.",
    "Water at root zone, not leaves.",
    "Net or monitor for birds/pests."
  ],
  "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": [
    "Rotate crops; manage residue.",
    "Use resistant hybrids when available.",
    "Apply triazole/strobilurin fungicide at VT–R1 if severe."
  ],
  "Corn_(maize)___Common_rust_": [
    "Choose resistant hybrids.",
    "Scout; treat at threshold with mixed-mode fungicide.",
    "Avoid excessive N that favors lush, susceptible growth."
  ],
  "Corn_(maize)___Northern_Leaf_Blight": [
    "Rotate and manage debris.",
    "Resistant hybrids reduce risk.",
    "Fungicide near tassel if disease climbs the canopy."
  ],
  "Corn_(maize)___healthy": [
    "Balanced fertilization and spacing.",
    "Weed control to reduce humidity.",
    "Scout weekly, especially VT–R2."
  ],
  "Grape___Black_rot": [
    "Remove mummies and infected shoots.",
    "Open canopy; train and thin leaves.",
    "Spray mancozeb/myclobutanil around bloom."
  ],
  "Grape___Esca_(Black_Measles)": [
    "Avoid trunk wounding; seal big cuts.",
    "Remove/replace heavily infected vines.",
    "Maintain vine vigor with balanced water and nutrients."
  ],
  "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": [
    "Remove spotted leaves.",
    "Use copper-based fungicides preventively.",
    "Improve airflow; avoid overhead watering."
  ],
  "Grape___healthy": [
    "Prune to keep an open canopy.",
    "Irrigate deeply and infrequently.",
    "Mulch to reduce splash and weeds."
  ],
  "Orange___Haunglongbing_(Citrus_greening)": [
    "Control psyllids with approved insecticides/oils.",
    "Remove infected trees to limit spread.",
    "Plant certified disease-free stock."
  ],
  "Peach___Bacterial_spot": [
    "Use resistant cultivars if possible.",
    "Copper sprays during leaf-out; avoid overhead watering.",
    "Sanitize tools; remove infected twigs."
  ],
  "Peach___healthy": [
    "Thin fruit to reduce stress.",
    "Mulch and maintain even soil moisture.",
    "Prune to an open-center shape."
  ],
  "Pepper,_bell___Bacterial_spot": [
    "Use clean seed and rotate fields.",
    "Remove infected plants early.",
    "Copper or copper+maneb sprays as label-directed."
  ],
  "Pepper,_bell___healthy": [
    "Keep soil moist but not soggy.",
    "Stake plants to improve airflow.",
    "Scout undersides for aphids and mites."
  ],
  "Potato___Early_blight": [
    "Rotate 2–3 years; remove debris.",
    "Start protectant fungicide (chlorothalonil/mancozeb) early.",
    "Avoid overhead irrigation; improve airflow."
  ],
  "Potato___Late_blight": [
    "Destroy volunteers and cull piles.",
    "Use protectants; shorten spray intervals in cool, wet weather.",
    "Space plants to dry quickly."
  ],
  "Potato___healthy": [
    "Hill soil to cover tubers from light.",
    "Water evenly; avoid drought–flood cycles.",
    "Scout after rains for leaf spots."
  ],
  "Raspberry___healthy": [
    "Prune out old canes after harvest.",
    "Mulch to keep roots cool and moist.",
    "Keep rows narrow for airflow."
  ],
  "Soybean___healthy": [
    "Rotate crops; choose adapted varieties.",
    "Inoculate seed if soil lacks rhizobia.",
    "Manage weeds early."
  ],
  "Squash___Powdery_mildew": [
    "Spray sulfur or potassium bicarbonate at first sign.",
    "Water at soil level; avoid leaf wetness.",
    "Remove heavily infected leaves."
  ],
  "Strawberry___Leaf_scorch": [
    "Remove infected leaves; clean beds.",
    "Avoid overhead irrigation; mulch to reduce splash.",
    "Improve spacing/airflow."
  ],
  "Strawberry___healthy": [
    "Mulch with straw; keep crowns dry.",
    "Fertilize lightly after harvest.",
    "Scout for slugs and mites."
  ],
  "Tomato___Bacterial_spot": [
    "Use certified seed/transplants; rotate 1–2 years.",
    "Avoid handling wet foliage; sanitize tools.",
    "Copper sprays can suppress spread."
  ],
  "Tomato___Early_blight": [
    "Prune lower leaves; stake or cage.",
    "Apply chlorothalonil/mancozeb preventively.",
    "Mulch soil to reduce splash."
  ],
  "Tomato___Late_blight": [
    "Remove infected plants immediately.",
    "Use copper or labeled fungicides at first sign.",
    "Avoid prolonged leaf wetness; increase spacing."
  ],
  "Tomato___Leaf_Mold": [
    "Increase ventilation; reduce humidity.",
    "Copper or biofungicides may help.",
    "Water early in day; avoid wet foliage."
  ],
  "Tomato___Septoria_leaf_spot": [
    "Remove spotted leaves promptly.",
    "Protectant fungicides (chlorothalonil/mancozeb).",
    "Mulch and bottom-water."
  ],
  "Tomato___Spider_mites Two-spotted_spider_mite": [
    "Spray undersides with water; use neem/soap.",
    "Keep plants well-watered to reduce stress.",
    "Encourage predators (lady beetles, predatory mites)."
  ],
  "Tomato___Target_Spot": [
    "Remove infected foliage.",
    "Avoid overhead irrigation.",
    "Use labeled fungicides (e.g., chlorothalonil)."
  ],
  "Tomato___Tomato_Yellow_Leaf_Curl_Virus": [
    "Control whiteflies; use yellow sticky traps.",
    "Remove infected plants; don’t compost.",
    "Plant resistant/tolerant varieties."
  ],
  "Tomato___Tomato_mosaic_virus": [
    "Wash hands; avoid tobacco before handling.",
    "Disinfect tools; sanitize stakes.",
    "Plant resistant cultivars; remove infected plants."
  ],
  "Tomato___healthy": [
    "Deep, consistent watering at the base.",
    "Stake and prune for airflow.",
    "Rotate beds yearly."
  ]
};

/***** HELPERS *****/
function formatDiseaseName(name) {
  let formatted = name.replace(": ", "___");
  formatted = formatted.replace(/\s+/g, "_");
  return formatted;
}

function mapToDiseaseKey(diseaseStr) {
  if (!diseaseStr) return null;
  const s = diseaseStr.toLowerCase();
  if (s.includes("healthy")) return "healthy";
  if ((s.includes("leaf") && s.includes("spot")) || s.includes("leaf_spot") || s.includes("leaf-spot")) return "leaf-spot";
  if (s.includes("powder") || s.includes("mildew")) return "powdery-mildew";
  if (s.includes("yellow") && s.includes("mosaic")) return "yellow-mosaic";
  if (s.includes("rust")) return "rust";
  for (const key of Object.keys(diseaseInfo)) {
    const keyPhrase = key.replace(/[-_]/g, " ");
    if (s.includes(keyPhrase)) return key;
  }
  return null;
}

/* Translate any text to Nepali when needed */
async function localizeDescription(text) {
  if (currentLang !== "np") return text;

  const prompt =
`Translate the following text into natural Nepali.
Return ONLY the translation text. No headings, no explanation, no quotes, no code fences.

TEXT:
${text}
`;
  try {
    const res = await fetch(`${CHATBOT_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await res.json();
    let out = (data?.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();

    // Keep only lines that contain Devanagari; join as one sentence.
    const lines = out.split("\n").map(s => s.trim()).filter(Boolean);
    const nepaliOnly = lines.filter(l => /\p{Script=Devanagari}/u.test(l));
    let cleaned = (nepaliOnly.length ? nepaliOnly : lines).join(" ");

    // Remove leading/trailing quotes/backticks just in case
    cleaned = cleaned.replace(/^["'`“”]+|["'`“”]+$/g, "").trim();

    return cleaned || text;
  } catch {
    return text; // fallback to English if translation fails
  }
}

/* Translate bullets to Nepali while keeping bullet structure */
async function localizeBullets(bullets) {
  if (currentLang !== "np") return bullets;

  const prompt =
`Translate the following list of bullet points into natural Nepali.
Return ONLY a valid JSON array of strings. No explanation, no headers, no code fences.

${JSON.stringify(bullets)}
`;
  try {
    const res = await fetch(`${CHATBOT_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const data = await res.json();
    let out = (data?.candidates?.[0]?.content?.parts?.[0]?.text || "").trim();

    // Try to extract a JSON array even if the model wrapped it in text
    const jsonSlice = out.match(/\[[\s\S]*\]/);
    if (jsonSlice) {
      const arr = JSON.parse(jsonSlice[0]);
      if (Array.isArray(arr) && arr.length) {
        return arr.map(s => String(s).trim()).slice(0, bullets.length);
      }
    }

    // Fallback: collect lines that look like bullets and are Nepali
    const lines = out
      .split("\n")
      .map(s => s.replace(/^\s*[-•\d.]+\s*/g, "").trim())
      .filter(Boolean);

    const nepali = lines.filter(l => /\p{Script=Devanagari}/u.test(l));
    if (nepali.length) return nepali.slice(0, bullets.length);

    // Last resort: return original English bullets
    return bullets;
  } catch {
    return bullets;
  }
}

/* Prompts used when opening chat */
function buildMedicinePrompt(disease) {
  if (currentLang === "np") {
    return `कृपया "${disease}" रोगका लागि औषधि/उपचार सिफारिस दिनुहोस्।
- सक्रिय तत्व र ब्रान्ड उदाहरण
- डोज/आवृत्ति र सुरक्षा सावधानी
- सम्भव भए जैविक/कम विषाक्त विकल्प
- नेपालमा सामान्यतया पाइने विकल्पहरू
संक्षेपमा नेपालीमा उत्तर दिनुहोस्।`;
  }
  return `Give medicine/treatment recommendations for "${disease}".
- Active ingredients and example brands
- Dosing/frequency and safety precautions
- Organic/low-toxicity alternatives if possible
- Options commonly available in Nepal
Reply briefly in English.`;
}

function buildCarePrompt() {
  if (currentLang === "np") {
    return `स्वस्थ बिरुवाको सामान्य हेरचाहका संक्षिप्त सुझाव दिनुहोस्:
- पानीको तालिका
- प्रकाश/घाम
- मल/माटो
- किराहरूको रोकथाम
कृपया नेपालीमा दिनुहोस्।`;
  }
  return `Provide brief general care tips for a healthy plant:
- Watering schedule
- Light/sunlight
- Fertilizer/soil
- Pest prevention
Reply concisely in English.`;
}

function openChatAndSend(promptText) {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.display = "flex";
  chatWindow.style.flexDirection = "column";
  sendChatbotMessage(promptText);
  const input = document.getElementById("userInput");
  if (input) input.focus();
}

/***** RECOMMENDATIONS PANEL (append under description, same font size) *****/
async function showRecommendations(resultEl, predictedDisease) {
  // clear any previous content
  resultEl.innerHTML = "";

  const descKey = formatDiseaseName(predictedDisease);

  // ---- Title ----
  const titleP = document.createElement("p");
  titleP.className = "result-title";
  titleP.innerHTML = `<strong>${messages[currentLang].detectLabel}</strong> ${predictedDisease}`;
  titleP.style.margin = "0 0 8px 0";
  resultEl.appendChild(titleP);

  // ---- Description with safe fallbacks ----
  let description = classDescriptions[descKey];
  if (!description) {
    const mappedKey = mapToDiseaseKey(predictedDisease);
    if (mappedKey && diseaseInfo[mappedKey]) {
      description = diseaseInfo[mappedKey].en?.description || "";
    }
  }

  if (description) {
    description = await localizeDescription(description);
    const descP = document.createElement("p");
    descP.className = "result-desc";
    descP.style.margin = "0 0 10px 0";
    descP.textContent = description;
    resultEl.appendChild(descP);
  }

  // ---- Small/bullet recommendations ----
  let bullets = miniRecommendations[descKey];
  if (!bullets) {
    const mappedKey = mapToDiseaseKey(predictedDisease);
    if (mappedKey && diseaseInfo[mappedKey]) {
      bullets = (diseaseInfo[mappedKey].en?.cures || []).slice(0, 3);
    } else {
      bullets = [
        "Remove heavily infected parts.",
        "Improve airflow and avoid wet foliage.",
        "Ask the chatbot for a targeted treatment."
      ];
    }
  }
  bullets = await localizeBullets(bullets);

  // Heading before bullets
  const isHealthy = /healthy/i.test(predictedDisease);
  const heading = document.createElement("h3");
  heading.className = "mini-heading";
  heading.textContent = isHealthy
    ? messages[currentLang].careTipsHeading
    : messages[currentLang].quickRecsHeading;
  heading.style.margin = "6px 0 6px 0";
  heading.style.fontWeight = "700";
  heading.style.fontSize = "1.05rem";
  resultEl.appendChild(heading);

  const ul = document.createElement("ul");
  ul.className = "mini-list";
  ul.style.margin = "0 0 12px 1.2rem";
  ul.style.padding = "0";
  bullets.forEach(txt => {
    const li = document.createElement("li");
    li.style.margin = "0 0 4px 0";
    li.textContent = txt;
    ul.appendChild(li);
  });
  resultEl.appendChild(ul);

  // ---- Ask row (centered buttons) ----
  renderAskButtons(resultEl, predictedDisease);
}


/***** ASK BUTTONS (compact: sentence close to buttons) *****/
function renderAskButtons(container, disease) {
  // Remove any existing ask block inside this container
  const existing = container.querySelector(".ask-wrap");
  if (existing) existing.remove();

  const isHealthy = mapToDiseaseKey(disease) === "healthy";
  const askText = isHealthy ? messages[currentLang].askCare : messages[currentLang].askMedicine;

  const askWrap = document.createElement("div");
  askWrap.className = "ask-wrap";

  const askP = document.createElement("p");
  askP.className = "ask-text";
  askP.textContent = askText;
  askWrap.appendChild(askP);

  const btnContainer = document.createElement("div");
  btnContainer.className = "ask-buttons";

  const yesBtn = document.createElement("button");
  yesBtn.textContent = messages[currentLang].yes;
  yesBtn.onclick = () => {
    const prompt = isHealthy ? buildCarePrompt() : buildMedicinePrompt(disease);
    openChatAndSend(prompt);
  };

  const noBtn = document.createElement("button");
  noBtn.textContent = messages[currentLang].no;
  noBtn.onclick = () => {
    const thank = document.createElement("p");
    thank.style.margin = "6px 0 0 0";
    thank.textContent = messages[currentLang].thanks;
    askWrap.appendChild(thank);
  };

  btnContainer.appendChild(yesBtn);
  btnContainer.appendChild(noBtn);
  askWrap.appendChild(btnContainer);

  container.appendChild(askWrap);
}


/***** SCAN MODAL *****/
function openScanModal() {
  const modal = document.getElementById("scanModal");
  const video = document.getElementById("videoStream");
  const captureBtn = document.getElementById("captureBtn");
  const result = document.getElementById("scanResult");

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Camera not supported on this device.");
    return;
  }

  navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "environment" } })
    .then((s) => {
      stream = s;
      video.srcObject = stream;
      modal.classList.add("active");
      result.innerHTML = "";
      result.classList.remove("active");
      captureBtn.disabled = false;
      video.play();
    })
    .catch((err) => {
      console.error("Error accessing camera:", err);
      const errorDiv = document.getElementById("scanError");
      errorDiv.textContent =
        currentLang === "np"
          ? "क्यामेरा पहुँच उपलब्ध भएन। अनुमति जाँच्नुहोस् वा अर्को डिभाइस प्रयास गर्नुहोस्।"
          : "Unable to access camera. Please check your permissions or try another device.";
      errorDiv.style.display = "block";
    });
}

function closeScanModal() {
  const modal = document.getElementById("scanModal");
  const video = document.getElementById("videoStream");
  const captureBtn = document.getElementById("captureBtn");
  const preview = document.getElementById("imagePreview");
  const result = document.getElementById("scanResult");

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  video.srcObject = null;
  captureBtn.disabled = true;
  modal.classList.remove("active");
  result.innerHTML = "";
  result.classList.remove("active");
  preview.innerHTML = "";
}

/***** CAPTURE FROM CAMERA *****/
function captureImage() {
  const video = document.getElementById("videoStream");
  const canvas = document.getElementById("scanCanvas");
  const preview = document.getElementById("imagePreview");
  const result = document.getElementById("scanResult");
  const captureBtn = document.getElementById("captureBtn");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  if (canvas.width < 300 || canvas.height < 300) {
    alert(
      currentLang === "np"
        ? "ठ्याक्कै पहिचानका लागि तस्वीर सानो छ। कृपया फेरि प्रयास गर्नुहोस्।"
        : "Image too small for accurate detection. Please try again."
    );
    captureBtn.disabled = false;
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  captureBtn.disabled = true;
  result.innerHTML = `<p class="loading"><i class="fas fa-spinner fa-spin"></i> ${messages[currentLang].analyzing}</p>`;
  result.classList.add("active");

  canvas.toBlob(
    async (blob) => {
      if (!blob) {
        alert(currentLang === "np" ? "तस्वीर क्याप्चर असफल भयो।" : "Failed to capture image.");
        captureBtn.disabled = false;
        return;
      }

      preview.innerHTML = "";
      const img = document.createElement("img");
      img.src = URL.createObjectURL(blob);
      img.alt = "Captured Plant Leaf";
      preview.appendChild(img);

      try {
        const formData = new FormData();
        formData.append("image", blob, "captured.jpg");

        const response = await fetch("/predict", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Network response was not ok.");
        const data = await response.json();

        result.innerHTML = "";
        if (data.error) {
          result.innerHTML = `<p class="error">${data.error}</p>`;
        } else {
          await showRecommendations(result, data.disease);

        }
      } catch (error) {
        console.error("Error:", error);
        result.innerHTML = `<p class="error">${messages[currentLang].analyzeFail}</p>`;
      } finally {
        captureBtn.disabled = false;
      }
    },
    "image/jpeg"
  );
}

/***** UPLOAD + PREDICT *****/
async function previewImage(event) {
  const file = event.target.files[0];
  if (!file) return;

  const preview = document.getElementById("imagePreview");
  preview.innerHTML = "";

  const img = document.createElement("img");
  img.src = URL.createObjectURL(file);
  img.onload = () => URL.revokeObjectURL(img.src);
  preview.appendChild(img);

  const formData = new FormData();
  formData.append("image", file);

  const result = document.createElement("div");
  result.className = "disease-result";
  preview.appendChild(result);
  result.textContent = messages[currentLang].analyzing;

  try {
    const response = await fetch("/predict", { method: "POST", body: formData });
    const data = await response.json();
    result.innerHTML = "";
    if (data.error) {
      result.textContent = data.error;
    } else {
      await showRecommendations(result, data.disease);

    }
  } catch (err) {
    console.error("Upload error:", err);
    result.textContent = messages[currentLang].analyzeFail;
  }
}

/***** CHAT (unchanged except using site language) *****/
function toggleChat() {
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.style.display = chatWindow.style.display === "flex" ? "none" : "flex";
  chatWindow.style.flexDirection = "column";
}

function switchSiteLanguage() {
  currentLang = document.getElementById("siteLanguage").value;
  updateSiteUI();
}

function updateChatUI() {
  const m = messages[currentLang];
  if (!m) return;
  const chatTitle = document.getElementById("chatTitle");
  if (chatTitle) chatTitle.textContent = m.chatTitle;
  const welcomeMsg = document.getElementById("welcomeMsg");
  if (welcomeMsg) welcomeMsg.textContent = m.welcome;
  const userInput = document.getElementById("userInput");
  if (userInput) userInput.placeholder = m.placeholder;
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) sendBtn.textContent = m.send;
}

async function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;
  const userText = input.value.trim();
  if (userText === "") return;

  const chatBody = document.getElementById("chatBody");
  if (!chatBody) return;

  const userMsg = document.createElement("p");
  userMsg.classList.add("user-msg");
  userMsg.textContent = userText;
  chatBody.appendChild(userMsg);
  scrollChatToBottom();

  input.value = "";

  const botMsg = document.createElement("p");
  botMsg.classList.add("bot-msg");
  botMsg.textContent = "...";
  chatBody.appendChild(botMsg);
  scrollChatToBottom();

  const prompt =
    currentLang === "np"
      ? "कृपया यस कुराकानीलाई नेपाली भाषामा उत्तर दिनुहोस्:\n" + userText
      : userText;

  try {
    const response = await fetch(`${CHATBOT_API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      (currentLang === "np"
        ? "म माफी चाहन्छु, म जवाफ दिन सकिनँ।"
        : "Sorry, I couldn't respond.");
    botMsg.textContent = reply;
    scrollChatToBottom();
  } catch (err) {
    botMsg.textContent =
      currentLang === "np"
        ? "म माफी चाहन्छु, म जवाफ दिन सकिनँ।"
        : "Sorry, I couldn't respond.";
    console.error(err);
  }
}

function sendChatbotMessage(message) {
  const input = document.getElementById("userInput");
  input.value = message;
  sendMessage();
}

function scrollChatToBottom() {
  const chatBody = document.getElementById("chatBody");
  if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
}

/***** MAPS & AUTH & ABOUT (unchanged) *****/
// Helper: quick check if a coordinate is inside Nepal's bbox
function isInNepal(lat, lon) {
  return lat >= 26.347 && lat <= 30.447 && lon >= 80.058 && lon <= 88.201;
}

// Open Google Maps centered on the user's location and search nearest vet/agrovet
function openNearestPlantMedicine() {
  if (!navigator.geolocation) {
    // No GPS available → generic search
    window.open("https://www.google.com/maps/search/agrovet+pesticide+shop+near+me", "_blank");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;

      // Nepal users usually search for “agrovet”; elsewhere use broader farm-supply terms
      const query = isInNepal(lat, lon)
        ? "shop agrovet near me"
        : "farm supply pesticide shop garden center";

      // Center the map on the user's coords and bias results nearby
      const url = `https://www.google.com/maps/search/${encodeURIComponent(query)}/@${lat},${lon},15z`;
      window.open(url, "_blank");
    },
    (err) => {
      console.warn("Geolocation error:", err);
      // Friendly localized message using your existing strings
      let msg =
        (messages[currentLang] && messages[currentLang].geolocationError) ||
        "Unable to detect your location. Showing results near Biratnagar, Nepal.";
      if (err.code === 1 && messages[currentLang]?.geolocationDenied) msg = messages[currentLang].geolocationDenied;
      if (err.code === 3 && messages[currentLang]?.geolocationTimeout) msg = messages[currentLang].geolocationTimeout;
      alert(msg);

      // Fallback to a city-based query in Nepal
      const fallbackUrl = "https://www.google.com/maps/search/agrovet+pesticide+shop+near+Biratnagar+Nepal";
      window.open(fallbackUrl, "_blank");
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}


function openAuthModal() {
  const modal = document.getElementById("authModal");
  const modalContent = document.querySelector(".auth-modal-content");
  if (modal && modalContent) {
    modal.style.display = "block";
    modal.classList.add("active");
    modalContent.classList.add("active");
  }
}

function closeAuthModal() {
  const modal = document.getElementById("authModal");
  const modalContent = document.querySelector(".auth-modal-content");
  if (modal && modalContent) {
    modal.style.display = "none";
    modal.classList.remove("active");
    modalContent.classList.remove("active");
  }
}

function showLogin() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginToggle = document.getElementById("loginToggle");
  const signupToggle = document.getElementById("signupToggle");

  if (loginForm && signupForm && loginToggle && signupToggle) {
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
    loginToggle.classList.add("active");
    signupToggle.classList.remove("active");
  }
}

function showSignup() {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const loginToggle = document.getElementById("loginToggle");
  const signupToggle = document.getElementById("signupToggle");

  if (loginForm && signupForm && loginToggle && signupToggle) {
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
    signupToggle.classList.add("active");
    loginToggle.classList.remove("active");
  }
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail");
  const password = document.getElementById("loginPassword");
  let hasError = false;

  if (!email.value.trim()) {
    email.classList.add("error");
    hasError = true;
    setTimeout(() => email.classList.remove("error"), 400);
  }
  if (!password.value.trim()) {
    password.classList.add("error");
    hasError = true;
    setTimeout(() => password.classList.remove("error"), 400);
  }

  if (!hasError) {
    alert(
      (currentLang === "np" ? "लग-इन हुँदै :\nइमेल: " : "Logging in with:\nEmail: ") +
        email.value.trim()
    );
    closeAuthModal();
  }
}

function handleSignup(e) {
  e.preventDefault();
  const name = document.getElementById("signupName");
  const email = document.getElementById("signupEmail");
  const password = document.getElementById("signupPassword");
  let hasError = false;

  if (!name.value.trim()) {
    name.classList.add("error");
    hasError = true;
    setTimeout(() => name.classList.remove("error"), 400);
  }
  if (!email.value.trim()) {
    email.classList.add("error");
    hasError = true;
    setTimeout(() => email.classList.remove("error"), 400);
  }
  if (!password.value.trim()) {
    password.classList.add("error");
    hasError = true;
    setTimeout(() => password.classList.remove("error"), 400);
  }

  if (!hasError) {
    alert(
      (currentLang === "np" ? "दर्ता हुँदै :\nनाम: " : "Signing up with:\nName: ") +
        name.value.trim() +
        (currentLang === "np" ? "\nइमेल: " : "\nEmail: ") +
        email.value.trim()
    );
    closeAuthModal();
  }
}

function handleContactForm(e) {
  e.preventDefault();
  alert(
    currentLang === "np"
      ? "हामीलाई सम्पर्क गर्नुभएकोमा धन्यवाद! चाँडै सम्पर्क गर्नेछौं।"
      : "Thank you for contacting us! We'll get back to you soon."
  );
}

/***** DISEASE MODAL (sample cards) *****/
function showDiseaseInfo(key) {
  const modal = document.getElementById("diseaseModal");
  const titleEl = document.getElementById("diseaseTitle");
  const descEl = document.getElementById("diseaseDescription");
  const curesEl = document.getElementById("cureMeasures");
  const info = diseaseInfo[key] && (diseaseInfo[key][currentLang] || diseaseInfo[key].en);

  if (!info) return;

  titleEl.textContent = info.title;
  descEl.textContent = info.description;
  curesEl.innerHTML = "";
  (info.cures || []).forEach((c) => {
    const li = document.createElement("li");
    li.textContent = c;
    curesEl.appendChild(li);
  });

  document.getElementById("cureMeasuresTitle").textContent =
    messages[currentLang].cureMeasuresTitle;

  modal.style.display = "block";
  modal.classList.add("active");
}

function closeDiseaseModal() {
  const modal = document.getElementById("diseaseModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("active");
  }
}

/***** DARK MODE *****/
function toggleDarkMode() {
  const toggleInput = document.querySelector(".dark-toggle input");
  if (!toggleInput) return;
  if (toggleInput.checked) {
    document.body.classList.add("dark");
    localStorage.setItem("darkMode", "enabled");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("darkMode", "disabled");
  }
}

/***** I18N UI *****/
function updateSiteUI() {
  const m = messages[currentLang];
  if (!m) return;

  // navbar
  const navAbout = document.getElementById("navAbout");
  if (navAbout) navAbout.textContent = m.navAbout;
  const navContact = document.getElementById("navContact");
  if (navContact) navContact.textContent = m.navContact;
  const loginSignupBtn = document.getElementById("loginSignupBtn");
  if (loginSignupBtn) loginSignupBtn.textContent = m.loginSignup;

  // hero
  const heroTitle = document.getElementById("heroTitle");
  if (heroTitle) heroTitle.innerHTML = m.heroTitle;
  const heroSubtitle = document.getElementById("heroSubtitle");
  if (heroSubtitle) heroSubtitle.innerHTML = m.heroSubtitle;
  const scanBtnText = document.getElementById("scanBtnText");
  if (scanBtnText) scanBtnText.textContent = m.scanBtn;
  const uploadBtnText = document.getElementById("uploadBtnText");
  if (uploadBtnText) uploadBtnText.textContent = m.uploadBtn;

  // scan modal
  const scanModalTitle = document.getElementById("scanModalTitle");
  if (scanModalTitle) scanModalTitle.textContent = m.scanModalTitle;
  const captureBtn = document.getElementById("captureBtn");
  if (captureBtn) captureBtn.textContent = m.capture;
  const retakeBtn = document.getElementById("retakeBtn");
  if (retakeBtn) retakeBtn.textContent = m.retake;
  const cancelBtn = document.getElementById("cancelBtn");
  if (cancelBtn) cancelBtn.textContent = m.cancel;
  const cureMeasuresTitle = document.getElementById("cureMeasuresTitle");
  if (cureMeasuresTitle) cureMeasuresTitle.textContent = m.cureMeasuresTitle;

  // features
  const feature3Title = document.getElementById("feature3Title");
  if (feature3Title) feature3Title.textContent = m.feature3Title;
  const feature3Text = document.getElementById("feature3Text");
  if (feature3Text) feature3Text.textContent = m.feature3Text;

  // samples
  const sampleTitle = document.getElementById("sampleTitle");
  if (sampleTitle) sampleTitle.textContent = m.sampleTitle;
  const s1 = document.getElementById("sampleLeafSpot");
  if (s1) s1.textContent = m.sampleLeafSpot;
  const s2 = document.getElementById("samplePowderyMildew");
  if (s2) s2.textContent = m.samplePowderyMildew;
  const s3 = document.getElementById("sampleYellowMosaic");
  if (s3) s3.textContent = m.sampleYellowMosaic;
  const s4 = document.getElementById("sampleRust");
  if (s4) s4.textContent = m.sampleRust;

  // about
  const aboutTitle = document.getElementById("aboutTitle");
  if (aboutTitle) aboutTitle.innerHTML = m.aboutTitle;
  const aboutPara1 = document.getElementById("aboutPara1");
  if (aboutPara1) aboutPara1.innerHTML = m.aboutPara1;
  const aboutPara2 = document.getElementById("aboutPara2");
  if (aboutPara2) aboutPara2.innerHTML = m.aboutPara2;
  const aboutPara3 = document.getElementById("aboutPara3");
  if (aboutPara3) aboutPara3.innerHTML = m.aboutPara3;

  // contact
  const contactTitle = document.getElementById("contactTitle");
  if (contactTitle) contactTitle.textContent = m.contactTitle;
  const getInTouch = document.getElementById("getInTouch");
  if (getInTouch) getInTouch.textContent = m.getInTouch;
  const contactName = document.getElementById("contactName");
  if (contactName) contactName.placeholder = m.contactName;
  const contactEmail = document.getElementById("contactEmail");
  if (contactEmail) contactEmail.placeholder = m.contactEmail;
  const contactMessage = document.getElementById("contactMessage");
  if (contactMessage) contactMessage.placeholder = m.contactMessage;
  const contactSendBtn = document.getElementById("contactSendBtn");
  if (contactSendBtn) contactSendBtn.textContent = m.contactSendBtn;

  // auth
  const loginToggle = document.getElementById("loginToggle");
  if (loginToggle) loginToggle.textContent = m.login;
  const signupToggle = document.getElementById("signupToggle");
  if (signupToggle) signupToggle.textContent = m.signup;
  const loginTitle = document.getElementById("loginTitle");
  if (loginTitle) loginTitle.textContent = m.login;
  const loginEmail = document.getElementById("loginEmail");
  if (loginEmail) loginEmail.placeholder = m.email;
  const loginPassword = document.getElementById("loginPassword");
  if (loginPassword) loginPassword.placeholder = m.password;
  const loginSubmitBtn = document.getElementById("loginSubmitBtn");
  if (loginSubmitBtn) loginSubmitBtn.textContent = m.login;
  const signupTitle = document.getElementById("signupTitle");
  if (signupTitle) signupTitle.textContent = m.signup;
  const signupName = document.getElementById("signupName");
  if (signupName) signupName.placeholder = m.fullName;
  const signupEmail = document.getElementById("signupEmail");
  if (signupEmail) signupEmail.placeholder = m.email;
  const signupPassword = document.getElementById("signupPassword");
  if (signupPassword) signupPassword.placeholder = m.password;
  const signupSubmitBtn = document.getElementById("signupSubmitBtn");
  if (signupSubmitBtn) signupSubmitBtn.textContent = m.signup;

  // chat
  updateChatUI();
}

/***** PAGE INIT *****/
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-menu a");
  const navbar = document.querySelector(".navbar");

  // smooth scroll
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // navbar behavior
  let lastScrollTop = 0;
  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const fromTop = scrollTop + 100;

    navLinks.forEach((link) => {
      const section = document.getElementById(link.getAttribute("href").substring(1));
      if (section && section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    if (navbar) navbar.style.top = scrollTop > lastScrollTop ? "-80px" : "0";
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // dark mode restore
  const toggleInput = document.querySelector(".dark-toggle input");
  if (toggleInput) {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      document.body.classList.add("dark");
      toggleInput.checked = true;
    }
    toggleInput.addEventListener("change", () => toggleDarkMode());
  }

  // feature → maps
  const nearbyFeature = document.querySelector('[data-feature="nearby-assistance"]');
  if (nearbyFeature) {
    nearbyFeature.style.cursor = "pointer";
    nearbyFeature.addEventListener("click", openNearestPlantMedicine);
  }

  // upload preview
  const uploadInput = document.getElementById("uploadInput");
  if (uploadInput) uploadInput.addEventListener("change", previewImage);

  // initial UI
  updateSiteUI();

  // close modals by clicking outside
  window.onclick = function (event) {
    const authModal = document.getElementById("authModal");
    const diseaseModal = document.getElementById("diseaseModal");
    const scanModal = document.getElementById("scanModal");
    const modalContent = document.querySelector(".auth-modal-content");
    if (event.target === authModal && authModal && modalContent) {
      authModal.style.display = "none";
      authModal.classList.remove("active");
      modalContent.classList.remove("active");
    }
    if (event.target === diseaseModal && diseaseModal) closeDiseaseModal();
    if (event.target === scanModal && scanModal) closeScanModal();
  };
});