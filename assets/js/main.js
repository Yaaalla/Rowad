function languageSwitcher(language) {
    localStorage.setItem('language', language);
    console.log(language);
    changeLanguage(language);
}

function changeLanguage(language) {
    const arDiv = document.querySelector('.ar');
    const enDiv = document.querySelector('.en');

    if (String(language) === 'ar') {
        arDiv.style.display = 'block';
        enDiv.style.display = 'none';
    } else {
        arDiv.style.display = 'none';
        enDiv.style.display = 'block';
    }
}

function runFunctionWhenDataLoaded(callback) {
    const interval = setInterval(() => {
        const langVal = localStorage.getItem('language');

        if (langVal !== null) { // Check if language value is available
            clearInterval(interval); // Stop the polling
            callback(langVal); // Run the function with the loaded data
        }
    }, 10); // Poll every 100ms
}

// Usage
runFunctionWhenDataLoaded((langVal) => {
    console.log(langVal); // Log the language value
    changeLanguage(langVal); // Initialize with the language value
});