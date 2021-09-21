<b>Screen recording of app working:</b> https://www.loom.com/share/47c98993cb474a2fa9f9323166c72e98

This program scrapes Kaiser's website for Redwood City physician info, retrieves 60 physician records in json data format, and displays in a basic html table with json2html

Data structure for each record:
{'physicianName': name,
'physicianSpecialty': specialty,
'practicingAddress': fullAddress,
'phone': phone}

Methodology:

<ul>
<li>Utilizes puppeteer to navigate dom and select text from desired elements such as .specialtyMargin and .doctorOffice.
<li>Waits for html elements to load before scraping data from the page and pushing json records into an array
<li>Clicks 'Next' in navigation to populate next 20 records and pushes to array, repeats twice for a total of 60 records
<li>Lastly json data/html format is sent by express route
</ul>

To run program locally, pull the branch, then run npm install to get dependencies. In terminal once in program directory, run command 'node scrape.js'. Go to browser http://localhost:3000/kaiser. The scrape may take about 10-15 seconds as the kaiser pages take some time to load.
