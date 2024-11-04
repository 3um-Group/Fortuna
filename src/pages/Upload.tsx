import React, { useState } from 'react';
import PlaceAutocomplete from 'src/components/Global/PlaceAutocomplete';
import FileUpload from 'src/components/Global/FileUpload';
import ContractPage from 'src/pages/ContractPage';

interface Location {
  display_name: string;
  lat: string;
  lon: string;
}

const MapWithUpload: React.FC = () => {
  const [locationSelected, setLocationSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [filesUploaded, setFilesUploaded] = useState(false); 

  const goToNextStep = () => {
    if (currentStep === 1 && locationSelected) {
      setCurrentStep(2);
    } else if (currentStep === 2 && filesUploaded) {
      setCurrentStep(3); 
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    } else if (currentStep === 3) {
      setCurrentStep(2);
    }
  };

  const handleLocationSelected = () => {
    setLocationSelected(true);
  };

  const handleFileUpload = (uploaded: boolean) => {
    setFilesUploaded(uploaded); 
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6">
     <ul className="steps steps-vertical mb-6">
  <li className={`step ${currentStep === 1 ? 'step-accent' : 'step-primary'}`}>
    Select Location
  </li>
  <li className={`step ${currentStep === 2 ? 'step-accent' : (currentStep > 1 ? 'step-primary' : '')}`}>
    Upload File
  </li>
  <li className={`step ${currentStep === 3 ? 'step-accent' : 'step-disabled'}`}>
    Contract
  </li>
</ul>

      {currentStep === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 1: Select Location</h2>
          <PlaceAutocomplete
            query={query}
            setQuery={setQuery}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            onLocationSelected={handleLocationSelected}
          />
          <button
            className={`mt-4 btn ${locationSelected ? 'btn-primary' : 'btn-disabled'}`}
            onClick={goToNextStep}
            disabled={!locationSelected}
          >
            Next
          </button>
        </div>
      )}

      {currentStep === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 2: Upload File</h2>
          <FileUpload onFileUpload={handleFileUpload} /> {/* Pass callback to FileUpload */}
          <div className="flex justify-between mt-4">
            <button className="btn btn-gray" onClick={goToPreviousStep}>
              Previous
            </button>
            <button
              className={`btn ${filesUploaded ? 'btn-primary' : 'btn-disabled'}`}
              onClick={goToNextStep}
              disabled={!filesUploaded}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 3: Contract</h2>
          <ContractPage />
          <div className="flex justify-between mt-4">
            <button className="btn btn-gray" onClick={goToPreviousStep}>
              Previous
            </button>
            <button className="btn btn-primary">
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapWithUpload;
