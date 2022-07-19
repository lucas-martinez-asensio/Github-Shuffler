let randomNumber = parseInt((Math.random() * (101 - 1) + 1) * 10);

const getDataFromEndPoint = async () => {
  try {
    const response = await fetch("https://api.github.com/repositories");
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.log(error);
  }
};

const getRepositories = async (endPoint) => {
  const repositorie = await fetch(endPoint);
  const jsonrepositorie = await repositorie.json();
  const fiveFirstRepositories = jsonrepositorie.slice(0, 5);
  return fiveFirstRepositories;
};

const owner = async () => {
  const ownerNumber = parseInt(Math.random() * (101 - 1) + 1);
  console.log(ownerNumber);
  const ownersList = await getDataFromEndPoint();
  const randomOwner = ownersList[ownerNumber];
  return randomOwner;
};

const edit = async () => {
  const firstOwner = await owner();
  const firstName = firstOwner.owner.login;
  const firstAvatar = firstOwner.owner.avatar_url;

  const userName = document.querySelector(".username");
  userName.innerText = firstName;

  const avatar = document.querySelector("#avatar");
  avatar.src = firstAvatar;
  avatar.className = "circle-avatar blur";

  const fiveRepositoriesFromFirst = await getRepositories(
    firstOwner.owner.repos_url
  );
  fiveRepositoriesFromFirst.forEach((element) => {
    const repoNode = document.createElement("a");
    const reposId = document.querySelector("#repos-list");

    repoNode.textContent = element.html_url;
    repoNode.href = element.html_url;

    reposId.appendChild(repoNode);
  });

  const body = document.querySelector("body");

  const changeBlur = (event) => {
    if (event.target.id == "avatar") {
      avatar.className = `circle-avatar`;
      console.log(event);
    } else {
      avatar.className = `circle-avatar blur`;
      console.log(!event);
    }
  };

  body.addEventListener("mousemove", changeBlur);

  const actionButton = async () => {
    fiveRepositoriesFromFirst.forEach((a) => {
      const repoNode = document.createElement("a");
      const reposId = document.querySelector("#repos-list");

      repoNode.textContent = a.html_url;
      repoNode.href = a.html_url;

      reposId.appendChild(repoNode);
    });
    let previousA = document.querySelectorAll("a");
    previousA.forEach((a) => {
      a.remove();
    });
    edit();
  };

  const shifterButton = document.querySelector("button");
  shifterButton.onclick = () => actionButton();
};

edit();
