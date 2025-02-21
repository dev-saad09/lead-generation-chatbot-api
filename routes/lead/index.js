const express = require("express");
const logger = require("../../logger");
const authenticate = require("../../middlewares/authenticate.middleware");
const router = express.Router();
const routerController = require("./lead.controller");

/**
 * @route POST /leads
 * @desc Add a new lead
 * @access Private
 */
router.post(
    "/",
    authenticate(),
    async (req, res, next) => {
    /*
      #swagger.tags = ['Leads']
      #swagger.description = 'Add a new lead.'
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          name: { type: 'string' },
                          email: { type: 'string', format: 'email' },
                          cellno: { type: 'string' },
                          address: { type: 'string' },
                          city: { type: 'string' },
                          language: { type: 'string' },
                          systemType: { type: 'string' },
                          units: { type: 'integer' },
                          billAmount: { type: 'integer' },
                          totalArea: { type: 'integer' },
                          billType: { type: 'string' },
                          billImage: { type: 'string' },
                          agentId: { type: 'string', format: 'uuid' },
                          status: { type: 'string', enum: ['New Inquiry', 'Qualified Prospect', 'Referral Lead', 'Meeting Scheduled', 'Proposal Sent', 'In Negotiation', 'Closed - Won', 'Closed - Lost'] }
                      },
                      required: ['name', 'email', 'cellno', 'address', 'city', 'language', 'systemType', 'units', 'billAmount', 'totalArea', 'billType', 'billImage', 'agentId']
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'Lead created successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }

      }
  */
        logger.info({
            user: req.user,
            body: req.body,
            method: "POST /leads"
        });

        const result = await routerController.addLead(req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route GET /leads
 * @desc Get all leads
 * @access Private
 */
router.get(
    "/",
    authenticate(),
    async (req, res, next) => {
    /*
      #swagger.tags = ['Leads']
      #swagger.description = 'Get all leads.'
      #swagger.responses[200] = {
          description: 'Leads retrieved successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseArray' } } }
      }
    */
        logger.info({
            user: req.user,
            method: "GET /leads"
        });

        const result = await routerController.getLeads();

        return res.status(200).json(result);
    }
);

/**
 * @route GET /leads/:id
 * @desc Get lead by ID
 * @access Private
 */
router.get(
    "/:id",
    authenticate(),
    async (req, res, next) => {
    /*
      #swagger.tags = ['Leads']
      #swagger.description = 'Get lead by ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Lead ID',
          required: true,
          type: 'string',
          format: 'uuid'
      }
      #swagger.responses[200] = {
          description: 'Lead retrieved successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
        logger.info({
            user: req.user,
            params: req.params,
            method: "GET /leads/:id"
        });

        const result = await routerController.getLeadById(req.params.id);

        return res.status(200).json(result);
    }
);

/**
 * @route PUT /leads/:id
 * @desc Update lead by ID
 * @access Private
 */
router.put(
    "/:id",
    authenticate(),
    async (req, res, next) => {
    /*
      #swagger.tags = ['Leads']
      #swagger.description = 'Update lead by ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Lead ID',
          required: true,
          type: 'string',
          format: 'uuid'
      }
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: 'object',
                      properties: {
                          name: { type: 'string' },
                          email: { type: 'string', format: 'email' },
                          cellno: { type: 'string' },
                          address: { type: 'string' },
                          city: { type: 'string' },
                          language: { type: 'string' },
                          systemType: { type: 'string' },
                          units: { type: 'integer' },
                          billAmount: { type: 'integer' },
                          totalArea: { type: 'integer' },
                          billType: { type: 'string' },
                          billImage: { type: 'string' },
                          agentId: { type: 'string', format: 'uuid' },
                          status: { type: 'string', enum: ['New Inquiry', 'Qualified Prospect', 'Referral Lead', 'Meeting Scheduled', 'Proposal Sent', 'In Negotiation', 'Closed - Won', 'Closed - Lost'] }
                      }
                  }
              }
          }
      }
      #swagger.responses[200] = {
          description: 'Lead updated successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
        logger.info({
            user: req.user,
            params: req.params,
            body: req.body,
            method: "PUT /leads/:id"
        });

        const result = await routerController.updateLead(req.params.id, req.body);

        return res.status(200).json(result);
    }
);

/**
 * @route DELETE /leads/:id
 * @desc Delete lead by ID
 * @access Private
 */
router.delete(
    "/:id",
    authenticate(),
    async (req, res, next) => {
    /*
      #swagger.tags = ['Leads']
      #swagger.description = 'Delete lead by ID.'
      #swagger.parameters['id'] = {
          in: 'path',
          description: 'Lead ID',
          required: true,
          type: 'string',
          format: 'uuid'
      }
      #swagger.responses[200] = {
          description: 'Lead deleted successfully.',
          content: { "application/json": { schema: { $ref: '#/definitions/responseObject' } } }
      }
    */
        logger.info({
            user: req.user,
            params: req.params,
            method: "DELETE /leads/:id"
        });

        const result = await routerController.deleteLead(req.params.id);

        return res.status(200).json(result);
    }
);

module.exports = router;
