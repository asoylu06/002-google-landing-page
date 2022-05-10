document.querySelector('#menu-icon').addEventListener("click", function () {
    document.querySelector('.apps').style.visibility = "visible";
    document.querySelector('.apps').style.height = "100%";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "true");
}); 

document.addEventListener("mouseup", function(e) {
    let box = document.querySelector('.apps');
    if (e.target != box && e.target.parentNode != box) {
    document.querySelector('.apps').style.visibility = "hidden";
    document.querySelector('.apps').style.height = "0px";
    document.querySelector('.right-side li:nth-child(3)').setAttribute("aria-expanded", "false");
}});


document.addEventListener("mouseover", function(e) {
    let box = document.querySelector('.tooltip');
    if (e.target == box || e.target.parentNode == box) {
    document.querySelector('.tooltiptext').style.visibility = "visible";
    } else {
    document.querySelector('.tooltiptext').style.visibility = "hidden";
    }
});



addEventListener("keyup", function(e) {
    let input = document.querySelector('#search-input').value;
    let q_string = "http://suggestqueries.google.com/complete/search?client=firefox&q=" + input;
    getJSON(q_string, function(err, data) {
        if (err !== null) {
            console.log('Something went wrong: ' + err);
        } else {
            let results = data[1];
            let ul = document.querySelector('#search-results');
            ul.innerHTML = "";
            for (let i = 0; i < results.length; i++) {
                let li = document.createElement('li');
                li.innerHTML = results[i][0];
                ul.appendChild(li);
            }
        }
    }
    );
});

let getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

