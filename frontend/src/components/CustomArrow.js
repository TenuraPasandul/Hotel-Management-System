import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';

const CustomArrow = ({ className, style, onClick, arrow, currentSlide, slideCount, isNext }) => {
  // Hide arrow based on currentSlide and slideCount
  const isHidden = isNext ? currentSlide === slideCount - 1 : currentSlide === 0;
  
  return !isHidden ? (
    <img
      src={arrow}
      className={`${className}`}
      style={{ 
        ...style, 
        display: 'block', 
        width: '8%', 
        height: '12%',
        cursor: 'pointer' 
      }} 
      onClick={onClick}
      alt="arrow"
      title="arrow"
    />
  ) : null;
};

CustomArrow.propTypes = {
  className: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  arrow: PropTypes.string.isRequired,
  currentSlide: PropTypes.number.isRequired,
  slideCount: PropTypes.number.isRequired,
  isNext: PropTypes.bool.isRequired,
};

export default CustomArrow;
