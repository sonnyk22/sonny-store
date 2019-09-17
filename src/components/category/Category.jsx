// ===============================================================================
// React
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// ===============================================================================
// Libs
import ReactPaginate from 'react-paginate';

// ===============================================================================
// Imported Features (Core)
import { CoreLogger as logger, CoreConstant } from '../../core';

// ===============================================================================
// Imported Features (Redux)
import * as cartDispatch from '../../redux/dispatches/cart.dispatch';
import * as productsDispatch from '../../redux/dispatches/product.dispatch';

// ===============================================================================
// Imported Styles
import './category.css';

//*********************************************************
const logPrefix = '[CategoryJsx]:';

//*********************************************************
//*****                  Components                   *****
//*********************************************************
class Category extends React.Component {

    //=========================================
    //=====         Event Handlers        =====
    //=========================================
    onAddToCart = product => {
        const fName = 'OnAddToCart()';
        logger.debug(`${logPrefix} ${fName}. Product param: `, product);

        this.props.actions.addToCart(product)
    }

    onPageClick = data => {
        const fName = 'OnPageClick()';
        logger.debug(`${logPrefix} ${fName}. Data param: `, data);

        const selected = data.selected;
        const offset = Math.ceil(selected * this.props.perPage);

        this.props.actions.loadNextPage(offset + 1, offset + 10);
    }

    //=========================================
    //=====             RENDER            =====
    //=========================================
    render() {
        logger.debug(`${logPrefix} Category(). Loaded Category Component.`);

        const { products } = this.props;

        //=====================================================
        return (
            <>
                {this.props.hasInternalError && <Redirect to='/error' /> }

                <div className="header-image">
                    <div className="header-block">

                        <div className="header-text">
                            <div className="header-text-title">
                                Best Cosmetics
                            </div>

                            <p>
                                Welcome to Sonny's Store<br/>
                                We carry many brands at the right prices. <br/> <br/>

                                This site is powered by Prudential Insurance Company, Roseland, New Jersey.
                            </p>
                        </div>

                    </div>
                </div>

                <div className="layout-container">
                    <div className="product-grid row">

                        {products.map(p => {
                            return (
                                <div key={p.id} className="col-md-4 col-sm-6">

                                    <div className="image-container">
                                        <div className="product-image"
                                            style={{backgroundImage: 'url(' + p.image + ')'}}>
                                        </div>

                                        <div className="overlay">
                                            <div className="button button-primary">
                                                View Details
                                            </div>

                                            <div className="button button-primary"
                                                 onClick={() => this.onAddToCart(p)}>

                                                Add To Cart
                                            </div>
                                        </div>
                                    </div>

                                    <div className="product-details">
                                        <div className="product-brand">{`${p.brand} (${p.id})`}</div>
                                        <div className="product-title">{p.title}</div>

                                        <div className="product-price">
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD'
                                            }).format(p.price)}
                                        </div>
                                    </div>

                                </div>
                            );
                        })}

                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-6">
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={this.props.pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={this.onPageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'} />
                    </div>
                </div>

            </>
        );
    }
}

//*********************************************************
//*****            Components Validations             *****
//*********************************************************
Category.propTypes = {
    products: PropTypes.array.isRequired
};

//*********************************************************
//*****                Redux Container                *****
//*********************************************************
function mapStateToProps(state) {
    const props = {
        hasInternalError: false,
        products: [],
        pageCount: CoreConstant.PageCount,
        perPage: CoreConstant.PerPage
    }

    if (!state) {
        return props;
    }

    if (state.hasOwnProperty('products')) {
        if (state.products.error) {
            props.hasInternalError = true;

            return props;
        }
    }

    props.products = state.products;

    return props;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            addToCart: bindActionCreators(cartDispatch.addToCart, dispatch),
            loadNextPage: bindActionCreators(productsDispatch.loadProducts, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);