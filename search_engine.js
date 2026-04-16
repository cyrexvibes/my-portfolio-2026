/* search_engine.js */

const database = [
    { title: "Burna Boy - Last Last", category: "Music", id: "v7-G6W_XqZ4", type: "youtube" },
    { title: "Wizkid - Essence ft. Tems", category: "Music", id: "jipQpjUA_o8", type: "youtube" },
    { title: "Rema - Calm Down", category: "Music", id: "CQLsdm1uGu8", type: "youtube" },
    { title: "M.Cyrex Portfolio", category: "Work", id: "https://moses-portfolio.netlify.app", type: "website" }
];

function performSearch() {
    const input = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');
    
    if (!input || !resultsDiv) return;

    const query = input.value.toLowerCase().trim();
    
    // 1. Clear suggestions if input is empty
    resultsDiv.innerHTML = ""; 
    if (query === "") return;

    // 2. Filter the database for matches
    const filtered = database.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.category.toLowerCase().includes(query)
    );

    // 3. Render Suggestions
    if (filtered.length === 0) {
        resultsDiv.innerHTML = `<div class="result-item" style="color: white; padding: 15px;">No suggestions found for "${query}"</div>`;
    } else {
        resultsDiv.innerHTML = filtered.map(item => `
            <div class="result-item" onclick="openPlayer('${item.id}', '${item.type}')">
                <div class="info">
                    <span class="category-tag" style="color: #00d2ff; font-size: 0.7rem; display: block; text-transform: uppercase;">${item.category}</span>
                    <span class="item-title" style="color: white; font-weight: 500;">${item.title}</span>
                </div>
                <i class="fas fa-play-circle" style="color: #00d2ff; font-size: 1.2rem;"></i>
            </div>
        `).join('');
    }
}

function openPlayer(id, type) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    
    if (type === "youtube") {
        player.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    } else {
        player.src = id; 
    }
    modal.style.display = "block";
}


// Add or Replace this at the bottom of search_engine.js
function closePlayer() {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');

    // This hides the popup window
    modal.style.display = "none";

    // This kills the audio/video so it doesn't keep playing in the background
    player.src = ""; 
}


