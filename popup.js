/**
 * Gets the URLs of all open tabs and saves them, with line breaks between URLs,
 * to a file (in the default Downloads directory) with the current date and time
 * as its name. Incognito tabs are included if the "Save incognito tabs"
 * checkbox is checked.
 */
function saveUrls() {
    let incognitoInput = document.getElementById("incognito--input");

    chrome.tabs.query({}, function(tabs) {
        let urls = "";
        tabs.forEach(function(tab) {
            if (incognitoInput.checked || !tab.incognito) {
                urls += tab.url + "\n";
            }
        });

        let dateString = moment().format("YYYY-MM-DD_HH'mm'ss");
        writeText(`${dateString}.txt`, urls);
    });
}

/**
 * Opens the URLs in the "URLs to restore" text area, opening a new tab for each
 * URL. If a URL in the text area does not contain "://", then it is
 * automatically prefixed with "http://".
 */
function restoreUrls() {
    let urlsTextarea = document.getElementById("urls--textarea");
    let urlsString = urlsTextarea.value;

    if (urlsString === "") {
        return;
    }

    let urls = urlsString.split("\n");
    urls.forEach(function(url) {
        chrome.tabs.create({
            url: httpPad(url)
        });
    });
}

/**
 * Adds "http://" to the front of the given URL, if the given URL does not
 * contain "://".
 * @param url   the url to pad with "http://"
 * @returns {!string}   the url, with "http://" padding (if necessary)
 */
function httpPad(url) {
    if (!url.includes("://")) {
        return "http://" + url;
    } else {
        return url;
    }
}

/**
 * Initializes the GUI.
 * - Adds on-click event listeners to the "Save" and "Restore" buttons
 * - Adds an on-input event listener to the "URLs to restore" textarea, so that
 *   the "Restore" button is disabled whenever the textarea is empty
 */
(function() {
    let saveButton = document.getElementById("save--button");
    saveButton.addEventListener("click", saveUrls);

    let restoreButton = document.getElementById("restore--button");
    restoreButton.addEventListener("click", restoreUrls);
    restoreButton.disabled = true;

    let urlsTextarea = document.getElementById("urls--textarea");
    urlsTextarea.addEventListener("input", function() {
        restoreButton.disabled = (urlsTextarea.value.length === 0);
    });
})();
