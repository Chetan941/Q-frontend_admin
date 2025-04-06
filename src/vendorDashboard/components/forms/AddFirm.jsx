import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';

const AddFirm = () => {
  const [firmName, setFirmName] = useState('');
  const [area, setArea] = useState('');
  const [category, setCategory] = useState([]);
  const [region, setRegion] = useState([]);
  const [offer, setOffer] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggleCheckbox = (value, list, setter) => {
    setter(list.includes(value)
      ? list.filter(item => item !== value)
      : [...list, value]
    );
  };

  const handleFirmSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginToken = localStorage.getItem('loginToken');
      if (!loginToken) {
        console.error("User not authenticated");
        return;
      }

      const formData = new FormData();
      formData.append('firmName', firmName);
      formData.append('area', area);
      formData.append('offer', offer);
      formData.append('image', file);
      category.forEach(cat => formData.append('category', cat));
      region.forEach(reg => formData.append('region', reg));

      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': loginToken
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        alert('Firm added successfully!');
        localStorage.setItem('firmId', data.firmId);
        localStorage.setItem('firmName', data.vendorFirmName);
        window.location.reload();
      } else {
        const msg = data.message === "vendor can have only one firm"
          ? "Firm Exists 🥗. Only 1 firm can be added"
          : "Failed to add firm";
        alert(msg);
      }

      // Clear form after submission
      setFirmName('');
      setArea('');
      setCategory([]);
      setRegion([]);
      setOffer('');
      setFile(null);

    } catch (error) {
      console.error("Failed to add Firm", error);
      alert("Something went wrong while adding the firm.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="firmSection">
      {loading && (
        <div className="loaderSection">
          <ThreeCircles
            visible={true}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
        </div>
      )}

      {!loading && (
        <form className="tableForm" onSubmit={handleFirmSubmit}>
          <h3>Add Firm</h3>

          <label>Firm Name</label>
          <input
            type="text"
            value={firmName}
            onChange={(e) => setFirmName(e.target.value)}
          />

          <label>Area</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />

          <div className="checkInp">
            <label>Category</label>
            <div className="inputsContainer">
              {['veg', 'non-veg'].map((item) => (
                <div className="checboxContainer" key={item}>
                  <label>{item === 'veg' ? 'Veg' : 'Non-Veg'}</label>
                  <input
                    type="checkbox"
                    value={item}
                    checked={category.includes(item)}
                    onChange={() => handleToggleCheckbox(item, category, setCategory)}
                  />
                </div>
              ))}
            </div>
          </div>

          <label>Offer</label>
          <input
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
          />

          <div className="checkInp">
            <label>Region</label>
            <div className="inputsContainer">
              {['south-indian', 'north-indian', 'chinese', 'bakery'].map((reg) => (
                <div className="regBoxContainer" key={reg}>
                  <label>{reg.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}</label>
                  <input
                    type="checkbox"
                    value={reg}
                    checked={region.includes(reg)}
                    onChange={() => handleToggleCheckbox(reg, region, setRegion)}
                  />
                </div>
              ))}
            </div>
          </div>

          <label>Firm Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddFirm;
