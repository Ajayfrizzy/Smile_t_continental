import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, MapPin, Camera, Instagram, Facebook, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const Landing: React.FC = () => {
  const featuredGallery = [
    {
      id: '1',
      image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg',
      title: 'Luxury Suite',
      category: 'rooms'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      title: 'Hotel Exterior',
      category: 'exterior'
    },
    {
      id: '3',
      image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg',
      title: 'Restaurant',
      category: 'restaurant'
    },
    {
      id: '4',
      image: 'https://images.pexels.com/photos/271694/pexels-photo-271694.jpeg',
      title: 'Pool Area',
      category: 'facilities'
    }
  ];

  const testimonials = [
    {
      id: '1',
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely stunning hotel with exceptional service. The rooms are beautiful and the staff is incredibly friendly.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
    },
    {
      id: '2',
      name: 'Michael Chen',
      rating: 5,
      comment: 'Perfect location and amazing amenities. The restaurant serves delicious food and the spa is very relaxing.',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
    },
    {
      id: '3',
      name: 'Emily Davis',
      rating: 5,
      comment: 'Had the most wonderful stay here. Everything was perfect from check-in to check-out. Highly recommended!',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
    }
  ];

  const socialMedia = [
    { platform: 'Instagram', icon: Instagram, handle: '@hotelgrandeur', followers: '12.5K' },
    { platform: 'Facebook', icon: Facebook, handle: 'Hotel Grandeur', followers: '8.2K' },
    { platform: 'Twitter', icon: Twitter, handle: '@grandeurhotel', followers: '5.1K' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg)'
          }}
        />
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Hotel Grandeur
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Experience luxury, comfort, and exceptional service in the heart of the city
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/rooms">
              <Button size="lg" className="w-full sm:w-auto">
                Book Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900">
                View Gallery
                <Camera className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Take a glimpse into the luxury and beauty that awaits you at Hotel Grandeur
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredGallery.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
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
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.category}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/gallery">
              <Button variant="outline" size="lg">
                View Full Gallery
                <Camera className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Guests Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied guests
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Connect With Us</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Follow us on social media for the latest updates, special offers, and behind-the-scenes content
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {socialMedia.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.div
                  key={social.platform}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition-all duration-300"
                >
                  <Icon className="w-12 h-12 text-white mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{social.platform}</h3>
                  <p className="text-blue-100 mb-2">{social.handle}</p>
                  <p className="text-sm text-blue-200">{social.followers} followers</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center">
            <Link to="/social">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Follow Us
                <Users className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;