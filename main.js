let imagesArray = Array.from(document.querySelectorAll('.content img'));
bulletsContainer = document.getElementById('bullets');
leftArrow = document.getElementById('prev');
rightArrow = document.getElementById('next');
content = document.querySelector(".content");
current = 1;

imagesArray.forEach((img, id) => {
    let bullet = document.createElement('span');
    bullet.setAttribute("data-id", id + 1);
    bulletsContainer.appendChild(bullet);
    img.classList.remove('active');
})
let spans = document.querySelectorAll('.bullets span');

function logic() {
    imagesArray[current - 1].classList.add('active');
    spans[current - 1].classList.add('active');
}
function remover() {
    spans.forEach((span) => {
        span.classList.remove("active")
    });
    imagesArray.forEach((img) => {
        img.classList.remove("active")
    });
}
logic();    
rightArrow.onclick = rightEvent;
function rightEvent() {
    remover();
    if(current === imagesArray.length) {
        current = 1;
    } else {
        current++;
    }
    logic();
}
leftArrow.onclick = leftEvent;
function leftEvent() {
    remover();
    if(current === 1) {
        current = imagesArray.length;
    } else {
        current--;
    }
    logic();
}
spans.forEach((span) => {
    span.onclick = function (e) {
        remover();
        current = this.getAttribute("data-id");
        logic();
        // console.log();
        
    }
});
let starting = 0;
let ending = 0;
document.querySelector('.content').addEventListener('touchstart', (e) => {
    starting = e.touches[0].clientX;
})

document.querySelector('.content').addEventListener('touchend', (e) => {
    ending = e.changedTouches[0].clientX;   
    if (ending > starting + 50) {
        rightEvent();
    } else if (ending < starting - 50) {
        leftEvent();
    }
})


let autoChange;
autoChange =  setInterval(() => {
        rightEvent();
    }, 3000)
imagesArray.forEach((img) => {
img.addEventListener("mouseenter", () => {
    clearInterval(autoChange)
});
img.addEventListener("mouseleave", () => {
    autoChange = setInterval(() => {
        rightEvent();
    }, 3000)
});
})
