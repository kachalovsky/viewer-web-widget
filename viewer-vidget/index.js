(function() {

// Localize jQuery variable
  var jQuery;

  /******** Load jQuery if not present *********/
  if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.4.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
      "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
        if (this.readyState == 'complete' || this.readyState == 'loaded') {
          scriptLoadHandler();
        }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
  } else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
  }

  /******** Called once jQuery has loaded ******/
  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main();
  }

  /******** Our main function ********/
  function main() {
    let defaultApiUrl = 'http://10.168.1.18:3000/';
    jQuery(document).ready(function ($) {
      /******* Load HTML *******/
      $.getJSON(defaultApiUrl + 'api/advertisements', function (data) {
        let resHtml = `<style>
            .viewer-content {
                border: solid 1px gray;
            }
            .logo-img {
                width: 20%;
            }
            .viewer-content, .viewer-link, .viewer-img {
                width: 150px;
            }
            .viewer-img {
                padding: 10px 0px;
            }
            .viewer-header {
                width: 100%;
            }
            .viewer-header-logo {
                text-align: center;
                width: 100%;
                margin : 0px;
            }
            .viewer-header-text {
                font-size: 10px;
                text-align: center;
                width: 100%;
                margin : 0px auto;
            }
          </style>`;
        data.forEach(ad => {
          resHtml += `
            <a href="${ad.link}" class="viewer-link" target="_blank">
             <img class="viewer-img" src="${ad.imgBase64}"/>
            </a>
            </br>`;
        });
        $('#viewer-ad-container').html(`<div class="viewer-content" >
<div class="viewer-header">
<div class="viewer-header-logo"><img src=` + defaultApiUrl + `static/logo.png class="logo-img"/></div>
<div class="viewer-header-text"> Viewer - charity service</div>
</div>
<div>
` + resHtml + `</div></div>`);
      });
    });
  }

})();