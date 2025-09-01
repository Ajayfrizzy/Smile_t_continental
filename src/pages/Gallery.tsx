import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  description: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      title: 'Luxury Suite',
      category: 'rooms',
      description: 'Our premium luxury suite with panoramic city views'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      title: 'Hotel Exterior',
      category: 'exterior',
      description: 'Beautiful exterior architecture of Hotel Grandeur'
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      title: 'Fine Dining Restaurant',
      category: 'restaurant',
      description: 'Elegant dining experience with world-class cuisine'
    },
    {
      id: '4',
      image: 'https://images.pexels.com/photos/271694/pexels-photo-271694.jpeg',
      title: 'Infinity Pool',
      category: 'facilities',
      description: 'Rooftop infinity pool with stunning views'
    },
    {
      id: '5',
      image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
      title: 'Deluxe Room',
      category: 'rooms',
      description: 'Comfortable and elegantly designed deluxe room'
    },
    {
      id: '6',
      image: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg',
      title: 'Spa & Wellness',
      category: 'facilities',
      description: 'Relaxing spa treatments and wellness facilities'
    },
    {
      id: '7',
      image: 'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg',
      title: 'Wedding Reception',
      category: 'events',
      description: 'Perfect venue for weddings and special events'
    },
    {
      id: '8',
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      title: 'Business Center',
      category: 'facilities',
      description: 'Modern business center and meeting facilities'
    }
  ];

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'rooms', label: 'Rooms' },
    { value: 'facilities', label: 'Facilities' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'exterior', label: 'Exterior' },
    { value: 'events', label: 'Events' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;
    
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredItems[newIndex]);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Gallery</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the beauty and elegance of Hotel Grandeur through our curated collection of images
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openLightbox(item)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm opacity-90">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage.image}
              alt={selectedImage.title}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Info */}
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-lg opacity-90">{selectedImage.description}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;