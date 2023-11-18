document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.sync.get(
    ['fontFamily', 'letterSpacing', 'lineHeight'],
    function (result) {
      document.querySelector('.font-family-input').value =
        result.fontFamily || 'Sans-serif';
      document.querySelector('.letter-spacing-input').value =
        result.letterSpacing || 0;
      document.querySelector('.line-height-input').value =
        result.lineHeight || 100;
    }
  );

  document.querySelector('.save-button').addEventListener('click', function () {
    const fontFamily = document.querySelector('.font-family-input').value;
    const letterSpacing = document.querySelector('.letter-spacing-input').value;
    const lineHeight = document.querySelector('.line-height-input').value;

    chrome.storage.sync.set({ fontFamily, letterSpacing, lineHeight });
  });

  document
    .querySelector('.reset-button')
    .addEventListener('click', function () {
      document.querySelector('.font-family-input').value = 'Sans-serif';
      document.querySelector('.letter-spacing-input').value = '0';
      document.querySelector('.line-height-input').value = '100';

      chrome.storage.sync.set({ fontFamily, letterSpacing, lineHeight });
    });
});
