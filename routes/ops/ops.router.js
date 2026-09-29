const express = require('express');
const { getLastInsertId } = require('../../db');
const { getOp, createOp } = require('./ops.service');
const { asyncHandler } = require('../../utils/asyncHandler');

const opsRouter = express.Router();

opsRouter
    .get(
        '/:opId'
        , asyncHandler( async ( req, res ) => {
            const opId = req.params.opId;
            const op = await getOp( opId );

            if ( !op ) {
                return res.status( 404 ).json( { error: 'Op not found' } );
            }

            return res
                .status( 200 )
                .json( op )
        } )
    )
    .post(
        '/'
        , asyncHandler( async ( req, res ) => {
            const { operatorId, businessId, title, pay, startTime, endTime } = req.body;

            if ( !operatorId || !businessId ) {
                return res.status( 400 ).json( { error: 'operatorId and businessId are required' } );
            }

            await createOp( { operatorId, businessId, title, pay, startTime, endTime } );

            const opId = await getLastInsertId();
            const createdOp = await getOp( opId );

            return res
                .status( 201 )
                .json( createdOp )
        } )
    );

module.exports = {
    opsRouter
}
