# Generated by Django 5.0 on 2023-12-20 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UserApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usersmodel',
            name='UserDefaultSign',
            field=models.CharField(max_length=450),
        ),
    ]
