

from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product

class UserSerializer(serializers.ModelSerializer):
    # Use SerializerMethodField to create custom fields
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # Removed the original 'id' to avoid sending redundant data
        fields = ['_id', 'username', 'email', 'name', 'isAdmin']
    
    # Method for the '_id' field
    def get__id(self, obj):
        return obj.id
    
    # Method for the 'isAdmin' field
    def get_isAdmin(self, obj):
        return obj.is_staff

    # Method for the 'name' field
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

class UserSerializerWihToken(UserSerializer):
    # 1. IMPORTANT: Define the 'token' field here
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # 2. Inherit fields from the parent and add 'token'
        fields = UserSerializer.Meta.fields + ['token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'