/**
 * Writes the given data, using UTF-8 encoding, to the file with the given name
 * in the default Downloads directory. Opens a "Save As" dialog to allow the end
 * user to change the directory/file the data is saved to.
 * @param filename   the name of the file in the default Downloads directory to
 * save data to
 * @param data   the data to save
 */
function writeText(filename, data) {
    let url = "data:text/plain;charset=utf-8," + encodeURIComponent(data);
    chrome.downloads.download({
        url: url,
        filename: filename,
        saveAs: true   // technically not necessary since saveAs is true by
        // default
    });
}
