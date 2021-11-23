# create a curl requrest to http://localhost:8080/api/v1/signup
# with the following data:
# {
#   "name": "cesar",
#   "surname": "marcano",
#   "email": "cesar.marcano3927@gmail.com",
#   "password": "12345678",
#   "birthdate": "1990-01-01",
# }

curl -X POST -H "Content-Type: application/json" -d '{
	"name": "cesar",
	"surname": "marcano",
	"email": "cesar.marcano3927@gmail.com",
	"password": "12345678",
	"birthdate": "1990-01-01"
}' http://localhost:8080/api/v1/signup

