const findMystate = () => {
  const status = document.querySelector('.status');

  const success = (position) => {
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const userLocation = `${data.city}, ${data.principalSubdivision}, ${data.countryName}`;
        status.textContent = userLocation;

        // Create content to save in a file
        const content = `Location: ${userLocation}\nLatitude: ${latitude}\nLongitude: ${longitude}`;

        // Create a Blob object with the content
        const blob = new Blob([content], { type: 'text/plain' });

        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'user_location.txt';  // Name of the file

        // Append link to body, click to download, then remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  };

  const error = () => {
    status.textContent = 'Unable to retrieve your location';
  };

  navigator.geolocation.getCurrentPosition(success, error);
};

document.querySelector('.find-state').addEventListener('click', findMystate);
