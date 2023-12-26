from rest_framework import serializers
from UserApp.models import UsersModel
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=UsersModel
        fields=('UserID','UserName','UserEmail','UserPassword','UserDefaultSign')

# login functionality
class LoginSerializer(serializers.Serializer):
    UserEmail = serializers.EmailField()
    UserPassword = serializers.CharField(max_length=255, write_only=True)

    def validate(self, data):
        mUserEmail = data.get("UserEmail")
        mUserPassword = data.get("UserPassword")

        if mUserEmail is None:
            raise serializers.ValidationError("An Email address is required for login")

        if mUserPassword is None:
            raise serializers.ValidationError("A Password is required for login")

        # Custom authentication logic
        try:
            myuser = UsersModel.objects.get(UserEmail=mUserEmail)
            
        except UsersModel.DoesNotExist:
            raise serializers.ValidationError("Invalid email and password")

        # if not myuser.is_active:
        #     raise serializers.ValidationError("User is not active")

        return {
            "UserEmail": myuser.UserEmail,
            "UserID": myuser.UserID
        }

###################33
# class LoginSerializer(serializers.Serializer):
#     UserEmail = serializers.EmailField()
#     UserPassword = serializers.CharField(max_length=255, write_only=True)

#     def validate(self, data):
#         UserEmail = data.get("UserEmail")
#         UserPassword = data.get("UserPassword")

#         if UserEmail is None:
#             raise serializers.ValidationError("An Email address is required for login")

#         if UserPassword is None:
#             raise serializers.ValidationError("A Password is required for login")

#         # user = authenticate(UserEmail='kalpesh@gmail.com', UserPassword='abc123')

#         # print(user)
#         # if user is None:
#         #     raise serializers.ValidationError("Invalid email and password")

#         # if not user.is_active:
#         #     raise serializers.ValidationError("User is not active")

#         return {
#             "UserEmail": UserEmail,
#             "UserPassword": UserPassword
#         }
#############################################
# class LoginSerializer(serializers.Serializer):
#     UserEmail = serializers.EmailField()
#     UserPassword = serializers.CharField(max_length=255, write_only=True)

#     class Meta:
#         fields = ('UserEmail', 'UserPassword')  # Add the fields you want to include

#     def validate(self, data):
#         UserEmail = data.get("UserEmail", None)
#         UserPassword = data.get("UserPassword", None)

#         if UserEmail is None:
#             raise serializers.ValidationError("An Email address is required for login")

#         if UserPassword is None:
#             raise serializers.ValidationError("A Password is required for login")

#         # Use authenticate with username and password
#         # user = authenticate(request=self.context.get('request'),
#         #                     username=UserEmail, password=UserPassword)
#         user = authenticate( username=UserEmail, password=UserPassword)
#         print("Authenticated User:", user)

#         if user is None:
#             raise serializers.ValidationError("Invalid email and password")

#         if not user.is_active:
#             raise serializers.ValidationError("User is not active")

#         return {
#             "UserEmail": user.UserEmail,
#             "UserID": user.UserID
#         }