// Ricreiamo un feed social aggiungendo al layout di base fornito, 
// il nostro script JS in cui:
// Nel file js avete un array di oggetti che rappresentano ciascun post.
// Ogni post contiene le informazioni necessarie per stampare la relativa 
// card:
// id del post (numero progressivo da 1 a n),
// nome autore,
// foto autore,
// data in formato americano (mm-gg-yyyy),
// testo del post,
// immagine (non tutti i post devono avere una immagine),
// numero di likes.

// BONUS
// 1. Formattare le date in formato italiano (gg/mm/aaaa)
// 3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo 
// decrementare il contatore e cambiare il colore del bottone.

const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

// Milestone 1 - Prendendo come riferimento il layout di esempio presente 
// nell'html, stampiamo i post del nostro feed.

const container = document.getElementById('container');

for (let i = 0; i < posts.length; i++) {
    createSocialPosts(posts[i]);
}

function createSocialPosts(posts) {

   const elePost = document.createElement('div');
   elePost.classList.add('post');
   elePost.dataset.postid = posts.id;

   elePost.innerHTML = 
    `
    <div class="post__header">
                <div class="post-meta">                    
                    <div class="post-meta__icon">
                        <img class="profile-pic" src="${posts.author.image}" alt="${posts.author.name}">                    
                    </div>
                    <div class="post-meta__data">
                        <div class="post-meta__author">${posts.author.name}</div>
                        <div class="post-meta__time">${posts.created.split('-').reverse().join('/')}</div>
                    </div>                    
                </div>
            </div>
            <div class="post__text">${posts.content}</div>
            <div class="post__image">
                <img src="${posts.media}" alt="">
            </div>
            <div class="post__footer">
                <div class="likes js-likes">
                    <div class="likes__cta">
                        <a class="like-button  js-like-button" href="#">
                            <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                            <span class="like-button__label">Mi Piace</span>
                        </a>
                    </div>
                    <div class="likes__counter">
                        Piace a <b class="js-likes-counter">${posts.likes}</b> persone
                    </div>
                </div> 
            </div>             
    `;

    elePost.querySelector('.js-like-button').addEventListener('click', btnEvents);

    container.append(elePost);
}

// Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al 
// testo del bottone e incrementiamo il counter dei likes relativo.
// Salviamo in un secondo array gli id dei post ai quali abbiamo messo il 
// like.

let arrId = [];

function btnEvents(event) {
    const btnLike = this;
    const elePost = btnLike.closest('.post');
    const postId = elePost.dataset.postid;
    const eleCounter = elePost.querySelector('.js-likes-counter');
    let indexLikes = 0;
    
    while (postId != posts[indexLikes].id) {
        indexLikes++;
    }

    const objPost = posts[indexLikes];

    if (btnLike.classList.contains('like-button--liked')) {
        btnLike.classList.remove('like-button--liked');
        objPost.likes--;
    } 
    else {
        btnLike.classList.add('like-button--liked');
        objPost.likes++;
        arrId.push(postId);
    }
    
    eleCounter.innerHTML = objPost.likes;

    event.preventDefault();
}