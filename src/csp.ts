// CSP eller Content-Security-Policy er en HTTP-Header som lar oss spesifisere hvor appen kan kjøre REST-kall mot og hvor den kan hente diverse innhold fra (fonter, bilder, javascript, stylesheets mm).
export const cspMap = (dekoratorenUrl: string): Record<string, string[]> => {
    return {
        'default-src': ["'self'", '*.nav.no'],
        // Hvor vi kan hente .js filer fra.
        'script-src': [
            "'self'",
            "'unsafe-inline'", // Må fjernes når de har gått bort fra å bruke GTM i nav-dekoratøren. https://nav-it.slack.com/archives/CAFRFDJMN/p1662980327936219?thread_ts=1662547757.895479&cid=CAFRFDJMN. Litt av poenget med CSP header faller bort når vi er nødt til å bruke 'unsafe-inline' så denne burde fjernes så fort det er mulig.
            "'unsafe-eval'", // vergic
            '*.nav.no',
            dekoratorenUrl + '/client.js',
            '*.psplugin.com',
            '*.taskanalytics.com',
            '*.hotjar.com',
            'https://cdn.polyfill.io/', // Trengs for bruk av intl
        ],
        // Hvor vi kan hente .css filer fra.
        'style-src': [
            "'self'",
            "'unsafe-inline'",
            dekoratorenUrl + '/css/client.css',
            '*.nav.no',
            '*.psplugin.com',
        ],
        // Hvor vi kan kjøre XHR/REST-kall mot.
        'connect-src': [
            "'self'",
            '*.nav.no',
            'amplitude.nav.no',
            '*.psplugin.com',
            'familie-dokument.dev.nav.no',
            '*.hotjar.com',
            '*.hotjar.io',
            '*.boost.ai',
            '*.taskanalytics.com',
        ],
        // Kan kun submitte forms til seg selv.
        'form-action': ["'self'"],
        // Hvor fonter kan hentes fra.
        'font-src': ["'self'", 'data:', '*.psplugin.com', '*.hotjar.com', 'cdn.nav.no'],
        // Hvor vi hente innhold til iFrames fra.
        'frame-src': ['*.hotjar.com', 'video.qbrick.com', 'player.vimeo.com'],
        // Hvor bilder kan hentes fra.
        'img-src': [
            "'self'",
            '*.nav.no',
            'data:',
            '*.psplugin.com',
            '*.vimeocdn.com', // used for video preview images
            '*.hotjar.com',
            'www.vergic.com', // seems to only be used for a single placeholder image
        ],
        'worker-src': ["'self'", 'blob:'],
        'child-src': ["'self'", 'blob:'],
        // Hvor manifest-filer kan hentes fra
        'manifest-src': ["'self'", 'www.nav.no', 'oidc-ver2.difi.no', 'idporten-ver2.difi.no'],
    };
};

export const cspString = (dekoratorenUrl: string) => {
    return Object.entries(cspMap(dekoratorenUrl))
        .map(entry => `${entry[0]} ${entry[1].join(' ')}`)
        .join('; ');
};
