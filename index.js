import $ from "jquery";
import SpeedTest from "simple-url-speedtest";

const speedArr = [
  "https://www.facebook.com",
  "https://www.google.com",
  "https://www.apple.com",
  "https://www.cnn.com",
  "https://www.whatsapp.com",
  "https://www.yahoo.com",
  "https://www.samsung.com",
  "https://www.lg.com",
];

function runTest() {
  const speedContainer = $(".speed-wrapper");
  /**
   * Insert dummy loading data
   */
  const dummyData = speedArr
    .map((item) => `<div class="speed-item">&nbsp;</div>`)
    .join("");
  speedContainer.html($(dummyData));

  SpeedTest(speedArr).then((data) => {
    const sortedData = data.sort((a, b) => a.ping - b.ping);
    const highestPing = sortedData[sortedData.length - 1].ping;

    const speedItems = sortedData
      .map((item) => {
        const { url, ping } = item;
        const currentSpeed = Math.floor((ping / highestPing) * 100);

        return `<div class="speed-item">
          <div class="label">${url}</div>
          <div class="progress-wrapper">
            <div
              class="progress"
              style="transform: translateX(-${100 - currentSpeed}%)"
            ></div>
          </div>
          <div class="ping">${ping}ms</div>
        </div>`;
      })
      .join("");
    speedContainer.html($(speedItems));
  });
}

function setVersion() {
  const API_ENDPOINT =
    "https://raw.githubusercontent.com/masonwongcs/simple-url-speedtest/master/package.json";

  const version = $(".version-wrapper span");

  $.ajax(API_ENDPOINT, {
    success: function (data) {
      const parsedData = JSON.parse(data);
      version.text(parsedData.version);
    },
  });
}

$(document).ready(function () {
  setVersion();
  runTest();

  $(".refresh-button").click(function (e) {
    e.preventDefault();
    console.log("asd");
    runTest();
  });
});
