// ===============================================================================
// React
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger } from '../../core';

// ===============================================================================
// Imported Features (Redux)
import * as cartDispatch from '../../redux/dispatches/cart.dispatch';

// ===============================================================================
// Imported Components
import { Topbar } from '../index'

// ===============================================================================
// Imported Styles
import './cart.css';

//*********************************************************
const logPrefix = '[CartJsx]:';

//*********************************************************
//*****            Components Validations             *****
//*********************************************************
Cart.propTypes = {
    props: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

//*********************************************************
//*****                  Components                   *****
//*********************************************************
function Cart({ props, actions }) {
    logger.debug(`${logPrefix} Cart(). Loaded Cart Component.`);

    //=========================================
    //=====         Event Handlers        =====
    //=========================================
    function onRemoveFromCart(product) {
        const fName = 'OnRemoveFromCart()';
        logger.debug(`${logPrefix} ${fName}. Product param: `, product);

        actions.deleteFromCart(product);
    }

    //=====================================================
    return (
        <>
            <Topbar></Topbar>

            <div className="cart-page-container">

                <div className="cart-page-header">
                    <h1>Shopping Cart</h1>
                </div>

                {props.cartList.length > 0 &&
                    <div className="cart-page-content" >

                        <div className="cart-item-header cart-item-row">
                            <div className="cart-item-cell cart-item-product">
                                <span>Product</span>
                            </div>

                            <div className="cart-item-cell cart-item-quantity">
                                <span>Quantity</span>
                            </div>

                            <div className="cart-item-cell cart-item-total">
                                <span>Total</span>
                            </div>

                            <div className="cart-item-cell cart-item-action">
                                <span>Action</span>
                            </div>
                        </div>

                        {props.cartList.map(c => {
                            return (
                                <div key={c.product.id} className="cart-item-row">
                                    <div className="cart-item-cell cart-item-product">
                                        <div className="cart-item-thumbnail"
                                             style={{ width: '50px',
                                                      height: '100px',
                                                      backgroundImage: 'url(' + c.product.image + ')' }}>
                                        </div>

                                        <div className="cart-item-info">
                                            <div className="cart-item-brand">{c.product.brand}}</div>
                                            <div className="cart-item-title">{c.product.title}}</div>
                                        </div>
                                    </div>

                                    <div className="cart-item-cell cart-item-quantity">
                                        {c.quantity}
                                    </div>

                                    <div className="cart-item-cell cart-item-total">
                                        <div className="item-price">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(c.quantity * c.product.price)}
                                        </div>
                                    </div>

                                    <div className="cart-item-cell cart-item-action">
                                        <div className="item-remove" onClick={() => onRemoveFromCart(c)}>
                                            X
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="row cart-total">
                            <div className="col-lg-offset-6">
                                <div className="cart-total-row row">
                                    <div className="col-md-6 cart-total-label">
                                        Cart overview
                                    </div>
                                    <div className="col-md-6 cart-total-value"></div>
                                </div>

                                <div className="cart-total-row row">
                                    <div className="col-md-6 cart-total-label">
                                        subtotal
                                    </div>

                                    <div className="col-md-6 cart-total-value">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(props.totalPrice)}
                                    </div>
                                </div>

                                <div className="cart-total-row row">
                                    <div className="col-md-6 cart-total-label">
                                        total
                                    </div>

                                    <div className="col-md-6 cart-total-value cart-total-price">
                                        {new Intl.NumberFormat('en-US', {
                                            style: 'currency',
                                            currency: 'USD'
                                        }).format(props.totalPrice)}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="cart-buttons">
                            <Link to="/" className="continue-shopping">continue shopping</Link>

                            <div className="checkout-button button button-primary button-large">
                                Checkout
                            </div>
                        </div>
                    </div>
                }

                {props.cartList.length === 0 &&
                    <div className="cart-page-content">
                        <h4>Your cart is empty.</h4>
                        <Link to="/">Go shopping</Link>
                    </div>
                }

            </div>
        </>
    );
}

//*********************************************************
//*****                Private Functions              *****
//*********************************************************
function _getTotalPrice(cartList) {
    let total = 0;

    if (cartList) {
        cartList.map(c => {
            total += (c.quantity * c.product.price);

            return c;
        });
    }

    return total;
}

//*********************************************************
//*****                Redux Container                *****
//*********************************************************
function mapStateToProps(state) {
    const props = {
        hasInternalError: false,
        cartList: []
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

    props.cartList = state.cart;
    props.totalPrice = _getTotalPrice(props.cartList);

    return {
        props: props
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            deleteFromCart: bindActionCreators(cartDispatch.deleteFromCart, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);