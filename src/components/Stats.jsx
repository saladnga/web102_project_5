function Stats({ breweries, totalBreweries = 0 }) {
  const total = breweries.length;
  const avgNameLength = (
    breweries.reduce((acc, b) => acc + b.name.length, 0) / (total || 1)
  ).toFixed(2);
  const states = new Set(breweries.map((b) => b.state)).size;

  // Additional statistics
  const typeDistribution = breweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});

  const mostCommonType = Object.entries(typeDistribution).reduce(
    (max, [type, count]) => (count > max.count ? { type, count } : max),
    { type: "none", count: 0 }
  );

  const citiesWithBreweries = new Set(
    breweries.filter((b) => b.city).map((b) => b.city)
  ).size;

  // New statistics
  const breweriesWithWebsites = breweries.filter((b) => b.website_url).length;
  const websitePercentage =
    total > 0 ? ((breweriesWithWebsites / total) * 100).toFixed(1) : 0;

  const breweriesWithPhone = breweries.filter((b) => b.phone).length;
  const phonePercentage =
    total > 0 ? ((breweriesWithPhone / total) * 100).toFixed(1) : 0;

  return (
    <div
      style={{
        marginBottom: "2rem",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "1rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
          📊 Total Count
        </h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {total}
        </p>
        <small>Breweries</small>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
          🏛️ Geographic Reach
        </h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {states}
        </p>
        <small>States</small>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>🏙️ Cities</h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {citiesWithBreweries}
        </p>
        <small>With Breweries</small>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
          🏆 Most Common Type
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {mostCommonType.type}
        </p>
        <small>({mostCommonType.count} breweries)</small>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
          📏 Avg Name Length
        </h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {avgNameLength}
        </p>
        <small>Characters</small>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
          🌐 With Websites
        </h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {websitePercentage}%
        </p>
        <small>({breweriesWithWebsites} breweries)</small>
      </div>

      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>📞 With Phone</h3>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            color: "#2c5282",
          }}
        >
          {phonePercentage}%
        </p>
        <small>({breweriesWithPhone} breweries)</small>
      </div>

      {totalBreweries > 0 && (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ margin: "0 0 0.5rem 0", color: "#333" }}>
            🗄️ Total in Database
          </h3>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              margin: 0,
              color: "#2c5282",
            }}
          >
            {totalBreweries.toLocaleString()}
          </p>
          <small>All breweries</small>
        </div>
      )}
    </div>
  );
}

export default Stats;
