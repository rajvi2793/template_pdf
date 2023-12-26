from django.contrib import admin
from .models import UsersModel
models_list = [UsersModel]

admin.site.register(models_list)

# Register your models here.
