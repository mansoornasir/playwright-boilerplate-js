report({
  "testSuite": "BackstopJS",
  "tests": [
    {
      "pair": {
        "reference": "..\\bitmaps_reference\\backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "test": "..\\bitmaps_test\\20240828-220953\\backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "selector": "document",
        "fileName": "backstop_default_BackstopJS_Homepage_0_document_0_phone.png",
        "label": "BackstopJS Homepage",
        "requireSameDimensions": true,
        "misMatchThreshold": 0.1,
        "url": "https://www.saucedemo.com/v1/",
        "referenceUrl": "",
        "expect": 0,
        "viewportLabel": "phone",
        "diff": {
          "isSameDimensions": false,
          "dimensionDifference": {
            "width": 0,
            "height": -104
          },
          "rawMisMatchPercentage": 64.62476765799256,
          "misMatchPercentage": "64.62",
          "analysisTime": 32
        },
        "diffImage": "..\\bitmaps_test\\20240828-220953\\failed_diff_backstop_default_BackstopJS_Homepage_0_document_0_phone.png"
      },
      "status": "fail"
    }
  ],
  "id": "backstop_default"
});