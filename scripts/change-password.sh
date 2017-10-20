API="${API_ORIGIN:-http://localhost:4741}" # use this to ping the actual API server
URL_PATH="/change-password/${ID}" # use this to ping the actual API server

curl "${API}${URL_PATH}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "passwords": {
      "old": "'"${OLD_PASSWORD}"'",
      "new": "'"${NEW_PASSWORD}"'"
    }
  }'

echo
