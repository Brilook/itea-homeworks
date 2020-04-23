'use ctrict';
const enterBtn = document.getElementById('enter');
const exitBtn = document.getElementById('exit');
const modal = document.querySelector('.modal');
const inputLogin = document.querySelector('[name="login"]');
const output = document.getElementById('output');
//------------- for localStorege
// window.localStorage.setItem('key1', 'Admin');
// window.localStorage.key2 = 'admin';

// enterBtn.addEventListener('click', function () {
//     const storage = window.localStorage;
//     const key1Value = storage.getItem('key1');
//     const key2Value = storage.getItem('key2');
//     const inputValue = inputLogin.value;

//     if (inputValue === key2Value || inputValue === key1Value) {
//         modal.style.display = 'none';
//         exitBtn.style.display = 'block';
//         output.innerHTML = `The ${inputValue} user is logged in`;
//     } else {
//         alert('You have no access rights! Enter the correct login!');
//         inputLogin.value = '';
//     }
// });
//-------------end

exitBtn.addEventListener('click', function () {
    output.innerHTML = '';
    modal.style.display = 'block';
    exitBtn.style.display = 'none';
    inputLogin.value = '';
});

//--------------- for cookies
document.cookie = 'key1=Admin; max-age=3600';
document.cookie = 'key2=admin; max-age=3600';

enterBtn.addEventListener('click', function () {
    const key1Value = findCookieValue('key1');
    const key2Value = findCookieValue('key2');
    const inputValue = inputLogin.value;

    if (inputValue === key2Value || inputValue === key1Value) {
        modal.style.display = 'none';
        exitBtn.style.display = 'block';
        output.innerHTML = `The ${inputValue} user is logged in`;
    } else {
        alert('You have no access rights! Enter the correct login!');
        inputLogin.value = '';
    }

    function findCookieValue(cookieName) {
        const allcookies = document.cookie;
        const pos = allcookies.indexOf(`${cookieName}=`);

        if (pos != -1) {
            const start = pos + cookieName.length + 1;
            let end = allcookies.indexOf(';', start);

            if (end == -1) {
                end = allcookies.length;
            }

            const value = allcookies.substring(start, end);
            return decodeURIComponent(value);
        }
    }
});