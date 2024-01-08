const apiurl = "https://api.github.com/users/";
const addCard = document.querySelector("#main");

const getUser = async (username) => {
    try {
        const response = await fetch(apiurl + username);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        const card = `
        <div class="card">
                <div class = "padd">
                    <img class="avatar" src="${data.avatar_url}" alt="profilePic">
                </div>
                <div class = "padd">
                    <h1> ${data.name}</h1>
                    <h4> ${data.login}</h4>
                    
                </div>
                <div class = "padd">
                    ${data.bio}
                </div>
                <div class = "location">
                    <span class="material-symbols-rounded">location_on</span>
                    ${data.location}
                </div>
                <div class = "location">
                    <span class="material-symbols-rounded">group</span>
                    ${data.followers} Followers - ${data.following} Following
                </div>
                <div class = "location">
                    <span class="material-symbols-rounded">lab_profile </span>
                    ${data.public_repos} Repos
                </div>
                <div id = "gitlink">
                    <a id = "gitlinka" href = "${data.html_url}" target = "_blank">See on Github
                        <span class="material-symbols-rounded">north_east</span>
                    </a>
                </div>

        </div>
        `;

        addCard.innerHTML = card;
        fetchRepositories(username);
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
};


const toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
    }
};

document.querySelector('.icon-btn').addEventListener('click', toggleTheme);


getUser("kirti-007");


const repositoriesContainer = document.getElementById('repositories-container');
const fetchRepositories = async (username) => {
    try {
        const response = await fetch(`${apiurl}${username}/repos`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const repositories = await response.json();
        console.log(repositories);
        displayRepositories(repositories);
    } catch (error) {
        console.error("Error fetching repositories:", error);
    }
};

const displayRepositories = (repositories) => {
    repositoriesContainer.innerHTML = ''; 
    const fragment = document.createDocumentFragment(); 

    repositories.slice(0, 6).forEach(repo => {
        const repoBox = document.createElement('div');
        repoBox.classList.add('repo-box');
        
        repoBox.innerHTML = `
            <h3>${repo.name}</h3>
            <h5>${repo.language || ''}</h5>
            <span>Stars: ${repo.stargazers_count} : Forks: ${repo.forks_count}</span>
            <a id = "gitlinka" href="${repo.html_url}" target="_blank">View on GitHub
            <span class="material-symbols-rounded">north_east</span></a>
        `;
        
        fragment.appendChild(repoBox); 
    });

    repositoriesContainer.appendChild(fragment); 
};

const formsubmit = () => {
    const searchvalue = document.querySelector("#searchvalue")
    if(searchvalue != ""){
        getUser(searchvalue.value);
        searchvalue.value = "";
    }
    return false;
}


