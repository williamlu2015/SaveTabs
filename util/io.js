function writeText(filename, data) {
    let url = "data:text/plain;charset=utf-8," + encodeURIComponent(data);
    chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true   // technically not necessary since saveAs is true by
        // default
    });
}
