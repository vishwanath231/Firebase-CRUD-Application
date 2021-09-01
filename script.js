// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBs9gIH9eAHIJ4liXl7zJFsKYzP2PSrF14",
    authDomain: "basicform-5b712.firebaseapp.com",
    databaseURL: "https://basicform-5b712-default-rtdb.firebaseio.com",
    projectId: "basicform-5b712",
    storageBucket: "basicform-5b712.appspot.com",
    messagingSenderId: "672972270504",
    appId: "1:672972270504:web:01d3f6857d5dfc001dcb9d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// DOM Elements

const rollNoField = document.getElementById('rollno');
const nameField = document.getElementById('name');
const sectionField = document.getElementById('section');
const genderField = document.getElementById('gender');
const submitBtn = document.getElementById('submit');
const uploadBtn = document.getElementById('upload');

const tBody = document.getElementById('tbody');




// INSERT THE RECORD
submit.onclick = () => {
    firebase.database().ref('student/'+rollNoField.value).set({
        RollNo:rollNoField.value,
        Name:nameField.value,
        Section:sectionField.value,
        Gender:genderField.value
    })

    rollNoField.value = "";
    nameField.value = "";
    sectionField.value = "";
    genderField.value = "";
    fetchAllRecord();
}





// DISPLAY THE ALL RECORDS
function fetchAllRecord(){
    firebase.database().ref('student').once('value', (records) =>{
        let output = '';
        let sno = 1;
        records.forEach(list => {
            var name = list.val().Name;
            var roll = list.val().RollNo;
            var sec = list.val().Section;
            var gen = list.val().Gender;

            output += ` 
            <tr>
                <td data-column="S.NO">${sno++}</td>
                <td data-column="Roll No">${roll}</td>
                <td data-column="Name">${name}</td>
                <td data-column="Section">${sec}</td>
                <td data-column="Gender">${gen}</td>
                <td data-column="Action">
                    <a id="${roll}" onclick="updateRecord(this.id)"><i class="fas fa-pencil-alt"></i></a>
                    <a id="${roll}" onclick="deleteRecord(this.id)"><i class="fas fa-trash-alt"></i></a>
                </td>
            </tr>`;
        });
        tBody.innerHTML = output;

    });

}

fetchAllRecord();



//UPDATE THE RECORD

function updateRecord(id){
    firebase.database().ref('student/'+id).on('value', (snapshot) => {
        nameField.value = snapshot.val().Name;
        rollNoField.value = snapshot.val().RollNo;
        sectionField.value = snapshot.val().Section;
        genderField.value = snapshot.val().Gender;
    })

    submitBtn.classList.add('active');
    uploadBtn.classList.add('active');
}

uploadBtn.onclick = () => {
    firebase.database().ref('student/'+rollNoField.value).update({
        Name:nameField.value,
        Section:sectionField.value,
        Gender:genderField.value
    })
    rollNoField.value = "";
    nameField.value = "";
    sectionField.value = "";
    genderField.value = "";
    fetchAllRecord();

    submitBtn.classList.remove('active');
    uploadBtn.classList.remove('active');
}



// DELETE THE RECORD
function deleteRecord(id){
    firebase.database().ref('student/'+id).remove();
    fetchAllRecord();
}
