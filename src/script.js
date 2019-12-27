const svgLogo = `<svg xmlns='http://www.w3.org/2000/svg'><symbol id='svg-logo' viewBox='0 0 512 438'><path class='soundhole' fill='white' d='M257.94 47.137c94.366 0 170.866 76.672 170.866 171.252 0 94.581-76.5 171.253-170.866 171.253-94.367 0-170.866-76.672-170.866-171.253 0-94.58 76.499-171.252 170.866-171.252zm0 29.999c-77.783.001-140.866 63.226-140.866 141.253 0 78.027 63.083 141.253 140.866 141.253 77.783 0 140.866-63.226 140.866-141.253 0-78.027-63.083-141.252-140.866-141.253z'/><g class='strings' stroke='gray' stroke-width='5' stroke-linecap='round' stroke-linejoin='round' fill='none'><path d='M5 231.689L383.403 4.5l-1.092.658M30.389 272.805l378.403-227.19-1.092.659M56.198 312.496L434.602 85.307l-1.093.658M79.143 353.05l378.404-227.189-1.093.658M104.549 393.47l378.403-227.19-1.092.659M128.666 434.222l378.403-227.19-1.093.659'/></g></symbol></svg>`;




document.addEventListener('DOMContentLoaded', () => {
  let prevScrollPos = window.pageYOffset;
  window.onscroll = function() {
    const navbar = document.querySelector('#nav-bar');
    let currentScrollPos = window.pageYOffset;
    navbar.style.top = prevScrollPos > currentScrollPos ? "0" : "-60px";
    prevScrollPos = currentScrollPos;
  }

  const svgtest = document.querySelector('#svg-logo');



  // console.log(encodeURI(svgtest.outerHTML));
   

  useCustomFccToggler();
  

  // Replace original fCC test suite toggler with one that doesn't clash with page elements
  async function useCustomFccToggler() {
    const fccTestSuite = document.querySelector("#fcc_test_suite_wrapper");
    const newToggler = document.querySelector("#custom_fcc_foldout_toggler");

    if (!fccTestSuite) return console.log("*** FCC TEST SUITE NOT LOADED ***");
    if (!newToggler) return console.log("*** MISSING ELEMENT: #custom_fcc_foldout_toggler ***");

    try {
      const queryResults = await querySelectorAllPromise('#fcc_toggle, #fcc_foldout_toggler, #fcc_foldout_menu', fccTestSuite.shadowRoot);

      const fccToggle = queryResults.find(el => el.id === 'fcc_toggle');
      const fccToggler = queryResults.find(el => el.id === 'fcc_foldout_toggler');
      const fccMenu = queryResults.find(el => el.id === 'fcc_foldout_menu');

      // Hide original toggler & toggle
      if (fccToggler) fccToggler.style.display = 'none';
      if (fccToggle) fccToggle.style.display = 'none';
      // Close test menu if it's open by default
      if (fccMenu && fccToggle && fccMenu.getBoundingClientRect().left >= 0) toggleCheckbox(fccToggle);

      return newToggler.addEventListener('click', newTogglerClickHandler);

      function toggleCheckbox(checkbox) { return checkbox.checked ^= 1; }

      function newTogglerClickHandler() {
        toggleCheckbox(fccToggle);
        return this.classList.toggle('is-open');
      }

      function querySelectorAllPromise(selector, parentNode = document) {
        return new Promise((resolve, reject) => {
          let result = parentNode.querySelectorAll(selector);
  
          if (result.length) {
            result.length > 1 ? resolve(Array.from(result)) : resolve(result[0]);
          }
  
          new MutationObserver((mutationRecords, observer) => {
            result = parentNode.querySelectorAll(selector);
            if (result.length) observer.disconnect();
            result.length > 1 ? resolve(Array.from(result)) : resolve(result[0]);
          }).observe(parentNode, {childList: true, subtree: true }); 
    
        });
      }
      
    } catch(err) {
      console.error(err);
    }
    
  }

});

