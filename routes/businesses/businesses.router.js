const express = require('express');
const { getLastInsertId } = require('../../db');
const { getBusiness, createBusiness } = require('./businesses.service');
const { asyncHandler } = require('../../utils/asyncHandler');

const businessesRouter = express.Router();

businessesRouter
    .get(
        '/:businessId'
        , asyncHandler( async ( req, res ) => {
            const businessId = req.params.businessId;
            const business = await getBusiness( businessId );

            if ( !business ) {
                return res.status( 404 ).json( { error: 'Business not found' } );
            }

            return res
                .status( 200 )
                .json( business )
        } )
    )
    .post(
        '/'
        , asyncHandler( async ( req, res ) => {
            const { name, addressLine1, addressLine2, city, state, zip } = req.body;

            if ( !name ) {
                return res.status( 400 ).json( { error: 'name is required' } );
            }

            await createBusiness( { name, addressLine1, addressLine2, city, state, zip } );

            const businessId = await getLastInsertId();
            const createdBusiness = await getBusiness( businessId );

            return res
                .status( 201 )
                .json( createdBusiness )
        } )
    );

module.exports = {
    businessesRouter
}
