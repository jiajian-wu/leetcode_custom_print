(async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const whole_html = await browser.tabs.sendMessage(tabs[0].id, {type: 'getHTML'});

    let dummy = document.getElementById("show_description") //add the html after "intro"
    dummy.outerHTML += whole_html

    $('.h2').remove()


    ////////// construct the question list /////////
    let questions = document.createElement("div")
    questions.setAttribute("id", "question-list")

    let els = document.getElementsByClassName("panel-title")
    for (let i = 0; i < els.length; i++) {
        let el = document.createElement("p")
        el.innerText = els[i].innerText
        questions.appendChild(el)
    }

    let reference = document.querySelectorAll('.callout,.callout-info')[0]
    console.log(reference)
    reference.parentNode.insertBefore(questions, reference.nextSibling);
    $("div.callout.callout-info").remove()
    /////////////////////////////////////////////////////

    // listener for checkbox to show question description
    document.querySelector("input[name=showDescription]").addEventListener('change', function () {
        let els = document.getElementsByClassName("question-description")
        if (this.checked) {
            console.log("Checkbox is checked..");
            for (let i = 0; i < els.length; i++) {
                els[i].style.display = "block";
            }
        } else {
            console.log("Checkbox is not checked..");
            for (let i = 0; i < els.length; i++) {
                els[i].style.display = "none";
            }
        }
    });

    //what


})();


// (async () => {
//     const tabs = await browser.tabs.query({active: true, currentWindow: true});
//     const whole_html = await browser.tabs.sendMessage(tabs[0].id, {type: 'getHTML'});
//     console.log(whole_html)
//     let dummy = document.getElementById("intro")
//     dummy.outerHTML += whole_html
//     let el = document.getElementById("collapse_42")
//     console.log(el.innerText)
// })();

// var prtContent = document.getElementById("collapse_42");
// var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
// WinPrint.document.write(prtContent.innerHTML);
// WinPrint.document.close();
// WinPrint.focus();
// WinPrint.print();
// WinPrint.close();

//
// function fetchStarImage(rating) {
//     let review = rating.toString()
//     if (review == '0') {
//         return 'small_0.png'
//     } else if (review == '1') {
//         return 'small_1.png'
//     } else if (review == '1.5') {
//         return 'small_1_half.png'
//     } else if (review == '2') {
//         return 'small_2.png'
//     } else if (review == '2.5') {
//         return 'small_2_half.png'
//     } else if (review == '3') {
//         return 'small_3.png'
//     } else if (review == '3.5') {
//         return 'small_3_half.png'
//     } else if (review == '4') {
//         return 'small_4.png'
//     } else if (review == '4.5') {
//         return 'small_4_half.png'
//     } else if (review == '5') {
//         return 'small_5.png'
//     }
// }
//
//
// (async () => {
//     const tabs = await browser.tabs.query({active: true, currentWindow: true});
//     const property = await browser.tabs.sendMessage(tabs[0].id, {type: 'getRes'});
//     console.log(JSON.stringify(property))
//     $.ajax({
//         //http://localhost:5000/
//         //http://jiajianwu.pythonanywhere.com/
//         url: "http://jiajianwu.pythonanywhere.com/",
//         type: "POST",
//         data: JSON.stringify(property),
//         contentType: 'application/json',
//         dataType: 'json'
//     }).done(function (response) {
//         // console.log(property)
//         console.log(response)
//         //response is an json "object"
//
//         writeHeader(response)
//
//         let el = document.createElement("div")
//         el.setAttribute('id', 'div2')
//         for (let i = 0; i < response["reviews"].length; i++) {
//
//             let link = response["reviews"][i].url
//             let l = document.createElement("a")
//             l.setAttribute('href', link)
//             l.setAttribute('target', "_blank")
//             l.textContent = "Go to Yelp for detailed review and more"
//
//             el.innerHTML += "User Name: " + response["reviews"][i].user.name + "<br />" + "Review Rating: "
//
//             let image_name = fetchStarImage(response["reviews"][i].rating)
//             let image_el = document.createElement("img")
//             image_el.setAttribute('src', 'stars/' + image_name)
//             el.appendChild(image_el)
//
//             el.innerHTML += '<br />' +'<br />' +'<em>' + response["reviews"][i].text + '</em>' + '<br />'
//             el.appendChild(l)
//
//             el.innerHTML += '<hr />'
//         } //end of for loop
//
//
//         let reference = document.getElementById('p2')
//         reference.appendChild(el)
//     }).fail(function (response){
//         let error = document.createElement("h3")
//         error.textContent = "Sorry, failed to fetch from Yelp!"
//         let p = document.getElementById('p1')
//         p.appendChild(error)
//     });
//
//
// })();
//
//
// function writeHeader(response) {
//     // final['photos'], final['name'], final['rating'], final['review_count'], final['price'], final['categories']
//     let el = document.createElement("div")
//     el.setAttribute('id', 'div1')
//     el.innerHTML = "<h1>" + response['name'] + "</h1>"
//
//     let url = document.createElement("a")
//     url.setAttribute("href", response['url'])
//     url.setAttribute('target', "_blank")
//     url.setAttribute('id', "business_link")
//     url.textContent = "Go to the Yelp page here"
//     el.appendChild(url)
//     el.innerHTML += "<hr />"
//
//     let image_name = fetchStarImage(response["rating"])
//     let image_el = document.createElement("img")
//     image_el.setAttribute('src', 'stars/' + image_name)
//     image_el.setAttribute('width', "110")
//     image_el.setAttribute('height', "20")
//     el.appendChild(image_el)
//
//     if ('review_count' in response) {
//         el.innerHTML += "<span> " + response['review_count'] + " reviews <br/>" + "</span>"
//     }
//
//     if ('price' in response) {
//         el.innerHTML += "<span>" + response['price'] + " </span>"
//     }
//
//     if ('categories' in response) {
//         let categories = document.createElement("span")
//         categories.setAttribute("id", "categories")
//         for (let i = 0; i < response['categories'].length; i++) {
//             let comma = ", "
//             if (i === response['categories'].length - 1) {
//                 comma = ""
//             }
//             categories.textContent += response['categories'][i]['title'] + comma
//         }
//         el.appendChild(categories)
//     }
//
//     el.innerHTML += "<hr />"
//
//     if ('photos' in response) {
//         for (let i = 0; i < response['photos'].length; i++) {
//             let photo = document.createElement("img")
//             photo.setAttribute('src', response['photos'][i])
//             photo.setAttribute('alt', "Sorry, the image failed to load")
//             photo.setAttribute('class', 'thumbnail')
//             photo.width = 260
//             photo.height = 260
//             el.appendChild(photo)
//         }
//     }
//     el.innerHTML += "<hr />"
//
//     let reference = document.getElementById("p1")
//     reference.appendChild(el)
// }
//
//
//
//
//
//
