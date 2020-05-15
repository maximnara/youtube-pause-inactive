
function muteInactive() {
    chrome.tabs.query({url: ["http://*.youtube.com/watch*", "https://*.youtube.com/watch*"]}, function(tabs) {
        var audibleTab = null;
        var activeTab = null;
        tabs.forEach(function (tab) {
            if (tab.active) {
                activeTab = tab;
            }
            if (tab.audible) {
                audibleTab = tab;
            }
        });     

        if (audibleTab && activeTab && activeTab.id != audibleTab.id && !activeTab.audible) {
            chrome.tabs.sendMessage(activeTab.id, { play: true });
        } else if (!audibleTab && activeTab && !activeTab.audible) {
            chrome.tabs.sendMessage(activeTab.id, { play: true });
        }

        if (activeTab) {
            tabs.forEach(function (tab) {
                if (tab.id != activeTab.id && tab.audible) {
                    chrome.tabs.sendMessage(tab.id, { play: false });
                }
            });
        }
    }); 
}

chrome.tabs.onActiveChanged.addListener(function (tabId, changeInfo, tab) {
    muteInactive();
});
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.audible == true && tab.status == 'complete') {
        muteInactive();
    }
});