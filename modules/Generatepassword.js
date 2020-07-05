function generate() {
//possible password characters
    const values="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let password="";

    for(var i = 0; i <= 8; i++ ){
        password = password + values.charAt(Math.floor(Math.random() * Math.floor(values.length - 1)));

    }
    //display random password
    document.getElementById("display").value = password;
}