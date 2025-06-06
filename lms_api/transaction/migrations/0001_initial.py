# Generated by Django 5.1.5 on 2025-02-18 13:15

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('book', '0002_book_created_at_book_is_deleted_book_updated_at_and_more'),
        ('bookcopy', '0001_initial'),
        ('student', '0003_rename_studentid_student_student_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('transaction_id', models.AutoField(primary_key=True, serialize=False)),
                ('transaction_type', models.CharField(choices=[('Borrow', 'Borrow'), ('Return', 'Return')], max_length=10)),
                ('date', models.DateField()),
                ('due_date', models.DateField()),
                ('status', models.CharField(choices=[('Active', 'Active'), ('Completed', 'Completed'), ('Overdue', 'Overdue')], max_length=10)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='book.book')),
                ('bookcopy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bookcopy.bookcopy')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='student.student')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Transactions',
                'indexes': [models.Index(fields=['transaction_type', 'student', 'status'], name='idx_transactions')],
            },
        ),
    ]
