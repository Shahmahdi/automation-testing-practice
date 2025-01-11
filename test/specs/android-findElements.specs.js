describe("Android Element Test", () => {
  it("Find element by accessibility id", async () => {
    const appOption = await $("~App");
    await appOption.click();
    const actionBarOption = await $("~Action Bar");
    await expect(actionBarOption).toBeExisting();
  });

  it("Find element by classname", async () => {
    const className = await $("android.widget.TextView");

    await expect(className).toHaveText("API Demos");
  });

  it("Find element by xpath", async () => {
    // xpath - (//tagname[@attribute=value])
    await $("//android.widget.TextView[@content-desc='Alert Dialogs']").click();

    // find by resourceId
    await $(
      "//android.widget.Button[@resource-id='io.appium.android.apis:id/select_button']"
    ).click();

    // find by text
    await $("//android.widget.TextView[@text='Command two']").click();

    // find by class and assertion
    const textAssertion = await $("android.widget.TextView");
    expect(textAssertion).toHaveText("You selected: 1 , Command two");
  });

  xit("Find element by UiAutomator", async () => {
    // find by text contains
    await $('android=new UiSelector().textContains("Alert")').click();
  });

  it("Find multiple elements", async () => {
    const expectedList = [
        "API Demos",
        "Access'ibility",
        "Accessibility",
        "Animation",
        "App",
        "Content",
        "Graphics",
        "Media",
        "NFC",
        "OS",
        "Preference",
        "Text",
        "Views",
      ],
      actualList = [];
    const textList = await $$("android.widget.TextView");

    for (const text of textList) {
      actualList.push(await text.getText());
    }
    await expect(actualList).toEqual(expectedList);
  });

  it.only('Textfield input is equal to canada', async () => {
    await $('//android.widget.TextView[@text="Views"]').click();
    await $('//android.widget.TextView[@content-desc="Auto Complete"]').click();
    await $('//android.widget.TextView[@content-desc="1. Screen Top"]').click();
    const textField = await $('//*[@resource-id="io.appium.android.apis:id/edit"]');
    await textField.addValue('Canada');
    
    await expect(textField).toHaveText("Canada");
  });

});
