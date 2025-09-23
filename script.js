const today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = "2025";
var monthValue = Number(mm);
var date = "";
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var dateString = monthNames[monthValue - 1] + " " + dd + ", 2025";
var jsonDate = (mm + dd);
var categoryVal = 0;
var day_of_the_week = today.getDay();
console.log(day_of_the_week);
var attractionHoursList = "";
var guestServicesHoursList = "";
var diningHoursList = "";
var shoppingHoursList = "";
var date_2;










window.onload = function() {
        initialPopulation();
        populateAttractions();
        populateGuestServices();
        populateDining();
        populateShopping();
};










function populateAttractions() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://tyauk.github.io/bmr-attraction-hours/hours.json', true); // true for asynchronous
        xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText); // Parse the JSON string
                        // Use the loaded JSON data here
                        attractionHoursList = data.activities;
                        populateAttractionHours(attractionHoursList);
                        //document.getElementById('output').textContent = JSON.stringify(data, null, 2);
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                        console.error('Error loading JSON:', xhr.statusText);
                }
        };

    xhr.send();
    
}

function populateDining() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://tyauk.github.io/bmr-attraction-hours/dining.json', true); // true for asynchronous
        xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText); // Parse the JSON string
                        // Use the loaded JSON data here
                        diningHoursList = data.dining;
                        populateDiningHours(diningHoursList);
                        //document.getElementById('output').textContent = JSON.stringify(data, null, 2);
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                        console.error('Error loading JSON:', xhr.statusText);
                }
        };

    xhr.send();
    
}

function populateGuestServices() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://tyauk.github.io/bmr-attraction-hours/guestServices.json', true); // true for asynchronous
        xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText); // Parse the JSON string
                        // Use the loaded JSON data here
                        guestServicesHoursList = data.guest_services;
                        populateGuestServicesHours(guestServicesHoursList);
                        //document.getElementById('output').textContent = JSON.stringify(data, null, 2);
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                        console.error('Error loading JSON:', xhr.statusText);
                }
        };

    xhr.send();
    
}

function populateShopping() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://tyauk.github.io/bmr-attraction-hours/shopping.json', true); // true for asynchronous
        xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText); // Parse the JSON string
                        // Use the loaded JSON data here
                        shoppingHoursList = data.shopping;
                        populateShoppingHours(shoppingHoursList);
                        //document.getElementById('output').textContent = JSON.stringify(data, null, 2);
                } else if (xhr.readyState === 4 && xhr.status !== 200) {
                        console.error('Error loading JSON:', xhr.statusText);
                }
        };

    xhr.send();
    
}










function initialPopulation() {
        const section = document.getElementById("control-section");
        const hours_el = document.getElementById("hours");

        const dateTitle = document.createElement('div');
        dateTitle.classList.add("date-title");
        dateTitle.id = "currentDate";
        dateTitle.innerHTML = "Hours for " + dateString;
        section.appendChild(dateTitle);

        const datePickerButton = document.createElement('div');
        datePickerButton.innerHTML = "<span class='date-picker-button'>Choose A Different Date: </span><input id='selectedDate' type='date'>";
        section.appendChild(datePickerButton);

        const menuWrap = document.createElement('div');
        menuWrap.classList.add("menu-wrap");
        section.appendChild(menuWrap);

        const menuWrap_el = document.getElementsByClassName("menu-wrap");

        for(i = 0; i < 4; i++){

                const menuItem = document.createElement('div');

                menuItem.classList.add('menu-item-wrapper');

                if(i == categoryVal){
                        menuItem.classList.add('selected');
                }

                if(i > 2){
                        menuItem.innerHTML = "<button onclick='shoppingHours()' class='menu-item'>Shopping</button>";
                }else if(i > 1){
                        menuItem.innerHTML = "<button onclick='diningHours()'class='menu-item'>Dining</button>";
                }else if(i > 0){
                        menuItem.innerHTML = "<button onclick='guestServicesHours()' class='menu-item'>Guest Services</button>";
                }else {
                        menuItem.innerHTML = "<button onclick='attractionHours()'class='menu-item'>Attractions</button>";
                }

                menuWrap_el[0].appendChild(menuItem);

        }

        const categoryTitle = document.createElement('div');
        categoryTitle.classList.add("date-title");
        categoryTitle.classList.add("title-padding");
        categoryTitle.id = "category";
        if(categoryVal == 0){
                categoryTitle.innerHTML = "Attraction Hours";
        }else if(categoryVal == 1){
                categoryTitle.innerHTML = "Guest Services Hours";
        }else if(categoryVal == 2){
                categoryTitle.innerHTML = "Dining Hours";
        }else if(categoryVal == 3){
                categoryTitle.innerHTML = "Shopping Hours";
        }
        hours_el.appendChild(categoryTitle);

}










setTimeout(() => {
        const inputElement = document.getElementById("selectedDate");
        inputElement.addEventListener("change", (event) => {
                date = event.target.value;
                console.log("Input value changed:", date);
                yyyy = date.substr(0, 4);
                mm = date.substr(5, 2);
                dd = date.substr(8, 2);
                monthValue = Number(mm);
                date = monthNames[monthValue - 1] + " " + dd + ", " + yyyy;
                date_2 = new Date(monthNames[monthValue-1] + " " + dd + ", 2025");
                console.log(date_2);
                day_of_the_week = date_2.getDay();
                jsonDate = (mm + dd);
                console.log(jsonDate);
                document.getElementById("currentDate").innerHTML = "Hours for " + date;
                document.getElementById("attraction-hours-container").innerHTML = "";
                document.getElementById("guest-services-hours-container").innerHTML = "";
                document.getElementById("dining-hours-container").innerHTML = "";
                document.getElementById("shopping-hours-container").innerHTML = "";
                populateAttractionHours(attractionHoursList);
                populateGuestServicesHours(guestServicesHoursList);
                populateDiningHours(diningHoursList);
                populateShoppingHours(shoppingHoursList);
        });
}, 1000); 










function attractionHours() {
        categoryVal = 0;
        const menuItems = document.getElementsByClassName("menu-item-wrapper");
        for(i = 0;i < menuItems.length;i++){
                if(i == categoryVal){
                        menuItems[i].classList.add("selected");
                }else{
                        menuItems[i].classList.remove("selected");
                }
        }

        document.getElementById("category").innerHTML = "Attraction Hours";
        document.getElementById("attraction-hours-container").style.display = "block";
        document.getElementById("guest-services-hours-container").style.display = "none";
        document.getElementById("dining-hours-container").style.display = "none";
        document.getElementById("shopping-hours-container").style.display = "none";
}

function guestServicesHours() {
        categoryVal = 1;
        const menuItems = document.getElementsByClassName("menu-item-wrapper");
        for(i = 0;i < menuItems.length;i++){
                if(i == categoryVal){
                        menuItems[i].classList.add("selected");
                }else{
                        menuItems[i].classList.remove("selected");
                }
        }

        document.getElementById("category").innerHTML = "Guest Services Hours";
        document.getElementById("attraction-hours-container").style.display = "none";
        document.getElementById("guest-services-hours-container").style.display = "block";
        document.getElementById("dining-hours-container").style.display = "none";
        document.getElementById("shopping-hours-container").style.display = "none";
}

function diningHours() {
        categoryVal = 2;
        const menuItems = document.getElementsByClassName("menu-item-wrapper");
        for(i = 0;i < menuItems.length;i++){
                if(i == categoryVal){
                        menuItems[i].classList.add("selected");
                }else{
                        menuItems[i].classList.remove("selected");
                }
        }

        document.getElementById("category").innerHTML = "Dining Hours";
        document.getElementById("attraction-hours-container").style.display = "none";
        document.getElementById("guest-services-hours-container").style.display = "none";
        document.getElementById("dining-hours-container").style.display = "block";
        document.getElementById("shopping-hours-container").style.display = "none";
}

function shoppingHours() {
        categoryVal = 3;
        const menuItems = document.getElementsByClassName("menu-item-wrapper");
        for(i = 0;i < menuItems.length;i++){
                if(i == categoryVal){
                        menuItems[i].classList.add("selected");
                }else{
                        menuItems[i].classList.remove("selected");
                }
        }

        document.getElementById("category").innerHTML = "Shopping Hours";
        document.getElementById("attraction-hours-container").style.display = "none";
        document.getElementById("guest-services-hours-container").style.display = "none";
        document.getElementById("dining-hours-container").style.display = "none";
        document.getElementById("shopping-hours-container").style.display = "block";
}










function populateAttractionHours(obj) {
        
        const hoursWrapper = document.getElementById("hours");
        const attractionHoursContainer = document.createElement('div');
        attractionHoursContainer.id = "attraction-hours-container";
        hoursWrapper.appendChild(attractionHoursContainer);
        console.log(jsonDate);
        
        for(i = 0;i < obj.length;i++){
                if((jsonDate > obj[i].start_date) && (jsonDate < obj[i].end_date)){
                        const attractionWrap = document.createElement('div');
                        attractionWrap.classList.add('hours-wrapper');
                        if(day_of_the_week == 0){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.sunday + "</span></span>";
                        }else if(day_of_the_week == 1){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.monday + "</span></span>";
                        }else if(day_of_the_week == 2){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.tuesday + "</span></span>";
                        }else if(day_of_the_week == 3){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.wednesday + "</span></span>";
                        }else if(day_of_the_week == 4){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.thursday + "</span></span>";
                        }else if(day_of_the_week == 5){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.friday + "</span></span>";
                        }else if(day_of_the_week == 6){
                                attractionWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.saturday + "</span></span>";
                        }
                        document.getElementById("attraction-hours-container").appendChild(attractionWrap);
                }
        }

}

function populateDiningHours(obj){

        const hoursWrapper = document.getElementById("hours");
        const diningHoursContainer = document.createElement('div');
        diningHoursContainer.id = "dining-hours-container";
        hoursWrapper.appendChild(diningHoursContainer);
        console.log(jsonDate);
        
        for(i = 0;i < obj.length;i++){
                if((jsonDate > obj[i].start_date) && (jsonDate < obj[i].end_date)){
                        const diningWrap = document.createElement('div');
                        diningWrap.classList.add('hours-wrapper');
                        if(day_of_the_week == 0){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.sunday + "</span></span>";
                        }else if(day_of_the_week == 1){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.monday + "</span></span>";
                        }else if(day_of_the_week == 2){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.tuesday + "</span></span>";
                        }else if(day_of_the_week == 3){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.wednesday + "</span></span>";
                        }else if(day_of_the_week == 4){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.thursday + "</span></span>";
                        }else if(day_of_the_week == 5){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.friday + "</span></span>";
                        }else if(day_of_the_week == 6){
                                diningWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.saturday + "</span></span>";
                        }
                        document.getElementById("dining-hours-container").appendChild(diningWrap);
                }
        }
}

function populateGuestServicesHours(obj) {
        const hoursWrapper = document.getElementById("hours");
        const gsHoursContainer = document.createElement('div');
        gsHoursContainer.id = "guest-services-hours-container";
        hoursWrapper.appendChild(gsHoursContainer);
        console.log(jsonDate);
        
        for(i = 0;i < obj.length;i++){
                if((jsonDate > obj[i].start_date) && (jsonDate < obj[i].end_date)){
                        const gsWrap = document.createElement('div');
                        gsWrap.classList.add('hours-wrapper');
                        if(day_of_the_week == 0){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.sunday + "</span></span>";
                        }else if(day_of_the_week == 1){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.monday + "</span></span>";
                        }else if(day_of_the_week == 2){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.tuesday + "</span></span>";
                        }else if(day_of_the_week == 3){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.wednesday + "</span></span>";
                        }else if(day_of_the_week == 4){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.thursday + "</span></span>";
                        }else if(day_of_the_week == 5){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.friday + "</span></span>";
                        }else if(day_of_the_week == 6){
                                gsWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.saturday + "</span></span>";
                        }
                        document.getElementById("guest-services-hours-container").appendChild(gsWrap);
                }
        }
}

function populateShoppingHours(obj) {
        
        const hoursWrapper = document.getElementById("hours");
        const shoppingHoursContainer = document.createElement('div');
        shoppingHoursContainer.id = "shopping-hours-container";
        hoursWrapper.appendChild(shoppingHoursContainer);
        console.log(jsonDate);
        
        for(i = 0;i < obj.length;i++){
                if((jsonDate > obj[i].start_date) && (jsonDate < obj[i].end_date)){
                        const shoppingWrap = document.createElement('div');
                        shoppingWrap.classList.add('hours-wrapper');
                        if(day_of_the_week == 0){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.sunday + "</span></span>";
                        }else if(day_of_the_week == 1){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.monday + "</span></span>";
                        }else if(day_of_the_week == 2){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.tuesday + "</span></span>";
                        }else if(day_of_the_week == 3){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.wednesday + "</span></span>";
                        }else if(day_of_the_week == 4){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.thursday + "</span></span>";
                        }else if(day_of_the_week == 5){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.friday + "</span></span>";
                        }else if(day_of_the_week == 6){
                                shoppingWrap.innerHTML = "<img src='" + obj[i].image_url + "' class='image'><span class='content'><span class='title'>" + obj[i].name + "</span><span class='hours-text'>" + obj[i].hours.saturday + "</span></span>";
                        }
                        document.getElementById("shopping-hours-container").appendChild(shoppingWrap);
                }
        }
}





















