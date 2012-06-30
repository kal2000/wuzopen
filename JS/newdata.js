function place(name,hrs,address,ph,type,link) {
  this.name=name;
  this.hours=hrs;
  this.address=address;
  this.prettyhrs = ph;
  this.type=type;
  this.link=link;
}

var allplaceslist =
[new place("HGS Lunch", [ [0,0 ] , [11.5,14 ] , [11.5,14 ] , [11.5,14 ] , [11.5,14 ] , [11.5,14 ] , [0,0 ] ] , "", "Monday thru Friday     Lunch: 11:30 am – 2:00 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#hgs"), new place("HGS Dinner", [ [0,0] , [17,20], [17,20], [17,20], [17,20], [17,20], [0,0 ] ] , "", "Monday thru Friday     Dinner: 5:00 pm – 8:00 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#hgs"), new place("Triple E's", [[0,0],[12,19],[12,19],[12,19],[12,19],[12,19],[0,0]], "Payne Whitney Gym", "Monday thru Friday: 12:00PM - 7:00PM ", "dh", "http://www.yale.edu/dining/locations/hours.html"), new place("Starbucks", [[6.0,22.5],[5.5,22.5],[5.5,22.5],[5.5,22.5],[5.5,22.5],[5.5,22.5],[6.0,22.5]], "1068-1070 Chapel St", "Sunday thru Saturday: 5:30AM - 10:30PM on Weekdays, 6:00AM - 10:30PM on Weekends", "snack", "http://www.starbucks.com/store/12296/"), new place("Blue State (York)", [[9,24],[7,24],[7,24],[7,24],[7,24],[7,23],[8,22]], "276 York St", "Monday thru Thursday: 7AM - 12AM, Friday 7AM - 11PM, Saturday 8AM - 10PM, Sunday 9AM - 12AM ", "snack", "https://www.bluestatecoffee.com/stores/new-haven-york-street/"), new place("Blue State (Wall)", [[9,23],[7,23],[7,23],[7,23],[7,23],[7,23],[8,23]], "84 Wall St", "Monday thru Friday: 7AM - 11PM, Saturday 8AM - 11PM, Sunday 9AM to 11PM", "snack", "https://www.bluestatecoffee.com/stores/new-haven-wall-street/"), new place("Willoughby's", [[8,19],[7,19],[7,19],[7,19],[7,19],[7,19],[7,19]], "258 Church St", "Monday thru Saturday: 7AM - 7PM, Sunday 8AM to 7PM", "snack", "http://www.willoughbyscoffee.com/locations.php"), new place("Au Bon Pain", [[7,23],[7,23],[7,23],[7,23],[7,23],[7,23],[7,23]], "One Broadway", "Monday thru Friday: 7AM - 11PM, Weekends 7AM - 11PM", "snack", "http://www.aubonpain.com/locations/default.aspx?l=3"), new place("The Mochi Store", [[15,21],[0,0],[0,0],[15,21],[15,21],[15,21],[13,22]], "216 Crown St", "Wed thru Friday: 3PM - 9PM, Saturday 1PM-10PM, Sunday 3PM-9PM", "snack", "http://www.facebook.com/themochistore/info"), new place("Froyo World", [[12,23],[12,23],[12,23],[12,23],[12,23],[12,24],[12,24]], "46 High St", "Sunday thru Thursday: 12PM - 11PM Friday thru Saturday 12PM - 12AM", "snack", "http://froyoworld.com/locations/"), new place("Flavors", [[0,24],[[0,1],[0,24]],[[0,1],[0,24]],[[0,1],[0,24]],[[0,11],[0,24]],[[0,11],[1,24]],[[0,11],[1,24]]], "290 York St", "Sunday to Wednesday: 1AM to 12 Midnight, Thursday to Saturday 11AM to 1AM", "snack", "http://www.flavorsfroyo.com/#!about"), new place("Yorkside", [[[0,11],[2,24]],[[0,11],[1,24]],[[0,11],[1,24]],[[0,11],[1,24]],[[0,11],[1,24]],[[0,11],[1,24]],[[0,11],[2,24]]], "288 York St", "Mon To Thursday: 11AM to 1AM, Friday to Saturday 11AM to 2AM, Sun:11:00 am        -1:00 am", "rest", "http://www.facebook.com/yorkside?sk=info"), new place("KBT (Lunch)", [[0,0],[11,14.5],[11,14.5],[11,14.5],[11,14.5],[11,14.5],[0,0]], "", "Monday thru Friday Breakfast: 8:30AM to 11:00AM, Lunch: 11:00AM to 2:30PM", "dh", "http://www.yale.edu/dining/locations/hours.html"), new place("KBT (Breakfast)", [[0,0],[8.5,11],[8.5,11],[8.5,11],[8.5,11],[8.5,11],[0,0]], "", "Monday thru Friday Breakfast: 8:30AM to 11:00AM, Lunch: 11:00AM to 2:30PM", "dh", "http://www.yale.edu/dining/locations/hours.html"), new place("Soul de Cuba", [[11.5,22],[11.5,22],[11.5,22],[11.5,22],[11.5,22],[11.5,23],[11.5,23]], "283 Crown Street", "Sunday - Thursday 11:30 AM - 10:00 PM, Friday & Saturday 11:30 AM - 11:00 PM", "rest", "http://www.souldecuba.com/contact.php"), new place("Skappo ", [[16.5,22],[0,0],[0,0],[16.5,22.5],[16.5,22.5],[16.5,23],[16.5,23]], "59 Crown Street", "Wednesday & Thursday: 4:30pm until 10:30pm, Friday & Sat: 4:30pm until 11:00pm, Sunday:  4:30pm until 10:00pm", "rest", "http://www.skappo.com/hours"), new place("Thai Taste", [[11.5,22],[[11.5,17],[15,22]],[[11.5,17],[15,22]],[[11.5,17],[15,22]],[[11.5,17],[15,22]],[11.5,22.5],[11.5,22.5]], "1151 Chapel Street", "Mon-Thu: 11:30AM - 3:00PM, 5:00PM 10:00PM, Fri-Sat: 11:30AM - 10:30PM, Sun: 11:30AM - 10:00PM", "rest", "http://www.thaitastenewhaven.com/"), new place("Miso", [[15.5,21.75],[[11.5,17],[14.75,21.75]],[[11.5,17],[14.75,21.75]],[[11.5,17],[14.75,21.75]],[[11.5,17],[14.75,21.75]],[[11.5,17],[14.75,22.75]],[[11.5,17],[14.75,22.75]]], "15 Orange Street", "Mon-Sat: 11:30AM-2:45PM,Mon-Thurs: 5:00PM-9:45PM, Fri-Sat: 5:00PM-10:45PM, Sunday: 3:30PM-9:45PM", "rest", "http://www.misorestaurant.com/contact.html"), new place("Union League Cafe", [[0,0],[[11.5,17.5],[14.5,21.5]],[[11.5,17.5],[14.5,21.5]],[[11.5,17.5],[14.5,21.5]],[[11.5,17.5],[14.5,21.5]],[[11.5,17],[14.5,22]],[17,22]], "1032 Chapel Street", "Monday-Fri: 11:30AM - 2:30PM, Monday - Thu: 5:30PM - 9:30 PM, Friday & Sat: 5:00PM - 10:00PM", "rest", "http://www.unionleaguecafe.com/restaurant.html"), new place("Seoul ", [[12,21.5],[0,0],[11.5,22],[11.5,22],[11.5,22],[11.5,22.5],[12,22.5]], "343 Crown Street", "Tue-Thurs 11:30AM-10PM, Fri 11:30AM-10:30PM, Sat 12PM-10:30PM , Sun 12PM-9:30PM ", "rest", "http://www.seoulrestaurant.net/content/view/12/21/"), new place("Caseus", [[0,0],[11.5,14.5],[11.5,14.5],[[11.5,17.5],[14.5,21]],[[11.5,17.5],[14.5,21]],[[11.5,17.5],[14.5,21.75]],[[11.5,17.5],[14.5,21.75]]], "93 Whitney Avenue", "Mon-Sat: 11:30AM-2:30PM, Wed-Thurs: 5:30PM-9:00PM, Friday-Sat: 5:30PM-9:45PM", "rest", "http://caseusnewhaven.com/menus-hours-info/"), new place("Tandoor", [[11.5,21.75],[11.5,21.75],[11.5,21.75],[11.5,21.75],[11.5,21.75],[11.5,21.75],[11.5,21.75]], "1226 Chapel Street", "Mon-Sun: 11:30AM - 9:45PM", "rest", "http://tandoornewhaven.com/about.html"), new place("Bentara ", [[0,0],[17,21.5],[17,21.5],[17,21.5],[17,21.5],[17,22.5],[[17,17],[22.5,21.5]]], "76 Orange Street", "Mon-Thur: 5:00PM-9:30PM, Fri & Sat: 5:00PM - 10:30PM, Sunday: 5:00PM - 9:30PM", "rest", "http://www.bentara.com/"), new place("Barcelona ", [[[0,17],[1,24]],[[0,17],[0,24]],[[0,17],[0,24]],[[0,17],[0,24]],[[0,17],[0,24]],[[0,17],[0,24]],[[0,17],[1,24]]], "155 Temple Street", "Sun-Thurs: 5pm-12am, Fri-Sat: 5pm-1am", "rest", "http://barcelonawinebar.com/nhabout.htm"), new place("Dunkin' Donuts", [[5,20],[5,20],[5,20],[5,20],[5,20],[5,20],[5,20]], "1179 Chapel Street", "Mon-Sun: 5:00AM- 8:00PM", "snack", "http://www.dunkindonuts.com/content/dunkindonuts/en/stores.html"), new place("Jojo's", [[9,21],[7,21],[7,21],[7,21],[7,21],[7,21],[9,21]], "1177 Chapel Street", "Mon-Fri 07:00 AM - 9:00 PM, Sat-Sun 09:00 AM - 9:00 PM", "snack", "http://local.yahoo.com/info-43993443-jojo-s-coffee-and-tea-new-haven"), new place("Chocopologie ", [[[0,12],[0,20]],[12,20],[12,22],[12,22],[12,23],[12,24],[[0,12],[0,24]]], "47 High Street", "Sun & Mon: 12PM-8:00PM, Tue-Wed: 12:00PM-10:00PM, Thu: 12:00PM-11:00PM, Fri-Sat: 12:00PM-12:00AM", "snack", "http://www.facebook.com/ChocopologieNewHaven/info")];


var allplaceslist2 = 
[new place("Miya's Sushi", [[[0,12],[0,22]],[12,22],[12,22],[12,23],[12,24],[[0,12],[0,24]],[[0,12],[0,24]]], "68 Howe Street ", "Sun - Tue: Noon-10:00PM, Wednesday: Noon-11:00PM. Thu - Sat: Noon-12:00AM", "rest", "http://miyassushi.com/"), new place("Prime 16", [[12,23],[11.5,23],[11.5,23],[11.5,23],[11.5,23],[11.5,23],[12,23]], "172 Temple Street", "Mon-Fri 11:30 am - 11 pm, Sat-Sun 12 pm - 11 pm", "rest", "http://prime16.com/"), new place("Zaroka", [[[12,17],[15,22.5]],[[11.5,17],[15,22.5]],[[11.5,17],[15,22.5]],[[11.5,17],[15,22.5]],[[11.5,17],[15,22.5]],[[11.5,17],[15,23]],[[11.5,17],[15,23]]], "148 York Street, New Haven, CT", "Monday – Saturday: 11:30 AM – 3:00 PM, Sunday: 12:00 PM – 3:00 PM, DINNER: Sunday – Thursday: 5:00 PM – 10:30 PM, Friday – Saturday: 5:00 PM – 11:00 PM", "rest", "http://zaroka.com/"), new place("Ibiza", [[0,0],[17,21.5],[17,21.5],[17,21.5],[17,21.5],[[12,17],[14.5,22.5]],[17,22.5]], "39 High Street, New Haven, CT", "Lunch. Friday 12:00 pm - 2:30 pm, Dinner, Monday - Thursday 5:00 pm - 9:30 pm, Friday & Saturday  5:00 pm - 10:30 pm", "rest", "http://www.ibizanewhaven.com/"), new place("Mamoun's", [[[0,11],[3,24]],[[0,11],[3,24]],[[0,11],[3,24]],[[0,11],[3,24]],[[0,11],[3,24]],[[0,11],[3,24]],[[0,11],[3,24]]], "85 Howe Street, New Haven, CT", "Sunday-Saturday 11 AM-3AM", "rest", "http://mamouns.com/"), new place("Basil", [[[0,11.5],[0,22]],[11.5,23],[11.5,23],[11.5,23],[11.5,23],[11.5,24],[[0,11.5],[0,24]]], "142 Howe Street", "MON - THURS:11:30am - 11:00pm, FRI - SAT: 11:30am - 12:00 am, SUN: 11:30am - 10:00pm", "rest", "http://www.basilnoodles.com/"), new place("Zinc", [[0,0],[17,21],[[12,17],[14.5,21]],[[12,17],[14.5,21]],[[12,17],[14.5,21]],[[12,17],[14.5,22]],[17,22]], "964 Chapel Street, New Haven, CT", "LUNCH: Tues-Fri 12-2:30, DINNER: Mon-Thu 5-9, Fri + Sat 5-10, Closed on Sun", "rest", "http://zincfood.com/"), new place("Thali Too", [[12,21.5],[12,22],[12,22],[12,22],[12,22],[12,23],[12,23]], "65 Broadway, New Haven, CT", "Monday - Thursday, 12:00 pm - 10:00 pm, Friday and Saturday, 12:00 pm - 11:00 pm, Sunday, Brunch 12:00 pm - 9:30 pm ", "rest", "http://www.thali.com/t21.html"), new place("168 York St Cafe", [[[11,20],[15,24]],[[0,15],[0,21]],[15,21],[15,21],[15,24],[[0,15],[0,21]],[14,21]], "168 York Street", "Mon-Fri 3 PM to 7 PM & 5:30 PM to 9 PM and 2 PM to 8 PM on Sat , Sun 11:00 am - 3:00 pm, Thur 9-12 AM", "rest", "http://www.168yorkstreetcafe.com/"), new place("Great Wall", [[11,22],[10,21],[10,21],[10,21],[10,21],[10,21],[11,22]], "67 Whitney Ave", "Mon-Fri 10 am - 9 pm, Sat-Sun 11 am - 10 pm", "rest", "http://www.yelp.com/biz/great-wall-of-china-new-haven"), new place("York St Noodle", [[11.5,22],[11.5,22],[11.5,22],[11.5,22],[11.5,22],[11.5,23],[11.5,23]], "166 York Street", "SUN. - THR.  11.30 AM. - 10.00 PM., FRI. - SAT. 11.30 AM. 11.00 PM.", "rest", "http://www.yorkstnoodlehouse.com/"), new place("Bass Library", [[12,24],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,24]],[[0,8.5],[1.75,21.75]],[10,18.75]], "110 Wall Street", "Mon- Fri 8:30 to 1:45AM Sat 10 to 6:45PM Sun 12:00 to 1:45AM", "lib", "http://www.library.yale.edu/bass/index.html"), new place("Haas Arts Library", [[14,23],[8.5,23],[8.5,23],[8.5,23],[8.5,23],[8.5,17],[10,18]], "180 York Street", "Mon-Thur 8:30 a.m. - 11:00 p.m. Fri 8:30 a.m. - 5:00 p.m. Sat 10:00 a.m. -6:00 p.m. Sun 2:00 p.m. -11:00 p.m.", "lib", "http://www.library.yale.edu/arts/"), new place("Music Library", [[13,20.75],[8.5,20.75],[8.5,20.75],[8.5,20.75],[8.5,20.75],[8.5,16.75],[10,16.75]], "120 High Street ", "Mon - Fri 8:30 to 8:45PM Sat 10 to 4:45PM Sun 1:00 to 8:45PM", "lib", "http://www.library.yale.edu/musiclib/"), new place("Sterling Memorial Library", [[12,23.75],[8.5,23.75],[8.5,23.75],[8.5,23.75],[8.5,23.75],[8.5,16.75],[10,16.75]], "130 Wall Street", "Mon - Th 8:30 to 11:45PM Fri 8:30 to 4:45PM Sat 10:00 to 4:45PM Sun 12:00 to 11:45PM", "lib", "http://www.library.yale.edu/rsc/sml/"), new place("Classics Library", [[17,21],[8.5,21],[8.5,21],[8.5,21],[8.5,21],[8.5,17],[0,0]], "344 College Street", "Sun 5:00PM to 9:00PM Mon - Thu 8:30 to 9:00PM Fri 8:30 to 5:00PM", "lib", "http://www.library.yale.edu/libraries/classics.html"), new place("Astronomy Library", [[0,0],[8.5,14.5],[8.5,14.5],[8.5,14.5],[8.5,14.5],[8.5,14.5],[0,0]], "260 Whitney Ave", "Mon-Fri 8:30 to 2:30PM", "lib", "http://www.astro.yale.edu/resources/library"), new place("Chemistry Library", [[0,0],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[0,0]], "225 Prospect", "Mon-Fri 8:30 to 5:00PM", "lib", "http://www.library.yale.edu/science/library/chemistry.html"), new place("CSSSI", [[13,23],[8.5,23],[8.5,23],[8.5,23],[8.5,23],[8.5,19],[12,20]], "219 Prospect", "Sun 1:00PM to 11:00PM Mon - Thu 8:30AM to 11:00PM Fri 8:30 to 7:00PM Sat 12:00PM to 8:00Pm", "lib", "http://csssi.yale.edu/"), new place("Divinity School Library", [[14,23],[8.5,23],[8.5,23],[8.5,23],[8.5,23],[8.5,17],[8.5,17]], "409 Prospect ", "Monday – Thursday 8:30 am – 10:50 pm Friday – Saturday 8:30 am – 4:50 pm Sunday 2:00 pm – 10:50 pm", "lib", "http://www.library.yale.edu/div/hours.html#directions"), new place("East Asia Library", [[6.5,22.5],[6.5,22.5],[6.5,22.5],[6.5,22.5],[6.5,22.5],[6.5,22.5],[6.5,17]], "SML 213", "6:30 a.m. to 10:30 p.m. (Closes at 5p.m. on Sat.)", "lib", "http://www.library.yale.edu/eastasian/library_services/pku_yale.html"), new place("Engineering and Applied Science Library", [[13.5,22],[8.5,22],[8.5,22],[8.5,22],[8.5,22],[8.5,17],[13,17]], "10 Hillhouse", "8:30 to 10, Monday thru thrusday, 5:00PM friday and saturday", "lib", "http://www.library.yale.edu/science/library/engineering.html"), new place("Geology Library", [[0,0],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[0,0]], "210 Whitney", "8:30 to 5:00PM Monday thru Friday", "lib", "http://www.library.yale.edu/libraries/geology.html"), new place("Law Library", [[0,0],[9,16],[9,16],[9,16],[9,16],[9,16],[0,0]], "127 Wall", "9:00 to 4:00PM Monday thru Friday ", "lib", "http://resources.library.yale.edu/libraryhours/Calendar.aspx?&library=LAW&service=0&startday=4/1/2012"), new place("Mathematics Library", [[0,0],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[0,0]], "12 Hillhouse", "8:30 to 5:00PM monday thru Friday", "lib", "http://resources.library.yale.edu/libraryhours/Calendar.aspx?&library=MAT&service=0&startday=4/1/2012"), new place("Medical Library", [[9.5,24],[[0,8],[2,24]],[[0,8],[2,24]],[[0,8],[2,24]],[[0,8],[2,24]],[[0,8],[2,24]],[[0,10],[2,22]]], "333 Cedar", "Sunday 9:30AM to 2:00 AM. Monday thru Thursday 8:00AM to 2:00 AM Saturday 10AM to 10PM ", "lib", "http://resources.library.yale.edu/libraryhours/Calendar.aspx?&library=MED&service=0&startday=4/15/2012")];

var allplaceslist3 =
[new place("Payne Whitney Gym", [[9.5,16.5],[6,22],[6,22],[6,22],[6,22],[6,20],[9.5,16.5]], "70 Tower Parkway", "Mon - Thu, 6:00am - 10:00PM, Fridays 6-8, Weekend 9:30-4:30", "misc", "http://www.yalebulldogs.com/information/facilities/payne_whitney_gym/directions"), new place("Yale Post Office", [[0,0],[9,17.5],[9,17.5],[9,17.5],[9,17.5],[9,17.5],[8,12]], "206 Elm", " Mon - Fri, 9am - 5:30pm, Sat 8 am - 12 pm", "misc", "http://www.yelp.com/biz/united-states-post-office-new-haven"), new place("Undergraduate Career Services", [[0,0],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[8.5,17],[0,0]], "55 Whitney", " Mon - Fri, 8:30am - 5:00pm ", "misc", "http://www.yale.edu/visvi/about/general_info.html"), new place("Commons Breakfast", [[0,0],[7.75,11],[7.75,11],[7.75,11],[7.75,11],[7.75,11],[0,0]], "", "Monday - Friday: Hot Breakfast: 7:45 am – 11:00 am", "dh", "http://www.yale.edu/dining/locations/hours.html#commons"), new place("Commons Lunch", [[0,0],[11,14.5],[11,14.5],[11,14.5],[11,14.5],[11,14.5],[0,0]], "", "Monday - Friday: Lunch: 11:00 am – 2:30 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#commons"), new place("All Colleges Breakfast", [[0,0],[8,11],[8,11],[8,11],[8,11],[8,11],[0,0]], "", "Monday - Friday: Continental Breakfast: 8:00 a.m. – 11:00 a.m.", "dh", "http://www.yale.edu/dining/locations/hours.html#residential"), new place("Morse and Calhoun Breakfast Only", [[8,10.5],[0,0],[0,0],[0,0],[0,0],[0,0],[8,10.5]], "", "Sat & Sun: 8 am - 10:30 am", "dh", "http://www.yale.edu/dining/locations/hours.html#residential"), new place("All Colleges Brunch", [[11,13.5],[0,0],[0,0],[0,0],[0,0],[0,0],[11,13.5]], "", "Sat & Sun: 11 am - 1:30 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#residential"), new place("All Colleges Dinner", [[17,19],[17,19.5],[17,19.5],[17,19.5],[17,19.5],[17,19],[17,19]], "", "Monday - Thursday: 5 pm - 7:30 pm, Friday - Sunday 5 pm - 7 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#residential"), new place("All Colleges Lunch", [[0,0],[11.5,13.5],[11.5,13.5],[11.5,13.5],[11.5,13.5],[11.5,13.5],[0,0]], "", "Monday - Friday: Lunch: 11:30 a.m. – 1:30 p.m.", "dh", "http://www.yale.edu/dining/locations/hours.html#residential"), new place("Durfee's", [[[0,12],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,10],[2.5,24]],[[0,12],[2.5,24]]], "", "M-F: 10:00 am – 2:30 am, Sat-Sun: 12:00 pm - 2:30 am", "dh", "http://www.yale.edu/dining/locations/hours.html#durfee"), new place("Slifka Breakfast", [[0,0],[8,10],[8,10],[8,10],[8,10],[8,10],[0,0]], "", "M-F: 8:00 am - 10:00 am", "dh", "http://www.slifkacenter.org/slifka-dining"), new place("Slifka Lunch", [[0,0],[11.5,13.5],[11.5,13.5],[11.5,13.5],[11.5,13.5],[11.5,13.5],[12.5,13.5]], "", "M-F: 11:30 am - 1:30 pm, Sat (Shabbat): 12:30 pm", "dh", "http://www.slifkacenter.org/slifka-dining"), new place("Slifka Brunch", [[11,13],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]], "", "Su: 11:00 am - 1:00 pm", "dh", "http://www.slifkacenter.org/slifka-dining"), new place("Slifka Dinner", [[17,19.5],[17,19.5],[17,19.5],[17,19.5],[17,19.5],[19,20],[0,0]], "", "Su-Th: 5:00 pm - 7:30 pm, F (Shabbat): 7:00 pm", "dh", "http://www.slifkacenter.org/slifka-dining"), new place("Bass Cafe", [[12,23],[10,23],[10,23],[10,23],[10,23],[10,17],[12,17]], "", "M-Th: 10 am - 11 pm, F: 10 am - 5 pm, Sa: 12 pm - 5 pm, Su: 12 pm - 11 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#thain"), new place("Morse, Calhoun, Stiles Dinner Only", [[0,0],[19.5,20],[19.5,20],[19.5,20],[19.5,20],[0,0],[0,0]], "", "Monday - Thursday: 7:30 pm - 8 pm", "dh", "http://www.yale.edu/dining/locations/hours.html#residential")];





