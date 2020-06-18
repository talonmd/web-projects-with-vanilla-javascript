const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value

// SAVE MOVIE DATA INTO LOCAL STORAGE
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex)
  localStorage.setItem('selectedMoviePrice', moviePrice)
}

// UPDATE THE TOTAL PRICE AND THE SEAT COUNT
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length
// this copies the elements of an array ...var
const seatsIndex = [...selectedSeats].map(function(seat) {
  return [...seats].indexOf(seat)
})  
localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
count.innerText = selectedSeatsCount
total.innerText = `$${selectedSeatsCount * ticketPrice}`
}

// PULL DATA FROM LOCAL STORAGE AND DISPLAY IT
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// SELECT MOVIE EVENT
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

container.addEventListener('click', function(e) {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
})

// SETTING INITIAL COUNT AND TOTAL ON PAGE LOAD (FROM LOCAL STORAGE)
updateSelectedCount()