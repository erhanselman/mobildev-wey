function TextScaler(options) {
    options = options || {};

    this.options = {
        selectors: options.selectors || 'h1,h2,h3,h4,h5,h6,p,span,div,li,a,button,label,td,th,blockquote,figcaption,article,section,strong,em,code,pre',
        storageKey: options.storageKey || 'textScalerSettings',
        autoInit: typeof options.autoInit === 'boolean' ? options.autoInit : true,
        minFontSize: options.minFontSize || 8
    };

    this.settings = {
        fontSize: 1.0,
        lineHeight: 1.2,
        letterSpacing: 1,
        wordSpacing: 1,
        textAlign: 'inherit',
        readingMode: false
    };

    this.elements = new Map();
    this.originalStyles = new Map();

    if (this.options.autoInit) this.init();
}

TextScaler.prototype.init = function () {
    var els = Array.from(document.querySelectorAll(this.options.selectors))
    .filter(el => !el.closest(".apex-sdk-accessibility-menu"));
    var self = this;
  
    els.forEach(function (el) {
        if (self.elements.has(el)) return;

        var style = window.getComputedStyle(el);
        var original = {
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            letterSpacing: style.letterSpacing,
            wordSpacing: style.wordSpacing,
            textAlign: style.textAlign,
        };

        function parse(val) {
            if (!val) return null;
            var m = val.match(/^([\d.]+)([a-z%]*)$/);
            return m ? { value: parseFloat(m[1]), unit: m[2] || 'px' } : null;
        }

        var fs = parse(original.fontSize);
        var lh = parse(original.lineHeight) || { value: 1.5, unit: '' };
        var lsRaw = style.letterSpacing;
        if (lsRaw === "normal") {
            lsRaw = "0px";
        }
        var lsParse = lsRaw.match(/^(-?[\d.]+)([a-z%]*)$/);
        var ls = {
            value: lsParse ? parseFloat(lsParse[1]) : 0,
            unit: lsParse && lsParse[2] ? lsParse[2] : "px"
        };
        var wsRaw = style.wordSpacing;
        if (wsRaw === "normal") {
            wsRaw = "0px";
        }
        var wsParse = wsRaw.match(/^(-?[\d.]+)([a-z%]*)$/);
        var ws = {
            value: wsParse ? parseFloat(wsParse[1]) : 0,
            unit: wsParse && wsParse[2] ? wsParse[2] : "px"
        };

        if (fs) {
            self.originalStyles.set(el, {
                fontSize: fs,
                lineHeight: lh,
                letterSpacing: ls,
                wordSpacing: ws,
                textAlign: original.textAlign,
            });

            self.elements.set(el, true);
        }
    });

    this.loadSettings();
    this.applyAll();
};

TextScaler.prototype.applyAll = function () {
    var self = this;

    this.originalStyles.forEach(function (orig, el) {

        var newFont = orig.fontSize.value * self.settings.fontSize;
        if (newFont < self.options.minFontSize) newFont = self.options.minFontSize;
        el.style.fontSize = newFont + orig.fontSize.unit;

        if (!orig.lineHeight.unit || orig.lineHeight.unit === "normal")
            el.style.lineHeight = (orig.lineHeight.value * self.settings.lineHeight).toFixed(2);
        else
            el.style.lineHeight = (orig.lineHeight.value * self.settings.lineHeight) + orig.lineHeight.unit;

        el.style.letterSpacing = ((self.settings.letterSpacing - 1) * 2) + "px";
        el.style.wordSpacing = ((self.settings.wordSpacing - 1) * 2) + "px";
        el.style.textAlign = self.settings.textAlign;
    });

    this.saveSettings();
    window.dispatchEvent(new CustomEvent('textscaler:change', { detail: this.settings }));
};

/* ---------------- SETTERS ---------------- */
TextScaler.prototype.setFontSize = function (v) { this.settings.fontSize = v; this.applyAll(); };
TextScaler.prototype.setLineHeight = function (v) { this.settings.lineHeight = v; this.applyAll(); };
TextScaler.prototype.setLetterSpacing = function (v) { this.settings.letterSpacing = v; this.applyAll(); };
TextScaler.prototype.setWordSpacing = function (v) { this.settings.wordSpacing = v; this.applyAll(); };
TextScaler.prototype.setTextAlign = function (v) { this.settings.textAlign = v; this.applyAll(); };

/* ---------------- QUICK ACTIONS ---------------- */
TextScaler.prototype.enlarge = function () {
    this.setFontSize(this.settings.fontSize * 1.15);
};

TextScaler.prototype.shrink = function () {
    this.setFontSize(this.settings.fontSize * 0.90);
};

TextScaler.prototype.reset = function () {
    this.settings = {
        fontSize: 1.0,
        lineHeight: 1.0,
        letterSpacing: 1.0,
        wordSpacing: 1.0,
        textAlign: 'inherit',
        readingMode: false
    };
    this.applyAll();
};

/* ---------------- READING MODE ---------------- */
TextScaler.prototype.enableReadingMode = function () {
    this.settings.fontSize = 1.4;
    this.settings.lineHeight = 1.8;
    this.settings.letterSpacing = this.settings.letterSpacing + 0.1;
    this.settings.wordSpacing = 1.5;
    this.settings.textAlign = 'left';
    this.settings.readingMode = true;
    this.applyAll();
};

/* ---------------- STORAGE ---------------- */
TextScaler.prototype.saveSettings = function () {
    if (!this.options.storageKey) return;
    try {
        localStorage.setItem(this.options.storageKey, JSON.stringify(this.settings));
    } catch (e) { }
};

TextScaler.prototype.loadSettings = function () {
    if (!this.options.storageKey) return;
    try {
        var saved = localStorage.getItem(this.options.storageKey);
        if (saved) {
            var parsed = JSON.parse(saved);
            this.settings = Object.assign({}, this.settings, parsed);
        }
    } catch (e) { }
};

TextScaler.prototype.getSettings = function () {
    return Object.assign({}, this.settings);
};

/* ---------------- GLOBAL ---------------- */
if (typeof window !== "undefined") {
    window.TextScaler = TextScaler;
}
