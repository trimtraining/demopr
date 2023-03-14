sap.ui.define(['sap/ui/core/mvc/ControllerExtension',
"sap/m/Dialog",
		"sap/m/DialogType",
		"sap/m/Text",
		"sap/m/Button",
		"sap/m/ButtonType",
		"sap/m/MessageToast",
		"sap/m/MessageBox"], function (ControllerExtension, Dialog, DialogType, Text, Button, ButtonType, MessageToast, MessageBox) {
	'use strict';

	return ControllerExtension.extend('com.demo.demoprui.ext.controller.ObjectPage', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf com.demo.demoprui.ext.controller.ObjectPage
             */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				this.fetchCSRFToken();
				
			},
			
			editFlow: {
			
				onBeforeCreate: function (mParameters) {
					console.log("in onBeforeCreate");
					return this._createDialog("Do you want to create ?");
				},
				onBeforeEdit: function (mParameters) {
					console.log("in onBeforeEdit");
				},
				onBeforeSave: function (mParameters) {
					console.log("in onBeforeSave");
					this._startWorkflow();
					// return this._createDialog("Do you want to create ?");
				},
				onBeforeDiscard: function (mParameters) {
					console.log("in onBeforeDiscard");
				},
				onBeforeDelete: function (mParameters) {
					console.log("in onBeforeDelete");
				}
			}},

			_startWorkflow:function(){
					// var startContext = this.getView().getModel("PO").getData();
					// startContext.RequestId = sPONumber;
					// startContext.BasicData.ponumber = sPONumber;
				   
					var workflowStartPayload = {
						"definitionId": "us10.9fe15efbtrial.testprocess.testprocess",
						"context": {
							"input": {
								"name": "test",
								"job": "se"
							}
						}
					};
				
					// var workflowStartPayload = {definitionId: "us10.9fe15efbtrial.testprocess.testprocess", context:{input: startContext}}
	
					var sPath = this.getModulePath()+"/bpmworkflowruntime/workflow/rest/v1/workflow-instances";
	
					
				   
					this.callRESTService(sPath, workflowStartPayload, "POST", this.TOKEN, function(){
						MessageBox.information("Workflow started with PO Number: "+sPONumber);
					});
				
				   
				
			},
			getModulePath: function(){
                var appId = this.base.getAppComponent().getManifestEntry("/sap.app/id");
                var appPath = appId.replaceAll(".", "/");
                return jQuery.sap.getModulePath(appPath);
                
            },  

			fetchCSRFToken : function (){
                var appModulePath = this.getModulePath();
                var that = this;
                $.ajax({
                    url: appModulePath + "/bpmworkflowruntime/workflow/rest/v1/xsrf-token",
                    async: false, 
                    method: "GET",
                    headers: {
                        "X-CSRF-Token": "Fetch"
                    },
                    success: function (result, xhr, data) {
                        this.TOKEN = data.getResponseHeader("X-CSRF-Token");
                        if (this.TOKEN === null) 
                            console.log("ERROR in fetching csrf token");
                    }.bind(this)
                });
            },            
			callRESTService : function(sPath, oPayload, sMethod, sCSRFToken,fnSuccess){
                $.ajax({
                    url: sPath,
                    type: sMethod,
                    data: JSON.stringify(oPayload),
                    headers: {
                        "X-CSRF-Token": sCSRFToken,
                        "Content-Type": "application/json"
                    },
                    async: false,
                    success: fnSuccess,
                    error: function (data) {
                         
                    }
                });
            },   

			_createDialog: async function (sText, fnAction) {
				return new Promise(function (fnResolve, fnReject) {
					var oApproveDialog = new Dialog({
						type: DialogType.Message,
						title: "Confirm",
						content: new Text({ text: sText }),
						beginButton: new Button({
							type: ButtonType.Emphasized,
							text: "Continue",
							press: function () {
								oApproveDialog.close();
								//call action if provided
								if (fnAction) {
									fnAction();
								}
								fnResolve();
							}
						}),
						endButton: new Button({
							text: "Cancel",
							press: function () {
								oApproveDialog.close();
								fnReject();
							}
						}),
						escapeHandler: (pCloseDialog) => {
							pCloseDialog.resolve();
							fnReject();
						}
					});
					oApproveDialog.open();
				});
			}
	});
});
