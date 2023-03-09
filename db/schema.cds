namespace demopr;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    extensible,
    managed,
    temporal
}
from '@sap/cds/common';

entity PurchaseOrders
{
    key ID : UUID
        @Core.Computed;
    RequestId : String(100);
    VendorCode : String(100);
    CompanyCode : String(100);
    PurchaseGroup : String(100);
    PurchaseOrg : String(100);
    Status : String(100);
    items : Composition of many Items on items.purchaseOrders = $self;
}

entity Items
{
    key ID : UUID
        @Core.Computed;
    MaterialCode : String(100);
    MaterialDesc : String(100);
    Quantity : Integer;
    Price : Decimal(7,2);
    purchaseOrders : Association to one PurchaseOrders;
}
