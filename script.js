let currentPage = 1;
let currentSort = 'kills';
let pageSize = 10;

// Add loading styles at the top of the file
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    /* Smooth page transitions */
    .container {
        opacity: 0;
        animation: fadeInPage 0.6s ease-out forwards;
    }

    @keyframes fadeInPage {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Button hover effects */
    .minecraft-button {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .minecraft-button:hover {
        transform: translateY(-2px);
    }

    .minecraft-button:active {
        transform: translateY(1px);
    }

    /* Card hover effects */
    .stat-card {
        transition: all 0.3s ease;
    }

    .stat-card:hover {
        transform: translateY(-3px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    /* Loading animations */
    .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 200px;
    }

    .loading-pokeball {
        width: 50px;
        height: 50px;
        background-image: url('pokeball.png');
        background-size: contain;
        background-repeat: no-repeat;
        animation: rotate 1s linear infinite;
    }

    @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .loading-text {
        margin-top: 15px;
        color: #fff;
        font-family: 'Minecraft', sans-serif;
        animation: pulse 1.5s ease-in-out infinite;
    }

    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }

    /* Container animations */
    @keyframes expandContainer {
        from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
            max-height: 0;
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
            max-height: 2000px;
        }
    }

    /* Item animations */
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .leaderboard-list {
        animation: expandContainer 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        overflow: hidden;
    }

    .leaderboard-item {
        opacity: 0;
        animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        transition: all 0.3s ease;
    }

    .leaderboard-item:hover {
        transform: translateX(5px);
        background: rgba(255, 255, 255, 0.1);
    }

    /* Smoother sequential delays */
    .leaderboard-item:nth-child(1) { animation-delay: 0.3s; }
    .leaderboard-item:nth-child(2) { animation-delay: 0.35s; }
    .leaderboard-item:nth-child(3) { animation-delay: 0.4s; }
    .leaderboard-item:nth-child(4) { animation-delay: 0.45s; }
    .leaderboard-item:nth-child(5) { animation-delay: 0.5s; }
    .leaderboard-item:nth-child(6) { animation-delay: 0.55s; }
    .leaderboard-item:nth-child(7) { animation-delay: 0.6s; }
    .leaderboard-item:nth-child(8) { animation-delay: 0.65s; }
    .leaderboard-item:nth-child(9) { animation-delay: 0.7s; }
    .leaderboard-item:nth-child(10) { animation-delay: 0.75s; }

    /* Ensure smooth animation for containers */
    .stat-card {
        animation: expandContainer 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        overflow: hidden;
    }

    /* Smooth mode transitions */
    body, 
    body.dark-mode,
    body:not(.dark-mode) {
        transition: background-color 0.5s ease, color 0.5s ease;
    }

    /* Disable animations for background elements */
    .background-pokeballs {
        animation: none !important;
        transform: none !important;
    }

    /* Select and input animations */
    .minecraft-select,
    input[type="text"] {
        transition: all 0.3s ease;
    }

    .minecraft-select:hover,
    input[type="text"]:hover {
        transform: translateY(-1px);
    }

    .minecraft-select:focus,
    input[type="text"]:focus {
        transform: translateY(-1px);
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(loadingStyle);

// Add font and responsive text styles
const textStyle = document.createElement('style');
textStyle.textContent = `
    /* Import Minecraft font */
    @font-face {
        font-family: 'Minecraft';
        src: url('https://cdn.jsdelivr.net/gh/South-Paw/typeface-minecraft@master/font/minecraft.woff2') format('woff2'),
             url('https://cdn.jsdelivr.net/gh/South-Paw/typeface-minecraft@master/font/minecraft.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    /* Base font styles */
    body, button, input, select {
        font-family: 'Minecraft', monospace !important;
        -webkit-font-smoothing: none !important;
        -moz-osx-font-smoothing: unset !important;
        text-shadow: 1px 1px 0px rgba(0,0,0,0.2);
    }

    /* Consistent text sizes across devices */
    .leaderboard-item {
        font-size: 16px !important;
        letter-spacing: 0.5px !important;
    }

    .leaderboard-rank {
        font-size: 16px !important;
    }

    .leaderboard-player, .leaderboard-name {
        font-size: 16px !important;
    }

    .leaderboard-stats {
        font-size: 16px !important;
    }

    .leaderboard-stat {
        font-size: 16px !important;
    }

    .stat-label, .stat-value {
        font-size: 16px !important;
    }

    h1, h2, h3 {
        font-weight: normal !important;
        text-shadow: 2px 2px 0px rgba(0,0,0,0.2);
        font-size: 20px !important;
    }

    /* Ensure consistent button text */
    .minecraft-button {
        font-size: 16px !important;
        letter-spacing: 0.5px !important;
    }

    /* Ensure consistent select text */
    .minecraft-select {
        font-size: 16px !important;
        letter-spacing: 0.5px !important;
    }

    /* Ensure footer text consistency */
    .footer {
        font-size: 14px !important;
        letter-spacing: 0.5px !important;
    }

    /* Remove any responsive font-size changes */
    @media (max-width: 768px) {
        .leaderboard-item,
        .leaderboard-rank,
        .leaderboard-player,
        .leaderboard-name,
        .leaderboard-stats,
        .leaderboard-stat,
        .stat-label,
        .stat-value,
        .minecraft-button,
        .minecraft-select {
            font-size: 16px !important;
        }
    }
`;
document.head.appendChild(textStyle);

async function fetchPlayerName(uuid) {
    try {
        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${uuid}`);
        const data = await response.json();
        return data.username;
    } catch (error) {
        console.error('Error fetching player name:', error);
        return uuid.slice(0, 8); // Return first 8 characters of UUID if name fetch fails
    }
}

async function fetchLeaderboard() {
    const leaderboard = document.querySelector('.leaderboard-list');
    leaderboard.innerHTML = `
        <div class="loading-container">
            <div class="loading-pokeball"></div>
            <div class="loading-text">Loading leaderboard...</div>
        </div>
    `;

    try {
        // Calculate offset based on current page and page size
        const offset = (currentPage - 1) * pageSize;
        
        // Fetch all data first
        const response = await fetch(`https://api.hglabor.de/stats/FFA/top?sort=${currentSort}`);
        const allData = await response.json();
        
        // Manually slice the data based on offset and pageSize
        const pageData = allData.slice(offset, offset + pageSize);
        
        const leaderboardList = document.querySelector('.leaderboard-list');
        leaderboardList.innerHTML = '';
        
        for (let i = 0; i < pageData.length; i++) {
            const player = pageData[i];
            const position = offset + i + 1;
            
            // Fetch player name
            let playerName;
            try {
                const nameResponse = await fetch(`https://api.ashcon.app/mojang/v2/user/${player.playerId}`);
                const nameData = await nameResponse.json();
                playerName = nameData.username;
            } catch (error) {
                console.error('Error fetching player name:', error);
                playerName = player.playerId.slice(0, 8);
            }
            
            const li = document.createElement('li');
            li.className = 'leaderboard-item';
            
            li.dataset.playerId = player.playerId;
            li.dataset.playerName = playerName;

            const statsItems = [
                { key: 'kills', label: 'kills', value: player.kills },
                { key: 'deaths', label: 'deaths', value: player.deaths },
                { key: 'highestKillStreak', label: 'Highest Streak', value: player.highestKillStreak },
                { key: 'xp', label: 'XP', value: player.xp },
                { key: 'currentKillStreak', label: 'Current Streak', value: player.currentKillStreak }
            ];

            statsItems.sort((a, b) => {
                if (a.key === currentSort) return -1;
                if (b.key === currentSort) return 1;
                return 0;
            });

            const statsHTML = statsItems.map(stat => {
                const className = `leaderboard-stat ${stat.key === currentSort ? 'highlighted' : ''}`;
                return `<span class="${className}">${stat.value} ${stat.label}</span>`;
            }).join('');

            li.innerHTML = `
                <span class="leaderboard-rank">#${position}</span>
                <span class="leaderboard-player">${playerName}</span>
                <span class="leaderboard-stats">
                    ${statsHTML}
                </span>
            `;
            leaderboardList.appendChild(li);
        }

        // Update pagination buttons
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('page-display').textContent = `Page ${currentPage}`;
        document.getElementById('next-page').disabled = offset + pageSize >= allData.length;

        setupPlayerClickHandlers();

    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        const leaderboardList = document.querySelector('.leaderboard-list');
        leaderboardList.innerHTML = '<li class="leaderboard-item error">Error loading leaderboard</li>';
    }
}

function setupPlayerClickHandlers() {
    const playerItems = document.querySelectorAll('.leaderboard-item');
    playerItems.forEach(item => {
        item.addEventListener('click', async () => {
            const playerId = item.dataset.playerId;
            const playerName = item.dataset.playerName;
            if (playerId) {
                try {
                    const response = await fetch(`https://api.hglabor.de/stats/FFA/${playerId}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    await showPlayerDetails(playerId, playerName, data);
                } catch (error) {
                    console.error('Error fetching player stats:', error);
                }
            }
        });
    });
}

async function showPlayerDetails(playerId, playerName, playerData) {
    try {
        const playerDetails = document.querySelector('.player-details') || createPlayerDetailsSection();
        document.querySelector('.leaderboard').style.display = 'none';
        playerDetails.style.display = 'block';
        
        // Show loading state first
        playerDetails.innerHTML = `
            <div class="loading-container">
                <div class="loading-pokeball"></div>
                <div class="loading-text">Loading player details...</div>
            </div>
        `;

        // Fetch neighbors data
        const neighborsData = await fetchPlayerNeighbors(playerId);
        
        // After data is loaded, show the full profile
        playerDetails.innerHTML = `
            <div class="player-header">
                <button class="minecraft-button back-button">← Back to Leaderboard</button>
                <h2 class="player-name">${playerName}</h2>
            </div>
            
            <div class="profile-content">
                <div class="stats-section">
                    <div class="stat-cards">
                        <div class="stat-card">
                            <h3>Combat Stats</h3>
                            <div class="stat-item">
                                <span class="stat-label">Kills:</span>
                                <span class="stat-value">${playerData.kills ?? 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Deaths:</span>
                                <span class="stat-value">${playerData.deaths ?? 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">K/D Ratio:</span>
                                <span class="stat-value">${((playerData.kills ?? 0) / (playerData.deaths || 1)).toFixed(2)}</span>
                            </div>
                        </div>

                        <div class="stat-card">
                            <h3>Achievements</h3>
                            <div class="stat-item">
                                <span class="stat-label">XP:</span>
                                <span class="stat-value">${playerData.xp ?? 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Highest Streak:</span>
                                <span class="stat-value">${playerData.highestKillStreak ?? 0}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Current Streak:</span>
                                <span class="stat-value">${playerData.currentKillStreak ?? 0}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mini-leaderboard">
                    <h3>Leaderboard Position</h3>
                    <div class="loading-container" id="neighbors-loading">
                        <div class="loading-pokeball"></div>
                        <div class="loading-text">Loading neighbors...</div>
                    </div>
                    <ul class="leaderboard-list neighbor-list" style="display: none;">
                        ${neighborsData.neighbors.map(player => `
                            <li class="leaderboard-item ${player.playerId === playerId ? 'current-player' : 'neighbor-item'}" 
                                data-player-id="${player.playerId}" 
                                data-player-name="${player.name}">
                                <span class="leaderboard-rank">#${player.rank}</span>
                                <span class="leaderboard-player">${player.name}</span>
                                <span class="leaderboard-stats">
                                    <span class="leaderboard-stat">Kills: ${player.kills}</span>
                                    <span class="leaderboard-stat">Deaths: ${player.deaths}</span>
                                    <span class="leaderboard-stat">XP: ${player.xp}</span>
                                </span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>

            <div class="hero-stats-section">
                <button class="minecraft-button toggle-hero-stats">
                    Show Hero Stats
                    <span class="arrow-icon">▼</span>
                </button>

                <div class="hero-stats-container" style="display: none;">
                    <div class="stat-card hero-stats">
                        <h3>Hero Stats</h3>
                        ${generateHeroStats(playerData.heroes)}
                    </div>
                </div>
            </div>
        `;

        // Show neighbors after loading
        document.querySelector('.neighbor-list').style.display = 'block';
        document.getElementById('neighbors-loading').style.display = 'none';

        // Add styles for the new layout
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .profile-content {
                padding: 20px;
            }

            .stat-cards {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-top: 20px;
            }

            .stat-card {
                padding: 20px;
                border-radius: 8px;
                border: 2px solid #ccc;
                background: rgba(255, 255, 255, 0.05);
            }

            body:not(.dark-mode) .stat-card {
                background: white;
                border-color: #ddd;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .leaderboard-card {
                grid-column: span 1;
            }

            .neighbor-list {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            .neighbor-list .leaderboard-item {
                padding: 10px;
                margin: 5px 0;
                border: 1px solid #ddd;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.03);
                transition: all 0.3s ease;
            }

            body:not(.dark-mode) .neighbor-list .leaderboard-item {
                background: #f5f5f5;
                border-color: #e0e0e0;
            }

            .neighbor-list .leaderboard-item.current-player {
                background: rgba(255, 215, 0, 0.1);
                border-color: rgba(255, 215, 0, 0.3);
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.1);
            }

            body:not(.dark-mode) .neighbor-list .leaderboard-item.current-player {
                background: rgba(255, 215, 0, 0.15);
                border-color: rgba(255, 215, 0, 0.4);
                box-shadow: 0 0 10px rgba(255, 215, 0, 0.2);
            }

            .neighbor-list .leaderboard-item:hover {
                background: rgba(255, 255, 255, 0.08);
                transform: translateY(-1px);
            }

            body:not(.dark-mode) .neighbor-list .leaderboard-item:hover {
                background: #ffffff;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .neighbor-list .leaderboard-stats {
                display: flex;
                gap: 10px;
                font-size: 0.9em;
                margin-top: 5px;
            }

            .neighbor-list .leaderboard-stat {
                background: rgba(255, 255, 255, 0.05);
                padding: 2px 6px;
                border-radius: 3px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            body:not(.dark-mode) .neighbor-list .leaderboard-stat {
                background: #eee;
                border-color: #ddd;
            }

            .not-ranked-message {
                padding: 15px;
                text-align: center;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 4px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            body:not(.dark-mode) .not-ranked-message {
                background: #f5f5f5;
                border-color: #ddd;
            }
        `;
        document.head.appendChild(styleElement);

        // Add click handlers for neighbor items
        const neighborItems = playerDetails.querySelectorAll('.neighbor-item');
        neighborItems.forEach(item => {
            item.addEventListener('click', async () => {
                const neighborId = item.dataset.playerId;
                const neighborName = item.dataset.playerName;
                if (neighborId) {
                    try {
                        const response = await fetch(`https://api.hglabor.de/stats/FFA/${neighborId}`);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();
                        await showPlayerDetails(neighborId, neighborName, data);
                    } catch (error) {
                        console.error('Error fetching neighbor stats:', error);
                    }
                }
            });
        });

        // Add existing handlers
        playerDetails.querySelector('.back-button').addEventListener('click', () => {
            playerDetails.style.display = 'none';
            document.querySelector('.leaderboard').style.display = 'block';
        });

        const toggleButton = playerDetails.querySelector('.toggle-hero-stats');
        const heroStatsContainer = playerDetails.querySelector('.hero-stats-container');
        const arrowIcon = toggleButton.querySelector('.arrow-icon');
        
        toggleButton.addEventListener('click', () => {
            const isHidden = heroStatsContainer.style.display === 'none';
            heroStatsContainer.style.display = isHidden ? 'block' : 'none';
            toggleButton.querySelector('.arrow-icon').textContent = isHidden ? '▲' : '▼';
            toggleButton.textContent = isHidden ? 'Hide Hero Stats ' : 'Show Hero Stats ';
            toggleButton.appendChild(arrowIcon);
        });

    } catch (error) {
        console.error('Error displaying player details:', error);
        const playerDetails = document.querySelector('.player-details') || createPlayerDetailsSection();
        playerDetails.innerHTML = `
            <div class="error-container">
                <img src="transparent-gifs-i-made-from-the-pokémon-anime-for-an-v0-1wxi2yjtxb7a1.gif" 
                     alt="Sad Pikachu" 
                     class="error-pikachu">
                <div class="error-message">
                    <h3>Player not found</h3>
                    <p>Could not find player: "${playerName}"</p>
                    <p class="error-details">Please check if the player name is correct and try again.</p>
                </div>
                <button class="minecraft-button back-button">← Back to Leaderboard</button>
            </div>
        `;

        // Add styles for the error display
        const errorStyle = document.createElement('style');
        errorStyle.textContent = `
            .error-container {
                text-align: center;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 400px;
            }

            .error-pikachu {
                width: 200px;
                height: auto;
                margin-bottom: 20px;
                animation: bounce 1s infinite alternate ease-in-out;
            }

            @keyframes bounce {
                from { transform: translateY(0px); }
                to { transform: translateY(-10px); }
            }

            .error-message {
                margin: 20px 0;
            }

            .error-details {
                color: #999;
                font-size: 0.9em;
                margin-top: 10px;
            }

            .back-button {
                margin-top: 20px;
            }
        `;
        document.head.appendChild(errorStyle);

        playerDetails.querySelector('.back-button').addEventListener('click', () => {
            playerDetails.style.display = 'none';
            document.querySelector('.leaderboard').style.display = 'block';
        });
    }
}

function generateHeroStats(heroes) {
    if (!heroes) return 'No hero data available';
    
    return Object.entries(heroes).map(([hero, abilities]) => `
        <div class="hero-section">
            <h4>${hero.charAt(0).toUpperCase() + hero.slice(1)}</h4>
            <div class="ability-list">
                ${Object.entries(abilities).map(([ability, data]) => `
                    <div class="ability-item">
                        <span class="ability-name">${formatAbilityName(ability)}</span>
                        ${Object.entries(data).map(([stat, value]) => `
                            <div class="ability-stat">
                                <span class="stat-name">${formatStatName(stat)}</span>
                                <span class="stat-value">${value.experiencePoints || 0}</span>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function formatAbilityName(name) {
    return name.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function formatStatName(name) {
    return name.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function createPlayerDetailsSection() {
    const playerDetails = document.createElement('div');
    playerDetails.className = 'player-details';
    document.querySelector('.container').appendChild(playerDetails);
    return playerDetails;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Sort select handler
    document.getElementById('sort-select').addEventListener('change', (e) => {
        currentSort = e.target.value;
        currentPage = 1; // Reset to first page when sorting changes
        fetchLeaderboard();
    });

    // Page size select handler
    document.getElementById('page-size-select').addEventListener('change', (e) => {
        pageSize = parseInt(e.target.value);
        currentPage = 1; // Reset to first page when page size changes
        fetchLeaderboard();
    });

    // Pagination handlers
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchLeaderboard();
        }
    });

    document.getElementById('next-page').addEventListener('click', () => {
        currentPage++;
        fetchLeaderboard();
    });

    // Initial load
    fetchLeaderboard();

    const searchInput = document.getElementById('player-search');
    const searchButton = document.getElementById('search-submit');

    // Function to handle search
    async function handleSearch() {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) return;

        try {
            document.querySelector('.leaderboard').style.display = 'none';
            const playerDetails = document.querySelector('.player-details') || createPlayerDetailsSection();
            playerDetails.style.display = 'block';
            
            playerDetails.innerHTML = `
                <div class="loading-container">
                    <div class="loading-pokeball"></div>
                    <div class="loading-text">Searching for player...</div>
                </div>
            `;

            // First try to get UUID from username using Mojang API
            try {
                const mojangResponse = await fetch(`https://api.ashcon.app/mojang/v2/user/${searchTerm}`);
                const mojangData = await mojangResponse.json();
                
                if (mojangData && mojangData.uuid) {
                    // Now use the UUID to get player stats
                    const statsResponse = await fetch(`https://api.hglabor.de/stats/FFA/${mojangData.uuid}`);
                    if (statsResponse.ok) {
                        const statsData = await statsResponse.json();
                        await showPlayerDetails(mojangData.uuid, searchTerm, statsData);
                        searchInput.value = '';
                    } else {
                        throw new Error('Player stats not found');
                    }
                } else {
                    throw new Error('Player not found');
                }
            } catch (error) {
                throw new Error('Could not find player');
            }

        } catch (error) {
            console.error('Search failed:', error);
            const playerDetails = document.querySelector('.player-details') || createPlayerDetailsSection();
            playerDetails.innerHTML = `
                <div class="error-container">
                    <img src="transparent-gifs-i-made-from-the-pokémon-anime-for-an-v0-1wxi2yjtxb7a1.gif" 
                         alt="Sad Pikachu" 
                         class="error-pikachu">
                    <div class="error-message">
                        <h3>Player not found</h3>
                        <p>Could not find player: "${searchTerm}"</p>
                        <p class="error-details">Please make sure the player name is correct and try again.</p>
                    </div>
                    <button class="minecraft-button back-button">← Back to Leaderboard</button>
                </div>
            `;

            // Add styles for the error display
            const errorStyle = document.createElement('style');
            errorStyle.textContent = `
                .error-container {
                    text-align: center;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 400px;
                }

                .error-pikachu {
                    width: 200px;
                    height: auto;
                    margin-bottom: 20px;
                    animation: bounce 1s infinite alternate ease-in-out;
                }

                @keyframes bounce {
                    from { transform: translateY(0px); }
                    to { transform: translateY(-10px); }
                }

                .error-message {
                    margin: 20px 0;
                }

                .error-details {
                    color: #999;
                    font-size: 0.9em;
                    margin-top: 10px;
                }

                .back-button {
                    margin-top: 20px;
                }
            `;
            document.head.appendChild(errorStyle);

            playerDetails.querySelector('.back-button').addEventListener('click', () => {
                playerDetails.style.display = 'none';
                document.querySelector('.leaderboard').style.display = 'block';
                searchInput.value = '';
            });
        }
    }

    // Handle search button click
    searchButton.addEventListener('click', handleSearch);

    // Handle Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Add these styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .search-error {
            color: var(--pokemon-red);
            margin-top: 10px;
            font-size: 0.9em;
            animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    // Remove any existing background pokeball styles
    const existingStyles = document.querySelectorAll('style[data-background-pokeballs]');
    existingStyles.forEach(style => {
        if (style.textContent.includes('background-pokeballs') || 
            style.textContent.includes('pokeball-background') ||
            style.textContent.includes('particles')) {
            style.remove();
        }
    });

    // Remove any existing background pokeball elements
    const particles = document.querySelector('.particles');
    if (particles) {
        particles.remove();
    }

    // Remove any existing particle elements
    const particleElements = document.querySelectorAll('.particle');
    particleElements.forEach(element => {
        element.remove();
    });

    // Add signature at the bottom of the page
    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.innerHTML = 'Made with ❤️ by @LeoApple';
    document.querySelector('.container').appendChild(footer);

    // Add styles for the footer
    const footerStyle = document.createElement('style');
    footerStyle.textContent = `
        .footer {
            text-align: center;
            padding: 20px;
            margin-top: 20px;
            color: #000;
            font-size: 14px;
        }
    `;
    document.head.appendChild(footerStyle);

    // Add dark mode styles and toggle functionality
    const header = document.querySelector('.header') || document.querySelector('.container').firstElementChild;
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'dark-mode-toggle minecraft-button';
    darkModeToggle.innerHTML = '🌙'; // Moon emoji for dark mode
    header.appendChild(darkModeToggle);

    // Update dark mode styles
    const darkModeStyle = document.createElement('style');
    darkModeStyle.textContent = `
        /* Dark mode styles */
        body.dark-mode {
            background-color: #0a0a0a;
            color: #fff;
        }

        body.dark-mode .container {
            background-color: #121212;
        }

        body.dark-mode .leaderboard {
            background-color: #1a1a1a;
        }

        body.dark-mode .leaderboard-item {
            background: rgba(255, 255, 255, 0.03);
            border-color: #2a2a2a;
        }

        body.dark-mode .leaderboard-item:hover {
            background: rgba(255, 255, 255, 0.05);
        }

        body.dark-mode .minecraft-button {
            background-color: #2a2a2a;
            border-color: #333;
            color: #fff;
        }

        body.dark-mode .minecraft-button:hover {
            background-color: #333;
        }

        body.dark-mode .minecraft-select {
            background-color: #2a2a2a;
            border-color: #333;
            color: #fff;
        }

        body.dark-mode .stat-card {
            background-color: rgba(255, 255, 255, 0.03);
            border-color: #2a2a2a;
        }

        body.dark-mode .footer {
            color: #fff;
        }

        body.dark-mode .player-search {
            background-color: #2a2a2a;
            border-color: #333;
            color: #fff;
        }

        body.dark-mode .loading-text {
            color: #fff;
        }

        body.dark-mode .error-details {
            color: #888;
        }

        body.dark-mode .player-details {
            background-color: #1a1a1a;
        }

        body.dark-mode .stat-value {
            color: #fff;
        }

        body.dark-mode .stat-label {
            color: #aaa;
        }

        .dark-mode-toggle {
            position: absolute;
            top: 20px;
            right: 20px;
            padding: 8px 12px;
            font-size: 16px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }

        .dark-mode-toggle:hover {
            transform: scale(1.1);
        }

        /* Animation for toggle */
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        .dark-mode-toggle.rotating {
            animation: rotate 0.5s ease;
        }

        /* Dark mode background styles */
        body.dark-mode::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, #0a0a0a, #1a1a1a);
            z-index: -2;
        }

        body.dark-mode .clouds {
            filter: brightness(0.3) contrast(0.8);
        }

        body.dark-mode #background {
            filter: brightness(0.3);
        }

        body.dark-mode .background-overlay {
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
        }
    `;
    document.head.appendChild(darkModeStyle);

    // Check for saved preference
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️'; // Sun emoji for light mode
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Add or remove background overlay
        if (document.body.classList.contains('dark-mode')) {
            if (!document.querySelector('.background-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'background-overlay';
                document.body.appendChild(overlay);
            }
        } else {
            const overlay = document.querySelector('.background-overlay');
            if (overlay) {
                overlay.remove();
            }
        }

        darkModeToggle.classList.add('rotating');
        
        setTimeout(() => {
            darkModeToggle.classList.remove('rotating');
        }, 500);

        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';
    });
});

// Update fetchPlayerNeighbors to be more efficient
async function fetchPlayerNeighbors(playerId) {
    try {
        const response = await fetch(`https://api.hglabor.de/stats/FFA/top?sort=${currentSort}&limit=20`);
        const data = await response.json();
        
        const playerIndex = data.findIndex(p => p.playerId === playerId);
        
        if (playerIndex === -1) {
            return { neighbors: [], currentRank: '?' };
        }

        // Calculate the range of players to show (2 above, current player, 2 below)
        const startIndex = Math.max(0, playerIndex - 2);
        const endIndex = Math.min(data.length - 1, playerIndex + 2);
        const neighbors = data.slice(startIndex, endIndex + 1);

        // Fetch names for all neighbors in parallel
        const namePromises = neighbors.map(async player => {
            try {
                const nameResponse = await fetch(`https://api.ashcon.app/mojang/v2/user/${player.playerId}`);
                const nameData = await nameResponse.json();
                player.name = nameData.username;
            } catch (error) {
                player.name = player.playerId.slice(0, 8);
            }
            player.rank = data.indexOf(player) + 1;
            return player;
        });

        // Wait for all name fetches to complete
        await Promise.all(namePromises);

        return {
            neighbors,
            currentRank: playerIndex + 1
        };
    } catch (error) {
        console.error('Error fetching neighbors:', error);
        return { neighbors: [], currentRank: '?' };
    }
}

// Remove background pokeballs style if it exists
const existingBackgroundStyle = document.querySelector('style[data-background-pokeballs]');
if (existingBackgroundStyle) {
    existingBackgroundStyle.remove();
} 