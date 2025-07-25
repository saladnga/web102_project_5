import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import BreweryCard from "./BreweryCard";
import Stats from "./Stats";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [breweries, setBreweries] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalBreweries, setTotalBreweries] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [randomBrewery, setRandomBrewery] = useState(null);
  const [showRandomBrewery, setShowRandomBrewery] = useState(false);
  const [metadata, setMetadata] = useState(null);

  // Enhanced fetch function with API parameters
  const fetchBreweries = async (page = 1, useFilters = true) => {
    try {
      setLoading(true);

      // Build API URL with filters
      let apiUrl = `https://api.openbrewerydb.org/v1/breweries?per_page=50&page=${page}`;

      if (useFilters) {
        if (typeFilter) apiUrl += `&by_type=${typeFilter}`;
        if (stateFilter)
          apiUrl += `&by_state=${encodeURIComponent(stateFilter)}`;
        if (cityFilter) apiUrl += `&by_city=${encodeURIComponent(cityFilter)}`;
        if (countryFilter)
          apiUrl += `&by_country=${encodeURIComponent(countryFilter)}`;
        if (sortBy) apiUrl += `&sort=${sortBy}`;
        if (search) {
          // Use search endpoint for name-based searches
          apiUrl = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(
            search
          )}&per_page=50&page=${page}`;
          if (typeFilter) apiUrl += `&by_type=${typeFilter}`;
          if (stateFilter)
            apiUrl += `&by_state=${encodeURIComponent(stateFilter)}`;
        }
      }

      const res = await fetch(apiUrl);
      const data = await res.json();

      if (page === 1) {
        setBreweries(data);
      } else {
        setBreweries((prev) => [...prev, ...data]);
      }

      // Fetch metadata for total count
      fetchMetadata();
    } catch (err) {
      console.error("Error fetching breweries:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch metadata
  const fetchMetadata = async () => {
    try {
      let metaUrl = "https://api.openbrewerydb.org/v1/breweries/meta";
      if (typeFilter) metaUrl += `?by_type=${typeFilter}`;
      if (stateFilter)
        metaUrl += `${typeFilter ? "&" : "?"}by_state=${encodeURIComponent(
          stateFilter
        )}`;

      const res = await fetch(metaUrl);
      const data = await res.json();
      setMetadata(data);
      setTotalBreweries(data.total || 0);
    } catch (err) {
      console.error("Error fetching metadata:", err);
    }
  };

  // Fetch random brewery
  const fetchRandomBrewery = async () => {
    try {
      const res = await fetch(
        "https://api.openbrewerydb.org/v1/breweries/random"
      );
      const data = await res.json();
      setRandomBrewery(data[0]);
      setShowRandomBrewery(true);
    } catch (err) {
      console.error("Error fetching random brewery:", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Build API URL with filters
        let apiUrl = `https://api.openbrewerydb.org/v1/breweries?per_page=50&page=1`;

        if (typeFilter) apiUrl += `&by_type=${typeFilter}`;
        if (stateFilter)
          apiUrl += `&by_state=${encodeURIComponent(stateFilter)}`;
        if (cityFilter) apiUrl += `&by_city=${encodeURIComponent(cityFilter)}`;
        if (countryFilter)
          apiUrl += `&by_country=${encodeURIComponent(countryFilter)}`;
        if (sortBy) apiUrl += `&sort=${sortBy}`;
        if (search) {
          // Use search endpoint for name-based searches
          apiUrl = `https://api.openbrewerydb.org/v1/breweries/search?query=${encodeURIComponent(
            search
          )}&per_page=50&page=1`;
          if (typeFilter) apiUrl += `&by_type=${typeFilter}`;
          if (stateFilter)
            apiUrl += `&by_state=${encodeURIComponent(stateFilter)}`;
        }

        const res = await fetch(apiUrl);
        const data = await res.json();
        setBreweries(data);
        setCurrentPage(1);

        // Fetch metadata for total count
        let metaUrl = "https://api.openbrewerydb.org/v1/breweries/meta";
        if (typeFilter) metaUrl += `?by_type=${typeFilter}`;
        if (stateFilter)
          metaUrl += `${typeFilter ? "&" : "?"}by_state=${encodeURIComponent(
            stateFilter
          )}`;

        try {
          const metaRes = await fetch(metaUrl);
          const metaData = await metaRes.json();
          setMetadata(metaData);
          setTotalBreweries(metaData.total || 0);
        } catch (metaErr) {
          console.error("Error fetching metadata:", metaErr);
        }
      } catch (err) {
        console.error("Error fetching breweries:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [typeFilter, stateFilter, cityFilter, countryFilter, search, sortBy]);

  // Since we're using API filtering, we don't need to filter again client-side
  const filtered = breweries;

  // Get unique values for filter dropdowns
  const uniqueStates = [
    ...new Set(breweries.map((b) => b.state).filter(Boolean)),
  ];
  const uniqueCities = [
    ...new Set(breweries.map((b) => b.city).filter(Boolean)),
  ];
  const uniqueCountries = [
    ...new Set(breweries.map((b) => b.country).filter(Boolean)),
  ];

  // Load more breweries function
  const loadMoreBreweries = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchBreweries(nextPage, true);
  };

  // Quick analytics for dashboard charts
  const typeDistribution = breweries.reduce((acc, brewery) => {
    acc[brewery.brewery_type] = (acc[brewery.brewery_type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(typeDistribution)
    .map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6); // Top 6 types

  const COLORS = [
    "#3182ce",
    "#48bb78",
    "#ed8936",
    "#9f7aea",
    "#38b2ac",
    "#f56565",
  ];

  if (loading) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          fontSize: "1.2rem",
        }}
      >
        Loading brewery data...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            margin: "0 0 0.5rem 0",
            background: "linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          🍺 Brewery Explorer Dashboard
        </h1>
        <p
          style={{
            color: "#666",
            fontSize: "1.1rem",
            margin: 0,
          }}
        >
          Discover breweries across the United States
        </p>
      </header>

      <SearchBar search={search} setSearch={setSearch} />
      <Filter
        setTypeFilter={setTypeFilter}
        setStateFilter={setStateFilter}
        setCityFilter={setCityFilter}
        setCountryFilter={setCountryFilter}
        setSortBy={setSortBy}
        states={uniqueStates}
        cities={uniqueCities}
        countries={uniqueCountries}
      />

      {/* Random Brewery Feature */}
      <div style={{ marginBottom: "1rem", textAlign: "center" }}>
        <button
          onClick={fetchRandomBrewery}
          style={{
            backgroundColor: "#3182ce",
            color: "white",
            padding: "0.75rem 1.5rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Discover Random Brewery
        </button>
      </div>

      {/* Random Brewery Display */}
      {showRandomBrewery && randomBrewery && (
        <div
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: "#fff3cd",
            borderRadius: "8px",
            border: "2px solid #ffeaa7",
          }}
        >
          <h3 style={{ margin: "0 0 1rem 0", color: "#856404" }}>
            Random Discovery: {randomBrewery.name}
          </h3>
          <BreweryCard brewery={randomBrewery} />
          <button
            onClick={() => setShowRandomBrewery(false)}
            style={{
              marginTop: "1rem",
              backgroundColor: "#dc3545",
              color: "white",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}

      <Stats
        breweries={filtered}
        totalBreweries={totalBreweries}
        metadata={metadata}
      />

      {/* Dashboard Charts */}
      {chartData.length > 0 && (
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              margin: "0 0 1.5rem 0",
              color: "#2d3748",
              textAlign: "center",
              fontSize: "1.3rem",
            }}
          >
            📊 Current Results: Brewery Type Distribution
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              alignItems: "center",
              minHeight: "300px",
            }}
          >
            {/* Bar Chart */}
            <div>
              <h4
                style={{
                  textAlign: "center",
                  margin: "0 0 1rem 0",
                  color: "#4a5568",
                }}
              >
                Count by Type
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="type"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    fontSize={12}
                  />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3182ce" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div>
              <h4
                style={{
                  textAlign: "center",
                  margin: "0 0 1rem 0",
                  color: "#4a5568",
                }}
              >
                Distribution Percentage
              </h4>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ type, count }) => `${type}: ${count}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              fontSize: "0.9rem",
              margin: "1rem 0 0 0",
            }}
          >
            Charts update automatically based on your current search and filter
            selections
          </p>
        </div>
      )}

      {filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "2rem",
            color: "#666",
            fontSize: "1.1rem",
          }}
        >
          No breweries found matching your criteria. Try adjusting your search
          or filters.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          }}
        >
          {filtered.map((brewery) => (
            <BreweryCard key={brewery.id} brewery={brewery} />
          ))}
        </div>
      )}

      {/* Load More Button */}
      {filtered.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <button
            onClick={loadMoreBreweries}
            style={{
              backgroundColor: "#48bb78",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Load More Breweries
          </button>
          <p style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
            Showing {filtered.length} breweries
            {totalBreweries > 0 && ` of ${totalBreweries} total`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
