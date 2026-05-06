const openBtn = document.getElementById('openBtn')
const greetingPage = document.getElementById('greetingPage')
const mainContent = document.getElementById('mainContent')
const bgMusic = document.getElementById('bgMusic')

openBtn.addEventListener('click', async () => {

  greetingPage.style.display = 'none'
  mainContent.classList.remove('hidden')

  try {
    await bgMusic.play()
  } catch (err) {
    console.log(err)
  }

})

const params = new URLSearchParams(window.location.search)
const guest = params.get('to')

if (guest) {
  document.getElementById('guestName').innerText = guest
}

const targetDate = new Date('May 17, 2026 09:00:00').getTime()

setInterval(() => {

  const now = new Date().getTime()
  const distance = targetDate - now

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  document.getElementById('days').innerText = days
  document.getElementById('hours').innerText = hours
  document.getElementById('minutes').innerText = minutes
  document.getElementById('seconds').innerText = seconds

}, 1000)

function copyRekening() {

  const rekening = document.getElementById('rekening').innerText

  navigator.clipboard.writeText(rekening)

  alert('Nomor rekening berhasil disalin')

}
