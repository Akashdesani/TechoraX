document.getElementById("year").textContent = new Date().getFullYear();

const searchInput = document.getElementById("searchInput");
const cards = Array.from(document.querySelectorAll(".article-card"));
const filterButtons = Array.from(document.querySelectorAll(".filter"));
const resultsCount = document.getElementById("resultsCount");
const noResults = document.getElementById("noResults");
let activeFilter = "all";

function updateArticles() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const category = card.dataset.category;
    const searchable = card.dataset.search;
    const matchesCategory = activeFilter === "all" || category === activeFilter;
    const matchesQuery = !query || searchable.includes(query);
    const show = matchesCategory && matchesQuery;
    card.hidden = !show;
    if (show) visible++;
  });
  resultsCount.textContent = `Showing ${visible} of ${cards.length} articles`;
  noResults.hidden = visible !== 0;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    updateArticles();
  });
});
searchInput.addEventListener("input", updateArticles);

document.querySelectorAll(".read-more").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".article-card");
    const expanded = card.classList.toggle("expanded");
    button.setAttribute("aria-expanded", String(expanded));
    button.innerHTML = expanded ? 'Read less <span>−</span>' : 'Read more <span>＋</span>';
  });
});

document.getElementById("shareButton").addEventListener("click", async () => {
  const shareData = { title: document.title, text: "Explore facts and technology on TechoraX Zone.", url: window.location.href };
  try {
    if (navigator.share) await navigator.share(shareData);
    else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      alert("Website link copied. Share it with someone who may find it useful!");
    } else prompt("Copy this website link:", window.location.href);
  } catch (error) {
    if (error.name !== "AbortError") alert("You can copy the website link from your browser address bar.");
  }
});
