const quote = document.querySelector('.quote');
const category = document.getElementById('category');
generate = document.getElementById('generate');
like = document.getElementById('like');
share = document.getElementById('share');
copy = document.getElementById('copy');
list = document.getElementById('list');
//author=document.getElementById('.author');
quoteArea=document.querySelector(".quoteArea");
favouriteList=document.querySelector('.favouriteList');
favouriteData=document.getElementById('favouriteData');

let favouriteListArr = localStorage.getItem("favouriteListItems")?
JSON.parse(localStorage.getItem("favouriteListItems")):[];

// console.log(favouriteListArr)

window.addEventListener("load", ()=>{
    generateapi();
    favouriteList.style.display="none";


    if(favouriteListArr.length==0){
        list.style.opacity="0.6";
        list.style.pointerEvents="none";
    }
    else{
        list.style.opacity="1";
        list.style.pointerEvents="auto";
    }
})
function generateapi(){

    like.removeAttribute("class");
        like.setAttribute("class","fa-regular fa-heart");
        like.style.color = "black";

    let div = document.createElement("div");
    quote.innerHTML=`Loading New Quotes... <i class="fa-solid fa-sync fa-spin"></i>`;
    generate.innerHTML="Generating...";
    fetch("https://api.api-ninjas.com/v1/quotes",{
        headers: { 'X-Api-Key': 'tG3EmLY5qznRSyV3fqK70g==NlHT87EFDESHQWfL'}
    })
    .then ((response)=> response.json())
    .then((data) => {console.log(data);
        generate.innerHTML="New Quote";
        quote.innerHTML="";
        div.innerHTML +='<i class="fa-solid fa-quote-left"></i> &nbsp;';
        div.innerHTML +=data[0].quote;
        div.innerHTML +='&nbsp; <i class ="fa-solid fa-quote-right"></i> ';
        div.innerHTML += `<div class="author"><span>__</span>${data[0].author}</div>`
        quote.append(div);
        category.innerHTML=data[0].category;

        

        if(favouriteListArr.length==0){
        list.style.opacity="0.6";
        list.style.pointerEvents="none";
    }
    else{
        list.style.opacity="1";
        list.style.pointerEvents="auto";
    }

    });
    

}

function likequote(){
    if(like.style.color == "red"){
        like.removeAttribute("class");
        like.setAttribute("class","fa-regular fa-heart");
        like.style.color = "black";
        favouriteListArr = favouriteListArr.filter(function(e){
            return e!==quote.innerHTML;
        })
        localStorage.setItem("favouriteListItems",JSON.stringify(favouriteListArr));

    }
    else{
        like.setAttribute("class","fa-solid fa-heart");
        like.style.color = "red";
        favouriteListArr.push(quote.innerHTML);
        localStorage.setItem("favouriteListItems",JSON.stringify(favouriteListArr));

    }
    if(favouriteListArr.length==0){
        list.style.opacity="0.6";
        list.style.pointerEvents="none";
    }
    else{
        list.style.opacity="1";
        list.style.pointerEvents="auto";
    }


}
function copyquote(){
    if(copy.style.color=="black"){
        navigator.clipboard.writeText(" ");
        copy.removeAttribute("class");
        copy.setAttribute("class","fa-regular fa-copy");
       // copy.style.color="black";
    }
    else{
        navigator.clipboard.writeText(quote.innerText);
        copy.setAttribute("class","fa-solid fa-copy");
        copy.style.color="black";
    }
    

}

list.addEventListener("click", ()=>{
    favouriteData.innerHTML="";
    quoteArea.style.display="none"
    favouriteList.style.display="block";

    
    favouriteListArr.forEach((item)=>{
        console.log(item);
        let li=document.createElement("li");
        li.innerHTML = item;
        favouriteData.append(li);
    })
});

function switchquote(){
    quoteArea.style.display="block"
    favouriteList.style.display="none";

    if(favouriteListArr.length==0){
        list.style.opacity="0.6";
        list.style.pointerEvents="none";
    }
    else{
        list.style.opacity="1";
        list.style.pointerEvents="auto";
    }
    
}

function clearFavouriteList(){
    favouriteData.innerHTML=" ";
    favouriteListArr=[];
    localStorage.setItem("favouriteListItems",JSON.stringify(favouriteListArr));

    like.removeAttribute("class");
        like.setAttribute("class","fa-regular fa-heart");
        like.style.color = "black";

}


function twiteer(){
    let twiteurl = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
    window.open(twiteurl,"_blank")

}
