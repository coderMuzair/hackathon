import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, collection, doc, addDoc, getDocs, onSnapshot, orderBy, deleteDoc   } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
// import { getFirestore, collection, doc, addDoc, getDocs, onSnapshot, orderBy, deleteDoc   } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCHz03VEn_NXrmLSO2gl4Zmc4UmZjhV0zc",
  authDomain: "hackaton-9eec1.firebaseapp.com",
  projectId: "hackaton-9eec1",
  storageBucket: "hackaton-9eec1.appspot.com",
  messagingSenderId: "734136866430",
  appId: "1:734136866430:web:b502a4f39ca27301b46a2f"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);



const signUpBtn = document.querySelector('#signup-btn');
if(signUpBtn) signUpBtn.addEventListener('click', signUp);

//// signup /////////

function signUp(){
  let firstName = document.querySelector('#first-name').value;
  let lsatName = document.querySelector('#last-name').value;
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;
  let rePassword = document.querySelector('#repassword').value;

  if(password == rePassword){
  
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log('user: ', user);

    Swal.fire(
      'Regestered Succesfully!',
      'success'
    ).then(()=>{
      window.location.href = "./dashboard.html"
    })
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorMessage: ', errorMessage);
    Swal.fire({
      icon: 'error',
      title: errorMessage,
      // text: errorMessage,
    })
    // ..
  });
  }else{
    // alert("Password do not match!")
    Swal.fire({
      icon: 'error',
      title: 'Password do not match!',
      // text: errorMessage,
    })
  }
  

}

const signInBtn = document.querySelector('#signin-btn')
if(signInBtn) signInBtn.addEventListener('click', signIn )

function signIn(){
  let signinEmail = document.querySelector('#signin-email').value;
  let signinPassword = document.querySelector('#signin-password').value;

  signInWithEmailAndPassword(auth, signinEmail, signinPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('user: ', user);
      window.location.href = './dashboard.html'
     
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log('errorMessage: ', errorMessage);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      })
    });
}
var uid;
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
     uid = user.uid;
     console.log('user: ', user);
    console.log('uid: ', uid);
    
    if(document.querySelector('.blogs')){
      getDatafromDB();
    }
    // ...
  } else {
    window.location.href = "./index.html"
    // ...
    getDatafromDBwithoutsignin();

  }
});


var d = new Date();
console.log('d: ', d.toLocaleString());

async function addDatatoDB (inputValue){
  var d = new Date();
  try {
    const docRef = await addDoc(collection(db, uid), {
      todo: inputValue ,
      time: d.toLocaleString()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

}


function getDatafromDB(){
  var blogs =  document.querySelector(".blogs");

  onSnapshot(collection(db, uid), (data) => {
    data.docChanges().forEach((change) => {
      // console.log('change: ', change.doc.id);
        var obj = change.doc.data()
        // Respond to data
        // console.log("Data", obj);
          // blogs.innerHTML = "";
          blogs.innerHTML += `
          <div class="blog p-4">
          <div class="blog-header">
              <img src="https://img.freepik.com/premium-photo/photo-document-passport-id-mature-caucasian-man-suit_262388-3596.jpg?w=2000" alt="..." height="100px" width="100px" class="rounded-3">
              <div class="blog-right">
                  <div class="p-2 m-0  h3">
                      ${obj.heading}
                  </div>
                  <div class="blogger-detail">
                      <div class="blogger-name" >Muhammad Uzair</div>
                      <div>-</div>
                      <div class="blogger-date" >${obj.time}</div>
                  </div>
              </div>
          </div>
          <div class="blog-text mt-2">
              ${obj.para}
          </div>
          <a href="">see all from this user</a>

      </div>
           `
            }
          
          )

        })
        
}
//////...............Get Data From Database Without User Sign In................//////

// function getDatafromDBwithoutsignin(){
//   var blogs =  document.querySelector(".blogs");

//   onSnapshot(collection(db, uid), (data) => {
//     data.docChanges().forEach((change) => {
//       // console.log('change: ', change.doc.id);
//         var obj = change.doc.data()
//         // Respond to data
//         // console.log("Data", obj);
//           // blogs.innerHTML = "";
//           blogs.innerHTML += `
//           <div class="blog p-4">
//           <div class="blog-header">
//               <img src="https://img.freepik.com/premium-photo/photo-document-passport-id-mature-caucasian-man-suit_262388-3596.jpg?w=2000" alt="..." height="100px" width="100px" class="rounded-3">
//               <div class="blog-right">
//                   <div class="p-2 m-0  h3">
//                       ${obj.heading}
//                   </div>
//                   <div class="blogger-detail">
//                       <div class="blogger-name" >Muhammad Uzair</div>
//                       <div>-</div>
//                       <div class="blogger-date" >${obj.time}</div>
//                   </div>
//               </div>
//           </div>
//           <div class="blog-text mt-2">
//               ${obj.para}
//           </div>
//           <a href="">see all from this user</a>

//       </div>
//            `
//             }
          
//           )

//         })
       
// }


// document.getElementsByClassName('close');
// console.log('close: ', close);
var close = document.querySelectorAll(".close");
// console.log('close: ', close);

if(close){
  console.log('close');
  document.querySelectorAll(".close").forEach(element => {
    element.addEventListener("click", event =>{
      console.log(this.id);
      console.log('close button clicked');
    })
  })
}
async function deleteDatafromDB(){
  await deleteDoc(doc(db, "cities", "DC"));
}



//////...............Profile Page................//////
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');

imageInput.addEventListener('change', function() {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.addEventListener('load', function() {
      const image = new Image();
      image.src = reader.result;
      image.style.maxWidth = '100%';
      image.style.maxHeight = '300px';
      preview.innerHTML = ''; // Clear previous preview
      preview.appendChild(image);
    });

    reader.readAsDataURL(file);
  }
});



function uploadImage() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  
  if (file) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(file.name);
    
    const uploadTask = imageRef.put(file);
    
    uploadTask.on('state_changed', 
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        document.getElementById('uploadProgress').value = progress;
      },
      error => {
        document.getElementById('uploadMessage').textContent = `Upload Error: ${error.message}`;
      },
      () => {
        document.getElementById('uploadMessage').textContent = 'Upload complete!';
      }
    );
  }
}

const updateProfile = document.querySelector("#updateProfile")
if(updateProfile){
  updateProfile.addEventListener('click', uploadImage)
}


//////...............Dashboard................//////

function getDatafromDashboard(){
  let blogHeading = document.querySelector('#heading-input');
  let blogText = document.querySelector('#blog-input');
  var obj = {
    heading: blogHeading.value,
    para: blogText.value,
    time: d.toLocaleString()
  }
//////...............Adding Blogs to Database................//////

async function addDatatoDB (obj){
    var d = new Date();
    try {
      const docRef = await addDoc(collection(db, uid), {
        ...obj
      });
      console.log("Document written with ID: ", docRef.id);
      blogHeading = "";
      blogText = ""
      Swal.fire(
        'Blog Published Succesfully!',
        'success'
      )
      document.querySelector('#heading-input').value = '';
      document.querySelector('#blog-input').value = '';
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  
  }
  addDatatoDB(obj);
}

const publishBtn = document.querySelector('#publish-btn');
if(publishBtn){
  publishBtn.addEventListener('click', getDatafromDashboard)
}


//////...............Adding Blogs to Database................//////
const signOutBtn = document.querySelector('#logout');
if(signOutBtn){
  signOutBtn.addEventListener('click',()=>{
    signOut(auth).then(()=>{
localStorage.clear();
window.location.href = "./index.html"
    })
  })
}







