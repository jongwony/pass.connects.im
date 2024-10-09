import React from 'react';

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

interface PassLayoutProps {
  formData: FormData;
}

const PassLayout: React.FC<PassLayoutProps> = ({ formData }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
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
  );
};

export default PassLayout;