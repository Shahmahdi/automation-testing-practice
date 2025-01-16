describe('Android native feature tests', () => {
  it('Access an activity directly', async () => { // means access a page directly
    // access activity
    await driver.startActivity("io.appium.android.apis", ".app.AlertDialogSamples");

    // pause 3s
    await driver.pause(3000);

    // assertion
    await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
  });

  it('Working with dialog boxes', async () => {
    // access activity
    await driver.startActivity("io.appium.android.apis", ".app.AlertDialogSamples");
    
    // click on first dialog
    await $('//*[@resource-id="io.appium.android.apis:id/two_buttons"]').click();

    // accept alert
    // await driver.acceptAlert();

    // dismiss alert
    // await driver.dismissAlert();

    // get alert text
    console.log("Alert text: ", await driver.getAlertText());

    // click on the ok button
    await $('//*[@resource-id="android:id/button1"]').click();

    // assertion
    await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();

  });

  it('Vertical Scrolling', async () => {
    await $('~App').click();
    await $('~Activity').click();

    // scroll to end (not stable if element gets moved)
    // await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1, 5)');
    // await expect($('~Secure Surfaces')).toExist();

    await $('android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")').click();
    await expect($('~Secure Dialog')).toExist();

  });

  it('Horizontal Scrolling', async () => {
    await driver.startActivity("io.appium.android.apis", ".view.Gallery1");

    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()');

    await driver.pause(3000);
  });

  it.only('Horizontal widget date modal', async () => {
    // Not a good one
    /*
    await driver.startActivity("io.appium.android.apis", ".view.DateWidgets1");
    await $('~change the date').click();
    await $('//android.widget.ImageButton[@content-desc="Next month"]').click();
    await $('~10 February 2025').click();
    await $('//android.widget.Button[@resource-id="android:id/button1"]').click();
    const dateDisplayText = await $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    const text = await dateDisplayText.getText();
    await expect(text).toEqual('2-10-2025 01:02');
    */

    // =========================Better one========================
    await driver.startActivity("io.appium.android.apis", ".view.DateWidgets1");
    const dateDisplayText = await $('//android.widget.TextView[@resource-id="io.appium.android.apis:id/dateDisplay"]');
    const currentDate = dateDisplayText.getText();
    await $('~change the date').click();
    await $('android=new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()');
    await $('//*[@text="10"]').click();
    await $('//android.widget.Button[@resource-id="android:id/button1"]').click();
    await expect(await dateDisplayText.getText()).not.toEqual(currentDate);
  });
});