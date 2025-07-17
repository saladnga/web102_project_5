function Filter({
  setTypeFilter,
  setStateFilter,
  setCityFilter,
  setCountryFilter,
  setSortBy,
  states,
  cities = [],
  countries = [],
}) {
  return (
    <div
      style={{
        marginBottom: "1.5rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e9ecef",
      }}
    >
      <h3
        style={{ margin: "0 0 1rem 0", color: "#495057", fontSize: "1.1rem" }}
      >
        🔧 Advanced Filters
      </h3>

      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            🍺 Brewery Type:
          </label>
          <select
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "0.9rem",
              backgroundColor: "white",
            }}
          >
            <option value="">All Types</option>
            <option value="micro">🔬 Micro</option>
            <option value="nano">⚡ Nano</option>
            <option value="regional">🌎 Regional</option>
            <option value="brewpub">🍽️ Brewpub</option>
            <option value="large">🏭 Large</option>
            <option value="planning">📋 Planning</option>
            <option value="contract">📝 Contract</option>
            <option value="proprietor">👤 Proprietor</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            🗺️ State:
          </label>
          <select
            onChange={(e) => setStateFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "0.9rem",
              backgroundColor: "white",
            }}
          >
            <option value="">All States</option>
            {states.sort().map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            🏙️ City:
          </label>
          <select
            onChange={(e) => setCityFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "0.9rem",
              backgroundColor: "white",
            }}
          >
            <option value="">All Cities</option>
            {cities
              .sort()
              .slice(0, 50)
              .map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            🌍 Country:
          </label>
          <select
            onChange={(e) => setCountryFilter(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "0.9rem",
              backgroundColor: "white",
            }}
          >
            <option value="">All Countries</option>
            {countries.sort().map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
          >
            📊 Sort By:
          </label>
          <select
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              width: "100%",
              padding: "0.6rem",
              borderRadius: "6px",
              border: "1px solid #ced4da",
              fontSize: "0.9rem",
              backgroundColor: "white",
            }}
          >
            <option value="">Default Order</option>
            <option value="name:asc">📛 Name (A-Z)</option>
            <option value="name:desc">📛 Name (Z-A)</option>
            <option value="brewery_type:asc">🍺 Type (A-Z)</option>
            <option value="state:asc">🗺️ State (A-Z)</option>
            <option value="city:asc">🏙️ City (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;
