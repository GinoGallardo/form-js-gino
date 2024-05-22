const firebaseConfig = {
  apiKey: "AIzaSyCOFTIMQz7z9Nxk7RlLeuX3amG6ryrEFHI",
  authDomain: "datos-formulario-12e39.firebaseapp.com",
  projectId: "datos-formulario-12e39",
  storageBucket: "datos-formulario-12e39.appspot.com",
  messagingSenderId: "249939428292",
  appId: "1:249939428292:web:35ade4c24e8e1d32e79a91",
  measurementId: "G-RSLCKCGZ3B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) =>{
  event.preventDefault()

  //Validar campo name
  let entradaName = document.getElementById('name')
  let errorName = document.getElementById('nameError')

  if(entradaName.value.trim() === ''){
    errorName.textContent = 'Por favor, introducí tu nombre'
    errorName.classList.add('error-message')
  }else{
    errorName.textContent = ''
    errorName.classList.remove('error-message')
  }

  //Validar correo electrónico
  let emailEntrada = document.getElementById('email')
  let emailError = document.getElementById('emailError')
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailPattern.test(emailEntrada.value)){
    emailError.textContent = 'Por favor, introducí un email válido'
    emailError.classList.add('error-message')
  }else{
    emailError.textContent = ''
    emailError.classList.remove('error-message')
  }

  //Validar contraseña
  let passwordEntrada = document.getElementById('password')
  let passwordError = document.getElementById('passwordError')
  let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;

  if (!passwordPattern.test(passwordEntrada.value)){
    passwordError.textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un caracter especial'
    passwordError.classList.add('error-message')
  }else{
    passwordError.textContent = ''
    passwordError.classList.remove('error-message')
  }

  //So todos los campos son validos enviar formulario
  if (!errorName.textContent && !emailError.textContent && !passwordError.textContent){

      // BACKEND QUE RECIBE LA INFORMACION
    db.collection("users").add({
      name: entradaName.value,
      email: emailEntrada.value,
      password: password.value
  })
  .then((docRef) => {
    alert('El formulario de ' + entradaName.value +' se ha enviado con éxito!!!', docRef.id)
    document.getElementById('formulario').reset();
  })
  .catch((error) => {
      alert('Error al enviar el formulario' + error.message)
  });    
  }
})