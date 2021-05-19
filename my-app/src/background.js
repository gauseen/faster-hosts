'use strict';

chrome.runtime.onInstalled.addListener(function () {
   chrome.runtime.openOptionsPage(() => console.log('options page opened'))
});

