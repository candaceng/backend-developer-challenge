let toggleOptions = document.querySelector(".toggle-options");
// toggleOptions.addEventListener("click", )
$(document).ready(function () {
    $(".toggle-options").click(function () {
        $(".kiosk-section  .none-selected-results").css("display", "none")
        $(".toggle-options").removeClass("underline-selected");
        $(this).addClass("underline-selected")
        console.log($(this).text())
        if ($(this).text() === "Size Chart") {
            //$(".kiosk-section  .size-chart-results").css("display", "flex")
            //$(".kiosk-section  .transaction-history-results").css("display", "none")
            location="./equip_kiosk_sizeChart.asp"
        }
        else if ($(this).text() === "Transaction History") {
           // $(".kiosk-section  .size-chart-results").css("display", "none")
           // $(".kiosk-section  .transaction-history-results").css("display", "block")
            location="./equip_kiosk_transHistory.asp"
        }
        else if ($(this).text() === "Checkout") {
            location="./equip_kiosk.asp"
        }
        else if ($(this).text() === "Current Issue List") {
            location="./equip_kiosk.asp?issuelist=y"
        }
    })
    $(".toggle-options-item").click(function () {
        $(".item-profile .item-results").css("display", "none")
        $(".toggle-options-item").removeClass("underline-selected");
        $(this).addClass("underline-selected")
        console.log($(this).text())
        if ($(this).text() === "Transaction History") {
            $(".item-profile  .transaction-history-item").css("display", "block")
            $(".transaction-item").addClass("underline-selected")
        }
        else if ($(this).text() === "Item Profile") {
            $(".item-profile  .transaction-history-item").css("display", "none")
            $(".item-profile  .item-results").css("display", "block")
        }
    })
    $(".toggle-options-barcode").click(function () {
        $(".sidebar .all-items-results").css("display", "none")
        $(".toggle-options-barcode").removeClass("underline-selected");
        $(this).addClass("underline-selected")
        console.log($(this).text())
        if ($(this).text() === "Serialized Items") {
            $(".sidebar  .serialized-items-results").css("display", "block")
            $(document.querySelector("#searchBar")).attr("placeholder", "Search Description, Model, Category, or Serial Number");
            $(document.querySelector("#searchBar")).css("font-size", "8.5px");
        }
        else if ($(this).text() === "All Items") {
            $(".sidebar  .serialized-items-results").css("display", "none")
            $(".sidebar  .all-items-results").css("display", "block")
            $(document.querySelector("#searchBar")).attr("placeholder", "Search Description, Model, or Category");
            $(document.querySelector("#searchBar")).css("font-size", "11px");
        }
    })
    // Display clear button on type in quick search
    if (document.querySelector("#searchBar")) {
        let quickSearch = document.querySelector("#searchBar");   
        quickSearch.addEventListener("input", () => {            
            if (quickSearch.value.length > 0) {
                $(document.querySelector("#searchBar")).css("font-size", "14px");
                if (document.querySelector(".searchField .cancel-btn") !== null) {
                    document.querySelector(".searchField .cancel-btn").style.display = "block"
                }                
            }
            else {
                if (document.querySelector(".searchField .cancel-btn") !== null) {
                    document.querySelector(".searchField .cancel-btn").style.display = "none"
                }                
                if ($(".serialized-items-results").css("display") == "block") {
                    $(document.querySelector("#searchBar")).css("font-size", "11px");
                }
            }
        })
    }
    $(".sidebar .options li").click(function () {
        $(".sidebar .options li").removeClass("underline-selected");
        $(this).addClass("underline-selected")

    })
    $(".sidebar .receiceOnOrderOptions li").click(function () {
        $(".sidebar .receiceOnOrderOptions li").removeClass("selected");
        $(this).addClass("selected")
    })
    $(".issue-show-toast").click(function () {
        $(".success-toast").fadeIn().css("display", "block");
        setTimeout(
            () => {
                $(".success-toast").fadeOut();
            }, 3000);

    })
    $(".show-popup").click(function () {
        $(".popup-kiosk-bg").fadeIn();
        $(".popup-kiosk-bg").css("display", "flex")
        $("body").css("overflow", "hidden");
    })
    $(".show-comment-popup").click(function () {
        $(".popup-kiosk-bg-comments").fadeIn();
        $(".popup-kiosk-bg-comments").css("display", "flex")
        $("body").css("overflow", "hidden");
    })
    $(".show-selectbarcode-popup").click(function () {
        $(".popup-kiosk-bg-selectbarcode").fadeIn();
        $(".popup-kiosk-bg-selectbarcode").css("display", "flex")
        $("body").css("overflow", "hidden");
    })
    $(".pop-up .blue-text-button, .pop-up .image").click(function () {
        $(".pop-up-bg").fadeOut();
        //$("body").css("overflow", "scroll");
    })
    $(".show-items-dropdown").click(function () {
        changeSearchCookie("equip_kiosk.asp", "add");
        $(".scan-hide-area").css("display", "none");
        $("#search-and-comment").css("display", "flex");
        $("#add-items").css("display", "flex");
        $("#add-items .cancel-btn").css("display", "block");
        $("#add-items input").focus();
    })
    function changeSearchCookie(script, action) {
        $.ajax({
            async: true,
            type: "POST",
            url: "equip_kiosk_updateSearchCookie.asp?script=" + script + "&action=" + action + "",
            dataType: "text",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (response) {
               //alert("success");
            },
            error: function (error) {
                alert("An error occurred");
            }
        });  
        return false;
    }
    $("body").click(function (e) {
        if ($("#add-items").is(":visible") == true && $(".popup-kiosk-bg-comments").css("display") != "flex") {
            if ($(e.target).is("#add-items .cancel-btn")) {
                $(".scan-hide-area").css("display", "flex");
                $("#search-and-comment").css("display", "none");
                $("#add-items").css("display", "none");
                document.searchBarcode.barcode.focus();
            }
        }
    })
    //$(".header-form .custom-select div *")
    //.not(".header-form #view div*")
    //.click(function () {
    //  $(".header-form").submit();
    //});
    $(".checkbox").click(function () {
        let checkedCheckBoxesNo = 0;
        $(".checkbox").each(function () {
            let row = $(this).parent().parent().parent().parent();
            if ($(this).prop('checked')) {
                checkedCheckBoxesNo++;
                $(row).addClass("selected-row")
            }
            else {
                $(row).removeClass("selected-row")
            }
        })
        if (checkedCheckBoxesNo) {
            $(".return-footer").fadeIn();
            $(".return-footer").css("display", "flex");
        }
        else {
            $(".return-footer").fadeOut();
            $(".return-footer").css("display", "none");
        }
    })
    $(document.querySelector(".reference-num-row .select-items")).addClass("ref-dropdown")
})
