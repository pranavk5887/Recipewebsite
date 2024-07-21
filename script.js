const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipeDetails=document.querySelector('.recipe-details');
const recipeCloseBtn=document.querySelector('.recipe-close-btn')

async function fetchRecipes (query){
    recipeContainer.innerHTML="Fetching Recipes...";
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    
    recipeContainer.innerHTML="";
    const response=await data.json();
    response.meals.forEach((meal)=>{
        const recipediv=document.createElement("div");
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`<img src="${meal.strMealThumb}"
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>`;

        const viewbutton=document.createElement("button");
        viewbutton.textContent="View recipe";
        recipediv.appendChild(viewbutton);

        viewbutton.addEventListener('click',function(){
            OpenRecipePopup(meal);

        })
        recipeContainer.appendChild(recipediv);
    })
    
}

function OpenRecipePopup(meal){
    recipeDetailsContent.innerHTML=`<h2 class="recipeName">${meal.strMeal}</h2>
                                    <h3>Ingredients:</h3>
                                    <ul class="IngredientsList">${fetchIngredents(meal)}</ul>
                                    <div>
                                        <h3>Instructions:</h3>
                                        <p class="instructions">${meal.strInstructions}</p>
                                    </div>`;
    recipeDetailsContent.parentElement.style.display="block";

}

function fetchIngredents(meal){
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient)
        {
            const measure=meal[`strMeasure${i}`];
            ingredientsList +=`<li>${measure} ${ingredient}</li>`

        }
        else{
            break;
        }

        
    }
    return ingredientsList;

}

recipeCloseBtn.addEventListener('click',function(){
    recipeDetailsContent.parentElement.style.display="none";
})
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput);
    
})