sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension.view.S3Custom", {
	onPressSWorkFlowLog: function (e) {
		// var t = e.getSource();
		if (!this._logDialog) {
			this._logDialog = sap.ui.xmlfragment(
				"cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension.view.LogDialog",
				this
			);
			this.getView().addDependent(this._logDialog);
		}
		var banfn = "";
		if (this.getView().getModel("detail").getProperty("/TaskTitle").split(" ").length == 1) {
			banfn = this.getView().getModel("detail").getProperty("/TaskTitle").split(" ")[0];
		} else {
			banfn = this.getView().getModel("detail").getProperty("/TaskTitle").split(" ")[1];
		}
		var filter = new sap.ui.model.Filter('Banfn', sap.ui.model.FilterOperator.EQ, banfn);
		this.getView().setBusy(true);
		this.getOwnerComponent().getModel("prapprovealmodel").read("/ApproversSet", {
			filters: [filter],
			success: function (oData) {
				this.getView().setBusy(false);
				if (oData.results.length > 0) {
					this.getView().setModel(new sap.ui.model.json.JSONModel(oData.results), "logModel");
				} else {
					this.getView().setModel(new sap.ui.model.json.JSONModel([]), "logModel");
				}
				this._logDialog.open();
			}.bind(this),
			error: function (oError) {
				this.getView().setBusy(false);
			}.bind(this)
		});
	},
	onOkComplete: function () {
		this._logDialog.close();
	},
	onPressSystemStatus: function (oEvent) {
		this.btn = oEvent.getSource();
		this.getView().setBusy(true);
		var banfn = "";
		if (this.getView().getModel("detail").getProperty("/TaskTitle").split(" ").length == 1) {
			banfn = this.getView().getModel("detail").getProperty("/TaskTitle").split(" ")[0];
		} else {
			banfn = this.getView().getModel("detail").getProperty("/TaskTitle").split(" ")[1];
		}
		this.getOwnerComponent().getModel("prapprovealmodel").read("/ApprovalStatusSet(Banfn='" + banfn + "')", {
			success: function (oData) {
				this.getView().setBusy(false);
				var actionSheet = new sap.m.ActionSheet({
					placement: "Top",
					title: "Status",
					buttons: new sap.m.Button({
						text: oData.Status,
						enbled: false
					})
				});
				actionSheet.openBy(this.btn);
			}.bind(this),
			error: function (oError) {
				this.getView().setBusy(false);
			}.bind(this)
		});
	},
	extHookChangeFooterButtons: function (objHdrFtr) {
		debugger
		sap.ui.getCore().byId("shellAppTitle").setText("My Inbox");
		var banfn = "";
		if (this.getView().getModel("detail").getProperty("/TaskTitle").split(" ").length == 1) {
			banfn = this.getView().getModel("detail").getProperty("/TaskTitle").split(" ")[0];
		} else {
			banfn = this.getView().getModel("detail").getProperty("/TaskTitle").split(" ")[1];
		}
		this.getOwnerComponent().getModel("prapprovealmodel").read("/PrheaderSet(Banfn='" + banfn + "')", {
			success: function (oData) {
				this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "AdditionalData");

			}.bind(this),
			error: function (oError) {}.bind(this)
		});
		objHdrFtr.aButtonList.push({
			onBtnPressed: function (oEvent) {
				this.onPressSWorkFlowLog(oEvent);
			}.bind(this),
			sI18nBtnTxt: "Approvers"
		});
		objHdrFtr.aButtonList.push({
			onBtnPressed: function (oEvent) {
				this.onPressSystemStatus(oEvent);
			}.bind(this),
			sI18nBtnTxt: "System Status"
		});
		debugger;
		if(this.oContext.getObject().Zbudgetstatus != ""){
			if(this.oContext.getObject().Zbudgetstatus.split("&")[3] == "F"){
				objHdrFtr.aButtonList.splice(0, 2);
			}
		}
		
	},
	sendAction: function (sFunctionImportName, oDecision, sNote) {
		debugger;
		var that = this;
		var sSuccessMessage;

		switch (sFunctionImportName) {
		case "Release":
			sSuccessMessage = "dialog.success.release";
			break;
		case "Claim":
			sSuccessMessage = "dialog.success.reserve";
			break;
		case "AddComment":
			sSuccessMessage = "dialog.success.addComment";
			break;
		case "Confirm":
			sSuccessMessage = "dialog.success.completed";
			break;
		case "CancelResubmission":
			sSuccessMessage = "dialog.success.cancelResubmission";
			break;
		default:
			sSuccessMessage = "dialog.success.complete";
		}

		switch (sFunctionImportName) {
		case 'AddComment':
			{
				var oItem = this.oModel2.getData();
				var oCommentsControl = this._getIconTabControl("Comments");
				this._setBusyIncdicatorOnDetailControls(oCommentsControl, true);
				this.oDataManager.addComment(oItem.SAP__Origin, oItem.InstanceID, sNote, jQuery.proxy(function (data, response) {

					// update the comments data and comments count 
					if (oItem.Comments && oItem.Comments.results) {
						oItem.Comments.results.push(data);
					} else {
						oItem.Comments = {
							results: [data]
						};
					}
					oItem.CommentsCount = oItem.Comments.results.length;
					this._setBusyIncdicatorOnDetailControls(oCommentsControl, false);
					this._updateDetailModel(oItem);

					jQuery.sap.delayedCall(500, this, function () {
						sap.ca.ui.message.showMessageToast(this.i18nBundle.getText(sSuccessMessage));
					});

					// update the counter on history tab
					//this.fnCountUpdater("ProcessingLogs", oItem.SAP__Origin, oItem.InstanceID);

				}, this), jQuery.proxy(function (oError) {
					this._setBusyIncdicatorOnDetailControls(oCommentsControl, false);
				}, this));

				break;
			}
		default:
			{
				this.oDataManager.sendAction(sFunctionImportName, oDecision, sNote,
					jQuery.proxy(function (oData) {
						jQuery.sap.delayedCall(500, this, function () {
							sap.m.MessageBox.success(this.i18nBundle.getText(sSuccessMessage), {
								onClose: function () {
									this.getView().getModel().refresh();
								}.bind(this)
							});
						});
					}, this, oDecision)
				);
			}
		}
	},
});