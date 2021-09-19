const puppeteer = require ('puppeteer');

const allDocs = [];
//initiating Puppeteer
const puppet = () => puppeteer
  .launch ()
  .then (async browser => {
  
    //opening a new page and navigating to Reddit
    const page = await browser.newPage ();
    await page.goto ('https://healthy.kaiserpermanente.org/northern-california/doctors-locations#/search-result');
    await page.waitForSelector ('.detail-data', {
        visible: true,
    });

    //click navigation 'next' button
    const linkHandlers = await page.$x("//span[contains(text(), 'Next')]");

    if (linkHandlers.length > 0) {
      await linkHandlers[0].click();
    } else {
      throw new Error("Link not found");
    }

    await page.waitForSelector ('.detail-data', {
      visible: true,
    });

    //manipulating the page's content
    let getDoctorInfo = await page.evaluate (() => {
      //wait for '.detail-data' to load before scraping
      let allInfo = document.body.querySelectorAll ('.detail-data');
      
      //storing the scraped items in an array then selecting for retrieving content
      let scrapeItems = [];
      allInfo.forEach (item => {
        let name = item.querySelector ('h2').innerText;
        let specialty = '';
        let office = '';
        let address = '';    
        let phone = ''; 
        
        try {
          specialty = item.querySelector ('.specialtyMargin').innerText;
        } catch (err) {}
        try {
          address = item.querySelector ('.doctorOffice').innerText;
        } catch (err) {}
        try {
          address = item.querySelector ('.doctorAddress').innerText;
        } catch (err) {}
        try {
          address = item.querySelector ('.doctorPhone').innerText;
        } catch (err) {}
        scrapeItems.push ({
          'physicianName': name,
          'physicianSpecialty': specialty,
          'practicing Address': office,
          'doctor Address': address,
          'phone': phone,
        });
      })
      return scrapeItems;
    })

    const allDoctorInfo = getDoctorInfo;

    console.log('allDoctorInfo')
    console.log(allDoctorInfo);

    //outputting the scraped data
    // console.log (getDoctorInfo);
    // console.log (getDoctorInfo.length);

    //closing the browser
    await browser.close ();
  })
  //handling any errors
  .catch (function (err) {
    console.error (err);
  });

  puppet();