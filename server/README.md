# Rango Legal - Backend

# Project Setup
## Create a virtual environment
```
python -m venv api_env
```
## Activate the environment
### Windows
```
api_env\Scripts\activate
```
### Unix
```
. api_env/bin/activate
```

## Install dependencies
```
pip install -r requirements.txt
```

## Set environment variables
Create a `.env` file and set the following environment variables:
| Tables                                  | Description                               
| --------------------------------------- | ------------------------------------- |
| SQLALCHEMY_DATABASE_URI                 | The database URI that should be used for the connection. |
| JWT_SECRET_KEY                          | JWT token secret for signing tokens |
| MAIL_DEFAULT_SENDER                     | Email address to send from |
| MAIL_USERNAME                           | Mailing account username   |
| MAIL_PASSWORD                           | Mailing account password |
| CLIENT_ADDRESS                          | Client address  |
| CLIENT_PASSWORD_RESET_PATH              | Client password reset page path  |

Sample `.env` file:
```
SQLALCHEMY_DATABASE_URI=mysql://root:root@localhost:3306/rangolegal
JWT_SECRET_KEY=qpalzm102938!)@(#*)
MAIL_DEFAULT_SENDER=noreply.rangolegal@gmail.com
MAIL_USERNAME=noreply.rangolegal@gmail.com
MAIL_PASSWORD=abc456&*(
CLIENT_ADDRESS=http://localhost:8080
CLIENT_PASSWORD_RESET_PATH=reset_password
```

# Run
The virtual enviroment must be active before running the code, then run:
```
flask run
```