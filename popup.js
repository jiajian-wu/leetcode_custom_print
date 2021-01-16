(async () => {
    const tabs = await browser.tabs.query({active: true, currentWindow: true});
    const whole_html = await browser.tabs.sendMessage(tabs[0].id, {type: 'getHTML'});

    let dummy = document.getElementById("my_note") //add the html after "intro"
    dummy.outerHTML += whole_html

    $('.h2').remove()


    //// listener for checkbox to show question description ///
    document.querySelector("input[name=showDescription]").addEventListener('change', function () {
        let els = document.getElementsByClassName("question-description")
        if (this.checked) {
            for (let i = 0; i < els.length; i++) {
                els[i].style.display = "block";
            }
        } else {
            for (let i = 0; i < els.length; i++) {
                els[i].style.display = "none";
            }
        }
    });
    //// end - listener for checkbox to show question description ///


    //////// construct check boxes in main body and add listener //////////
    let titles = document.querySelectorAll('.panel-title')
    for (let i = 0; i < titles.length; i++) {
        let checkbox = document.createElement("input")
        checkbox.setAttribute("type", "checkbox")
        checkbox.setAttribute("name", titles[i].parentElement.id)
        titles[i].appendChild(checkbox)

        checkbox.addEventListener('change', function () {
                let relative_box = document.querySelector(`input[class=${titles[i].parentElement.id}]`)
                let select_all_box = document.querySelector("input[name=selectAll]")
                if (this.checked) {
                    relative_box.checked = true
                    // relative_box.dispatchEvent(new Event('change'))
                    checkbox.parentElement.parentElement.parentElement.style.backgroundColor = "rgba(137, 196, 244, 0.3)";
                } else {
                    relative_box.checked = false
                    select_all_box.checked = false
                    // relative_box.dispatchEvent(new Event('change'))
                    checkbox.parentElement.parentElement.parentElement.style.backgroundColor = "transparent";

                }
            }
        )

    }
    ///////////////end - construct check box for each question and add listener///////////////


    ////////// construct the question list atop/////////
    let questions = document.createElement("ul")
    questions.setAttribute("id", "question-list")
    questions.setAttribute("class", "two-column")

    let els = document.getElementsByClassName("panel-title")
    for (let i = 0; i < els.length; i++) {
        let el = document.createElement("li")

        let small_box = document.createElement("input")
        small_box.setAttribute("type", "checkbox")
        let title_id = els[i].parentElement.id
        small_box.setAttribute("class", title_id)
        small_box.addEventListener('change', function () {
            let relative_box = document.querySelector(`input[name=${title_id}]`)
            let select_all_box = document.querySelector("input[name=selectAll]")

            if (this.checked) {
                relative_box.checked = true
                relative_box.dispatchEvent(new Event('change'))
            } else {
                relative_box.checked = false
                relative_box.dispatchEvent(new Event('change'))
                select_all_box.checked = false

            }
        })

        let p = document.createElement("label")
        p.innerText = els[i].innerText
        p.prepend(small_box)

        el.appendChild(p)

        questions.appendChild(el)
    }

    let reference = document.querySelectorAll('.callout,.callout-info')[0]
    reference.parentNode.insertBefore(questions, reference.nextSibling);
    $("div.callout.callout-info").remove()
    /////////////////end - construct the question list///////////////


    ///// Select All check box //////
    //// name: head_42 class: head_42 ///
    let boxes = $("#question-list :input")
    document.querySelector("input[name=selectAll]").addEventListener('change', function () {
        if (this.checked) {
            boxes.each(function () {
                this.checked = true
                this.dispatchEvent(new Event("change"))
            });
        } else {
            boxes.each(function () {
                this.checked = false
                this.dispatchEvent(new Event("change"))
            });
        }
    });


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

    //// scroll to top button //////
    let mybutton = document.getElementById("myBtn");
    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    };

    mybutton.addEventListener('click', function () {
        $('html, body').animate({
                scrollTop: 0
            },
            'slow');
    })
    /////// end-button /////////

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


