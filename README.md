This is a simple program that scrapes Kaiser's website for doctor info. Scrapes and retrieves 60 doctor records in json data format, displayed in basic html table with json2html

screen recording of app working: https://www.loom.com/share/962e53e1c69d4399814176260fd4a25d 

Data structure for each record:
{'physicianName': name,
'physicianSpecialty': specialty,
'practicingAddress': office,
'doctorAddress': address,
'doctorPhone': phone}

Methodology:

<ul>
<li>Utilizes puppeteer to navigate to https://healthy.kaiserpermanente.org/northern-california/doctors-locations#/search-result
<li>Waits for html elements to lead before scraping data from the page and pushing json records into an array
<li>Clicks 'Next' in navigation to populate next 20 records and pushes to array, repeats twice for a total of 60 records
<li>Lastly express route sends json data
</ul>
