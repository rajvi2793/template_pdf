from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from UserApp.models import UsersModel
from UserApp.serializers import UserSerializer
from UserApp.serializers import LoginSerializer
from django.contrib.auth import authenticate, login
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from UserApp.tokenauthentication import JWTauthentication

from django.core.files.storage import default_storage

@csrf_exempt
def userAPI(request,id=0):
    if request.method=='GET':
        users=UsersModel.objects.all()
        users_serializer=UserSerializer(users,many=True)
        return JsonResponse(users_serializer.data,safe=False)
    elif request.method=='POST':
        users_data=JSONParser().parse(request)
        users_serializer=UserSerializer(data=users_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to add",safe=False)
    elif request.method=='PUT':
        users_data=JSONParser().parse(request)
        users=UsersModel.objects.get(UserID=users_data['UserID'])
        users_serializer=UserSerializer(users,data=users_data)
        if users_serializer.is_valid():
            users_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Fail To update",safe=False)
    elif request.method=='DELETE':
        users=UsersModel.objects.get(UserID=id)
        users.delete()
        return JsonResponse("DEleted Successfully",safe=False)

@csrf_exempt
def SaveSign(request):
    if 'file' in request.FILES:    
        file = request.FILES['file']
        file_name=default_storage.save(file.name,file)
        return JsonResponse(file_name,safe=False)
    else:
        return JsonResponse({'error': 'File not found in the request'}, status=400)

# @csrf_exempt
# @api_view(['POST'])
# def login(request):
#         serializer = LoginSerializer(data=request.data)
#         if serializer.is_valid():
#            token = JWTauthentication.generateToken(payload=serializer.data)
#            return Response({
#             "message":"Login Successfull",
#             "token":token,
#             "user":serializer.data
#            },status=status.HTTP_201_CREATED)
#         return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

# views.py

from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.response import Response
from rest_framework import status
from UserApp.tokenauthentication import JWTauthentication

@api_view(['GET'])
@authentication_classes([JWTauthentication])
@csrf_exempt
def verify_token(request):
    print("My req",request)
    try:
        # Use the `authenticate` method of the authentication class
        user, _ = JWTauthentication().authenticate(request)
        if user is not None:
            return Response({"message": "Token is valid"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Token is invalid"}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"message": f"Token verification failed: {str(e)}"}, status=status.HTTP_401_UNAUTHORIZED)



@csrf_exempt
@api_view(['POST'])
def login(request):
    serializer = LoginSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        try:
            # Modify the line below to use the correct method to generate the token
            token = JWTauthentication.generateToken(payload=serializer.validated_data)

            return Response({
                "message": "Login Successful",
                "token": token,
                "user": serializer.validated_data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            print("Exception during login:", str(e))
            return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:   
        print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
