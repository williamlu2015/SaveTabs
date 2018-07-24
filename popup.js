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
        writeText(`SaveTabs/urls/${dateString}.txt`, urls);
    });
}

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

function httpPad(url) {
    if (!url.includes("://")) {
        return "http://" + url;
    } else {
        return url;
    }
}

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
