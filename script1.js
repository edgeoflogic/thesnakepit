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

// ✅ PLACE THIS NEAR THE TOP OF `script.js` BEFORE FUNCTIONS
const headToHeadResults = {
    "The Extra Ruscle vs Once Brenno, Twice Shai": "Once Brenno, Twice Shai",
        "Ja Rules vs Pop's Prodigy": "Pop's Prodigy",
        "P Giddey vs DrakesNewFavouriteTeam": "DrakesNewFavouriteTeam",
        "Baton Rouge Cissies vs Jimmy’s Buckets": "Baton Rouge Cissies",
        "ChetGPT vs BIG EASYZ": "ChetGPT",
        "P Giddey vs Ja Rules": "P Giddey",
        "Once Brenno, Twice Shai vs Baton Rouge Cissies": "Baton Rouge Cissies",
        "The Extra Ruscle vs ChetGPT": "The Extra Ruscle",
        "Pop's Prodigy vs Jimmy’s Buckets": "Pop's Prodigy",
        "DrakesNewFavouriteTeam vs BIG EASYZ": "BIG EASYZ",
        "ChetGPT vs Baton Rouge Cissies": "Baton Rouge Cissies",
        "Jimmy’s Buckets vs Ja Rules": "Jimmy’s Buckets",
        "BIG EASYZ vs P Giddey": "BIG EASYZ",
        "Pop's Prodigy vs Once Brenno, Twice Shai": "Once Brenno, Twice Shai",
        "DrakesNewFavouriteTeam vs The Extra Ruscle": "The Extra Ruscle",
        "BIG EASYZ vs Jimmy’s Buckets": "BIG EASYZ",
        "Baton Rouge Cissies vs Pop's Prodigy": "Baton Rouge Cissies",
        "ChetGPT vs DrakesNewFavouriteTeam": "DrakesNewFavouriteTeam",
        "Ja Rules vs Once Brenno, Twice Shai": "Once Brenno, Twice Shai",
        "P Giddey vs The Extra Ruscle": "The Extra Ruscle",
        "DrakesNewFavouriteTeam vs Pop's Prodigy": "Pop's Prodigy",
        "Once Brenno, Twice Shai vs Jimmy’s Buckets": "Once Brenno, Twice Shai",
        "The Extra Ruscle vs BIG EASYZ": "BIG EASYZ",
        "Ja Rules vs Baton Rouge Cissies": "Baton Rouge Cissies",
        "P Giddey vs ChetGPT": "ChetGPT",
        "Ja Rules vs The Extra Ruscle": "The Extra Ruscle",
        "Baton Rouge Cissies vs P Giddey": "Baton Rouge Cissies",
        "Jimmy’s Buckets vs ChetGPT": "ChetGPT",
        "Pop's Prodigy vs BIG EASYZ": "BIG EASYZ",
        "Once Brenno, Twice Shai vs DrakesNewFavouriteTeam": "Once Brenno, Twice Shai",
        "The Extra Ruscle vs Baton Rouge Cissies": "The Extra Ruscle",
        "P Giddey vs Jimmy’s Buckets": "Jimmy’s Buckets",
        "ChetGPT vs Pop's Prodigy": "Pop's Prodigy",
        "BIG EASYZ vs Once Brenno, Twice Shai": "BIG EASYZ",
        "DrakesNewFavouriteTeam vs Ja Rules": "Ja Rules",
        "Jimmy’s Buckets vs The Extra Ruscle": "Jimmy’s Buckets",
        "Pop's Prodigy vs P Giddey": "P Giddey",
        "Once Brenno, Twice Shai vs ChetGPT": "ChetGPT",
        "Ja Rules vs BIG EASYZ": "BIG EASYZ",
        "Baton Rouge Cissies vs DrakesNewFavouriteTeam": "DrakesNewFavouriteTeam",
        "The Extra Ruscle vs Pop's Prodigy": "The Extra Ruscle",
        "Jimmy’s Buckets vs Once Brenno, Twice Shai": "Once Brenno, Twice Shai",
        "DrakesNewFavouriteTeam vs P Giddey": "P Giddey",
        "Baton Rouge Cissies vs Ja Rules": "Baton Rouge Cissies",
        "BIG EASYZ vs ChetGPT": "ChetGPT",
        "P Giddey vs Once Brenno, Twice Shai": "P Giddey",
        "Pop's Prodigy vs Ja Rules": "Pop's Prodigy",
        "ChetGPT vs The Extra Ruscle": "ChetGPT",
        "Jimmy’s Buckets vs Baton Rouge Cissies": "Baton Rouge Cissies",
        "BIG EASYZ vs DrakesNewFavouriteTeam": "DrakesNewFavouriteTeam",
        "ChetGPT vs Ja Rules": "Ja Rules",
        "Baton Rouge Cissies vs Once Brenno, Twice Shai": "Baton Rouge Cissies",
        "P Giddey vs BIG EASYZ": "BIG EASYZ",
        "Jimmy’s Buckets vs Pop's Prodigy": "Jimmy’s Buckets",
        "The Extra Ruscle vs DrakesNewFavouriteTeam": "The Extra Ruscle",
        "BIG EASYZ vs Baton Rouge Cissies": "BIG EASYZ",
        "Ja Rules vs Jimmy’s Buckets": "Jimmy’s Buckets",
        "DrakesNewFavouriteTeam vs ChetGPT": "ChetGPT",
        "Once Brenno, Twice Shai vs Pop's Prodigy": "Pop's Prodigy",
        "The Extra Ruscle vs P Giddey": "The Extra Ruscle",
        "DrakesNewFavouriteTeam vs Jimmy’s Buckets": "DrakesNewFavouriteTeam",
        "Pop's Prodigy vs Baton Rouge Cissies": "Pop's Prodigy",
        "BIG EASYZ vs The Extra Ruscle": "BIG EASYZ",
        "Once Brenno, Twice Shai vs Ja Rules": "Ja Rules",
        "ChetGPT vs P Giddey": "ChetGPT",
        "Once Brenno, Twice Shai vs The Extra Ruscle": "Once Brenno, Twice Shai",
        "Ja Rules vs P Giddey": "Ja Rules",
        "Baton Rouge Cissies vs ChetGPT": "Baton Rouge Cissies",
        "Jimmy’s Buckets vs BIG EASYZ": "BIG EASYZ",
        "Pop's Prodigy vs DrakesNewFavouriteTeam": "Pop's Prodigy",
        "The Extra Ruscle vs Ja Rules": "Ja Rules",
        "P Giddey vs Baton Rouge Cissies": "Baton Rouge Cissies",
        "ChetGPT vs Jimmy’s Buckets": "ChetGPT",
        "BIG EASYZ vs Pop's Prodigy": "BIG EASYZ",
        "DrakesNewFavouriteTeam vs Once Brenno, Twice Shai": "Once Brenno, Twice Shai"

    };

    
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
                <br><br> 
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

// Store user-entered match results for Weeks 16-18
let userResults = {};

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
    let tieBreakerContainer = document.getElementById("tieBreakerContainer");
    tieBreakerContainer.innerHTML = "";

    let tieOccurred = false;
    let tieBreakerResults = "<h3>🏆 Applied Tie-Breakers</h3>";

    // Process each tie group
    Object.entries(tiedTeams).forEach(([record, group]) => {
        if (group.length > 1) {
            tieOccurred = true;
            tieBreakerResults += `<h4>Teams Tied at ${record} (W-L)</h4><ul>`;
            let resolvedTies = resolveTies(group);
            tieBreakerResults += resolvedTies + "</ul>";
        }
    });

    // Display results if a tie occurred
    if (tieOccurred) {
        tieBreakerContainer.innerHTML = tieBreakerResults;
    } else {
        tieBreakerContainer.innerHTML = "<p>No tie-breakers were needed.</p>";
    }
}

// Function to resolve tie-breakers (Head-to-Head → Total Points)
function resolveTies(tiedGroup) {
    let results = "";
    let headToHeadRecords = {};

    // ✅ Initialize win counts at 0 for all tied teams
    tiedGroup.forEach(team => headToHeadRecords[team.name] = 0);

    // ✅ Count total head-to-head wins for all tied teams
    tiedGroup.forEach(teamA => {
        tiedGroup.forEach(teamB => {
            if (teamA.name !== teamB.name) {
                let winner = simulateHeadToHead(teamA, teamB);
                if (winner) {
                    headToHeadRecords[winner]++; // Add 1 win for the winner
                }
            }
        });
    });

    console.log("🔢 Updated Head-to-Head Wins:", headToHeadRecords);

    // ✅ Sort teams based on head-to-head wins
    let sortedByHeadToHead = [...tiedGroup].sort((a, b) => headToHeadRecords[b.name] - headToHeadRecords[a.name]);

    // ✅ If still tied in head-to-head, use total points as the final tie-breaker
    if (sortedByHeadToHead.length > 1 &&
        headToHeadRecords[sortedByHeadToHead[0].name] === headToHeadRecords[sortedByHeadToHead[1].name]) {
        sortedByHeadToHead.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    }

    // ✅ Display correct ranking format
    sortedByHeadToHead.forEach((team, index) => {
        results += `<li><strong>${index + 1}. ${team.name}</strong> 
                    <br>🏆 Head-to-Head Wins: <strong>${headToHeadRecords[team.name]}</strong> 
                    <br>🔢 Total Points: <strong>${team.totalPoints !== undefined ? team.totalPoints : 'N/A'}</strong></li>`;
    });

    return results;
}

// ✅ Ensure `headToHeadResults` is defined BEFORE this function
function simulateHeadToHead(teamA, teamB) {
    let matchup1 = `${teamA.name} vs ${teamB.name}`;
    let matchup2 = `${teamB.name} vs ${teamA.name}`;

    console.log(`🔎 Checking head-to-head: ${matchup1} OR ${matchup2}`);

    let wins = { [teamA.name]: 0, [teamB.name]: 0 };

    // ✅ Check user-entered results first
    if (userResults[matchup1]) {
        wins[userResults[matchup1]]++;
        console.log(`✅ User input found: ${matchup1} → Winner: ${userResults[matchup1]}`);
    }
    if (userResults[matchup2]) {
        wins[userResults[matchup2]]++;
        console.log(`✅ User input found: ${matchup2} → Winner: ${userResults[matchup2]}`);
    }

    // ✅ Check predefined head-to-head results
    if (headToHeadResults[matchup1]) {
        wins[headToHeadResults[matchup1]]++;
        console.log(`📊 Predefined result: ${matchup1} → Winner: ${headToHeadResults[matchup1]}`);
    }
    if (headToHeadResults[matchup2]) {
        wins[headToHeadResults[matchup2]]++;
        console.log(`📊 Predefined result: ${matchup2} → Winner: ${headToHeadResults[matchup2]}`);
    }

    console.log(`🔢 Updated Head-to-Head Wins: ${teamA.name} = ${wins[teamA.name]}, ${teamB.name} = ${wins[teamB.name]}`);

    // ✅ Return the team with the most wins in head-to-head
    if (wins[teamA.name] > wins[teamB.name]) {
        return teamA.name;
    } else if (wins[teamB.name] > wins[teamA.name]) {
        return teamB.name;
    } else {
        return null; // Tied head-to-head
    }
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

    let tieBreakerContainer = document.getElementById("tieBreakerContainer");
    tieBreakerContainer.innerHTML = ""; // Clear previous results

    let tieBreakerResults = "<h3>🏆 Applied Tie-Breakers</h3>";

    let tieOccurred = false;

    // Process each tie group
    Object.entries(tiedTeams).forEach(([record, group]) => {
        if (group.length > 1) {
            tieOccurred = true;
            tieBreakerResults += `<h4>🔄 Teams Tied at ${record} (W-L)</h4><ul>`;

            let resolvedTies = resolveTies(group);
            tieBreakerResults += resolvedTies + "</ul><hr>"; // Add a horizontal line between cases
        }
    });

    // ✅ Ensure results update dynamically
    tieBreakerContainer.innerHTML = tieOccurred ? tieBreakerResults : "<p>No tie-breakers were needed.</p>";
}


// Function to resolve tie-breakers (Head-to-Head → Total Points)
function resolveTies(tiedGroup) {
    let results = "";
    let headToHeadRecords = {};

    // ✅ Initialize head-to-head win counts at 0 for all tied teams
    tiedGroup.forEach(team => headToHeadRecords[team.name] = 0);

    // ✅ Count total head-to-head wins for all tied teams
    tiedGroup.forEach(teamA => {
        tiedGroup.forEach(teamB => {
            if (teamA.name !== teamB.name) {
                let winner = simulateHeadToHead(teamA, teamB);
                if (winner) {
                    headToHeadRecords[winner] += 1; // ✅ Ensure we increment correctly
                }
            }
        });
    });

    console.log("🔢 Final Head-to-Head Wins Before Sorting:", JSON.stringify(headToHeadRecords));

    // ✅ Sort teams based on head-to-head wins
    let sortedByHeadToHead = [...tiedGroup].sort((a, b) => headToHeadRecords[b.name] - headToHeadRecords[a.name]);

    // ✅ If still tied in head-to-head, use total points as the final tie-breaker
    if (sortedByHeadToHead.length > 1 &&
        headToHeadRecords[sortedByHeadToHead[0].name] === headToHeadRecords[sortedByHeadToHead[1].name]) {
        sortedByHeadToHead.sort((a, b) => (b.totalPoints || 0) - (a.totalPoints || 0));
    }

    // ✅ Display results properly
    sortedByHeadToHead.forEach((team, index) => {
        results += `<li><strong>${index + 1}. ${team.name}</strong> 
                    <br>🏆 Head-to-Head Wins: <strong>${headToHeadRecords[team.name]}</strong> 
                    <br>🔢 Total Points: <strong>${team.totalPoints !== undefined ? team.totalPoints : 'N/A'}</strong></li>`;
    });

    return results;
}


function updateStandings(week) {
    let button = document.getElementById(`updateButton${week}`);
    button.disabled = true;

    matchups[week].forEach((match, index) => {
        let winner = document.getElementById(`match${week}_${index}`).value;
        if (winner) {
            let team = teams.find(t => t.name === winner);
            team.wins += 1;
            let loser = teams.find(t => t.name !== winner && (t.name === match.away || t.name === match.home));
            loser.losses += 1;

            // Store user-inputted results for tie-breakers
            let matchupKey = `${match.away} vs ${match.home}`;
            userResults[matchupKey] = winner;
        }
    });

    loadStandings();
    checkTieBreakers(); // 🔥 **Ensure tie-breakers display after update**

    setTimeout(() => {
        button.disabled = false;
    }, 2000);
}

function resetStandings() {
    teams = JSON.parse(JSON.stringify(originalTeams)); // Reset data
    loadStandings();

    // ✅ Re-enable all "Update Standings" buttons
    Object.keys(matchups).forEach(week => {
        let button = document.getElementById(`updateButton${week}`);
        if (button) button.disabled = false;
    });

    // ✅ Clear all dropdown selections
    Object.keys(matchups).forEach(week => {
        matchups[week].forEach((match, index) => {
            let selectElement = document.getElementById(`match${week}_${index}`);
            if (selectElement) selectElement.value = "";
        });
    });

    // ✅ Clear user-selected results
    userResults = {};

    // ✅ Clear tie-breaker results if needed
    document.getElementById("tieBreakerContainer").innerHTML = "";
}

// Ensure tie-breakers run on final standings update
window.onload = function () {
    loadStandings();
    loadMatchups();
};
