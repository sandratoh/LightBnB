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