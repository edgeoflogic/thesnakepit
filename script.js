// Initial standings (from your spreadsheet)
let teams = [
    { name: "Baton Rouge Cissies", wins: 11, losses: 4, division: "East" },
    { name: "Pop's Prodigy", wins: 8, losses: 7, division: "East" },
    { name: "Once Brenno, Twice Shai", wins: 8, losses: 7, division: "East" },
    { name: "Jimmy’s Buckets", wins: 5, losses: 10, division: "East" },
    { name: "Ja Rules", wins: 5, losses: 10, division: "East" },
    { name: "BIG EASYZ", wins: 12, losses: 3, division: "West" },
    { name: "The Extra Ruscle", wins: 8, losses: 7, division: "West" },
    { name: "ChetGPT", wins: 9, losses: 6, division: "West" },
    { name: "DrakesNewFavouriteTeam", wins: 7, losses: 8, division: "West" },
    { name: "P Giddey", wins: 6, losses: 9, division: "West" }
];

// Matchups for Weeks 16, 17, and 18
let matchups = [
    // Week 16
    { week: 16, away: "Baton Rouge Cissies", home: "The Extra Ruscle" },
    { week: 16, away: "Jimmy’s Buckets", home: "P Giddey" },
    { week: 16, away: "Pop's Prodigy", home: "ChetGPT" },
    { week: 16, away: "Once Brenno, Twice Shai", home: "BIG EASYZ" },
    { week: 16, away: "Ja Rules", home: "DrakesNewFavouriteTeam" },

    // Week 17
    { week: 17, away: "The Extra Ruscle", home: "Jimmy’s Buckets" },
    { week: 17, away: "P Giddey", home: "Pop's Prodigy" },
    { week: 17, away: "ChetGPT", home: "Once Brenno, Twice Shai" },
    { week: 17, away: "BIG EASYZ", home: "Ja Rules" },
    { week: 17, away: "DrakesNewFavouriteTeam", home: "Baton Rouge Cissies" },

    // Week 18
    { week: 18, away: "Pop's Prodigy", home: "The Extra Ruscle" },
    { week: 18, away: "Once Brenno, Twice Shai", home: "P Giddey" },
    { week: 18, away: "Ja Rules", home: "ChetGPT" },
    { week: 18, away: "Baton Rouge Cissies", home: "BIG EASYZ" },
    { week: 18, away: "Jimmy’s Buckets", home: "DrakesNewFavouriteTeam" }
];

// Load standings into two separate tables
function loadStandings() {
    let eastTable = document.querySelector("#eastStandingsTable tbody");
    let westTable = document.querySelector("#westStandingsTable tbody");

    eastTable.innerHTML = "";
    westTable.innerHTML = "";

    let eastTeams = teams.filter(t => t.division === "East").sort((a, b) => b.wins - a.wins);
    let westTeams = teams.filter(t => t.division === "West").sort((a, b) => b.wins - a.wins);

    eastTeams.forEach((team, index) => {
        eastTable.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
        </tr>`;
    });

    westTeams.forEach((team, index) => {
        westTable.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${team.name}</td>
            <td>${team.wins}</td>
            <td>${team.losses}</td>
        </tr>`;
    });
}

// Generate matchup inputs for Weeks 16-18
function loadMatchups() {
    let container = document.getElementById("matchupsContainer");
    container.innerHTML = "";
    matchups.forEach((match, index) => {
        let div = document.createElement("div");
        div.classList.add("matchup");
        div.innerHTML = `
            <strong>Week ${match.week}: ${match.away} vs ${match.home}</strong><br>
            Winner: <select id="match${index}">
                <option value="">Select</option>
                <option value="${match.away}">${match.away}</option>
                <option value="${match.home}">${match.home}</option>
            </select>
        `;
        container.appendChild(div);
    });
}

// Update standings based on input
function calculateStandings() {
    let selectedWinners = matchups.map((match, index) => {
        return document.getElementById(`match${index}`).value;
    });

    selectedWinners.forEach((winner) => {
        if (winner) {
            let team = teams.find(t => t.name === winner);
            team.wins += 1;
            let loser = matchups.find(m => m.away === winner || m.home === winner);
            let losingTeam = teams.find(t => t.name === (loser.away === winner ? loser.home : loser.away));
            losingTeam.losses += 1;
        }
    });

    loadStandings();
    updatePlayoffBracket();
}

// Determine the 4 playoff teams
function updatePlayoffBracket() {
    let eastWinner = teams.filter(t => t.division === "East").sort((a, b) => b.wins - a.wins)[0];
    let westWinner = teams.filter(t => t.division === "West").sort((a, b) => b.wins - a.wins)[0];

    let wildcards = teams
        .filter(t => t !== eastWinner && t !== westWinner)
        .sort((a, b) => b.wins - a.wins)
        .slice(0, 2);

    let playoffs = [eastWinner, westWinner, ...wildcards];

    let bracketList = document.getElementById("bracketList");
    bracketList.innerHTML = "";
    playoffs.forEach((team, index) => {
        let li = `<li>#${index + 1}: ${team.name} (${team.wins} - ${team.losses})</li>`;
        bracketList.innerHTML += li;
    });
}

// Load everything on startup
window.onload = function () {
    loadStandings();
    loadMatchups();
};
