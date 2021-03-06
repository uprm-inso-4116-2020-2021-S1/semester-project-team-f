export const API_URL = 'https://the-covid-tracker-backend.herokuapp.com/'; //production backend

export const ICON_TYPE = {
    DEFAULT_ICON: {
        url: 'http://image.flaticon.com/icons/svg/252/252025.svg', // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        labelOrigin: new google.maps.Point(25, 60)
    },
    DOCTOR_ICON: {
        url: "assets/doctor.png", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        labelOrigin: new google.maps.Point(25, 60)
    },
    WORK_ICON: {
        url: "assets/work.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
        labelOrigin: new google.maps.Point(25, 60)
    },
    PERSON_ICON: {
        url: "assets/person.png",
        scaledSize: new google.maps.Size(50, 50), // scaled size
        labelOrigin: new google.maps.Point(25, 60)
    }
}

export const MAP_STYLE: google.maps.MapTypeStyle[] = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    }
]

export const COUNTRIES: string[] = [
"Afghanistan",
"Albania",
"Algeria",
"American Samoa",
"Andorra",
"Angola",
"Anguilla",
"Antarctica",
"Antigua and Barbuda", 
"Argentina",
"Armenia",
"Aruba",
"Australia",
"Austria",
"Azerbaijan", 
"Bahamas", 
"Bahrain", 
"Bangladesh", 
"Barbados", 
"Belarus", 
"Belgium", 
"Belize", 
"Benin", 
"Bermuda", 
"Bhutan", 
"Bolivia", 
"Bosnia and Herzegowina", 
"Botswana", 
"Bouvet Island", 
"Brazil", 
"British Indian Ocean Territory", 
"Brunei Darussalam", 
"Bulgaria", 
"Burkina Faso", 
"Burundi", 
"Cambodia", 
"Cameroon", 
"Canada", 
"Cape Verde", 
"Cayman Islands", 
"Central African Republic", 
"Chad", 
"Chile", 
"China", 
"Christmas Island", 
"Cocos (Keeling) Islands", 
"Colombia", 
"Comoros", 
"Congo", 
"Cook Islands", 
"Costa Rica", 
"Cote d'Ivoire", 
"Croatia (Hrvatska)", 
"Cuba", 
"Cyprus", 
"Czech Republic", 
"Denmark", 
"Djibouti", 
"Dominica", 
"Dominican Republic", 
"East Timor", 
"Ecuador", 
"Egypt",
"El Salvador",
"Equatorial Guinea", 
"Eritrea", 
"Estonia", 
"Ethiopia", 
"Falkland Islands (Malvinas)", 
"Faroe Islands", 
"Fiji", 
"Finland", 
"France", 
"France Metropolitan", 
"French Guiana", 
"French Polynesia", 
"French Southern Territories", 
"Gabon", 
"Gambia", 
"Georgia", 
"Germany", 
"Ghana", 
"Gibraltar", 
"Greece", 
"Greenland", 
"Grenada", 
"Guadeloupe", 
"Guam", 
"Guatemala", 
"Guinea", 
"Guinea-Bissau", 
"Guyana", 
"Haiti", 
"Heard and Mc Donald Islands", 
"Holy See (Vatican City State)", 
"Honduras", 
"Hong Kong", 
"Hungary", 
"Iceland", 
"India", 
"Indonesia", 
"Iran", 
"Iraq", 
"Ireland", 
"Israel", 
"Italy", 
"Jamaica", 
"Japan", 
"Jordan", 
"Kazakhstan", 
"Kenya", 
"Kiribati", 
"Korea", 
"Kuwait", 
"Kyrgyzstan", 
"Lao, People's Democratic Republic",
"Latvia", 
"Lebanon", 
"Lesotho", 
"Liberia", 
"Libyan Arab Jamahiriya", 
"Liechtenstein", 
"Lithuania", 
"Luxembourg", 
"Macau", 
"Macedonia", 
"Madagascar", 
"Malawi", 
"Malaysia", 
"Maldives", 
"Mali", 
"Malta", 
"Marshall Islands", 
"Martinique", 
"Mauritania", 
"Mauritius", 
"Mayotte", 
"Mexico", 
"Micronesia",
"Moldova", 
"Monaco", 
"Mongolia", 
"Montserrat", 
"Morocco", 
"Mozambique", 
"Myanmar", 
"Namibia", 
"Nauru", 
"Nepal", 
"Netherlands", 
"Netherlands Antilles", 
"New Caledonia", 
"New Zealand", 
"Nicaragua", 
"Niger", 
"Nigeria", 
"Niue", 
"Norfolk Island", 
"Northern Mariana Islands", 
"Norway", 
"Oman", 
"Pakistan", 
"Palau", 
"Panama", 
"Papua New Guinea", 
"Paraguay", 
"Peru", 
"Philippines", 
"Pitcairn", 
"Poland", 
"Portugal", 
"Puerto Rico", 
"Qatar", 
"Reunion", 
"Romania", 
"Russian Federation", 
"Rwanda", 
"Saint Kitts and Nevis", 
"Saint Lucia", 
"Saint Vincent and the Grenadines", 
"Samoa", 
"San Marino", 
"Sao Tome and Principe", 
"Saudi Arabia", 
"Senegal", 
"Seychelles", 
"Sierra Leone", 
"Singapore", 
"Slovakia (Slovak Republic)", 
"Slovenia", 
"Solomon Islands", 
"Somalia", 
"South Africa", 
"South Georgia and the South Sandwich Islands", 
"Spain", 
"Sri Lanka", 
"St. Helena", 
"St. Pierre and Miquelon", 
"Sudan", 
"Suriname", 
"Svalbard and Jan Mayen Islands", 
"Swaziland", 
"Sweden", 
"Switzerland", 
"Syrian Arab Republic", 
"Taiwan, Province of China", 
"Tajikistan", 
"Tanzania", 
"Thailand", 
"Togo", 
"Tokelau", 
"Tonga", 
"Trinidad and Tobago", 
"Tunisia", 
"Turkey", 
"Turkmenistan", 
"Turks and Caicos Islands", 
"Tuvalu", 
"Uganda", 
"Ukraine", 
"United Arab Emirates", 
"United Kingdom", 
"United States", 
"United States Minor Outlying Islands", 
"Uruguay", 
"Uzbekistan", 
"Vanuatu", 
"Venezuela", 
"Vietnam", 
"Virgin Islands (British)", 
"Virgin Islands (U.S.)", 
"Wallis and Futuna Islands", 
"Western Sahara", 
"Yemen", 
"Yugoslavia", 
"Zambia", 
"Zimbabwe"
]

export const STATES: string[] = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming']
