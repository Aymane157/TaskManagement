import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchSessionUser() {
      try {
        const response = await axios.get("http://localhost:7000/Manage/getUserInSession", {
          withCredentials: true,
        });
        const u = response.data.user;
        setUser(u);
        setFormData({
          username: u.username || "",
          fullName: u.fullName || "",
          email: u.email || "",
          phone: u.phone || "",
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch user session");
        setUser(null);
        setLoading(false);
      }
    }
    fetchSessionUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(
        "http://localhost:7000/Manage/updateUserProfile",
        formData,
        { withCredentials: true }
      );
      setUser(formData);
      setEditMode(false);
    } catch (err) {
      alert("Failed to save profile");
    }
    setSaving(false);
  };

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>No user logged in. Please login.</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Profile</h1>

      {!editMode ? (
        <div style={styles.profileCard}>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Full Name:</strong> {user.fullName || "Not set"}</p>
          <p><strong>Email:</strong> {user.email || "Not set"}</p>
          <p><strong>Phone:</strong> {user.phone || "Not set"}</p>
          <button style={styles.editButton} onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
      ) : (
        <div style={styles.profileCard}>
          <label style={styles.label}>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              disabled
            />
          </label>
          <label style={styles.label}>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Phone:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <div style={styles.buttonRow}>
            <button style={styles.cancelButton} onClick={() => setEditMode(false)} disabled={saving}>
              Cancel
            </button>
            <button style={styles.saveButton} onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 480,
    margin: "2rem auto",
    padding: "1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },
  profileCard: {
    backgroundColor: "#f8f8f8",
    padding: "1.5rem",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  label: {
    display: "block",
    marginBottom: "1rem",
    fontWeight: "600",
    color: "#555",
  },
  input: {
    display: "block",
    width: "100%",
    padding: "0.5rem",
    marginTop: "0.3rem",
    borderRadius: 4,
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
    marginTop: "1rem",
  },
  editButton: {
    marginTop: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: 4,
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: 4,
    cursor: "pointer",
  },
  saveButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1.2rem",
    fontSize: "1rem",
    borderRadius: 4,
    cursor: "pointer",
  },
};
