import { Builder, By, Key, until } from "selenium-webdriver";
import "geckodriver";
import "chromedriver";

export const reg_test_firefox = async () => {
  const driver = await new Builder().forBrowser("chrome").build();
  await driver.get("https://orioks.miet.ru/user/login");
  await driver
    .findElement(By.name("LoginForm[login]"))
    .sendKeys(/*place for login*/);
  await driver
    .findElement(By.name("LoginForm[password]"))
    .sendKeys(/* *place for password* ,*/ Key.RETURN);
  const homeworkBtn = await driver.wait(
    until.elementLocated(By.linkText("Домашние задания"))
  );
  const actions = driver.actions({ async: true });
  await actions.move({ origin: homeworkBtn }).click().perform();
  await driver
    .wait(until.elementLocated(By.name("HomeworkTreadForm[name]")))
    .sendKeys("asdgasdgasdg");

  let searchBtn = await driver.findElement(By.css(".btn-primary"));
  await driver
    .actions({ async: true })
    .move({ origin: searchBtn })
    .click()
    .perform();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const size = await driver.findElements(By.css("tr"));
  if (size.length === 1) {
    const discInp = await driver.findElement(
      By.name("HomeworkTreadForm[name]")
    );
    await discInp.clear();
    await discInp.sendKeys("Математическое моделирование");
    searchBtn = await driver.findElement(By.css(".btn-primary"));
    await driver
      .actions({ async: true })
      .move({ origin: searchBtn })
      .click()
      .perform();
    setTimeout(async () => {
      const size = await driver.findElements(By.css("tr"));
      size.length === 2
        ? console.log("Search test: success")
        : console.log("Search test: failed");
    }, 2000);
  }
};

reg_test_firefox();
