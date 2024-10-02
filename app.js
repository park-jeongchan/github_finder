import { Github } from "./github.js";
// Init Github
const github = new Github;
// Init UI
const ui = new UI;

// Search input
const searchUser = document.getElementById('searchUser');

searchUser.addEventListener('keyup', (e) => {
  const userText = e.target.value;

  try {
    if(userText !== ''){
      ui.showSpinner();
      
      github.getUser(userText)
       .then(data => {
         console.log(data.profile.data);
         if(data.profile.status != 200) {
            throw new Error('User not found');
         } else {
           ui.showProfile(data.profile.data);
           ui.showRepos(data.repos.data);
         }
       })
       .catch(error => {
        ui.showAlert('User not found', 'alert alert-danger');
        console.log(error);
      });
     } else {
       ui.clearProfile();
     }
  } catch (error) {
    ui.showAlert('An unexpected error occurred', 'alert alert-danger');
    console.log(error);
  }

}); 

