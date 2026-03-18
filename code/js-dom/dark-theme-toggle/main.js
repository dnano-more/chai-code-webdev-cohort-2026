const btn = document.getElementById("toggleButton");

// btn.addEventListener("click", function() {
//     document.body.style.backgroundColor = "black";
//     document.body.style.color = "#f4f4f4";
//     button.innerText = "Toggle Light Mode"

//     button.addEventListener("click", ()=>{
//         document.body.style.backgroundColor = "#f4f4f4";
//         document.body.style.color = "#222";
//         button.innerText = "Toggle Dark Mode"
//     })
// })

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    btn.textContent = "Toggle Light Mode";

    btn.addEventListener("click", ()=>{
        if(btn.textContent === "Toggle Dark Mode") {
            btn.textContent = "Toggle Light Mode"; 
        } else {
            btn.textContent = "Toggle Dark Mode";
        }
    })
});

