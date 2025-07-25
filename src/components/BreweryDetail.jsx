import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );

        if (!response.ok) {
          throw new Error("Brewery not found");
        }

        const data = await response.json();
        setBrewery(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrewery();
  }, [id]);

  const formatPhone = (phone) => {
    if (!phone) return "N/A";
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6
      )}`;
    }
    return phone;
  };

  const getTypeIcon = (type) => {
    const icons = {
      // micro: "🔬",
      // nano: "⚡",
      // regional: "🌎",
      // brewpub: "🍽️",
      // large: "🏭",
      // planning: "📋",
      // contract: "📝",
      // proprietor: "👤",
    };
    return icons[type] || "";
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          fontSize: "1.2rem",
        }}
      >
        🍺 Loading brewery details...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "#e53e3e",
        }}
      >
        <h2>❌ Error</h2>
        <p>{error}</p>
        <Link
          to="/"
          style={{
            color: "#3182ce",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  if (!brewery) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>❌ Brewery not found</h2>
        <Link
          to="/"
          style={{
            color: "#3182ce",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      {/* Back button */}
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          color: "#3182ce",
          textDecoration: "none",
          marginBottom: "2rem",
          fontSize: "0.9rem",
          fontWeight: "bold",
        }}
      >
        ← Back to Dashboard
      </Link>

      {/* Header */}
      <header style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "2.5rem",
              color: "#2d3748",
            }}
          >
            {getTypeIcon(brewery.brewery_type)} {brewery.name}
          </h1>
        </div>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <span
            style={{
              backgroundColor: "#bee3f8",
              color: "#2b6cb0",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              fontSize: "0.9rem",
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {brewery.brewery_type} Brewery
          </span>

          {brewery.state && (
            <span
              style={{
                backgroundColor: "#c6f6d5",
                color: "#22543d",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              📍 {brewery.state}
            </span>
          )}
        </div>
      </header>

      {/* Main content grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
        }}
      >
        {/* Location Information */}
        <div
          style={{
            backgroundColor: "#f7fafc",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              color: "#2d3748",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            📍 Location Details
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {brewery.street && (
              <div>
                <strong>Address:</strong>
                <div style={{ marginTop: "0.25rem", color: "#4a5568" }}>
                  {brewery.street}
                  {brewery.postal_code && `, ${brewery.postal_code}`}
                </div>
              </div>
            )}

            <div>
              <strong>City:</strong>
              <div style={{ marginTop: "0.25rem", color: "#4a5568" }}>
                {brewery.city || "Not specified"}
              </div>
            </div>

            <div>
              <strong>State:</strong>
              <div style={{ marginTop: "0.25rem", color: "#4a5568" }}>
                {brewery.state || "Not specified"}
              </div>
            </div>

            <div>
              <strong>Country:</strong>
              <div style={{ marginTop: "0.25rem", color: "#4a5568" }}>
                {brewery.country || "Not specified"}
              </div>
            </div>

            {brewery.latitude && brewery.longitude && (
              <div>
                <strong>Coordinates:</strong>
                <div
                  style={{
                    marginTop: "0.25rem",
                    color: "#4a5568",
                    fontSize: "0.9rem",
                  }}
                >
                  {brewery.latitude}, {brewery.longitude}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div
          style={{
            backgroundColor: "#f7fafc",
            padding: "1.5rem",
            borderRadius: "12px",
            border: "1px solid #e2e8f0",
          }}
        >
          <h3
            style={{
              margin: "0 0 1rem 0",
              color: "#2d3748",
              fontSize: "1.3rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Contact Information
          </h3>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <div>
              <strong>Phone:</strong>
              <div style={{ marginTop: "0.25rem", color: "#4a5568" }}>
                {brewery.phone ? formatPhone(brewery.phone) : "Not available"}
              </div>
            </div>

            {brewery.website_url && (
              <div>
                <strong>Website:</strong>
                <div style={{ marginTop: "0.25rem" }}>
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#3182ce",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Visit Official Website →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h3
          style={{
            margin: "0 0 1.5rem 0",
            color: "#2d3748",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          Additional Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <div>
            <strong>Brewery ID:</strong>
            <div
              style={{
                marginTop: "0.25rem",
                color: "#4a5568",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                backgroundColor: "#f1f5f9",
                padding: "0.25rem 0.5rem",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              {brewery.id}
            </div>
          </div>

          <div>
            <strong>Brewery Type:</strong>
            <div style={{ marginTop: "0.25rem", color: "#4a5568" }}>
              {getTypeIcon(brewery.brewery_type)} {brewery.brewery_type}
              <div
                style={{
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                  color: "#718096",
                }}
              >
                {brewery.brewery_type === "micro" &&
                  "Small independent brewery"}
                {brewery.brewery_type === "nano" &&
                  "Very small brewery operation"}
                {brewery.brewery_type === "regional" &&
                  "Mid-sized regional brewery"}
                {brewery.brewery_type === "brewpub" &&
                  "Restaurant with on-site brewery"}
                {brewery.brewery_type === "large" && "Large commercial brewery"}
                {brewery.brewery_type === "planning" &&
                  "Brewery in planning stages"}
                {brewery.brewery_type === "contract" &&
                  "Contract brewing operation"}
                {brewery.brewery_type === "proprietor" &&
                  "Very small proprietor brewery"}
              </div>
            </div>
          </div>
        </div>

        {/* Fun fact section */}
        <div
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#e6fffa",
            borderRadius: "8px",
            border: "1px solid #81e6d9",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>💡</span>
            <strong style={{ color: "#234e52" }}>Did you know?</strong>
          </div>
          <p style={{ margin: 0, color: "#285e61", fontSize: "0.9rem" }}>
            {brewery.brewery_type === "micro" &&
              `Micro breweries like ${brewery.name} typically produce less than 15,000 barrels of beer per year and are independently owned.`}
            {brewery.brewery_type === "nano" &&
              `Nano breweries like ${brewery.name} are even smaller than micro breweries, often producing just a few barrels at a time.`}
            {brewery.brewery_type === "brewpub" &&
              `Brewpubs like ${brewery.name} combine restaurant dining with fresh, on-site brewed beer.`}
            {brewery.brewery_type === "regional" &&
              `Regional breweries like ${brewery.name} typically distribute their beer across multiple states.`}
            {brewery.brewery_type === "large" &&
              `Large breweries like ${brewery.name} produce millions of barrels annually and distribute nationwide.`}
            {!["micro", "nano", "brewpub", "regional", "large"].includes(
              brewery.brewery_type
            ) &&
              `${brewery.name} represents the diverse landscape of American craft brewing.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default BreweryDetail;
