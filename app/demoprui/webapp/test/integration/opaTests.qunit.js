sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/demo/demoprui/test/integration/FirstJourney',
		'com/demo/demoprui/test/integration/pages/PurchaseOrdersList',
		'com/demo/demoprui/test/integration/pages/PurchaseOrdersObjectPage'
    ],
    function(JourneyRunner, opaJourney, PurchaseOrdersList, PurchaseOrdersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/demo/demoprui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePurchaseOrdersList: PurchaseOrdersList,
					onThePurchaseOrdersObjectPage: PurchaseOrdersObjectPage
                }
            },
            opaJourney.run
        );
    }
);