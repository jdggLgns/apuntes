(() => {
    const input = document.getElementById("searchInput");
    const cardsWrap = document.getElementById("cards");
    const emptyState = document.getElementById("emptyState");
    const resetBtn = document.getElementById("resetBtn");
    const cardsCount = document.getElementById("cardsCount");

    if (!cardsWrap) return;

    const cards = Array.from(cardsWrap.querySelectorAll(".card"));

    const updateCount = () => {
        if (!cardsCount) return;
        const visible = cards.filter(c => !c.hidden).length;
        cardsCount.textContent = String(visible);
    };

    const filter = (value) => {
        const q = value.trim().toLowerCase();

        let visible = 0;
        for (const card of cards) {
            const title = card.querySelector(".card-title")?.textContent ?? "";
            const text = card.querySelector(".card-text")?.textContent ?? "";
            const keywords = card.getAttribute("data-keywords") ?? "";
            const haystack = `${title} ${text} ${keywords}`.toLowerCase();

            const match = q === "" ? true : haystack.includes(q);
            card.hidden = !match;
            if (match) visible++;
        }

        emptyState.hidden = visible !== 0;
        updateCount();
    };

    input?.addEventListener("input", (e) => filter(e.target.value));

    resetBtn?.addEventListener("click", () => {
        input.value = "";
        filter("");
        input.focus();
    });

    // Atajo: Ctrl+K / Cmd+K para enfocar búsqueda
    window.addEventListener("keydown", (e) => {
        const isK = e.key.toLowerCase() === "k";
        if (!isK) return;

        const isMac = navigator.platform.toLowerCase().includes("mac");
        const modifier = isMac ? e.metaKey : e.ctrlKey;

        if (modifier) {
            e.preventDefault();
            input?.focus();
        }
    });

    // Inicial
    filter("");
})();
