let dataContainer = document.getElementById('data-container');
let loadData = document.querySelector('.loader');
let filterData = document.getElementById('filter');

let limit = 10;
let page = 1;

async function getPosts() {
    let data = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    return data.json();
}

async function showPosts() {
    let posts = await getPosts();
    posts.forEach(post => {
        let element = document.createElement('div');
        element.classList.add('data-body');
        element.innerHTML = `
            <div class="child-number">${post.id}</div>
            <div class="child-title">${post.title}</div>
            <div class="child-body">${post.body}</div>
        `;
        dataContainer.appendChild(element)
    });
}

showPosts();

window.addEventListener('scroll', (e) => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    let scrollTotal = scrollTop + clientHeight;
    if (scrollTotal >= scrollHeight) {
        showLoad();
    }
});

function showLoad() {
    loadData.classList.add('show');
    setTimeout(() => {
        loadData.classList.remove('show');
        setTimeout(() => {
            page++;
            showPosts();
        }, 200);
    }, 1000);
}

filterData.addEventListener('input', (e) => {
    let search = e.target.value.toLowerCase();
    let posts = document.querySelectorAll('.data-body');

    posts.forEach(post => {
        let title = post.querySelector('.child-title').innerText.toLowerCase();
        let body = post.querySelector('.child-body').innerText.toLowerCase();

        if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
})