import jwt
from jwt.exceptions import InvalidTokenError,ExpiredSignatureError
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from django.contrib.auth import get_user_model
from datetime import datetime,timedelta

User=get_user_model()

class JWTauthentication(BaseAuthentication):

    def authenticate(self, request):
        token = self.extract_token(request=request)
        print("Received Token:", token)
        if token is None:
            return None

        try:
            print("Before decoding")
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            print("Decoded Payload:", payload)
            self.verify_token(payload=payload)
            user_id = payload['UserID']
            user = User.objects.get(id=user_id)
            return user, None  # Return the user and the authentication object
        except (InvalidTokenError, ExpiredSignatureError, User.DoesNotExist):
            print("Exception in authentication")
            raise AuthenticationFailed("Invalid token")

    # def verify_token(self, payload):
    #     try:
    #         exp_timestamp = payload['exp'].timestamp()  # Convert datetime object to timestamp
    #         current_timestamp = datetime.utcnow().timestamp()
    #         print("Expiration Timestamp:", exp_timestamp)
    #         print("Current Timestamp:", current_timestamp)

    #         if current_timestamp > exp_timestamp:
    #             raise ExpiredSignatureError("Token has expired")

    #     except (InvalidTokenError, ExpiredSignatureError) as e:
    #         print(f"Exception in verify_token: {str(e)}")
    #         raise AuthenticationFailed("Token has expired")  # Return a more user-friendly error
    

    # def verify_token(self,payload):
    #     if "exp" in payload:
    #         raise InvalidTokenError("Token has no expiration")
        
    #     exp_timestamp=payload['exp']
    #     current_timestamp=datetime.utcnow().timestamp()
    #     print(exp_timestamp)
    #     if current_timestamp > exp_timestamp:
    #         raise ExpiredSignatureError("Token has expried")


    def verify_token(self, payload):
        try:
            exp_timestamp = payload['exp']

            if isinstance(exp_timestamp, datetime):
                exp_timestamp = exp_timestamp.timestamp()  # Convert datetime object to timestamp

            current_timestamp = datetime.utcnow().timestamp()
            print("Expiration Timestamp:", exp_timestamp)
            print("Current Timestamp:", current_timestamp)

            if current_timestamp > exp_timestamp:
                print("Token has expired")
                raise ExpiredSignatureError("Token has expired")

        except Exception as e:
            import traceback
            print("Exception in verify_token:", str(e))
            traceback.print_exc()  # Print the full traceback
            raise AuthenticationFailed("Token verification failed")  # Return a more user-friendly error


    def extract_token(self,request):
        auth_header=request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            return auth_header.split(" ")[1]
        return None

    @staticmethod
    def generateToken(payload):
        expiration = datetime.utcnow() + timedelta(hours=24)
        payload['exp'] = expiration.timestamp()  # Set the expiration timestamp as a float
        token = jwt.encode(payload=payload, key=settings.SECRET_KEY, algorithm='HS256')
        return token
