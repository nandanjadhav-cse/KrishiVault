import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const localesDir = path.join(__dirname, 'locales');

// Base English resource
const enBase = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));

// High quality localized brand and primary terms for scheduled languages
const languageProfiles = {
  bn: {
    name: 'বাংলা',
    brandName: 'কৃষি ভল্ট',
    tagline: 'স্মার্ট গুদামজাতকরণ, শক্তিশালী কৃষক।',
    home: 'হোম',
    warehouses: 'গুদাম খুঁজুন',
    marketplace: 'দলগত বুকিং',
    calculator: 'সঞ্চয় ক্যালকুলেটর',
    farmerDashboard: 'কৃষক পোর্টাল',
    ownerDashboard: 'মালিক পোর্টাল',
    login: 'লগ ইন',
    register: 'নিবন্ধন',
    searchBtn: 'গুদাম খুঁজুন'
  },
  gu: {
    name: 'ગુજરાતી',
    brandName: 'કૃષિ વૉલ્ટ',
    tagline: 'સ્માર્ટ સંગ્રહ, સક્ષમ ખેડૂત.',
    home: 'મુખ્ય પૃષ્ઠ',
    warehouses: 'ગોદામ શોધો',
    marketplace: 'જૂથ બુકિંગ',
    calculator: 'બચત કેલ્ક્યુલેટર',
    farmerDashboard: 'ખેડૂત પોર્ટલ',
    ownerDashboard: 'ગોદામ માલિક પોર્ટલ',
    login: 'લૉગ ઇન',
    register: 'નોંધણી',
    searchBtn: 'ગોદામ શોધો'
  },
  pa: {
    name: 'ਪੰਜਾਬੀ',
    brandName: 'ਕ੍ਰਿਸ਼ੀ ਵਾਲਟ',
    tagline: 'ਸਮਾਰਟ ਸਟੋਰੇਜ, ਮਜ਼ਬੂਤ ਕਿਸਾਨ।',
    home: 'ਮੁੱਖ ਸਫ਼ਾ',
    warehouses: 'ਗੋਦਾਮ ਲੱਭੋ',
    marketplace: 'ਸਮੂਹ ਬੁਕਿੰਗ',
    calculator: 'ਬੱਚਤ ਕੈਲਕੁਲੇਟਰ',
    farmerDashboard: 'ਕਿਸਾਨ ਪੋਰਟਲ',
    ownerDashboard: 'ਗੋਦਾਮ ਮਾਲਕ ਪੋਰਟਲ',
    login: 'ਲਾਗ ਇਨ',
    register: 'ਰਜਿਸਟਰ',
    searchBtn: 'ਭੰਡਾਰ ਲੱਭੋ'
  },
  ta: {
    name: 'தமிழ்',
    brandName: 'கிருஷி வால்ட்',
    tagline: 'புத்திசாலி சேமிப்பு, வலுவான விவசாயிகள்.',
    home: 'முகப்பு',
    warehouses: 'கிடங்குகளைத் தேடுங்கள்',
    marketplace: 'குழு முன்பதிவு',
    calculator: 'சேமிப்புக் கால்குலேட்டர்',
    farmerDashboard: 'விவசாயி தளம்',
    ownerDashboard: 'கிடங்கு உரிமையாளர் தளம்',
    login: 'உள்நுழைக',
    register: 'பதிவு செய்க',
    searchBtn: 'கிடங்கு தேடு'
  },
  te: {
    name: 'తెలుగు',
    brandName: 'కృషి వాల్ట్',
    tagline: 'స్మార్ట్ నిల్వ, బలమైన రైతులు.',
    home: 'హోమ్',
    warehouses: 'గిడ్డంగులను కనుగొనండి',
    marketplace: 'సమూహ బుకింగ్',
    calculator: 'పొదుపు కాలిక్యులేటర్',
    farmerDashboard: 'రైతు పోర్టల్',
    ownerDashboard: 'యజమాని పోర్టల్',
    login: 'లాగిన్',
    register: 'నమోదు చేసుకోండి',
    searchBtn: 'నిల్వను కనుగొనండి'
  },
  kn: {
    name: 'ಕನ್ನಡ',
    brandName: 'ಕೃಷಿ ವಾಲ್ಟ್',
    tagline: 'ಸ್ಮಾರ್ಟ್ ಸಂಗ್ರಹಣೆ, ಸಶಕ್ತ ರೈತರು.',
    home: 'ಮುಖಪುಟ',
    warehouses: 'ಗೋದಾಮುಗಳನ್ನು ಹುಡುಕಿ',
    marketplace: 'ಗುಂಪು ಬುಕಿಂಗ್',
    calculator: 'ಉಳಿತಾಯ ಕ್ಯಾಲ್ಕುಲೇಟರ್',
    farmerDashboard: 'ರೈತ ಪೋರ್ಟಲ್',
    ownerDashboard: 'ಮಾಲೀಕರ ಪೋರ್ಟಲ್',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    searchBtn: 'ಗೋದಾಮು ಹುಡುಕಿ'
  },
  ml: {
    name: 'മലയാളം',
    brandName: 'കൃഷി വോൾട്ട്',
    tagline: 'സ്മാർട്ട് സംഭരണം, ശക്തരായ കർഷകർ.',
    home: 'ഹോം',
    warehouses: 'വെയർഹൗസുകൾ കണ്ടെത്തുക',
    marketplace: 'ഗ്രൂപ്പ് ബുക്കിംഗ്',
    calculator: 'സേവിംഗ്സ് കാൽക്കുലേറ്റർ',
    farmerDashboard: 'കർഷക പോർട്ടൽ',
    ownerDashboard: 'ഉടമ പോർട്ടൽ',
    login: 'ലോഗിൻ',
    register: 'രജിസ്റ്റർ ചെയ്യുക',
    searchBtn: 'സംഭരണം കണ്ടെത്തുക'
  },
  or: {
    name: 'ଓଡ଼ିଆ',
    brandName: 'କୃଷି ଭଲ୍ଟ',
    tagline: 'ସ୍ମାର୍ଟ ସଂରକ୍ଷଣ, ସଶକ୍ତ କୃଷକ।',
    home: 'ମୂଳ ପୃଷ୍ଠା',
    warehouses: 'ଗୋଦାମ ଖୋଜନ୍ତୁ',
    marketplace: 'ଗୋଷ୍ଠୀ ବୁକିଂ',
    calculator: 'ସଞ୍ଚୟ କାଲକୁଲେଟର',
    farmerDashboard: 'କୃଷକ ପୋର୍ଟାଲ',
    ownerDashboard: 'ମାଲିକ ପୋର୍ଟାଲ',
    login: 'ଲଗ୍ ଇନ୍',
    register: 'ପଞ୍ଜୀକରଣ',
    searchBtn: 'ଗୋଦାମ ଖୋଜନ୍ତୁ'
  },
  as: {
    name: 'অসমীয়া',
    brandName: 'কৃষি ভল্ট',
    tagline: 'স্মাৰ্ট সংৰক্ষণ, শক্তিশালী কৃষক।',
    home: 'মুখ্য পৃষ্ঠা',
    warehouses: 'গুদাম সন্ধান কৰক',
    marketplace: 'দলীয় বুকিং',
    calculator: 'সঞ্চয় কেলকুলেটৰ',
    farmerDashboard: 'কৃষক পৰ্টেল',
    ownerDashboard: 'মালিক পৰ্টেল',
    login: 'লগ ইন',
    register: 'পঞ্জীয়ন',
    searchBtn: 'গুদাম সন্ধান'
  },
  ur: {
    name: 'اردو',
    brandName: 'کرشی والٹ',
    tagline: 'بہتر ذخیرہ اندوزی، خود مختار کسان۔',
    home: 'صفحۂ اول',
    warehouses: 'گودام تلاش کریں',
    marketplace: 'گروپ بکنگ',
    calculator: 'بچت کیلکولیٹر',
    farmerDashboard: 'کسان پورٹل',
    ownerDashboard: 'مالک پورٹل',
    login: 'لاگ ان',
    register: 'رجسٹریشن',
    searchBtn: 'گودام تلاش کریں'
  },
  sa: {
    name: 'संस्कृतम्',
    brandName: 'कृषिवॉल्टः',
    tagline: 'कुशलसञ्चयः, सशक्तकृषकः।',
    home: 'मुख्यपृष्ठम्',
    warehouses: 'धान्यागारम् अन्विष्यतु',
    marketplace: 'सामूहिकारक्षणम्',
    calculator: 'सञ्चयगणकम्',
    farmerDashboard: 'कृषकद्वारम्',
    ownerDashboard: 'स्वामिद्वारम्',
    login: 'प्रवेशः',
    register: 'पञ्जीकरणम्',
    searchBtn: 'अन्वेषणम्'
  },
  ne: {
    name: 'नेपाली',
    brandName: 'कृषि भल्ट',
    tagline: 'स्मार्ट भण्डारण, बलियो किसान।',
    home: 'गृहपृष्ठ',
    warehouses: 'गोदाम खोज्नुहोस्',
    marketplace: 'सामूहिक बुकिङ',
    calculator: 'बचत क्याल्कुलेटर',
    farmerDashboard: 'किसान पोर्टल',
    ownerDashboard: 'गोदाम मालिक पोर्टल',
    login: 'लगइन',
    register: 'दर्ता',
    searchBtn: 'गोदाम खोज्नुहोस्'
  },
  gom: {
    name: 'कोंकणी',
    brandName: 'कृषि व्हॉल्ट',
    tagline: 'हुशार सांठवणूक, बळिश्ट शेतकरी.',
    home: 'मुखेल पान',
    warehouses: 'गोदाम सोदात',
    marketplace: 'पंगड बुकींग',
    calculator: 'बचत कॅल्क्युलेटर',
    farmerDashboard: 'शेतकामती पोर्टल',
    ownerDashboard: 'धनी पोर्टल',
    login: 'लॉग इन',
    register: 'नोंदणी',
    searchBtn: 'सोदात'
  },
  mai: {
    name: 'मैथिली',
    brandName: 'कृषि वॉल्ट',
    tagline: 'उत्तम भंडारण, सशक्त किसान।',
    home: 'मुख्य पृष्ठ',
    warehouses: 'गोदाम खोजू',
    marketplace: 'समूह बुकिंग',
    calculator: 'बचत कैलकुलेटर',
    farmerDashboard: 'किसान पोर्टल',
    ownerDashboard: 'मालिक पोर्टल',
    login: 'लॉगिन',
    register: 'पंजीकरण',
    searchBtn: 'गोदाम खोजू'
  },
  doi: {
    name: 'डोगरी',
    brandName: 'कृषि वाल्ट',
    tagline: 'सयानी सांभ, तकड़े किसान।',
    home: 'मुक्ख पन्ना',
    warehouses: 'गोदाम लब्भो',
    marketplace: 'टोली बुकिंग',
    calculator: 'बचत कैल्कुलेटर',
    farmerDashboard: 'किसान पोर्टल',
    ownerDashboard: 'मालिक पोर्टल',
    login: 'लागिन',
    register: 'रजिस्टर',
    searchBtn: 'गोदाम लब्भो'
  },
  brx: {
    name: 'बड़ो',
    brandName: 'ख्रिसि भल्ट',
    tagline: 'मोजां दोनथुमनाय, गोख्रों आबादारी।',
    home: 'गाहाय बिखा',
    warehouses: 'बाखार नागिर',
    marketplace: 'हानजा बुकिं',
    calculator: 'खरसा साननाय',
    farmerDashboard: 'आबादारी पोर्टल',
    ownerDashboard: 'मालिक पोर्टल',
    login: 'हाबनाय',
    register: 'रेजिस्टार',
    searchBtn: 'नागिर'
  },
  ks: {
    name: 'کٲشُر / कॉशुर',
    brandName: 'کرشی والٹ',
    tagline: 'جان گودام، جان زمیندار۔',
    home: 'اہم صفحہ',
    warehouses: 'گودام ژھانڈیو',
    marketplace: 'جماتی بکنٛگ',
    calculator: 'بچت کیلکولیٹر',
    farmerDashboard: 'زمیندار پورٹل',
    ownerDashboard: 'مالک پورٹل',
    login: 'اندر گژھیو',
    register: 'نوم درج کریو',
    searchBtn: 'ژھانڈیو'
  },
  mni: {
    name: 'মৈতৈলোন্',
    brandName: 'কৃষি ভোল্ট',
    tagline: 'ফবা থমফম, কনবা লৌমী।',
    home: 'হৌম',
    warehouses: 'গোডাউন থিবা',
    marketplace: 'লুপ বুকিং',
    calculator: 'কনবা কেলকুলেটর',
    farmerDashboard: 'লৌমী পোর্টেল',
    ownerDashboard: 'মপু পোর্টেল',
    login: 'চংবা',
    register: 'মিং চনবা',
    searchBtn: 'থিবা'
  },
  sat: {
    name: 'संताली',
    brandName: 'ᱠᱨᱤᱥᱤ ᱵᱷᱚᱞᱴ',
    tagline: 'ᱵᱷᱟᱹᱜᱤ ᱫᱚᱦᱚ, ᱠᱮᱴᱮᱡ ᱪᱟᱥᱤ।',
    home: 'ᱢᱩᱬᱩᱛ ᱥᱟᱦᱴᱟ',
    warehouses: 'ᱵᱟᱠᱷᱟᱨ ᱯᱟᱱᱛᱮ',
    marketplace: 'ᱜᱟᱫᱮᱞ ᱵᱩᱠᱤᱝ',
    calculator: 'ᱵᱟᱧᱪᱟᱣ ᱞᱮᱠᱷᱟ',
    farmerDashboard: 'ᱪᱟᱥᱤ ᱯᱳᱨᱴᱟᱞ',
    ownerDashboard: 'ᱢᱟᱹᱞᱤᱠ ᱯᱳᱨᱴᱟᱞ',
    login: 'ᱵᱚᱞᱚᱱ',
    register: 'ᱧᱩᱛᱩᱢ ᱚᱞ',
    searchBtn: 'ᱯᱟᱱᱛᱮ'
  },
  sd: {
    name: 'سنڌي',
    brandName: 'ڪرشي والٽ',
    tagline: 'سمارٽ اسٽوريج، سگھارا هاري.',
    home: 'مک صفحو',
    warehouses: 'گودام ڳوليو',
    marketplace: 'گڏيل بڪنگ',
    calculator: 'بچت ڪيلڪيوليٽر',
    farmerDashboard: 'هاري پورٽل',
    ownerDashboard: 'مالڪ پورٽل',
    login: 'لاگ ان',
    register: 'رجسٽريشن',
    searchBtn: 'ڳوليو'
  }
};

for (const [code, meta] of Object.entries(languageProfiles)) {
  const cloned = JSON.parse(JSON.stringify(enBase));
  cloned._metadata = {
    code,
    languageName: meta.name,
    status: 'draft_academic_prototype',
    reviewChecklistUrl: '/help#languages',
    notice: `Draft review translation for ${meta.name} (Eighth Schedule Language of India). Verified core UI terminology with English fallbacks for specialized agronomic metadata.`
  };

  cloned.brand.name = meta.brandName;
  cloned.brand.tagline = meta.tagline;
  cloned.nav.home = meta.home;
  cloned.nav.warehouses = meta.warehouses;
  cloned.nav.marketplace = meta.marketplace;
  cloned.nav.calculator = meta.calculator;
  cloned.nav.farmerDashboard = meta.farmerDashboard;
  cloned.nav.ownerDashboard = meta.ownerDashboard;
  cloned.nav.login = meta.login;
  cloned.nav.register = meta.register;
  cloned.hero.searchBtn = meta.searchBtn;
  cloned.hero.primaryCta = meta.warehouses;
  cloned.hero.secondaryCta = meta.ownerDashboard;

  fs.writeFileSync(path.join(localesDir, `${code}.json`), JSON.stringify(cloned, null, 2), 'utf8');
}

console.log(`Generated all 20 draft locale files successfully in ${localesDir}!`);
