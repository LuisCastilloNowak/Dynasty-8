
import React from 'react';
import { Property } from '../types';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/catalog/${property.id}`} className="group block relative overflow-hidden bg-neutral-900 rounded-2xl shadow-2xl border border-white/5 hover:border-brand-green-border transition-colors">
      <div className="aspect-[4/5] overflow-hidden rounded-2xl">
        <img 
          src={property.imageUrl} 
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-6 transition-transform duration-500 transform translate-y-2 group-hover:translate-y-0">
        <div className="flex justify-between items-end">
          <div>
            <span className="brand-green-text text-xs tracking-widest uppercase mb-1 block font-bold">{property.type}</span>
            <h3 className="font-serif text-xl text-white mb-2">{property.title}</h3>
            <p className="text-white/60 text-sm">{property.location}</p>
          </div>
          <div className="text-right">
            <p className="brand-yellow-text font-serif text-xl font-bold">
              {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(property.price)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;