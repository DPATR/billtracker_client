curl --include --request POST http://localhost:4741/bills \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "bill": {
      "creditor": "'"${CREDITOR}"'",
      "billing_month": "'"${BILLING_MONTH}"'",
      "amount_due": "'"${AMOUNT_DUE}"'"
    }
  }'

echo
