import React, { useState } from 'react';
import type { Property } from '../types';

interface AdminDashboardProps {
    onSignOut: () => void;
    onNavigateHome: () => void;
    properties: Property[];
    onAddProperty: (property: Omit<Property, 'id'>) => void;
    onUpdateProperty: (property: Property) => void;
    onDeleteProperty: (id: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSignOut, onNavigateHome, properties, onAddProperty, onUpdateProperty, onDeleteProperty }) => {
    const initialFormState = {
        name: '',
        address: '',
        price: '',
        beds: '',
        baths: '',
        area: '',
        description: '',
        images: [] as string[],
    };
    const [newProperty, setNewProperty] = useState(initialFormState);
    const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProperty(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            // FIX: Explicitly type 'file' as File to resolve type inference issue. The error "Argument of type 'unknown' is not assignable to parameter of type 'Blob'" suggests a type inference issue.
            const imagePromises = files.map((file: File) => {
                return new Promise<string>((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        if (typeof reader.result === 'string') {
                            resolve(reader.result);
                        } else {
                            reject('Failed to read file');
                        }
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagePromises).then(base64Images => {
                setNewProperty(prevState => ({ ...prevState, images: [...prevState.images, ...base64Images] }));
            }).catch(error => {
                console.error("Error reading files:", error);
                alert("There was an error uploading the images.");
            });
        }
    };
    
    const handleRemoveImage = (indexToRemove: number) => {
      setNewProperty(prevState => ({
        ...prevState,
        images: prevState.images.filter((_, index) => index !== indexToRemove)
      }));
    };

    const handleEditClick = (property: Property) => {
      setEditingPropertyId(property.id);
      setNewProperty({
        name: property.name,
        address: property.address,
        price: String(property.price),
        beds: String(property.beds),
        baths: String(property.baths),
        area: String(property.area),
        description: property.description,
        images: property.images,
      });
      const formElement = document.getElementById('property-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const handleCancelEdit = () => {
        setNewProperty(initialFormState);
        setEditingPropertyId(null);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Basic validation
        const requiredFields: (keyof typeof newProperty)[] = ['name', 'address', 'price', 'beds', 'baths', 'area', 'description'];
        for (const key of requiredFields) {
            if (String(newProperty[key]).trim() === '') {
                // FIX: Explicitly convert `key` to a string to prevent potential runtime errors if `key` was ever inferred as a symbol.
                alert(`Please fill in the '${String(key)}' field.`);
                return;
            }
        }
        if (newProperty.images.length === 0) {
            alert('Please upload at least one picture for the property.');
            return;
        }
        
        const propertyData = {
          name: newProperty.name,
          address: newProperty.address,
          price: parseFloat(newProperty.price),
          beds: parseInt(newProperty.beds, 10),
          baths: parseInt(newProperty.baths, 10),
          area: parseInt(newProperty.area, 10),
          description: newProperty.description,
          images: newProperty.images,
        };

        if (editingPropertyId) {
            onUpdateProperty({ ...propertyData, id: editingPropertyId });
        } else {
            onAddProperty(propertyData);
        }

        // Reset form and editing state
        setNewProperty(initialFormState);
        setEditingPropertyId(null);
    };


    return (
        <div className="min-h-screen bg-hit-light-gray">
            <header className="bg-white shadow">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <h1 className="text-2xl font-bold text-hit-dark font-heading">Admin Dashboard</h1>
                        <div>
                            <button
                                onClick={onNavigateHome}
                                className="font-medium text-hit-gray hover:text-hit-red transition-colors mr-6"
                            >
                                View Site
                            </button>
                            <button
                                onClick={onSignOut}
                                className="px-5 py-2 bg-hit-dark text-white rounded-md font-semibold hover:bg-gray-700 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h2 className="text-3xl font-bold text-hit-dark font-heading mb-4">Welcome, Admin!</h2>
                    <p className="text-hit-gray">Manage properties from this dashboard. Add new listings, edit existing ones, or remove them.</p>
                </div>
                 
                {/* Add/Edit Property Form */}
                <div id="property-form" className="bg-white p-8 rounded-lg shadow-md mb-8">
                    <h3 className="text-2xl font-bold text-hit-dark font-heading mb-6">{editingPropertyId ? 'Edit Property' : 'Add New Property'}</h3>
                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="name" className="block text-sm font-medium text-hit-gray mb-1">Property Name</label>
                          <input type="text" name="name" id="name" value={newProperty.name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="address" className="block text-sm font-medium text-hit-gray mb-1">Address</label>
                          <input type="text" name="address" id="address" value={newProperty.address} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red" />
                        </div>
                         <div>
                          <label htmlFor="price" className="block text-sm font-medium text-hit-gray mb-1">Price ($)</label>
                          <input type="number" name="price" id="price" value={newProperty.price} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red" />
                        </div>
                        <div>
                          <label htmlFor="area" className="block text-sm font-medium text-hit-gray mb-1">Area (sqft)</label>
                          <input type="number" name="area" id="area" value={newProperty.area} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red" />
                        </div>
                        <div>
                          <label htmlFor="beds" className="block text-sm font-medium text-hit-gray mb-1">Beds</label>
                          <input type="number" name="beds" id="beds" value={newProperty.beds} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red" />
                        </div>
                         <div>
                          <label htmlFor="baths" className="block text-sm font-medium text-hit-gray mb-1">Baths</label>
                          <input type="number" name="baths" id="baths" value={newProperty.baths} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red" />
                        </div>
                        <div className="md:col-span-2">
                          <label htmlFor="images" className="block text-sm font-medium text-hit-gray mb-1">Property Pictures</label>
                          <input type="file" name="images" id="images" onChange={handleImageChange} multiple accept="image/*" className="w-full text-sm text-hit-gray file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-hit-red hover:file:bg-red-100" />
                          <p className="text-xs text-hit-gray mt-1">Upload one or more images. The first image will be the main display picture.</p>
                        </div>
                         {newProperty.images.length > 0 && (
                          <div className="md:col-span-2">
                              <label className="block text-sm font-medium text-hit-gray mb-2">Image Preview</label>
                              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                  {newProperty.images.map((imgSrc, index) => (
                                      <div key={index} className="relative group">
                                          <img src={imgSrc} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-md" />
                                          <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-hit-red text-white rounded-full p-1 leading-none text-xs w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                                      </div>
                                  ))}
                              </div>
                          </div>
                        )}
                        <div className="md:col-span-2">
                          <label htmlFor="description" className="block text-sm font-medium text-hit-gray mb-1">Description</label>
                          <textarea name="description" id="description" value={newProperty.description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-hit-red focus:border-hit-red"></textarea>
                        </div>
                        <div className="md:col-span-2 text-right space-x-4">
                           {editingPropertyId && (
                             <button type="button" onClick={handleCancelEdit} className="px-8 py-3 bg-gray-200 text-hit-dark rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                               Cancel Edit
                             </button>
                           )}
                           <button type="submit" className="px-8 py-3 bg-hit-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors">
                            {editingPropertyId ? 'Update Property' : 'Save New Property'}
                           </button>
                        </div>
                    </form>
                </div>

                {/* Property List */}
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold text-hit-dark font-heading mb-6">Property Listings</h3>
                    <div className="space-y-4">
                        {properties.length > 0 ? properties.map(property => (
                            <div key={property.id} className="flex flex-col md:flex-row items-center justify-between p-4 border rounded-lg gap-4">
                                <div className="flex items-center gap-4 w-full">
                                    <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://placehold.co/100x100?text=No+Image'} alt={property.name} className="w-24 h-24 object-cover rounded-md flex-shrink-0"/>
                                    <div className="flex-grow min-w-0">
                                        <p className="font-bold text-hit-dark truncate">{property.name}</p>
                                        <p className="text-sm text-hit-gray truncate">{property.address}</p>
                                        <p className="text-sm font-semibold text-hit-red">${property.price.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-shrink-0 w-full md:w-auto">
                                    <button
                                        onClick={() => handleEditClick(property)}
                                        className="flex-1 md:flex-initial px-4 py-2 bg-blue-100 text-blue-700 rounded-md font-semibold hover:bg-blue-200 transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDeleteProperty(property.id)}
                                        className="flex-1 md:flex-initial px-4 py-2 bg-red-100 text-hit-red rounded-md font-semibold hover:bg-red-200 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <p className="text-hit-gray text-center py-4">No properties found. Add one using the form above.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;