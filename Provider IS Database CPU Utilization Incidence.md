---
title: How to publish Obsidian notes with Quartz on GitHub Pages
draft: true
tags:
---
 

### Suspect Endpoint

https://api.provider.sha.go.ke/v1/claims/?fields=claim_auth_status,id,visit_start,service_type,patient_name,service_type,member_number,scheme_name,scheme_code,invoice_id,authorization_guid,beneficiary_id,claim_diagnoses&is_emergency=false&ordering=-visit_start&page_size=20&trim_results=true&workflow_state=DRAFT

### Suspect Queries

```SQL
SELECT "claims_claim"."search_document", "claims_claim"."search_vector", "claims_claim"."id", "claims_claim"."created", "claims_claim"."created_by", "claims_claim"."updated", "claims_claim"."updated_by", "claims_claim"."business_partner", "claims_claim"."payer_code", "claims_claim"."payer_name", "claims_claim"."payer_slade_code", "claims_claim"."provider_slade_code", "claims_claim"."category_name", "claims_claim"."category_code", "claims_claim"."policy_number", "claims_claim"."policy_valid_from", "claims_claim"."policy_valid_to", "claims_claim"."patient_number", "claims_claim"."patient_name", "claims_claim"."location_code", "claims_claim"."location_name", "claims_claim"."service_type", "claims_claim"."scheme_code", "claims_claim"."scheme_name", "claims_claim"."member_number", "claims_claim"."employee_number", "claims_claim"."visit_number", "claims_claim"."appointment_number", "claims_claim"."visit_start", "claims_claim"."visit_end", "claims_claim"."emergency_visit_expiry", "claims_claim"."admitted_on", "claims_claim"."estimate_ip_days", "claims_claim"."discharged_on", "claims_claim"."discharge_reason", "claims_claim"."currency", "claims_claim"."authorization_code", "claims_claim"."authorization_guid", "claims_claim"."nhif_number", "claims_claim"."attributes", "claims_claim"."notes", "claims_claim"."discharge_cancel_remarks", "claims_claim"."discharge_cancel_date", "claims_claim"."is_charge_master_mapped", "claims_claim"."beneficiary_is_fuzzy_matched", "claims_claim"."claim_id", "claims_claim"."beneficiary_id", "claims_claim"."beneficiary_guid", "claims_claim"."member_name", "claims_claim"."edi_claim_guid", "claims_claim"."workflow_state", "claims_claim"."date_submitted", "claims_claim"."submitted_by", "claims_claim"."claim_document_id", "claims_claim"."retry_count", "claims_claim"."last_retry", "claims_claim"."reference_number", "claims_claim"."cancel_reason_type", "claims_claim"."cancel_reason_text", "claims_claim"."mode_of_arrival", "claims_claim"."brought_by", "claims_claim"."reason_for_unknown_patient", "claims_claim"."is_resubmitted", COUNT("claims_invoice"."id") AS "invoice_count" FROM "claims_claim" LEFT OUTER JOIN "claims_invoice" ON ("claims_claim"."id" = "claims_invoice"."claim_id") WHERE ("claims_claim"."business_partner" = '9892' -- AND "claims_claim"."payer_slade_code" IN ('2029') 
AND "claims_claim"."workflow_state" IN ('DRAFT') 
AND "claims_claim"."service_type" = 'EMERGENCY' -- AND "claims_claim"."business_partner" IN ('9892')) 
GROUP BY "claims_claim"."id" ORDER BY "claims_claim"."visit_start" DESC LIMIT 20
```

```SQL
SELECT COUNT(*) FROM (SELECT "claims_claim"."id" AS "col1" FROM "claims_claim" LEFT OUTER JOIN "claims_invoice" ON ("claims_claim"."id" = "claims_invoice"."claim_id") WHERE ("claims_claim"."business_partner" = '6834' AND "claims_claim"."payer_slade_code" IN ('2029') AND "claims_claim"."workflow_state" IN ('DRAFT') AND NOT ("claims_claim"."service_type" = 'EMERGENCY') AND "claims_claim"."business_partner" IN ('6834')) GROUP BY 1) subquery
```