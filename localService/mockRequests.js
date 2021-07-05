/*
 * Copyright (C) 2009-2018 SAP SE or an SAP affiliate company. All rights reserved.
 */
jQuery.sap.declare("cross.fnd.fiori.inbox.model.mockRequests");jQuery.sap.registerModulePath("cross.fnd.fiori.inbox","./");jQuery.sap.require("cross.fnd.fiori.inbox.model.MyInboxMockServerData");cross.fnd.fiori.inbox.model.mockRequests={};cross.fnd.fiori.inbox.model.mockRequests.getRequests=function(){var e=[];e.push(cross.fnd.fiori.inbox.model.mockRequests.mockDecisionOptionFuntionImport());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockDecisionFuntionImport());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockClaimKamal());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockDecisionFuntionImportReject());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockClaimDavid());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockClaimManna());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockReleaseManna());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockReleaseKamal());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockResubmit());e.push(cross.fnd.fiori.inbox.model.mockRequests.mockSerchUsers());return e};cross.fnd.fiori.inbox.model.mockRequests.mockDecisionOptionFuntionImport=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"GET",path:new RegExp("(DecisionOptions)/?(.*)?"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.decisionOptionsData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.decisionOptionsData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockDecisionFuntionImport=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Decision)/?(.*)?(.*)DecisionKey='Approve'?(.*)"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.decisionData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.decisionData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockDecisionFuntionImportReject=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Decision)/?(.*)?(.*)DecisionKey='Reject'?(.*)"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.decisionRejectData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.decisionRejectData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockClaimKamal=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Claim)/?(.*)?(.*)InstanceID='000001504109'"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.claimKamalData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.claimKamalData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockClaimDavid=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Claim)/?(.*)?(.*)InstanceID='000001532231'"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.claimDavidData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.claimDavidData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockClaimManna=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Claim)/?(.*)?(.*)InstanceID='000001532210'"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.claimMannaData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.claimMannaData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockReleaseManna=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Release)/?(.*)InstanceID='000001532210'"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.releaseMannaData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.releaseMannaData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockReleaseKamal=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Release)/?(.*)InstanceID='000001504109'"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.releaseKamalData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.releaseKamalData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockResubmit=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"POST",path:new RegExp("(Resubmit)/?(.*)?"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.resubmitData));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.resubmitData))}}};cross.fnd.fiori.inbox.model.mockRequests.mockSerchUsers=function(){var e=cross.fnd.fiori.inbox.model.MyInboxMockServerData;return{method:"GET",path:new RegExp("(SearchUsers)/?(.*)?"),response:function(o){o.respondJSON(200,"",JSON.stringify(e.searchUsers));jQuery.sap.log.debug("MockServer: response sent with 200, "+JSON.stringify(e.searchUsers))}}};