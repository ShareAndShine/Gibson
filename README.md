
1. git clone https://github.com/ShareAndShine/Gibson.git

2. sfdx force:source:deploy -u <ReplaceWothOrgAliasName> -p force-app

3. sfdx force:user:permset:assign -n Sales_Performance_Management

4. Import Data
sfdx force:data:tree:import -p scripts\data\Account-Contact-plan.json -u <ReplaceWothOrgAliasName>

sfdx force:data:tree:import -p scripts\data\Sales_Business_Unit__c-plan.json -u <ReplaceWothOrgAliasName>

sfdx force:data:tree:import -p scripts\data\Sales_Target_BDD__c-plan.json -u <ReplaceWothOrgAliasName>

sfdx force:data:tree:import -p scripts\data\Sales_Target_BDM__c-plan.json -u <ReplaceWothOrgAliasName>



ITEMS TO WORK ON:
1. Excel Upload Option on BDD view - UI is done
2. Previous Year Performance Report
3. SKU Level Target Revision for BDMs
4. BDM View as a tab
	- Inlcude associates hirearchy