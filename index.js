import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; 
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://endorsements-60691-default-rtdb.firebaseio.com/"
}

// Initialize Firebase
const app = initializeApp(appSettings)
const database = getDatabase(app)
const commentsInDB =  ref(database, "comments")
const inputFieldEl = document.querySelector("#text-input")
const submitBtnEl = document.querySelector("#publish-btn")
const commentContainerEl = document.querySelector("#comments-container")
const recipientInputEl = document.querySelector("#recipient-input")
const senderInputEl = document.querySelector("#sender-input")

onValue(commentsInDB, snapshot => {
    if(snapshot.exists()) {
        clearComments()
        let arrayItems = Object.entries(snapshot.val())
        for(let i = 0; i < arrayItems.length; i++) {
            let currentItem = arrayItems[i]
            const [ id, commentData ] = currentItem
            const comment = commentData.comment
            const sender = commentData.sender
            const recipient = commentData.recipient
            addNewComment(recipient, comment, sender)
        }
    } else {
        commentContainerEl.innerHTML = "There are no comments at this time."
    }

})

submitBtnEl.addEventListener('click', () => {
    let dataObject = {
        comment: inputFieldEl.value,
        recipient: recipientInputEl.value,
        sender: senderInputEl.value
}
    addCommentToDB(dataObject)
})

const addCommentToDB = obj => push(commentsInDB, obj)

const addNewComment = (recipient, text, sender) =>
    commentContainerEl.innerHTML += `
    <section class="comment">
    <p class="recipient">To: ${recipient}</p>
    <p>${text}</p>
    <p class="sender">From: ${sender}</p>
    </section
    `

const clearComments = () => commentContainerEl.innerHTML = ""

