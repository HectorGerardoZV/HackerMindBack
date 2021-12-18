
const loadTop5Users = ()=>{
    try {
        fetch("http://localhost:1000/top5Users")
        .then(response=>{
            return response.json();
        }).then(users=>{
            insertUsers(users);
        })
    } catch (error) {
        
    }
}
const loadSpecialPosts = ()=>{
    insertSpecialPosts(10);
}
const insertUsers = users=>{
    const list = document.querySelector(".usersList");
    let place = 1;
    users.forEach(user=>{
        const userItem = document.createElement("DIV");
        userItem.classList.add("userItemTop");
        userItem.id = user._id;
        userItem.innerHTML = `
            <div class="principalContentTop">
                <img src = "../userIMG/${user.image}">
                <div class = "userItemTop_info">
                    <p>${user.userName}</p>
                    <img src = "../img/${user.rank}">
                </div>
            </div>
            <p>${place}</p>
        `;
        place++;
        list.appendChild(userItem);
    })
}
const insertSpecialPosts = number =>{
    const specialsSection = document.querySelector(".specialsSection");
    for (let i = 0; i < number; i++) {
        const itemPost =document.createElement("DIV");
        itemPost.classList.add("specialPost");
         itemPost.innerHTML = `
         <div class="specialPost__header">
            <img src="../userIMG/userImage.svg">
            <p>Piter adam</p>
            <img src="../img/HackerSpecial.svg">   
         </div>
         <div class= "specialPost__info">
            <h3>This is the titel and this is the max</h3>
            <div class= "specialPost__date">
                <img src="../img/DateBlue.svg">
                <p>12/12/2021</p>
            </div>
         </div>
         <div class = "specialPost__content">
         <p>
            This is the content of the special post, please give me design
            for my self jajajsjajasjjjjsaj it's a pranc bro <3 a caso siempre
            tenemos que hablar ingles amigios miosssss
            This
         </p>
         </div>

    `;
    specialsSection.appendChild(itemPost);
        
    }
}
const specilasScroll = ()=>{
    let section = document.querySelector(".specialsSection");
    let isDawn = false;
    let startX;
    let scrollLeft; 
    section.addEventListener("mousedown",e=>{
        isDawn = true;
        section.classList.add("active");
        startX = e.pageX;
        scrollLeft = section.scrollLeft;
        
    })
    section.addEventListener("mouseleave",()=>{
        isDawn = false;
        section.classList.remove("active");
    })
    section.addEventListener("mouseup",()=>{
        isDawn = false;
        section.classList.remove("active");
    })
    section.addEventListener("mousemove",e=>{
        if(!isDawn) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (x - startX)*2;
        section.scrollLeft = scrollLeft - walk;
    })
}
const createPost = ()=>{
    const form = document.querySelector(".createPostForm");


    form.addEventListener("submit",e=>{
        const post  = sendPost(e);
    });
}
const sendPost = (e)=>{
    const post = validateInputs(e);
    if(post){
        const data ={
            headers: {'Content-type': 'application/json'},
            method: 'POST',
            body: JSON.stringify(post)
        }
        fetch("http://localhost:1000/createPost",data)
        .then(response=>{
            return response.json();
        }).then(object=>{
            const {message} = object;
            if(message=="YES"){
                showSuccess();
                const posts = new Posts();
                posts.buildPost(post);
            }
        }).catch(error=>{
            console.log(error);
        })
    }else{
        showErrorsForm();
    }
}
const validateInputs = (e)=>{
    e.preventDefault();
    clearErrorForm();
    const titleInput = document.querySelector("#title");
    const categorySelect = document.querySelector("#category");
    const contentTextArea = document.querySelector("#content");
    let title = titleInput.value;
    let category = categorySelect.value;
    let content = contentTextArea.value;

    title = title.trim();
    category = category.trim();
    content = content.trim();
    let post = null;
    if((title!="" && title.length<=35)&&(category!="")&&(content!="" && content.length<=230)){
        const dateOBJ = new Date();
        const date = dateOBJ.getFullYear()+"-"+(dateOBJ.getMonth()+1)+"-"+dateOBJ.getDate();
        const idUser = e.target.id;
        post = {
            title, 
            content,
            date,
            idUser,
            idCategory: category
        }
        
    }
    
    return post;
}
const clearErrorForm = ()=>{
    const titleSection = document.querySelector("#titleErrorArea");
    const categorySection = document.querySelector("#categoryErrorArea");
    const contentSection = document.querySelector("#contentErrorArea");


    const titleTag = document.querySelector("#titleError");
    const categoryTag = document.querySelector("#categoryError");
    const contentTag = document.querySelector("#contentError");


    if(titleSection.classList.contains("errorBack")){
        titleSection.classList.remove("errorBack");
        titleTag.textContent = "";
    }

    if(categorySection.classList.contains("errorBack")){
        categorySection.classList.remove("errorBack");
        categoryTag.textContent = "";
    }
    
    if(contentSection.classList.contains("errorBack")){
        contentSection.classList.remove("errorBack");
        contentTag.textContent = "";
    }

}
const showErrorsForm = ()=>{
    const titleInput = document.querySelector("#title");
    const categorySelect = document.querySelector("#category");
    const contentTextArea = document.querySelector("#content");
    let title = titleInput.value;
    let category = categorySelect.value;
    let content = contentTextArea.value;

    title = title.trim();
    category = category.trim();
    content = content.trim();
    
    const titleSection = document.querySelector("#titleErrorArea");
    const categorySection = document.querySelector("#categoryErrorArea");
    const contentSection = document.querySelector("#contentErrorArea");


    const titleTag = document.querySelector("#titleError");
    const categoryTag = document.querySelector("#categoryError");
    const contentTag = document.querySelector("#contentError");




    if(title=="" || title.length>35){

        if(titleSection.classList.contains("errorBack")){
            titleSection.classList.remove("errorBack");
            titleTag.textContent = "";
        }
        titleSection.classList.add("errorBack");
        if(title==""){
            titleTag.textContent = "Title is required";
        }else{
            titleTag.textContent = "Character limit exceeded";
        }

    }
    
    if(category==""){
        if(categorySection.classList.contains("errorBack")){
            categorySection.classList.remove("errorBack");
            categoryTag.textContent = "";
        }
        categorySection.classList.add("errorBack");
        categoryTag.textContent = "Select a category";
    }
    
    if(content=="" || content.length>230){
        
        if(contentSection.classList.contains("errorBack")){
            contentSection.classList.remove("errorBack");
            contentTag.textContent = "";
        }
        contentSection.classList.add("errorBack");
        if(content==""){
            contentTag.textContent = "Content is required";
        }else{
            contentTag.textContent = "Character limit exceeded";   
        }
    
    }
}
const showSuccess = ()=>{
    const successArea = document.querySelector(".createPostSuccessSection");
    const successMessage = document.querySelector(".createPostSuccessSectionTAG");
    const titleInput = document.querySelector("#title").value = "";
    const categorySelect = document.querySelector("#category").value = "";
    const contentTextArea = document.querySelector("#content").value = "";


    if(successArea.classList.contains("successBack")){
        successArea.classList.remove("successBack");
        successMessage.textContent = "";
    }
    successArea.classList.add("successBack");
    successMessage.textContent = "Published";

    setTimeout(() => {
        successArea.classList.remove("successBack");
        successMessage.textContent = "";
    }, 3000);
}

class Posts {
    constructor(){
        this.postsList = document.querySelector(".posts");
    }
    loadPosts(){
        try {
            fetch("http://localhost:1000/publicPosts")
            .then(response=>{
                return response.json();
            }).then(posts=>{
                this.buildPostsFor(posts);
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            
        }
    }
    buildPostsFor(posts){
        posts.forEach(post=>{
            this.buildPosts(post);
        })
    }
    buildPost(post){
        try {
            fetch(`http://localhost:1000/findUser/${post.idUser}`)
            .then(response=>{
                return response.json();
            }).then(user=>{
                this.insertPost(post,user);
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    buildPosts(post){
        try {
            fetch(`http://localhost:1000/findUser/${post.idUser}`)
            .then(response=>{
                return response.json();
            }).then(user=>{
                this.insertPosts(post,user);
            }).catch(error=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }
    insertPosts(post,user){
        let date = post.date;
        let datePoints = date.split("-");
        let start =datePoints[0];
        let end =datePoints[2];
        datePoints[0] = end;
        datePoints[2] = start;

        date = datePoints[0]+"/"+datePoints[1]+"/"+datePoints[2];
        const postHTML = document.createElement("DIV");
        postHTML.classList.add("normalPostCard");
        postHTML.innerHTML =`
        <div class="normalPostCard__TOP">
            <div class="normalPostCard__TOP-user">
                <img class="normalPostCard__imageUser" src="../userIMG/${user.image}">
                <p>${user.userName}</p>
                <img class="normalPostCard__rankUser" src="../img/${user.rank}">
            </div>

            <div class="normalPostCard__TOP-category">
                <h3>${post.idCategory}</h3>
            </div>
        </div>

        <div class="normalPostCard__HEADER">
            <div class="normalPostCard__HEADER-title">
                <p>${post.title}</p>
            </div>
            <div class="normalPostCard__HEADER-date">
                <img src="../img/DateBlue.svg">
                <p>${date}</p>
            </div>
            
        </div>

        <div class="normalPostCard__CONTENT">
            <p>${post.content}</p>
        </div>

        <div class="normalPostCard__COMMENT">
            <input type="text" id= "comment" placeholder= "Add Comment">
            <img src="../img/Send.svg">
        </div>
        <div class="normalPostCard__COMMENTS-button">
            <div class="optionsPost">
            </div>
            <button>
                View Comments
                <img src="../img/Close.svg">
            </button>
        </div>
        
        `;
        this.postsList.appendChild(postHTML);
    }
    insertPost(post,user){
        let date = post.date;
        let datePoints = date.split("-");
        let start =datePoints[0];
        let end =datePoints[2];
        datePoints[0] = end;
        datePoints[2] = start;

        date = datePoints[0]+"/"+datePoints[1]+"/"+datePoints[2];
        const postHTML = document.createElement("DIV");
        postHTML.classList.add("normalPostCard");
        postHTML.innerHTML =`
        <div class="normalPostCard__TOP">
            <div class="normalPostCard__TOP-user">
                <img class="normalPostCard__imageUser" src="../userIMG/${user.image}">
                <p>${user.userName}</p>
                <img class="normalPostCard__rankUser" src="../img/${user.rank}">
            </div>

            <div class="normalPostCard__TOP-category">
                <h3>${post.idCategory}</h3>
            </div>
        </div>

        <div class="normalPostCard__HEADER">
            <div class="normalPostCard__HEADER-title">
                <p>${post.title}</p>
            </div>
            <div class="normalPostCard__HEADER-date">
                <img src="../img/DateBlue.svg">
                <p>${date}</p>
            </div>
            
        </div>

        <div class="normalPostCard__CONTENT">
            <p>${post.content}</p>
        </div>

        <div class="normalPostCard__COMMENT">
            <input type="text" id= "comment" placeholder= "Add Comment">
            <img src="../img/Send.svg">
        </div>
        <div class="normalPostCard__COMMENTS-button">
            <div class="optionsPost">
            </div>
            <button>
                View Comments
                <img src="../img/Close.svg">
            </button>
        </div>
        
        `;
        this.postsList.insertBefore(postHTML, this.postsList.firstChild)
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    loadTop5Users();
    loadSpecialPosts();
    specilasScroll();
    createPost();

    const posts = new Posts();
    posts.loadPosts();


});