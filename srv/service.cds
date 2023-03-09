using { demopr as my } from '../db/schema';

using demopr from '../db/schema';

@path : 'service/demopr'
service demoprService
{
    @odata.draft.enabled
    entity PurchaseOrders as
        projection on my.PurchaseOrders;
}

annotate demoprService with @requires :
[
    'authenticated-user'
];
