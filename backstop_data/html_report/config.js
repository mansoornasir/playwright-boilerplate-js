report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_https__wwwexamplecom_0_body_0_phone.png",
        "test": "..\\bitmaps_test\\20240830-194122\\backstop_default_https__wwwexamplecom_0_body_0_phone.png",
        "selector": "body",
        "fileName": "backstop_default_https__wwwexamplecom_0_body_0_phone.png",
        "label": "https://www.example.com",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.example.com",
        "referenceUrl": "https://www.example.com",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    },
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_https__wwwexamplecom_0_body_1_windows_11.png",
        "test": "..\\bitmaps_test\\20240830-194122\\backstop_default_https__wwwexamplecom_0_body_1_windows_11.png",
        "selector": "body",
        "fileName": "backstop_default_https__wwwexamplecom_0_body_1_windows_11.png",
        "label": "https://www.example.com",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.example.com",
        "referenceUrl": "https://www.example.com",
        "expect": 0,
        "viewportLabel": "windows 11",
        "diff": {
          "isSameDimensions": true,
          "dimensionDifference": {
            "width": 0,
            "height": 0
          },
          "misMatchPercentage": "0.00"
        }
      },
      "status": "pass"
    }
  ],
  "id": "backstop_default"
});