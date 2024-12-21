from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
@api_view(['GET','POST','PUT'])
def todo_list(request):
    if request.method == 'GET':
        # 從數據庫返回數據
        todos = Todo.objects.all()
        todosSerializer = TodoSerializer(todos, many=True)
        return Response(todosSerializer.data)
    elif request.method == 'POST':
        cp_req = request.data.copy()
        cp_req['title'] = cp_req.pop('content', '')
        cp_req['completed'] = False
        serializer = TodoSerializer(data=cp_req)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    elif request.method == 'PUT':
        if not request.data.get('id'):
            return Response({'error': 'id is required'}, status=400)
        
        todo = Todo.objects.get(id=request.data.get('id'))
        serializer = TodoSerializer(instance=todo, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=200)
        
        return Response(serializer.errors, status=400)