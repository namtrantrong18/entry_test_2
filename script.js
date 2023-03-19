const result = document.querySelector('.result-output')
const generateBtn = document.querySelector('.input__generate')

function getArray(n) {
    var arr = []
    
    for (var i = 0; i < n; ++i) {
        var number = Math.floor(Math.random() * n + 1)
        arr.push(number)
    }
    return arr;
}

generateBtn.onclick = async function() {
    var numberInput = document.querySelector('#number').value;
    var arrayResult = getArray(numberInput);
    result.innerHTML = `Result: [ ${arrayResult} ]`
}


