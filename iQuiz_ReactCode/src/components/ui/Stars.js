import React from 'react';
import star from '../../assets/white-star.svg';
import './animate.css';

export default function Stars() {
  return (
    <div className='back '>
      <div className='contain grid1'>
        <div className='topl'>
          <img className='star' src={star} alt='' />
          <img className='star1' src={star} alt='' />
          <img className='star2' src={star} alt='' />
        </div>
        <img className='star1 middle' src={star} alt='' />
        <img className='star2 middle' src={star} alt='' />
        <div className='topr-right'>
          <img className='star' src={star} alt='' />
          <img className='star3' src={star} alt='' />
          <img className='star2' src={star} alt='' />
        </div>
      </div>
    </div>
  );
}
