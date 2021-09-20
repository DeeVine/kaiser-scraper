const express = require('express')
const app = express()
const port = 3000
const puppeteer = require ('puppeteer');
const json2html = require('json2html')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

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

    //manipulating the page's content
    let getdoctorinfo = await page.evaluate (() => {
      //wait for '.detail-data' to load before scraping
      let allInfo = document.body.querySelectorAll ('.detail-data');
      
      const scraper = (info) => {
        let scrapeItems = [];
        info.forEach (item => {
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
        return scrapeItems
      }

      return scraper(allInfo);
    }).then( async res => {
      
      let alldocinfo = res;
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

      await page.evaluate (() => {
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
        
      }).then( async res => {
        alldocinfo = alldocinfo.concat(res);
      })
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

      await page.evaluate (() => {
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
      }).then( async res => {
        alldocinfo = alldocinfo.concat(res);
        return alldocinfo;
      })  
      return alldocinfo;
    })
    console.log(getdoctorinfo)
    //closing the browser
    await browser.close ();
    return getdoctorinfo
  })  
  //handling any errors
  .catch (function (err) {
    console.error (err);
  });

  //send data with simple json2html formatter
  app.get('/kaiser', (req, res) => {
    puppet().then( data => {
      res.send(json2html.render(data));
    })
  })  
 