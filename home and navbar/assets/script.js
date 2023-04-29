document.addEventListener('DOMContentLoaded', function() {
    var userButton = document.querySelector('.user-button');
    var userMenu = document.querySelector('.user-menu');
  
    userButton.addEventListener('click', function(event) {
      event.stopPropagation();
      userMenu.classList.toggle('open');
    });
  
    document.addEventListener('click', function() {
      userMenu.classList.remove('open');
    });
  });