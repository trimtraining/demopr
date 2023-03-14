using { demopr as my } from '../db/schema';

using demopr from '../db/schema';

@path : 'service/demopr'
service demoprService
{
    @odata.draft.enabled
    entity PurchaseOrders as
        projection on my.PurchaseOrders;

    function getpobystatus
    (
        poid : String(100)
    )
    returns many PurchaseOrders not null;

    action getaction
    (
        input : String(100)
    );
}

annotate demoprService with @requires :
[
    'authenticated-user'
];
