document.addEventListener('DOMContentLoaded', function () {
  const targets = document.querySelectorAll('[data-hs-copy-to-clipboard]');

  if (!targets.length) {
    return;
  }

  function hideTooltip(target, tooltip) {
    return new Promise(resolve => {
      setTimeout(() => {
        tooltip.classList.remove('hs-visible');
        tooltip.setAttribute('aria-hidden', 'true');
        target.focus();
        tooltip
          .querySelector('.hs-tooltip__success')
          .classList.remove('hs-visible');
        tooltip
          .querySelector('.hs-tooltip__failure')
          .classList.remove('hs-visible');
        resolve();
      }, 1500);
    });
  }

  targets.forEach(target => {
    const tooltip = target.querySelector('.hs-tooltip');
    let clicked = false;

    target.addEventListener('click', function () {
      if (clicked) {
        return;
      }
      clicked = true;

      navigator.clipboard
        .writeText(target.getAttribute('data-hs-copy-to-clipboard'))
        .then(() => {
          tooltip.removeAttribute('aria-hidden');
          tooltip.classList.add('hs-visible');
          tooltip.focus();
          tooltip
            .querySelector('.hs-tooltip__success')
            .classList.add('hs-visible');
        })
        .catch(() => {
          tooltip.removeAttribute('aria-hidden');
          tooltip.classList.add('hs-visible');
          tooltip.focus();
          tooltip
            .querySelector('.hs-tooltip__failure')
            .classList.add('hs-visible');
        })
        .finally(() => {
          hideTooltip(target, tooltip).then(() => {
            clicked = false;
          });
        });
    });
  });
});
