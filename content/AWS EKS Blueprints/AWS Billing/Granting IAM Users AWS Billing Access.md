---
title: Granting IAM Users AWS Billing Access
draft: true
tags:
---
 
After having such a hard time accessing billing and cost management, this is a step by step walkthrough of how to access it without root user account
### Step 1: Activate access to the Billing and Cost Management Console for Users
Sign in as the root user and **Activate IAM Access**
This setting controls access to the following pages:
- Home
- Cost Explorer
- Reports
- Rightsizing recommendations
- Savings Plans recommendations
- Savings Plans utilization report
- Savings Plans coverage report
- Reservations overview
- Reservations recommendations
- Reservations utilization report
- Reservations coverage report
- Preferences

> [!info] Overview of managing access permissions - AWS Cost Management  
> Control who has access to your billing and account information with the AWS Identity and Access Management (IAM) service.  
> [https://docs.aws.amazon.com/cost-management/latest/userguide/control-access-billing.html#ControllingAccessWebsite-Activate](https://docs.aws.amazon.com/cost-management/latest/userguide/control-access-billing.html#ControllingAccessWebsite-Activate)  
![[/image 4.png|image 4.png]]
### Step 2: Grant the User IAM Permissions from any the following Policies
Assign any of the following permissions to the necessary users:
- `Billing`
```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "account:GetAccountInformation",
                "aws-portal:*Billing",
                "aws-portal:*PaymentMethods",
                "aws-portal:*Usage",
                "billing:GetBillingData",
                "billing:GetBillingDetails",
                "billing:GetBillingNotifications",
                "billing:GetBillingPreferences",
                "billing:GetContractInformation",
                "billing:GetCredits",
                "billing:GetIAMAccessPreference",
                "billing:GetSellerOfRecord",
                "billing:ListBillingViews",
                "billing:PutContractInformation",
                "billing:RedeemCredits",
                "billing:UpdateBillingPreferences",
                "billing:UpdateIAMAccessPreference",
                "budgets:CreateBudgetAction",
                "budgets:DeleteBudgetAction",
                "budgets:DescribeBudgetActionsForBudget",
                "budgets:DescribeBudgetAction",
                "budgets:DescribeBudgetActionsForAccount",
                "budgets:DescribeBudgetActionHistories",
                "budgets:ExecuteBudgetAction",
                "budgets:ModifyBudget",
                "budgets:UpdateBudgetAction",
                "budgets:ViewBudget",
                "ce:CreateCostCategoryDefinition",
                "ce:CreateNotificationSubscription",
                "ce:CreateReport",
                "ce:DeleteCostCategoryDefinition",
                "ce:DeleteNotificationSubscription",
                "ce:DeleteReport",
                "ce:DescribeCostCategoryDefinition",
                "ce:GetCostAndUsage",
                "ce:ListCostAllocationTags",
                "ce:ListCostCategoryDefinitions",
                "ce:ListTagsForResource",
                "ce:TagResource",
                "ce:UpdateCostAllocationTagsStatus",
                "ce:UpdateNotificationSubscription",
                "ce:UpdatePreferences",
                "ce:UpdateReport",
                "ce:UpdateCostCategoryDefinition",
                "ce:UntagResource",
                "ce:StartCostAllocationTagBackfill",
                "ce:ListCostAllocationTagBackfillHistory",
                "ce:GetTags",
                "ce:GetDimensionValues",
                "consolidatedbilling:GetAccountBillingRole",
                "consolidatedbilling:ListLinkedAccounts",
                "cur:DeleteReportDefinition",
                "cur:DescribeReportDefinitions",
                "cur:GetClassicReport",
                "cur:GetClassicReportPreferences",
                "cur:GetUsageReport",
                "cur:ModifyReportDefinition",
                "cur:PutClassicReportPreferences",
                "cur:PutReportDefinition",
                "cur:ValidateReportDestination",
                "freetier:GetFreeTierAlertPreference",
                "freetier:GetFreeTierUsage",
                "freetier:PutFreeTierAlertPreference",
                "invoicing:GetInvoiceEmailDeliveryPreferences",
                "invoicing:GetInvoicePDF",
                "invoicing:ListInvoiceSummaries",
                "invoicing:PutInvoiceEmailDeliveryPreferences",
                "payments:CreateFinancingApplication",
                "payments:CreatePaymentInstrument",
                "payments:DeletePaymentInstrument",
                "payments:GetFinancingApplication",
                "payments:GetFinancingLine",
                "payments:GetFinancingLineWithdrawal",
                "payments:GetFinancingOption",
                "payments:GetPaymentInstrument",
                "payments:GetPaymentStatus",
                "payments:ListFinancingApplications",
                "payments:ListFinancingLines",
                "payments:ListFinancingLineWithdrawals",
                "payments:ListPaymentPreferences",
                "payments:ListPaymentProgramOptions",
                "payments:ListPaymentProgramStatus",
                "payments:ListTagsForResource",
                "payments:ListPaymentInstruments",
                "payments:MakePayment",
                "payments:TagResource",
                "payments:UntagResource",
                "payments:UpdateFinancingApplication",
                "payments:UpdatePaymentInstrument",
                "payments:UpdatePaymentPreferences",
                "pricing:DescribeServices",
                "purchase-orders:AddPurchaseOrder",
                "purchase-orders:DeletePurchaseOrder",
                "purchase-orders:GetPurchaseOrder",
                "purchase-orders:ListPurchaseOrderInvoices",
                "purchase-orders:ListPurchaseOrders",
                "purchase-orders:ListTagsForResource",
                "purchase-orders:ModifyPurchaseOrders",
                "purchase-orders:TagResource",
                "purchase-orders:UntagResource",
                "purchase-orders:UpdatePurchaseOrder",
                "purchase-orders:UpdatePurchaseOrderStatus",
                "purchase-orders:ViewPurchaseOrders",
                "support:CreateCase",
                "support:AddAttachmentsToSet",
                "sustainability:GetCarbonFootprintSummary",
                "tax:BatchPutTaxRegistration",
                "tax:DeleteTaxRegistration",
                "tax:GetExemptions",
                "tax:GetTaxInheritance",
                "tax:GetTaxInterview",
                "tax:GetTaxRegistration",
                "tax:GetTaxRegistrationDocument",
                "tax:ListTaxRegistrations",
                "tax:PutTaxInheritance",
                "tax:PutTaxInterview",
                "tax:PutTaxRegistration",
                "tax:UpdateExemptions"
            ],
            "Resource": "*"
        }
    ]
}
```
- `AWSBillingReadOnlyAccess`
```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "account:GetAccountInformation",
                "aws-portal:ViewBilling",
                "billing:GetBillingData",
                "billing:GetBillingDetails",
                "billing:GetBillingNotifications",
                "billing:GetBillingPreferences",
                "billing:GetCredits",
                "billing:GetContractInformation",
                "billing:GetIAMAccessPreference",
                "billing:GetSellerOfRecord",
                "billing:ListBillingViews",
                "budgets:ViewBudget",
                "budgets:DescribeBudgetActionsForBudget",
                "budgets:DescribeBudgetAction",
                "budgets:DescribeBudgetActionsForAccount",
                "budgets:DescribeBudgetActionHistories",
                "ce:DescribeCostCategoryDefinition",
                "ce:GetCostAndUsage",
                "ce:ListCostCategoryDefinitions",
                "ce:ListTagsForResource",
                "ce:ListCostAllocationTags",
                "ce:ListCostAllocationTagBackfillHistory",
                "ce:GetTags",
                "ce:GetDimensionValues",
                "consolidatedbilling:ListLinkedAccounts",
                "consolidatedbilling:GetAccountBillingRole",
                "cur:GetClassicReport",
                "cur:GetClassicReportPreferences",
                "cur:GetUsageReport",
                "cur:DescribeReportDefinitions",
                "freetier:GetFreeTierAlertPreference",
                "freetier:GetFreeTierUsage",
                "invoicing:GetInvoiceEmailDeliveryPreferences",
                "invoicing:GetInvoicePDF",
                "invoicing:ListInvoiceSummaries",
                "payments:GetFinancingApplication",
                "payments:GetFinancingLine",
                "payments:GetFinancingLineWithdrawal",
                "payments:GetFinancingOption",
                "payments:GetPaymentInstrument",
                "payments:GetPaymentStatus",
                "payments:ListFinancingApplications",
                "payments:ListFinancingLines",
                "payments:ListFinancingLineWithdrawals",
                "payments:ListPaymentInstruments",
                "payments:ListPaymentPreferences",
                "payments:ListPaymentProgramOptions",
                "payments:ListPaymentProgramStatus",
                "payments:ListTagsForResource",
                "purchase-orders:GetPurchaseOrder",
                "purchase-orders:ViewPurchaseOrders",
                "purchase-orders:ListPurchaseOrderInvoices",
                "purchase-orders:ListPurchaseOrders",
                "purchase-orders:ListTagsForResource",
                "sustainability:GetCarbonFootprintSummary",
                "tax:GetTaxRegistrationDocument",
                "tax:GetTaxInheritance",
                "tax:ListTaxRegistrations"
            ],
            "Resource": "*"
        }
    ]
}
```
- `AdministratorAccess`
```JSON
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "*",
            "Resource": "*"
        }
    ]
}
```