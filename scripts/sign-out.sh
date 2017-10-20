API="${API_ORIGIN:-http://localhost:4741}" # use this to ping the actual API server
URL_PATH="/sign-out/$ID" # use this to ping the actual API server

curl "${API}${URL_PATH}" \
  --include \
  --request DELETE \
  --header "Authorization: Token token=$TOKEN"

echo
