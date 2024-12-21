from django.urls import path
from . import views

urlpatterns = [
    path('todo/',views.todo_list, name='todo_list')
]