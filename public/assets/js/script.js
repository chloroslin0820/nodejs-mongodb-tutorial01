const threadSectionDOM = document.querySelector(".thread-section");
const inputTitleDOM = document.getElementById("input-title");
const inputContentDOM = document.getElementById("input-content");
const formDOM = document.querySelector(".form-section");
const buttonDOM = document.querySelector("button");

let inputTitle = "";
let inputContent = "";

// 最初はThreadのすべてを読み込む
const getAllThreads = async () => {
    try {
        let allThreadsDto = await axios.get("/api/v1/threads");
        let { data } = allThreadsDto;

        // 出力
        let allThreads = data.map((thread) => {
            const { title, content } = thread;
            return `
                <div class="single-thread">
                <h3>${ title }</h3>
                <p>${ content }</p>
                </div>
            `
        })
        .join("");

        threadSectionDOM.innerHTML = allThreads;

    } catch (err) {
        console.log(err);
    }
};

getAllThreads();

// Threadを作成
inputTitleDOM.addEventListener("change", (e) => {
    inputTitle = e.target.value;
});
inputContentDOM.addEventListener("change", (e) => {
    inputContent = e.target.value;
});
formDOM.addEventListener("submit", async (e) => {
    e.preventDefault();

    if(inputTitle && inputContent) {
        try {
            await axios.post("/api/v1/thread", {
                title: inputTitle,
                content: inputContent,
            });

            inputTitleDOM.value = "";
            inputContentDOM.value = "";

            getAllThreads();
    
        } catch (err) {
            console.log(err);
        }
    }
});

buttonDOM.addEventListener('click', () => {
    if(inputTitle && inputContent) {
        buttonDOM.classList.toggle('active');
    } 
});