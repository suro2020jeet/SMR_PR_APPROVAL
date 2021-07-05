sap.ui.controller("cross.fnd.fiori.inbox.CA_FIORI_INBOXExtension.view.S2Custom", {
	aSelectProperties: [
		"SAP__Origin",
		"InstanceID",
		"TaskDefinitionID",
		"TaskDefinitionName",
		"TaskTitle",
		"CreatedByName",
		"CreatedBy",
		"CompletionDeadLine",
		"SubstitutedUserName",
		"Status",
		"Priority",
		"PriorityNumber",
		"HasComments",
		"HasAttachments",
		"HasPotentialOwners",
		"CreatedOn",
		"TaskSupports",
		"SupportsClaim",
		"SupportsRelease",
		"SupportsForward",
		"SupportsComments",
		"SupportsAttachments",
		"Zbudgetstatus",
		"Ztotalprvalue",
		// "key1",
		// "value1",
		// "key2",
		// "value2",
		// "key3",
		// "value3",
		// "key4",
		// "value4",
		// "key5",
		// "value5"
	],
	setBudgetStatus: function (sValue) {
		sValue = sValue.split("&")[0];
		if (sValue == "Budgeted") {
			return "Success";
		} else if (sValue == "Over Budgeted") {
			return "Warning";
		} else {
			return "Error";
		}
	},
	setBudgetStatusText: function (sValue) {
		debugger;
		if (sValue != null && sValue != undefined && sValue != "") {
			return sValue.split("&")[0];
		} else {
			return sValue;
		}
	},
	setPrTypeststusText: function (sValue) {
		debugger;
		if (sValue != null && sValue != undefined && sValue != "") {
			if (sValue.split("&")[3] == 'N') {
				return "Normal";
			} else {
				return "Forward";
			}
		} else {
			return sValue;
		}
	},
	setPRTypeText: function (sValue) {
		if (sValue != null && sValue != undefined && sValue != "") {
			return sValue.split("&")[1];
		} else {
			return sValue;
		}
	},
	setCreatedByTextText: function (sValue) {
		if (sValue != null && sValue != undefined && sValue != "") {
			return sValue.split("&")[2];
		} else {
			return sValue;
		}
	},
	getAllFilters: function (oAdditionalFilter) {
		var aFilters = [];
		var oScenarioConfig = this.oDataManager.getScenarioConfig();
		var bAllItems = oScenarioConfig.AllItems;
		var oModel = this.getView().getModel();
		if (bAllItems) {
			aFilters = this.getFiltersWithoutScenario(oModel);

		} else {
			aFilters = this.getFiltersWithScenario(oModel);
		}
		if (oAdditionalFilter)
			aFilters.push(oAdditionalFilter);

		//add status filter
		var aStatusFilterKeys = oModel.aStatusFilterKeys;
		var statusFilters = cross.fnd.fiori.inbox.util.TaskStatusFilterProvider.getAllFilters(this.oDataManager.bOutbox, aStatusFilterKeys,
			aFilters);
		aFilters.push(new sap.ui.model.Filter(statusFilters, false));
		if (aFilters.length == 1) {
			aFilters.push(new sap.ui.model.Filter({
				path: "TaskDefinitionID",
				operator: sap.ui.model.FilterOperator.EQ,
				value1: 'TS20000159'
			}));
		}

		return [new sap.ui.model.Filter(aFilters, true)];
	},
	sendMultiSelectActionEnd: function (a, e) {
		if (this.oDataManager.getPagingEnabled()) {
			this.oDataManager.oModel.refresh();
		}
		this.dismissMultiSelect();
		this.getView().getModel().bFullRefreshNeeded = true;
		this.getView().getModel().refresh();
	},
});