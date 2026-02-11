import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description, features, link, gradient }) => {
  return (
    <div className="card group">
      {/* Icon with gradient background */}
      <div className={`inline-flex p-4 rounded-lg mb-4 bg-gradient-to-br ${gradient}`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-300 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Features List (if provided) */}
      {features && features.length > 0 && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2 text-gray-400">
              <span className="text-primary-500 mt-1">•</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Link (if provided) */}
      {link && (
        <Link
          to={link}
          className="inline-flex items-center space-x-2 text-primary-500 hover:text-secondary-500 font-medium transition-colors mt-auto"
        >
          <span>Learn More</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
