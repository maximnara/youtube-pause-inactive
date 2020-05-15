
chrome.runtime.onMessage.addListener(function(msg) {
    if (msg.play) {
        document.getElementsByTagName("video")[0].play();
    } else {
        document.getElementsByTagName("video")[0].pause();
    }
});