"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';


interface FormData {
  logo: string;
  logoText: string;
  headerFields: string[];
  primaryField: string;
  thumbnail: string;
  secondaryFields: string[];
  auxiliaryFields: string[];
  barcode: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    logo: '',
    logoText: '',
    headerFields: [''],
    primaryField: '',
    thumbnail: '',
    secondaryFields: [''],
    auxiliaryFields: [''],
    barcode: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number | null = null) => {
    const { name, value } = e.target;
    if (['headerFields', 'secondaryFields', 'auxiliaryFields'].includes(name) && index !== null) {
      const fields = [...(formData[name] || [])];
      fields[index] = value;
      setFormData({ ...formData, [name]: fields });
    } else {
      // 일반 필드 업데이트
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission logic here, such as sending the data to a server
    console.log('Form Submitted:', formData);
    alert('Form Submitted!');
  };

  const addHeaderField = () => {
    setFormData({ ...formData, headerFields: [...formData.headerFields, ''] });
  };
  const addSecondaryField = () => {
    setFormData({ ...formData, secondaryFields: [...formData.secondaryFields, ''] });
  };
  const addAuxiliaryField = () => {
    setFormData({ ...formData, auxiliaryFields: [...formData.auxiliaryFields, ''] });
  };

  const rmHeaderField = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      headerFields: prevData.headerFields.filter((_, i) => i !== index), // Remove email at the given index
    }));
  };
  const rmSecondaryField = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      secondaryFields: prevData.secondaryFields.filter((_, i) => i !== index), // Remove email at the given index
    }));
  };
  const rmAuxiliaryField = (index: number) => {
    setFormData((prevData) => ({
      ...prevData,
      auxiliaryFields: prevData.auxiliaryFields.filter((_, i) => i !== index), // Remove email at the given index
    }));
  };

  return (
    <div className="flex h-screen">
      <div className="flex w-full max-w-4xl p-4 gap-8">
        {/* Left: Preview */}
        <div className="max-w-md mx-auto bg-blue-500 text-white shadow-md rounded-lg p-6">
          {/* Top Section with Logo, Logo Text, and Header Fields */}
          <div className="flex justify-between items-center mb-4">
            <img src={formData.logo} alt="Logo" className="h-12 w-12" />
            <div className="text-center">
              <h2 className="text-xl font-bold">{formData.logoText}</h2>
            </div>
            <div className="space-x-2">
              {formData.headerFields.map((field, index) => (
                <span key={index} className="block text-sm font-medium">{field}</span>
              ))}
            </div>
          </div>

          {/* Primary Field */}
          <div className="mb-4">
            <h3 className="text-lg font-bold">{formData.primaryField}</h3>
          </div>

          {/* Thumbnail */}
          <div className="mb-4">
            <img src={formData.thumbnail} alt="Thumbnail" className="h-20 w-20 rounded-lg" />
          </div>

          {/* Secondary Fields and Auxiliary Fields */}
          <div className="grid grid-cols-2 gap-4">
            {formData.secondaryFields.map((field, index) => (
              <div key={index} className="text-sm font-medium">
                {field}
              </div>
            ))}
            {formData.auxiliaryFields.map((field, index) => (
              <div key={index} className="text-sm font-medium">
                {field}
              </div>
            ))}
          </div>

          {/* Barcode */}
          <div className="mt-6 flex justify-center">
            <img src={formData.barcode} alt="Barcode" className="h-24 w-24" />
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6">Share Your Pass</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.primaryField}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 text-black rounded-lg"
                required
              />
            </div>

            {formData.headerFields.map((header, index) => (
            <div key={index}>
                <label className="block mb-2 text-sm font-medium">
                Email {index + 1}:
                </label>
                <input
                    type="text"
                    name="name"
                    value={header}
                    onChange={(e) => handleChange(e, index)}
                    className="w-full p-3 border text-black rounded-lg"
                    required
                />
                {index > 0 && <button type="button" onClick={() => rmHeaderField(index)}>
                    Remove
                </button>}
            </div>
            ))}

            <button
              type="button"
              onClick={addHeaderField}
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Add Header
            </button>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;