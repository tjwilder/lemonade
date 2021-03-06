let site = {};
site.section = document.getElementById("gameSection");
site.head = /* html */ `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
  <title>Lemonade</title>
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <link rel="canonical" href="./embedEn.html">
  <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png">
  <link rel="manifest" href="./manifest.json">
  <link rel="mask-icon" href="./safari-pinned-tab.svg"
    color="#5bbad5">
  <link rel="shortcut icon" href="./favicon.ico">
  <meta name="msapplication-config" content="./browserconfig.xml">
  <meta name="theme-color" content="#81d4fa">
</head>

<body style="margin: 0;" class="light-blue lighten-3">
<div id="loader" style="position: fixed; background-color:#81d4fa; width: 100%; height: 100%; z-index: 1;">
</div>
`;
site.content = /* html */ `<main id="main" class="tooltipped" data-position="top" data-delay="50" data-tooltip="Tomorrow's Forecast">
  <section class="clip">
    <div id="weatherDisplay" class="light-blue-text text-lighten-2 center forecastDisplay">
      <i id="forecastDisplay"></i>
    </div>
  </section>
</main>
<i id="play" class="play">
  <svg id="Lemonade" class="picture" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 126.61377 128">
    <title>Lemonade</title>
    <g id="lemon">
      <circle class="cls-1" cx="97.11377" cy="29.5" r="29.5" />
      <circle class="cls-2" cx="97.11377" cy="29.5" r="23.5" />
      <g class="cls-3">
        <polygon class="cls-4" points="101.611 11.055 98.578 25.597 114.899 24.927 99.337 28.329 109.53 43.371 96.613 30.763 90.872 47.943 92.979 30.138 77.583 34.071 92.77 26.889 82.953 15.627 95.426 24.144 101.611 11.055"
        />
      </g>
      <g class="cls-5">
        <path class="cls-6" d="M150.60248,41.09184,108.76039,82.93393a29.587,29.587,0,1,0,41.84209-41.84209Z" transform="translate(-33.38623 -33)"
        />
      </g>
      <path class="cls-7" d="M130.5,91.66477a29.4989,29.4989,0,0,1-29.49787-29.33238c-.00031.056-.00213.11157-.00213.16761a29.5,29.5,0,0,0,59,0c0-.056-.00182-.11165-.00213-.16761A29.4989,29.4989,0,0,1,130.5,91.66477Z"
        transform="translate(-33.38623 -33)" />
      <path class="cls-8" d="M130.33239,33.33332a29.33131,29.33131,0,0,1,29.33028,29.16573c.00031-.05564.00212-.11094.00212-.16666a29.33239,29.33239,0,0,0-58.66478,0c0,.05572.00181.111.00212.16666A29.33131,29.33131,0,0,1,130.33239,33.33332Z"
        transform="translate(-33.38623 -33)" />
    </g>
    <path id="glassBottom" class="cls-9" d="M130.92,56H62.22269a3.50343,3.50343,0,0,0-3.49086,3.79993l8.32322,97.99315A3.50343,3.50343,0,0,0,70.54591,161h52.05088a3.50343,3.50343,0,0,0,3.49086-3.20692l8.32322-97.99315A3.50343,3.50343,0,0,0,130.92,56Z"
      transform="translate(-33.38623 -33)" />
    <polygon id="lemonade2" class="liquid cls-10" points="94.773 52 31.597 52 37.77 123 88.6 123 94.773 52" />
    <rect id="cube5" class="cubes cls-11" x="69.07319" y="82.27176" width="27.1286" height="26.29021" rx="4.99124" ry="4.99124"
      transform="translate(-4.38776 -51.84682) rotate(15.74793)" />
    <rect id="cube1" class="cubes cls-11" x="95.52033" y="107.91024" width="25.01526" height="23.75643" rx="4.5835" ry="4.5835"
      transform="matrix(0.93181, 0.36294, -0.36294, 0.93181, 17.45556, -64.03945)" />
    <g id="straw">
      <path id="straw-2" data-name="straw" class="cls-12" d="M99.25977,150.25781C97.94238,146.334,67.24854,54.89307,65.84961,50.47119c-1.645-4.77686-5.36182-7.0874-9.5542-5.96436-1.87256,1.03906-10.13623,6.33984-17.43066,11.1167L33.38623,47.2583C50.84473,35.82471,52.19873,35.33545,52.77734,35.126l.21875-.07324c9.52686-2.95215,18.92188,2.19971,22.33936,12.252l.04834.14941c.68652,2.24561,22.11914,66.14648,33.35645,99.62207Z"
        transform="translate(-33.38623 -33)" />
      <path class="cls-13" d="M99.25977,149.25781C97.94238,145.334,67.24854,53.89307,65.84961,49.47119c-1.645-4.77686-5.36182-7.0874-9.5542-5.96436-1.87256,1.03906-10.13623,6.33984-17.43066,11.1167l-5.02-7.66516c-.15472.10126-.30121.1969-.4585.29993l5.47852,8.36523c7.29443-4.77686,15.55811-10.07764,17.43066-11.1167,4.19238-1.123,7.90918,1.1875,9.5542,5.96436,1.39893,4.42188,32.09277,95.86279,33.41016,99.78662l9.48047-3.18164c-.09918-.29547-.20093-.59863-.3017-.89874Z"
        transform="translate(-33.38623 -33)" />
      <path class="cls-14" d="M52.77734,36.126l.21875-.07324c9.52686-2.95215,18.92188,2.19971,22.33936,12.252l.04834.14941c.68048,2.22577,21.74066,65.01794,33.05475,98.72333l.3017-.10126C97.50293,113.60059,76.07031,49.69971,75.38379,47.4541l-.04834-.14941c-3.41748-10.05225-12.8125-15.2041-22.33936-12.252l-.21875.07324c-.57861.20947-1.93262.69873-19.39111,12.13232l.4585.70007C50.85956,36.82239,52.20392,36.33356,52.77734,36.126Z"
        transform="translate(-33.38623 -33)" />
    </g>
    <rect id="cube4" class="cubes cls-15" x="101.63709" y="86.66835" width="22.9414" height="21.78693" rx="4.5835" ry="4.5835"
      transform="translate(-56.75148 3.84287) rotate(-16.7946)" />
    <rect id="cube3" class="cubes cls-16" x="84.2982" y="81.54597" width="25.96708" height="23.64391" rx="4.5835" ry="4.5835"
      transform="translate(-17.52694 -47.11087) rotate(9.02966)" />
    <rect id="cube2" class="cubes cls-17" x="72.78349" y="106.18773" width="23.40123" height="23.40123" rx="4.5835" ry="4.5835"
      transform="translate(36.87666 -59.44801) rotate(30)" />
    <polygon id="lemonade1" class="liquid cls-18" points="94.773 52 31.597 52 37.77 123 88.6 123 94.773 52" />
    <g id="glassTop">
      <path class="cls-19" d="M130.92,56H62.22269a3.50343,3.50343,0,0,0-3.49086,3.79993l8.32322,97.99315A3.50343,3.50343,0,0,0,70.54591,161h52.05088a3.50343,3.50343,0,0,0,3.49086-3.20692l8.32322-97.99315A3.50343,3.50343,0,0,0,130.92,56Z"
        transform="translate(-33.38623 -33)" />
      <path id="Shadow" class="cls-20" d="M122.46478,160H70.67792a3.50341,3.50341,0,0,1-3.49085-3.20691L58.924,59.50745a3.51458,3.51458,0,0,0-.01984.76642l8.283,97.51922A3.50341,3.50341,0,0,0,70.67792,161h51.78687a3.50341,3.50341,0,0,0,3.49085-3.20691l8.283-97.51922a3.51458,3.51458,0,0,0-.01984-.76642l-8.26312,97.28564A3.50341,3.50341,0,0,1,122.46478,160Z"
        transform="translate(-33.38623 -33)" />
      <path class="cls-21" d="M131.34864,56H97V161h26.02543a3.50344,3.50344,0,0,0,3.49087-3.20694l8.3232-97.99312A3.50344,3.50344,0,0,0,131.34864,56Z"
        transform="translate(-33.38623 -33)" />
      <path id="highlight" class="cls-22" d="M62.395,57h68.35278a3.50382,3.50382,0,0,1,3.471,3.03351l.01984-.23364A3.50341,3.50341,0,0,0,130.74774,56H62.395a3.50341,3.50341,0,0,0-3.49085,3.79987l.01984.23364A3.50382,3.50382,0,0,1,62.395,57Z"
        transform="translate(-33.38623 -33)" />
    </g>
  </svg>
</i>
<footer class="page-footer fixed-footer noBackground" style="background-color:rgba(0, 0, 0, 0);">
  <form class="container operations">
    <section class="row">
      <label class="light-blue-text text-darken-2 col s8 offset-s2" for="cups">Cups
        <p id="range1" class="range-field">
          <input name="cups" class="range" type="range" id="cups" min="0" max="5" /> </p>
      </label>
    </section>
    <section class="row">
      <label class="light-blue-text text-darken-2 col s8 offset-s2" for="signs">Signs
        <p id="range2" class="range-field">
          <input name="signs" class="range" type="range" id="signs" min="0" max="5" />
        </p>
      </label>
    </section>
    <section class="row">
      <label class="light-blue-text text-darken-2 col s8 offset-s2" for="price">Price
        <p id="range3" class="range-field">
          <input name="price" type="range" id="price" min="0.01" max="2.99" step="0.01" />
        </p>
      </label>
    </section>
  </form>
  <section class="row noBottom">
    <div id="emotion" class="col s3 light-blue-text text-accent-2 tooltipped center emotion" data-position="top" data-delay="50"
      data-tooltip="Confidence Level">
      <i id="emotionDisplay"></i>
    </div>
    <div class="results col s6 bold">
      <div class="col s12">
        <div id="cupsSoldDisplay" class="light-blue-text text-darken-2 center-align tooltipped" data-position="top" data-delay="50"
          data-tooltip="Today's Sales"></div>
      </div>
      <div class="progress col s12">
        <div id="percentageBar" class="determinate light-blue accent-2" style="width: 100%"></div>
      </div>
      <section class="col s12">
        <div id="dayDisplay" class="light-blue-text text-darken-2 col s6 tooltipped center" data-position="top" data-delay="50" data-tooltip="Days in Business"></div>
        <div id="grandTotalDisplay" class="light-blue-text text-darken-2 col s6 tooltipped center" data-position="top" data-delay="50"
          data-tooltip="Net Total Earnings"></div>
      </section>
    </div>
  </section>
</footer>
<script>
  window.onload = () => {
    lemonade.whenLoaded();
  };
</script>
`;

site.footer = /* html */ `
<script>
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-105249591-1', 'auto');
ga('send', 'pageview');
</script>
</body>

</html>
`;
window.startGame = function() {
  site.section.innerHTML = site.content;
  window.lemonade.whenLoaded();
};
