curl --include --request PATCH "http://localhost:4741/bills/${ID}" \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "bill": {
      "creditor": "'"${CREDITOR}"'",
      "billing_month": "'"${BILLING_MONTH}"'",
      "amount_due": "'"${AMOUNT_DUE}"'"
    }
  }'

echo
