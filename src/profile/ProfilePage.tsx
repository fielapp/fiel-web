import { useState } from 'react';
import { Button } from '../components/ReusableComponents';
import './ProfileStyles.css';

interface ProfileData {
  companyName: string;
  companyDescription: string;
  website: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
}

export const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileData>({
    companyName: 'Company Name',
    companyDescription: 'Company description...',
    website: 'https://www.example.com',
    email: 'contact@example.com',
    phone: '+1 234 567 890',
    address: 'Main Street 123, City',
    logo: 'https://placehold.co/150x150',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profile);
    alert('Profile updated successfully');
  };

  return (
    <div className="profile-container">
      <h2>Profile Settings</h2>

      <div className="profile-card">
        <div className="logo-section">
          <img src={profile.logo} alt="Company logo" className="company-logo" />
          <Button variant="secondary">Change Logo</Button>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={profile.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="companyDescription">Company Description</label>
            <textarea
              id="companyDescription"
              name="companyDescription"
              value={profile.companyDescription}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="website">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={profile.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Contact Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profile.address}
              onChange={handleChange}
            />
          </div>

          <Button type="submit" variant="primary">Save Profile</Button>
        </form>
      </div>
    </div>
  );
};