const firebaseConfig = {

  apiKey: "AIzaSyBN4-jBAS31buEsCupXoVcB_-mKGenA5xw",
  authDomain: "khitanan-invi.firebaseapp.com",
  projectId: "khitanan-invi",
  storageBucket: "khitanan-invi.firebasestorage.app",
  messagingSenderId: "841682916739",
  appId: "1:841682916739:web:cf4ca0881a1275a97412b6",
  measurementId: "G-S0R61B973E"
};

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

async function sendComment() {

  const name = document.getElementById('name').value
  const message = document.getElementById('message').value

  if (name === '' || message === '') {
    alert('Lengkapi data')
    return
  }

  await db.collection('comments').add({
    name,
    message,
    createdAt: new Date()
  })

  document.getElementById('name').value = ''
  document.getElementById('message').value = ''

}

const commentList = document.getElementById('commentList')

let allComments = []
let showAll = false

db.collection('comments')
  .orderBy('createdAt', 'desc')
  .onSnapshot((snapshot) => {

    allComments = []

    snapshot.forEach((doc) => {
      allComments.push(doc.data())
    })

    renderComments()

  })

function renderComments() {

  commentList.innerHTML = ''

  const commentsToShow = showAll
    ? allComments
    : allComments.slice(0, 5)

  commentsToShow.forEach((data) => {

    commentList.innerHTML += `
      <div class="comment-item">
        <h4>${data.name}</h4>
        <p>${data.message}</p>
      </div>
    `
  })

  if (allComments.length > 5) {

    commentList.innerHTML += `
      <button class="btn-primary" onclick="toggleComments()">
        ${showAll ? 'Tampilkan Sedikit' : 'Lihat Semua'}
      </button>
    `
  }

}

function toggleComments() {

  showAll = !showAll

  renderComments()

}
