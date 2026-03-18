const input = document.getElementById("itemInput");
const addBtn = document.getElementById("addBtn");
const ul = document.getElementById("list");

addBtn.addEventListener("click", ()=>{
    if(input.value === "") {
        alert("Please enter an item.");
        return;
    }

    console.log(input.value);
    // ul.innerHTML = `<li>${input.value}</li>`;

    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const textSpan = document.createElement("span");

    delBtn.textContent = "Delete";
    editBtn.textContent = "Edit";
    delBtn.classList.add("delete");
    editBtn.classList.add("edit");

    textSpan.textContent = input.value;
    
    ul.appendChild(li);
    li.appendChild(textSpan)
    li.appendChild(editBtn);
    li.appendChild(delBtn);

    input.value = ""

    editBtn.addEventListener("click", ()=>{
        textSpan.contentEditable = "true";
        textSpan.focus();
        
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("save");
        
        li.children[1].after(saveBtn);
        
        saveBtn.addEventListener('click', ()=>{
            const updatedText = textSpan.textContent.trim();

            if (updatedText === "") {
                alert("Item cannot be empty!");
                textSpan.focus();
                return;
            }
            
            textSpan.contentEditable = "false";
            saveBtn.remove();
        })
    })
    
    delBtn.addEventListener("click", ()=>{
        li.remove();
    })
})