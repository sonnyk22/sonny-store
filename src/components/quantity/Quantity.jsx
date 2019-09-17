// ===============================================================================
// React
import React from 'react';
import PropTypes from 'prop-types';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

// ===============================================================================
// Imported Styles
import './quantity.css';

//*********************************************************
const logPrefix = '[QuantityJsx]:';

//*********************************************************
//*****            Components Validations             *****
//*********************************************************
Quantity.propTypes = {
    quantity: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
};

//*********************************************************
//*****                  Components                   *****
//*********************************************************
export default function Quantity({ quantity, onChange }) {
    logger.debug(`${logPrefix} Quantity(). Loaded Quantity Component.`);

    //=========================================
    //=====         Event Handlers        =====
    //=========================================
    function plusOne() {
        if (quantity < 1000) {
            quantity++;
            onChange(quantity);
        }
    };

    function minusOne() {
        if (quantity > 1) {
            quantity--;
            onChange(quantity);
        }
    }

    //=====================================================
    return (
        <>
            <div className="number">
                <span className="input-style">{quantity}&nbsp;&nbsp;</span>
            </div>

            <div className="actions">
                <div onClick={() => plusOne()} className="noselect">+</div>
                <div onClick={() => minusOne()} className="noselect">-</div>
            </div>
        </>
    );
}