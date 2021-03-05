$(() => {

  const $makeReservationForm = $(`
  <form class="reservation-form">
    <div class="reservation-form-field">
      <input type="date" name="start_date" placeholder="start date">
    </div>
    <div class="reservation-form-field">
      <input type="date" name="end_date" placeholder="end date">
    </div>
    <div class="reservation-form-button">
      <button>Make Reservation</button>
      <a id="reservation-form__cancel" href="#">Cancel</a>
    </div>
  </form>
  `);
  window.$makeReservationForm = $makeReservationForm;

  $makeReservationForm.on('submit', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    signUp(data)
      .then(getMyDetails)
      .then((json) => {
        header.update(json.user);
        views_manager.show('listings');
      });
  });

  $('body').on('click', '#reservation-form__cancel', function() {
    views_manager.show('listings');
    return false;
  });
      
});







/*

$(document).ready(() => {
  // const reservationForm = document.getElementsByClassName('reservation-form');
  // reservationForm.onsubmit = () => {
  //   alert('hi');
  // };

  
  $('.reservation-form').on('submit', event => {
    event.preventDefault();
    alert('hi');
  });
  

  

// const inputField = document.getElementsByClassName('reservation-form-field');
// inputField.onsubmit = () => alert('hi');
// // reservationForm.onclick(
//   alert('hi');

// );
  


  // form.on('submit', event => {
  //   alert('hi');
  // });
  // form.onsubmit(alert('hi'));
});

*/