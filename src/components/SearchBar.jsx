function SearchBar({ search, setSearch }) {
  const clearSearch = () => setSearch("");

  return (
    <div style={{ marginBottom: "1rem", position: "relative" }}>
      <div style={{ position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.2rem",
          }}
        >
          🔍
        </span>
        <input
          type="text"
          placeholder="Search breweries by name (uses Open Brewery DB search API)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "0.75rem 3rem 0.75rem 3rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "2px solid #e2e8f0",
            fontSize: "1rem",
            outline: "none",
            transition: "border-color 0.2s",
            boxSizing: "border-box",
          }}
          onFocus={(e) => (e.target.style.borderColor = "#3182ce")}
          onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
        />
        {search && (
          <button
            onClick={clearSearch}
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "#666",
            }}
            title="Clear search"
          >
            ❌
          </button>
        )}
      </div>
      {search && (
        <div
          style={{
            fontSize: "0.9rem",
            color: "#666",
            marginTop: "-0.5rem",
            marginBottom: "0.5rem",
            padding: "0.5rem",
            backgroundColor: "#e8f4fd",
            borderRadius: "4px",
            border: "1px solid #bee3f8",
          }}
        >
          🔎 Searching API for "<strong>{search}</strong>"
          <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem" }}>
            (This searches brewery names, cities, and states)
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
