
// import { test, expect } from '@playwright/test';

const { test, expect } = require('@playwright/test');
const config = require ('./config.json')
test('Verify Title of Jupiter Toys Homepage', async ({ page }) => {

    await page.goto('http://jupiter.cloud.planittesting.com');

    const pageTitle = await page.title()
    console.log('Page title is:', pageTitle);
    await expect(page).toHaveTitle('Jupiter Toys');



})

test('Verify error message is coming when user skip the mandatory fields', async ({ page }) => {

    await page.goto('http://jupiter.cloud.planittesting.com');

    await page.locator('id=nav-contact').click();
    await page.getByRole("link", { name: "Submit" }).click()
    let firstnameerror = await page.locator("id=forename-err").textContent();
    expect(firstnameerror).toEqual("Forename is required")

    let emailaddresserror = await page.locator("id=email-err").textContent()
    expect(emailaddresserror).toEqual("Email is required")
    let messageerror = await page.locator("id=message-err").textContent()
    expect(messageerror).toEqual("Message is required")

    let status = await page.locator("text=We welcome your feedback").isVisible()
    expect(status).toBeTruthy()
    let status2 = await page.locator("text= - but we won't get it unless you complete the form correctly.").isVisible()
    expect(status2).toBeTruthy()


})


test('Verify error message is no longer available when user enters the mandatory fields', async ({ page }) => {

    await page.goto('http://jupiter.cloud.planittesting.com');

    await page.locator('id=nav-contact').click();
    await page.getByRole("link", { name: "Submit" }).click()
    await page.locator('id=forename').fill("Sandy");
    let firstnameerror = await page.locator("id=forename-err").isVisible()
    expect(firstnameerror).toBeFalsy()

    await page.locator('id=email').fill("Sandy.valokot@gmail.com");
    let emailaddresserror = await page.locator("id=email-err").isVisible()
    expect(emailaddresserror).toBeFalsy()

    await page.locator('id=message').fill("Test123");
    let messageerror = await page.locator("id=message-err").isVisible()
    expect(messageerror).toBeFalsy()


})



test('Verify User is able to Submit the details', async ({ page }) => {

    await page.goto('http://jupiter.cloud.planittesting.com');

    await page.locator('id=nav-contact').click();
    await page.getByRole("link", { name: "Submit" }).click()
    await page.locator('id=forename').fill("Sandy");
    let firstnameerror = await page.locator("id=forename-err").isVisible()
    expect(firstnameerror).toBeFalsy()

    await page.locator('id=email').fill("Sandy.valokot@gmail.com");
    let emailaddresserror = await page.locator("id=email-err").isVisible()
    expect(emailaddresserror).toBeFalsy()

    await page.locator('id=message').fill("Test123");
    let messageerror = await page.locator("id=message-err").isVisible()
    expect(messageerror).toBeFalsy()

    await page.getByRole("link", { name: "Submit" }).click()
    await page.waitForTimeout(5000)
    let received = await page.locator("text=Thanks Sandy")
    await expect(received).toBeVisible({ timeout: 30000 })
    let status2 = await page.locator("text=, we appreciate your feedback.").isVisible()
    expect(status2).toBeTruthy()

})

test('Verify Total equals to sum of sub totals ', async ({ page }) => {

    await page.goto('http://jupiter.cloud.planittesting.com');

    await page.locator('id=nav-home').click();
    await page.getByRole("link", { name: "Home" }).click();

    await page.getByRole("link", { name: "Start Shopping" }).click();

    await page.locator('id=product-2').click();
    // Stuffed Frogs -->2
     for(let i=0;i<config.product2;i++)
     await page.locator('id=product-2').locator('text=Buy').click();
    //Fluffy bunny -->5
    for(let i=0;i<config.product4;i++)
     await page.locator('id=product-4').locator('text=Buy').click();
    //Valentine Bear -->3
    for(let i=0;i<config.product7;i++)
    await page.locator('id=product-7').locator('text=Buy').click();
     

  const product2cost=parseInt( await page.locator("#product-2  span").textContent())
  const product4cost=parseInt(await page.locator("#product-4  span").textContent())
  const product7cost=parseInt(await page.locator("#product-7  span").textContent())
//navigate to Cart
    await page.locator('id=nav-cart').click();
    await page.waitForTimeout(3000);
    const total= await page.locator(".total").textContent()
    const totalvalue=total.split(" ")
    
// checking the subtotals
let subtotal1=(product2cost*2)
expect(subtotal1).toEqual(parseInt(totalvalue))

    //checking the grant total
    
let sum=(product2cost*config.product2)+(product4cost*config.product4)+(product7cost*config.product7)

expect(sum).toEqual(parseInt(totalvalue))
})











