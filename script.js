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

// Function to check and display tie-breakers
function checkTieBreakers() {
    let standings = [...teams].sort((a, b) => b.wins - a.wins); // Sort teams by wins
    let tiedTeams = {};

    // Identify teams with identical win-loss records
    standings.forEach(team => {
        let key = `${team.wins}-${team.losses}`;
        if (!tiedTeams[key]) {
            tiedTeams[key] = [];
        }
        tiedTeams[key].push(team);
    });

    // Clear previous tie-breaker results
    document.getElementById("tieBreakerContainer").innerHTML = "";

    let tieBreakerResults = "<h3>Applied Tie-Breakers</h3><ul>";
    let tieOccurred = false;

    // Process each tie group
    Object.values(tiedTeams).forEach(group => {
        if (group.length > 1) {
            tieOccurred = true;
            let resolvedTies = resolveTies(group);
            tieBreakerResults += resolvedTies;
        }
    });

    tieBreakerResults += "</ul>";

    // Display results if a tie occurred
    if (tieOccurred) {
        document.getElementById("tieBreakerContainer").innerHTML = tieBreakerResults;
    }
}

// Function to resolve tie-breakers with correct priority
function resolveTies(tiedGroup) {
    let results = "";
    let headToHeadRecords = {};

    // Initialize head-to-head win counts
    tiedGroup.forEach(team => headToHeadRecords[team.name] = 0);

    // Count total head-to-head wins for all tied teams
    tiedGroup.forEach(teamA => {
        tiedGroup.forEach(teamB => {
            if (teamA.name !== teamB.name) {
                let winner = simulateHeadToHead(teamA, teamB);
                if (winner === teamA.name) {
                    headToHeadRecords[teamA.name]++;
                } else if (winner === teamB.name) {
                    headToHeadRecords[teamB.name]++;
                }
            }
        });
    });

    // Sort tied teams by total head-to-head wins
    let sortedByHeadToHead = [...tiedGroup].sort((a, b) => headToHeadRecords[b.name] - headToHeadRecords[a.name]);

    // If the top teams are still tied in head-to-head, use total points
    if (headToHeadRecords[sortedByHeadToHead[0].name] === headToHeadRecords[sortedByHeadToHead[1].name]) {
        sortedByHeadToHead.sort((a, b) => b.totalPoints - a.totalPoints);
    }

    // Display results
    sortedByHeadToHead.forEach((team, index) => {
        results += `<li>${index + 1}: ${team.name} (Head-to-Head Wins: ${headToHeadRecords[team.name]}, Total Points: ${team.totalPoints})</li>`;
    });

    return results;
}


// Function to simulate head-to-head results (Replace with actual match data if available)
function simulateHeadToHead(teamA, teamB) {
    // Example hardcoded head-to-head matchups
    let matchResults = {
        "Baton Rouge Cissies vs Pop's Prodigy": "Baton Rouge Cissies",
        "BIG EASYZ vs The Extra Ruscle": "BIG EASYZ",
        "P Giddey vs Ja Rules": "P Giddey"
        // Add more matchups if needed
    };

    let matchup1 = `${teamA.name} vs ${teamB.name}`;
    let matchup2 = `${teamB.name} vs ${teamA.name}`;

    if (matchResults[matchup1]) return matchResults[matchup1];
    if (matchResults[matchup2]) return matchResults[matchup2];

    return null; // No head-to-head result found, fallback to total points
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
    checkTieBreakers(); // Ensure this runs every time standings update
}

// Ensure tie-breakers run on final standings update
window.onload = function () {
    loadStandings();
    loadMatchups();
};
