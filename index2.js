const { Builder, By, Key, util } = require("selenium-webdriver");
let companyDetails = [];
const FileSystem = require("fs");

async function automationTest(inputObject) {
    let driver = await new Builder().forBrowser("firefox").build();
    //open firefix browser

    //open the website
    await driver.get(inputObject.webSiteUrl);

    //click on one the company
    await (await driver.findElement(By.xpath(inputObject.companyUrl))).click();

    //Name of the company
    let xpathname = await driver.findElement(By.xpath(inputObject.detailsArr[0]));
    let name;
    if (xpathname !== undefined) {
        name = await xpathname.getText();
    }
    let phonenumber = await (await driver.findElement(By.xpath(inputObject.detailsArr[1])).getText());
    let keyArr = ['name', 'phonenumber', 'imagename'];
    let valuesArr = [];
    valuesArr.push(name);
    valuesArr.push(phonenumber);
    valuesArr.push(inputObject.detailsArr[2]);
    let jsonObj = generate_JSON_object(keyArr, valuesArr);
    companyDetails.push(jsonObj);
    let imageURL = await (await driver.findElement(By.xpath(inputObject.imageXpath))).getAttribute("src");
    download(imageURL,'./Images/'+inputObject.detailsArr[2], function(){
    console.log('done');
  });
    driver.close();
}
var download = function(uri, filename, callback){
    request = require('request');
    request.head(uri, function(err, res, body){
      request(uri).pipe(FileSystem.createWriteStream(filename)).on('close', callback);
    });
  };
  
  
function generate_JSON_object(keys, values) {
    let jsonObj = {};
    for (let i = 0; i < keys.length; i++) {
        jsonObj[keys[i]] = values[i]
    }
    return jsonObj;
}

let inputArr = [
    {
        webSiteUrl: 'https://www.moneycontrol.com/stocks/marketinfo/netsales/bse/pharmaceuticals-drugs.html',
        companyUrl: "//b[normalize-space()='Aurobindo Pharm']",
        detailsArr: [
            "//h1[normalize-space()='Aurobindo Pharma Ltd.']",
            "//h1[normalize-space()='Aurobindo Pharma Ltd.']",
            "image1.jpeg"
        ],
        imageXpath : "//div[@class='sponcer bredleft']//img[@title='Kotak']"
    },
    {
        webSiteUrl: 'https://www.moneycontrol.com/stocks/marketinfo/netsales/bse/pharmaceuticals-drugs.html',
        companyUrl: "//b[normalize-space()='Aurobindo Pharm']",
        detailsArr: [
            "//h1[normalize-space()='Aurobindo Pharma Ltd.']",
            "//h1[normalize-space()='Aurobindo Pharma Ltd.']",
            "image2.jpeg"
        ],
        imageXpath : "//div[@class='sponcer bredleft']//img[@title='Kotak']"
    },

    {
        webSiteUrl: 'https://www.moneycontrol.com/stocks/marketinfo/netsales/bse/pharmaceuticals-drugs.html',
        companyUrl: "//b[normalize-space()='Aurobindo Pharm']",
        detailsArr: [
            "//h1[normalize-space()='Aurobindo Pharma Ltd.']",
            "//h1[normalize-space()='Aurobindo Pharma Ltd.']",
            "image3.jpeg"
        ],
        imageXpath : "//div[@class='sponcer bredleft']//img[@title='Kotak']"
    }

];
async function run() {
    for (let i = 0; i < inputArr.length; i++) {
        await automationTest(inputArr[i]);
    }
    
    FileSystem.writeFile("companydetails.json", JSON.stringify(companyDetails), (err) => {
        if (err) {
            console.log(err);
        }
    })
}

run();

