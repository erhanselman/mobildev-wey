(function (global) {
    'use strict';

    const ApexAccessibilitySDK = {
        // Varsayılan Yapılandırma
        defaultOptions: {
            prefix: 'apex-sdk', // CSS ön eki
            localStorageKey: 'apexAccSdkSettings', // localStorage anahtarı
            primaryColor: '#4361ee',
            textLabels: {
                menuTitle: 'Erişilebilirlik',
                openMenuLabel: 'Erişilebilirlik Menüsünü Aç',
                closeMenuLabel: 'Menüyü Kapat',
                profiles: 'Profiller',
                text: 'Metin',
                navigation: 'Navigasyon',
                appearance: 'Görünüm',
                resetButton: 'Tüm Ayarları Sıfırla',
                // Profil Adları
                profileEpilepsy: 'Nöbet',
                profileLowVision: 'Görme',
                profileAdhd: 'DEHB',
                profileBlind: 'Körlük',
                profileDyslexia: 'Disleksi',
                profileElderly: 'Yaşlılık',
                // Kontrol Etiketleri
                textSize: 'Boyut',
                lineHeight: 'Satır Aralık',
                letterSpacing: 'Harf Aralık',
                textAlign: 'Hizalama',
                // dyslexicFont: 'Disleksi Fontu',
                readingGuide: 'Okuma Kılavuzu',
                readingMask: 'Okuma Maskesi',
                readingMaskHeight: 'Maske Yüksekliği',
                highlightLinks: 'Bağlantı Vurgu',
                highlightHeadings: 'Başlık Vurgu',
                textToSpeech: 'Metin Seslendirme',
                brightness: 'Parlaklık',
                contrast: 'Kontrast',
                saturation: 'Doygunluk',
                cursor: 'İmleç',
                darkMode: 'Tema',
                hideImages: 'Resimleri Gizle',
                stopAnimations: 'Animasyon Durdur'
            },
            features: {
                profiles: true,
                textControls: true,
                navigationControls: true,
                appearanceControls: true,
                textToSpeech: true
            }
        },

        init: function (userOptions = {}) {
            // Yapılandırmayı birleştir
            const config = { ...this.defaultOptions, ...userOptions };
            const p = config.prefix; // Kısaltma için

            // CSS ve HTML'i oluştur ve ekle
            this.createStyles(config);
            this.createHTML(config);

            // Ana mantığı başlat
            this.run(config);
        },

        createStyles: function (config) {
            const p = config.prefix;




            if (!document.getElementById(`${p}-google-fonts`)) {
                const link = document.createElement('link');
                link.id = `${p}-google-fonts`;
                link.rel = 'preconnect';
                link.href = 'https://fonts.googleapis.com';
                document.head.appendChild(link);

                const link2 = document.createElement('link');
                link2.rel = 'preconnect';
                link2.href = 'https://fonts.gstatic.com';
                link2.crossOrigin = 'anonymous';
                document.head.appendChild(link2);

                const fontLink = document.createElement('link');
                fontLink.rel = 'stylesheet';
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@400;600;700&display=swap';
                document.head.appendChild(fontLink);
            }

            const style = document.createElement('style');
            style.id = `${p}-styles`;
            style.innerHTML = `
            @font-face {
                font-family: 'Open-Dyslexic';
                font-style: normal;
                font-weight: 400;
                src: local('Open-Dyslexic'), url('https://fonts.cdnfonts.com/s/29616/open-dyslexic.woff') format('woff');
            }
            
               :root {
                   --${p}-primary: #4361ee;
                   --${p}-primary-light: #fff;
                   --${p}-bg: #eceef5;
                   --${p}-text: #1a1a1a;
                   --${p}-border: #e0e0e0;
                   --${p}-shadow: 0 4px 15px rgba(0, 0, 0, 0.06);
                   --${p}-transition: all 0.2s ease;
                   --${p}-font-size: 1rem;
                   --${p}-line-height: 1.5;
                   --${p}-letter-spacing: 0em;
                   --${p}-word-spacing: 0em;
                   --${p}-focus-outline: 2px solid var(--${p}-primary);
                   --${p}-link-underline: underline;
                   --${p}-dyslexic-font: 'Inter', sans-serif;
                   --${p}-animation-state: running;
                   --${p}-image-opacity: 1;
                   --${p}-reading-guide: none;
                   --${p}-reading-guide-pos: 50%;
                   --${p}-reading-mask-height: 80px;
                   --${p}-highlight-color: rgba(67, 97, 238, 0.2);
                   --${p}-brightness: 100%;
                   --${p}-monochrome: 0%;
                   --${p}-saturate: 100%;
                   --${p}-text-align: left;
                   --${p}-contrast: 1;
                   --${p}-invert: 0;
                   --${p}-word-spacing: 0em;
                  
               }

               .${p}-contrast-high {
                   --${p}-bg: #000;
                   --${p}-text: #fff;
                   --${p}-primary: #ffff00;
                   --${p}-border: #ffff00;
               }
            
               .${p}-dark-mode {
                   --${p}-bg: #1a1a1a;
                   --${p}-text: #fff;
                   --${p}-primary: #4cc9f0;
                   --${p}-border: #444;
               }
            
               .${p}-contrast-light {
                   --${p}-bg: #f8f9fa;
                   --${p}-text: #000;
                   --${p}-primary: #005a9c;
                   --${p}-border: #ced4da;
               }

body.${p}-cb-protanopia   { filter: hue-rotate(-20deg) saturate(1.3) contrast(1.1) !important; }
body.${p}-cb-deuteranopia { filter: sepia(1) hue-rotate(180deg) saturate(1.6) brightness(1.05) !important; }
body.${p}-cb-tritanopia   { filter: hue-rotate(180deg) saturate(0.3) contrast(1.4) brightness(1.1) !important; }

body.${p}-bluelight-low    { filter: sepia(0.3) hue-rotate(180deg) saturate(1.3) brightness(0.97) !important; }
body.${p}-bluelight-medium { filter: sepia(0.6) hue-rotate(185deg) saturate(1.6) brightness(0.94) !important; }
body.${p}-bluelight-high   { filter: sepia(0.9) hue-rotate(190deg) saturate(2.1) brightness(0.90) contrast(1.05) !important; }

               body {

                filter: 
        brightness(var(--${p}-brightness, 100%))
        grayscale(var(--${p}-monochrome, 0%))
        saturate(var(--${p}-saturate, 100%))
        contrast(var(--${p}-contrast, 1))
        invert(var(--${p}-invert, 0));
                    transition: all 0.4s ease;

                   font-family: var(--${p}-dyslexic-font);
                   font-size: var(--${p}-font-size);
                   line-height: var(--${p}-line-height);
                   letter-spacing: var(--${p}-letter-spacing);
                   word-spacing: var(--${p}-word-spacing);
                   background: var(--${p}-bg);
                   color: var(--${p}-text);
                   transition: var(--${p}-transition);
                   filter: brightness(var(--${p}-brightness)) grayscale(var(--${p}-monochrome)) saturate(var(--${p}-saturate)) contrast(var(--${p}-contrast)) invert(var(--${p}-invert));
                   text-align: var(--${p}-text-align);
                   
               }
            

               .${p}-big-cursor-active,
               .${p}-big-cursor-active * {
                   cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M9 4.94198C6.47561 4.02693 5.129 3.65381 4.39141 4.39141C3.55146 5.23136 4.15187 6.86106 5.3527 10.1205L7.3603 15.5696C7.96225 17.2035 8.26322 18.0204 8.92489 18.1658C9.58656 18.3111 10.2022 17.6955 11.4334 16.4643L12.6361 15.2616L16.5744 19.1999C16.9821 19.6077 17.186 19.8116 17.4135 19.9058C17.7168 20.0314 18.0575 20.0314 18.3608 19.9058C18.5882 19.8116 18.7921 19.6077 19.1999 19.1999C19.6077 18.7921 19.8116 18.5882 19.9058 18.3608C20.0314 18.0575 20.0314 17.7168 19.9058 17.4135C19.8116 17.186 19.6077 16.9821 19.1999 16.5744L15.2616 12.6361L16.4643 11.4334C17.6955 10.2022 18.3111 9.58656 18.1658 8.92489C18.0204 8.26322 17.2035 7.96225 15.5696 7.3603L13 6.41359" fill="%234361ee"/></svg>') 10 10, auto !important;
               }
            
               * {
                   animation-play-state: var(--${p}-animation-state);
               }
            
               img {
                   opacity: var(--${p}-image-opacity);
                   transition: opacity 0.3s;
               }
            
               a {
                   color: var(--${p}-primary);
                   text-decoration: var(--${p}-link-underline);
               }
            
               a:focus-visible,
               button:focus-visible,
               input:focus-visible,
               select:focus-visible,
               textarea:focus-visible {
                   outline: var(--${p}-focus-outline);
                   outline-offset: 2px;
               }
            
               h1,
               h2,
               h3,
               h4,
               h5,
               h6 {
                   transition: var(--${p}-transition);
               }
            
            
            
               .${p}-reading-guide {
                   position: fixed;
                   left: 0;
                   right: 0;
                   height: 3px;
                   background: var(--${p}-primary);
                   top: 0;
                   display: var(--${p}-reading-guide);
                   z-index: 9998;
                   pointer-events: none;
                   box-shadow: 0 0 8px var(--${p}-primary);
                   transition: top 80ms ease-out; /* Yumuşak hareket */
               }
            
               .${p}-reading-mask-top,
               .${p}-reading-mask-bottom {
                   position: fixed;
                   left: 0;
                   right: 0;
                   background: rgba(0, 0, 0, 0.75);
                   z-index: 9997;
                   pointer-events: none;
                   display: none;
               }
            
               .${p}-reading-mask-top {
                   top: 0;
               }
            
               .${p}-reading-mask-bottom {
                   bottom: 0;
               }
            
               .${p}-reading-mask-top,
               .${p}-reading-mask-bottom {
                   transition: height 120ms ease-out;
            
                   will-change: height;
            
               }
            
               .${p}-highlight-links a {
                   background: var(--${p}-highlight-color);
                   border: 3px solid var(--${p}-primary);
                   padding: 0.2rem 0.3rem;
                   border-radius: 10px;
               }
            
               .${p}-highlight-headings h1,
               .${p}-highlight-headings h2,
               .${p}-highlight-headings h3,
               .${p}-highlight-headings h4,
               .${p}-highlight-headings h5,
               .${p}-highlight-headings h6 {
                   background: var(--${p}-highlight-color);
                   padding: 2px 4px;
                   border-radius: 10px;
                   border: 2px solid var(--${p}-primary);
               }
            
               div.${p}-container-layer-wrap {
                   position: sticky;
                   width: 550px;
                   height: calc(100vh - 30px);
                   background: var(--${p}-bg);
                   box-shadow: var(--${p}-shadow);
                   font-family: 'Inter', sans-serif;
                   font-size: 0.9rem;
                   overflow-y: hidden;
                   border-radius: 10px;
                   top: 1rem;
                   right: 0;
                   bottom: 0;
               }
            
               .${p}-accessibility-menu {
                   position: fixed;
                   z-index: 10000;
                   width: 550px;
                   height: 100%;
                   top: 0;
                   right: 0;
                   transform: perspective(800px) rotateY(-90deg);
                   transform-origin: right center;
                   visibility: hidden;
                   opacity: 0;
                   transition: transform 0.3s ease;
               }
            
               .${p}-accessibility-menu.open {
                   transform: perspective(800px) rotateY(0deg);
                   visibility: visible;
                   opacity: 1;
                   top: 1rem;
                   right: 1rem;
               }
            
               .${p}-menu-header {
                   background: var(--${p}-primary);
                   color: white;
                   padding: 0 1.25rem;
                   font-weight: 600;
                   font-size: 1rem;
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   position: sticky;
                   top: 0;
                   z-index: 10;
                   box-shadow: 0 6rem 5rem 7rem var(--${p}-primary);
               }
            
               .${p}-menu-footer {
                   height: 50px;
                   width: 100%;
                   padding: 12px;
               }
            
               footer.${p}-menu-footer>a {
                   width: 100%;
                   height: 50px;
                   background-color: var(--${p}-primary);
                   border-radius: 8px;
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                   padding: 10px;
                   color: #fff;
                   text-decoration: none;
               }
            
               footer.${p}-menu-footer>a img {
                   width: 32px;
                   height: 32px;
               }
            
               .${p}-menu-header button {
                   background: none;
                   border: none;
                   cursor: pointer;
                   padding: 0;
               }
            
               .${p}-section {
                   padding: 1rem 1.25rem;
                   border-bottom: 1px solid var(--${p}-border);
                   position: relative;
                   z-index: 2;
                   background-color: rgba(255, 255, 255, 0.50);
                   border-radius: 10px;
                   margin-bottom: 10px;
                   box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.03);
                   backdrop-filter: blur(10px);
            
                   backdrop-filter: blur(10px);
                   transform: perspective(1000px) rotateX(25deg) translateY(30px);
                   opacity: 0;
                   transform-origin: center;
                   transition: all 0.5s;
                   transition-delay: 0.2s;
               }
            
               .${p}-accessibility-menu.open .${p}-section {
                   transform: perspective(1000px) rotateX(0deg) translateY(0px);
                   opacity: 1;
               }
            
               .${p}-section-title {
                   font-weight: 600;
                   margin: 0 0 0.75rem;
                   font-size: 1.2em;
                   display: flex;
                   align-items: center;
                   gap: 0.5rem;
                   color: #353955;
               }
            
               .${p}-control-grid {
                   display: grid;
                   grid-template-columns: repeat(2, 1fr);
                   gap: 0.5rem;
                   margin-bottom: 8px;
               }
            
               .${p}-control-grid-1col {
                   display: grid;
                   grid-template-columns: repeat(1, 1fr);
                   gap: 0.5rem;
               }
            
               .${p}-control-item {
                   display: flex;
                   align-items: center;
                   justify-content: space-between;
                   background: var(--${p}-primary-light);
                   border-radius: 8px;
                   padding: 0.6rem 0.8rem;
                   font-size: 0.85rem;
                   cursor: pointer;
                   transition: background 0.2s;
                   min-height: 44px;
               }
            
               .${p}-control-item>div {
                   display: flex;
                   align-items: center;
                   gap: 6px;
               }
            
               .${p}-control-item:hover {
                   background: #dbeafe;
               }
            
               .${p}-profile-grid {
                   display: grid;
                   grid-template-columns: repeat(3, 1fr);
                   gap: 0.5rem;
                   margin-bottom: 1rem;
               }
            
               .${p}-profile-card {
                   background: var(--${p}-primary-light);
                   border: 2px solid transparent;
                   border-radius: 8px;
                   padding: 0.6rem;
                   text-align: center;
                   cursor: pointer;
                   transition: var(--${p}-transition);
                   font-size: 0.75rem;
                   font-weight: 500;
                   min-height: 100px;
                   max-height: 100px;
                   display: flex;
                   flex-direction: column;
                   justify-content: center;
                   align-items: center;
                   font-weight: 700;
               }
            
               .${p}-profile-card.active,
               .${p}-profile-card:hover {
                   border-color: var(--${p}-primary);
               }
            
               .${p}-toggle {
                   position: relative;
                   width: 40px;
                   height: 22px;
               }
            
               .${p}-toggle input {
                   opacity: 0;
                   width: 0;
                   height: 0;
               }
            
               .${p}-toggle-slider {
                   position: absolute;
                   cursor: pointer;
                   inset: 0;
                   border-radius: 22px;
                   transition: var(--${p}-transition);
                   background: #d3d3d3;
               }
            
               .${p}-toggle-slider:before {
                   position: absolute;
                   content: "";
                   height: 18px;
                   width: 18px;
                   left: 2px;
                   bottom: 2px;
                   background: white;
                   border-radius: 50%;
                   transition: var(--${p}-transition);
               }
            
               input:checked+.${p}-toggle-slider {
                   background: var(--${p}-primary);
               }
            
               input:checked+.${p}-toggle-slider:before {
                   transform: translateX(18px);
               }
            
               .${p}-open-menu-btn {
                   position: fixed;
                   top: 20px;
                   right: 20px;
                   z-index: 10001;
                   background: var(--${p}-primary);
                   color: white;
                   border: none;
                   border-radius: 50%;
                   width: 56px;
                   height: 56px;
                   font-size: 1.5rem;
                   cursor: pointer;
                   box-shadow: var(--${p}-shadow);
                   transition: transform 0.2s;
                   border: 4px solid #fff;
                   box-shadow: 0 0 0 3px #4361ee;
                   z-index: 9999;
                   padding: 0;
               }
            
               .${p}-open-menu-btn:hover {
                   transform: scale(1.05);
               }
            
               .${p}-speech-toggle {
                   position: fixed;
                   background: var(--${p}-primary);
                   color: white;
                   border: none;
                   border-radius: 50%;
                   width: 44px;
                   height: 44px;
                   font-size: 1rem;
                   cursor: pointer;
                   z-index: 10002;
                   display: none;
                   align-items: center;
                   justify-content: center;
                   box-shadow: var(--${p}-shadow);
                   transition: var(--${p}-transition);
               }
            
               .${p}-speech-toggle.playing {
                   background: #ffffff;
                   box-shadow: 0px 0px 5px -2px rgba(0, 0, 0, 0.72);
               }
            
               .${p}-sections-wrap {
                   padding: 0 .75rem;
                   overflow: auto;
                   height: calc(100% - 150px);
                   position: relative;
                   z-index: 10;
               }
            
               /* .${p}-sections-wrap:after {
                   position: fixed;
                   content: "";
                   background: var(--${p}-primary);
                   width: 100%;
                   height: 22%;
                   top: 4rem;
                   left: 0;
               } */
            
               @media (max-width: 480px) {
                   .${p}-accessibility-menu {
                       width: 100%;
                   }
            
                   .${p}-control-grid,
                   .${p}-profile-grid {
                       grid-template-columns: 1fr;
                   }
               }
            
               @media (prefers-reduced-motion: reduce) {
            
                   *,
                   *::before,
                   *::after {
                       transition: none !important;
                       animation: none !important;
                   }
               }
            
            
               .progress-circle {
                   width: 40px;
                   height: 40px;
                   border-radius: 50%;
                   background: conic-gradient(lightgray 0deg 360deg);
                   transition: background 0.5s ease;
               }
            
               .${p}--reset-all {
                   border: none !important;
                   display: flex;
                   flex-direction: column;
                   align-items: center;
                   justify-content: center;
                   position: relative;
                   overflow: visible;
               }
            
               .${p}--reset-all:hover {
                   background-color: transparent;
               }
            
               .${p}--reset-all span {
                   position: absolute;
                   background-color: #fff;
                   color: #eb6e6e;
                   font-size: 0.9em;
                   border-radius: 4px;
                   padding: 4px;
                   white-space: nowrap;
                   right: calc(100% + 3px);
                   min-width: 100px;
                   transition: all 0.4s;
                   transform: perspective(500px) rotateX(90deg);
                   visibility: hidden;
                   opacity: 0;
               }
            
               .${p}--reset-all:hover span {
                   transform: perspective(500px) rotateX(0deg);
                   visibility: visible;
                   opacity: 1;
               }
            
               .box-act-wrap {
                   display: flex;
                   align-items: center;
                   gap: 4px;
               }
            
               .${p}-control-item>svg {
                   transition: all 0.4s;
               }
            
               .${p}-control-item[data-action="passive"]>svg {
                   transition: all 0.4s;
                   transform: perspective(500px) scale(0) rotateY(645deg);
               }
            
               .${p}-control-item[data-action="active"]>svg {
                   transform: perspective(500px) scale(1) rotateY(0deg);
                   animation: smoothTranslate 1s infinite alternate;
               }
            
               @keyframes smoothTranslate {
                   0% {
                       transform: translateY(-1px);
                   }
            
                   100% {
                       transform: translateY(4px);
                   }
               }
            
               .${p}-control-item.${p}--reset-all>svg {
                   transform: unset !important;
               }
                   
               .${p}-reading-overlay {
                    position: fixed;
                    left: 0;
                    right: 0;
                    z-index: 9997;
                    pointer-events: none;
                    display: none;
                    /* Başlangıç: Siyah, %85 opak, 40vh yükseklik */
                    height: 80px;
                    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.85);
                    transform: translateY(-50%); /* Yükseklik ortalaması için */
                    transition: height 120ms ease-out, box-shadow 120ms ease-out;
                }

                .${p}-tooltip {
    background: rgba(0, 0, 0, 0.85);
    padding: 1rem 1.4rem;
    display: none;
    z-index: 999999;
    position: fixed !important;   /* ← fixed yap! */
    pointer-events: none;
    border-radius: 12px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    transition: opacity 0.2s ease, transform 0.1s ease;
    transform: translateY(8px);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
}

.${p}-tooltip.show {
    display: block;
    opacity: 1;
    transform: translateY(0);
}

                .${p}-tooltip-content {
                    font-size: 1.5rem; /* Büyük font, erişilebilirlik için */
                    font-weight: normal;
                    color: #FFF;
                    
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
                    max-width: 400px;
                }

                /* Parent element için relative positioning */
                .${p}-tooltip-parent {
                    position: relative !important;
                }

                .${p}-word-spacing-active {
                    word-spacing: 0.5em !important;
                }

                /* Font Seçici - Yeni */
body.${p}-font-inter { font-family: 'Inter', system-ui, sans-serif !important; }
body.${p}-font-atkinson { font-family: 'Atkinson Hyperlegible', sans-serif !important; }
body.${p}-font-dyslexic { font-family: 'Open-Dyslexic', sans-serif !important; }
body.${p}-font-bionic { 
    font-family: 'Inter', system-ui, sans-serif !important; 
}

/* BIONIC READING - Kalın harf vurgusu */
body.${p}-font-bionic b,
body.${p}-font-bionic strong,
body.${p}-font-bionic em {
    font-weight: 800 !important;
    color: var(--${p}-primary) !important;
}

/* Bionic Reading: Her kelimenin ilk yarısı kalın olsun (otomatik) */
body.${p}-font-bionic span.bionic-word {
    font-weight: 800;
    color: var(--${p}-primary);
}
               `;
            document.head.appendChild(style);
        },

        createHTML: function (config) {
            const p = config.prefix;
            const l = config.textLabels; // Kısaltma için
            const container = document.createElement('div');
            container.id = `${p}-container`;
            container.innerHTML = `
                <div class="${p}-reading-overlay" aria-hidden="true" style="display: none;"></div>
                <div class="${p}-reading-guide" aria-hidden="true"></div>
                <div class="${p}-reading-mask-top" aria-hidden="true"></div>
                <div class="${p}-reading-mask-bottom" aria-hidden="true"></div>
                <button class="${p}-open-menu-btn" id="${p}-open-menu-btn" aria-label="${l.openMenuLabel}"><svg xmlns="http://www.w3.org/2000/svg" width="44px" height="44px" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 6.50024C13.5 7.32867 12.8284 8.00024 12 8.00024C11.1716 8.00024 10.5 7.32867 10.5 6.50024C10.5 5.67182 11.1716 5.00024 12 5.00024C12.8284 5.00024 13.5 5.67182 13.5 6.50024Z" fill="#fff"/>
                <path d="M6.05132 8.68402C5.87667 9.20796 6.15983 9.77428 6.68377 9.94893C6.85906 10.0071 7.03576 10.0613 7.21265 10.1143C7.5363 10.2114 7.98911 10.3408 8.50746 10.4704C9.08908 10.6158 9.78094 10.7687 10.4783 10.8727C10.4323 11.7654 10.3205 12.4059 10.2166 12.8309L8.10557 17.053C7.85858 17.547 8.05881 18.1477 8.55279 18.3947C9.04677 18.6417 9.64744 18.4414 9.89443 17.9475L12 13.7363L14.1056 17.9475C14.3526 18.4414 14.9532 18.6417 15.4472 18.3947C15.9412 18.1477 16.1414 17.547 15.8944 17.053L13.7834 12.8309C13.6795 12.4059 13.5677 11.7654 13.5217 10.8727C14.2191 10.7687 14.9109 10.6158 15.4925 10.4704C16.0109 10.3408 16.4637 10.2114 16.7873 10.1143C16.963 10.0616 17.1384 10.0077 17.3125 9.95015C17.8261 9.77972 18.1201 9.19822 17.9487 8.68402C17.7741 8.16012 17.2078 7.87697 16.6839 8.05151C16.5277 8.10318 16.3703 8.15138 16.2127 8.19867C15.9113 8.28907 15.4891 8.40969 15.0075 8.5301C14.0216 8.77657 12.8709 9.00024 12 9.00024C11.1291 9.00024 9.97843 8.77657 8.99254 8.5301C8.51089 8.40969 8.0887 8.28907 7.78735 8.19867C7.63167 8.15196 7.47632 8.10404 7.32186 8.05342C6.80235 7.88161 6.22544 8.16164 6.05132 8.68402Z" fill="#fff"/>
                </svg></button>
                <button class="${p}-speech-toggle" id="${p}-speech-toggle" aria-label="Seslendirmeyi Başlat/Durdur">▶️</button>
               
                <aside class="${p}-accessibility-menu" id="${p}-accessibility-menu" role="dialog" aria-modal="true" aria-labelledby="${p}-menu-title">
                <div class="apex-sdk-container-layer-wrap">
                    <header class="${p}-menu-header">
                        <h2 id="${p}-menu-title">${l.menuTitle}</h2>
                        <div class="box-act-wrap">
                        <button class="${p}-control-item ${p}--reset-all"" id="${p}-reset-all">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M7.37756 11.6296H6.62756H7.37756ZM7.37756 12.5556L6.81609 13.0528C6.95137 13.2056 7.14306 13.2966 7.34695 13.3049C7.55084 13.3133 7.74932 13.2382 7.89662 13.0969L7.37756 12.5556ZM9.51905 11.5414C9.81805 11.2547 9.82804 10.7799 9.54137 10.4809C9.2547 10.182 8.77994 10.172 8.48095 10.4586L9.51905 11.5414ZM6.56148 10.5028C6.28686 10.1927 5.81286 10.1639 5.50277 10.4385C5.19267 10.7131 5.16391 11.1871 5.43852 11.4972L6.56148 10.5028ZM14.9317 9.0093C15.213 9.31337 15.6875 9.33184 15.9915 9.05055C16.2956 8.76927 16.3141 8.29476 16.0328 7.9907L14.9317 9.0093ZM12.0437 6.25C9.05802 6.25 6.62756 8.653 6.62756 11.6296H8.12756C8.12756 9.49251 9.87531 7.75 12.0437 7.75V6.25ZM6.62756 11.6296L6.62756 12.5556H8.12756L8.12756 11.6296H6.62756ZM7.89662 13.0969L9.51905 11.5414L8.48095 10.4586L6.85851 12.0142L7.89662 13.0969ZM7.93904 12.0583L6.56148 10.5028L5.43852 11.4972L6.81609 13.0528L7.93904 12.0583ZM16.0328 7.9907C15.0431 6.9209 13.6212 6.25 12.0437 6.25V7.75C13.1879 7.75 14.2154 8.23504 14.9317 9.0093L16.0328 7.9907Z" fill="#eb6e6e"/><path d="M16.6188 11.4443L17.1795 10.9462C17.044 10.7937 16.8523 10.703 16.6485 10.6949C16.4447 10.6868 16.2464 10.7621 16.0993 10.9034L16.6188 11.4443ZM14.4805 12.4581C14.1817 12.745 14.1722 13.2198 14.4591 13.5185C14.746 13.8173 15.2208 13.8269 15.5195 13.54L14.4805 12.4581ZM17.4393 13.4972C17.7144 13.8068 18.1885 13.8348 18.4981 13.5597C18.8078 13.2846 18.8358 12.8106 18.5607 12.5009L17.4393 13.4972ZM9.04688 15.0047C8.76342 14.7027 8.28879 14.6876 7.98675 14.9711C7.68472 15.2545 7.66966 15.7292 7.95312 16.0312L9.04688 15.0047ZM11.9348 17.7499C14.9276 17.7499 17.3688 15.3496 17.3688 12.3703H15.8688C15.8688 14.5047 14.1158 16.2499 11.9348 16.2499V17.7499ZM17.3688 12.3703V11.4443H15.8688V12.3703H17.3688ZM16.0993 10.9034L14.4805 12.4581L15.5195 13.54L17.1383 11.9853L16.0993 10.9034ZM16.0581 11.9425L17.4393 13.4972L18.5607 12.5009L17.1795 10.9462L16.0581 11.9425ZM7.95312 16.0312C8.94543 17.0885 10.3635 17.7499 11.9348 17.7499V16.2499C10.792 16.2499 9.76546 15.7704 9.04688 15.0047L7.95312 16.0312Z" fill="#eb6e6e"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#eb6e6e" stroke-width="1.5" stroke-linecap="round"/></svg>
                        <span>${l.resetButton}</span></button>
                        <button id="${p}-close-menu" aria-label="${l.closeMenuLabel}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none"><path d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/></svg></button>
                        </div>
                        </header>
                    <div class="${p}-sections-wrap">
                    ${config.features.profiles ? `
                    <section class="${p}-section">
                        <h3 class="${p}-section-title">${l.profiles}</h3>
                        <div class="${p}-profile-grid">
                            <div class="${p}-profile-card" data-profile="epilepsy" tabindex="0" role="button" aria-pressed="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"><path d="M9.55563 13.3232L9.43584 13.3123C7.90803 13.1735 7.14412 13.104 6.90146 12.5814C6.65881 12.0588 7.09869 11.4304 7.97846 10.1736L11.5612 5.05544C12.1424 4.22517 12.433 3.81003 12.6836 3.89831C12.9342 3.98658 12.9005 4.4922 12.8331 5.50343L12.6299 8.55194C12.5685 9.47214 12.5379 9.93224 12.8023 10.2419C13.0667 10.5515 13.5259 10.5933 14.4444 10.6768L14.5642 10.6877C16.092 10.8265 16.8559 10.896 17.0985 11.4186C17.3412 11.9412 16.9013 12.5696 16.0215 13.8264L12.4388 18.9446C11.8576 19.7748 11.567 20.19 11.3164 20.1017C11.0658 20.0134 11.0995 19.5078 11.1669 18.4966L11.3701 15.4481C11.4315 14.5279 11.4621 14.0678 11.1977 13.7581C10.9333 13.4485 10.4741 13.4067 9.55563 13.3232Z" stroke="var(${p}-sdk-primary)"/><path d="M18.5 4L17 6H19L17.5 8" stroke="#2A4157" stroke-opacity="0.24" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 16L5 18H7L5.5 20" stroke="#2A4157" stroke-opacity="0.24" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            ${l.profileEpilepsy}</div>
                            <div class="${p}-profile-card" data-profile="lowvision" tabindex="0" role="button" aria-pressed="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"><path d="M22 12C22 12 18.3636 19 12 19C5.63636 19 2 12 2 12C2 12 5.63636 5 12 5C14.8779 5 17.198 6.43162 18.8762 8M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            ${l.profileLowVision}</div>
                            <div class="${p}-profile-card" data-profile="adhd" tabindex="0" role="button" aria-pressed="false">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="40px" width="40px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve"><style type="text/css">.st0{fill:var(--apex-sdk-primary)}</style><g><path class="st0" d="M448.559,141.251c-5.14-5.954-10.584-11.578-16.253-16.942c-0.268-0.286-0.546-0.554-0.842-0.823   c-43.419-40.653-101.748-63.988-168.95-68.062c-6.868-0.429-13.7-0.618-20.407-0.618c-74.786-0.017-141.836,25.252-187.96,72.226   c-16.396,16.7-29.952,34.644-39.408,54.666c-9.465,19.995-14.703,42.058-14.686,66.182c0,0.045,0.009,0.098,0.009,0.143   C0.054,248.219,0,248.407,0,248.604c0,0.402,0.09,0.788,0.116,1.182c0.081,7.262,0.573,14.676,1.586,22.314l0.054,0.403l0.08,0.412   c2.732,13.843,6.242,26.648,14.023,38.074c5.803,8.524,14.005,15.76,24.392,21.159c15.652,8.14,35.925,12.85,64.408,15.912   c16.978,1.808,37.017,2.946,60.684,3.591c0.053,0,0.107,0.017,0.162,0.017c0.026,0,0.062-0.009,0.089-0.009   c15.993,0.43,33.588,0.646,53.198,0.646c44.109-0.028,72.494,3.976,90.25,9.742c8.489,2.757,14.479,5.784,18.966,8.927   c0.251,0.188,0.492,0.385,0.761,0.564c2.221,1.63,4.101,3.277,5.678,4.943c3.626,3.841,6.088,7.988,8.354,13.001   c3.438,7.45,5.981,16.924,11.309,27.312c5.274,10.368,14.112,21.248,28.394,29.199c12.93,7.316,26.505,11.211,39.909,11.202   c12.268,0.018,24.257-3.313,34.913-9.581c16.046-9.438,29.03-25.126,38.298-45.56c5.614-12.411,9.742-26.826,12.572-42.766   c0.412-1.307,0.698-2.686,0.698-4.137c1.46-9.187,2.615-18.714,3.081-28.994l0.017-0.268v-0.25   c0.009-0.914,0.009-1.828,0.009-2.741C511.991,254.192,489.919,189.147,448.559,141.251z M484.483,325.145   c-0.26,5.668-0.743,11.04-1.334,16.252c-10.978,0-19.718,0-19.735,0c-4.11-0.009-7.745-1.638-10.494-4.361   c-2.722-2.749-4.353-6.385-4.361-10.494v-20.631c0-7.602-6.161-13.754-13.754-13.754c-7.594,0-13.754,6.152-13.754,13.754v20.631   c0.027,23.397,18.965,42.327,42.363,42.363c0,0,6.188,0,14.694,0c-3.948,14.962-9.366,27.222-15.688,36.444   c-5.838,8.551-12.33,14.614-19.01,18.536c-6.706,3.914-13.592,5.785-20.998,5.802c-8.068,0-16.905-2.302-26.379-7.647   c-5.731-3.259-9.466-6.572-12.393-10.092c-5.086-6.098-7.916-13.548-11.444-23.075c-2.668-7.065-5.758-15.195-11.327-23.316   c-2.884-4.227-6.51-8.355-10.88-12.196v-52.034c0-7.602-6.161-13.754-13.754-13.754c-7.594,0-13.754,6.152-13.754,13.754v36.354   c-7.11-2.623-15.07-4.897-24.293-6.733c-20.031-3.976-45.632-6.152-79.398-6.152c-14.246,0-27.329-0.116-39.533-0.34v-41.468   c0-7.602-6.161-13.754-13.754-13.754c-7.594,0-13.754,6.152-13.754,13.754v40.698c-12.93-0.502-24.571-1.191-34.904-2.087   c-19.27-1.656-34.232-4.038-45.604-7.065c-8.534-2.265-15.008-4.88-19.924-7.683c-7.351-4.262-11.336-8.596-14.712-14.586   c-3.277-5.9-5.668-13.88-7.683-24.231c-0.25-1.924-0.393-3.788-0.573-5.676h44.548c27.696-0.027,50.126-22.458,50.154-50.153   v-21.643c0-7.602-6.161-13.754-13.754-13.754c-7.594,0-13.754,6.152-13.754,13.754v21.643c-0.009,6.268-2.516,11.855-6.644,16.001   c-4.146,4.128-9.734,6.635-16.002,6.644H28.26c1.451-14.909,5.274-28.502,11.354-41.404c7.817-16.557,19.341-32.048,34.16-47.144   c18.804-19.163,41.898-34.349,68.16-45.148c0,11.972,0,22.314,0,27.239c0.09,11.784,4.236,23.801,12.187,34.027   c4.012,5.068,9.08,9.635,15.268,12.974c6.178,3.35,13.503,5.381,21.33,5.364c22.099,0,44.198,0,44.198,0   c7.593,0,13.754-6.161,13.754-13.754c0-7.593-6.161-13.754-13.754-13.754c0,0-22.1,0-44.198,0c-3.224-0.018-5.803-0.753-8.265-2.06   c-3.662-1.952-7.056-5.534-9.438-9.913c-2.391-4.325-3.609-9.375-3.573-12.886c0-6.187,0-20.872,0-36.658   c22.583-6.178,46.975-9.412,72.664-9.421c6.206,0,12.465,0.171,18.706,0.565c59.859,3.743,109.834,23.558,147.675,57.146v102.805   c0,7.593,6.16,13.754,13.754,13.754c7.593,0,13.754-6.161,13.754-13.754v-73.014c31.125,41.119,48.514,95.248,48.496,153.083   C484.492,323.651,484.492,324.403,484.483,325.145z"/><path class="st0" d="M322.482,153.429c-7.594,0-13.754,6.161-13.754,13.754v44.458c-0.018,9.608-7.818,17.417-17.434,17.434   h-49.043c-7.594,0-13.754,6.161-13.754,13.754c0,7.593,6.16,13.754,13.754,13.754h49.043c24.821-0.017,44.933-20.12,44.942-44.942   v-44.458C336.236,159.589,330.075,153.429,322.482,153.429z"/></g></svg>
                            ${l.profileAdhd}</div>
                            <div class="${p}-profile-card" data-profile="blind" tabindex="0" role="button" aria-pressed="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"><path d="M2.68936 6.70456C2.52619 6.32384 2.08528 6.14747 1.70456 6.31064C1.32384 6.47381 1.14747 6.91472 1.31064 7.29544L2.68936 6.70456ZM15.5872 13.3287L15.3125 12.6308L15.5872 13.3287ZM9.04145 13.7377C9.26736 13.3906 9.16904 12.926 8.82185 12.7001C8.47466 12.4742 8.01008 12.5725 7.78417 12.9197L9.04145 13.7377ZM6.37136 15.091C6.14545 15.4381 6.24377 15.9027 6.59096 16.1286C6.93815 16.3545 7.40273 16.2562 7.62864 15.909L6.37136 15.091ZM22.6894 7.29544C22.8525 6.91472 22.6762 6.47381 22.2954 6.31064C21.9147 6.14747 21.4738 6.32384 21.3106 6.70456L22.6894 7.29544ZM19 11.1288L18.4867 10.582V10.582L19 11.1288ZM19.9697 13.1592C20.2626 13.4521 20.7374 13.4521 21.0303 13.1592C21.3232 12.8663 21.3232 12.3914 21.0303 12.0985L19.9697 13.1592ZM11.25 16.5C11.25 16.9142 11.5858 17.25 12 17.25C12.4142 17.25 12.75 16.9142 12.75 16.5H11.25ZM16.3714 15.909C16.5973 16.2562 17.0619 16.3545 17.409 16.1286C17.7562 15.9027 17.8545 15.4381 17.6286 15.091L16.3714 15.909ZM5.53033 11.6592C5.82322 11.3663 5.82322 10.8914 5.53033 10.5985C5.23744 10.3056 4.76256 10.3056 4.46967 10.5985L5.53033 11.6592ZM2.96967 12.0985C2.67678 12.3914 2.67678 12.8663 2.96967 13.1592C3.26256 13.4521 3.73744 13.4521 4.03033 13.1592L2.96967 12.0985ZM12 13.25C8.77611 13.25 6.46133 11.6446 4.9246 9.98966C4.15645 9.16243 3.59325 8.33284 3.22259 7.71014C3.03769 7.3995 2.90187 7.14232 2.8134 6.96537C2.76919 6.87696 2.73689 6.80875 2.71627 6.76411C2.70597 6.7418 2.69859 6.7254 2.69411 6.71533C2.69187 6.7103 2.69036 6.70684 2.68957 6.70503C2.68917 6.70413 2.68896 6.70363 2.68892 6.70355C2.68891 6.70351 2.68893 6.70357 2.68901 6.70374C2.68904 6.70382 2.68913 6.70403 2.68915 6.70407C2.68925 6.7043 2.68936 6.70456 2 7C1.31064 7.29544 1.31077 7.29575 1.31092 7.29609C1.31098 7.29624 1.31114 7.2966 1.31127 7.2969C1.31152 7.29749 1.31183 7.2982 1.31218 7.299C1.31287 7.30062 1.31376 7.30266 1.31483 7.30512C1.31698 7.31003 1.31988 7.31662 1.32353 7.32483C1.33083 7.34125 1.34115 7.36415 1.35453 7.39311C1.38127 7.45102 1.42026 7.5332 1.47176 7.63619C1.57469 7.84206 1.72794 8.13175 1.93366 8.47736C2.34425 9.16716 2.96855 10.0876 3.8254 11.0103C5.53867 12.8554 8.22389 14.75 12 14.75V13.25ZM15.3125 12.6308C14.3421 13.0128 13.2417 13.25 12 13.25V14.75C13.4382 14.75 14.7246 14.4742 15.8619 14.0266L15.3125 12.6308ZM7.78417 12.9197L6.37136 15.091L7.62864 15.909L9.04145 13.7377L7.78417 12.9197ZM22 7C21.3106 6.70456 21.3107 6.70441 21.3108 6.70427C21.3108 6.70423 21.3108 6.7041 21.3109 6.70402C21.3109 6.70388 21.311 6.70376 21.311 6.70368C21.3111 6.70352 21.3111 6.70349 21.3111 6.7036C21.311 6.7038 21.3107 6.70452 21.3101 6.70576C21.309 6.70823 21.307 6.71275 21.3041 6.71924C21.2983 6.73223 21.2889 6.75309 21.2758 6.78125C21.2495 6.83757 21.2086 6.92295 21.1526 7.03267C21.0406 7.25227 20.869 7.56831 20.6354 7.9432C20.1669 8.69516 19.4563 9.67197 18.4867 10.582L19.5133 11.6757C20.6023 10.6535 21.3917 9.56587 21.9085 8.73646C22.1676 8.32068 22.36 7.9668 22.4889 7.71415C22.5533 7.58775 22.602 7.48643 22.6353 7.41507C22.6519 7.37939 22.6647 7.35118 22.6737 7.33104C22.6782 7.32097 22.6818 7.31292 22.6844 7.30696C22.6857 7.30398 22.6867 7.30153 22.6876 7.2996C22.688 7.29864 22.6883 7.29781 22.6886 7.29712C22.6888 7.29677 22.6889 7.29646 22.689 7.29618C22.6891 7.29604 22.6892 7.29585 22.6892 7.29578C22.6893 7.29561 22.6894 7.29544 22 7ZM18.4867 10.582C17.6277 11.3882 16.5739 12.1343 15.3125 12.6308L15.8619 14.0266C17.3355 13.4466 18.5466 12.583 19.5133 11.6757L18.4867 10.582ZM18.4697 11.6592L19.9697 13.1592L21.0303 12.0985L19.5303 10.5985L18.4697 11.6592ZM11.25 14V16.5H12.75V14H11.25ZM14.9586 13.7377L16.3714 15.909L17.6286 15.091L16.2158 12.9197L14.9586 13.7377ZM4.46967 10.5985L2.96967 12.0985L4.03033 13.1592L5.53033 11.6592L4.46967 10.5985Z" fill="var(--apex-sdk-primary)"/></svg>
                            ${l.profileBlind}</div>
                            <div class="${p}-profile-card" data-profile="dyslexia" tabindex="0" role="button" aria-pressed="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" fill="none"><path d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="16" r="1" fill="var(--apex-sdk-primary)"/><path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                            ${l.profileDyslexia}</div>
                            <div class="${p}-profile-card" data-profile="elderly" tabindex="0" role="button" aria-pressed="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 48 48" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.4675 9.00181C20.4675 7.34355 21.8111 6 23.4676 6C25.1241 6 26.4677 7.34355 26.4677 9.00181C26.4677 10.6601 25.1241 12.0036 23.4676 12.0036C21.8111 12.0036 20.4675 10.6601 20.4675 9.00181ZM23.4676 4C20.7057 4 18.4675 6.23979 18.4675 9.00181C18.4675 9.52551 18.548 10.0304 18.6972 10.5049H18.1006C17.6387 10.5049 17.1263 10.6916 16.6825 10.9244C16.2077 11.1735 15.6945 11.5368 15.2192 12.0117C14.2633 12.9666 13.4255 14.4124 13.4255 16.3153C13.4255 18.6565 14.2019 20.3668 15.1621 21.5033C15.6371 22.0656 16.1555 22.4854 16.6421 22.7701C16.7892 22.8562 16.9433 22.9357 17.1006 23.0038V41.868C17.1006 43.3193 18.2839 44.5026 19.7352 44.5026L19.7389 44.5025H19.7508L19.7544 44.5026C21.2057 44.5026 22.389 43.3193 22.389 41.868V31.216H24.6389V41.868C24.6389 43.3193 25.8222 44.5026 27.2735 44.5026L27.2772 44.5025H27.2891L27.2927 44.5026C28.744 44.5026 29.9273 43.3193 29.9273 41.868V23.1327L30.1684 23.8236C30.5073 24.7949 31.3851 25.4245 32.3498 25.4942C31.5366 26.0309 31 26.9528 31 28V28.6667C31 29.219 31.4477 29.6667 32 29.6667C32.5523 29.6667 33 29.219 33 28.6667V28C33 27.4477 33.4477 27 34 27C34.5523 27 35 27.4477 35 28V42C35 42.5523 35.4477 43 36 43C36.5523 43 37 42.5523 37 42V28C37 26.3531 35.6729 25.0161 34.0297 25.0001C34.8776 24.3642 35.257 23.2305 34.8893 22.1764L31.6362 12.8528C31.1458 11.4474 29.8201 10.5059 28.3315 10.5059H28.2377C28.3871 10.0311 28.4677 9.52587 28.4677 9.00181C28.4677 6.23979 26.2295 4 23.4676 4ZM18.1006 12.5049H19.8986C20.8059 13.4298 22.0697 14.0036 23.4676 14.0036C24.865 14.0036 26.1284 13.4302 27.0356 12.5059H28.3315C28.9695 12.5059 29.5376 12.9094 29.7478 13.5117L33.0009 22.8353C33.0919 23.096 32.9543 23.3811 32.6935 23.4721C32.4328 23.5631 32.1477 23.4254 32.0567 23.1647L29.8715 16.9017L27.9273 17.2311V41.868C27.9273 42.2147 27.6395 42.5026 27.2927 42.5026L27.2891 42.5025L27.2891 42.5025L27.2772 42.5025L27.2735 42.5026C26.9268 42.5026 26.6389 42.2147 26.6389 41.868V30.216V29.216H25.6389H21.389H20.389V30.216V41.868C20.389 42.2147 20.1012 42.5026 19.7544 42.5026L19.7508 42.5025L19.7508 42.5025L19.7389 42.5025L19.7352 42.5026C19.3885 42.5026 19.1006 42.2147 19.1006 41.868V22.2402V21.2402H19.0977L19.0977 16H17.0977L17.0977 20.634C16.9628 20.5129 16.8252 20.3728 16.6898 20.2126C16.0372 19.4401 15.4255 18.1879 15.4255 16.3153C15.4255 15.0424 15.9758 14.0829 16.6327 13.4266C16.9638 13.0959 17.3132 12.852 17.6117 12.6954C17.8981 12.5452 18.0653 12.5122 18.0961 12.5061L18.0961 12.5061C18.1007 12.5052 18.1022 12.5049 18.1006 12.5049Z" fill="var(--apex-sdk-primary)"/></svg>
                            ${l.profileElderly}</div>
                        </div>
                    </section>` : ''}
                    ${config.features.textControls ? `
                    <section class="${p}-section">
                        <h3 class="${p}-section-title">${l.text}</h3>
                        <div class="${p}-control-grid">
                            <div class="${p}-control-item" id="${p}-font-size-btn">
                            <div>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M11.25 17C11.25 17.4142 11.5858 17.75 12 17.75C12.4142 17.75 12.75 17.4142 12.75 17H11.25ZM15.25 9.75C15.25 10.1642 15.5858 10.5 16 10.5C16.4142 10.5 16.75 10.1642 16.75 9.75H15.25ZM7.25 9.75C7.25 10.1642 7.58579 10.5 8 10.5C8.41421 10.5 8.75 10.1642 8.75 9.75H7.25ZM15.7071 7.32544L16.2646 6.82371V6.82371L15.7071 7.32544ZM9.5 16.25C9.08579 16.25 8.75 16.5858 8.75 17C8.75 17.4142 9.08579 17.75 9.5 17.75V16.25ZM15 17.75C15.4142 17.75 15.75 17.4142 15.75 17C15.75 16.5858 15.4142 16.25 15 16.25V17.75ZM10 7.75H12V6.25H10V7.75ZM12 7.75H14V6.25H12V7.75ZM12.75 17V7H11.25V17H12.75ZM15.25 9.22222V9.75H16.75V9.22222H15.25ZM7.25 9.22222V9.75H8.75V9.22222H7.25ZM14 7.75C14.4949 7.75 14.7824 7.75196 14.9865 7.78245C15.0783 7.79617 15.121 7.8118 15.1376 7.8194C15.148 7.82415 15.1477 7.82503 15.1496 7.82716L16.2646 6.82371C15.96 6.4853 15.579 6.35432 15.2081 6.29891C14.8676 6.24804 14.4479 6.25 14 6.25V7.75ZM16.75 9.22222C16.75 8.71757 16.7513 8.27109 16.708 7.91294C16.6629 7.54061 16.559 7.15082 16.2646 6.82371L15.1496 7.82716C15.1523 7.83015 15.1609 7.83939 15.1731 7.87221C15.1873 7.91048 15.2048 7.97725 15.2188 8.09313C15.2487 8.34011 15.25 8.67931 15.25 9.22222H16.75ZM10 6.25C9.55208 6.25 9.13244 6.24804 8.79192 6.29891C8.42102 6.35432 8.04 6.4853 7.73542 6.82371L8.85036 7.82716C8.85228 7.82503 8.85204 7.82415 8.86242 7.8194C8.87904 7.8118 8.92168 7.79617 9.01354 7.78245C9.21765 7.75196 9.50511 7.75 10 7.75V6.25ZM8.75 9.22222C8.75 8.67931 8.75129 8.34011 8.78118 8.09313C8.7952 7.97725 8.81273 7.91048 8.8269 7.87221C8.83905 7.83939 8.84767 7.83015 8.85036 7.82716L7.73542 6.82371C7.44103 7.15082 7.3371 7.54061 7.29204 7.91294C7.24871 8.27109 7.25 8.71757 7.25 9.22222H8.75ZM9.5 17.75H15V16.25H9.5V17.75Z" fill="var(--apex-sdk-primary)"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                            <span>${l.textSize}</span></div></div>
                            <div class="${p}-control-item" id="${p}-line-height-btn">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M4 21H13M20 21H17" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 3H20" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 5.5L15 8.5M12 5.5L9 8.5M12 5.5V18.5M12 18.5L15 15.5M12 18.5L9 15.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            <span>${l.lineHeight}</span></div></div>
                            <div class="${p}-control-item" id="${p}-letter-spacing-btn"><div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M8.25 15.5C8.25 15.9142 8.58579 16.25 9 16.25C9.41421 16.25 9.75 15.9142 9.75 15.5H8.25ZM11.6643 8.75249L12.1624 8.19186L12.1624 8.19186L11.6643 8.75249ZM11.25 10.425C11.25 10.8392 11.5858 11.175 12 11.175C12.4142 11.175 12.75 10.8392 12.75 10.425H11.25ZM11.7475 8.83575L12.3081 8.33756L12.3081 8.33756L11.7475 8.83575ZM6.33575 8.75249L5.83756 8.19186L5.83756 8.19186L6.33575 8.75249ZM5.25 10.425C5.25 10.8392 5.58579 11.175 6 11.175C6.41421 11.175 6.75 10.8392 6.75 10.425H5.25ZM6.25249 8.83575L5.69186 8.33756L5.69186 8.33756L6.25249 8.83575ZM7 14.75C6.58579 14.75 6.25 15.0858 6.25 15.5C6.25 15.9142 6.58579 16.25 7 16.25V14.75ZM11 16.25C11.4142 16.25 11.75 15.9142 11.75 15.5C11.75 15.0858 11.4142 14.75 11 14.75V16.25ZM7.925 9.25H9V7.75H7.925V9.25ZM9 9.25H10.075V7.75H9V9.25ZM9.75 15.5V8.5H8.25V15.5H9.75ZM10.075 9.25C10.5295 9.25 10.8007 9.25137 10.9965 9.27579C11.1739 9.29792 11.1831 9.3283 11.1661 9.31312L12.1624 8.19186C11.8612 7.92419 11.5109 7.82832 11.1822 7.78733C10.8719 7.74863 10.4905 7.75 10.075 7.75V9.25ZM12.75 10.425C12.75 10.0095 12.7514 9.62806 12.7127 9.31782C12.6717 8.98915 12.5758 8.63878 12.3081 8.33756L11.1869 9.33394C11.1717 9.31686 11.2021 9.32608 11.2242 9.50348C11.2486 9.69931 11.25 9.97047 11.25 10.425H12.75ZM11.1661 9.31312C11.1734 9.31964 11.1804 9.32659 11.1869 9.33394L12.3081 8.33756C12.2625 8.28617 12.2138 8.23752 12.1624 8.19186L11.1661 9.31312ZM7.925 7.75C7.50946 7.75 7.12806 7.74863 6.81782 7.78733C6.48914 7.82832 6.13878 7.92419 5.83756 8.19186L6.83394 9.31312C6.81686 9.3283 6.82608 9.29792 7.00348 9.27579C7.19931 9.25137 7.47047 9.25 7.925 9.25V7.75ZM6.75 10.425C6.75 9.97047 6.75137 9.69931 6.77579 9.50348C6.79792 9.32608 6.8283 9.31686 6.81312 9.33394L5.69186 8.33756C5.42419 8.63878 5.32832 8.98915 5.28733 9.31782C5.24863 9.62806 5.25 10.0095 5.25 10.425H6.75ZM5.83756 8.19186C5.78617 8.23752 5.73752 8.28617 5.69186 8.33756L6.81312 9.33394C6.81965 9.3266 6.8266 9.31965 6.83394 9.31312L5.83756 8.19186ZM7 16.25H11V14.75H7V16.25Z" fill="var(--apex-sdk-primary)"/></svg>
                            <span>${l.letterSpacing}</span></div></div>
                            <div class="${p}-control-item" id="${p}-text-align-btn"><div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M21 14L21 2M21 22L21 18" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M11 5L5.5 5C4.56538 5 4.09808 5 3.75 5.20096C3.52197 5.33261 3.33261 5.52197 3.20096 5.75C3 6.09808 3 6.56538 3 7.5C3 8.43462 3 8.90192 3.20096 9.25C3.33261 9.47803 3.52197 9.66739 3.75 9.79904C4.09808 10 4.56538 10 5.5 10L14.5 10C15.4346 10 15.9019 10 16.25 9.79904C16.478 9.66739 16.6674 9.47803 16.799 9.25C17 8.90192 17 8.43462 17 7.5C17 6.56538 17 6.09808 16.799 5.75C16.6674 5.52197 16.478 5.33261 16.25 5.20096C15.9704 5.03954 15.6139 5.00778 15 5.00153" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M17 16.5C17 15.5654 17 15.0981 16.799 14.75C16.6674 14.522 16.478 14.3326 16.25 14.201C15.9019 14 15.4346 14 14.5 14H8.5C7.56538 14 7.09808 14 6.75 14.201C6.52197 14.3326 6.33261 14.522 6.20096 14.75C6 15.0981 6 15.5654 6 16.5C6 17.4346 6 17.9019 6.20096 18.25C6.33261 18.478 6.52197 18.6674 6.75 18.799C7.09808 19 7.56538 19 8.5 19H14.5C15.4346 19 15.9019 19 16.25 18.799C16.478 18.6674 16.6674 18.478 16.799 18.25C17 17.9019 17 17.4346 17 16.5Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/></svg>
                            <span>${l.textAlign}</span></div></div>

                            <div class="${p}-control-item" id="${p}-word-spacing-btn" style="justify-content: space-between; cursor: pointer;">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                        <path d="M3 6H21M3 12H21M3 18H21" stroke="var(--${p}-primary)" stroke-width="2" stroke-linecap="round"/>
                                        <path d="M6 3V9M10 3V9M14 3V9M18 3V9" stroke="var(--${p}-primary)" stroke-width="1.5"/>
                                    </svg>
                                    <span>Normal</span>
                                </div>
                            </div>

                            <div class="${p}-control-item" style="justify-content: space-between;">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                                    <!-- Basit tooltip icon: info balonu -->
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" stroke="var(--${p}-primary)" stroke-width="1.5" fill="none"/>
                                </svg>
                                İpucu</div>
                            <label class="${p}-toggle">
                                <input type="checkbox" id="${p}-tooltip">
                                <span class="${p}-toggle-slider"></span>
                            </label>
                        </div>

                        </div>
                        
                    </section>` : ''}
                    ${config.features.navigationControls ? `
                    <section class="${p}-section">
                        <h3 class="${p}-section-title">${l.navigation}</h3>
                        <div class="${p}-control-grid">
                                <div class="${p}-control-item" id="${p}-reading-mask-btn">
                                <div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M22 3L2 3" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M22 21L18 21M2 21L14 21" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M9 8L8 8C6.11438 8 5.17157 8 4.58579 8.58579C4 9.17157 4 10.1144 4 12C4 13.8856 4 14.8284 4.58579 15.4142C5.17157 16 6.11438 16 8 16H16C17.8856 16 18.8284 16 19.4142 15.4142C20 14.8284 20 13.8856 20 12C20 10.1144 20 9.17157 19.4142 8.58579C18.8284 8 17.8856 8 16 8L13 8" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                                ${l.readingMask}</div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z" fill="var(--apex-sdk-primary)"/><path d="M9 11.08L11 13L15 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                </div>
                                <div class="${p}-control-item" id="${p}-reading-mask-height-btn"><div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M6 9.99739C6.01447 8.29083 6.10921 7.35004 6.72963 6.72963C7.35004 6.10921 8.29083 6.01447 9.99739 6" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M6 14.0007C6.01447 15.7072 6.10921 16.648 6.72963 17.2684C7.35004 17.8888 8.29083 17.9836 9.99739 17.998" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M17.9976 9.99739C17.9831 8.29083 17.8883 7.35004 17.2679 6.72963C16.6475 6.10921 15.7067 6.01447 14.0002 6" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M17.9976 14.0007C17.9831 15.7072 17.8883 16.648 17.2679 17.2684C16.6475 17.8888 15.7067 17.9836 14.0002 17.998" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                                ${l.readingMaskHeight}</div><span></span></div>
                        </div>
                        <div class="${p}-control-grid">

                        <div class="${p}-control-item" id="${p}-reading-guide-btn">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M8.5 7L8.5 14M8.5 14L11 11M8.5 14L6 11" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.5 7L15.5 14M15.5 14L18 11M15.5 14L13 11" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 17H12H6" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"></path><path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"></path></svg>
                        ${l.readingGuide}</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z" fill="var(--apex-sdk-primary)"/><path d="M9 11.08L11 13L15 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div class="${p}-control-item" style="justify-content: space-between;">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M14.1625 18.4876L13.4417 19.2084C11.053 21.5971 7.18019 21.5971 4.79151 19.2084C2.40283 16.8198 2.40283 12.9469 4.79151 10.5583L5.51236 9.8374" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M9.8374 14.1625L14.1625 9.8374" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M9.8374 5.51236L10.5583 4.79151C12.9469 2.40283 16.8198 2.40283 19.2084 4.79151M18.4876 14.1625L19.2084 13.4417C20.4324 12.2177 21.0292 10.604 20.9988 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                        ${l.highlightLinks}</div><label class="${p}-toggle"><input type="checkbox" id="${p}-highlight-links"><span class="${p}-toggle-slider"></span></label></div>
                        <div class="${p}-control-item" style="justify-content: space-between;">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M5.5 10H11.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M6.5 14H10.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path opacity="0.5" d="M15 21L15 3" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                        ${l.highlightHeadings}</div><label class="${p}-toggle"><input type="checkbox" id="${p}-highlight-headings"><span class="${p}-toggle-slider"></span></label></div>
                        ${config.features.textToSpeech ? `<div class="${p}-control-item" style="justify-content: space-between;">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V8Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M11 8H13" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M10 11L14 11" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M20.75 10C20.75 9.58579 20.4142 9.25 20 9.25C19.5858 9.25 19.25 9.58579 19.25 10H20.75ZM4.75 10C4.75 9.58579 4.41421 9.25 4 9.25C3.58579 9.25 3.25 9.58579 3.25 10H4.75ZM15.5121 17.3442C15.1499 17.5452 15.0192 18.0017 15.2202 18.3639C15.4212 18.7261 15.8777 18.8568 16.2399 18.6558L15.5121 17.3442ZM19.25 10V11H20.75V10H19.25ZM4.75 11V10H3.25V11H4.75ZM12 18.25C7.99594 18.25 4.75 15.0041 4.75 11H3.25C3.25 15.8325 7.16751 19.75 12 19.75V18.25ZM19.25 11C19.25 13.7287 17.7429 16.1063 15.5121 17.3442L16.2399 18.6558C18.928 17.1642 20.75 14.2954 20.75 11H19.25Z" fill="var(--apex-sdk-primary)"/><path d="M12 19V22" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                        ${l.textToSpeech}</div><label class="${p}-toggle"><input type="checkbox" id="${p}-text-to-speech"><span class="${p}-toggle-slider"></span></label></div>` : ''}
                        </div>

                        <div class="${p}-control-item" id="${p}-tts-speed-btn" style="justify-content: space-between; cursor: pointer;">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17V7h2v8.83l-4.59-4.58L6 13l4 4z" fill="var(--${p}-primary)"/>
        </svg>
        Ses Hızı: <span>Normal</span>
    </div>
</div>

                        </section>` : ''}
                    ${config.features.appearanceControls ? `
                    <section class="${p}-section">
                        <h3 class="${p}-section-title">${l.appearance}</h3>
                        <div class="${p}-control-grid">
                            <div class="${p}-control-item" id="${p}-brightness-btn">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M12 2V4" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M12 20V22" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M4 12L2 12" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M22 12L20 12" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M19.7778 4.22266L17.5558 6.25424" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M4.22217 4.22266L6.44418 6.25424" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M6.44434 17.5557L4.22211 19.7779" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M19.7778 19.7773L17.5558 17.5551" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                            <span>${l.brightness}</span></div></div>
                            <div class="${p}-control-item" id="${p}-contrast-btn">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M7 8L7 9M7 16L7 12" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M12 12C12 10.8954 12.8954 10 14 10C15.1046 10 16 10.8954 16 12C16 13.1046 15.1046 14 14 14C12.8954 14 12 13.1046 12 12Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M16 10L17 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M11 15L12 14" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M12 10L11 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M17 15L16 14" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                            <span>${l.contrast}</span></div></div>
                            <div class="${p}-control-item" id="${p}-saturation-btn"><div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M3.44668 16C3.15698 15.1183 3 14.1743 3 13.1928V12.9281C3 8.31651 5.72854 4.16347 9.90329 2.42077C11.2473 1.85974 12.7527 1.85974 14.0967 2.42077C18.2715 4.16347 21 8.31651 21 12.9281V13.1928C21 18.0569 17.1445 22 12.3885 22H11.6115C9.46786 22 7.50718 21.199 6 19.8736" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M7.61475 10.7237C8.2495 8.71826 9.63062 7.08805 11.3858 6.27637" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                            <span>${l.saturation}</span></div></div>
                            <div class="${p}-control-item" id="${p}-cursor-btn"><div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M9 4.94198C6.47561 4.02693 5.129 3.65381 4.39141 4.39141C3.55146 5.23136 4.15187 6.86106 5.3527 10.1205L7.3603 15.5696C7.96225 17.2035 8.26322 18.0204 8.92489 18.1658C9.58656 18.3111 10.2022 17.6955 11.4334 16.4643L12.6361 15.2616L16.5744 19.1999C16.9821 19.6077 17.186 19.8116 17.4135 19.9058C17.7168 20.0314 18.0575 20.0314 18.3608 19.9058C18.5882 19.8116 18.7921 19.6077 19.1999 19.1999C19.6077 18.7921 19.8116 18.5882 19.9058 18.3608C20.0314 18.0575 20.0314 17.7168 19.9058 17.4135C19.8116 17.186 19.6077 16.9821 19.1999 16.5744L15.2616 12.6361L16.4643 11.4334C17.6955 10.2022 18.3111 9.58656 18.1658 8.92489C18.0204 8.26322 17.2035 7.96225 15.5696 7.3603L13 6.41359" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            <span>${l.cursor}</span></div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M13.0867 21.3877L13.7321 21.7697L13.0867 21.3877ZM13.6288 20.4718L12.9833 20.0898L13.6288 20.4718ZM10.3712 20.4718L9.72579 20.8539H9.72579L10.3712 20.4718ZM10.9133 21.3877L11.5587 21.0057L10.9133 21.3877ZM1.25 10.5C1.25 10.9142 1.58579 11.25 2 11.25C2.41421 11.25 2.75 10.9142 2.75 10.5H1.25ZM3.07351 15.6264C2.915 15.2437 2.47627 15.062 2.09359 15.2205C1.71091 15.379 1.52918 15.8177 1.68769 16.2004L3.07351 15.6264ZM7.78958 18.9915L7.77666 19.7413L7.78958 18.9915ZM5.08658 18.6194L4.79957 19.3123H4.79957L5.08658 18.6194ZM21.6194 15.9134L22.3123 16.2004V16.2004L21.6194 15.9134ZM16.2104 18.9915L16.1975 18.2416L16.2104 18.9915ZM18.9134 18.6194L19.2004 19.3123H19.2004L18.9134 18.6194ZM19.6125 2.7368L19.2206 3.37628L19.6125 2.7368ZM21.2632 4.38751L21.9027 3.99563V3.99563L21.2632 4.38751ZM4.38751 2.7368L3.99563 2.09732V2.09732L4.38751 2.7368ZM2.7368 4.38751L2.09732 3.99563H2.09732L2.7368 4.38751ZM9.40279 19.2098L9.77986 18.5615L9.77986 18.5615L9.40279 19.2098ZM13.7321 21.7697L14.2742 20.8539L12.9833 20.0898L12.4412 21.0057L13.7321 21.7697ZM9.72579 20.8539L10.2679 21.7697L11.5587 21.0057L11.0166 20.0898L9.72579 20.8539ZM12.4412 21.0057C12.2485 21.3313 11.7515 21.3313 11.5587 21.0057L10.2679 21.7697C11.0415 23.0767 12.9585 23.0767 13.7321 21.7697L12.4412 21.0057ZM10.5 2.75H13.5V1.25H10.5V2.75ZM21.25 10.5V11.5H22.75V10.5H21.25ZM7.8025 18.2416C6.54706 18.2199 5.88923 18.1401 5.37359 17.9265L4.79957 19.3123C5.60454 19.6457 6.52138 19.7197 7.77666 19.7413L7.8025 18.2416ZM1.68769 16.2004C2.27128 17.6093 3.39066 18.7287 4.79957 19.3123L5.3736 17.9265C4.33223 17.4951 3.50486 16.6678 3.07351 15.6264L1.68769 16.2004ZM21.25 11.5C21.25 12.6751 21.2496 13.5189 21.2042 14.1847C21.1592 14.8438 21.0726 15.2736 20.9265 15.6264L22.3123 16.2004C22.5468 15.6344 22.6505 15.0223 22.7007 14.2868C22.7504 13.5581 22.75 12.6546 22.75 11.5H21.25ZM16.2233 19.7413C17.4786 19.7197 18.3955 19.6457 19.2004 19.3123L18.6264 17.9265C18.1108 18.1401 17.4529 18.2199 16.1975 18.2416L16.2233 19.7413ZM20.9265 15.6264C20.4951 16.6678 19.6678 17.4951 18.6264 17.9265L19.2004 19.3123C20.6093 18.7287 21.7287 17.6093 22.3123 16.2004L20.9265 15.6264ZM13.5 2.75C15.1512 2.75 16.337 2.75079 17.2619 2.83873C18.1757 2.92561 18.7571 3.09223 19.2206 3.37628L20.0044 2.09732C19.2655 1.64457 18.4274 1.44279 17.4039 1.34547C16.3915 1.24921 15.1222 1.25 13.5 1.25V2.75ZM22.75 10.5C22.75 8.87781 22.7508 7.6085 22.6545 6.59611C22.5572 5.57256 22.3554 4.73445 21.9027 3.99563L20.6237 4.77938C20.9078 5.24291 21.0744 5.82434 21.1613 6.73809C21.2492 7.663 21.25 8.84876 21.25 10.5H22.75ZM19.2206 3.37628C19.7925 3.72672 20.2733 4.20752 20.6237 4.77938L21.9027 3.99563C21.4286 3.22194 20.7781 2.57144 20.0044 2.09732L19.2206 3.37628ZM10.5 1.25C8.87781 1.25 7.6085 1.24921 6.59611 1.34547C5.57256 1.44279 4.73445 1.64457 3.99563 2.09732L4.77938 3.37628C5.24291 3.09223 5.82434 2.92561 6.73809 2.83873C7.663 2.75079 8.84876 2.75 10.5 2.75V1.25ZM2.75 10.5C2.75 8.84876 2.75079 7.663 2.83873 6.73809C2.92561 5.82434 3.09223 5.24291 3.37628 4.77938L2.09732 3.99563C1.64457 4.73445 1.44279 5.57256 1.34547 6.59611C1.24921 7.6085 1.25 8.87781 1.25 10.5H2.75ZM3.99563 2.09732C3.22194 2.57144 2.57144 3.22194 2.09732 3.99563L3.37628 4.77938C3.72672 4.20752 4.20752 3.72672 4.77938 3.37628L3.99563 2.09732ZM11.0166 20.0898C10.8136 19.7468 10.6354 19.4441 10.4621 19.2063C10.2795 18.9559 10.0702 18.7304 9.77986 18.5615L9.02572 19.8582C9.07313 19.8857 9.13772 19.936 9.24985 20.0898C9.37122 20.2564 9.50835 20.4865 9.72579 20.8539L11.0166 20.0898ZM7.77666 19.7413C8.21575 19.7489 8.49387 19.7545 8.70588 19.7779C8.90399 19.7999 8.98078 19.832 9.02572 19.8582L9.77986 18.5615C9.4871 18.3912 9.18246 18.3215 8.87097 18.287C8.57339 18.2541 8.21375 18.2487 7.8025 18.2416L7.77666 19.7413ZM14.2742 20.8539C14.4916 20.4865 14.6287 20.2564 14.7501 20.0898C14.8622 19.936 14.9268 19.8857 14.9742 19.8582L14.2201 18.5615C13.9298 18.7304 13.7204 18.9559 13.5379 19.2063C13.3646 19.4441 13.1864 19.7468 12.9833 20.0898L14.2742 20.8539ZM16.1975 18.2416C15.7862 18.2487 15.4266 18.2541 15.129 18.287C14.8175 18.3215 14.5129 18.3912 14.2201 18.5615L14.9742 19.8582C15.0192 19.832 15.096 19.7999 15.2941 19.7779C15.5061 19.7545 15.7842 19.7489 16.2233 19.7413L16.1975 18.2416Z" fill="var(--apex-sdk-primary)"/><path d="M9 11.08L11 13L15 9" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </div>


                            
                        <div class="${p}-control-item" id="${p}-font-family-btn" style="justify-content: space-between; cursor: pointer;">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <path d="M3 4H21M3 12H21M3 20H21" stroke="var(--${p}-primary)" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 4V20M18 4V20" stroke="var(--${p}-primary)" stroke-width="2"/>
        </svg>
        Okuma Fontu: <span>Normal</span>
    </div>
</div>

<div class="${p}-control-item" id="${p}-colorblind-btn" style="justify-content: space-between; cursor: pointer;">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--${p}-primary)" stroke-width="2" fill="none"/>
            <circle cx="8" cy="8" r="3" fill="#f00"/>
            <circle cx="12" cy="12" r="3" fill="#0f0"/>
            <circle cx="16" cy="16" r="3" fill="#00f"/>
        </svg>
        Renk Körlüğü: <span>Kapalı</span>
    </div>
</div>

<div class="${p}-control-item" id="${p}-bluelight-btn" style="justify-content: space-between; cursor: pointer;">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none" stroke="var(--${p}-primary)" stroke-width="1.8"/>
            <circle cx="12" cy="12" r="4" fill="var(--${p}-primary)"/>
            <path d="M12 6v2m0 8v2m-6-6h2m8 0h2m-4-6l1.41 1.41m-6.82 6.82L7.17 17.17m9.66-9.66L18.83 6.17M5.17 18.83l1.41-1.41" stroke="var(--${p}-primary)" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
        Mavi Işık Filtresi: <span>Kapalı</span>
    </div>
</div>
                        </div>


                        <div class="${p}-control-grid-1col">
                        <div class="${p}-control-item" style="margin-top: 0.5rem; justify-content: space-between;">
                            <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M7 3.34132C8.47087 2.48824 10.1786 2 12 2C17.5228 2 22 6.48884 22 12.0261C22 20.178 13.8385 14.4192 12.2619 16.9268C11.8674 17.5541 12.2938 18.3364 12.8168 18.8607C13.4703 19.5159 13.4703 20.5781 12.8168 21.2333C12.2938 21.7576 11.5816 22.0709 10.8468 21.9863C5.86713 21.413 2 17.1723 2 12.0261C2 10.1945 2.48985 8.47765 3.34537 7" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><circle cx="17.5" cy="11.5" r="1.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><circle cx="6.5" cy="11.5" r="1.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M11.085 6.99976C11.085 7.82818 10.4134 8.49976 9.58496 8.49976C8.75653 8.49976 8.08496 7.82818 8.08496 6.99976C8.08496 6.17133 8.75653 5.49976 9.58496 5.49976C10.4134 5.49976 11.085 6.17133 11.085 6.99976Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M16 7C16 7.82843 15.3284 8.5 14.5 8.5C13.6716 8.5 13 7.82843 13 7C13 6.17157 13.6716 5.5 14.5 5.5C15.3284 5.5 16 6.17157 16 7Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/></svg>
                            ${l.darkMode}</div><label class="${p}-toggle"><input type="checkbox" id="${p}-dark-mode"><span class="${p}-toggle-slider"></span></label>
                        </div>
                        <div class="${p}-control-item" style="justify-content: space-between;">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M21.1935 16.793C20.8437 19.2739 20.6689 20.5143 19.7717 21.2572C18.8745 22 17.5512 22 14.9046 22H9.09536C6.44881 22 5.12553 22 4.22834 21.2572C3.33115 20.5143 3.15626 19.2739 2.80648 16.793L2.38351 13.793C1.93748 10.6294 1.71447 9.04765 2.66232 8.02383C3.61017 7 5.29758 7 8.67239 7H15.3276C18.7024 7 20.3898 7 21.3377 8.02383C22.0865 8.83268 22.1045 9.98979 21.8592 12" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M19.5617 7C19.7904 5.69523 18.7863 4.5 17.4617 4.5H6.53788C5.21323 4.5 4.20922 5.69523 4.43784 7" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M17.4999 4.5C17.5283 4.24092 17.5425 4.11135 17.5427 4.00435C17.545 2.98072 16.7739 2.12064 15.7561 2.01142C15.6497 2 15.5194 2 15.2588 2H8.74099C8.48035 2 8.35002 2 8.24362 2.01142C7.22584 2.12064 6.45481 2.98072 6.45704 4.00434C6.45727 4.11135 6.47146 4.2409 6.49983 4.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><circle cx="16.5" cy="11.5" r="1.5" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M19.9999 20L17.1157 17.8514C16.1856 17.1586 14.8004 17.0896 13.7766 17.6851L13.5098 17.8403C12.7984 18.2542 11.8304 18.1848 11.2156 17.6758L7.37738 14.4989C6.6113 13.8648 5.38245 13.8309 4.5671 14.4214L3.24316 15.3803" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                        ${l.hideImages}</div><label class="${p}-toggle"><input type="checkbox" id="${p}-hide-images"><span class="${p}-toggle-slider"></span></label></div>
                        <div class="${p}-control-item" style="justify-content: space-between;">
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none"><path d="M15.2683 18.2287C13.2889 20.9067 12.2992 22.2458 11.3758 21.9628C10.4525 21.6798 10.4525 20.0375 10.4525 16.7528L10.4526 16.4433C10.4526 15.2585 10.4526 14.6662 10.074 14.2946L10.054 14.2754C9.6673 13.9117 9.05079 13.9117 7.81775 13.9117C5.59888 13.9117 4.48945 13.9117 4.1145 13.2387C4.10829 13.2276 4.10225 13.2164 4.09639 13.205C3.74244 12.5217 4.3848 11.6526 5.66953 9.91436L8.73167 5.77133C10.711 3.09327 11.7007 1.75425 12.6241 2.03721C13.5474 2.32018 13.5474 3.96249 13.5474 7.24712V7.55682C13.5474 8.74151 13.5474 9.33386 13.926 9.70541L13.946 9.72466C14.3327 10.0884 14.9492 10.0884 16.1822 10.0884C18.4011 10.0884 19.5106 10.0884 19.8855 10.7613C19.8917 10.7724 19.8977 10.7837 19.9036 10.795C20.2576 11.4784 19.6152 12.3475 18.3304 14.0857" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>
                        ${l.stopAnimations}</div><label class="${p}-toggle"><input type="checkbox" id="${p}-stop-animations"><span class="${p}-toggle-slider"></span></label></div>
                        </div>

                        
                    </section>` : ''}
                   
                    </div>
                    <footer class="${p}-menu-footer">
                        <a href="mobildev.com">
                        <span>© Mobildev.com</span>
                        <img src="https://www.mobildev.com/assets/images/logo/logo-03.png" alt="Mobildev">
                        </a>
                    </footer>
                    </div>
                </aside>
             
            `;
            document.body.appendChild(container);
        },

        run: function (config) {
            const p = config.prefix;
            const root = document.documentElement;
            const body = document.body;
            const l = config.textLabels;

            const menu = document.getElementById(`${p}-accessibility-menu`);
            const openBtn = document.getElementById(`${p}-open-menu-btn`);
            const closeBtn = document.getElementById(`${p}-close-menu`);
            const speechToggle = document.getElementById(`${p}-speech-toggle`);


            const defaultSettings = {
                profile: null,
                fontSize: 1,
                lineHeight: 1.5,
                letterSpacing: 0,
                textAlign: 'left',
                readingGuide: false,
                readingMask: false,
                readingMaskHeight: 80,
                highlightLinks: false,
                highlightHeadings: false,
                textToSpeech: false,
                ttsSpeed: 1.0,
                brightness: 100,
                contrastMode: 'normal',
                saturation: 100,
                cursor: false,
                hideImages: false,
                stopAnimations: false,

                darkMode: false,
                tooltip: false,
                wordSpacing: 0,
                colorBlindMode: 'none',   // none | protan | deutan | tritan
                fontFamily: '',
                blueLightFilter: 'off',
            };
            let settings = { ...defaultSettings };

            const contrastStates = [
                { value: 'normal', label: 'Normal', apply: () => { body.classList.remove(`${p}-contrast-light`, `${p}-dark-mode`, `${p}-contrast-high`); root.style.setProperty(`--${p}-contrast`, 1); root.style.setProperty(`--${p}-invert`, 0); } },
                { value: 'invert', label: 'Ters Çevir', apply: () => { body.classList.remove(`${p}-contrast-light`, `${p}-dark-mode`, `${p}-contrast-high`); root.style.setProperty(`--${p}-contrast`, 1); root.style.setProperty(`--${p}-invert`, 1); } },
                { value: 'light', label: 'Açık Kontrast', apply: () => { body.classList.remove(`${p}-dark-mode`, `${p}-contrast-high`); body.classList.add(`${p}-contrast-light`); root.style.setProperty(`--${p}-contrast`, 1); root.style.setProperty(`--${p}-invert`, 0); } },
                { value: 'dark', label: 'Koyu Kontrast', apply: () => { body.classList.remove(`${p}-contrast-light`, `${p}-contrast-high`); body.classList.add(`${p}-dark-mode`); root.style.setProperty(`--${p}-contrast`, 1); root.style.setProperty(`--${p}-invert`, 0); } },
                { value: 'high', label: 'Yüksek Kontrast', apply: () => { body.classList.remove(`${p}-contrast-light`, `${p}-dark-mode`); body.classList.add(`${p}-contrast-high`); root.style.setProperty(`--${p}-contrast`, 1.5); root.style.setProperty(`--${p}-invert`, 0); } }
            ];
            const speech = { synth: window.speechSynthesis, utterance: null, isSpeaking: false };
            let isTracking = false;
            let timeout;

            // --- Yardımcı Fonksiyonlar ---
            const save = () => localStorage.setItem(config.localStorageKey, JSON.stringify(settings));
            const applySettings = () => {
                root.style.setProperty(`--${p}-font-size`, `${settings.fontSize}rem`);
                root.style.setProperty(`--${p}-line-height`, settings.lineHeight);
                root.style.setProperty(`--${p}-letter-spacing`, `${settings.letterSpacing}em`);
                root.style.setProperty(`--${p}-text-align`, settings.textAlign);

                root.style.setProperty(`--${p}-animation-state`, settings.stopAnimations ? 'paused' : 'running');
                root.style.setProperty(`--${p}-image-opacity`, settings.hideImages ? '0' : '1');
                root.style.setProperty(`--${p}-reading-guide`, settings.readingGuide ? 'block' : 'none');
                root.style.setProperty(`--${p}-brightness`, `${settings.brightness}%`);
                root.style.setProperty(`--${p}-saturate`, `${settings.saturation}%`);
                // root.style.setProperty(`--${p}-reading-mask-height`, `${settings.readingMaskHeight}px`);

                contrastStates.find(s => s.value === settings.contrastMode).apply();

                // body.classList.toggle(`${p}-reading-guide-links`, settings.readingGuide);
                // isTracking = settings.readingGuide;
                body.classList.toggle(`${p}-highlight-links`, settings.highlightLinks);
                body.classList.toggle(`${p}-highlight-headings`, settings.highlightHeadings);
                body.classList.toggle(`${p}-big-cursor-active`, settings.cursor);

                // Word Spacing


                // Tooltip checkbox’ı da buradan tekrar set ediyoruz (garanti olsun)
                const tooltipToggle = document.getElementById(`${p}-tooltip`);
                if (tooltipToggle) tooltipToggle.checked = settings.tooltip;

                // maskTop.style.display = settings.readingMask ? 'block' : 'none';
                // maskBottom.style.display = settings.readingMask ? 'block' : 'none';

                readingOverlay.style.display = settings.readingMask ? 'block' : 'none';
                if (settings.readingMask) {
                    updateReadingMask(); // Hemen pozisyonla
                }

                settings.darkMode ? document.body.classList.add(`${p}-dark-mode`) : document.body.classList.remove(`${p}-dark-mode`);


                // UI kontrollerini güncelle

                document.getElementById(`${p}-highlight-links`).checked = settings.highlightLinks;
                document.getElementById(`${p}-highlight-headings`).checked = settings.highlightHeadings;
                document.getElementById(`${p}-text-to-speech`).checked = settings.textToSpeech;
                document.getElementById(`${p}-dark-mode`).checked = settings.darkMode;
                document.getElementById(`${p}-hide-images`).checked = settings.hideImages;
                document.getElementById(`${p}-stop-animations`).checked = settings.stopAnimations;

                const fsBtn = document.getElementById(`${p}-font-size-btn`); if (fsBtn) fsBtn.querySelector('span').textContent = [{ value: 1, label: l.textSize }, { value: 1.2, label: l.textSize }, { value: 1.4, label: l.textSize }, { value: 1.6, label: l.textSize }, { value: 1.8, label: l.textSize }].find(v => v.value === settings.fontSize).label;
                const lhBtn = document.getElementById(`${p}-line-height-btn`); if (lhBtn) lhBtn.querySelector('span').textContent = [{ value: 1.2, label: 'Sıkışık' }, { value: 1.5, label: 'Normal' }, { value: 1.8, label: 'Geniş' }, { value: 2.2, label: 'Geniş+' }].find(v => v.value === settings.lineHeight).label;
                const lsBtn = document.getElementById(`${p}-letter-spacing-btn`); if (lsBtn) lsBtn.querySelector('span').textContent = [{ value: 0, label: 'Normal' }, { value: 0.05, label: 'Açık' }, { value: 0.1, label: 'Açık+' }, { value: 0.2, label: 'Açık++' }].find(v => v.value === settings.letterSpacing).label;
                const taBtn = document.getElementById(`${p}-text-align-btn`); if (taBtn) taBtn.querySelector('span').textContent = [{ value: 'left', label: 'Sol' }, { value: 'center', label: 'Orta' }, { value: 'right', label: 'Sağ' }, { value: 'justify', label: 'Yasla' }].find(v => v.value === settings.textAlign).label;
                const brBtn = document.getElementById(`${p}-brightness-btn`); if (brBtn) brBtn.querySelector('span').textContent = [{ value: 80, label: 'Loş' }, { value: 100, label: l.brightness }, { value: 120, label: l.brightness }, { value: 150, label: l.brightness }].find(v => v.value === settings.brightness).label;
                const coBtn = document.getElementById(`${p}-contrast-btn`); if (coBtn) coBtn.querySelector('span').textContent = contrastStates.find(s => s.value === settings.contrastMode).label;
                const saBtn = document.getElementById(`${p}-saturation-btn`); if (saBtn) saBtn.querySelector('span').textContent = [{ value: 50, label: 'Düşük Renk' }, { value: 100, label: 'Normal' }, { value: 150, label: 'Yüksek Renk' }, { value: 0, label: 'Siyah Beyaz' }].find(v => v.value === settings.saturation).label;


                // Kelime Aralığı - Cycle Button
                const wsBtn = document.getElementById(`${p}-word-spacing-btn`);
                if (wsBtn) {
                    const levels = [
                        { value: 0, label: 'Normal' },
                        { value: 0.1, label: 'Açık' },
                        { value: 0.2, label: 'Açık+' },
                        { value: 0.4, label: 'Çok Açık' }
                    ];
                    const current = levels.find(l => l.value === settings.wordSpacing) || levels[0];
                    wsBtn.querySelector('span').textContent = current.label;
                    root.style.setProperty(`--${p}-word-spacing`, `${settings.wordSpacing}em`);
                }

                const rmhBtn = document.getElementById(`${p}-reading-mask-height-btn`);
                if (rmhBtn) rmhBtn.querySelector('span').textContent = `${settings.readingMaskHeight}px`;

                const rgBtn = document.getElementById(`${p}-reading-guide-btn`); if (rgBtn) rgBtn.dataset.action = settings.readingGuide ? 'active' : 'passive';
                const rmBtn = document.getElementById(`${p}-reading-mask-btn`); if (rmBtn) rmBtn.dataset.action = settings.readingMask ? 'active' : 'passive';
                const cuBtn = document.getElementById(`${p}-cursor-btn`); if (cuBtn) cuBtn.dataset.action = settings.cursor ? 'active' : 'passive';

                document.querySelectorAll(`.${p}-profile-card`).forEach(c => { c.classList.toggle('active', c.dataset.profile === settings.profile); c.setAttribute('aria-pressed', c.dataset.profile === settings.profile); });

                isTracking = settings.readingGuide || settings.readingMask;

                if (settings.tooltip) {
                    // Tooltip etkinse, document'e event listener ekle (ama duplicate olmasın diye kontrol et)
                    if (!document.__tooltipListenerAdded) {
                        document.addEventListener('mouseover', handleTooltipMouseOver, { passive: true });
                        document.__tooltipListenerAdded = true;
                    }
                } else {
                    // Tooltip kapalıysa, listener'ı kaldır
                    if (document.__tooltipListenerAdded) {
                        document.removeEventListener('mouseover', handleTooltipMouseOver);
                        document.__tooltipListenerAdded = false;
                        // Mevcut tooltip'leri temizle
                        document.querySelectorAll(`.${p}-tooltip`).forEach(tooltip => tooltip.remove());
                        // Parent'lerden relative'i temizle
                        document.querySelectorAll(`.${p}-tooltip-parent`).forEach(el => {
                            el.classList.remove(`${p}-tooltip-parent`);
                        });
                    }
                }





                // Font Seçici
                const fontBtn = document.getElementById(`${p}-font-family-btn`);
                if (fontBtn) {
                    const fonts = [
                        { value: 'inter', label: 'Normal' },
                        { value: 'atkinson', label: 'Atkinson' },
                        { value: 'dyslexic', label: 'Disleksi' },
                        { value: 'bionic', label: 'Bionic' }
                    ];
                    const current = fonts.find(f => f.value === settings.fontFamily) || fonts[0];
                    fontBtn.querySelector('span').textContent = current.label;

                    // Tüm font sınıflarını kaldır
                    document.body.classList.remove(
                        `${p}-font-inter`,
                        `${p}-font-atkinson`,
                        `${p}-font-dyslexic`,
                        `${p}-font-bionic`
                    );

                    // Yeni fontu ekle
                    document.body.classList.add(`${p}-font-${settings.fontFamily}`);

                    // Bionic Reading için otomatik kalınlaştırma (isteğe bağlı, çok güçlü!)
                    if (settings.fontFamily === 'bionic') {
                        document.querySelectorAll('p, li, h1, h2, h3, h4, h5, h6, div, span').forEach(el => {
                            if (el.children.length === 0 && el.textContent.trim()) {
                                const words = el.textContent.split(' ');
                                el.innerHTML = words.map(word => {
                                    const half = Math.ceil(word.length / 2);
                                    return `<span class="bionic-word">${word.slice(0, half)}</span>${word.slice(half)}`;
                                }).join(' ');
                            }
                        });
                    }
                }



                // Renk Körlüğü Modu v2 — CSS-Only
                const cbBtn = document.getElementById(`${p}-colorblind-btn`);
                if (cbBtn) {
                    const modes = [
                        { value: 'none', label: 'Kapalı' },
                        { value: 'protanopia', label: 'Protanopi' },
                        { value: 'deuteranopia', label: 'Deuteranopi' },
                        { value: 'tritanopia', label: 'Tritanopi' }
                    ];
                    const current = modes.find(m => m.value === settings.colorBlindMode) || modes[0];
                    cbBtn.querySelector('span').textContent = current.label;

                    // Tüm sınıfları temizle
                    document.body.classList.remove(
                        `${p}-cb-protanopia`,
                        `${p}-cb-deuteranopia`,
                        `${p}-cb-tritanopia`
                    );

                    // Yeni sınıfı ekle
                    if (settings.colorBlindMode !== 'none') {
                        document.body.classList.add(`${p}-cb-${settings.colorBlindMode}`);
                    }
                }

                // TTS Hız Kontrolü - Cycle Button
                const speedBtn = document.getElementById(`${p}-tts-speed-btn`);
                if (speedBtn) {
                    const speeds = [
                        { value: 0.7, label: 'Yavaş' },
                        { value: 1.0, label: 'Normal' },
                        { value: 1.5, label: 'Hızlı' },
                        { value: 2.0, label: 'Çok Hızlı' }
                    ];
                    const current = speeds.find(s => s.value === settings.ttsSpeed) || speeds[1];
                    speedBtn.querySelector('span').textContent = current.label;

                    // Aktif TTS varsa anında uygula
                    if (speech.isSpeaking && speech.utterance) {
                        const wasSpeaking = speech.isSpeaking;
                        const text = speech.utterance.text;
                        const pos = speech.synth.getVoices().length > 0 ? speech.synth.speaking ? speech.utterance.charIndex : 0 : 0;

                        speech.synth.cancel();
                        speech.utterance = new SpeechSynthesisUtterance(text);
                        speech.utterance.lang = 'tr-TR';
                        speech.utterance.rate = settings.ttsSpeed;
                        speech.synth.speak(speech.utterance);
                    }
                }


                // Mavi Işık Filtresi - Cycle Button
                const blBtn = document.getElementById(`${p}-bluelight-btn`);
                if (blBtn) {
                    const levels = [
                        { value: 'off', label: 'Kapalı' },
                        { value: 'low', label: 'Hafif' },
                        { value: 'medium', label: 'Orta' },
                        { value: 'high', label: 'Yoğun' }
                    ];
                    const current = levels.find(l => l.value === settings.blueLightFilter) || levels[0];
                    blBtn.querySelector('span').textContent = current.label;

                    // Tüm sınıfları temizle
                    document.body.classList.remove(
                        `${p}-bluelight-low`,
                        `${p}-bluelight-medium`,
                        `${p}-bluelight-high`
                    );

                    // Yeni sınıfı ekle
                    if (settings.blueLightFilter !== 'off') {
                        document.body.classList.add(`${p}-bluelight-${settings.blueLightFilter}`);
                    }
                }

                save();

            };

            const load = () => {
                const saved = localStorage.getItem(config.localStorageKey);
                if (saved) {
                    settings = { ...defaultSettings, ...JSON.parse(saved) };
                }
                applySettings();
            };

            // --- Event Listeners ---
            const toggleMenu = () => { menu.classList.toggle('open'); };
            openBtn.onclick = toggleMenu;
            closeBtn.onclick = toggleMenu;
            document.addEventListener('keydown', e => { if (e.altKey && e.key.toLowerCase() === 'm') { e.preventDefault(); toggleMenu(); } if (e.key === 'Escape' && menu.classList.contains('open')) { toggleMenu(); } });

            function removeClassByPrefix(element, prefix) {
                element.classList.forEach(cls => {
                    if (cls.startsWith(prefix)) {
                        element.classList.remove(cls);
                    }
                });
            }

            function createCircleSegments(segmentCount, prgContainer, options = {}) {
                const gap = options.gap || 8;
                const size = options.size || 40;
                const strokeWidth = options.strokeWidth || 4;
                const activeColor = options.activeColor || "orange";
                const inactiveColor = options.inactiveColor || "lightgray";
                const radius = (size / 2) - strokeWidth;
                const center = size / 2;

                // Eğer parent içinde SVG varsa sil
                const existingSVG = prgContainer.querySelector('svg.crlc-prgs');
                if (existingSVG) prgContainer.removeChild(existingSVG);

                const svgNS = "http://www.w3.org/2000/svg";
                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("class", "crlc-prgs");
                svg.setAttribute("width", size);
                svg.setAttribute("height", size);
                svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

                const circumference = 2 * Math.PI * radius;
                const segmentLength = (circumference / segmentCount) - gap;

                const circles = [];

                for (let i = 0; i < segmentCount; i++) {
                    const circle = document.createElementNS(svgNS, "circle");
                    circle.setAttribute("cx", center);
                    circle.setAttribute("cy", center);
                    circle.setAttribute("r", radius);
                    circle.setAttribute("fill", "none");
                    circle.setAttribute("stroke-width", strokeWidth);
                    circle.setAttribute("stroke-linecap", "round");
                    circle.setAttribute("stroke", inactiveColor);

                    circle.setAttribute(
                        "stroke-dasharray",
                        `${segmentLength} ${circumference - segmentLength}`
                    );

                    const offset = i * (circumference / segmentCount);
                    circle.setAttribute("stroke-dashoffset", -offset);

                    svg.appendChild(circle);
                    circles.push(circle);
                }

                prgContainer.appendChild(svg);

                function updateValue(value) {

                    for (let i = 0; i < circles.length; i++) {
                        circles[i].setAttribute("stroke", i < value ? activeColor : inactiveColor);
                    }
                }

                return { svg, updateValue };
            }

            const setupCycleButton = (btnId, values, settingKey) => {
                const btn = document.getElementById(btnId);
                const segmentCount = values.length;

                const currentIndex2 = values.findIndex(v => v.value === settings[settingKey]);
                let step = currentIndex2 + 1;
                const segmentBar = createCircleSegments(segmentCount, btn, { size: 40, activeColor: '#4361ee' })
                segmentBar.updateValue(step);

                if (!btn) return;
                btn.onclick = () => {
                    const currentIndex = values.findIndex(v => v.value === settings[settingKey]);

                    step = (step + 1) % (segmentCount + 1);
                    segmentBar.updateValue(step);

                    removeClassByPrefix(btn, 'level');
                    btn.classList.add("level-" + currentIndex);
                    const nextIndex = (currentIndex + 1) % values.length;
                    settings[settingKey] = values[nextIndex].value;
                    applySettings();
                };
            };
            setupCycleButton(`${p}-font-size-btn`, [{ value: 1, label: l.textSize }, { value: 1.2, label: l.textSize + '+' }, { value: 1.4, label: l.textSize + '++' }, { value: 1.6, label: l.textSize + '+++' }, { value: 1.8, label: l.textSize + '++++' }], 'fontSize');
            setupCycleButton(`${p}-line-height-btn`, [{ value: 1.2, label: 'Sıkışık' }, { value: 1.5, label: 'Normal' }, { value: 1.8, label: 'Geniş' }, { value: 2.2, label: 'Geniş+' }], 'lineHeight');
            setupCycleButton(`${p}-letter-spacing-btn`, [{ value: 0, label: 'Normal' }, { value: 0.05, label: 'Açık' }, { value: 0.1, label: 'Açık+' }, { value: 0.2, label: 'Açık++' }], 'letterSpacing');
            setupCycleButton(`${p}-text-align-btn`, [{ value: 'left', label: 'Sol' }, { value: 'center', label: 'Orta' }, { value: 'right', label: 'Sağ' }, { value: 'justify', label: 'Yasla' }], 'textAlign');
            setupCycleButton(`${p}-brightness-btn`, [{ value: 80, label: 'Loş' }, { value: 100, label: l.brightness }, { value: 120, label: l.brightness + '+' }, { value: 150, label: l.brightness + '++' }], 'brightness');
            setupCycleButton(`${p}-contrast-btn`, contrastStates, 'contrastMode');
            setupCycleButton(`${p}-saturation-btn`, [{ value: 50, label: 'Düşük Renk' }, { value: 100, label: 'Normal' }, { value: 150, label: 'Yüksek Renk' }, { value: 0, label: 'Siyah Beyaz' }], 'saturation');


            setupCycleButton(`${p}-word-spacing-btn`, [
                { value: 0, label: 'Normal' },
                { value: 0.1, label: 'Açık' },
                { value: 0.2, label: 'Açık+' },
                { value: 0.4, label: 'Çok Açık' }
            ], 'wordSpacing');



            setupCycleButton(`${p}-font-family-btn`, [
                { value: 'inter', label: 'Normal' },
                { value: 'atkinson', label: 'Atkinson' },
                { value: 'dyslexic', label: 'Disleksi' },
                { value: 'bionic', label: 'Bionic' }
            ], 'fontFamily');


            setupCycleButton(`${p}-colorblind-btn`, [
                { value: 'none', label: 'Kapalı' },
                { value: 'protanopia', label: 'Protanopi' },
                { value: 'deuteranopia', label: 'Deuteranopi' },
                { value: 'tritanopia', label: 'Tritanopi' }
            ], 'colorBlindMode');


            setupCycleButton(`${p}-tts-speed-btn`, [
                { value: 0.7, label: 'Yavaş' },
                { value: 1.0, label: 'Normal' },
                { value: 1.5, label: 'Hızlı' },
                { value: 2.0, label: 'Çok Hızlı' }
            ], 'ttsSpeed');


            setupCycleButton(`${p}-bluelight-btn`, [
                { value: 'off', label: 'Kapalı' },
                { value: 'low', label: 'Hafif' },
                { value: 'medium', label: 'Orta' },
                { value: 'high', label: 'Yoğun' }
            ], 'blueLightFilter');

            const setupToggle = (id, setting) => {
                const toggle = document.getElementById(id);
                if (!toggle)
                    return;

                toggle.checked = settings[setting];

                toggle.onchange = () => {
                    settings[setting] = toggle.checked; applySettings();
                };
            };



            setupToggle(`${p}-reading-guide-links`, 'readingGuide');
            setupToggle(`${p}-highlight-links`, 'highlightLinks');
            setupToggle(`${p}-highlight-headings`, 'highlightHeadings');
            setupToggle(`${p}-text-to-speech`, 'textToSpeech');
            setupToggle(`${p}-dark-mode`, 'darkMode');
            setupToggle(`${p}-hide-images`, 'hideImages');
            setupToggle(`${p}-stop-animations`, 'stopAnimations');

            setupToggle(`${p}-tooltip`, 'tooltip');        // zaten vardı ama garanti olsun

            const cursorBtn = document.getElementById(`${p}-cursor-btn`);
            if (cursorBtn) cursorBtn.onclick = () => { settings.cursor = !settings.cursor; applySettings(); };



            function updateGuideLine(y, winH) {
                const pos = y; // % yerine doğrudan px
                document.querySelector(`.${p}-reading-guide`).style.top = `${pos}px`;
            }


            let lastMouseY = window.innerHeight / 2 + window.scrollY;


            const readingOverlay = document.querySelector(`.${p}-reading-overlay`)

            function updateReadingMask() {
                // lastMouseY artık MUTLAK Y (sayfa içi + scrollY)
                const currentY = lastMouseY;

                // Reading Guide (çizgi)
                if (settings.readingGuide) {
                    const guide = document.querySelector(`.${p}-reading-guide`);
                    if (guide) guide.style.top = `${currentY}px`;
                }

                // Reading Mask
                if (!settings.readingMask) {
                    readingOverlay.style.display = 'none';
                    return;
                }

                readingOverlay.style.display = 'block';
                readingOverlay.style.top = `${currentY}px`;
                readingOverlay.style.height = `${settings.readingMaskHeight}px`;
            }


            const readingMaskHeightBtn = document.getElementById(`${p}-reading-mask-height-btn`);
            if (readingMaskHeightBtn) {
                const values = [80, 100, 150, 200, 250, 300];

                readingMaskHeightBtn.onclick = () => {
                    const currentIndex = values.indexOf(settings.readingMaskHeight);
                    settings.readingMaskHeight = values[(currentIndex + 1) % values.length];

                    applySettings();
                    updateReadingMask();
                };
            }

            const readingGuideBtn = document.getElementById(`${p}-reading-guide-btn`);
            if (readingGuideBtn) readingGuideBtn.onclick = () => { settings.readingGuide = !settings.readingGuide; isTracking = settings.readingGuide || settings.readingMask; applySettings(); };
            const readingMaskBtn = document.getElementById(`${p}-reading-mask-btn`);
            if (readingMaskBtn) readingMaskBtn.onclick = () => { settings.readingMask = !settings.readingMask; isTracking = settings.readingGuide || settings.readingMask; applySettings(); };

            let lastRun = 0;
            let isRafRunning = false;
            let maskRAF = false;
            const handleMouseMove = (e) => {
                if (!isTracking) return;

                const now = performance.now();
                if (now - lastRun < 10) return;
                lastRun = now;

                lastMouseY = e.clientY + window.scrollY;

                if (!isRafRunning) {
                    isRafRunning = true;

                    requestAnimationFrame(() => {
                        if (!maskRAF) {
                            maskRAF = true;
                            requestAnimationFrame(() => {
                                updateReadingMask();
                                maskRAF = false;
                            });
                        }

                        isRafRunning = false;
                    });
                }
            };

            function handleTooltipMouseOver(event) {
                if (!settings.tooltip) return;

                const target = event.target;
                let tipText = '';

                // 1. aria-label varsa onu al
                if (target.hasAttribute('aria-label')) {
                    tipText = target.getAttribute('aria-label');
                }
                // 2. img ise alt text
                else if (target.tagName === 'IMG' && target.hasAttribute('alt') && target.alt.trim() !== '') {
                    tipText = target.alt;
                }
                // 3. title attribute varsa (fallback)
                else if (target.hasAttribute('title') && target.title.trim() !== '') {
                    tipText = target.title;
                }
                // 4. Yoksa text node'dan al (eski davranış)
                else {
                    const textNode = Array.from(target.childNodes).find(node =>
                        node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
                    );
                    if (textNode) {
                        tipText = textNode.textContent.trim();
                    } else {
                        return; // Hiçbir şey yoksa çık
                    }
                }

                // Tooltip zaten varsa çık (performans)
                if (target.querySelector(`.${p}-tooltip`)) return;

                // Parent relative yap (gerekirse)

                // Tooltip oluştur
                const tooltip = document.createElement('div');
                tooltip.className = `${p}-tooltip`;
                tooltip.innerHTML = `<div class="${p}-tooltip-content">${tipText}</div>`;
                // target.appendChild(tooltip);
                document.body.appendChild(tooltip);

                // Mouse takip
                const handleMouseMoveTooltip = (e) => {
                    // tooltip.style.top = `${e.clientY - target.getBoundingClientRect().top + window.scrollY + 15}px`;
                    // tooltip.style.left = `${e.clientX - target.getBoundingClientRect().left + window.scrollX + 15}px`;
                    // tooltip.classList.add('show');

                    tooltip.style.position = 'fixed';  // ← ANAHTAR DEĞİŞİKLİK!
                    tooltip.style.top = `${e.pageY + 15}px`;
                    tooltip.style.left = `${e.pageX + 15}px`;
                    tooltip.classList.add('show');
                };

                target.addEventListener('mousemove', handleMouseMoveTooltip, { passive: true });

                // Mouse çıkınca temizle
                const handleMouseOut = () => {
                    if (tooltip && tooltip.parentNode) {
                        tooltip.remove(); // body'den kaldır
                    }
                    ;
                    target.removeEventListener('mousemove', handleMouseMoveTooltip);
                    target.removeEventListener('mouseout', handleMouseOut);
                };

                target.addEventListener('mouseout', handleMouseOut, { passive: true });
            }

            // Toggle setup - Yeni Eklenen
            setupToggle(`${p}-tooltip`, 'tooltip');

            document.addEventListener('mousemove', handleMouseMove);

            window.addEventListener('scroll', () => {
                if (settings.readingMask || settings.readingGuide) {
                    // lastMouseY'yi güncellemek için son mouse pozisyonunu kullan, ama tam track için mousemove yeterli
                    updateReadingMask();
                }
            }, { passive: true }); // Performans için passive

            window.addEventListener('resize', () => {
                if (settings.readingMask || settings.readingGuide) {
                    updateReadingMask();
                }
            });


            const speakText = (text) => {
                speech.synth.cancel();
                speech.utterance = new SpeechSynthesisUtterance(text);
                speech.utterance.lang = 'tr-TR';
                speech.utterance.rate = settings.ttsSpeed;
                speech.utterance.onstart = () => { speech.isSpeaking = true; speechToggle.classList.add('playing'); speechToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M8 9.5C8 9.03406 8 8.80109 8.07612 8.61732C8.17761 8.37229 8.37229 8.17761 8.61732 8.07612C8.80109 8 9.03406 8 9.5 8C9.96594 8 10.1989 8 10.3827 8.07612C10.6277 8.17761 10.8224 8.37229 10.9239 8.61732C11 8.80109 11 9.03406 11 9.5V14.5C11 14.9659 11 15.1989 10.9239 15.3827C10.8224 15.6277 10.6277 15.8224 10.3827 15.9239C10.1989 16 9.96594 16 9.5 16C9.03406 16 8.80109 16 8.61732 15.9239C8.37229 15.8224 8.17761 15.6277 8.07612 15.3827C8 15.1989 8 14.9659 8 14.5V9.5Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M13 9.5C13 9.03406 13 8.80109 13.0761 8.61732C13.1776 8.37229 13.3723 8.17761 13.6173 8.07612C13.8011 8 14.0341 8 14.5 8C14.9659 8 15.1989 8 15.3827 8.07612C15.6277 8.17761 15.8224 8.37229 15.9239 8.61732C16 8.80109 16 9.03406 16 9.5V14.5C16 14.9659 16 15.1989 15.9239 15.3827C15.8224 15.6277 15.6277 15.8224 15.3827 15.9239C15.1989 16 14.9659 16 14.5 16C14.0341 16 13.8011 16 13.6173 15.9239C13.3723 15.8224 13.1776 15.6277 13.0761 15.3827C13 15.1989 13 14.9659 13 14.5V9.5Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/><path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/></svg>'; };
                speech.utterance.onend = () => { speech.isSpeaking = false; speechToggle.classList.remove('playing'); speechToggle.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round"/><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2" stroke="var(--apex-sdk-primary)" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="4 3"/><path d="M15.4137 10.941C16.1954 11.4026 16.1954 12.5974 15.4137 13.059L10.6935 15.8458C9.93371 16.2944 9 15.7105 9 14.7868L9 9.21316C9 8.28947 9.93371 7.70561 10.6935 8.15419L15.4137 10.941Z" stroke="var(--apex-sdk-primary)" stroke-width="1.5"/></svg>'; speechToggle.style.display = 'none'; window.getSelection().removeAllRanges(); };
                speech.synth.speak(speech.utterance);
            };
            document.addEventListener('mouseup', (e) => { if (e.target.closest(`.${p}-speech-toggle`)) return; const selection = window.getSelection(); const selectedText = selection.toString().trim(); if (selectedText.length > 0 && settings.textToSpeech) { const rect = selection.getRangeAt(0).getBoundingClientRect(); speechToggle.style.left = `${rect.right + 10}px`; speechToggle.style.top = `${rect.top + window.scrollY}px`; speechToggle.style.display = 'flex'; speakText(selectedText); } else { speechToggle.style.display = 'none'; speech.synth.cancel(); } });
            speechToggle.onclick = () => { if (speech.isSpeaking) speech.synth.cancel(); else { const selection = window.getSelection(); if (selection.toString().trim()) speakText(selection.toString().trim()); } };

            document.querySelectorAll(`.${p}-profile-card`).forEach(card => {
                const activateProfile = () => {
                    const profile = card.dataset.profile;
                    if (settings.profile === profile) { settings = { ...defaultSettings }; settings.profile = null; } else { settings = { ...defaultSettings }; settings.profile = profile; }
                    const profiles = {
                        epilepsy: () => { settings.stopAnimations = true; },
                        lowvision: () => { settings.fontSize = 1.4; settings.contrastMode = 'high'; },
                        adhd: () => { settings.readingGuide = true; settings.readingMask = true; },
                        blind: () => { settings.hideImages = true; settings.textToSpeech = true; settings.highlightLinks = true; settings.highlightHeadings = true; },
                        dyslexia: () => {
                            settings.fontFamily = "dyslexic";
                            settings.lineHeight = 1.8;
                            settings.letterSpacing = 0.1;
                        },
                        elderly: () => { settings.fontSize = 1.2; settings.lineHeight = 1.8; settings.contrastMode = 'high'; }
                    };
                    if (profiles[profile]) profiles[profile]();
                    applySettings();
                };
                card.onclick = activateProfile;
                card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activateProfile(); } };
            });
            document.getElementById(`${p}-reset-all`).onclick = () => { localStorage.removeItem(config.localStorageKey); settings = { ...defaultSettings }; applySettings(); };

            load();
        },

        // Yardımcı fonksiyon
        hexToRgba: function (hex, alpha) {
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    };

    // SDK'yı global alana ekle
    global.ApexAccessibilitySDK = ApexAccessibilitySDK;

}(window));