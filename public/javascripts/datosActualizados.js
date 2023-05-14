  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');

  
  const messageContainer = document.getElementById('messageContainer');
  if (message) {
    messageContainer.textContent = message;
    messageContainer.style.backgroundColor = '#dff0d8';
    messageContainer.style.color = '#3c763d';
    messageContainer.style.padding = '10px';
    messageContainer.style.marginBottom = '20px';
    messageContainer.style.borderRadius = '5px';
  }
