    /// flag check
    $('.num-flag span').on('click', function () {
        $(this).toggleClass("active");
        let id = $(this).attr("data-flag-id");
        let numElement = $("a[href$='#" + id + "']");
        numElement.toggleClass("flaged");
    })

    $('.quest input, select').on('change', ChangeCheckboxHandler);

    function ChangeCheckboxHandler() {
            let id = $(this).parents(".quest").attr("id");
            let numElement = $("p[num-data='" + id + "']");
            const isDir = dirtyCheck(id);
            if (isDir) {
                numElement.addClass('checked')
            } else {
                numElement.removeClass('checked');
        }
    }

    function dirtyCheck(questId) {
        let list = $('#' + questId + ' input, select');
        list = list.filter(function (idx, el) {
            if (el.type == 'checkbox') {
                return el.checked == true;
            } else {
                return !!(el.value || el.value != '');
            }
        });
        return list.length > 0;
    }

    let itemPerPage = 5;

    function renderInfo() {
        let items = $(".question-info .quest");
        let page = Math.ceil(items.length / itemPerPage);
        let pageTemp = "";
        for (let i = 0; i < page; i++) {
            pageTemp += `<li class="page-item">
                            <a class="page-link">${i + 1}</a>
                        </li>`;
        }
        let dom = ` <nav class="paging-nav" aria-label="...">
                    <ul class="pagination">
                        ${pageTemp}
                    </ul>
                </nav>`;
        $('.question-info').append(dom);
    };
    renderInfo();
    /// click even handle paging
    $('.question-num a').on("click", function () {
        let question = $($(this).attr('href'));
        let atPage = Math.ceil(($(".quest").index(question) + 1) / itemPerPage);
        getPage(atPage);
    })

    $('.pagination').on("click", '.page-link', function () {
        getPage($(this).text());
    });

    function getPage(page) {
        $('.showQuestion').removeClass("showQuestion");
        $('.question-num a p').removeClass("active");
        $(".pagination .active").removeClass("active");
        $($(".pagination .page-item")[page-1]).addClass("active");
//
        let items = $(".question-info .quest");
        let numItems = $(".question-num a p");
        let indexStart = itemPerPage * (page - 1);
        let indexEnd = indexStart + itemPerPage;
        if (indexEnd > items.length) indexEnd = items.length;
        for (let i = indexStart; i < indexEnd; i++) {
            $(numItems[i]).addClass("active");
            $(items[i]).addClass("showQuestion");
        }
    }

    getPage(1);
