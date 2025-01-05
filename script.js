const apiKey = '630e428872d36f9a14691206b1113a27'; // Replace with your OpenWeather API key.

document.getElementById("generate").addEventListener("click", function () {
    const city = document.getElementById("city").value; // Get city input
    const outputDiv = document.getElementById("output"); // Output div

    // Check if city input is empty
    if (!city) {
        outputDiv.innerText = "Please enter a destination city.";
        return;
    }

    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},US&appid=${apiKey}&units=imperial`)
        .then(response => response.json())
        .then(data => {
            // Extract weather information
            const temperature = data.main.temp;
            const weather = data.weather[0].description;

            // Example: Display weather details
            outputDiv.innerHTML = `
                <h3>Weather in ${city}</h3>
                <p>Temperature: ${temperature}°F</p>
                <p>Condition: ${weather}</p>
            `;

            // TODO: Generate packing list based on this data
            let packingList = "Packing List:\n";

            if (temperature < 40) {
                packingList += "- Winter coat\n- Gloves\n- Scarf\n- Boots\n";
            } else if (temperature < 70) {
                packingList += "- Light jacket\n- Sweater\n- Comfortable shoes\n";
            } else {
                packingList += "- T-shirts\n- Shorts\n- Sandals\n";
            }

            // Add a note for rainy weather
            if (weather.includes("rain")) {
                packingList += "- Umbrella\n- Waterproof shoes\n";
            }

            // Display the packing list
            outputDiv.innerHTML += `<pre>${packingList}</pre>`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            outputDiv.innerText = "Unable to fetch weather data. Please try again.";
        });
});
