/* search_engine.js */

const API_KEY = 'AIzaSyAPKKM4aPkMcnn2TD3SQcflwSk-WzTxltg'; 

const manualDatabase = [
    { title: "My 3D Burger Animation", category: "Work", id: "YOUR_MANUAL_ID_HERE", type: "youtube" },
    { title: "Portfolio Showcase", category: "Work", id: "https://moses-portfolio.netlify.app", type: "website" }
];

// Added window wrapper to ensure it's globally accessible
window.performSearch = async function() {
    const input = document.getElementById('searchInput');
    const query = input.value.toLowerCase().trim();
    const resultsDiv = document.getElementById('results');

    if (query === "") { 
        resultsDiv.innerHTML = ""; 
        return; 
    }

    // 1. Filter Local
    const localMatches = manualDatabase.filter(item => item.title.toLowerCase().includes(query));

    // 2. Fetch API
    let apiMatches = [];
    try {
        const url =     `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&q=${encodeURIComponent(query)}&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.items) {
            apiMatches = data.items.map(item => ({
                title: item.snippet.title,
                category: "YouTube",
                id: item.id.videoId,
                type: "youtube"
            }));
        }
    } catch (err) { 
        console.error("API Error:", err); 
    }

    // 3. Render Combined Results (FIXED THE MISSING BACKTICKS HERE)
    const allResults = [...localMatches, ...apiMatches];
    
    if (allResults.length === 0) {
        resultsDiv.innerHTML = `<div class="result-item" style="color: white; padding: 15px;">No results found.</div>`;
    } else {
        resultsDiv.innerHTML = allResults.map(item => `
            <div class="result-item" onclick="openPlayer('${item.id}', '${item.type}')">
                <div>
                    <span class="category-tag">${item.category}</span>
                    <span class="item-title">${item.title}</span>
                </div>
                <i class="fas fa-play-circle" style="color: #00d2ff;"></i>
            </div>
        `).join('');
    }
};

window.openPlayer = function(id, type) {
    const modal = document.getElementById('videoModal');
    const player = document.getElementById('videoPlayer');
    modal.style.display = "block";
    player.src = (type === "youtube") ? `https://www.youtube.com/embed/${id}?autoplay=1` : id;
};

window.closePlayer = function() {
    document.getElementById('videoModal').style.display = "none";
    document.getElementById('videoPlayer').src = "";
};
