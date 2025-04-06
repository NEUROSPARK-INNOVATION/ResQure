/*=============== SHOW HIDE PASSWORD LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
       input.type === 'password' ? input.type = 'text' 
                                                      : input.type = 'password'
      // Icon change
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordAccess('loginPassword1','loginPassword')

/*=============== SHOW HIDE PASSWORD CREATE ACCOUNT ===============*/
const passwordRegister = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      input.type === 'password' ? input.type = 'text'
                                                     : input.type = 'password'

      // Icon change
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordRegister('signupPassword','loginPasswordCreate')

/*=============== SHOW HIDE LOGIN & CREATE ACCOUNT ===============*/
const loginAcessRegister = document.getElementById('loginAccessRegister'),
      buttonRegister = document.getElementById('loginButtonRegister'),
      buttonAccess = document.getElementById('loginButtonAccess')

buttonRegister.addEventListener('click', () => {
   loginAcessRegister.classList.add('active')
})

buttonAccess.addEventListener('click', () => {
   loginAcessRegister.classList.remove('active')
})


// login



const backendUrl = 'https://hershield-rn5q.onrender.com';

        // Signup Form Submission
        document.getElementById('registerform').addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log('Signup form submitted');
            const name = document.getElementById('signupName').value;
            const surname = document.getElementById('signupSurname').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            try {
                const response = await fetch(`${backendUrl}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, surname, email, password }),
                });

                const data = await response.json();
                alert(data.message);
                document.getElementById('registerform').reset();
            } catch (error) {
                alert('Error during signup!');
                console.error(error);
            }
        });

        // Login Form Submission
        document.getElementById('loginform').addEventListener('submit', async (e) => {
            e.preventDefault();

            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword1').value;

            try {
                const response = await fetch(`${backendUrl}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });

                const data = await response.json();
                if (data.token) {
                    alert('Login successful!');
                    console.log('Token:', data.token);
                    console.log('User Name:', data.name);
                    console.log('User email:', data.email);
                    document.getElementById('loginform').reset();
                    localStorage.setItem('userName', data.name); 
                    localStorage.setItem('email', data.email);
                    window.location.href = '/dashboard/index.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                alert('Error during login!');
                console.error(error);
            }
 });


 //forgot

function sendResetLink() {
  const email = document.getElementById("loginEmail").value.trim();

  if (!email) {
    alert("Please enter your email first!");
    return;
  }

  fetch("https://hershield-rn5q.onrender.com/api/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  })
  .catch(err => {
    console.error(err);
    alert("Something went wrong!");
  });
}



window.alert = function(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 1000); // Visible for 10s total
};
