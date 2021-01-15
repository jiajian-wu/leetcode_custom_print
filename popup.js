(async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const whole_html = await browser.tabs.sendMessage(tabs[0].id, {type: 'getHTML'});

    let dummy = document.getElementById("my_note") //add the html after "intro"
    dummy.outerHTML += whole_html

    $('.h2').remove()

    ////////// construct the question list /////////
    let questions = document.createElement("ul")
    questions.setAttribute("id", "question-list")

    let els = document.getElementsByClassName("panel-title")
    for (let i = 0; i < els.length; i++) {
        let el = document.createElement("li")

        let small_box = document.createElement("input")
        small_box.setAttribute("type", "checkbox")

        let p = document.createElement("label")
        p.innerText = els[i].innerText
        p.prepend(small_box)

        el.appendChild(p)

        questions.appendChild(el)
    }

    let reference = document.querySelectorAll('.callout,.callout-info')[0]
    console.log(reference)
    reference.parentNode.insertBefore(questions, reference.nextSibling);
    $("div.callout.callout-info").remove()
    /////////////////end - construct the question list///////////////


    //// listener for checkbox to show question description ///
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
    //// end - listener for checkbox to show question description ///


    //////// construct check box for each question and add listener //////////
    let titles = document.querySelectorAll('.panel-title')
    for (let i = 0; i < titles.length; i++) {
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        titles[i].appendChild(checkbox)
        addListener(checkbox)
    }
    ///////////////end - construct check box for each question and add listener///////////////


    //////// construct candidates for the search box //////////
    let titles_search = []
    let title_div_list = document.querySelectorAll('.panel-heading,.collapsed')
    for (let i = 0; i < title_div_list.length; i++) {
        titles_search.push({label: title_div_list[i].innerText, id: title_div_list[i].id})
    }

    autocomplete({
        minLength: 1,
        input: document.getElementById("search"),
        fetch: function (text, update) {
            text = text.toLowerCase();
            let suggestions = titles_search.filter(n => n.label.toLowerCase().includes(text))
            update(suggestions);
        },
        onSelect: function (item) {

            $('html, body').animate({
                    scrollTop: $('#' + item.id).offset().top - $("#intro").outerHeight(true)
                },
                'slow');
        },
        disableAutoSelect: false
    });
    //////////////////end - construct candidates for the search box /////////////////////////


    //////////// print ////////////////////////
    document.getElementById("print").addEventListener('click', function () {
        var mywindow = window.open('', 'PRINT', 'height=2000, width=2000');
        mywindow.document.write('<html><head><style>.note-content {\n' +
            '    display: inline-block;\n' +
            '    border: 1px solid #000;\n' +
            '    text-align: left;\n' +
            '}</style></head><body>')

        //only print questions highlighted with BLUE (i.e. selected by user)
        let questions = document.querySelectorAll('.panel,.panel-default')
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].style.backgroundColor == "rgba(137, 196, 244, 0.3)") {
                mywindow.document.write(questions[i].outerHTML)
            }
        }
        mywindow.document.write('</body></html>')

        mywindow.print();
        mywindow.close();
    });
    //////////////// end - print /////////////////////////

})();

/// listener for check box ///////////
function addListener(chk) {
    chk.addEventListener('change', function () {
            // let el = document.querySelector("input[name=showDescription]")
            if (this.checked) {
                // el.checked = true
                // el.dispatchEvent(new Event("change"));
                chk.parentElement.parentElement.parentElement.style.backgroundColor = "rgba(137, 196, 244, 0.3)";

            } else {
                // el.checked = false
                // el.dispatchEvent(new Event("change"));
                chk.parentElement.parentElement.parentElement.style.backgroundColor = "transparent";
            }
        }
    )
}


