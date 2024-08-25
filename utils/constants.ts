import { Inter, Noto_Sans_Osage } from "next/font/google";
import { signOut } from "firebase/auth";
import { auth, db } from "@/db/firebaseConfig";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { destroyCookie } from "./createCookie";

export const countryLists = [
    "ZA", // South Africa (Afrikaans)
    "AL", // Albania (Albanian)
    "ET", // Ethiopia (Amharic)
    "SA", // Saudi Arabia (Arabic)
    "AM", // Armenia (Armenian)
    "AZ", // Azerbaijan (Azerbaijani)
    "RU", // Russia (Bashkir)
    "ES", // Spain (Basque)
    "BY", // Belarus (Belarusian)
    "BD", // Bangladesh (Bengali)
    "BA", // Bosnia and Herzegovina (Bosnian)
    "BG", // Bulgaria (Bulgarian)
    "MM", // Myanmar (Burmese)
    "ES", // Spain (Catalan)
    "PH", // Philippines (Cebuano)
    "CN", // China (Chinese)
    "RU", // Russia (Chuvash)
    "HR", // Croatia (Croatian)
    "CZ", // Czech Republic (Czech)
    "DK", // Denmark (Danish)
    "NL", // Netherlands (Dutch)
    "US", // United States (English)
    "FR", // France (Esperanto - International but listed under France)
    "EE", // Estonia (Estonian)
    "FI", // Finland (Finnish)
    "FR", // France (French)
    "ES", // Spain (Galician)
    "GE", // Georgia (Georgian)
    "DE", // Germany (German)
    "GR", // Greece (Greek)
    "IN", // India (Gujarati)
    "HT", // Haiti (Haitian)
    "IL", // Israel (Hebrew)
    "RU", // Russia (Hill Mari)
    "IN", // India (Hindi)
    "HU", // Hungary (Hungarian)
    "IS", // Iceland (Icelandic)
    "ID", // Indonesia (Indonesian)
    "IE", // Ireland (Irish)
    "IT", // Italy (Italian)
    "JP", // Japan (Japanese)
    "ID", // Indonesia (Javanese)
    "IN", // India (Kannada)
    "KZ", // Kazakhstan (Kazakh)
    "KZ", // Kazakhstan (Kazakh - Latin)
    "KH", // Cambodia (Khmer)
    "KR", // South Korea (Korean)
    "KG", // Kyrgyzstan (Kyrgyz)
    "LA", // Laos (Lao)
    "VA", // Vatican (Latin)
    "LV", // Latvia (Latvian)
    "LT", // Lithuania (Lithuanian)
    "LU", // Luxembourg (Luxembourgish)
    "MK", // North Macedonia (Macedonian)
    "MG", // Madagascar (Malagasy)
    "MY", // Malaysia (Malay)
    "IN", // India (Malayalam)
    "MT", // Malta (Maltese)
    "NZ", // New Zealand (Maori)
    "IN", // India (Marathi)
    "RU", // Russia (Mari)
    "MN", // Mongolia (Mongolian)
    "NP", // Nepal (Nepali)
    "NO", // Norway (Norwegian)
    "CW", // Curaçao (Papiamento)
    "IR", // Iran (Persian)
    "PL", // Poland (Polish)
    "PT", // Portugal (Portuguese)
    "BR", // Brazil (Portuguese - Brazilian)
    "IN", // India (Punjabi)
    "RO", // Romania (Romanian)
    "RU", // Russia (Russian)
    "GB", // United Kingdom (Scottish Gaelic)
    "RS", // Serbia (Serbian)
    "RS", // Serbia (Serbian - Latin)
    "LK", // Sri Lanka (Sinhalese)
    "SK", // Slovakia (Slovak)
    "SI", // Slovenia (Slovenian)
    "ES", // Spain (Spanish)
    "ID", // Indonesia (Sundanese)
    "KE", // Kenya (Swahili)
    "SE", // Sweden (Swedish)
    "PH", // Philippines (Tagalog)
    "TJ", // Tajikistan (Tajik)
    "IN", // India (Tamil)
    "RU", // Russia (Tatar)
    "IN", // India (Telugu)
    "TH", // Thailand (Thai)
    "TR", // Turkey (Turkish)
    "UA", // Ukraine (Ukrainian)
    "PK", // Pakistan (Urdu)
    "VN", // Vietnam (Vietnamese)
    "GB", // United Kingdom (Welsh)
    "ZA", // South Africa (Xhosa)
    "UA", // Ukraine (Yiddish)
    "ZA"  // South Africa (Zulu)
];
export const languageList  = [
    { code: "af", name: "Afrikaans", country: "South Africa" },
    { code: "sq", name: "Albanian", country: "Albania" },
    { code: "am", name: "Amharic", country: "Ethiopia" },
    { code: "ar", name: "Arabic", country: "Saudi Arabia" },
    { code: "hy", name: "Armenian", country: "Armenia" },
    { code: "az", name: "Azerbaijani", country: "Azerbaijan" },
    { code: "ba", name: "Bashkir", country: "Russia" },
    { code: "eu", name: "Basque", country: "Spain" },
    { code: "be", name: "Belarusian", country: "Belarus" },
    { code: "bn", name: "Bengali", country: "Bangladesh" },
    { code: "bs", name: "Bosnian", country: "Bosnia and Herzegovina" },
    { code: "bg", name: "Bulgarian", country: "Bulgaria" },
    { code: "ca", name: "Catalan", country: "Spain" },
    { code: "ceb", name: "Cebuano", country: "Philippines" },
    { code: "zh", name: "Chinese", country: "China" },
    { code: "cv", name: "Chuvash", country: "Russia" },
    { code: "hr", name: "Croatian", country: "Croatia" },
    { code: "cs", name: "Czech", country: "Czech Republic" },
    { code: "da", name: "Danish", country: "Denmark" },
    { code: "nl", name: "Dutch", country: "Netherlands" },
    { code: "en", name: "English", country: "United States" },
    { code: "et", name: "Estonian", country: "Estonia" },
    { code: "fi", name: "Finnish", country: "Finland" },
    { code: "fr", name: "French", country: "France" },
    { code: "gl", name: "Galician", country: "Spain" },
    { code: "ka", name: "Georgian", country: "Georgia" },
    { code: "de", name: "German", country: "Germany" },
    { code: "el", name: "Greek", country: "Greece" },
    { code: "gu", name: "Gujarati", country: "India" },
    { code: "ht", name: "Haitian", country: "Haiti" },
    { code: "he", name: "Hebrew", country: "Israel" },
    { code: "mrj", name: "Hill Mari", country: "Russia" },
    { code: "hi", name: "Hindi", country: "India" },
    { code: "hu", name: "Hungarian", country: "Hungary" },
    { code: "is", name: "Icelandic", country: "Iceland" },
    { code: "id", name: "Indonesian", country: "Indonesia" },
    { code: "ga", name: "Irish", country: "Ireland" },
    { code: "it", name: "Italian", country: "Italy" },
    { code: "ja", name: "Japanese", country: "Japan" },
    { code: "jv", name: "Javanese", country: "Indonesia" },
    { code: "kn", name: "Kannada", country: "India" },
    { code: "kk", name: "Kazakh", country: "Kazakhstan" },
    { code: "km", name: "Khmer", country: "Cambodia" },
    { code: "ko", name: "Korean", country: "South Korea" },
    { code: "ky", name: "Kyrgyz", country: "Kyrgyzstan" },
    { code: "lo", name: "Lao", country: "Laos" },
    { code: "lv", name: "Latvian", country: "Latvia" },
    { code: "lt", name: "Lithuanian", country: "Lithuania" },
    { code: "lb", name: "Luxembourgish", country: "Luxembourg" },
    { code: "mk", name: "Macedonian", country: "North Macedonia" },
    { code: "mg", name: "Malagasy", country: "Madagascar" },
    { code: "ms", name: "Malay", country: "Malaysia" },
    { code: "ml", name: "Malayalam", country: "India" },
    { code: "mt", name: "Maltese", country: "Malta" },
    { code: "mi", name: "Maori", country: "New Zealand" },
    { code: "mr", name: "Marathi", country: "India" },
    { code: "mhr", name: "Mari", country: "Russia" },
    { code: "mn", name: "Mongolian", country: "Mongolia" },
    { code: "ne", name: "Nepali", country: "Nepal" },
    { code: "no", name: "Norwegian", country: "Norway" },
    { code: "pap", name: "Papiamento", country: "Curaçao" },
    { code: "fa", name: "Persian", country: "Iran" },
    { code: "pl", name: "Polish", country: "Poland" },
    { code: "pt", name: "Portuguese", country: "Portugal" },
    { code: "pa", name: "Punjabi", country: "India" },
    { code: "ro", name: "Romanian", country: "Romania" },
    { code: "ru", name: "Russian", country: "Russia" },
    { code: "sr", name: "Serbian", country: "Serbia" },
    { code: "si", name: "Sinhalese", country: "Sri Lanka" },
    { code: "sk", name: "Slovak", country: "Slovakia" },
    { code: "sl", name: "Slovenian", country: "Slovenia" },
    { code: "es", name: "Spanish", country: "Spain" },
    { code: "su", name: "Sundanese", country: "Indonesia" },
    { code: "sw", name: "Swahili", country: "Kenya" },
    { code: "sv", name: "Swedish", country: "Sweden" },
    { code: "tl", name: "Tagalog", country: "Philippines" },
    { code: "tg", name: "Tajik", country: "Tajikistan" },
    { code: "ta", name: "Tamil", country: "India" },
    { code: "tt", name: "Tatar", country: "Russia" },
    { code: "te", name: "Telugu", country: "India" },
    { code: "th", name: "Thai", country: "Thailand" },
    { code: "tr", name: "Turkish", country: "Turkey" },
    { code: "uk", name: "Ukrainian", country: "Ukraine" },
    { code: "ur", name: "Urdu", country: "Pakistan" },
    { code: "vi", name: "Vietnamese", country: "Vietnam" },
    { code: "zu", name: "Zulu", country: "South Africa" }
];

export const appUrl = process.env.NODE_ENV === "development"? process.env.APP_URL_DEV : process.env.APP_URL_DEV


//inter font
export const inter = Inter({ subsets: ["latin"], variable:"--font-inter" });

//nato font
export const nato = Noto_Sans_Osage({  
weight: "400",
subsets: ['latin'],
display: 'swap',
variable: '--font-nato-mono'
 });



 
 export const catogs = [
    {
        img: "/img/catog-gym.png",
        title:"Fitness room"
    },
    {
        img: "/img/catog-packing.png",
        title:"Private packing"
    },
    {
        img: "/img/catog-breakfast.png",
        title:"breakfast served "
    },
    {
        img: "/img/catog-swimming.png",
        title:"Indoor swimming pool"
    },
 ]

//user account Pge links
 export const accountLinks = {
    top:[
    {
        img: "/img/account-level.png",
        link:"account/membershipLevel"
    },
    {
        img: "/img/withdrawal-method.png",
        link:"account/withdrawalMethod"
    },
    {
        img: "/img/history.png",
        link:"account/history"
    },
    {
        img: "/img/setting.png",
        link:"account/setting"
    },
 ],
    bottom:[
    {
        img: "/img/compliant.png",
        title: "Compliant",
        link:"customerService"
    },
    {
        img: "/img/help.png",
        title: "Help",
        link:"help"
    },
    {
        img: "/img/signout.png",
        title: "Log Out",
        link:"#",
        onClick:async(router:AppRouterInstance) => {
          await signOut(auth)
          destroyCookie("auth")
          router.push("/auth/login")
        }
    },
    {
        img: "/img/about.png",
        title: "About Us",
        link:"aboutUs"
    },
 ]}

 export const description = `Each room includes a flat-screen satellite TV, a safe, fridge, air conditioning and a private bathroom.
 High-speed WiFi is provided free of charge for guests in all areas of the hotel.
 Use of the hotel fitness room is also complimentary.
 The Hotel Riu Plaza Berlin am Kurfürstendamm also boasts a 24-hour reception and extensive conference facilities.
 The hotel's own restaurant serves a varied breakfast buffet.`



 export const TRC20_ABI = [
    {
        "constant": false,
        "inputs": [
            { "name": "_to", "type": "address" },
            { "name": "_value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

export const ERC20_ABI = [
    {
        "constant": true,
        "inputs": [
            { "name": "_owner", "type": "address" }
        ],
        "name": "balanceOf",
        "outputs": [
            { "name": "balance", "type": "uint256" }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];
  