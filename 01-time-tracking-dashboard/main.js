let currentPeriod = "weekly";

window.onload = async () => {
    console.log("onload");
    document.querySelectorAll(".period-select").forEach(element => {
        element.addEventListener("click", event => {
            updateContent(event.target.dataset.period, currentPeriod);
        })
    });

    await loadData();
}


function updateContent(newPeriod, previousPeriod) {
    console.log("updateContent " + newPeriod);
    if (newPeriod != previousPeriod) {
        document.querySelectorAll("." + newPeriod).forEach(e => e.style.display = "block");
        document.querySelectorAll("." + previousPeriod).forEach(e => e.style.display = "none");
        document.getElementById(newPeriod).classList.add("active");
        document.getElementById(previousPeriod).classList.remove("active");

        currentPeriod = newPeriod;
    }
}

async function loadData() {
    let result = await fetch("data.json");
    let json = await result.json();
    console.log(json);
    let cardContainer = document.getElementById("cards-container");
    json.forEach(e => {
        let newCard = document.createElement("div");
        newCard.innerHTML = `
                <div class="card ${getClassName(e.title)}">
                <div class="card-icon">
                    <img src="images/icon-${getClassName(e.title)}.svg" alt="">
                </div>
                <div class="card-content">
                    <div class="card-title">
                        <span>${e.title}</span>
                        <span><img src="images/icon-ellipsis.svg" alt=""></span>
                    </div>

                <div class="card-body daily" style="display: none;">
                    <div class="hours">
                        ${e.timeframes.daily.current}hrs
                    </div>
                    <div class="previous-period">
                        Yesterday - ${e.timeframes.daily.previous}hrs
                    </div>
                </div>

                <div class="card-body weekly">
                    <div class="hours">
                        ${e.timeframes.weekly.current}hrs
                    </div>
                    <div class="previous-period">
                        Last week - ${e.timeframes.weekly.previous}rs
                    </div>
                </div>

                <div class="card-body monthly" style="display: none;">
                    <div class="hours">
                        ${e.timeframes.monthly.current}hrs
                    </div>
                    <div class="previous-period">
                        Last month - ${e.timeframes.monthly.previous}rs
                    </div>
                </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(newCard);
    })
}


function getClassName(cardTitle) {
    return cardTitle.replace(/\s+/g, '-').toLowerCase();
}