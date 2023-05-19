console.log("Hello World");

// Receive message from popup & send user_name in response
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  console.log("Query :", message);
  sendResponse({ user: window.location.pathname.split("/")[1] });
});
