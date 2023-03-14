const { APPGYVERFUNCTIONS } = require('@sap/low-code-event-handler/functions');

/**
 * @param {Object} context - The root parameter for each application logic
 * @param {Object} context.request - User information, tenant-specific CDS model, headers and query parameters
 * to generate po id
 * @Before(event = { "CREATE" }, entity = "demoprService.PurchaseOrders")
 * @param {Object} [context.results] - For the After phase only: the result of the event processing
 */
module.exports = async function(context) {
	let data = null;
	data = context.request.data;
	data.RequestId = 'PR0009';
	data.Status = 'Open';
};
