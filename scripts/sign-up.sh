API="${API_ORIGIN:-http://localhost:4741}" # use this to ping the actual API server
URL_PATH="/sign-up" # use this to ping the actual API server

# cannot use COMMENTS IN THE CURL SCRIPT BELOW - WILL BREAK IT
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "password": "'"${PASSWORD}"'",
      "password_confirmation": "'"${PASSWORD}"'"
    }
  }'

echo
