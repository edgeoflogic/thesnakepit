// Initial standings (from your spreadsheet)
const originalTeams = [
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

let teams = JSON.parse(JSON.stringify(originalTeams)); // Clone original standings

// Matchups for Weeks 16-18
const matchups = {
    16: [
        { away: "Baton Rouge Cissies", home: "The Extra Ruscle" },
        { away: "Jimmy’s Buckets", home: "P Giddey" },
        { away: "Pop's Prodigy", home: "ChetGPT" },
        { away: "Once Brenno, Twice Shai", home: "BIG EASYZ" },
        { away: "Ja Rules", home: "DrakesNewFavouriteTeam" }
    ],
    17: [
        { away: "The Extra Ruscle", home: "Jimmy’s Buckets" },
        { away: "P Giddey", home: "Pop's Prodigy" },
        { away: "ChetGPT", home: "Once Brenno, Twice Shai" },
        { away: "BIG EASYZ", home: "Ja Rules" },
        { away: "DrakesNewFavouriteTeam", home: "Baton Rouge Cissies" }
    ],
    18: [
        { away: "Pop's Prodigy", home: "The Extra Ruscle" },
        { away: "Once Brenno, Twice Shai", home: "P Giddey" },
        { away: "Ja Rules", home: "ChetGPT" },
        { away: "Baton Rouge Cissies", home: "BIG EASYZ" },
        { away: "Jimmy’s Buckets", home: "DrakesNewFavouriteTeam" }
    ]
};

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

// Generate matchup inputs
function loadMatchups() {
    Object.keys(matchups).forEach(week => {
        let container = document.getElementById(`matchupsContainer${week}`);
        container.innerHTML = "";
        matchups[week].forEach((match, index) => {
            let div = document.createElement("div");
            div.classList.add("matchup");
            div.innerHTML = `
                <strong>${match.away} vs ${match.home}</strong><br>
                Winner: <select id="match${week}_${index}">
                    <option value="">Select</option>
                    <option value="${match.away}">${match.away}</option>
                    <option value="${match.home}">${match.home}</option>
                </select>
            `;
            container.appendChild(div);
        });
    });
}

// Update standings
function updateStandings(week) {
    document.getElementById(`updateButton${week}`).disabled = true;

    matchups[week].forEach((match, index) => {
        let winner = document.getElementById(`match${week}_${index}`).value;
        if (winner) {
            let team = teams.find(t => t.name === winner);
            team.wins += 1;
            let loser = teams.find(t => t.name !== winner && (t.name === match.away || t.name === match.home));
            loser.losses += 1;
        }
    });

    loadStandings();
}

// Reset standings to original
function resetStandings() {
    teams = JSON.parse(JSON.stringify(originalTeams));
    loadStandings();
}

// Function to check for and display tie-breakers
function checkTieBreakers() {
    let tiedTeams = [];
    let standings = [...teams].sort((a, b) => b.wins - a.wins);

    // Find teams with identical records
    for (let i = 0; i < standings.length - 1; i++) {
        if (standings[i].wins === standings[i + 1].wins) {
            tiedTeams.push(standings[i], standings[i + 1]);
        }
    }

    if (tiedTeams.length === 0) {
        document.getElementById("tieBreakerContainer").innerHTML = "";
        return; // No ties, so no need to display anything
    }

    // Tie-breaker logic
    let tieBreakerResults = "<h3>Applied Tie-Breakers</h3><ul>";
    let resolvedTies = [];

    for (let i = 0; i < tiedTeams.length; i += 2) {
        let teamA = tiedTeams[i];
        let teamB = tiedTeams[i + 1];

        // Simulate a head-to-head result (assuming we have the match data)
        let headToHeadWinner = simulateHeadToHead(teamA, teamB);
        
        if (headToHeadWinner) {
            tieBreakerResults += `<li>${headToHeadWinner} wins the tie-breaker over ${teamA.name === headToHeadWinner ? teamB.name : teamA.name} (Head-to-Head Result)</li>`;
            resolvedTies.push(teamA, teamB);
        } else {
            // Use total points as final tie-breaker
            let totalPointsWinner = teamA.totalPoints > teamB.totalPoints ? teamA.name : teamB.name;
            tieBreakerResults += `<li>${totalPointsWinner} wins the tie-breaker over ${teamA.name === totalPointsWinner ? teamB.name : teamA.name} (Total Points Scored)</li>`;
        }
    }

    tieBreakerResults += "</ul>";
    document.getElementById("tieBreakerContainer").innerHTML = tieBreakerResults;
}

// Simulate head-to-head results (Placeholder, replace with actual data)
function simulateHeadToHead(teamA, teamB) {
    // Assume we have head-to-head match records
    let matchResults = {
        "Baton Rouge Cissies vs Pop's Prodigy": "Baton Rouge Cissies",
        "BIG EASYZ vs The Extra Ruscle": "BIG EASYZ"
        // Add other actual results if available
    };

    let matchup1 = `${teamA.name} vs ${teamB.name}`;
    let matchup2 = `${teamB.name} vs ${teamA.name}`;

    if (matchResults[matchup1]) return matchResults[matchup1];
    if (matchResults[matchup2]) return matchResults[matchup2];

    return null; // No head-to-head result found
}

// Modify updateStandings function to include tie-breaker check
function updateStandings(week) {
    document.getElementById(`updateButton${week}`).disabled = true;

    matchups[week].forEach((match, index) => {
        let winner = document.getElementById(`match${week}_${index}`).value;
        if (winner) {
            let team = teams.find(t => t.name === winner);
            team.wins += 1;
            let loser = teams.find(t => t.name !== winner && (t.name === match.away || t.name === match.home));
            loser.losses += 1;
        }
    });

    loadStandings();
    checkTieBreakers(); // Check if tie-breakers are needed
}

// Ensure tie-breakers run on final standings update

window.onload = function () {
    loadStandings();
    loadMatchups();
};

window.onload = function () {
    loadStandings();
    loadMatchups();
};
