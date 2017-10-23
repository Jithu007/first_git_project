let displayData = '';
let currentpage = '';
let text1 = document.querySelector('.input-text');
let text2 = document.querySelector('.text2');
let searchList = document.querySelector('.searchListSelect');
let resultCount = document.querySelector('.searchListSelect');
let paginationCount;
console.log(resultCount.value);
//console.log("This is the select value: " + resultCount.value);

let input1 = document.querySelector('form');
input1.addEventListener('submit', function (event) {
    event.preventDefault();
    document.querySelector('.text-results').innerHTML = displayData;
    document.querySelector('.googlepage').style.display = 'none';
    document.querySelector('.page2').style.display = 'block';
    text2.value = text1.value;
})

let listNum = resultCount.value;
pagenum1(1, listNum);
pagination(listNum);


function pagenum1(num, listNum) {
    currentpage = num;

    for (let i = num * listNum - listNum; i < num * listNum; i++) {
        displayData += `<h3>${jsonData[i].heading}</h3>
                    <a href=${jsonData[i].link}>${jsonData[i].link}</a>
                    <p>${jsonData[i].description}</p>`
    }

    if (currentpage == Math.ceil(jsonData.length / listNum)) {
        document.querySelector('.next-page').style.display = 'none';
    }
}


searchList.addEventListener('change', function (event) {
    //    pagenum1(num,listNum);
    listNum = resultCount.value;
    console.log(listNum);
    displayData = "";
    pagenum1(1, listNum);
    document.querySelector('.text-results').innerHTML = displayData;
    //    pagination(listNum);
})

function pagination(listNum) {
    for (i = 1; i <= Math.ceil(jsonData.length / listNum); i++) {
        document.querySelector('.page-results').innerHTML += `<span>${i}</span>`
    }
}


let pagenum = document.querySelectorAll('span');
pagenum.forEach(function (each) {
    each.addEventListener('click', function (event) {
        document.querySelector('.previous-page').style.display = 'inline'
        document.querySelector('.next-page').style.display = 'inline';
        if (event.target.textContent > 1) {
            document.querySelector('.previous-page').innerHTML = 'Previous';
        } else if (event.target.textContent == 1) {
            document.querySelector('.previous-page').style.display = 'none'
        }

        displayData = '';
        pagenum1(event.target.textContent, listNum);
        document.querySelector('.text-results').innerHTML = displayData;
        if (currentpage == Math.ceil(jsonData.length / listNum)) {
            document.querySelector('.next-page').style.display = 'none';
        }
    })
})


let x = document.querySelector('.page-results');
let nextpage = document.createElement('p');
x.appendChild(nextpage);
nextpage.className = 'next-page';
nextpage.textContent = 'Next';


document.querySelector('.next-page').addEventListener('click', function (event) {
    if (currentpage < Math.ceil(jsonData.length / listNum)) {
        document.querySelector('.previous-page').innerHTML = 'Previous'
        displayData = '';
        currentpage = currentpage * 1;
        pagenum1(currentpage + 1, listNum);
        document.querySelector('.text-results').innerHTML = displayData;
    } else if (currentpage == Math.ceil(jsonData.length / listNum)) {
        document.querySelector('.next-page').style.display = 'none';
    }
})


document.querySelector('.previous-page').addEventListener('click', function (event) {
    displayData = '';
    if (currentpage > 1) {
        pagenum1(currentpage - 1, listNum);
        document.querySelector('.text-results').innerHTML = displayData;
        document.querySelector('.next-page').style.display = 'inline-block';
    }

})
