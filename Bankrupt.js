const defaultData = {
    users: [
        {
            id: 1,
            username: "admin",
            password: "admin123",
            name: "Cyber User",
            balance: 500000,
            transactions: [
                "🚀 Account Initialized ₹500,000"
            ]
        }
    ]
};

let userData =
    JSON.parse(
        localStorage.getItem("bankData")
    ) || defaultData;

let currentUser = null;

function saveData() {
    localStorage.setItem(
        "bankData",
        JSON.stringify(userData)
    );
}

function formatMoney(amount) {
    return Number(amount)
        .toLocaleString("en-IN");
}

function getTime() {
    return new Date()
        .toLocaleString("en-IN");
}

window.onload = () => {

    document.getElementById(
        "username"
    ).value = "";

    document.getElementById(
        "password"
    ).value = "";
};

function login() {

    const username =
        document.getElementById(
            "username"
        ).value.trim();

    const password =
        document.getElementById(
            "password"
        ).value;

    currentUser =
        userData.users.find(
            user =>
                user.username === username &&
                user.password === password
        );

    if (currentUser) {

        document
            .getElementById(
                "loginSection"
            )
            .classList.add("hidden");

        document
            .getElementById(
                "dashboard"
            )
            .classList.remove("hidden");

        document
            .getElementById(
                "userNameDisplay"
            )
            .textContent =
            currentUser.name;

        updateUI();

    } else {

        document
            .getElementById(
                "loginMessage"
            )
            .textContent =
            "ACCESS DENIED";
    }
}

function logout() {

    currentUser = null;

    document
        .getElementById(
            "dashboard"
        )
        .classList.add("hidden");

    document
        .getElementById(
            "loginSection"
        )
        .classList.remove("hidden");
}

function updateUI() {

    document
        .getElementById(
            "balance"
        )
        .textContent =
        formatMoney(
            currentUser.balance
        );

    const list =
        document.getElementById(
            "transactionList"
        );

    list.innerHTML = "";

    currentUser.transactions.forEach(
        transaction => {

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                transaction;

            list.appendChild(li);
        }
    );
}

function deposit() {

    const amount =
        parseFloat(
            document.getElementById(
                "amount"
            ).value
        );

    if (
        isNaN(amount) ||
        amount <= 0
    ) {
        return;
    }

    currentUser.balance += amount;

    currentUser.transactions.unshift(
        `🟢 Deposited ₹${formatMoney(amount)} | ${getTime()}`
    );

    saveData();
    updateUI();

    document.getElementById(
        "amount"
    ).value = "";
}

function showReasonBox() {

    const amount =
        parseFloat(
            document.getElementById(
                "amount"
            ).value
        );

    if (
        isNaN(amount) ||
        amount <= 0
    ) {
        alert("Enter a valid amount first.");
        return;
    }

    document
        .getElementById(
            "reasonBox"
        )
        .classList.remove("hidden");

    document
        .getElementById(
            "withdrawReason"
        )
        .focus();
}

function confirmWithdraw() {

    const amount =
        parseFloat(
            document.getElementById(
                "amount"
            ).value
        );

    const reason =
        document.getElementById(
            "withdrawReason"
        ).value.trim();

    if (
        isNaN(amount) ||
        amount <= 0
    ) {
        alert("Invalid amount.");
        return;
    }

    if (!reason) {
        alert(
            "Please enter a reason."
        );
        return;
    }

    if (
        amount >
        currentUser.balance
    ) {
        alert(
            "Insufficient Balance"
        );
        return;
    }

    currentUser.balance -= amount;

    currentUser.transactions.unshift(
        `🔴 Withdrawn ₹${formatMoney(amount)} | Reason: ${reason} | ${getTime()}`
    );

    saveData();
    updateUI();

    document.getElementById(
        "amount"
    ).value = "";

    document.getElementById(
        "withdrawReason"
    ).value = "";

    document
        .getElementById(
            "reasonBox"
        )
        .classList.add("hidden");
}