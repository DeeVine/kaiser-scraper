const puppeteer = require ('puppeteer');

//initiating Puppeteer
puppeteer
  .launch ()
  .then (async browser => {
  
    //opening a new page and navigating to Reddit
    const page = await browser.newPage ();
    await page.goto ('https://healthy.kaiserpermanente.org/northern-california/doctors-locations#/search-result');
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
          office = item.querySelector ('.doctorOffice').innerText;
        } catch (err) {}
        try {
          address = item.querySelector ('.doctorAddress').innerText;
        } catch (err) {}
        try {
          phone = item.querySelector ('.doctorPhone').innerText;
        } catch (err) {}
        scrapeItems.push ({
          'physicianName': name,
          'physicianSpecialty': specialty,
          'practicingAddress': office,
          'doctorAddress': address,
          'doctorPhone': phone,
        });
      })
      return scrapeItems;
    })

    let allDoctorInfo = getDoctorInfo;

    console.log('allDoctorInfo1')
    console.log(getDoctorInfo);

    linkHandlers = await page.$x("//span[contains(text(), 'Next')]");
    //click navigation 'next' button
    if (linkHandlers.length > 0) {
      await linkHandlers[0].click();
    } else {
      throw new Error("Link not found");
    }

    await page.waitForSelector ('.detail-data', {
      visible: true,
    });

     //manipulating the page's content
    let getDoctorInfo2 = await page.evaluate (() => {
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
          office = item.querySelector ('.doctorOffice').innerText;
        } catch (err) {}
        try {
          address = item.querySelector ('.doctorAddress').innerText;
        } catch (err) {}
        try {
          phone = item.querySelector ('.doctorPhone').innerText;
        } catch (err) {}
        scrapeItems.push ({
          'physicianName': name,
          'physicianSpecialty': specialty,
          'practicingAddress': office,
          'doctorAddress': address,
          'phone': phone,
        });
      })
      // console.log('alldoctor info in 2nd func')
      // console.log(allDoctorInfo)
      return scrapeItems;
    })

    // new Promise((resolve, reject) => {
    //   allDoctorInfo = getDoctorInfo.push(getDoctorInfo2) 
    //   return allDoctorInfo;
    // }).then((res)=>{
    //   console.log('allDoctorInfo2')
    //   console.log(res);
    // }) 
    console.log('allDoctorInfo2')
    console.log(getDoctorInfo2);

    linkHandlers = await page.$x("//span[contains(text(), 'Next')]");
    //click navigation 'next' button
    if (linkHandlers.length > 0) {
      await linkHandlers[0].click();
    } else {
      throw new Error("Link not found");
    }

    await page.waitForSelector ('.detail-data', {
      visible: true,
    });

     //manipulating the page's content
    let getDoctorInfo3 = await page.evaluate (() => {
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
          office = item.querySelector ('.doctorOffice').innerText;
        } catch (err) {}
        try {
          address = item.querySelector ('.doctorAddress').innerText;
        } catch (err) {}
        try {
          phone = item.querySelector ('.doctorPhone').innerText;
        } catch (err) {}
        scrapeItems.push ({
          'physicianName': name,
          'physicianSpecialty': specialty,
          'practicingAddress': office,
          'doctorAddress': address,
          'phone': phone,
        });
      })
      return scrapeItems;
    })

    console.log('allDoctorInfo3')
    console.log(getDoctorInfo3);

    //closing the browser
    await browser.close ();
  })
  
  //handling any errors
  .catch (function (err) {
    console.error (err);
  });
