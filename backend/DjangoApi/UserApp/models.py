from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class UsersModel(models.Model):
    UserID=models.AutoField(primary_key=True)
    UserName= models.CharField(max_length=100)
    UserEmail=models.EmailField(unique=True,max_length=254,blank=False,null=False)
    UserPassword = models.CharField(max_length=128,null=False,default='default_password_hash') 
    UserDefaultSign = models.CharField(max_length=450)

    def set_password(self, raw_password):
        self.UserPassword = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.UserPassword)
