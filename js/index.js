"use strict";
/// <reference types="../@types/jquery" />

const navLinks = $(".links ul li");
const rowData = document.getElementById("rowData");
const CategoriesBtn = document.getElementById("Categories");
const areaBtn = document.getElementById("area");
const ingredientsBtn = document.getElementById("ingredients");
const searchBtn = document.getElementById("search");
const searchcontainer = document.getElementById("searchcontainer");
const contactBtn = document.getElementById("Contact");
let submitBtn;


//! ********** Loading ********** //
$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loading").fadeOut(300);
        $("body").css("overflow" , "visible");
    });
});


//! ********** SideBar ********** //
function openSideBar(){
    $("aside").animate({ left: 0 }, 500);
    $(".nav-header .icon").removeClass("fa-bars");
    $(".nav-header .icon").addClass("fa-x");

    for(let i = 0; i < navLinks.length; i++){
        const delay = 100 * i;
        navLinks.eq(i).delay(delay).animate({top: 0}, 500);
    }
}

function closeSideBar(){
    let width = $(".nav-menu").outerWidth();
    $("aside").animate({ left: -width }, 500);
    $(".nav-header .icon").addClass("fa-bars");
    $(".nav-header .icon").removeClass("fa-x");

    navLinks.animate({ top: "300px" }, 500);
}

$(".nav-header .icon").on("click", function () {
    if ( $("aside").css("left") == "0px" ) {
        closeSideBar()
    }

    else {
        openSideBar()
    }
});

//! ********** Display Data ********** //
function displayData(name){
    let showData = "";

    for( let i = 0 ; i < name.length ; i++ ){
        showData += `
        <div class=" col-sm-6 col-md-4 col-lg-3">
            <div onclick=" getDetailsMeale('${name[i].idMeal}')" class="image rounded">
                <img src="${name[i].strMealThumb}" class="w-100" alt="">
                <div class="layer rounded">
                    <h3>${name[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `
        rowData.innerHTML = showData;
    }
}

//! ********** Categories ********** //
CategoriesBtn.addEventListener("click" , async function(){
    closeSideBar();
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    // console.log(data.categories);
    displayCategories(data.categories);
    searchcontainer.innerHTML = "";

    $(".inner-loading").fadeOut(300);
})

function displayCategories(categories){
    let showData = "";

    for( let i = 0 ; i < categories.length ; i++ ){
        showData += `
        <div class=" col-sm-6 col-md-4 col-lg-3">
            <div  onclick="sedarchCategories('${categories[i].strCategory}')"   class="image rounded">
                <img src="${categories[i].strCategoryThumb}" class="w-100" alt="">
                <div class="layer rounded">
                    <h3>${categories[i].strCategory}</h3>
                    <p class="px-2">${categories[i].strCategoryDescription.split(" ").slice(0,10).join(" ")}</p>
                </div>
            </div>
        </div>
        `
        rowData.innerHTML = showData;
    }
}
//! ********** Search Meal Categories ********** //
async function sedarchCategories(Category){
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`);
    let data = await response.json();
    // console.log(data.meals);
    displayData(data.meals);

    $(".inner-loading").fadeOut(300);
}


//! ********** Area ********** //
areaBtn.addEventListener("click" , async function(){
    closeSideBar();
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    // console.log(data.meals);
    displayArea(data.meals);
    searchcontainer.innerHTML = "";

    $(".inner-loading").fadeOut(300);
});

function displayArea(area){
    let showData = "";

    for( let i = 0 ; i < area.length ; i++ ){
        showData += `
        <div class=" col-sm-6 col-md-4 col-lg-3">
            <div onclick="sedarchMealArea('${area[i].strArea}')"  class="image rounded text-center text-white">
                <i class="fa-solid fa-house-laptop icon-house"></i>
                <h3>${area[i].strArea}</h3>
            </div>
        </div>
        `
        rowData.innerHTML = showData;
    }
}
//! ********** Search Meal Area ********** //
async function sedarchMealArea(mealArea){
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`);
    let data = await response.json();
    // console.log(data.meals);
    displayData(data.meals);
    
    $(".inner-loading").fadeOut(300);
}


//! ********** Ingredients ********** //
ingredientsBtn.addEventListener("click" , async function(){
    closeSideBar();
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    // console.log(data);
    displayIngredients(data.meals.slice(0,20));
    searchcontainer.innerHTML = "";

    $(".inner-loading").fadeOut(300);
});

function displayIngredients(area){
    let showData = "";

    for( let i = 0 ; i < area.length ; i++ ){
        showData += `
        <div class=" col-sm-6 col-md-4 col-lg-3">
            <div onclick="sedarchMealIngredients('${area[i].strIngredient}')" class="image rounded text-center text-white">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3 class="fs-5 pt-3">${area[i].strIngredient}</h3>
                <p class="text-white-50">${area[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
        `
        rowData.innerHTML = showData;
    }
}
//! ********** Search Meal Ingredients ********** //
async function sedarchMealIngredients(mealIngredients){
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngredients}`);
    let data = await response.json();
    // console.log(data.meals);
    displayData(data.meals);

    $(".inner-loading").fadeOut(300);
}


//! ********** Details Meale ********** //
async function getDetailsMeale(meal){
    closeSideBar();
    $(".inner-loading").fadeIn(300);

    const response =  await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
    let data = await response.json();
    // console.log(data.meals[0]);
    displayDetailsMeale(data.meals[0]);
    searchcontainer.innerHTML = ""

    $(".inner-loading").fadeOut(300);
}

function displayDetailsMeale(meal){
    let ingredient = ``;

    for( let i = 1 ; i <= 20 ; i++ ){
        if( meal[`strIngredient${i}`]){
            ingredient += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",");
    if( !tags ) tags = [];
    let strTags = ``;

    for( let i = 0 ; i < tags.length ; i++ ) {
        strTags += `
            <li class="alert alert-danger m-2 p-1 soup">${tags[i]}</li>
        `
    }


    let cartona = `
    <div class="col-lg-4">
        <div class="image text-center text-white rounded">
            <img class="w-100 mb-2" src="${meal.strMealThumb}" alt="">
            <h2>${meal.strMeal}</h2>
        </div>
    </div>

    <div class="col-lg-8">
        <div class="caption text-white">
            <h2>Instructions</h2>
            <p class="text-white-50">${meal.strInstructions}</p>
            <h3>${meal.strArea} :<span>Turkish</span></h3>
            <h3>${meal.strCategory} :<span>Side</span></h3>
            <h3>Recipes :</h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
            ${ingredient}
            </ul>

            <h3>Tags :</h3>
            <ul class="list-unstyled d-flex flex-wrap g-3">
                ${strTags}
            </ul>

            <a href="${meal.strSource}" class="text-decoration-none btn btn-success me-2" target="_blank">Source</a>
            <a href="${meal.strYoutube}" class="text-decoration-none btn btn-danger" target="_blank">Youtube</a>

        </div>
    </div>
    `

    rowData.innerHTML = cartona;
}

//! ********** Search By Name & First Letter ********** //
searchBtn.addEventListener("click" , function(){
    closeSideBar();
    searchcontainer.innerHTML = `
        <div class="row g-4 ps-sm-5">

            <div class="col-lg-6">
                <div class="input">
                    <input oninput="searchByName(this.value)" type="text" placeholder="Search By Name" class="form-control text-white bg-transparent">
                </div>
            </div>

            <div class="col-lg-6">
                <div class="input">
                <input  oninput="searchByFirstLetter(this.value)" maxlength="1"  type="text"  placeholder="Search By First Letter" class="form-control text-white bg-transparent">
                </div>
            </div>
        </div>`
    rowData.innerHTML = "";
})

async function searchByName(search){
    $(".inner-loading").fadeIn(500);

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    let data = await response.json();
    // console.log(data.meals);
    data.meals ? displayData(data.meals) : displayData("");

    $(".inner-loading").fadeOut(500);
};

async function searchByFirstLetter(term){
    $(".inner-loading").fadeIn(500);

    if( term == "" ){
        term = "p";
    }

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
    let data = await response.json();
    // console.log(data.meals);
    data.meals ? displayData(data.meals) : displayData([]);

    $(".inner-loading").fadeOut(500);
};

//! ********** Display Contact ********** //
contactBtn.addEventListener("click" , function(){
    closeSideBar();
    searchcontainer.innerHTML = "";
    rowData.innerHTML = `
        <div id="contact">
            <div class="container w-75">
                <div class="row g-4">

                    <div class="col-12 col-md-6">
                        <div class="input">
                            <input oninput = "inputaValidation()" id="nameInput" type="text" placeholder="Enter Your Name" class="form-control text-white bg-transparent">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Special characters and numbers not allowed!
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="input">
                            <input oninput = "inputaValidation()" id="emailInput" type="email" placeholder="Enter Your Email" class="form-control text-white bg-transparent">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Email not valid! *exemple@yyy.zzz
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="input">
                            <input oninput = "inputaValidation()" id="phoneInput" type="number" placeholder="Enter Your Phone" class="form-control text-white bg-transparent">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid Phone Number
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="input">
                            <input oninput = "inputaValidation()" id="ageInput" type="number" placeholder="Enter Your Age" class="form-control text-white bg-transparent">
                            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid age
                            </div>
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="input">
                            <input oninput = "inputaValidation()" id="passInput" type="password" placeholder="Enter Your Password" class="form-control text-white bg-transparent">
                            <div id="passAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Enter valid password *Minimum 8 characters, at least 1 letter and 1 number*
                            </div>
                            
                        </div>
                    </div>

                    <div class="col-12 col-md-6">
                        <div class="input">
                            <input oninput = "inputaValidation()" id="repassInput" type="password" placeholder="Repassword" class="form-control text-white bg-transparent">
                            <div id="repassAlert" class="alert alert-danger w-100 mt-2 d-none">
                                Your password doesn't match! please try again
                            </div>
                        </div>
                    </div>
                    <button id="submit" class="btn btn-outline-warning mx-auto" disabled >Submit</button>
                </div>
            </div>
        </div>
    `
    submitBtn = document.getElementById("submit");

    document.getElementById("nameInput").addEventListener("focus", () => {
        nameInputTouched = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        emailInputTouched = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        phoneInputTouched = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        ageInputTouched = true
    })

    document.getElementById("passInput").addEventListener("focus", () => {
        passwordInputTouched = true
    })

    document.getElementById("repassInput").addEventListener("focus", () => {
        repasswordInputTouched = true
    })

})

    let nameInputTouched = false;
    let emailInputTouched = false;
    let phoneInputTouched = false;
    let ageInputTouched = false;
    let passwordInputTouched = false;
    let repasswordInputTouched = false;

//! ********** Validation ********** //
function inputaValidation(){
    if( nameInputTouched == true ){
        if( validationName() == true ){
            document.getElementById("nameAlert").classList.add("d-none");
        }
        else {
            document.getElementById("nameAlert").classList.remove("d-none");
        }
    }

    if( emailInputTouched == true ){
        if( validationEmail() == true ){
            document.getElementById("emailAlert").classList.add("d-none");
        }
        else {
            document.getElementById("emailAlert").classList.remove("d-none");
        }
    }

    if( phoneInputTouched == true ){
        if( validationPhone() == true ){
            document.getElementById("phoneAlert").classList.add("d-none");
        }
        else {
            document.getElementById("phoneAlert").classList.remove("d-none");
        }
    }

    if( ageInputTouched == true ){
        if( validationAge() == true ){
            document.getElementById("ageAlert").classList.add("d-none");
        }
        else {
            document.getElementById("ageAlert").classList.remove("d-none");
        }
    }

    if( passwordInputTouched == true ){
        if( validationPassword() == true ){
            document.getElementById("passAlert").classList.add("d-none");
        }
        else {
            document.getElementById("passAlert").classList.remove("d-none");
        }
    }

    if( repasswordInputTouched == true ){
        if( validationRePassword() == true ){
            document.getElementById("repassAlert").classList.add("d-none");
        }
        else {
            document.getElementById("repassAlert").classList.remove("d-none");
        }
    }

    if (validationName() &&
        validationEmail() &&
        validationPhone() &&
        validationAge() &&
        validationPassword() &&
        validationRePassword()) {
    submitBtn.removeAttribute("disabled")
    } else {
        submitBtn.setAttribute("disabled", true)
    }
}

function validationName(){
    return (/^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value));
}

function validationEmail(){
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("emailInput").value));
}

function validationPhone(){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value));
}

function validationAge(){
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value));
}

function validationPassword(){
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passInput").value));
}

function validationRePassword(){
    return document.getElementById("passInput").value === document.getElementById("repassInput").value;
}