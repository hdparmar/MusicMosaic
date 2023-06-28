window.onload = function() {
    var loginContainer = document.getElementById('login-container');
    var searchContainer = document.getElementById('search-container');
  
    loginContainer.style.display = 'block';
    searchContainer.style.display = 'block';
  };
  
  document.getElementById('login-button').addEventListener('click', function() {
    window.location.href = '/login';
  });
  
  document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = document.getElementById('search-input').value;
    // Handle the search...
  });
  