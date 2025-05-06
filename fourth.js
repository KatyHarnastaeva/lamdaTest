const { Builder, By, Key } = require("selenium-webdriver");
require('dotenv').config({path:'/'});
const ltCapabilities = require("../capabilities");
var should = require("chai").should();
describe("todo test", function () {
    var driver;
    const USERNAME = process.env.LT_USERNAME;
    const KEY = process.env.LT_ACCESS_KEY;
    //host
    const GRID_HOST = "hub.lambdatest.com/wd/hub";
    const gridURL = "https://" + USERNAME + ":" + KEY + "@" + GRID_HOST;
    const todoEndPoint = "https://lambdatest.github.io/sample-todo-app/";
    beforeEach(function () {
        driver = new Builder()
            .usingServer(gridURL)
            .withCapabilities(ltCapabilities.capabilities)
            .build();
    })
    afterEach(async function () {
        await driver.quit();
    });
    it("to do list added succesfully to the app", async function () {
        //let driver = await new Builder().forBrowser("firefox").build();
        await driver.get(todoEndPoint);
        await driver
            .findElement(By.id("sampletodotext"))
            .sendKeys("second time added", Key.RETURN);
        let todoText = await driver
            .findElement(By.xpath("//li[last()]"))
            .getText()
            .then(function (value) {
                return value;
            });
        todoText.should.equal("second time added");
    });
    it("succesfully adds todo to application", async function () {
        //launch the browser
        //let driver = await new Builder().forBrowser("firefox").build();
        //navigate to app
        await driver
            .get(todoEndPoint);
        //add a todo
        await driver
            .findElement(By.id("sampletodotext"))
            .sendKeys("Learn Selenium", Key.RETURN);
        //assert
        let todoText = await driver
            .findElement(By.xpath("//li[last()]"))
            .getText()
            .then(function (value) {
                return value
            }
            );
        //assert using chai should
        todoText.should.equal("Learn Selenium");
    });
});
