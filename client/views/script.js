let items = document.querySelectorAll(".list-item");
console.log(items);

let removeButtons = document.querySelectorAll(".list-item button");
console.log(removeButtons);

let checks = document.querySelectorAll(".list-item input[type=checkbox]");
console.log(checks);

let qtys = document.querySelectorAll(".list-item input[type=number]")
console.log(qtys);

for (const qty of qtys) {
    qty.addEventListener("change", (event) => {
        console.log(event.target.value)
        const parent = event.target.parentNode
        const id = parent.dataset.id
        const quantity = event.target.value;
        const name = parent.dataset.name
        const isDone = parent.querySelector("input[type=checkbox").checked
        const item = {
            id,
            quantity,
            name,
            isDone
        }
        console.log(item);
        fetch("/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(item),
        }).then((res) => console.log(res));
    })
}

for (const check of checks) {
    check.addEventListener("change", (event) => {
        const id = event.target.parentNode.dataset.id;
        console.log(id);
        if (event.target.checked) {
            var item = {
                id,
                isDone: true,
                name: event.target.parentNode.dataset.name,
                quantity: Number(event.target.parentNode.dataset.qty)
            };
        } else {
            var item = {
                id,
                isDone: false,
                name: event.target.parentNode.dataset.name,
                quantity: Number(event.target.parentNode.dataset.qty)
            };
        }
        fetch("/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(item),
        }).then((res) => console.log);
    });
}

for (const button of removeButtons) {
    button.addEventListener("click", (event) => {
        const listItem = event.target.parentNode;
        const id = listItem.dataset.id;
        fetch("/remove", {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({ id }),
        }).then((res) => console.log(res));
        listItem.remove();
    });
}
