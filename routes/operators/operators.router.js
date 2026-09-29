const express = require('express');
const { getLastInsertId } = require('../../db');
const { getOperator, createOperator } = require('./operators.service');
const { getSchedulesByOperatorId } = require('../schedules');
const { asyncHandler } = require('../../utils/asyncHandler');

const operatorsRouter = express.Router();

operatorsRouter
    .get(
        '/:operatorId'
        , asyncHandler( async ( req, res ) => {
            const operatorId = req.params.operatorId;
            const operator = await getOperator( operatorId );

            if ( !operator ) {
                return res.status( 404 ).json( { error: 'Operator not found' } );
            }

            return res
                .status( 200 )
                .json( operator )
        } )
    )
    .get(
        '/:operatorId/schedules'
        , asyncHandler( async ( req, res ) => {
            const operatorId = req.params.operatorId;
            const schedules = await getSchedulesByOperatorId( operatorId );

            return res
                .status( 200 )
                .json( schedules )
        } )
    )
    .post( 
        '/'
        , asyncHandler( async ( req, res ) => {
            const { firstName, lastName } = req.body;

            if ( !firstName || !lastName ) {
                return res.status( 400 ).json( { error: 'firstName and lastName are required' } );
            }

            await createOperator( { firstName, lastName } );

            const operatorId = await getLastInsertId();
            const createdOperator = await getOperator( operatorId );

            return res
                .status( 201 )
                .json( createdOperator )
        } )
    );

module.exports = {
    operatorsRouter
}
