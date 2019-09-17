// ===============================================================================
// React
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

// ===============================================================================
// Imported Styles
import './topbar.css';

//*********************************************************
const logPrefix = '[TopbarJsx]:';

//*********************************************************
//*****            Components Validations             *****
//*********************************************************
Topbar.propTypes = {
    props: PropTypes.object.isRequired
};

//*********************************************************
//*****                  Components                   *****
//*********************************************************
function Topbar({ props }) {
    logger.debug(`${logPrefix} Topbar(). Loaded Topbar Component.`);

    //=====================================================
    return (
        <div className="main-header navbar-fixed-top">

            <div className="header-menu">
                <div className="header-mobile-nav-wrapper">
                    <button type="button" className="navbar-toggle">
                        <span className="fa fa-bars fa-2x"></span>
                    </button>
                </div>

                <div className="header-logo-wrapper">
                    <img className="header-logo-image"
                         src="/static/img/logo.png"
                         alt="Sonny Store" />
                </div>

                <div className="header-nav-wrapper">
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <Link to="/">HOME</Link>
                        </li>

                        <li className="header-nav-item">
                            <Link to="/">
                                SHOP <span className="fa fa-caret-down"></span>
                            </Link>
                        </li>

                        <li className="header-nav-item">
                            <Link to="/">JOURNAL</Link>
                        </li>

                        <li className="header-nav-item">
                            <Link to="/">
                                MORE <span className="fa fa-caret-down"></span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="header-cart-wrapper">
                    <div className="header-cart">
                        <div className="header-cart-item">
                            <Link to="/cart">
                                MY CART
                                <span>({props.cartTotal})</span>
                                <span className="fa fa-caret-down"></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

//*********************************************************
//*****                Redux Container                *****
//*********************************************************
function mapStateToProps(state) {
    const props = {
        hasInternalError: false,
        cartTotal: 0
    }

    if (!state) {
        return props;
    }

    if (state.hasOwnProperty('cart')) {
        if (state.cart.error) {
            props.hasInternalError = true;

            return props;
        }
    }

    props.cartTotal = state.cart.length;

    return {
        props: props
    };
}


export default connect(mapStateToProps)(Topbar);