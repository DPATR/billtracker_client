API="${API_ORIGIN:-http://localhost:4741}" # use this to ping the actual API server
URL_PATH="/sign-in" # use this to ping the actual API server

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
       "email": "'"${EMAIL}"'",
       "password": "'"${PASSWORD}"'"
    }
  }'

echo
