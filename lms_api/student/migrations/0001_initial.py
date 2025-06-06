# Generated by Django 5.1.5 on 2025-02-16 10:21

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('studentId', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('contact_number', models.CharField(blank=True, max_length=15, null=True)),
                ('department', models.CharField(blank=True, max_length=100, null=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'Students',
                'indexes': [models.Index(fields=['name', 'email', 'contact_number'], name='idx_students')],
            },
        ),
    ]
