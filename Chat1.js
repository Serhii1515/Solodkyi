const firebaseConfig = {
  apiKey: "AIzaSyBPaC4Ypj2s0XGOFvu6YlQBx1_o6jKf3sE",
  authDomain: "socialmedia-ec58b.firebaseapp.com",
  projectId: "socialmedia-ec58b",
  storageBucket: "socialmedia-ec58b.appspot.com",
  messagingSenderId: "293759191684",
  appId: "1:293759191684:web:37b4d57c7c6216d49110d1",
  measurementId: "G-4JTCM5F8Z2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();

console.log("Firebase connected");

// get current username
var name = window.prompt("Enter your name");

// Getting all message and listeing real time chat

db.collection("chats")
  .orderBy("date")
  .onSnapshot(function (snapshot) {
    snapshot.docChanges().forEach(function (change, ind) {
      var data = change.doc.data();
      // if new message added
      if (change.type == "added") {
        if (data.senderName == name) {
          //Which message i sent

          var html = `<li class="left clearfix">
                    <span class="chat-img pull-left">
                        <img src="http://placehold.it/50/55C1E7/fff&text=${data.senderName}" alt="User Avatar" class="img-circle" />
                    </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <strong class="primary-font">${data.senderName}</strong> <small class="pull-right text-muted">
                                <span class="glyphicon glyphicon-time"></span>${data.date}</small>
                        </div>
                        <p id="${change.doc.id}-message">
                            ${data.message}
                        </p>
                        <span onclick="deleteMessage('${change.doc.id}')" class="glyphicon glyphicon-trash"></span> 
                    </div>
                </li>`;

          $(".chat").append(html);
        } else {
          var html = `<li class="right clearfix">
                    <span class="chat-img pull-right">
                        <img src="http://placehold.it/50/FA6F57/fff&text=${data.senderName}" alt="User Avatar" class="img-circle" />
                    </span>
                    <div class="chat-body clearfix">
                        <div class="header">
                            <small class=" text-muted">
                                <span class="glyphicon glyphicon-time"></span>${data.date}</small>
                            <strong class="pull-right primary-font">${data.senderName}</strong>
                        </div>
                        <p id="${change.doc.id}-message">
                            ${data.message}
                        </p>
                        <span onclick="deleteMessage('${change.doc.id}')" class="glyphicon glyphicon-trash"></span> 
                    </div>
                </li>`;

          $(".chat").append(html);
        }
        if (snapshot.docChanges().length - 1 == ind) {
          // we will scoll down on last message
          // auto scroll
          $(".panel-body").animate(
            { scrollTop: $(".panel-body").prop("scrollHeight") },
            1000
          );
        }
      }

      if (change.type == "modified") {
      }

      if (change.type == "removed") {
        $("#" + change.doc.id + "-message").html(
          "this message has been deleted"
        );
      }
    });
  });

function sendMessage(object) {
  console.log(object);
  db.collection("chats")
    .add(object)
    .then((added) => {
      console.log("message sent ", added);
    })
    .catch((err) => {
      console.err("Error occured", err);
    });
}

function deleteMessage(doc_id) {
  var flag = window.confirm("Are you sure to want delete ?");

  if (flag) {
    db.collection("chats").doc(doc_id).delete();
    console.log("Deleted");
  }
}

// on click function
$(".send-button").click(function () {
  var message = $("#btn-input").val();

  if (message) {
    // insert message

    sendMessage({
      senderName: name,
      message: message,
      date: moment().format("YYYY-MM-DD HH:mm"),
    });

    $("#btn-input").val("");
  }
});

// also we will send message when user enter key
$("#btn-input").keyup(function (event) {
  // get key code of enter
  if (event.keyCode == 13) {
    // enter
    var message = $("#btn-input").val();

    if (message) {
      // insert message

      sendMessage({
        senderName: name,
        message: message,
        date: moment().format("YYYY-MM-DD HH:mm"),
      });

      $("#btn-input").val("");
    }
  }
  // console.log("Key pressed");
});
